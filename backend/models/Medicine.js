const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Medicine = sequelize.define('Medicine', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.STRING, // e.g. "₹45.00" or "45.00"
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  threshold: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 50
  },
  unit: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Tablets'
  }
}, {
  timestamps: true
});

module.exports = Medicine;
