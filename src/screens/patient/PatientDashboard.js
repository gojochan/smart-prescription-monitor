import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import GradientCard from '../../components/GradientCard';
import PremiumBackground from '../../components/PremiumBackground';
import { COLORS, SIZES, BORDER_RADIUS, SHADOWS } from '../../styles/theme';
import { getUpcomingReminders, markReminderTaken } from '../../utils/storage';
import { scheduleTestNotification } from '../../utils/notifications';

const { width } = Dimensions.get('window');

const PatientDashboard = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [qrVisible, setQrVisible] = useState(false);

  const [upcomingDoses, setUpcomingDoses] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadReminders();
    });
    return unsubscribe;
  }, [navigation]);

  const loadReminders = async () => {
    const data = await getUpcomingReminders();
    setUpcomingDoses(data.slice(0, 3));
  };

  const handleTakeDose = async (id) => {
    await markReminderTaken(id);
    loadReminders();
  };

  const handleTestNotification = async () => {
    const id = await scheduleTestNotification();
    if (id) {
      // Notification scheduled
    }
  };

  const quickStats = [
    { label: 'Weekly Adherence', value: '94%', icon: 'flame', color: COLORS.secondary },
    { label: 'Active Pills', value: '4 Daily', icon: 'medical', color: COLORS.primary },
    { label: 'Next Consult', value: '3 Days', icon: 'calendar', color: COLORS.dark },
  ];

  const menuOptions = [
    { title: 'My Prescriptions', desc: 'Secure digital locker', icon: 'document-text-outline', colors: [COLORS.primary, '#0284C7'], route: 'MyPrescriptions' },
    { title: 'Upcoming', desc: 'Future scheduled doses', icon: 'time-outline', colors: [COLORS.secondary, '#059669'], route: 'UpcomingSchedule' },
    { title: 'Completed Doses', desc: 'Successfully taken', icon: 'checkmark-circle-outline', colors: [COLORS.success, '#22C55E'], route: 'CompletedMedicines' },
    { title: 'Missed Doses', desc: 'Medicines you forgot', icon: 'close-circle-outline', colors: [COLORS.danger, '#EF4444'], route: 'MissedMedicines' },
    { title: 'Reminder History', desc: 'Timeline of alarms', icon: 'list-outline', colors: [COLORS.dark, '#1E293B'], route: 'MedicineReminderHistory' },
    { title: 'Emergency Info', desc: 'Key medical parameters', icon: 'heart-outline', colors: [COLORS.warning, '#F59E0B'], route: 'PatientProfile' },
  ];

  return (
    <PremiumBackground safeArea={true} colors={['#0f172a', '#064e3b']}>
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
            <LinearGradient 
              key={i} 
              colors={[`${stat.color}20`, `${stat.color}05`]} 
              style={[styles.statBox, { borderColor: `${stat.color}40` }]}
            >
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </LinearGradient>
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
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <Text style={[styles.sectionTitle, { marginBottom: 0 }]}>Pill Reminders Today</Text>
          <TouchableOpacity onPress={handleTestNotification} style={styles.testBtn} activeOpacity={0.7}>
            <Ionicons name="alarm-outline" size={14} color="#FFFFFF" style={{ marginRight: 6 }} />
            <Text style={styles.testBtnText}>Test 10s Alarm</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.reminderCard}>
          {upcomingDoses.length === 0 ? (
            <Text style={{ textAlign: 'center', color: COLORS.textSecondary, padding: 10 }}>No upcoming doses currently.</Text>
          ) : (
            upcomingDoses.map((dose, i) => (
              <View key={dose.id} style={[styles.doseItem, i === upcomingDoses.length - 1 && styles.noBorder]}>
                <View style={styles.doseIconCircle}>
                  <Ionicons name="alarm-outline" size={22} color={COLORS.primary} />
                </View>
                <View style={styles.doseDetails}>
                  <Text style={styles.doseMedName}>{dose.medicine} <Text style={styles.doseStrength}>{dose.dosage}</Text></Text>
                  <Text style={styles.doseSubText}>{new Date(dose.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} • {dose.instructions || 'As directed'}</Text>
                </View>
                <TouchableOpacity onPress={() => handleTakeDose(dose.id)} style={styles.takeBtn} activeOpacity={0.7}>
                  <Text style={styles.takeBtnText}>Take</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
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
    </PremiumBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.15)',
  },
  welcomeText: {
    fontSize: SIZES.font,
    color: 'rgba(255,255,255,0.75)',
    fontWeight: '600',
  },
  patientName: {
    fontSize: SIZES.large,
    fontWeight: '900',
    color: '#FFFFFF',
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
    flexGrow: 1,
    paddingBottom: 120,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  statBox: {
    width: (width - 72) / 3,
    borderRadius: BORDER_RADIUS.card,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.25)',
    ...SHADOWS.glass,
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
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.7)',
    marginTop: 4,
    textAlign: 'center',
  },
  qrCard: {
    marginBottom: 36,
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: SIZES.medium + 2,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  reminderCard: {
    borderRadius: BORDER_RADIUS.card,
    padding: 20,
    marginBottom: 36,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.25)',
    ...SHADOWS.glass,
  },
  doseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  noBorder: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  doseIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(14,165,233,0.2)',
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
    color: '#FFFFFF',
  },
  doseStrength: {
    fontSize: SIZES.small,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '600',
  },
  doseSubText: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.6)',
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
    marginBottom: 36,
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
    backgroundColor: 'rgba(7,27,52,0.85)',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.55)',
    fontWeight: '600',
    marginTop: 4,
  },
  tabLabelActive: {
    color: '#FFFFFF',
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
    backgroundColor: COLORS.dark,
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
    backgroundColor: COLORS.dark,
  },
  patientIDCard: {
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
  testBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  testBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
});

export default PatientDashboard;
