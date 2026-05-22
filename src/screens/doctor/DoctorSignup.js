import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PremiumInput from '../../components/PremiumInput';
import PremiumButton from '../../components/PremiumButton';
import { COLORS, SIZES, SHADOWS, BORDER_RADIUS } from '../../styles/theme';

const DoctorSignup = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [hospital, setHospital] = useState('');
  const [regNumber, setRegNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    if (!name || !email || !phone || !hospital || !regNumber || !password) {
      alert('Please fill out all signup credentials.');
      return;
    }
    navigation.replace('DoctorDashboard');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <TouchableOpacity onPress={() => navigation.navigate('DoctorLogin')} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={COLORS.text} />
          </TouchableOpacity>

          <View style={styles.header}>
            <Text style={styles.title}>Register Account</Text>
            <Text style={styles.subtitle}>Apply as a secure medical practitioner</Text>
          </View>

          <View style={styles.formContainer}>
            <PremiumInput
              label="Full Name (with Prefix)"
              placeholder="Dr. Sarah Wilson"
              value={name}
              onChangeText={setName}
              iconName="person-outline"
            />
            
            <PremiumInput
              label="Official Email"
              placeholder="s.wilson@smp-practitioner.org"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              iconName="mail-outline"
            />
            
            <PremiumInput
              label="Contact Phone"
              placeholder="+1 (555) 019-9231"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              iconName="call-outline"
            />
            
            <PremiumInput
              label="Hospital / Institution"
              placeholder="Metropolitan Medical Center"
              value={hospital}
              onChangeText={setHospital}
              iconName="business-outline"
            />
            
            <PremiumInput
              label="Registration Number"
              placeholder="MC-892401-B"
              value={regNumber}
              onChangeText={setRegNumber}
              iconName="card-outline"
            />
            
            <PremiumInput
              label="Security Password"
              placeholder="••••••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
              iconName="lock-closed-outline"
            />

            <View style={styles.buttonContainer}>
              <PremiumButton title="Complete Registration" onPress={handleSignup} />
              
              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Already registered? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('DoctorLogin')}>
                  <Text style={styles.loginLink}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    padding: SIZES.large,
    flexGrow: 1,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(226, 232, 240, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  header: {
    marginBottom: SIZES.large,
    marginTop: SIZES.base,
  },
  title: {
    fontSize: SIZES.title,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.base,
  },
  subtitle: {
    fontSize: SIZES.medium,
    color: COLORS.textSecondary,
  },
  formContainer: {
    flex: 1,
    backgroundColor: COLORS.card,
    padding: SIZES.large,
    borderRadius: BORDER_RADIUS.card,
    ...SHADOWS.premium,
  },
  buttonContainer: {
    marginTop: SIZES.large,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SIZES.large,
  },
  loginText: {
    color: COLORS.textSecondary,
    fontSize: SIZES.font,
  },
  loginLink: {
    color: COLORS.primary,
    fontSize: SIZES.font,
    fontWeight: 'bold',
  },
});

export default DoctorSignup;
