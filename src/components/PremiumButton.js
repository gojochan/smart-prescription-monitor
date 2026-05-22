import React, { useRef } from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, BORDER_RADIUS, SHADOWS, SIZES } from '../styles/theme';

const PremiumButton = ({ title, onPress, type = 'primary', gradientColors, style, textStyle }) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.96,
      useNativeDriver: true,
      tension: 100,
      friction: 10,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
      tension: 100,
      friction: 10,
    }).start();
  };

  const isOutline = type === 'outline';
  const defaultGradientColors = gradientColors || [COLORS.primary, '#0284C7'];

  return (
    <Animated.View style={[{ transform: [{ scale: scaleValue }] }, style]}>
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        activeOpacity={0.9}
        style={styles.touchable}
      >
        {isOutline ? (
          <Animated.View style={[styles.button, styles.outlineButton]}>
            <Text style={[styles.text, styles.outlineText, textStyle]}>{title}</Text>
          </Animated.View>
        ) : (
          <LinearGradient
            colors={defaultGradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.button}
          >
            <Text style={[styles.text, styles.primaryText, textStyle]}>{title}</Text>
          </LinearGradient>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  touchable: {
    width: '100%',
  },
  button: {
    height: 56,
    borderRadius: BORDER_RADIUS.button,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    ...SHADOWS.premium,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.primary,
    elevation: 0,
    shadowOpacity: 0,
  },
  text: {
    fontSize: SIZES.medium,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  primaryText: {
    color: COLORS.white || '#FFFFFF',
  },
  outlineText: {
    color: COLORS.primary,
  },
});

export default PremiumButton;
