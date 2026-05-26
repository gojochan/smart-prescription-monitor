const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('doctor', 'patient', 'organization', 'admin'),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected', 'active'),
    defaultValue: 'active' // For patients/admins active. For doctors/orgs we will set to 'pending' or use 'active' if they skip/self-approve.
  },
  // Doctor fields
  hospital: {
    type: DataTypes.STRING,
    allowNull: true
  },
  regNumber: {
    type: DataTypes.STRING,
    allowNull: true
  },
  specialty: {
    type: DataTypes.STRING,
    allowNull: true
  },
  // Patient fields
  age: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: true
  },
  // Organization fields
  facilityLicense: {
    type: DataTypes.STRING,
    allowNull: true
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  timestamps: true
});

module.exports = User;
