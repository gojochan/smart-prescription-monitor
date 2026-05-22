import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, BORDER_RADIUS, SIZES, SHADOWS } from '../styles/theme';

const PremiumInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
  icon,
  iconName,
  error,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hidePassword, setHidePassword] = useState(secureTextEntry);
  const inputIcon = icon || iconName;

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputFocused,
          error && styles.inputError,
          props.multiline && styles.inputContainerMultiline,
        ]}
      >
        {inputIcon && (
          <Ionicons
            name={inputIcon}
            size={22}
            color={error ? COLORS.danger : isFocused ? COLORS.primary : COLORS.textSecondary}
            style={styles.icon}
          />
        )}
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textSecondary}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={hidePassword}
          keyboardType={keyboardType}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          textAlignVertical={props.multiline ? 'top' : 'center'}
          {...props}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setHidePassword(!hidePassword)}
            style={styles.rightIcon}
          >
            <Ionicons
              name={hidePassword ? 'eye-off-outline' : 'eye-outline'}
              size={22}
              color={COLORS.textSecondary}
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
    marginVertical: SIZES.base,
  },
  label: {
    fontSize: SIZES.font,
    color: COLORS.text,
    marginBottom: SIZES.base,
    fontWeight: '600',
    paddingLeft: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.input,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    paddingHorizontal: SIZES.medium,
    height: 56,
    ...SHADOWS.soft,
  },
  inputContainerMultiline: {
    height: 'auto',
    minHeight: 100,
    alignItems: 'flex-start',
    paddingVertical: 12,
  },
  inputFocused: {
    borderColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.15,
    elevation: 4,
  },
  inputError: {
    borderColor: COLORS.danger,
  },
  icon: {
    marginRight: SIZES.base * 1.5,
  },
  input: {
    flex: 1,
    fontSize: SIZES.medium,
    color: COLORS.text,
    height: '100%',
  },
  rightIcon: {
    paddingLeft: SIZES.base,
  },
  errorText: {
    color: COLORS.danger,
    fontSize: SIZES.small,
    marginTop: SIZES.base / 2,
    paddingLeft: SIZES.base,
  },
});

export default PremiumInput;
