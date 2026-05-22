import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../../components/Header';
import { COLORS, SIZES, BORDER_RADIUS, SHADOWS } from '../../styles/theme';

const PatientProfile = ({ navigation }) => {
  const patient = {
    name: 'John Doe',
    age: '29 Yrs',
    bloodGroup: 'O+ve',
    weight: '72 Kg',
    allergies: 'Penicillin, Sulfa',
    insurance: 'Blue Cross Shield',
    policyId: 'BC-90812-J',
    email: 'john.doe@gmail.com',
    phone: '+1 (555) 987-6543',
    emergencyContact: 'Jane Doe (Wife) - +1 (555) 987-6500',
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

  const vitals = [
    { label: 'BLOOD', value: patient.bloodGroup, icon: 'heart', color: COLORS.danger },
    { label: 'WEIGHT', value: patient.weight, icon: 'barbell', color: COLORS.primary },
    { label: 'ALLERGIES', value: '2 Active', icon: 'warning', color: COLORS.warning },
  ];

  const profileOptions = [
    { title: 'Personal Demographics', desc: 'Manage contact address & email', icon: 'person-outline' },
    { title: 'Linked Pharmacies', desc: 'Automatic prescription forwarding', icon: 'cart-outline' },
    { title: 'Health Wearable Sync', desc: 'Sync Apple Health / Google Fit', icon: 'watch-outline' },
    { title: 'Medical Consent & Sharing', desc: 'Manage doctor-view permissions', icon: 'key-outline' },
    { title: 'IT Helpdesk Support', desc: 'Ask about prescription delivery keys', icon: 'help-circle-outline' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header title="My Health Profile" onBackPress={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <LinearGradient colors={[COLORS.dark, '#1E293B']} style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <LinearGradient colors={[COLORS.primary, COLORS.secondary]} style={styles.avatarGradient}>
              <Text style={styles.avatarText}>JD</Text>
            </LinearGradient>
            <View style={styles.profileDetails}>
              <Text style={styles.patientName}>{patient.name}</Text>
              <Text style={styles.patientSub}>{patient.age} • Patient File ID: SPM-4091</Text>
              <Text style={styles.patientEmail}>{patient.email}</Text>
            </View>
          </View>

          <View style={styles.cardStatsDivider} />

          {/* Vitals Summary Grid */}
          <View style={styles.vitalsRow}>
            {vitals.map((v, idx) => (
              <View key={idx} style={styles.vitalCol}>
                <View style={[styles.vitalIconCircle, { backgroundColor: 'rgba(255,255,255,0.08)' }]}>
                  <Ionicons name={v.icon} size={18} color={v.color} />
                </View>
                <Text style={styles.vitalVal}>{v.value}</Text>
                <Text style={styles.vitalLbl}>{v.label}</Text>
              </View>
            ))}
          </View>
        </LinearGradient>

        {/* Clinical Info Cards */}
        <Text style={styles.sectionTitle}>Insurance & Emergency Contacts</Text>
        <View style={styles.credentialsCard}>
          <View style={styles.credentialRow}>
            <Ionicons name="shield-checkmark-outline" size={20} color={COLORS.primary} style={styles.credIcon} />
            <View style={styles.credTextCol}>
              <Text style={styles.credLabel}>INSURANCE PROVIDER</Text>
              <Text style={styles.credValue}>{patient.insurance}</Text>
              <Text style={styles.credSubValue}>Policy No: {patient.policyId}</Text>
            </View>
          </View>
          <View style={styles.credDivider} />
          <View style={styles.credentialRow}>
            <Ionicons name="call-outline" size={20} color={COLORS.danger} style={styles.credIcon} />
            <View style={styles.credTextCol}>
              <Text style={styles.credLabel}>EMERGENCY CONTACTS</Text>
              <Text style={styles.credValue}>{patient.emergencyContact}</Text>
            </View>
          </View>
          <View style={styles.credDivider} />
          <View style={styles.credentialRow}>
            <Ionicons name="alert-circle-outline" size={20} color={COLORS.warning} style={styles.credIcon} />
            <View style={styles.credTextCol}>
              <Text style={styles.credLabel}>DRUG ALLERGY WARNINGS</Text>
              <Text style={[styles.credValue, { color: COLORS.danger }]}>{patient.allergies}</Text>
            </View>
          </View>
        </View>

        {/* Options List */}
        <Text style={styles.sectionTitle}>Account & Health Settings</Text>
        <View style={styles.optionsList}>
          {profileOptions.map((opt, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.optionItem}
              activeOpacity={0.7}
              onPress={() => Alert.alert(opt.title, `${opt.title} configuration panel will unlock soon.`)}
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

        <Text style={styles.versionText}>Secure patient client terminal v1.2.0</Text>
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
  patientName: {
    fontSize: SIZES.large - 2,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  patientSub: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.75)',
    marginTop: 4,
    fontWeight: '600',
  },
  patientEmail: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.5)',
    marginTop: 2,
  },
  cardStatsDivider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: 20,
  },
  vitalsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  vitalCol: {
    alignItems: 'center',
  },
  vitalIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  vitalVal: {
    fontSize: SIZES.font + 1,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  vitalLbl: {
    fontSize: 8,
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: '700',
    marginTop: 4,
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
    marginBottom: 28,
    borderWidth: 1.2,
    borderColor: '#F1F5F9',
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
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  credTextCol: {
    flex: 1,
  },
  credLabel: {
    fontSize: 8,
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
  credSubValue: {
    fontSize: 10,
    color: COLORS.textSecondary,
    marginTop: 2,
    fontWeight: '600',
  },
  credDivider: {
    height: 1.2,
    backgroundColor: '#F1F5F9',
    marginVertical: 14,
  },
  optionsList: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.card,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 28,
    borderWidth: 1.2,
    borderColor: '#F1F5F9',
    ...SHADOWS.soft,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1.2,
    borderBottomColor: '#F8FAFC',
  },
  optionIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
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

export default PatientProfile;
