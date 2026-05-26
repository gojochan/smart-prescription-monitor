const express = require('express');
const router = express.Router();
const { 
  getOrgDashboard, 
  verifyDoctorsList, 
  updateDoctorStatus, 
  getMedicines, 
  addMedicine, 
  refillMedicineStock 
} = require('../controllers/orgController');
const { protect, authorize } = require('../middlewares/authMiddleware');

router.get('/dashboard', protect, authorize('organization'), getOrgDashboard);
router.get('/verify-doctors', protect, authorize('organization'), verifyDoctorsList);
router.put('/verify-doctors/:id', protect, authorize('organization'), updateDoctorStatus);
router.get('/medicines', protect, getMedicines); // Accessible by doctors to build prescriptions, and organizations to manage stock
router.post('/medicines', protect, authorize('organization'), addMedicine);
router.put('/medicines/refill/:id', protect, authorize('organization'), refillMedicineStock);

module.exports = router;
