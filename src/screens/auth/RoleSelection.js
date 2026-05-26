import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GradientCard from '../../components/GradientCard';
import SafeImage from '../../components/SafeImage';
import PremiumBackground from '../../components/PremiumBackground';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES, SHADOWS, BORDER_RADIUS } from '../../styles/theme';

const { width } = Dimensions.get('window');

const RoleSelection = ({ navigation }) => {
  return (
    <PremiumBackground>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.logoWrapper}>
          <SafeImage 
            source={require('../../../assets/images/spm_logo.png')} 
            style={styles.topLogo} 
            resizeMode="contain" 
          />
        </View>

        <View style={styles.header}>
          <Text style={styles.title}>SPM Portal Hub</Text>
          <Text style={styles.subtitle}>Choose your pathway to get started</Text>
        </View>

        <View style={styles.cardsContainer}>
          {/* Doctor Card - Vibrant Blue */}
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.7)', 'rgba(255, 255, 255, 0.05)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.cardBorderWrapper}
          >
            <GradientCard
              colors={['#0284c7', '#0369a1']}
              onPress={() => navigation.navigate('DoctorLogin')}
              style={styles.card}
            >
              <View style={styles.cardContent}>
                <View style={styles.illustrationWrapper}>
                  <SafeImage 
                    source={require('../../../assets/images/doctor_illustration.png')} 
                    style={styles.roleImage} 
                    resizeMode="cover" 
                  />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.cardTitleDoctor}>Doctor</Text>
                  <Text style={styles.cardDescDoctor}>Prescribe smart, access patients and timelines securely.</Text>
                </View>
                <View style={[styles.arrowCircle, { shadowColor: '#ffffff' }]}>
                  <Ionicons name="arrow-forward" size={20} color="#ffffff" />
                </View>
              </View>
            </GradientCard>
          </LinearGradient>

          {/* Patient Care Card - Vibrant Green */}
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.7)', 'rgba(255, 255, 255, 0.05)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.cardBorderWrapper}
          >
            <GradientCard
              colors={['#059669', '#047857']}
              onPress={() => navigation.navigate('PatientLogin')}
              style={styles.card}
            >
              <View style={styles.cardContent}>
                <View style={styles.illustrationWrapper}>
                  <SafeImage 
                    source={require('../../../assets/images/patient_illustration.png')} 
                    style={styles.roleImage} 
                    resizeMode="cover" 
                  />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.cardTitlePatient}>Patient Care</Text>
                  <Text style={styles.cardDescPatient}>Manage prescriptions and intake history securely.</Text>
                </View>
                <View style={[styles.arrowCircle, { shadowColor: '#ffffff' }]}>
                  <Ionicons name="arrow-forward" size={20} color="#ffffff" />
                </View>
              </View>
            </GradientCard>
          </LinearGradient>

          {/* Health Organization Card - Premium Purple */}
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.7)', 'rgba(255, 255, 255, 0.05)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.cardBorderWrapper}
          >
            <GradientCard
              colors={['#8B5CF6', '#6D28D9']}
              onPress={() => navigation.navigate('OrganizationLogin')}
              style={styles.card}
            >
              <View style={styles.cardContent}>
                <View style={styles.illustrationWrapper}>
                  <SafeImage 
                    source={require('../../../assets/images/organization_illustration.png')} 
                    style={styles.roleImage} 
                    resizeMode="cover" 
                  />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.cardTitleOrg} numberOfLines={2} adjustsFontSizeToFit>Health {"\n"}Organization</Text>
                  <Text style={styles.cardDescOrg}>Approve doctors, maintain stocks, and view central metrics.</Text>
                </View>
                <View style={[styles.arrowCircle, { shadowColor: '#ffffff' }]}>
                  <Ionicons name="arrow-forward" size={20} color="#ffffff" />
                </View>
              </View>
            </GradientCard>
          </LinearGradient>
        </View>

        <TouchableOpacity 
          onPress={() => navigation.navigate('AdminLogin')} 
          style={styles.adminLinkContainer}
          activeOpacity={0.7}
        >
          <Ionicons name="shield-half-outline" size={16} color={COLORS.textSecondary} style={{ marginRight: 6 }} />
          <Text style={styles.adminLinkText}>Access System Administrator Portal</Text>
        </TouchableOpacity>
      </ScrollView>
    </PremiumBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollContent: {
    padding: 24,
    flexGrow: 1,
    justifyContent: 'center',
  },
  logoWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
  topLogo: {
    width: 190,
    height: 190,
   
    marginTop:-20
  },
  header: {
    marginBottom: 28,
    alignItems: 'center',
  },
  title: {
    fontSize: SIZES.title - 4,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: SIZES.medium - 1,
    color: 'rgba(255,255,255,0.75)',
    textAlign: 'center',
    fontWeight: '500',
  },
  cardsContainer: {
    width: '100%',
  },
  cardBorderWrapper: {
    marginBottom: 20,
    width: '100%',
    borderRadius: 25,
    padding: 1.5,
    ...SHADOWS.soft,
  },
  card: {
    width: '100%',
    borderRadius: 24,
    borderWidth: 0,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  illustrationWrapper: {
    width: 100,
    height: 100,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    padding: 2, // Decreased image border padding
    marginRight: 16,
  },
  roleImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  textContainer: {
    flex: 1,
    marginRight: 8,
  },
  cardTitleDoctor: {
    fontSize: 20,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 4,
  },
  cardDescDoctor: {
    fontSize: 15,
    color: '#e2e8f0',
    lineHeight: 20,
    fontWeight: '500',
  },
  cardTitlePatient: {
    fontSize: 20,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 4,
  },
  cardDescPatient: {
    fontSize: 15,
    color: '#e2e8f0',
    lineHeight: 20,
    fontWeight: '500',
  },
  cardTitleOrg: {
    fontSize: 20,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 4,
  },
  cardDescOrg: {
    fontSize: 15,
    color: '#e2e8f0',
    lineHeight: 20,
    fontWeight: '500',
  },
  arrowCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  adminLinkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    paddingVertical: 10,
  },
  adminLinkText: {
    fontSize: SIZES.font,
    color: 'rgba(255,255,255,0.75)',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});

export default RoleSelection;

