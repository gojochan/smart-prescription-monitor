import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PremiumInput from '../../components/PremiumInput';
import PremiumButton from '../../components/PremiumButton';
import Loading from '../../components/Loading';
import { COLORS, SIZES, SHADOWS, BORDER_RADIUS } from '../../styles/theme';

const DoctorLogin = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      alert('Please fill in all credentials.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.replace('DoctorDashboard');
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => navigation.navigate('RoleSelection')} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color={COLORS.text} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('DoctorDashboard')} style={styles.skipBtn}>
              <Text style={styles.skipBtnText}>Skip</Text>
              <Ionicons name="arrow-forward" size={16} color={COLORS.primary} style={{marginLeft: 4}} />
            </TouchableOpacity>
          </View>

          <View style={styles.illustrationWrapper}>
            <View style={styles.illustrationContainer}>
              <Image
                source={require('../../../assets/images/doctor_illustration.png')}
                style={styles.illustration}
                resizeMode="contain"
              />
            </View>
          </View>

          <View style={styles.header}>
            <Text style={styles.title}>Welcome Practitioner</Text>
            <Text style={styles.subtitle}>Enter your secure credentials to proceed to clinical portal.</Text>
          </View>

          <View style={styles.form}>
            <PremiumInput
              label="Official Email Address"
              placeholder="e.g. sarah.wilson@smp.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              iconName="mail-outline"
            />

            <PremiumInput
              label="Security Password"
              placeholder="••••••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              iconName="lock-closed-outline"
            />

            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}
              style={styles.forgotContainer}
            >
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            <PremiumButton title="Access Portal" onPress={handleLogin} style={styles.loginBtn} />

            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>

            <PremiumButton
              title="Apply for Medical Verification"
              onPress={() => navigation.navigate('DoctorVerification')}
              type="outline"
              style={styles.verifyBtn}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Loading visible={loading} text="Verifying doctor identity..." />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    flexGrow: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(226, 232, 240, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(14, 165, 233, 0.1)',
    borderRadius: 20,
  },
  skipBtnText: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: SIZES.font,
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: SIZES.extraLarge,
    fontWeight: '900',
    color: COLORS.text,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: SIZES.medium,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
  form: {
    flex: 1,
  },
  forgotContainer: {
    alignSelf: 'flex-end',
    marginVertical: 12,
  },
  forgotText: {
    color: COLORS.primary,
    fontSize: SIZES.font,
    fontWeight: '700',
  },
  loginBtn: {
    marginTop: 20,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  dividerText: {
    paddingHorizontal: 16,
    color: COLORS.textSecondary,
    fontSize: SIZES.font,
    fontWeight: '600',
  },
  verifyBtn: {
    marginBottom: 20,
  },
  illustrationWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
  illustrationContainer: {
    width: 180,
    height: 180,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    ...SHADOWS.premium,
  },
  illustration: {
    width: '85%',
    height: '85%',
  },
});

export default DoctorLogin;
