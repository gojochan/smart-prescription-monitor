import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS, SIZES, BORDER_RADIUS, SHADOWS } from '../styles/theme';

const CustomButton = ({ title, onPress, type = 'primary', style, disabled = false }) => {
  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        type === 'primary' ? styles.primaryBtn : styles.secondaryBtn,
        disabled && styles.disabledBtn,
        style
      ]} 
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled}
    >
      <Text style={[
        styles.text,
        type === 'primary' ? styles.primaryText : styles.secondaryText,
        disabled && styles.disabledText
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: SIZES.sm || 12,
    paddingHorizontal: SIZES.xl || 24,
    borderRadius: BORDER_RADIUS?.button || 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginVertical: SIZES.sm || 8,
    minHeight: 56,
  },
  primaryBtn: {
    backgroundColor: COLORS.primary || '#007AFF',
    ...(SHADOWS?.glow || { shadowOpacity: 0 }),
  },
  secondaryBtn: {
    backgroundColor: COLORS.glass || 'transparent',
    borderWidth: 1.5,
    borderColor: COLORS.primary || '#007AFF',
    ...(SHADOWS?.glass || { shadowOpacity: 0 }),
  },
  disabledBtn: {
    opacity: 0.6,
  },
  text: {
    fontSize: SIZES.fontMd || 16,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  primaryText: {
    color: COLORS.dark || '#000000',
  },
  secondaryText: {
    color: COLORS.primary || '#007AFF',
  },
  disabledText: {
    opacity: 0.8,
  }
});

export default CustomButton;