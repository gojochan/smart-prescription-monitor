const { User, Medicine } = require('../models');
const { Op, Sequelize } = require('sequelize');

const getOrgDashboard = async (req, res) => {
  try {
    const orgName = req.user.name;

    // 1. Get total doctors registered at this facility
    const totalDoctors = await User.count({
      where: {
        role: 'doctor',
        hospital: { [Op.like]: `%${orgName}%` }
      }
    });

    // 2. Get pending doctor verifications
    const pendingDoctors = await User.count({
      where: {
        role: 'doctor',
        hospital: { [Op.like]: `%${orgName}%` },
        status: 'pending'
      }
    });

    // 3. Get medicine inventory count
    const totalMedicines = await Medicine.count({});

    // 4. Low stock count
    const lowStockCount = await Medicine.count({
      where: Sequelize.where(
        Sequelize.col('stock'),
        Op.lte,
        Sequelize.col('threshold')
      )
    });

    return res.json({
      success: true,
      data: {
        stats: {
          totalDoctors,
          pendingDoctors,
          totalMedicines,
          lowStockCount
        }
      }
    });

  } catch (error) {
    console.error('Org Dashboard Error:', error);
    return res.status(500).json({ success: false, message: 'Server error retrieving organization dashboard stats' });
  }
};

const verifyDoctorsList = async (req, res) => {
  try {
    const orgName = req.user.name;
    const list = await User.findAll({
      where: {
        role: 'doctor',
        status: 'pending',
        hospital: { [Op.like]: `%${orgName}%` }
      },
      attributes: ['id', 'name', 'email', 'phone', 'specialty', 'regNumber', 'status', 'createdAt']
    });

    // Structure list to match frontend verify doctor object fields
    const formattedList = list.map(item => ({
      id: item.id.toString(),
      name: item.name,
      specialty: item.specialty || 'General Practitioner',
      license: item.regNumber || 'LIC-PENDING',
      education: 'MD / MBBS General Medicine',
      email: item.email || 'N/A',
      phone: item.phone,
      dateRequested: new Date(item.createdAt).toLocaleDateString(),
      docs: ['Degree_Certificate.pdf', 'Medical_Council_ID.pdf']
    }));

    return res.json({ success: true, data: formattedList });
  } catch (error) {
    console.error('Verify Doctors List Error:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching pending doctor list' });
  }
};

const updateDoctorStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // 'approved' or 'rejected'

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value. Use approved or rejected.' });
    }

    const doctor = await User.findOne({ where: { id, role: 'doctor' } });
    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }

    doctor.status = status;
    await doctor.save();

    return res.json({
      success: true,
      message: `Doctor registration successfully ${status === 'approved' ? 'approved' : 'rejected'}.`
    });

  } catch (error) {
    console.error('Update Doctor Status Error:', error);
    return res.status(500).json({ success: false, message: 'Server error updating doctor status' });
  }
};

const getMedicines = async (req, res) => {
  try {
    const { category, search } = req.query;
    const searchConditions = {};

    if (category) {
      searchConditions.category = category;
    }

    if (search) {
      searchConditions.name = { [Op.like]: `%${search}%` };
    }

    const list = await Medicine.findAll({
      where: searchConditions,
      order: [['name', 'ASC']]
    });

    return res.json({ success: true, data: list });
  } catch (error) {
    console.error('Get Medicines Error:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching medicines' });
  }
};

const addMedicine = async (req, res) => {
  try {
    const { name, category, price, stock, threshold, unit } = req.body;

    if (!name || !category || !price) {
      return res.status(400).json({ success: false, message: 'Please provide medicine name, category and price' });
    }

    const med = await Medicine.create({
      name,
      category,
      price,
      stock: stock ? parseInt(stock, 10) : 0,
      threshold: threshold ? parseInt(threshold, 10) : 50,
      unit: unit || 'Tablets'
    });

    return res.status(201).json({ success: true, data: med });
  } catch (error) {
    console.error('Add Medicine Error:', error);
    return res.status(500).json({ success: false, message: 'Server error adding medicine' });
  }
};

const refillMedicineStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const qty = parseInt(quantity, 10);
    if (isNaN(qty) || qty <= 0) {
      return res.status(400).json({ success: false, message: 'Please enter a valid positive number for stock' });
    }

    const med = await Medicine.findByPk(id);
    if (!med) {
      return res.status(404).json({ success: false, message: 'Medicine not found' });
    }

    med.stock += qty;
    await med.save();

    return res.json({
      success: true,
      message: `Successfully refilled ${qty} units of ${med.name}`,
      data: med
    });
  } catch (error) {
    console.error('Refill Stock Error:', error);
    return res.status(500).json({ success: false, message: 'Server error refilling stock' });
  }
};

module.exports = {
  getOrgDashboard,
  verifyDoctorsList,
  updateDoctorStatus,
  getMedicines,
  addMedicine,
  refillMedicineStock
};
