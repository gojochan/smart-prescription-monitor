import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Dimensions, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../../components/Header';
import { COLORS, SIZES, SHADOWS, BORDER_RADIUS } from '../../styles/theme';

const { width } = Dimensions.get('window');

const Analytics = ({ navigation }) => {
  const [selectedTimeline, setSelectedTimeline] = useState('Weekly');

  const timelines = ['Daily', 'Weekly', 'Monthly'];

  const [metrics, setMetrics] = useState([]);
  const [topMeds, setTopMeds] = useState([]);
  const [complianceRates, setComplianceRates] = useState([]);

  useEffect(() => {
    // TODO: Replace with original API integration
    // fetch('https://your-api.com/organization/analytics')
    //   .then(res => res.json())
    //   .then(data => {
    //     setMetrics(data.metrics);
    //     setTopMeds(data.topMeds);
    //     setComplianceRates(data.complianceRates);
    //   })
    //   .catch(err => console.error('API Error:', err));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="Facility Analytics" 
        onBackPress={() => navigation.goBack()}
        onSkipPress={() => console.log('Skip')}
        dark={true}
      />

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
                activeOpacity={0.8}
              >
                <Text style={[styles.timeBtnText, isSelected && styles.timeBtnTextActive]}>{t}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Top level stats */}
        {metrics.length > 0 ? (
          <View style={styles.metricsGrid}>
            {metrics.map((m, idx) => (
              <View key={idx} style={[styles.metricCard, { width: metrics.length === 3 && idx === 2 ? '100%' : (width - 64) / 2 }]}>
                <View style={styles.metricHeader}>
                  <View style={[styles.iconCircle, { backgroundColor: m.color + '20', borderColor: m.color + '40' }]}>
                    <Ionicons name={m.icon} size={20} color={m.color} />
                  </View>
                  <Text style={[styles.changeText, m.color === COLORS.warning ? styles.textWarning : styles.textGreen]}>
                    {m.change}
                  </Text>
                </View>
                <Text style={styles.metricVal}>{m.value}</Text>
                <Text style={styles.metricLbl}>{m.label}</Text>
              </View>
            ))}
          </View>
        ) : (
          <View style={[styles.metricsGrid, { justifyContent: 'center' }]}>
            <Text style={{color: COLORS.textSecondary, textAlign: 'center', width: '100%', marginVertical: 20}}>Loading analytics data...</Text>
          </View>
        )}

        {/* Adherence Compliance Bar Chart */}
        <Text style={styles.sectionTitle}>Daily Patient Adherence Rates</Text>
        {complianceRates.length > 0 ? (
          <View style={styles.chartCard}>
            <View style={styles.chartBarRow}>
              {complianceRates.map((cr, idx) => (
                <View key={idx} style={styles.chartBarCol}>
                  <View style={styles.barBack}>
                    <LinearGradient 
                      colors={COLORS.accentGradient} 
                      style={[styles.barFill, { height: `${cr.rate}%` }]} 
                    />
                  </View>
                  <Text style={styles.barRateText}>{cr.rate}%</Text>
                  <Text style={styles.barDayText}>{cr.day}</Text>
                </View>
              ))}
            </View>
          </View>
        ) : (
          <View style={styles.chartCard}>
            <Text style={{color: COLORS.textSecondary, textAlign: 'center', marginVertical: 40}}>No adherence data available yet.</Text>
          </View>
        )}

        {/* Top Medications */}
        <Text style={styles.sectionTitle}>Top Prescribed Drug Classes</Text>
        {topMeds.length > 0 ? (
          <View style={styles.medCard}>
            {topMeds.map((med, idx) => (
              <View key={idx} style={styles.medItem}>
                <View style={styles.medHeaderRow}>
                  <Text style={styles.medName}>{med.name}</Text>
                  <Text style={styles.medCount}>{med.count} RXs ({med.pct})</Text>
                </View>
                <View style={styles.trackBar}>
                  <View style={[styles.fillBar, { width: med.pct, backgroundColor: med.color }]} />
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.medCard}>
            <Text style={{color: COLORS.textSecondary, textAlign: 'center', marginVertical: 20}}>No prescription data available yet.</Text>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark,
  },
  scrollContent: {
    padding: SIZES.lg,
    paddingBottom: 40,
  },
  timeStrip: {
    flexDirection: 'row',
    backgroundColor: COLORS.glass,
    borderRadius: BORDER_RADIUS.md,
    padding: 4,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    marginBottom: SIZES.xl,
    ...SHADOWS.glass,
  },
  timeBtn: {
    flex: 1,
    paddingVertical: SIZES.sm,
    alignItems: 'center',
    borderRadius: BORDER_RADIUS.sm,
  },
  timeBtnActive: {
    backgroundColor: COLORS.primary,
    ...SHADOWS.glow,
  },
  timeBtnText: {
    fontSize: SIZES.fontMd,
    fontWeight: '700',
    color: COLORS.textSecondary,
  },
  timeBtnTextActive: {
    color: COLORS.dark,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: SIZES.xl,
  },
  metricCard: {
    backgroundColor: COLORS.glass,
    borderRadius: BORDER_RADIUS.lg,
    padding: SIZES.md,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    ...SHADOWS.glass,
    marginBottom: SIZES.md,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.md,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.sm,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  changeText: {
    fontSize: SIZES.fontSm,
    fontWeight: '800',
  },
  textGreen: {
    color: COLORS.success,
  },
  textWarning: {
    color: COLORS.warning,
  },
  metricVal: {
    fontSize: SIZES.fontXl,
    fontWeight: '900',
    color: COLORS.text,
    letterSpacing: 0.5,
  },
  metricLbl: {
    fontSize: SIZES.fontSm,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: SIZES.fontLg,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: SIZES.md,
    letterSpacing: 0.5,
  },
  chartCard: {
    backgroundColor: COLORS.glass,
    borderRadius: BORDER_RADIUS.lg,
    padding: SIZES.lg,
    marginBottom: SIZES.xl,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    ...SHADOWS.glass,
  },
  chartBarRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 180,
    paddingHorizontal: 4,
  },
  chartBarCol: {
    alignItems: 'center',
    width: (width - 128) / 7,
  },
  barBack: {
    height: 140,
    width: 14,
    backgroundColor: COLORS.glassLight,
    borderRadius: 7,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  barFill: {
    width: '100%',
    borderRadius: 7,
  },
  barRateText: {
    fontSize: SIZES.fontSm - 2,
    fontWeight: '800',
    color: COLORS.text,
    marginTop: 8,
  },
  barDayText: {
    fontSize: SIZES.fontSm - 1,
    fontWeight: '700',
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  medCard: {
    backgroundColor: COLORS.glass,
    borderRadius: BORDER_RADIUS.lg,
    padding: SIZES.lg,
    marginBottom: SIZES.xl,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    ...SHADOWS.glass,
  },
  medItem: {
    marginBottom: SIZES.md,
  },
  medHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  medName: {
    fontSize: SIZES.fontMd,
    fontWeight: '700',
    color: COLORS.text,
  },
  medCount: {
    fontSize: SIZES.fontSm,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  trackBar: {
    height: 8,
    backgroundColor: COLORS.glassLight,
    borderRadius: 4,
    overflow: 'hidden',
  },
  fillBar: {
    height: '100%',
    borderRadius: 4,
  },
});

export default Analytics;
