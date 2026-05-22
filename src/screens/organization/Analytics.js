import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../../components/Header';
import { COLORS, SIZES, BORDER_RADIUS, SHADOWS } from '../../styles/theme';

const { width } = Dimensions.get('window');

const Analytics = ({ navigation }) => {
  const [selectedTimeline, setSelectedTimeline] = useState('Weekly');

  const timelines = ['Daily', 'Weekly', 'Monthly'];

  const metrics = [
    { label: 'Total Prescriptions', value: '1,248', change: '+12.4%', icon: 'document-text', color: COLORS.primary },
    { label: 'Adherence Rating', value: '92.4%', change: '+3.1%', icon: 'checkmark-seal', color: COLORS.secondary },
    { label: 'Stock Warning Items', value: '4', change: '-2 items', icon: 'warning', color: COLORS.danger },
  ];

  const topMeds = [
    { name: 'Telmisartan 40mg', count: 320, pct: '38%', color: COLORS.primary },
    { name: 'Amlodipine 5mg', count: 280, pct: '30%', color: COLORS.secondary },
    { name: 'Atorvastatin 10mg', count: 180, pct: '18%', color: COLORS.dark },
    { name: 'Metformin 500mg', count: 120, pct: '14%', color: COLORS.warning },
  ];

  const complianceRates = [
    { day: 'Mon', rate: 94 },
    { day: 'Tue', rate: 88 },
    { day: 'Wed', rate: 92 },
    { day: 'Thu', rate: 96 },
    { day: 'Fri', rate: 91 },
    { day: 'Sat', rate: 85 },
    { day: 'Sun', rate: 90 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Facility Analytics" onBackPress={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Timeline Selector */}
        <View style={styles.timeStrip}>
          {timelines.map(t => {
            const isSelected = selectedTimeline === t;
            return (
              <TouchableOpacity
                key={t}
                onPress={() => setSelectedTimeline(t)}
                style={[styles.timeBtn, isSelected && styles.timeBtnActive]}
              >
                <Text style={[styles.timeBtnText, isSelected && styles.timeBtnTextActive]}>{t}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Top level stats */}
        <View style={styles.metricsGrid}>
          {metrics.map((m, idx) => (
            <View key={idx} style={styles.metricCard}>
              <View style={styles.metricHeader}>
                <View style={[styles.iconCircle, { backgroundColor: m.color + '12' }]}>
                  <Ionicons name={m.icon} size={20} color={m.color} />
                </View>
                <Text style={[styles.changeText, m.color === COLORS.danger ? styles.textRed : styles.textGreen]}>
                  {m.change}
                </Text>
              </View>
              <Text style={styles.metricVal}>{m.value}</Text>
              <Text style={styles.metricLbl}>{m.label}</Text>
            </View>
          ))}
        </View>

        {/* Adherence Compliance Bar Chart */}
        <Text style={styles.sectionTitle}>Daily Patient Adherence Rates</Text>
        <View style={styles.chartCard}>
          <View style={styles.chartBarRow}>
            {complianceRates.map((cr, idx) => (
              <View key={idx} style={styles.chartBarCol}>
                <View style={styles.barBack}>
                  <LinearGradient 
                    colors={[COLORS.secondary, '#059669']} 
                    style={[styles.barFill, { height: `${cr.rate}%` }]} 
                  />
                </View>
                <Text style={styles.barRateText}>{cr.rate}%</Text>
                <Text style={styles.barDayText}>{cr.day}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Top Medications prescribed list with pct indicators */}
        <Text style={styles.sectionTitle}>Top Prescribed Drug Classes</Text>
        <View style={styles.medCard}>
          {topMeds.map((med, idx) => (
            <View key={idx} style={styles.medItem}>
              <View style={styles.medHeaderRow}>
                <Text style={styles.medName}>{med.name}</Text>
                <Text style={styles.medCount}>{med.count} RXs ({med.pct})</Text>
              </View>
              {/* Custom CSS Bar Fill */}
              <View style={styles.trackBar}>
                <View style={[styles.fillBar, { width: med.pct, backgroundColor: med.color }]} />
              </View>
            </View>
          ))}
        </View>

        <Text style={styles.footerLegal}>
          Information gathered corresponds strictly to clinical activity recorded inside Smart Medical Center registry databases.
        </Text>
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
  timeStrip: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 4,
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    marginBottom: 24,
    ...SHADOWS.soft,
  },
  timeBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  timeBtnActive: {
    backgroundColor: COLORS.primary,
  },
  timeBtnText: {
    fontSize: SIZES.font,
    fontWeight: '800',
    color: COLORS.textSecondary,
  },
  timeBtnTextActive: {
    color: '#FFFFFF',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  metricCard: {
    width: (width - 64) / 2,
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.card,
    padding: 16,
    borderWidth: 1.2,
    borderColor: '#F1F5F9',
    ...SHADOWS.soft,
    marginBottom: 16,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  changeText: {
    fontSize: 11,
    fontWeight: '800',
  },
  textGreen: {
    color: COLORS.secondary,
  },
  textRed: {
    color: COLORS.danger,
  },
  metricVal: {
    fontSize: SIZES.large,
    fontWeight: '900',
    color: COLORS.text,
  },
  metricLbl: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: SIZES.medium + 1,
    fontWeight: '900',
    color: COLORS.text,
    marginBottom: 14,
  },
  chartCard: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.card,
    padding: 20,
    marginBottom: 28,
    borderWidth: 1.2,
    borderColor: '#F1F5F9',
    ...SHADOWS.soft,
  },
  chartBarRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 180,
    paddingHorizontal: 8,
  },
  chartBarCol: {
    alignItems: 'center',
    width: (width - 128) / 7,
  },
  barBack: {
    height: 120,
    width: 10,
    backgroundColor: '#F1F5F9',
    borderRadius: 5,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  barFill: {
    width: '100%',
    borderRadius: 5,
  },
  barRateText: {
    fontSize: 8,
    fontWeight: '800',
    color: COLORS.text,
    marginTop: 6,
  },
  barDayText: {
    fontSize: 9,
    fontWeight: '700',
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  medCard: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.card,
    padding: 20,
    marginBottom: 28,
    borderWidth: 1.2,
    borderColor: '#F1F5F9',
    ...SHADOWS.soft,
  },
  medItem: {
    marginBottom: 16,
  },
  medHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  medName: {
    fontSize: SIZES.font,
    fontWeight: '800',
    color: COLORS.text,
  },
  medCount: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textSecondary,
  },
  trackBar: {
    height: 8,
    backgroundColor: '#F1F5F9',
    borderRadius: 4,
    overflow: 'hidden',
  },
  fillBar: {
    height: '100%',
    borderRadius: 4,
  },
  footerLegal: {
    fontSize: 10,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 16,
    fontWeight: '600',
    paddingHorizontal: 12,
  },
});

export default Analytics;
