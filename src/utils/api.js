import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Resolve backend base url
// 10.0.2.2 is the IP address of the host machine from the Android emulator.
// localhost/127.0.0.1 works on iOS simulators and Web browsers.
const BASE_URL = Platform.select({
  android: 'http://10.0.2.2:5000/api',
  ios: 'http://localhost:5000/api',
  default: 'http://localhost:5000/api',
});

console.log('SPM API Client Base URL:', BASE_URL);

// Helper to make HTTP requests
const request = async (endpoint, options = {}) => {
  try {
    const token = await AsyncStorage.getItem('token');
    
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong with the API call.');
    }

    return data;
  } catch (error) {
    console.error(`API Request Error [${endpoint}]:`, error);
    throw error;
  }
};

export const api = {
  // Authentication Routes
  auth: {
    login: async (input, password) => {
      const res = await request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ input, password }),
      });
      if (res.success && res.data.token) {
        await AsyncStorage.setItem('token', res.data.token);
        await AsyncStorage.setItem('user', JSON.stringify(res.data));
      }
      return res.data;
    },
    
    register: async (payload) => {
      return await request('/auth/register', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    },

    getProfile: async () => {
      return await request('/auth/profile');
    },

    logout: async () => {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
    }
  },

  // Doctor Routes
  doctor: {
    createPrescription: async (payload) => {
      return await request('/doctors/prescription', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    },

    getDashboard: async () => {
      return await request('/doctors/dashboard');
    },

    getHistory: async () => {
      return await request('/doctors/history');
    },

    getPatientHistory: async (name = '', phone = '') => {
      return await request(`/doctors/patient-history?name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}`);
    },

    signPrescription: async (id) => {
      return await request(`/doctors/sign/${id}`, {
        method: 'PUT',
      });
    }
  },

  // Patient Routes
  patient: {
    getDashboard: async () => {
      return await request('/patients/dashboard');
    },

    getMyPrescriptions: async () => {
      return await request('/patients/prescriptions');
    }
  },

  // Organization Routes
  org: {
    getDashboard: async () => {
      return await request('/orgs/dashboard');
    },

    getVerifyDoctors: async () => {
      return await request('/orgs/verify-doctors');
    },

    updateVerifyDoctor: async (id, status) => {
      return await request(`/orgs/verify-doctors/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
      });
    },

    getMedicines: async (category = '', search = '') => {
      return await request(`/orgs/medicines?category=${encodeURIComponent(category)}&search=${encodeURIComponent(search)}`);
    },

    addMedicine: async (payload) => {
      return await request('/orgs/medicines', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
    },

    refillMedicineStock: async (id, quantity) => {
      return await request(`/orgs/medicines/refill/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ quantity }),
      });
    }
  }
};
