import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Dimensions, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import GradientCard from '../../components/GradientCard';
import { COLORS, SIZES, BORDER_RADIUS, SHADOWS } from '../../styles/theme';

const { width } = Dimensions.get('window');

const PatientDashboard = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [qrVisible, setQrVisible] = useState(false);

  const upcomingDoses = [
    { id: '1', medName: 'Telmisartan', strength: '40 mg', time: '09:00 AM', taken: false, relation: 'Before Breakfast' },
    { id: '2', medName: 'Atorvastatin', strength: '10 mg', time: '09:30 PM', taken: false, relation: 'After Dinner' },
  ];

  const quickStats = [
    { label: 'Weekly Adherence', value: '94%', icon: 'flame', color: COLORS.secondary },
    { label: 'Active Pills', value: '4 Daily', icon: 'medical', color: COLORS.primary },
    { label: 'Next Consult', value: '3 Days', icon: 'calendar', color: COLORS.dark },
  ];

  const menuOptions = [
    { title: 'My Prescriptions', desc: 'Secure digital locker', icon: 'document-text-outline', colors: [COLORS.primary, '#0284C7'], route: 'MyPrescriptions' },
    { title: 'Pill History', desc: 'Adherence timelines & charts', icon: 'analytics-outline', colors: [COLORS.secondary, '#059669'], route: 'MedicineHistory' },
    { title: 'Appointments', desc: 'Book or check consultations', icon: 'time-outline', colors: [COLORS.dark, '#1E293B'], route: 'PatientAppointments' },
    { title: 'Emergency Info', desc: 'Key medical parameters', icon: 'heart-outline', colors: [COLORS.danger, '#DC2626'], route: 'PatientProfile' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <View>
          <Text style={styles.welcomeText}>Good morning,</Text>
          <Text style={styles.patientName}>John Doe</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('PatientProfile')} style={styles.avatarBtn}>
          <LinearGradient colors={[COLORS.primary, COLORS.secondary]} style={styles.avatar}>
            <Text style={styles.avatarText}>JD</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Core Quick Stats Row */}
        <View style={styles.statsRow}>
          {quickStats.map((stat, i) => (
            <View key={i} style={styles.statBox}>
              <View style={[styles.statIconCircle, { backgroundColor: stat.color + '15' }]}>
                <Ionicons name={stat.icon} size={20} color={stat.color} />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Central Scan QR Card */}
        <GradientCard colors={['#0F172A', '#1E293B']} style={styles.qrCard} onPress={() => setQrVisible(true)}>
          <View style={styles.qrContent}>
            <View style={styles.qrTextCol}>
              <Text style={styles.qrTitle}>Show Patient QR Key</Text>
              <Text style={styles.qrDesc}>
                Let your doctor scan this code to securely push new prescriptions directly to your device.
              </Text>
            </View>
            <View style={styles.qrIconCircle}>
              <Ionicons name="qr-code" size={32} color={COLORS.primary} />
            </View>
          </View>
        </GradientCard>

        {/* Next Dose Alert Widget */}
        <Text style={styles.sectionTitle}>Pill Reminders Today</Text>
        <View style={styles.reminderCard}>
          {upcomingDoses.map((dose, i) => (
            <View key={dose.id} style={[styles.doseItem, i === upcomingDoses.length - 1 && styles.noBorder]}>
              <View style={styles.doseIconCircle}>
                <Ionicons name="alarm-outline" size={22} color={COLORS.primary} />
              </View>
              <View style={styles.doseDetails}>
                <Text style={styles.doseMedName}>{dose.medName} <Text style={styles.doseStrength}>{dose.strength}</Text></Text>
                <Text style={styles.doseSubText}>{dose.time} • {dose.relation}</Text>
              </View>
              <TouchableOpacity style={styles.takeBtn} activeOpacity={0.7}>
                <Text style={styles.takeBtnText}>Take</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Dash Grid Options */}
        <Text style={styles.sectionTitle}>Medical Care Desk</Text>
        <View style={styles.grid}>
          {menuOptions.map((opt, index) => (
            <GradientCard
              key={index}
              colors={opt.colors}
              onPress={() => navigation.navigate(opt.route)}
              style={styles.gridCard}
            >
              <Ionicons name={opt.icon} size={30} color="#FFFFFF" />
              <Text style={styles.gridTitle}>{opt.title}</Text>
              <Text style={styles.gridDesc}>{opt.desc}</Text>
            </GradientCard>
          ))}
        </View>
      </ScrollView>

      {/* Floating Bottom Bar */}
      <View style={styles.bottomBarContainer}>
        <View style={styles.bottomBar}>
          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => {
              setActiveTab('home');
            }}
          >
            <Ionicons
              name={activeTab === 'home' ? 'home' : 'home-outline'}
              size={24}
              color={activeTab === 'home' ? COLORS.primary : COLORS.textSecondary}
            />
            <Text style={[styles.tabLabel, activeTab === 'home' && styles.tabLabelActive]}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => setQrVisible(true)}
          >
            <View style={styles.addTabCircle}>
              <Ionicons name="qr-code" size={24} color="#FFFFFF" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => navigation.navigate('PatientProfile')}
          >
            <Ionicons
              name={activeTab === 'profile' ? 'person' : 'person-outline'}
              size={24}
              color={activeTab === 'profile' ? COLORS.primary : COLORS.textSecondary}
            />
            <Text style={[styles.tabLabel, activeTab === 'profile' && styles.tabLabelActive]}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Interactive QR Modal */}
      <Modal
        visible={qrVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setQrVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <TouchableOpacity onPress={() => setQrVisible(false)} style={styles.modalCloseBtn}>
              <Ionicons name="close" size={24} color={COLORS.text} />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Your Clinical QR Key</Text>
            <Text style={styles.modalDesc}>
              Doctors use this secure key to link your file and write prescriptions.
            </Text>

            {/* Premium Simulated QR Core Grid */}
            <View style={styles.simulatedQR}>
              <LinearGradient colors={['#0F172A', '#1E293B']} style={styles.qrInner}>
                <View style={styles.qrSquareRow}>
                  <View style={styles.qrSubSquare} />
                  <View style={[styles.qrSubSquare, { opacity: 0.1 }]} />
                  <View style={styles.qrSubSquare} />
                </View>
                <View style={[styles.qrSquareRow, { marginVertical: 12 }]}>
                  <View style={[styles.qrSubSquare, { opacity: 0.1 }]} />
                  <View style={styles.qrSubSquare} />
                  <View style={[styles.qrSubSquare, { opacity: 0.1 }]} />
                </View>
                <View style={styles.qrSquareRow}>
                  <View style={styles.qrSubSquare} />
                  <View style={[styles.qrSubSquare, { opacity: 0.1 }]} />
                  <View style={styles.qrSubSquare} />
                </View>
              </LinearGradient>
            </View>

            <View style={styles.patientIDCard}>
              <Text style={styles.cardIDLabel}>PATIENT DATA LINK KEY</Text>
              <Text style={styles.cardIDValue}>SPM-JOHN-DOE-9801</Text>
            </View>

            <View style={styles.modalFooterNote}>
              <Ionicons name="lock-closed" size={14} color={COLORS.secondary} />
              <Text style={styles.footerNoteText}>
                Encrypted end-to-end. Keys regenerate automatically.
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: COLORS.card,
    borderBottomWidth: 1.2,
    borderBottomColor: '#F1F5F9',
    ...SHADOWS.soft,
  },
  welcomeText: {
    fontSize: SIZES.font,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  patientName: {
    fontSize: SIZES.large,
    fontWeight: '900',
    color: COLORS.text,
    marginTop: 2,
  },
  avatarBtn: {
    ...SHADOWS.soft,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 110,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statBox: {
    width: (width - 72) / 3,
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.card,
    padding: 16,
    alignItems: 'center',
    ...SHADOWS.soft,
    borderWidth: 1.2,
    borderColor: '#F1F5F9',
  },
  statIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  statValue: {
    fontSize: SIZES.large - 2,
    fontWeight: '900',
    color: COLORS.text,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },
  qrCard: {
    marginBottom: 28,
  },
  qrContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qrTextCol: {
    flex: 1,
    paddingRight: 12,
  },
  qrTitle: {
    fontSize: SIZES.medium + 1,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  qrDesc: {
    fontSize: SIZES.small + 1,
    color: 'rgba(255, 255, 255, 0.75)',
    lineHeight: 18,
  },
  qrIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: SIZES.medium + 2,
    fontWeight: '900',
    color: COLORS.text,
    marginBottom: 16,
  },
  reminderCard: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.card,
    padding: 20,
    marginBottom: 28,
    borderWidth: 1.2,
    borderColor: '#F1F5F9',
    ...SHADOWS.soft,
  },
  doseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1.2,
    borderBottomColor: '#F8FAFC',
  },
  noBorder: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  doseIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F0F9FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  doseDetails: {
    flex: 1,
  },
  doseMedName: {
    fontSize: SIZES.font + 1,
    fontWeight: '800',
    color: COLORS.text,
  },
  doseStrength: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  doseSubText: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 4,
    fontWeight: '600',
  },
  takeBtn: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    ...SHADOWS.soft,
  },
  takeBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  gridCard: {
    width: (width - 64) / 2,
    marginBottom: 16,
    height: 150,
    justifyContent: 'space-between',
  },
  gridTitle: {
    fontSize: SIZES.medium,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 12,
  },
  gridDesc: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.85)',
    marginTop: 2,
  },
  bottomBarContainer: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    right: 24,
    ...SHADOWS.premium,
  },
  bottomBar: {
    flexDirection: 'row',
    height: 72,
    backgroundColor: COLORS.card,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 10,
    color: COLORS.textSecondary,
    fontWeight: '600',
    marginTop: 4,
  },
  tabLabelActive: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  addTabCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.premium,
    transform: [{ translateY: -4 }],
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  modalCard: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.card,
    padding: 24,
    width: '100%',
    alignItems: 'center',
    ...SHADOWS.premium,
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
  },
  modalCloseBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
  },
  modalTitle: {
    fontSize: SIZES.large - 2,
    fontWeight: '900',
    color: COLORS.text,
    marginTop: 16,
    marginBottom: 8,
  },
  modalDesc: {
    fontSize: SIZES.font,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 12,
    marginBottom: 24,
  },
  simulatedQR: {
    width: 180,
    height: 180,
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    ...SHADOWS.soft,
  },
  qrInner: {
    width: '100%',
    height: '100%',
    borderRadius: 14,
    padding: 16,
    justifyContent: 'center',
  },
  qrSquareRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  qrSubSquare: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
  },
  patientIDCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardIDLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: COLORS.textSecondary,
    letterSpacing: 0.5,
  },
  cardIDValue: {
    fontSize: SIZES.font + 1,
    fontWeight: '800',
    color: COLORS.text,
    marginTop: 4,
  },
  modalFooterNote: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerNoteText: {
    fontSize: 10,
    color: COLORS.textSecondary,
    fontWeight: '700',
    marginLeft: 6,
  },
});

export default PatientDashboard;
