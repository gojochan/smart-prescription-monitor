import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import GradientCard from '../../components/GradientCard';
import PremiumBackground from '../../components/PremiumBackground';
import { COLORS, SIZES, BORDER_RADIUS, SHADOWS } from '../../styles/theme';

const { width } = Dimensions.get('window');

const DoctorDashboard = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('home');

  const [stats, setStats] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    // TODO: Replace with original API integration
    // fetch('https://your-api.com/doctor/dashboard')
    //   .then(res => res.json())
    //   .then(data => {
    //     setStats(data.stats);
    //     setRecentActivities(data.recentActivities);
    //   })
    //   .catch(err => console.error('API Error:', err));
  }, []);

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
    <PremiumBackground safeArea={true} colors={['#0f172a', '#0c4a6e']}>
      {/* Premium Top Bar */}
      <View style={styles.topBar}>
        <View>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.drName}>Doctor</Text>
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
        {/* Core Quick Stats Row */}
        {stats.length > 0 ? (
          <View style={styles.statsRow}>
            {stats.map((stat, i) => (
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
        ) : (
          <View style={[styles.statsRow, { justifyContent: 'center' }]}>
            <Text style={{color: 'rgba(255,255,255,0.4)', textAlign: 'center'}}>Loading metrics...</Text>
          </View>
        )}

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
          ListEmptyComponent={
            <Text style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', marginVertical: 20 }}>
              No recent prescriptions found.
            </Text>
          }
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
    </PremiumBackground>
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
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.15)',
  },
  welcomeText: {
    fontSize: SIZES.font,
    color: 'rgba(255,255,255,0.75)',
    fontWeight: '600',
  },
  drName: {
    fontSize: SIZES.large,
    fontWeight: '900',
    color: '#FFFFFF',
    marginTop: 2,
  },
  topActions: {
    flexDirection: 'row',
  },
  topIconBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
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
    fontSize: SIZES.large,
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
  aiCard: {
    marginBottom: 36,
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: SIZES.medium + 2,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 16,
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
    borderRadius: BORDER_RADIUS.card - 4,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.25)',
    ...SHADOWS.glass,
  },
  activityInfo: {
    flex: 1,
  },
  activityName: {
    fontSize: SIZES.font + 1,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  activityType: {
    fontSize: SIZES.small,
    color: 'rgba(255,255,255,0.65)',
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
});

export default DoctorDashboard;
