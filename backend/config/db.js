const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'spm_db',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || 'ishita@sunflower',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false, // Set to console.log to see SQL logs
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL Database connection established successfully via Sequelize.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
