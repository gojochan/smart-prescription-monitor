import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import PremiumInput from '../../components/PremiumInput';
import PremiumButton from '../../components/PremiumButton';
import Loading from '../../components/Loading';
import PremiumBackground from '../../components/PremiumBackground';
import { COLORS, SIZES, BORDER_RADIUS, SHADOWS } from '../../styles/theme';

const PatientSignup = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = () => {
    if (!name || !phone || !age || !password) {
      Alert.alert('Incomplete Form', 'Please fill out all mandatory patient registration details.');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        'Registration Success',
        'Your patient account has been created successfully. Welcome to SPM!',
        [{ text: 'Open Dashboard', onPress: () => navigation.replace('PatientDashboard') }]
      );
    }, 2000);
  };

  return (
    <PremiumBackground safeArea={false}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Back btn */}
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back-outline" size={24} color={COLORS.text} />
          </TouchableOpacity>

          <View style={styles.heroSection}>
            <LinearGradient colors={[COLORS.secondary, '#059669']} style={styles.logoBadge}>
              <Ionicons name="heart-pulse" size={36} color="#FFFFFF" />
            </LinearGradient>
            <Text style={styles.title}>Register Account</Text>
            <Text style={styles.subtitle}>Onboard to the SPM Secure Health Network</Text>
          </View>

          {/* Form Card */}
          <View style={styles.formCard}>
            <PremiumInput
              label="FULL LEGAL NAME"
              placeholder="e.g. Rahul Sharma"
              value={name}
              onChangeText={setName}
              icon="person-outline"
            />

            <PremiumInput
              label="EMAIL ADDRESS"
              placeholder="e.g. rahul.sharma@gmail.com (Optional)"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              icon="mail-outline"
            />

            <PremiumInput
              label="MOBILE PHONE NUMBER"
              placeholder="e.g. +1 (555) 987-6543"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              icon="call-outline"
            />

            <PremiumInput
              label="AGE IN YEARS"
              placeholder="e.g. 29"
              value={age}
              onChangeText={setAge}
              keyboardType="numeric"
              icon="calendar-outline"
            />

            <PremiumInput
              label="CHOOSE ACCESS PASSWORD"
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
              icon="lock-closed-outline"
            />

            <View style={styles.actionContainer}>
              <PremiumButton 
                title="Establish Patient Identity" 
                onPress={handleSignup}
                gradientColors={[COLORS.secondary, '#059669']}
              />
            </View>
          </View>

          <View style={styles.footerRow}>
            <Text style={styles.footerLabel}>Already registered?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('PatientLogin')}>
              <Text style={styles.footerAction}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {isLoading && <Loading visible={true} message="Creating secure patient container..." />}
    </PremiumBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    flexGrow: 1,
    justifyContent: 'center',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    position: 'absolute',
    top: 10,
    left: 24,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 28,
    marginTop: 60,
  },
  logoBadge: {
    width: 68,
    height: 68,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    ...SHADOWS.premium,
  },
  title: {
    fontSize: SIZES.title - 4,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.75)',
    marginTop: 6,
    textAlign: 'center',
  },
  formCard: {
    padding: SIZES.large,
    borderRadius: BORDER_RADIUS.card,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.25)',
    ...SHADOWS.glass,
    marginBottom: 24,
  },
  actionContainer: {
    marginTop: 24,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  footerLabel: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.75)',
    fontWeight: '600',
  },
  footerAction: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.secondary,
    marginLeft: 6,
  },
});

export default PatientSignup;
