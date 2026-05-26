import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../../components/Header';
import { COLORS, SIZES, BORDER_RADIUS, SHADOWS } from '../../styles/theme';

const { width } = Dimensions.get('window');

const MedicineHistory = ({ navigation }) => {
  const [selectedDay, setSelectedDay] = useState(4); // Today (Thursday)

  const daysOfWeek = [
    { name: 'Mon', date: '18', compliance: '100%', complianceVal: 1.0 },
    { name: 'Tue', date: '19', compliance: '50%', complianceVal: 0.5 },
    { name: 'Wed', date: '20', compliance: '100%', complianceVal: 1.0 },
    { name: 'Thu', date: '21', compliance: '75%', complianceVal: 0.75 }, // Active
    { name: 'Fri', date: '22', compliance: 'pending', complianceVal: 0.0 },
    { name: 'Sat', date: '23', compliance: 'pending', complianceVal: 0.0 },
    { name: 'Sun', date: '24', compliance: 'pending', complianceVal: 0.0 },
  ];

  const [doses, setDoses] = useState([
    { id: '1', medName: 'Telmisartan', strength: '40 mg', time: '09:00 AM', taken: true, period: 'Morning', instructions: 'Before breakfast' },
    { id: '2', medName: 'Multivitamin', strength: '1 Cap', time: '01:30 PM', taken: true, period: 'Afternoon', instructions: 'After lunch' },
    { id: '3', medName: 'Amlodipine Besylate', strength: '5 mg', dosage: '0-0-1', time: '09:00 PM', taken: false, period: 'Evening', instructions: 'At bedtime' },
    { id: '4', medName: 'Atorvastatin', strength: '10 mg', time: '09:30 PM', taken: false, period: 'Evening', instructions: 'After dinner' },
  ]);

  const toggleTaken = (id) => {
    setDoses(prev => prev.map(dose => dose.id === id ? { ...dose, taken: !dose.taken } : dose));
  };

  const completedCount = doses.filter(d => d.taken).length;
  const totalCount = doses.length;
  const adherenceRate = Math.round((completedCount / totalCount) * 100);

  return (
    <SafeAreaView style={styles.container}>
      <Header onSkipPress={() => console.log("Skip")} title="Pill History" onBackPress={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Adherence Card */}
        <LinearGradient colors={[COLORS.dark, '#1E293B']} style={styles.adherenceCard}>
          <View style={styles.cardHeader}>
            <View style={styles.headerTextCol}>
              <Text style={styles.cardHeading}>Adherence Score</Text>
              <Text style={styles.cardSub}>Excellent medication consistency today</Text>
            </View>
            <View style={styles.percentageCircle}>
              <Text style={styles.percentageText}>{adherenceRate}%</Text>
            </View>
          </View>

          <View style={styles.cardDivider} />

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statVal}>{completedCount} of {totalCount}</Text>
              <Text style={styles.statLbl}>Taken Doses</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statVal}>88%</Text>
              <Text style={styles.statLbl}>Weekly Avg</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statVal}>14 Days</Text>
              <Text style={styles.statLbl}>Current Streak</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Calendar Strip */}
        <Text style={styles.sectionTitle}>Weekly Log</Text>
        <View style={styles.calendarStrip}>
          {daysOfWeek.map((day, idx) => {
            const isSelected = selectedDay === idx;
            return (
              <TouchableOpacity
                key={idx}
                onPress={() => setSelectedDay(idx)}
                style={[
                  styles.calendarDay,
                  isSelected && styles.calendarDayActive
                ]}
              >
                <Text style={[styles.dayName, isSelected && styles.dayNameActive]}>{day.name}</Text>
                <Text style={[styles.dayDate, isSelected && styles.dayDateActive]}>{day.date}</Text>
                
                {/* Visual compliance dot */}
                {day.complianceVal > 0 && (
                  <View style={[
                    styles.complianceDot, 
                    { backgroundColor: day.complianceVal === 1.0 ? COLORS.secondary : COLORS.warning }
                  ]} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Timeline Doses Checklist */}
        <Text style={styles.sectionTitle}>Thursday Intake Schedule</Text>
        
        <View style={styles.timelineList}>
          {doses.map((dose) => (
            <TouchableOpacity 
              key={dose.id} 
              style={[styles.doseCard, dose.taken && styles.doseCardTaken]}
              activeOpacity={0.8}
              onPress={() => toggleTaken(dose.id)}
            >
              <View style={styles.doseLeft}>
                <View style={[
                  styles.statusIconCircle,
                  dose.taken ? styles.statusIconCircleTaken : styles.statusIconCirclePending
                ]}>
                  <Ionicons 
                    name={dose.taken ? "checkmark-circle" : "ellipse-outline"} 
                    size={24} 
                    color={dose.taken ? COLORS.secondary : COLORS.textSecondary} 
                  />
                </View>
                
                <View style={styles.doseInfo}>
                  <Text style={[styles.doseMedName, dose.taken && styles.textLineThrough]}>
                    {dose.medName} <Text style={styles.doseStrength}>{dose.strength}</Text>
                  </Text>
                  <Text style={styles.doseSubText}>{dose.time} • {dose.instructions}</Text>
                </View>
              </View>

              <View style={[
                styles.periodBadge, 
                dose.period === 'Morning' ? styles.badgeMorning : 
                dose.period === 'Afternoon' ? styles.badgeAfternoon : styles.badgeEvening
              ]}>
                <Text style={[
                  styles.periodText,
                  dose.period === 'Morning' ? styles.textMorning : 
                  dose.period === 'Afternoon' ? styles.textAfternoon : styles.textEvening
                ]}>
                  {dose.period}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
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
  adherenceCard: {
    borderRadius: BORDER_RADIUS.card,
    padding: 24,
    marginBottom: 28,
    ...SHADOWS.premium,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTextCol: {
    flex: 1,
    paddingRight: 10,
  },
  cardHeading: {
    fontSize: SIZES.medium + 2,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  cardSub: {
    fontSize: SIZES.small,
    color: 'rgba(255, 255, 255, 0.75)',
    marginTop: 4,
    fontWeight: '600',
  },
  percentageCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  percentageText: {
    fontSize: SIZES.font + 1,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  cardDivider: {
    height: 1,
    marginVertical: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
  },
  statVal: {
    fontSize: SIZES.large - 4,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  statLbl: {
    fontSize: 9,
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: '700',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 20,
  },
  sectionTitle: {
    fontSize: SIZES.medium + 1,
    fontWeight: '900',
    color: COLORS.text,
    marginBottom: 14,
  },
  calendarStrip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.card - 4,
    padding: 12,
    marginBottom: 28,
    borderWidth: 1.2,
    borderColor: '#F1F5F9',
    ...SHADOWS.soft,
  },
  calendarDay: {
    width: (width - 72 - 24) / 7,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 12,
  },
  calendarDayActive: {
    backgroundColor: COLORS.primary,
  },
  dayName: {
    fontSize: 9,
    fontWeight: '800',
    color: COLORS.textSecondary,
  },
  dayNameActive: {
    color: '#FFFFFF',
  },
  dayDate: {
    fontSize: 14,
    fontWeight: '900',
    color: COLORS.text,
    marginTop: 4,
  },
  dayDateActive: {
    color: '#FFFFFF',
  },
  complianceDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: 6,
  },
  timelineList: {
    marginBottom: 20,
  },
  doseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.card - 4,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1.2,
    borderColor: '#F1F5F9',
    ...SHADOWS.soft,
  },
  doseCardTaken: {
    borderColor: '#E2E8F0',
    opacity: 0.8,
  },
  doseLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statusIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  statusIconCircleTaken: {
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
  },
  statusIconCirclePending: {
  },
  doseInfo: {
    flex: 1,
  },
  doseMedName: {
    fontSize: SIZES.font + 1,
    fontWeight: '800',
    color: COLORS.text,
  },
  doseStrength: {
    fontSize: 11,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  textLineThrough: {
    textDecorationLine: 'line-through',
    color: COLORS.textSecondary,
  },
  doseSubText: {
    fontSize: 10,
    color: COLORS.textSecondary,
    marginTop: 4,
    fontWeight: '500',
  },
  periodBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  badgeMorning: {
  },
  badgeAfternoon: {
  },
  badgeEvening: {
    backgroundColor: '#ECFDF5',
  },
  periodText: {
    fontSize: 9,
    fontWeight: '900',
  },
  textMorning: {
    color: COLORS.warning,
  },
  textAfternoon: {
    color: COLORS.secondary,
  },
  textEvening: {
    color: COLORS.primary,
  },
});

export default MedicineHistory;
