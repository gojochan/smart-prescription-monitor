import React, { useRef, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { COLORS, BORDER_RADIUS, SIZES, SHADOWS } from '../styles/theme';

const OTPInput = ({ length = 4, onComplete }) => {
  const [code, setCode] = useState(Array(length).fill(''));
  const inputsRef = useRef([]);

  const handleChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < length - 1) {
      inputsRef.current[index + 1].focus();
    }

    const finalCode = newCode.join('');
    if (finalCode.length === length && onComplete) {
      onComplete(finalCode);
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  return (
    <View style={styles.container}>
      {code.map((_, index) => (
        <TextInput
          key={index}
          ref={(ref) => (inputsRef.current[index] = ref)}
          style={[styles.box, code[index] ? styles.boxActive : null]}
          keyboardType="number-pad"
          maxLength={1}
          value={code[index]}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          textAlign="center"
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginVertical: SIZES.large,
  },
  box: {
    width: 60,
    height: 60,
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.input,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.text,
    ...SHADOWS.soft,
  },
  boxActive: {
    borderColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.15,
  },
});

export default OTPInput;
