import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Auth & General Flow
import SplashScreen from '../screens/auth/SplashScreen';
import Onboarding from '../screens/auth/Onboarding';
import RoleSelection from '../screens/auth/RoleSelection';
import ForgotPassword from '../screens/auth/ForgotPassword';
import OTPVerification from '../screens/auth/OTPVerification';
import VerificationPending from '../screens/auth/VerificationPending';

// Doctor Stack
import DoctorLogin from '../screens/doctor/DoctorLogin';
import DoctorSignup from '../screens/doctor/DoctorSignup';
import DoctorVerification from '../screens/doctor/DoctorVerification';
import DoctorDashboard from '../screens/doctor/DoctorDashboard';
import CreatePrescription from '../screens/doctor/CreatePrescription';
import PatientHistory from '../screens/doctor/PatientHistory';
import PrescriptionHistory from '../screens/doctor/PrescriptionHistory';
import GeneratePDF from '../screens/doctor/GeneratePDF';
import DoctorProfile from '../screens/doctor/DoctorProfile';
import Notifications from '../screens/doctor/Notifications';
import Settings from '../screens/doctor/Settings';

// Patient Stack
import PatientLogin from '../screens/patient/PatientLogin';
import PatientSignup from '../screens/patient/PatientSignup';
import PatientDashboard from '../screens/patient/PatientDashboard';
import MyPrescriptions from '../screens/patient/MyPrescriptions';
import MedicineHistory from '../screens/patient/MedicineHistory';
import PatientProfile from '../screens/patient/PatientProfile';
import Appointments from '../screens/patient/Appointments';
import UpcomingSchedule from '../screens/patient/UpcomingSchedule';
import CompletedMedicines from '../screens/patient/CompletedMedicines';
import MissedMedicines from '../screens/patient/MissedMedicines';
import MedicineReminderHistory from '../screens/patient/MedicineReminderHistory';

// Organization Stack
import OrganizationRegister from '../screens/organization/OrganizationRegister';
import OrganizationLogin from '../screens/organization/OrganizationLogin';
import OrganizationDashboard from '../screens/organization/OrganizationDashboard';
import VerifyDoctors from '../screens/organization/VerifyDoctors';
import Analytics from '../screens/organization/Analytics';
import ManageMedicines from '../screens/organization/ManageMedicines';

// Admin Stack
import AdminLogin from '../screens/admin/AdminLogin';
import AdminDashboard from '../screens/admin/AdminDashboard';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      {/* General Setup & Auth */}
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="RoleSelection" component={RoleSelection} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="OTPVerification" component={OTPVerification} />
      <Stack.Screen name="VerificationPending" component={VerificationPending} />

      {/* Doctor Module */}
      <Stack.Screen name="DoctorLogin" component={DoctorLogin} />
      <Stack.Screen name="DoctorSignup" component={DoctorSignup} />
      <Stack.Screen name="DoctorVerification" component={DoctorVerification} />
      <Stack.Screen name="DoctorDashboard" component={DoctorDashboard} />
      <Stack.Screen name="CreatePrescription" component={CreatePrescription} />
      <Stack.Screen name="PatientHistory" component={PatientHistory} />
      <Stack.Screen name="PrescriptionHistory" component={PrescriptionHistory} />
      <Stack.Screen name="GeneratePDF" component={GeneratePDF} />
      <Stack.Screen name="DoctorProfile" component={DoctorProfile} />
      <Stack.Screen name="DoctorNotifications" component={Notifications} />
      <Stack.Screen name="DoctorSettings" component={Settings} />

      {/* Patient Module */}
      <Stack.Screen name="PatientLogin" component={PatientLogin} />
      <Stack.Screen name="PatientSignup" component={PatientSignup} />
      <Stack.Screen name="PatientDashboard" component={PatientDashboard} />
      <Stack.Screen name="MyPrescriptions" component={MyPrescriptions} />
      <Stack.Screen name="MedicineHistory" component={MedicineHistory} />
      <Stack.Screen name="PatientProfile" component={PatientProfile} />
      <Stack.Screen name="PatientAppointments" component={Appointments} />
      <Stack.Screen name="UpcomingSchedule" component={UpcomingSchedule} />
      <Stack.Screen name="CompletedMedicines" component={CompletedMedicines} />
      <Stack.Screen name="MissedMedicines" component={MissedMedicines} />
      <Stack.Screen name="MedicineReminderHistory" component={MedicineReminderHistory} />

      {/* Organization Module */}
      <Stack.Screen name="OrganizationRegister" component={OrganizationRegister} />
      <Stack.Screen name="OrganizationLogin" component={OrganizationLogin} />
      <Stack.Screen name="OrganizationDashboard" component={OrganizationDashboard} />
      <Stack.Screen name="VerifyDoctors" component={VerifyDoctors} />
      <Stack.Screen name="Analytics" component={Analytics} />
      <Stack.Screen name="ManageMedicines" component={ManageMedicines} />

      {/* Admin Module */}
      <Stack.Screen name="AdminLogin" component={AdminLogin} />
      <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
