const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const generatePrescriptionPDF = (prescription, doctor) => {
  return new Promise((resolve, reject) => {
    try {
      // Ensure output directory exists
      const dirPath = path.join(__dirname, '../public/prescriptions');
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }

      const fileName = `prescription_${prescription.id}_${Date.now()}.pdf`;
      const filePath = path.join(dirPath, fileName);

      const doc = new PDFDocument({ size: 'A4', margin: 50 });
      const writeStream = fs.createWriteStream(filePath);
      doc.pipe(writeStream);

      // Colors
      const primaryColor = '#0284C7'; // Blue
      const secondaryColor = '#10B981'; // Green
      const textColor = '#1e293b'; // Dark Slate
      const textSecondary = '#64748b'; // Light Slate

      // Letterhead / Clinic Name
      doc.fillColor(primaryColor).fontSize(20).font('Helvetica-Bold').text('SMART MEDICAL CENTER', { align: 'center' });
      doc.fillColor(textSecondary).fontSize(10).font('Helvetica').text('100 Innovation Way, Tech Park, Suite 400', { align: 'center' });
      doc.text('Tel: +91 99999 88888 • www.smartprescription.in', { align: 'center' });
      doc.moveDown(1);

      // Horizontal Divider
      doc.strokeColor(primaryColor).lineWidth(3).moveTo(50, 110).lineTo(545, 110).stroke();
      doc.moveDown(1.5);

      // Doctor Details
      const docName = doctor ? doctor.name : 'Dr. Anjali Desai, MD';
      const docSpecialty = doctor ? (doctor.specialty || 'Consultant Physician') : 'Consulting Cardiologist';
      const docLicense = doctor ? (doctor.regNumber || 'LIC-2024-897315') : 'LIC-2024-897315';

      doc.fillColor(textColor).fontSize(14).font('Helvetica-Bold').text(docName);
      doc.fillColor(textSecondary).fontSize(10).font('Helvetica').text(docSpecialty);
      doc.text(`License No: ${docLicense}`);
      doc.moveDown(1);

      // Patient Details Box
      const patientBoxTop = 200;
      doc.rect(50, patientBoxTop, 495, 80).fillOpacity(0.05).fill('#f8fafc');
      doc.strokeColor('#e2e8f0').lineWidth(1).rect(50, patientBoxTop, 495, 80).stroke();

      // Write Patient details text over the filled box
      doc.fillOpacity(1.0).fillColor(textColor);
      doc.fontSize(9).font('Helvetica-Bold').fillColor(textSecondary).text('PATIENT NAME', 65, patientBoxTop + 15);
      doc.fontSize(11).font('Helvetica-Bold').fillColor(textColor).text(prescription.patientName, 65, patientBoxTop + 27);

      doc.fontSize(9).font('Helvetica-Bold').fillColor(textSecondary).text('DATE', 300, patientBoxTop + 15);
      doc.fontSize(11).font('Helvetica-Bold').fillColor(textColor).text(new Date(prescription.createdAt || Date.now()).toLocaleDateString(), 300, patientBoxTop + 27);

      doc.fontSize(9).font('Helvetica-Bold').fillColor(textSecondary).text('AGE / GENDER', 65, patientBoxTop + 50);
      doc.fontSize(11).font('Helvetica-Bold').fillColor(textColor).text(`${prescription.patientAge} Yrs / ${prescription.patientGender}`, 65, patientBoxTop + 62);

      doc.fontSize(9).font('Helvetica-Bold').fillColor(textSecondary).text('DIAGNOSIS', 300, patientBoxTop + 50);
      doc.fontSize(11).font('Helvetica-Bold').fillColor(textColor).text(prescription.diagnosis, 300, patientBoxTop + 62);

      doc.moveDown(2);

      // Medications Header
      const medsTop = 310;
      doc.fontSize(12).font('Helvetica-Bold').fillColor(primaryColor).text('MEDICATIONS PRESCRIBED', 50, medsTop);
      doc.strokeColor('#cbd5e1').lineWidth(1).moveTo(50, medsTop + 18).lineTo(545, medsTop + 18).stroke();

      // List medications
      let currentY = medsTop + 30;
      const meds = prescription.medicines;

      meds.forEach((med, index) => {
        // Prevent layout overflow by checking height
        if (currentY > 700) {
          doc.addPage();
          currentY = 50;
        }

        doc.fontSize(11).font('Helvetica-Bold').fillColor(textColor).text(`${index + 1}. ${med.name} (${med.strength || med.dosage})`, 50, currentY);
        doc.fontSize(9).font('Helvetica-Oblique').fillColor(textSecondary).text(`Duration: ${med.duration || 'N/A'} • Frequency: ${med.frequency || med.dosage} • Instructions: ${med.instructions || 'After food'} • Start: ${med.startTime || '08:00 AM'}`, 65, currentY + 14);
        currentY += 40;
      });

      // Digital Signature section at the bottom
      const footerY = 700;
      
      // Stamp
      if (prescription.isSigned) {
        doc.rect(50, footerY - 50, 150, 30).strokeColor(secondaryColor).lineWidth(1.5).stroke();
        doc.fontSize(10).font('Helvetica-Bold').fillColor(secondaryColor).text('DIGITALLY SIGNED', 65, footerY - 40);
      }

      // Doctor signature block
      doc.strokeColor(textColor).lineWidth(0.5).moveTo(380, footerY - 10).lineTo(530, footerY - 10).stroke();
      doc.fontSize(10).font('Helvetica-Bold').fillColor(textColor).text(docName.split(',')[0], 380, footerY);
      doc.fontSize(8).font('Helvetica').fillColor(textSecondary).text(docSpecialty, 380, footerY + 12);

      // Info Footer Note
      doc.fontSize(8).font('Helvetica').fillColor(textSecondary).text('This is a digitally compiled e-prescription generated via Smart Prescription Monitor.', 50, 770, { align: 'center' });

      doc.end();

      writeStream.on('finish', () => {
        resolve(fileName);
      });

      writeStream.on('error', (err) => {
        reject(err);
      });

    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { generatePrescriptionPDF };
