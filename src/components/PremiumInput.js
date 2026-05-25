import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, BORDER_RADIUS, SIZES, SHADOWS } from '../styles/theme';

const PremiumInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  icon,
  iconName,
  error,
  multiline = false,
  numberOfLines,
  maxLength,
  editable = true,
  autoCapitalize = 'none',
  returnKeyType = 'done',
  onBlur,
  onFocus,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hidePassword, setHidePassword] = useState(secureTextEntry);
  const inputIcon = icon || iconName;

  const handleFocus = (e) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputFocused,
          error && styles.inputError,
          multiline && styles.inputContainerMultiline,
          !editable && styles.inputDisabled
        ]}
      >
        {inputIcon && (
          <Ionicons
            name={inputIcon}
            size={22}
            color={error ? (COLORS?.danger || '#EF4444') : isFocused ? (COLORS?.primary || '#007AFF') : (COLORS?.textSecondary || '#6B7280')}
            style={styles.icon}
          />
        )}
        <TextInput
          style={[
            styles.input,
            multiline && styles.inputMultiline,
            inputIcon && styles.inputWithIcon,
            secureTextEntry && styles.inputWithRightIcon
          ]}
          placeholder={placeholder}
          placeholderTextColor={COLORS?.textSecondary || '#9CA3AF'}
          underlineColorAndroid="transparent"
          selectionColor={COLORS?.primary || '#007AFF'}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && hidePassword}
          keyboardType={keyboardType}
          onFocus={handleFocus}
          onBlur={handleBlur}
          textAlignVertical={multiline ? 'top' : 'center'}
          multiline={multiline}
          numberOfLines={multiline ? numberOfLines : 1}
          maxLength={maxLength}
          editable={editable}
          autoCapitalize={autoCapitalize}
          returnKeyType={returnKeyType}
          {...props}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.rightIcon}
            activeOpacity={0.7}
          >
            <Ionicons
              name={hidePassword ? 'eye-off-outline' : 'eye-outline'}
              size={22}
              color={COLORS?.textSecondary || '#6B7280'}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: SIZES?.base || 8,
  },
  label: {
    fontSize: SIZES?.fontBase || 14,
    color: COLORS?.text || '#1F2937',
    marginBottom: SIZES?.sm || 8,
    fontWeight: '600',
    paddingLeft: 4,
    letterSpacing: 0.5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS?.glass || '#F9FAFB',
    borderRadius: BORDER_RADIUS?.input || 12,
    borderWidth: 1.5,
    overflow: 'hidden',
    borderColor: COLORS?.border || '#E5E7EB',
    paddingHorizontal: SIZES?.md || 16,
    minHeight: 56,
    ...(SHADOWS?.glass || {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    }),
  },
  inputContainerMultiline: {
    minHeight: 120,
    alignItems: 'flex-start',
    paddingTop: SIZES?.md || 16,
    paddingBottom: SIZES?.md || 16,
  },
  inputFocused: {
    backgroundColor: COLORS?.card || '#FFFFFF',
    borderColor: COLORS?.primary || '#007AFF',
    borderWidth: 2,
    ...(SHADOWS?.glow || {
      shadowColor: COLORS?.primary || '#007AFF',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 2,
    }),
  },
  inputError: {
    borderColor: COLORS?.danger || '#EF4444',
    borderWidth: 2,
  },
  inputDisabled: {
    opacity: 0.6,
    backgroundColor: COLORS?.disabled || '#F3F4F6',
  },
  icon: {
    marginRight: SIZES?.sm || 12,
    width: 24,
    textAlign: 'center',
  },
  input: {
    flex: 1,
    fontSize: SIZES?.fontMd || 16,
    color: COLORS?.text || '#1F2937',
    fontWeight: '500',
    height: '100%',
    backgroundColor: 'transparent',
    paddingVertical: Platform.OS === 'android' ? 12 : 14,
    paddingHorizontal: 0,
    margin: 0,
    borderWidth: 0,
    textAlignVertical: 'center',
    includeFontPadding: false,
  },
  inputWithIcon: {
    paddingLeft: 0,
  },
  inputWithRightIcon: {
    paddingRight: 0,
  },
  inputMultiline: {
    height: 'auto',
    minHeight: 88,
    textAlignVertical: 'top',
    paddingTop: Platform.OS === 'android' ? 8 : 10,
    paddingBottom: Platform.OS === 'android' ? 8 : 10,
  },
  rightIcon: {
    paddingLeft: SIZES?.sm || 12,
    paddingVertical: 8,
  },
  errorText: {
    color: COLORS?.danger || '#EF4444',
    fontSize: SIZES?.fontSm || 12,
    marginTop: SIZES?.xs || 4,
    paddingLeft: SIZES?.sm || 8,
    fontWeight: '500',
  },
});

export default PremiumInput;