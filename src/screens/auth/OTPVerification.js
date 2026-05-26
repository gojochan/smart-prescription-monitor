import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';
import OTPInput from '../../components/OTPInput';
import PremiumButton from '../../components/PremiumButton';
import Loading from '../../components/Loading';

import { COLORS, SIZES, SHADOWS, BORDER_RADIUS } from '../../styles/theme';

const OTPVerification = ({ navigation, route }) => {
  const { type } = route.params || {};
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(59);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleVerify = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (type === 'password_reset') {
        alert('Verification complete! Please setup new credentials.');
        navigation.navigate('RoleSelection');
      } else {
        navigation.navigate('VerificationPending');
      }
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header onSkipPress={() => console.log("Skip")} title="Secure Access Verification" onBackPress={() => navigation.goBack()} />
      <View style={styles.content}>
        <View style={styles.illustrationWrapper}>
          <View style={styles.illustrationContainer}>
            <Ionicons name="shield-checkmark" size={70} color={COLORS.primary} />
          </View>
        </View>
        <View style={styles.header}>
          <Text style={styles.title}>Enter Verification Code</Text>
          <Text style={styles.subtitle}>
            A secure 4-digit code has been sent to your device. Please verify your identity.
          </Text>
        </View>

        <OTPInput length={4} onComplete={handleVerify} />

        <View style={styles.resendContainer}>
          {timer > 0 ? (
            <Text style={styles.timerText}>Resend code in <Text style={styles.timerBold}>{timer}s</Text></Text>
          ) : (
            <TouchableOpacity onPress={() => setTimer(59)}>
              <Text style={styles.resendText}>Resend Verification Code</Text>
            </TouchableOpacity>
          )}
        </View>

        <PremiumButton
          title="Verify and Proceed"
          onPress={handleVerify}
          style={styles.button}
        />
      </View>

      <Loading visible={loading} text="Securing connection..." />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 24,
    flex: 1,
  },
  header: {
    marginVertical: 30,
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
  resendContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  timerText: {
    fontSize: SIZES.font,
    color: COLORS.textSecondary,
  },
  timerBold: {
    fontWeight: '700',
    color: COLORS.primary,
  },
  resendText: {
    fontSize: SIZES.font,
    fontWeight: '700',
    color: COLORS.primary,
  },
  button: {
    marginTop: 'auto',
    marginBottom: 20,
  },
  illustrationWrapper: {
    alignItems: 'center',
    marginBottom: 10,
  },
  illustrationContainer: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: 'rgba(14, 165, 233, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(14, 165, 233, 0.15)',
  },
});

export default OTPVerification;
