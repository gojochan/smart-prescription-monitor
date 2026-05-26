const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

// Indian Phone validation: optional +91 or 91 country code, followed by 10-digits starting with 6, 7, 8, or 9
const validateIndianPhoneNumber = (phone) => {
  const cleanPhone = phone.replace(/[\s-()]/g, ''); // strip spaces, dashes, parentheses
  const regex = /^(?:\+91|91)?[6789]\d{9}$/;
  return {
    isValid: regex.test(cleanPhone),
    normalized: cleanPhone.startsWith('+91') 
      ? cleanPhone 
      : cleanPhone.startsWith('91') && cleanPhone.length === 12 
        ? '+' + cleanPhone 
        : '+91' + cleanPhone.slice(-10)
  };
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'spm_secure_jwt_secret_2026', {
    expiresIn: '30d'
  });
};

const register = async (req, res) => {
  try {
    const { 
      name, 
      email, 
      phone, 
      password, 
      role,
      hospital, 
      regNumber, 
      specialty,
      age, 
      gender,
      facilityLicense, 
      address 
    } = req.body;

    if (!name || !phone || !password || !role) {
      return res.status(400).json({ success: false, message: 'Please provide name, phone, password and role' });
    }

    // Validate phone number format
    const phoneCheck = validateIndianPhoneNumber(phone);
    if (!phoneCheck.isValid) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid phone number. SPM only accepts valid Indian mobile numbers (+91 xxxxx xxxxx)' 
      });
    }
    const normalizedPhone = phoneCheck.normalized;

    // Check if phone or email already exists
    const userExists = await User.findOne({ where: { phone: normalizedPhone } });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'Phone number already registered' });
    }

    if (email) {
      const emailExists = await User.findOne({ where: { email } });
      if (emailExists) {
        return res.status(400).json({ success: false, message: 'Email address already registered' });
      }
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Default status: doctors and organizations require verification, others are active
    const status = (role === 'doctor' || role === 'organization') ? 'pending' : 'active';

    // Create User
    const user = await User.create({
      name,
      email: email || null,
      phone: normalizedPhone,
      passwordHash,
      role,
      status,
      hospital: hospital || null,
      regNumber: regNumber || null,
      specialty: specialty || null,
      age: age ? parseInt(age, 10) : null,
      gender: gender || null,
      facilityLicense: facilityLicense || null,
      address: address || null
    });

    return res.status(201).json({
      success: true,
      message: role === 'doctor' || role === 'organization' 
        ? 'Registration successful. Awaiting verification by administrator.'
        : 'Registration successful.',
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        status: user.status,
        token: generateToken(user.id)
      }
    });

  } catch (error) {
    console.error('Registration Error:', error);
    return res.status(500).json({ success: false, message: 'Server error during registration' });
  }
};

const login = async (req, res) => {
  try {
    const { input, password } = req.body; // 'input' can be email or phone

    if (!input || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email/phone and password' });
    }

    let user;

    // Check if input is a phone number or email
    const isPhoneCandidate = /^\+?[0-9\s-()]{10,15}$/.test(input);
    if (isPhoneCandidate) {
      const phoneCheck = validateIndianPhoneNumber(input);
      if (phoneCheck.isValid) {
        user = await User.findOne({ where: { phone: phoneCheck.normalized } });
      }
    }

    // Fallback or search by email
    if (!user) {
      user = await User.findOne({ where: { email: input } });
    }

    // If still not found, search by exact phone input (in case not normalized previously)
    if (!user && isPhoneCandidate) {
      user = await User.findOne({ where: { phone: input } });
    }

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Check status
    if (user.status === 'rejected') {
      return res.status(403).json({ success: false, message: 'Your credentials registration was rejected by medical admin.' });
    }

    return res.json({
      success: true,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        status: user.status,
        hospital: user.hospital,
        regNumber: user.regNumber,
        specialty: user.specialty,
        age: user.age,
        gender: user.gender,
        facilityLicense: user.facilityLicense,
        address: user.address,
        token: generateToken(user.id)
      }
    });

  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({ success: false, message: 'Server error during login' });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['passwordHash'] }
    });
    return res.json({ success: true, data: user });
  } catch (error) {
    console.error('Profile Error:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching profile' });
  }
};

module.exports = {
  register,
  login,
  getProfile
};
