import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES, BORDER_RADIUS, SHADOWS } from '../styles/theme';

const CustomInput = ({ 
  label, 
  placeholder, 
  value, 
  onChangeText, 
  secureTextEntry = false, 
  keyboardType = 'default',
  error = '',
  multiline = false,
  numberOfLines = 1,
  maxLength,
  editable = true,
  autoCapitalize = 'none'
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputWrapper, error ? styles.inputError : null]}>
        <TextInput
          style={[
            styles.input,
            multiline && styles.multilineInput,
            secureTextEntry && styles.passwordInput
          ]}
          placeholder={placeholder}
          placeholderTextColor={COLORS?.textTertiary || '#9CA3AF'}
          selectionColor={COLORS?.primary || '#007AFF'}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          keyboardType={keyboardType}
          multiline={multiline}
          numberOfLines={multiline ? numberOfLines : 1}
          maxLength={maxLength}
          editable={editable}
          autoCapitalize={autoCapitalize}
        />
        {secureTextEntry && (
          <TouchableOpacity 
            style={styles.eyeIcon} 
            onPress={togglePasswordVisibility}
            activeOpacity={0.7}
          >
            <Ionicons 
              name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'} 
              size={22} 
              color={COLORS?.textSecondary || '#6B7280'} 
            />
          </TouchableOpacity>
        )}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
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
  inputWrapper: {
    position: 'relative',
    width: '100%',
  },
  input: {
    backgroundColor: COLORS?.glass || '#F9FAFB',
    borderWidth: 1.5,
    borderColor: COLORS?.border || '#E5E7EB',
    borderRadius: BORDER_RADIUS?.input || 8,
    paddingHorizontal: SIZES?.md || 16,
    paddingVertical: Platform.OS === 'android' ? 14 : 16,
    fontSize: SIZES?.fontMd || 16,
    color: COLORS?.text || '#1F2937',
    fontWeight: '500',
    includeFontPadding: false,
    ...(SHADOWS?.glass || { shadowOpacity: 0 }),
  },
  multilineInput: {
    textAlignVertical: 'top',
    minHeight: 80,
  },
  passwordInput: {
    paddingRight: 50,
  },
  inputError: {
    borderColor: COLORS?.danger || '#EF4444',
    borderWidth: 1.5,
  },
  eyeIcon: {
    position: 'absolute',
    right: SIZES?.md || 16,
    top: '50%',
    transform: [{ translateY: -11 }],
    height: 44,
    width: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: SIZES?.small || 12,
    color: COLORS?.danger || '#EF4444',
    marginTop: 4,
    marginLeft: 4,
  },
});

export default CustomInput;