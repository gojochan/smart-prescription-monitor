const http = require('http');

async function testApi(method, path, body, token = null) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : '';
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
      },
    };
    
    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    const req = http.request(options, (res) => {
      let responseBody = '';
      res.on('data', (chunk) => {
        responseBody += chunk;
      });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(responseBody);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, data: responseBody });
        }
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    if (body) {
      req.write(data);
    }
    req.end();
  });
}

async function runTests() {
  console.log('--- STARTING MANUAL API TESTS ---');
  let doctorToken, orgToken, patientToken;
  
  try {
    // 1. Health check
    console.log('\n[TEST 1] Health Check');
    const health = await testApi('GET', '/api/health');
    console.log(health.data);
    
    // 2. Org Login (using default seed credentials)
    console.log('\n[TEST 2] Organization Login');
    const orgLogin = await testApi('POST', '/api/auth/login', {
      input: '+919888888888',
      password: 'apollo123'
    });
    console.log(orgLogin.data);
    if(orgLogin.data.success) orgToken = orgLogin.data.data.token;

    // 3. Register Doctor
    console.log('\n[TEST 3] Doctor Registration');
    const drReg = await testApi('POST', '/api/auth/register', {
      name: 'Dr. Ramesh Kumar',
      email: 'ramesh.kumar@spm.in',
      phone: '+919999911111',
      password: 'drpassword',
      role: 'doctor',
      specialty: 'Cardiologist',
      regNumber: 'MC-2026-999',
      hospital: 'Apollo Hospital Bangalore'
    });
    console.log(drReg.data);

    // 4. Verify Doctor (Org)
    console.log('\n[TEST 4] Organization Fetch Pending Doctors');
    const pendingDrs = await testApi('GET', '/api/orgs/verify-doctors', null, orgToken);
    console.log(pendingDrs.data);
    
    if (pendingDrs.data.success && pendingDrs.data.data && pendingDrs.data.data.length > 0) {
      const drId = pendingDrs.data.data[0].id;
      console.log(`\n[TEST 5] Organization Approve Doctor ID: ${drId}`);
      const approveRes = await testApi('PUT', `/api/orgs/verify-doctors/${drId}`, { status: 'approved' }, orgToken);
      console.log(approveRes.data);
    }

    // 6. Doctor Login
    console.log('\n[TEST 6] Doctor Login');
    const drLogin = await testApi('POST', '/api/auth/login', {
      input: '+919999911111',
      password: 'drpassword'
    });
    console.log(drLogin.data);
    if(drLogin.data.success) doctorToken = drLogin.data.data.token;

    // 7. Register Patient
    console.log('\n[TEST 7] Patient Registration');
    const patReg = await testApi('POST', '/api/auth/register', {
      name: 'Rahul Sharma',
      email: 'rahul.s@spm.in',
      phone: '+918888822222',
      password: 'patpassword',
      role: 'patient',
      gender: 'Male',
      age: 34
    });
    console.log(patReg.data);

    // 8. Patient Login
    console.log('\n[TEST 8] Patient Login');
    const patLogin = await testApi('POST', '/api/auth/login', {
      input: '+918888822222',
      password: 'patpassword'
    });
    console.log(patLogin.data);
    if(patLogin.data.success) patientToken = patLogin.data.data.token;

    // 9. Create Prescription (Doctor)
    console.log('\n[TEST 9] Doctor Create Prescription');
    const prescriptionData = {
      patientName: 'Rahul Sharma',
      patientAge: '34',
      patientGender: 'Male',
      diagnosis: 'Hypertension',
      patientPhone: '+918888822222',
      medicines: [
        {
          name: 'Telmisartan Tablets IP 40mg (Telma 40)',
          strength: '40mg',
          dosage: '1 Tablet',
          frequency: 'Once Daily',
          duration: '30 days',
          instructions: 'After Breakfast',
          startTime: '08:00'
        }
      ]
    };
    const createRx = await testApi('POST', '/api/doctors/prescription', prescriptionData, doctorToken);
    console.log(createRx.data);
    
    let rxId = null;
    if (createRx.data.success && createRx.data.data) {
      rxId = createRx.data.data.id;
    }

    // 10. Sign Prescription (Doctor)
    if (rxId) {
      console.log(`\n[TEST 10] Doctor Sign Prescription ID: ${rxId}`);
      const signRx = await testApi('PUT', `/api/doctors/sign/${rxId}`, null, doctorToken);
      console.log(signRx.data);
    }

    // 11. Patient Dashboard
    console.log('\n[TEST 11] Patient Dashboard');
    const patDash = await testApi('GET', '/api/patients/dashboard', null, patientToken);
    console.log(JSON.stringify(patDash.data, null, 2));

    // 12. Org Dashboard
    console.log('\n[TEST 12] Organization Dashboard');
    const orgDash = await testApi('GET', '/api/orgs/dashboard', null, orgToken);
    console.log(orgDash.data);

    console.log('\n--- ALL MANUAL API TESTS COMPLETED ---');
  } catch (err) {
    console.error('Test script error:', err);
  }
}

runTests();
