import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GradientCard from '../../components/GradientCard';
import { COLORS, SIZES, BORDER_RADIUS, SHADOWS } from '../../styles/theme';

const { width } = Dimensions.get('window');

const DoctorDashboard = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('home');

  const stats = [
    { label: 'Visits Today', value: '14', icon: 'people', color: COLORS.primary },
    { label: 'AI Validated', value: '98%', icon: 'ribbon', color: COLORS.secondary },
    { label: 'Prescriptions', value: '382', icon: 'document-text', color: COLORS.dark },
  ];

  const recentActivities = [
    { id: '1', patient: 'Leonard Hofstadter', type: 'Cardio Checkup', time: '10 mins ago', status: 'Generated' },
    { id: '2', patient: 'Penny Teller', type: 'General Allergy', time: '1 hr ago', status: 'Signed' },
    { id: '3', patient: 'Sheldon Cooper', type: 'Neuro Consultation', time: '3 hrs ago', status: 'Pending Review' },
  ];

  const quickActions = [
    { title: 'New Prescription', desc: 'Secure AI-guided steps', icon: 'add-circle-outline', colors: [COLORS.primary, '#0284C7'], route: 'CreatePrescription' },
    { title: 'Patient Timelines', desc: 'Central medical database', icon: 'analytics-outline', colors: [COLORS.secondary, '#059669'], route: 'PatientHistory' },
    { title: 'Prescription Logs', desc: 'Historical search & PDF', icon: 'folder-open-outline', colors: [COLORS.dark, '#1E293B'], route: 'PrescriptionHistory' },
  ];

  const renderActivity = ({ item }) => (
    <View style={styles.activityCard}>
      <View style={styles.activityInfo}>
        <Text style={styles.activityName}>{item.patient}</Text>
        <Text style={styles.activityType}>{item.type} • {item.time}</Text>
      </View>
      <View style={[styles.badge, item.status === 'Generated' ? styles.badgeGreen : styles.badgeBlue]}>
        <Text style={[styles.badgeText, item.status === 'Generated' ? styles.badgeTextGreen : styles.badgeTextBlue]}>
          {item.status}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Premium Top Bar */}
      <View style={styles.topBar}>
        <View>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.drName}>Dr. Sarah Wilson</Text>
        </View>
        <View style={styles.topActions}>
          <TouchableOpacity onPress={() => navigation.navigate('DoctorNotifications')} style={styles.topIconBtn}>
            <Ionicons name="notifications-outline" size={24} color={COLORS.text} />
            <View style={styles.notifBadge} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('DoctorSettings')} style={styles.topIconBtn}>
            <Ionicons name="settings-outline" size={24} color={COLORS.text} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Core Quick Stats Row */}
        <View style={styles.statsRow}>
          {stats.map((stat, i) => (
            <View key={i} style={styles.statBox}>
              <View style={[styles.statIconCircle, { backgroundColor: stat.color + '15' }]}>
                <Ionicons name={stat.icon} size={20} color={stat.color} />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Dynamic Promotional AI Glass Card */}
        <GradientCard colors={['#0F172A', '#1E293B']} style={styles.aiCard}>
          <View style={styles.aiContent}>
            <View style={styles.aiTextContainer}>
              <Text style={styles.aiTitle}>Secure AI Engine</Text>
              <Text style={styles.aiDesc}>
                Realtime drug-interaction warnings and dosage checking is actively guarding your account.
              </Text>
            </View>
            <View style={styles.aiBadge}>
              <Ionicons name="shield-checkmark" size={32} color={COLORS.secondary} />
            </View>
          </View>
        </GradientCard>

        {/* Quick Action Navigation Grid */}
        <Text style={styles.sectionTitle}>Practitioner Actions</Text>
        <View style={styles.grid}>
          {quickActions.map((action, index) => (
            <GradientCard
              key={index}
              colors={action.colors}
              onPress={() => navigation.navigate(action.route)}
              style={styles.gridCard}
            >
              <Ionicons name={action.icon} size={32} color="#FFFFFF" />
              <Text style={styles.gridTitle}>{action.title}</Text>
              <Text style={styles.gridDesc}>{action.desc}</Text>
            </GradientCard>
          ))}
        </View>

        {/* Recent Timelines Section */}
        <View style={styles.activityHeader}>
          <Text style={styles.sectionTitle}>Recent Prescriptions</Text>
          <TouchableOpacity onPress={() => navigation.navigate('PrescriptionHistory')}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={recentActivities}
          keyExtractor={(item) => item.id}
          renderItem={renderActivity}
          scrollEnabled={false}
          style={styles.activityList}
        />
      </ScrollView>

      {/* Floating Premium Bottom Bar */}
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
            onPress={() => navigation.navigate('CreatePrescription')}
          >
            <View style={styles.addTabCircle}>
              <Ionicons name="add" size={28} color="#FFFFFF" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => navigation.navigate('DoctorProfile')}
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
  drName: {
    fontSize: SIZES.large,
    fontWeight: '900',
    color: COLORS.text,
    marginTop: 2,
  },
  topActions: {
    flexDirection: 'row',
  },
  topIconBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  notifBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.danger,
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
    fontSize: SIZES.large,
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
  aiCard: {
    marginBottom: 28,
  },
  aiContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aiTextContainer: {
    flex: 1,
    paddingRight: 12,
  },
  aiTitle: {
    fontSize: SIZES.medium + 1,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  aiDesc: {
    fontSize: SIZES.small + 1,
    color: 'rgba(255, 255, 255, 0.75)',
    lineHeight: 18,
  },
  aiBadge: {
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
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAll: {
    fontSize: SIZES.font,
    fontWeight: '700',
    color: COLORS.primary,
  },
  activityList: {
    marginBottom: 20,
  },
  activityCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.card - 4,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1.2,
    borderColor: '#F1F5F9',
    ...SHADOWS.soft,
  },
  activityInfo: {
    flex: 1,
  },
  activityName: {
    fontSize: SIZES.font + 1,
    fontWeight: '800',
    color: COLORS.text,
  },
  activityType: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  badgeGreen: {
    backgroundColor: 'rgba(34, 197, 94, 0.08)',
  },
  badgeBlue: {
    backgroundColor: 'rgba(14, 165, 233, 0.08)',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
  },
  badgeTextGreen: {
    color: COLORS.success,
  },
  badgeTextBlue: {
    color: COLORS.primary,
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
});

export default DoctorDashboard;
