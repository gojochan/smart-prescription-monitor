import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../../components/Header';
import { COLORS, SIZES, BORDER_RADIUS, SHADOWS } from '../../styles/theme';

const DoctorProfile = ({ navigation }) => {
  const doctor = {
    name: 'Dr. Anjali Desai',
    specialty: 'Consulting Cardiologist & MD',
    hospital: 'Apollo Hospitals, Suite 400',
    license: 'LIC-2024-897315',
    experience: '12 Years',
    education: 'MD - Cardiology, Harvard Medical School',
    email: 'anjali.desai@smartmedical.com',
    phone: '+1 (555) 234-5678',
    status: 'Verified',
  };

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out of your account?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Sign Out', 
          style: 'destructive',
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'RoleSelection' }],
            });
          }
        }
      ]
    );
  };

  const profileOptions = [
    { title: 'Personal Information', desc: 'Edit contact info and office hours', icon: 'person-outline' },
    { title: 'Clinical Settings', desc: 'Default letterhead & generic substitutions', icon: 'medical-outline' },
    { title: 'Digital Cryptographic Stamp', desc: 'Verified secure clinical keys', icon: 'key-outline' },
    { title: 'Security & Consent', desc: 'Two-factor auth and active sessions', icon: 'shield-checkmark-outline' },
    { title: 'Support & Feedback', desc: 'Talk to the SPM IT operations desk', icon: 'help-circle-outline' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header title="My Profile" onBackPress={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <LinearGradient colors={[COLORS.dark, '#1E293B']} style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <LinearGradient colors={[COLORS.primary, COLORS.secondary]} style={styles.avatarGradient}>
              <Text style={styles.avatarText}>SW</Text>
            </LinearGradient>
            <View style={styles.profileDetails}>
              <View style={styles.verifiedRow}>
                <Text style={styles.doctorName}>{doctor.name}</Text>
                <View style={styles.verifiedBadge}>
                  <Ionicons name="checkmark-circle" size={16} color={COLORS.secondary} />
                  <Text style={styles.verifiedText}>{doctor.status}</Text>
                </View>
              </View>
              <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
              <Text style={styles.doctorHospital}>{doctor.hospital}</Text>
            </View>
          </View>

          <View style={styles.cardStatsDivider} />

          <View style={styles.profileStats}>
            <View style={styles.statCol}>
              <Text style={styles.statVal}>382</Text>
              <Text style={styles.statLbl}>Prescriptions</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statCol}>
              <Text style={styles.statVal}>12 Yrs</Text>
              <Text style={styles.statLbl}>Experience</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statCol}>
              <Text style={styles.statVal}>4.9★</Text>
              <Text style={styles.statLbl}>Rating</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Professional Details Section */}
        <Text style={styles.sectionTitle}>Medical Credentials</Text>
        <View style={styles.credentialsCard}>
          <View style={styles.credentialRow}>
            <Ionicons name="ribbon-outline" size={20} color={COLORS.primary} style={styles.credIcon} />
            <View style={styles.credTextCol}>
              <Text style={styles.credLabel}>QUALIFICATIONS</Text>
              <Text style={styles.credValue}>{doctor.education}</Text>
            </View>
          </View>
          <View style={styles.credDivider} />
          <View style={styles.credentialRow}>
            <Ionicons name="card-outline" size={20} color={COLORS.primary} style={styles.credIcon} />
            <View style={styles.credTextCol}>
              <Text style={styles.credLabel}>MEDICAL LICENSE NUMBER</Text>
              <Text style={styles.credValue}>{doctor.license}</Text>
            </View>
          </View>
          <View style={styles.credDivider} />
          <View style={styles.credentialRow}>
            <Ionicons name="mail-outline" size={20} color={COLORS.primary} style={styles.credIcon} />
            <View style={styles.credTextCol}>
              <Text style={styles.credLabel}>OFFICIAL CONTACT EMAIL</Text>
              <Text style={styles.credValue}>{doctor.email}</Text>
            </View>
          </View>
        </View>

        {/* Options List */}
        <Text style={styles.sectionTitle}>Account & Settings</Text>
        <View style={styles.optionsList}>
          {profileOptions.map((opt, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.optionItem}
              activeOpacity={0.7}
              onPress={() => Alert.alert(opt.title, `${opt.title} controls will load in production context.`)}
            >
              <View style={styles.optionIconCircle}>
                <Ionicons name={opt.icon} size={20} color={COLORS.text} />
              </View>
              <View style={styles.optionTextCol}>
                <Text style={styles.optionTitle}>{opt.title}</Text>
                <Text style={styles.optionDesc}>{opt.desc}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={COLORS.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Sign Out Button */}
        <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn} activeOpacity={0.8}>
          <Ionicons name="log-out-outline" size={20} color={COLORS.danger} />
          <Text style={styles.logoutText}>Sign Out of My Account</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>Smart Prescription Monitor v1.2.0 (Stable)</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  profileCard: {
    borderRadius: BORDER_RADIUS.card,
    padding: 24,
    marginBottom: 28,
    ...SHADOWS.premium,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarGradient: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  profileDetails: {
    marginLeft: 16,
    flex: 1,
  },
  verifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  doctorName: {
    fontSize: SIZES.large - 2,
    fontWeight: '900',
    color: '#FFFFFF',
    marginRight: 8,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    marginTop: 4,
  },
  verifiedText: {
    fontSize: 9,
    fontWeight: '900',
    color: COLORS.secondary,
    marginLeft: 3,
  },
  doctorSpecialty: {
    fontSize: SIZES.font,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
    fontWeight: '600',
  },
  doctorHospital: {
    fontSize: SIZES.small,
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: 2,
  },
  cardStatsDivider: {
    height: 1,
    marginVertical: 20,
  },
  profileStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statCol: {
    alignItems: 'center',
  },
  statVal: {
    fontSize: SIZES.large - 2,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  statLbl: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: '600',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 24,
  },
  sectionTitle: {
    fontSize: SIZES.medium + 1,
    fontWeight: '900',
    color: COLORS.text,
    marginBottom: 14,
  },
  credentialsCard: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.card,
    padding: 20,
    marginBottom: 36,
    borderWidth: 1.5,
    borderColor: COLORS.cardBorder,
    ...SHADOWS.soft,
  },
  credentialRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  credIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  credTextCol: {
    flex: 1,
  },
  credLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: COLORS.textSecondary,
    letterSpacing: 0.5,
  },
  credValue: {
    fontSize: SIZES.font,
    fontWeight: '700',
    color: COLORS.text,
    marginTop: 2,
  },
  credDivider: {
    height: 1.2,
    marginVertical: 14,
  },
  optionsList: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.card,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 36,
    borderWidth: 1.5,
    borderColor: COLORS.cardBorder,
    ...SHADOWS.soft,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1.2,
    borderBottomColor: 'rgba(255,255,255,0.15)',
  },
  optionIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    marginRight: 14,
  },
  optionTextCol: {
    flex: 1,
  },
  optionTitle: {
    fontSize: SIZES.font + 1,
    fontWeight: '800',
    color: COLORS.text,
  },
  optionDesc: {
    fontSize: 10,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  logoutBtn: {
    flexDirection: 'row',
    height: 52,
    borderRadius: BORDER_RADIUS.button,
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
    borderWidth: 1.2,
    borderColor: 'rgba(239, 68, 68, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.danger,
    marginLeft: 8,
  },
  versionText: {
    fontSize: 11,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '600',
  },
});

export default DoctorProfile;
