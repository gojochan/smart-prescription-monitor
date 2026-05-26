import React, { useRef } from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, BORDER_RADIUS, SHADOWS, SIZES } from '../styles/theme';

const PremiumButton = ({ 
  title, 
  onPress, 
  type = 'primary', 
  gradientColors, 
  style, 
  textStyle,
  disabled = false,
  loading = false,
  loadingText = 'Please wait...'
}) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    if (!disabled && !loading) {
      Animated.spring(scaleValue, {
        toValue: 0.96,
        useNativeDriver: true,
        tension: 100,
        friction: 10,
      }).start();
    }
  };

  const handlePressOut = () => {
    if (!disabled && !loading) {
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
        tension: 100,
        friction: 10,
      }).start();
    }
  };

  const isOutline = type === 'outline';
  const defaultGradientColors = gradientColors || ['#334155', '#0F172A'];
  
  // Fallback colors for different button types
  const getDisabledColors = () => {
    return ['#9CA3AF', '#D1D5DB'];
  };

  const displayText = loading ? loadingText : title;
  const isDisabled = disabled || loading;

  return (
    <Animated.View style={[{ transform: [{ scale: scaleValue }] }, style]}>
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        activeOpacity={0.9}
        disabled={isDisabled}
        style={styles.touchable}
      >
        {isOutline ? (
          <Animated.View style={[
            styles.button, 
            styles.outlineButton,
            isDisabled && styles.disabledOutlineButton
          ]}>
            <Text style={[
              styles.text, 
              styles.outlineText, 
              textStyle,
              isDisabled && styles.disabledText
            ]}>
              {displayText}
            </Text>
          </Animated.View>
        ) : (
          <LinearGradient
            colors={isDisabled ? getDisabledColors() : defaultGradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.button, isDisabled && styles.disabledButton]}
          >
            <Text style={[
              styles.text, 
              styles.primaryText, 
              textStyle,
              isDisabled && styles.disabledText
            ]}>
              {displayText}
            </Text>
          </LinearGradient>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  touchable: {
    width: '100%',
    marginVertical: SIZES?.sm || 8,
  },
  button: {
    minHeight: 56,
    borderRadius: 24, // updated to 18-24 per requirements
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: SIZES?.lg || 20,
    paddingVertical: SIZES?.sm || 8,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  outlineButton: {
    backgroundColor: COLORS?.glass || 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1.5,
    borderColor: COLORS?.primary || '#007AFF',
    ...(SHADOWS?.glass || {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 1,
    }),
  },
  disabledButton: {
    opacity: 0.7,
  },
  disabledOutlineButton: {
    opacity: 0.5,
    borderColor: '#9CA3AF',
  },
  text: {
    fontSize: SIZES?.fontMd || 16,
    fontWeight: '700',
    letterSpacing: 0.8,
    textAlign: 'center',
  },
  primaryText: {
    color: '#ffffff',
  },
  outlineText: {
    color: COLORS?.primary || '#007AFF',
  },
  disabledText: {
    opacity: 0.6,
  },
});

export default PremiumButton;