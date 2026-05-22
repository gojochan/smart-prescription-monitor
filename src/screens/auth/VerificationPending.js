import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PremiumButton from '../../components/PremiumButton';
import GradientCard from '../../components/GradientCard';
import { COLORS, SIZES, SHADOWS } from '../../styles/theme';

const VerificationPending = ({ navigation }) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.15,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Animated.View style={[styles.iconWrapper, { transform: [{ scale: pulseAnim }] }]}>
          <View style={styles.iconCircle}>
            <Ionicons name="time-outline" size={70} color={COLORS.primary} />
          </View>
        </Animated.View>

        <GradientCard colors={['#FFFFFF', '#F1F5F9']} style={styles.card}>
          <Text style={styles.title}>Verification Pending</Text>
          <Text style={styles.desc}>
            Your credentials and medical registration number are currently being verified against secure medical councils.
          </Text>
          
          <View style={styles.divider} />
          
          <View style={styles.row}>
            <Ionicons name="shield-checkmark-outline" size={20} color={COLORS.secondary} />
            <Text style={styles.rowText}>Estimated review time: 24 - 48 Hours</Text>
          </View>
        </GradientCard>

        <Text style={styles.subtext}>
          You will receive a push notification as soon as your access is approved.
        </Text>

        <PremiumButton
          title="Proceed to Sandbox Mode"
          onPress={() => navigation.navigate('DoctorDashboard')}
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapper: {
    marginBottom: 40,
    ...SHADOWS.premium,
  },
  iconCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(14, 165, 233, 0.2)',
  },
  card: {
    width: '100%',
    marginBottom: 30,
  },
  title: {
    fontSize: SIZES.large * 1.1,
    fontWeight: '955' || '900',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 12,
  },
  desc: {
    fontSize: SIZES.medium,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowText: {
    fontSize: SIZES.font,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginLeft: 8,
  },
  subtext: {
    fontSize: SIZES.font,
    color: COLORS.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  button: {
    width: '100%',
  },
});

export default VerificationPending;
