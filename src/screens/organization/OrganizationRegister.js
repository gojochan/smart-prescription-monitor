import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import PremiumInput from '../../components/PremiumInput';
import PremiumButton from '../../components/PremiumButton';
import Loading from '../../components/Loading';
import { COLORS, SIZES, BORDER_RADIUS, SHADOWS } from '../../styles/theme';

import { api } from '../../utils/api';

const OrganizationRegister = ({ navigation }) => {
  const [facilityName, setFacilityName] = useState('');
  const [licenseNo, setLicenseNo] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateIndianPhone = (ph) => {
    const clean = ph.replace(/[\s-()]/g, '');
    return /^(?:\+91|91)?[6789]\d{9}$/.test(clean);
  };

  const handleRegister = async () => {
    if (!facilityName || !licenseNo || !email || !phone || !password || !address) {
      Alert.alert('Missing Info', 'Please fill out all clinical facility registration details.');
      return;
    }

    if (!validateIndianPhone(phone)) {
      Alert.alert('Invalid Phone', 'Please enter a valid Indian contact mobile number (+91 xxxxx xxxxx).');
      return;
    }

    setIsLoading(true);
    try {
      await api.auth.register({
        name: facilityName,
        email,
        phone,
        password,
        role: 'organization',
        facilityLicense: licenseNo,
        address
      });
      setIsLoading(false);
      Alert.alert(
        'Registration Initiated',
        'Clinical facility application successfully sent. Waiting for medical board review.',
        [{ text: 'Proceed to Terminal', onPress: () => navigation.replace('OrganizationLogin') }]
      );
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Registration Failed', error.message || 'Server error.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Back btn */}
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back-outline" size={24} color={COLORS.text} />
          </TouchableOpacity>

          <View style={styles.heroSection}>
            <LinearGradient colors={[COLORS.primary, COLORS.secondary]} style={styles.logoBadge}>
              <Ionicons name="business" size={32} color="#FFFFFF" />
            </LinearGradient>
            <Text style={styles.title}>Register Medical Facility</Text>
            <Text style={styles.subtitle}>Onboard to the SPM Secure Network</Text>
          </View>

          {/* Form Card */}
          <View style={styles.formCard}>
            <PremiumInput
              label="CLINICAL FACILITY / HOSPITAL NAME"
              placeholder="e.g. Apollo Hospitals"
              value={facilityName}
              onChangeText={setFacilityName}
              icon="business-outline"
            />

            <PremiumInput
              label="FACILITY LICENSE REGISTRATION NO"
              placeholder="e.g. HOSP-2026-9802-MH"
              value={licenseNo}
              onChangeText={setLicenseNo}
              icon="document-text-outline"
            />

            <PremiumInput
              label="OFFICIAL ADMINISTRATOR EMAIL"
              placeholder="e.g. operations@smartmedical.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              icon="mail-outline"
            />

            <PremiumInput
              label="ADMINISTRATOR PHONE NUMBER"
              placeholder="e.g. +91 98888 88888"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              icon="call-outline"
            />

            <PremiumInput
              label="FACILITY PHYSICAL ADDRESS"
              placeholder="e.g. 100 Innovation Way, Suite 400"
              value={address}
              onChangeText={setAddress}
              icon="location-outline"
            />

            <PremiumInput
              label="SECURITY ACCESS PASSWORD"
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
              icon="lock-closed-outline"
            />

            <View style={styles.actionContainer}>
              <PremiumButton 
                title="Submit Onboarding Request" 
                onPress={handleRegister}
                gradientColors={[COLORS.primary, COLORS.secondary]}
              />
            </View>
          </View>

          <View style={styles.footerRow}>
            <Text style={styles.footerLabel}>Already registered?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('OrganizationLogin')}>
              <Text style={styles.footerAction}>Admin Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {isLoading && <Loading visible={true} message="Transmitting clinical registry application..." />}
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
    padding: 24,
    flexGrow: 1,
    justifyContent: 'center',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.card,
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    position: 'absolute',
    top: 10,
    left: 24,
    ...SHADOWS.soft,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 28,
    marginTop: 60,
  },
  logoBadge: {
    width: 68,
    height: 68,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    ...SHADOWS.premium,
  },
  title: {
    fontSize: SIZES.title - 4,
    fontWeight: '900',
    color: COLORS.text,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textSecondary,
    marginTop: 6,
  },
  formCard: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.card,
    padding: 24,
    borderWidth: 1.2,
    borderColor: '#F1F5F9',
    ...SHADOWS.soft,
    marginBottom: 24,
  },
  actionContainer: {
    marginTop: 24,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  footerLabel: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  footerAction: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.primary,
    marginLeft: 6,
  },
});

export default OrganizationRegister;
