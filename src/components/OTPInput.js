import React, { useRef, useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Platform } from 'react-native';
import { COLORS, BORDER_RADIUS, SIZES, SHADOWS } from '../styles/theme';

const OTPInput = ({ 
  length = 4, 
  onComplete, 
  autoFocus = true,
  secureTextEntry = false,
  onCodeChange,
  disabled = false
}) => {
  const [code, setCode] = useState(Array(length).fill(''));
  const inputsRef = useRef([]);

  // Auto focus on first input
  useEffect(() => {
    if (autoFocus && inputsRef.current[0]) {
      inputsRef.current[0].focus();
    }
  }, [autoFocus]);

  const handleChange = (text, index) => {
    // Handle paste for multiple digits
    if (text.length > 1) {
      const pastedCode = text.slice(0, length).split('');
      const newCode = [...code];
      for (let i = 0; i < pastedCode.length; i++) {
        if (index + i < length) {
          newCode[index + i] = pastedCode[i];
        }
      }
      setCode(newCode);
      
      // Focus on next empty field or last field
      const lastFilledIndex = Math.min(index + pastedCode.length - 1, length - 1);
      if (lastFilledIndex < length - 1) {
        inputsRef.current[lastFilledIndex + 1]?.focus();
      }
      
      const finalCode = newCode.join('');
      if (finalCode.length === length && onComplete) {
        onComplete(finalCode);
      }
      if (onCodeChange) onCodeChange(finalCode);
      return;
    }

    // Handle single digit entry
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Trigger onCodeChange callback
    const finalCode = newCode.join('');
    if (onCodeChange) onCodeChange(finalCode);

    // Auto-focus next input
    if (text && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    // Check if OTP is complete
    if (finalCode.length === length && onComplete && !finalCode.includes('')) {
      onComplete(finalCode);
    }
  };

  const handleKeyPress = (e, index) => {
    const key = e.nativeEvent.key;
    
    // Handle backspace
    if (key === 'Backspace' && !code[index] && index > 0) {
      const newCode = [...code];
      newCode[index - 1] = '';
      setCode(newCode);
      inputsRef.current[index - 1]?.focus();
      if (onCodeChange) onCodeChange(newCode.join(''));
    }
    
    // Handle delete key (for Mac)
    if (key === 'Delete' && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleFocus = (index) => {
    // Select all text on focus for easier replacement
    inputsRef.current[index]?.setSelection?.(0, 1);
  };

  const clearOTP = () => {
    setCode(Array(length).fill(''));
    if (inputsRef.current[0]) {
      inputsRef.current[0].focus();
    }
    if (onCodeChange) onCodeChange('');
  };

  return (
    <View style={styles.container}>
      {code.map((digit, index) => (
        <TextInput
          key={index}
          ref={(ref) => (inputsRef.current[index] = ref)}
          style={[
            styles.box, 
            code[index] ? styles.boxActive : null,
            disabled && styles.boxDisabled
          ]}
          keyboardType="number-pad"
          maxLength={length === 1 ? length : 1}
          value={digit}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          onFocus={() => handleFocus(index)}
          textAlign="center"
          selectionColor={COLORS?.primary || '#007AFF'}
          editable={!disabled}
          secureTextEntry={secureTextEntry}
          contextMenuHidden={false}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: SIZES?.lg || 20,
    marginVertical: SIZES?.xl || 24,
  },
  box: {
    width: Platform.OS === 'ios' ? 60 : 56,
    height: Platform.OS === 'ios' ? 64 : 60,
    backgroundColor: COLORS?.glass || '#F9FAFB',
    borderRadius: BORDER_RADIUS?.md || 12,
    borderWidth: 1.5,
    borderColor: COLORS?.border || '#E5E7EB',
    fontSize: SIZES?.fontXl || 24,
    fontWeight: '700',
    color: COLORS?.text || '#1F2937',
    textAlign: 'center',
    ...(SHADOWS?.glass || {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    }),
  },
  boxActive: {
    borderColor: COLORS?.primary || '#007AFF',
    backgroundColor: COLORS?.card || '#FFFFFF',
    borderWidth: 2,
    ...(SHADOWS?.glow || {
      shadowColor: COLORS?.primary || '#007AFF',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 3,
    }),
  },
  boxDisabled: {
    opacity: 0.5,
    backgroundColor: COLORS?.disabled || '#F3F4F6',
  },
});

export default OTPInput;