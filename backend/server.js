const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { connectDB, sequelize } = require('./config/db');

// Import Routers
const authRoutes = require('./routes/auth');
const doctorRoutes = require('./routes/doctor');
const patientRoutes = require('./routes/patient');
const orgRoutes = require('./routes/org');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve Static Files (Prescription PDFs)
app.use('/prescriptions', express.static(path.join(__dirname, 'public/prescriptions')));

// Route Mounts
app.use('/api/auth', authRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/orgs', orgRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'SPM Backend Server is running smoothly' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // 1. Authenticate DB connection
    await connectDB();

    // 2. Sync database models (alter tables in-place if they exist)
    await sequelize.sync({ alter: true });
    console.log('Database synchronized successfully.');

    // 3. Start server
    app.listen(PORT, () => {
      console.log(`Smart Prescription Monitor backend listening on port ${PORT}...`);
    });
  } catch (error) {
    console.error('Fatal server startup failure:', error);
    process.exit(1);
  }
};

startServer();
