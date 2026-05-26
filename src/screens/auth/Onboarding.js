import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions, Animated, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SafeImage from '../../components/SafeImage';
import PremiumButton from '../../components/PremiumButton';
import { COLORS, SIZES, BORDER_RADIUS, SHADOWS } from '../../styles/theme';

const { width } = Dimensions.get('window');

const SLIDES = [
  {
    title: 'Fast Digital Prescriptions',
    description: 'Empower clinical workflows with instantly generated smart prescriptions secured via AI assistance.',
    image: require('../../../assets/images/onboarding1.png'),
    colors: [COLORS.primary, '#0284C7'],
  },
  {
    title: 'Verified Doctors & Organizations',
    description: 'Ensure trust with unified verification pipelines validating doctors, clinics, and pharmacies.',
    image: require('../../../assets/images/onboarding2.png'),
    colors: [COLORS.secondary, '#059669'],
  },
  {
    title: 'Secure Patient History',
    description: 'Access centralized health timelines, dosage history, and safe analytical profiles seamlessly.',
    image: require('../../../assets/images/onboarding3.png'),
    colors: [COLORS.dark, '#1E293B'],
  },
];

const Onboarding = ({ navigation }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const handleNext = () => {
    if (currentSlideIndex < SLIDES.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    } else {
      navigation.replace('RoleSelection');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Floating Pill Skip Button - Top Right */}
      <TouchableOpacity onPress={() => navigation.replace('RoleSelection')} style={styles.skipPill}>
        <Text style={styles.skipPillText}>Skip</Text>
        <Ionicons name="arrow-forward" size={16} color={COLORS.primary || '#007AFF'} style={{marginLeft: 6}} />
      </TouchableOpacity>

      <View style={styles.slideContainer}>
        {/* Active illustration visual widget - Rounded Rectangle Thumbnail */}
        <View style={styles.illustrationWrapper}>
          <SafeImage
            source={SLIDES[currentSlideIndex].image}
            style={styles.illustration}
            resizeMode="cover"
          />
        </View>

        <View style={styles.textWrapper}>
          <Text style={styles.title}>{SLIDES[currentSlideIndex].title}</Text>
          <Text style={styles.description}>{SLIDES[currentSlideIndex].description}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        {/* Page indicator dots */}
        <View style={styles.indicatorContainer}>
          {SLIDES.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex === index ? styles.activeIndicator : null,
              ]}
            />
          ))}
        </View>

        <PremiumButton
          title={currentSlideIndex === SLIDES.length - 1 ? 'Get Started' : 'Continue'}
          onPress={handleNext}
          gradientColors={
            currentSlideIndex === SLIDES.length - 1
              ? ['#475569', '#1E293B'] // slightly lighter premium grey
              : SLIDES[currentSlideIndex].colors
          }
          style={[
            styles.button,
            currentSlideIndex === SLIDES.length - 1 && {
              borderWidth: 1.5,
              borderColor: 'rgba(255, 255, 255, 0.4)',
              shadowColor: '#1E293B',
              shadowOpacity: 0.5,
              elevation: 8
            }
          ]}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'space-between',
  },
  skipPill: {
    position: 'absolute',
    top: 60, // Position Top-right
    right: 24,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 24,
    backgroundColor: COLORS.glass || 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1.5,
    borderColor: COLORS.primary || '#007AFF',
    zIndex: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  skipPillText: {
    fontSize: SIZES.font || 16,
    fontWeight: '700',
    color: COLORS.primary || '#007AFF',
  },
  slideContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingTop: 40,
    paddingBottom: 24, // Prevents text from touching indicators
  },
  illustrationWrapper: {
    width: width * 0.72,
    height: width * 0.72,
    borderRadius: 24,
    backgroundColor: COLORS.card,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    padding: 8,
    ...SHADOWS.soft,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  illustration: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  textWrapper: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 18,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24, // Add proper spacing below description
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    alignItems: 'center',
  },
  indicatorContainer: {
    flexDirection: 'row',
    marginTop: 12, // Add top spacing above indicator container
    marginBottom: 24, // 20-24px below indicators to CTA button
  },
  indicator: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: '#E2E8F0',
    marginHorizontal: 4,
  },
  activeIndicator: {
    width: 24,
    backgroundColor: COLORS.primary,
  },
  button: {
    width: '100%',
  },
});

export default Onboarding;
