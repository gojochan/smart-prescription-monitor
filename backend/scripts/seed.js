const { sequelize } = require('../config/db');
const { Medicine, User } = require('../models');
const bcrypt = require('bcryptjs');

const initialMedicines = [
  { name: 'Telmisartan Tablets IP 40mg (Telma 40)', category: 'Cardiac', price: '118.50', stock: 250, threshold: 50, unit: 'Tablets' },
  { name: 'Amlodipine Besylate 5mg (Amlong)', category: 'Cardiac', price: '84.00', stock: 300, threshold: 60, unit: 'Tablets' },
  { name: 'Atorvastatin Calcium 10mg (Lipvas)', category: 'Cardiac', price: '175.20', stock: 150, threshold: 40, unit: 'Tablets' },
  { name: 'Metformin Hydrochloride SR 500mg (Glycomet)', category: 'Diabetic', price: '72.00', stock: 500, threshold: 85, unit: 'Tablets' },
  { name: 'Glimepiride 2mg (Amaryl)', category: 'Diabetic', price: '110.00', stock: 220, threshold: 50, unit: 'Tablets' },
  { name: 'Pantoprazole + Domperidone (Pantocid DSR)', category: 'Gastro', price: '208.00', stock: 180, threshold: 40, unit: 'Capsules' },
  { name: 'Ranitidine 150mg (Aciloc)', category: 'Gastro', price: '40.00', stock: 600, threshold: 100, unit: 'Tablets' },
  { name: 'Paracetamol IP 650mg (Dolo-650)', category: 'General', price: '30.90', stock: 1000, threshold: 150, unit: 'Tablets' },
  { name: 'Amoxicillin IP 500mg (Novamox)', category: 'General', price: '138.00', stock: 200, threshold: 45, unit: 'Capsules' },
  { name: 'Montelukast + Levocetirizine (Montair LC)', category: 'General', price: '242.00', stock: 160, threshold: 30, unit: 'Tablets' }
];

const seedDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to MySQL database for seeding...');

    // Sync database schemas
    await sequelize.sync({ force: false });

    // Seed Medicines
    const medCount = await Medicine.count();
    if (medCount === 0) {
      await Medicine.bulkCreate(initialMedicines);
      console.log('Successfully seeded 10 default Indian medicines.');
    } else {
      console.log('Medicines table already populated. Skipping seeding.');
    }

    // Seed a default Admin account if none exists
    const adminExists = await User.findOne({ where: { role: 'admin' } });
    if (!adminExists) {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash('admin123', salt);
      await User.create({
        name: 'SPM System Administrator',
        email: 'admin@spm.in',
        phone: '+919999999999',
        passwordHash,
        role: 'admin',
        status: 'active'
      });
      console.log('Successfully seeded default Admin account:');
      console.log('Phone: +919999999999 | Password: admin123');
    }

    // Seed a default Organization (Hospital) for testing
    const orgExists = await User.findOne({ where: { role: 'organization' } });
    if (!orgExists) {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash('apollo123', salt);
      await User.create({
        name: 'Apollo Hospital Bangalore',
        email: 'admin@apollo.in',
        phone: '+919888888888',
        passwordHash,
        role: 'organization',
        status: 'approved',
        facilityLicense: 'HOSP-2026-KA-0912',
        address: 'Bannerghatta Road, Bangalore, Karnataka - 560076'
      });
      console.log('Successfully seeded default Organization account:');
      console.log('Phone: +919888888888 | Password: apollo123');
    }

    console.log('Database seeding process completed.');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failure:', error);
    process.exit(1);
  }
};

seedDB();
