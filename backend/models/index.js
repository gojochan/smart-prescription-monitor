const User = require('./User');
const Medicine = require('./Medicine');
const Prescription = require('./Prescription');

// Define relationships
User.hasMany(Prescription, { foreignKey: 'doctorId', as: 'doctorPrescriptions' });
User.hasMany(Prescription, { foreignKey: 'patientId', as: 'patientPrescriptions' });

Prescription.belongsTo(User, { foreignKey: 'doctorId', as: 'doctor' });
Prescription.belongsTo(User, { foreignKey: 'patientId', as: 'patient' });

module.exports = {
  User,
  Medicine,
  Prescription
};
