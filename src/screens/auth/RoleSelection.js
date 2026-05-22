import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Dimensions, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GradientCard from '../../components/GradientCard';
import { COLORS, SIZES, SHADOWS, BORDER_RADIUS } from '../../styles/theme';

const { width } = Dimensions.get('window');

const RoleSelection = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.logoWrapper}>
          <Image source={require('../../../assets/images/spm_logo.png')} style={styles.topLogo} resizeMode="contain" />
        </View>

        <View style={styles.header}>
          <Text style={styles.title}>SPM Portal Hub</Text>
          <Text style={styles.subtitle}>Choose your pathway to get started</Text>
        </View>

        <View style={styles.cardsContainer}>
          <GradientCard
            colors={[COLORS.primary, '#0284C7']}
            onPress={() => navigation.navigate('DoctorLogin')}
            style={styles.card}
          >
            <View style={styles.cardContent}>
              <View style={styles.iconCircle}>
                <Image source={require('../../../assets/images/doctor_illustration.png')} style={styles.roleImage} resizeMode="contain" />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.cardTitle}>Medical Practitioner</Text>
                <Text style={styles.cardDesc}>Prescribe smart, access patients and timelines securely.</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#FFFFFF" />
            </View>
          </GradientCard>

          <GradientCard
            colors={[COLORS.secondary, '#059669']}
            onPress={() => navigation.navigate('PatientLogin')}
            style={styles.card}
          >
            <View style={styles.cardContent}>
              <View style={styles.iconCircle}>
                <Image source={require('../../../assets/images/patient_illustration.png')} style={styles.roleImage} resizeMode="contain" />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.cardTitle}>Patient Care</Text>
                <Text style={styles.cardDesc}>Manage prescriptions, intake history, and secure QR codes.</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#FFFFFF" />
            </View>
          </GradientCard>

          <GradientCard
            colors={[COLORS.dark, '#1E293B']}
            onPress={() => navigation.navigate('OrganizationLogin')}
            style={styles.card}
          >
            <View style={styles.cardContent}>
              <View style={styles.iconCircle}>
                <Image source={require('../../../assets/images/organization_illustration.png')} style={styles.roleImage} resizeMode="contain" />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.cardTitle}>Health Organization</Text>
                <Text style={styles.cardDesc}>Approve doctors, maintain stocks, and view central metrics.</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#FFFFFF" />
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
  header: {
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: SIZES.title,
    fontWeight: '900',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: SIZES.medium,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  cardsContainer: {
    width: '100%',
  },
  card: {
    marginBottom: 20,
    width: '100%',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconCircle: {
    width: 70,
    height: 70,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.soft,
    overflow: 'hidden',
  },
  textContainer: {
    flex: 1,
    marginLeft: 20,
    marginRight: 10,
  },
  cardTitle: {
    fontSize: SIZES.large,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: SIZES.font,
    color: 'rgba(255, 255, 255, 0.85)',
    lineHeight: 18,
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
  logoWrapper: {
    alignItems: 'center',
    marginBottom: 10,
  },
  topLogo: {
    width: 80,
    height: 80,
  },
  roleImage: {
    width: 50,
    height: 50,
  },
  navIcon: {
    width: 24,
    height: 24,
    tintColor: '#FFFFFF',
  },
  adminIcon: {
    width: 16,
    height: 16,
    marginRight: 6,
    tintColor: COLORS.textSecondary,
  },
});

export default RoleSelection;
