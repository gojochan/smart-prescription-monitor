const express = require('express');
const router = express.Router();
const { getMyPrescriptions, getPatientDashboard } = require('../controllers/patientController');
const { protect, authorize } = require('../middlewares/authMiddleware');

router.get('/prescriptions', protect, authorize('patient'), getMyPrescriptions);
router.get('/dashboard', protect, authorize('patient'), getPatientDashboard);

module.exports = router;
