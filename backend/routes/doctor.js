const express = require('express');
const router = express.Router();
const { 
  createPrescription, 
  getDoctorDashboard, 
  getPrescriptionHistory, 
  getPatientHistory, 
  signPrescription 
} = require('../controllers/doctorController');
const { protect, authorize } = require('../middlewares/authMiddleware');

router.post('/prescription', protect, authorize('doctor'), createPrescription);
router.get('/dashboard', protect, authorize('doctor'), getDoctorDashboard);
router.get('/history', protect, authorize('doctor'), getPrescriptionHistory);
router.get('/patient-history', protect, authorize('doctor'), getPatientHistory);
router.put('/sign/:id', protect, authorize('doctor'), signPrescription);

module.exports = router;
