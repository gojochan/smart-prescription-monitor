const { Prescription, User, Medicine } = require('../models');
const { generatePrescriptionPDF } = require('./pdfController');
const { Op, Sequelize } = require('sequelize');
const { sequelize } = require('../config/db');

const createPrescription = async (req, res) => {
  try {
    const {
      patientName,
      patientAge,
      patientGender,
      diagnosis,
      medicines, // Array containing { name, strength, dosage, frequency, duration, instructions, startTime }
      patientPhone
    } = req.body;

    if (!patientName || !patientAge || !patientGender || !diagnosis || !medicines || medicines.length === 0) {
      return res.status(400).json({ success: false, message: 'Please provide all patient details and medicines' });
    }

    // Try to find the patient user if phone is provided
    let patientId = null;
    if (patientPhone) {
      // Normalize patient phone
      const cleanPhone = patientPhone.replace(/[\s-()]/g, '');
      const normalizedPhone = cleanPhone.startsWith('+91') 
        ? cleanPhone 
        : cleanPhone.startsWith('91') && cleanPhone.length === 12 
          ? '+' + cleanPhone 
          : '+91' + cleanPhone.slice(-10);

      const patient = await User.findOne({ where: { phone: normalizedPhone, role: 'patient' } });
      if (patient) {
        patientId = patient.id;
      }
    }

    // Create prescription row (temporarily unsigned)
    const prescription = await Prescription.create({
      patientName,
      patientAge: parseInt(patientAge, 10),
      patientGender,
      diagnosis,
      medicines,
      doctorId: req.user.id,
      patientId,
      isSigned: false
    });

    // Generate initial PDF file
    const doctor = req.user;
    const fileName = await generatePrescriptionPDF(prescription, doctor);
    
    // Update path
    prescription.pdfPath = `/prescriptions/${fileName}`;
    await prescription.save();

    // Deduct stock if medicines are matching in database catalog
    for (const med of medicines) {
      const match = await Medicine.findOne({ where: { name: { [Op.like]: `%${med.name}%` } } });
      if (match) {
        const qtyToDeduct = 10; // Default deduction per prescription duration or standard unit
        match.stock = Math.max(0, match.stock - qtyToDeduct);
        await match.save();
      }
    }

    return res.status(201).json({
      success: true,
      message: 'Prescription created and saved successfully',
      data: prescription
    });

  } catch (error) {
    console.error('Create Prescription Error:', error);
    return res.status(500).json({ success: false, message: 'Server error creating prescription' });
  }
};

const getDoctorDashboard = async (req, res) => {
  try {
    const doctorId = req.user.id;

    // 1. Total prescriptions created by this doctor
    const totalPrescriptions = await Prescription.count({ where: { doctorId } });

    // 2. Total unique patients
    const prescriptions = await Prescription.findAll({
      where: { doctorId },
      attributes: ['patientName']
    });
    const uniquePatients = [...new Set(prescriptions.map(p => p.patientName))].length;

    // 3. Pending vs Signed
    const signedCount = await Prescription.count({ where: { doctorId, isSigned: true } });
    const unsignedCount = totalPrescriptions - signedCount;

    // 4. Get recent prescriptions (limit 5)
    const recentPrescriptions = await Prescription.findAll({
      where: { doctorId },
      order: [['createdAt', 'DESC']],
      limit: 5
    });

    // 5. Get low stock medicines
    const lowStockMedicines = await Medicine.findAll({
      where: Sequelize.where(
        Sequelize.col('stock'),
        Op.lte,
        Sequelize.col('threshold')
      ),
      limit: 5
    });

    return res.json({
      success: true,
      data: {
        stats: {
          totalPrescriptions,
          uniquePatients,
          signedCount,
          unsignedCount
        },
        recentPrescriptions,
        lowStockMedicines
      }
    });

  } catch (error) {
    console.error('Doctor Dashboard Error:', error);
    return res.status(500).json({ success: false, message: 'Server error retrieving dashboard stats' });
  }
};

const getPrescriptionHistory = async (req, res) => {
  try {
    const doctorId = req.user.id;
    const history = await Prescription.findAll({
      where: { doctorId },
      order: [['createdAt', 'DESC']]
    });
    return res.json({ success: true, data: history });
  } catch (error) {
    console.error('Prescription History Error:', error);
    return res.status(500).json({ success: false, message: 'Server error retrieving prescription history' });
  }
};

const getPatientHistory = async (req, res) => {
  try {
    const { name, phone } = req.query;
    const doctorId = req.user.id;

    let searchConditions = { doctorId };

    if (phone) {
      // Find patient user id
      const cleanPhone = phone.replace(/[\s-()]/g, '');
      const normalizedPhone = cleanPhone.startsWith('+91') 
        ? cleanPhone 
        : cleanPhone.startsWith('91') && cleanPhone.length === 12 
          ? '+' + cleanPhone 
          : '+91' + cleanPhone.slice(-10);

      const patient = await User.findOne({ where: { phone: normalizedPhone, role: 'patient' } });
      if (patient) {
        searchConditions = {
          doctorId,
          [Op.or]: [
            { patientId: patient.id },
            { patientName: { [Op.like]: `%${patient.name}%` } }
          ]
        };
      } else {
        searchConditions.patientName = { [Op.like]: `%${name || ''}%` };
      }
    } else if (name) {
      searchConditions.patientName = { [Op.like]: `%${name}%` };
    }

    const history = await Prescription.findAll({
      where: searchConditions,
      order: [['createdAt', 'DESC']]
    });

    return res.json({ success: true, data: history });

  } catch (error) {
    console.error('Patient History Error:', error);
    return res.status(500).json({ success: false, message: 'Server error retrieving patient history' });
  }
};

const signPrescription = async (req, res) => {
  try {
    const { id } = req.params;
    const prescription = await Prescription.findOne({ where: { id, doctorId: req.user.id } });

    if (!prescription) {
      return res.status(404).json({ success: false, message: 'Prescription not found' });
    }

    // Set signed flag
    prescription.isSigned = true;
    await prescription.save();

    // Re-generate PDF with signature seal
    const fileName = await generatePrescriptionPDF(prescription, req.user);
    prescription.pdfPath = `/prescriptions/${fileName}`;
    await prescription.save();

    return res.json({
      success: true,
      message: 'Prescription signed and updated successfully',
      data: prescription
    });

  } catch (error) {
    console.error('Sign Prescription Error:', error);
    return res.status(500).json({ success: false, message: 'Server error signing prescription' });
  }
};

module.exports = {
  createPrescription,
  getDoctorDashboard,
  getPrescriptionHistory,
  getPatientHistory,
  signPrescription
};
