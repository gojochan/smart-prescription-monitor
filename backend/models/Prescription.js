const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Prescription = sequelize.define('Prescription', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  patientName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  patientAge: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  patientGender: {
    type: DataTypes.STRING,
    allowNull: false
  },
  diagnosis: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  // Store medicines array as text string (serialized JSON) or JSON type.
  // Using TEXT for compatibility with older MySQL versions if applicable, but parsed dynamically.
  medicines: {
    type: DataTypes.TEXT,
    allowNull: false,
    get() {
      const rawValue = this.getDataValue('medicines');
      return rawValue ? JSON.parse(rawValue) : [];
    },
    set(value) {
      this.setDataValue('medicines', JSON.stringify(value));
    }
  },
  doctorId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  patientId: {
    type: DataTypes.INTEGER,
    allowNull: true // Nullable if the patient isn't registered on SPM app yet
  },
  pdfPath: {
    type: DataTypes.STRING,
    allowNull: true
  },
  isSigned: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: true
});

module.exports = Prescription;
