import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GradientCard from '../../components/GradientCard';
import SafeImage from '../../components/SafeImage';
import { COLORS, SIZES, SHADOWS, BORDER_RADIUS } from '../../styles/theme';

const { width } = Dimensions.get('window');

const RoleSelection = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
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
          {/* Medical Practitioner Card - Soft Blue Gradient */}
          <GradientCard
            colors={['#E0F2FE', '#BAE6FD']}
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
                <Text style={styles.cardTitleDoctor}>Medical Practitioner</Text>
                <Text style={styles.cardDescDoctor}>Prescribe smart, access patients and timelines securely.</Text>
              </View>
              <View style={[styles.arrowCircle, { shadowColor: '#0284C7' }]}>
                <Ionicons name="arrow-forward" size={18} color="#0284C7" />
              </View>
            </View>
          </GradientCard>

          {/* Patient Care Card - Soft Green Gradient */}
          <GradientCard
            colors={['#E6FDF0', '#A7F3D0']}
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
                <Text style={styles.cardDescPatient}>Manage prescriptions, intake history, and secure QR codes.</Text>
              </View>
              <View style={[styles.arrowCircle, { shadowColor: '#059669' }]}>
                <Ionicons name="arrow-forward" size={18} color="#059669" />
              </View>
            </View>
          </GradientCard>

          {/* Health Organization Card - Dark Navy Blue Gradient */}
          <GradientCard
            colors={['#1E293B', '#0F172A']}
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
              <View style={[styles.arrowCircle, { backgroundColor: 'rgba(255, 255, 255, 0.25)', shadowColor: '#000000' }]}>
                <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
              </View>
            </View>
          </GradientCard>
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
    flexGrow: 1,
    justifyContent: 'center',
  },
  logoWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
  topLogo: {
    width: 200,
    height: 200,
    marginBottom:-50,
    marginTop:-20
  },
  header: {
    marginBottom: 28,
    alignItems: 'center',
  },
  title: {
    fontSize: SIZES.title - 4,
    fontWeight: '900',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: SIZES.medium - 1,
    color: COLORS.textSecondary,
    textAlign: 'center',
    fontWeight: '500',
  },
  cardsContainer: {
    width: '100%',
  },
  card: {
    marginBottom: 20,
    width: '100%',
    borderRadius: 24,
    ...SHADOWS.premium,
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
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    padding: 6,
    marginRight: 16,
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 6,
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
    fontSize: SIZES.medium + 1,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  cardDescDoctor: {
    fontSize: SIZES.font - 1,
    color: '#334155',
    lineHeight: 18,
    fontWeight: '500',
  },
  cardTitlePatient: {
    fontSize: SIZES.medium + 1,
    fontWeight: '800',
    color: '#064E3B',
    marginBottom: 4,
  },
  cardDescPatient: {
    fontSize: SIZES.font - 1,
    color: '#047857',
    lineHeight: 18,
    fontWeight: '500',
  },
  cardTitleOrg: {
    fontSize: SIZES.medium + 1,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  cardDescOrg: {
    fontSize: SIZES.font - 1,
    color: '#94A3B8',
    lineHeight: 18,
    fontWeight: '500',
  },
  arrowCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
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
    color: COLORS.textSecondary,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});

export default RoleSelection;

