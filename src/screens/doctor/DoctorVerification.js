import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';
import PremiumInput from '../../components/PremiumInput';
import PremiumButton from '../../components/PremiumButton';
import Loading from '../../components/Loading';
import PremiumBackground from '../../components/PremiumBackground';
import { COLORS, SIZES, BORDER_RADIUS, SHADOWS } from '../../styles/theme';

const DoctorVerification = ({ navigation }) => {
  const [name, setName] = useState('');
  const [regNum, setRegNum] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [clinic, setClinic] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  const [licenseUploaded, setLicenseUploaded] = useState(false);
  const [photoUploaded, setPhotoUploaded] = useState(false);
  
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!name || !regNum || !specialization || !clinic || !email || !phone) {
      alert('Please fill out all verification details.');
      return;
    }
    if (!licenseUploaded || !photoUploaded) {
      alert('Please upload required verification documentation.');
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('OTPVerification', { type: 'registration' });
    }, 1500);
  };

  return (
    <PremiumBackground safeArea={true}>
      <Header onSkipPress={() => console.log("Skip")} title="Practitioner Verification" onBackPress={() => navigation.goBack()} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.title}>Apply for Secure Access</Text>
            <Text style={styles.subtitle}>
              Verify your medical practitioner credentials to initiate smart prescription writing.
            </Text>
          </View>

          <View style={styles.form}>
            <PremiumInput
              label="Full Name (with Prefix)"
              placeholder="e.g. Dr. Sarah Wilson"
              value={name}
              onChangeText={setName}
              iconName="person-outline"
            />

            <PremiumInput
              label="Medical Council Registration Number"
              placeholder="e.g. MC-892401-B"
              value={regNum}
              onChangeText={setRegNum}
              iconName="card-outline"
            />

            <PremiumInput
              label="Specialization / Department"
              placeholder="e.g. Cardiologist"
              value={specialization}
              onChangeText={setSpecialization}
              iconName="git-branch-outline"
            />

            <PremiumInput
              label="Primary Clinic / Hospital Affiliation"
              placeholder="e.g. Metropolitan Cardiology Center"
              value={clinic}
              onChangeText={setClinic}
              iconName="business-outline"
            />

            <PremiumInput
              label="Official Medical Email"
              placeholder="e.g. s.wilson@metro-cardio.org"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              iconName="mail-outline"
            />

            <PremiumInput
              label="Contact Phone Number"
              placeholder="e.g. +1 555-0198"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              iconName="call-outline"
            />

            {/* Document Upload Toggles */}
            <View style={styles.uploadSection}>
              <Text style={styles.uploadHeading}>Required Documentation</Text>
              
              <TouchableOpacity
                onPress={() => setLicenseUploaded(!licenseUploaded)}
                style={[styles.uploadCard, licenseUploaded && styles.uploadCardActive]}
                activeOpacity={0.8}
              >
                <View style={styles.uploadRow}>
                  <Ionicons
                    name={licenseUploaded ? "checkmark-circle" : "document-attach-outline"}
                    size={28}
                    color={licenseUploaded ? COLORS.secondary : COLORS.primary}
                  />
                  <View style={styles.uploadTextContainer}>
                    <Text style={styles.uploadTitle}>Medical License Certificate</Text>
                    <Text style={styles.uploadDesc}>
                      {licenseUploaded ? 'License Certificate Selected ✓' : 'Tap to attach medical council license (PDF/JPG)'}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setPhotoUploaded(!photoUploaded)}
                style={[styles.uploadCard, photoUploaded && styles.uploadCardActive]}
                activeOpacity={0.8}
              >
                <View style={styles.uploadRow}>
                  <Ionicons
                    name={photoUploaded ? "checkmark-circle" : "image-outline"}
                    size={28}
                    color={photoUploaded ? COLORS.secondary : COLORS.primary}
                  />
                  <View style={styles.uploadTextContainer}>
                    <Text style={styles.uploadTitle}>Professional ID Photo</Text>
                    <Text style={styles.uploadDesc}>
                      {photoUploaded ? 'ID Photo Selected ✓' : 'Attach high quality clinical headshot (PNG)'}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            <PremiumButton
              title="Submit Verification Application"
              onPress={handleSubmit}
              style={styles.submitBtn}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Loading visible={loading} text="Uploading credentials packet..." />
    </PremiumBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    flexGrow: 1,
  },
  header: {
    marginVertical: 20,
  },
  title: {
    fontSize: SIZES.extraLarge,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: SIZES.medium,
    color: 'rgba(255,255,255,0.75)',
    lineHeight: 22,
  },
  form: {
    flex: 1,
  },
  uploadSection: {
    marginVertical: 20,
  },
  uploadHeading: {
    fontSize: SIZES.medium,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 12,
    paddingLeft: 4,
  },
  uploadCard: {
    borderRadius: BORDER_RADIUS.card,
    padding: 16,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.2)',
    borderStyle: 'dashed',
    marginBottom: 16,
  },
  uploadCardActive: {
    borderColor: COLORS.secondary,
    backgroundColor: 'rgba(16,185,129,0.2)',
    borderStyle: 'solid',
  },
  uploadRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  uploadTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  uploadTitle: {
    fontSize: SIZES.font + 1,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  uploadDesc: {
    fontSize: SIZES.small,
    color: 'rgba(255,255,255,0.65)',
    marginTop: 2,
  },
  submitBtn: {
    marginVertical: 20,
  },
});

export default DoctorVerification;
