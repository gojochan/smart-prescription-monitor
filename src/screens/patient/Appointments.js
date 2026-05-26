import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, FlatList, Dimensions, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../../components/Header';
import { COLORS, SIZES, BORDER_RADIUS, SHADOWS } from '../../styles/theme';

const { width } = Dimensions.get('window');

const Appointments = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('upcoming');
  const [bookingModalVisible, setBookingModalVisible] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  const activeAppointments = [
    { id: '1', drName: 'Dr. Anjali Desai', specialty: 'Cardiologist', date: 'May 25, 2026', time: '10:00 AM', clinic: 'Apollo Hospitals, Room 402' },
  ];

  const pastAppointments = [
    { id: '2', drName: 'Dr. James Smith', specialty: 'Dermatologist', date: 'Apr 10, 2026', time: '02:30 PM', clinic: 'Skin & Allergy Care Clinic' },
    { id: '3', drName: 'Dr. Emily Watson', specialty: 'General Physician', date: 'Mar 15, 2026', time: '11:15 AM', clinic: 'Apex Clinic, Sector 12' },
  ];

  const availableDoctors = [
    { id: '101', name: 'Dr. Anjali Desai', specialty: 'Cardiology Specialist', rating: '4.9', experience: '12 Yrs', slots: ['09:00 AM', '10:00 AM', '11:30 AM', '04:00 PM'] },
    { id: '102', name: 'Dr. James Smith', specialty: 'Consultant Dermatologist', rating: '4.8', experience: '10 Yrs', slots: ['02:00 PM', '02:30 PM', '03:00 PM', '05:30 PM'] },
    { id: '103', name: 'Dr. Aaron Patel', specialty: 'Neurology Expert', rating: '4.9', experience: '15 Yrs', slots: ['10:30 AM', '11:00 AM', '01:00 PM', '03:30 PM'] },
  ];

  const handleBooking = () => {
    if (!selectedTimeSlot) {
      Alert.alert('Selection Required', 'Please choose a preferred time slot.');
      return;
    }
    Alert.alert(
      'Appointment Request',
      `Your consultation request with ${selectedDoctor.name} has been sent successfully. Waiting for practitioner approval.`,
      [{ text: 'Great', onPress: () => resetBookingState() }]
    );
  };

  const resetBookingState = () => {
    setBookingModalVisible(false);
    setSelectedDoctor(null);
    setSelectedTimeSlot(null);
  };

  const renderAppointmentItem = (item, isPast) => (
    <View style={styles.appCard}>
      <View style={styles.appHeader}>
        <View style={styles.drIconCircle}>
          <Ionicons name="people-outline" size={20} color={COLORS.primary} />
        </View>
        <View style={styles.appDrInfo}>
          <Text style={styles.appDrName}>{item.drName}</Text>
          <Text style={styles.appDrSpec}>{item.specialty}</Text>
        </View>
        {isPast ? (
          <View style={styles.completedBadge}>
            <Text style={styles.completedBadgeText}>Completed</Text>
          </View>
        ) : (
          <View style={styles.upcomingBadge}>
            <Text style={styles.upcomingBadgeText}>Confirmed</Text>
          </View>
        )}
      </View>

      <View style={styles.appDivider} />

      <View style={styles.appDetailsRow}>
        <View style={styles.appDetailItem}>
          <Ionicons name="calendar-outline" size={16} color={COLORS.textSecondary} />
          <Text style={styles.appDetailText}>{item.date}</Text>
        </View>
        <View style={styles.appDetailItem}>
          <Ionicons name="time-outline" size={16} color={COLORS.textSecondary} />
          <Text style={styles.appDetailText}>{item.time}</Text>
        </View>
      </View>
      
      <View style={[styles.appDetailItem, { marginTop: 10 }]}>
        <Ionicons name="location-outline" size={16} color={COLORS.textSecondary} />
        <Text style={styles.appDetailText} numberOfLines={1}>{item.clinic}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header onSkipPress={() => console.log("Skip")} title="My Appointments" onBackPress={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Navigation Tabs */}
        <View style={styles.tabsStrip}>
          <TouchableOpacity 
            onPress={() => setSelectedTab('upcoming')}
            style={[styles.tabBtn, selectedTab === 'upcoming' && styles.tabBtnActive]}
          >
            <Text style={[styles.tabBtnText, selectedTab === 'upcoming' && styles.tabBtnTextActive]}>Upcoming</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setSelectedTab('past')}
            style={[styles.tabBtn, selectedTab === 'past' && styles.tabBtnActive]}
          >
            <Text style={[styles.tabBtnText, selectedTab === 'past' && styles.tabBtnTextActive]}>Past Consults</Text>
          </TouchableOpacity>
        </View>

        {/* Selected List */}
        {selectedTab === 'upcoming' ? (
          activeAppointments.map(app => renderAppointmentItem(app, false))
        ) : (
          pastAppointments.map(app => renderAppointmentItem(app, true))
        )}

        {/* Booking Section */}
        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Book Clinical Consultation</Text>
        <Text style={styles.sectionSubtitle}>Select a verified clinical practitioner to secure a checkup schedule.</Text>

        <View style={styles.drGrid}>
          {availableDoctors.map(dr => (
            <View key={dr.id} style={styles.drCard}>
              <View style={styles.drCardTop}>
                <LinearGradient colors={[COLORS.primary, COLORS.secondary]} style={styles.drAvatarCircle}>
                  <Text style={styles.drAvatarText}>{dr.name.split(' ')[1][0]}</Text>
                </LinearGradient>
                <View style={styles.drCardDetails}>
                  <Text style={styles.drNameText}>{dr.name}</Text>
                  <Text style={styles.drSpecText}>{dr.specialty}</Text>
                  <View style={styles.drMetaRow}>
                    <Text style={styles.drMetaText}>★ {dr.rating}</Text>
                    <Text style={styles.drMetaDivider}>•</Text>
                    <Text style={styles.drMetaText}>{dr.experience} Exp</Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity 
                style={styles.bookBtn} 
                activeOpacity={0.8}
                onPress={() => {
                  setSelectedDoctor(dr);
                  setBookingModalVisible(true);
                }}
              >
                <Text style={styles.bookBtnText}>Request Appointment Slot</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Slide Booking Sheet */}
      {bookingModalVisible && selectedDoctor && (
        <View style={styles.modalOverlay}>
          <View style={styles.sheetCard}>
            <View style={styles.sheetTopRow}>
              <Text style={styles.sheetHeading}>Schedule Consultation</Text>
              <TouchableOpacity onPress={resetBookingState} style={styles.sheetCloseBtn}>
                <Ionicons name="close" size={22} color={COLORS.text} />
              </TouchableOpacity>
            </View>

            <View style={styles.sheetDrCard}>
              <Text style={styles.sheetDrName}>{selectedDoctor.name}</Text>
              <Text style={styles.sheetDrSpec}>{selectedDoctor.specialty} • {selectedDoctor.experience} Experience</Text>
            </View>

            <Text style={styles.slotHeading}>Select Consultation Slot (Today)</Text>
            
            <View style={styles.slotsGrid}>
              {selectedDoctor.slots.map(slot => {
                const isSelected = selectedTimeSlot === slot;
                return (
                  <TouchableOpacity
                    key={slot}
                    onPress={() => setSelectedTimeSlot(slot)}
                    style={[styles.slotChip, isSelected && styles.slotChipActive]}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.slotChipText, isSelected && styles.slotChipTextActive]}>{slot}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <TouchableOpacity style={styles.confirmBookingBtn} activeOpacity={0.8} onPress={handleBooking}>
              <Text style={styles.confirmBookingText}>Confirm and Notify Doctor</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
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
  tabsStrip: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 4,
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    marginBottom: 20,
    ...SHADOWS.soft,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  tabBtnActive: {
    backgroundColor: COLORS.primary,
  },
  tabBtnText: {
    fontSize: SIZES.font,
    fontWeight: '800',
    color: COLORS.textSecondary,
  },
  tabBtnTextActive: {
    color: '#FFFFFF',
  },
  appCard: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.card - 4,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1.2,
    borderColor: '#F1F5F9',
    ...SHADOWS.soft,
  },
  appHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  drIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  appDrInfo: {
    flex: 1,
  },
  appDrName: {
    fontSize: SIZES.font + 1,
    fontWeight: '800',
    color: COLORS.text,
  },
  appDrSpec: {
    fontSize: 10,
    color: COLORS.textSecondary,
    marginTop: 2,
    fontWeight: '600',
  },
  upcomingBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  upcomingBadgeText: {
    fontSize: 9,
    fontWeight: '900',
    color: COLORS.secondary,
  },
  completedBadge: {
    backgroundColor: 'rgba(100, 116, 139, 0.08)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  completedBadgeText: {
    fontSize: 9,
    fontWeight: '900',
    color: COLORS.textSecondary,
  },
  appDivider: {
    height: 1.2,
    marginVertical: 14,
  },
  appDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  appDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  appDetailText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginLeft: 6,
  },
  sectionTitle: {
    fontSize: SIZES.medium + 1,
    fontWeight: '900',
    color: COLORS.text,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
    lineHeight: 18,
    marginBottom: 16,
    fontWeight: '600',
  },
  drGrid: {
    marginBottom: 20,
  },
  drCard: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.card,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1.2,
    borderColor: '#F1F5F9',
    ...SHADOWS.soft,
  },
  drCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  drAvatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  drAvatarText: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  drCardDetails: {
    flex: 1,
  },
  drNameText: {
    fontSize: SIZES.font + 1,
    fontWeight: '800',
    color: COLORS.text,
  },
  drSpecText: {
    fontSize: 11,
    color: COLORS.textSecondary,
    fontWeight: '600',
    marginTop: 2,
  },
  drMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  drMetaText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.secondary,
  },
  drMetaDivider: {
    fontSize: 10,
    color: COLORS.textSecondary,
    marginHorizontal: 6,
  },
  bookBtn: {
    backgroundColor: COLORS.primary,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    justifyContent: 'flex-end',
  },
  sheetCard: {
    backgroundColor: COLORS.card,
    borderTopLeftRadius: BORDER_RADIUS.card,
    borderTopRightRadius: BORDER_RADIUS.card,
    padding: 24,
    ...SHADOWS.premium,
  },
  sheetTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sheetHeading: {
    fontSize: SIZES.large - 2,
    fontWeight: '900',
    color: COLORS.text,
  },
  sheetCloseBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
  },
  sheetDrCard: {
    borderRadius: 12,
    padding: 14,
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  sheetDrName: {
    fontSize: SIZES.font + 1,
    fontWeight: '800',
    color: COLORS.text,
  },
  sheetDrSpec: {
    fontSize: 11,
    color: COLORS.textSecondary,
    fontWeight: '600',
    marginTop: 2,
  },
  slotHeading: {
    fontSize: SIZES.font,
    fontWeight: '900',
    color: COLORS.text,
    marginBottom: 12,
  },
  slotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  slotChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 1.2,
    borderColor: COLORS.border,
  },
  slotChipActive: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.secondary,
  },
  slotChipText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.text,
  },
  slotChipTextActive: {
    color: '#FFFFFF',
  },
  confirmBookingBtn: {
    backgroundColor: COLORS.secondary,
    height: 52,
    borderRadius: BORDER_RADIUS.button,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.soft,
  },
  confirmBookingText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});

export default Appointments;
