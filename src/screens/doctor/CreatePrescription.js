import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';
import PremiumInput from '../../components/PremiumInput';
import PremiumButton from '../../components/PremiumButton';
import GradientCard from '../../components/GradientCard';
import Loading from '../../components/Loading';
import { COLORS, SIZES, BORDER_RADIUS, SHADOWS } from '../../styles/theme';

const CreatePrescription = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Patient Info States
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [patientGender, setPatientGender] = useState('Male');
  const [diagnosis, setDiagnosis] = useState('');

  // Medicine Selection States
  const [medicine, setMedicine] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('Once Daily');
  const [duration, setDuration] = useState('');
  const [instructions, setInstructions] = useState('');

  const handleNextStep = () => {
    if (step === 1) {
      if (!patientName || !patientAge || !diagnosis) {
        alert('Please fill out all patient details.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!medicine || !dosage || !duration) {
        alert('Please complete medicine dosage parameters.');
        return;
      }
      setStep(3);
    }
  };

  const handleBackStep = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigation.goBack();
    }
  };

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('GeneratePDF', {
        data: {
          patientName,
          patientAge,
          patientGender,
          diagnosis,
          medicine,
          dosage,
          frequency,
          duration,
          instructions,
        }
      });
    }, 1800);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={`New Prescription (Step ${step}/3)`}
        onBackPress={handleBackStep}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Visual Progress Steps Header */}
        <View style={styles.progressHeader}>
          {[1, 2, 3].map((num) => (
            <View key={num} style={styles.progressStepRow}>
              <View style={[styles.stepDot, step >= num ? styles.stepDotActive : null]}>
                <Text style={[styles.stepNum, step >= num ? styles.stepNumActive : null]}>{num}</Text>
              </View>
              {num < 3 && <View style={[styles.stepConnector, step > num ? styles.stepConnectorActive : null]} />}
            </View>
          ))}
        </View>

        {/* STEP 1: PATIENT INFRASTRUCTURE */}
        {step === 1 && (
          <View style={styles.formSection}>
            <Text style={styles.sectionHeading}>Patient Demographics</Text>
            
            <PremiumInput
              label="Patient Full Name"
              placeholder="e.g. Leonard Hofstadter"
              value={patientName}
              onChangeText={setPatientName}
              iconName="person-outline"
            />

            <View style={styles.row}>
              <View style={{ flex: 1, marginRight: 12 }}>
                <PremiumInput
                  label="Age"
                  placeholder="e.g. 32"
                  value={patientAge}
                  onChangeText={setPatientAge}
                  keyboardType="numeric"
                  iconName="calendar-outline"
                />
              </View>
              <View style={{ flex: 1.2 }}>
                <Text style={styles.dropdownLabel}>Gender</Text>
                <View style={styles.genderRow}>
                  {['Male', 'Female'].map((g) => (
                    <TouchableOpacity
                      key={g}
                      onPress={() => setPatientGender(g)}
                      style={[styles.genderBtn, patientGender === g && styles.genderBtnActive]}
                    >
                      <Text style={[styles.genderBtnText, patientGender === g && styles.genderBtnTextActive]}>
                        {g}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>

            <PremiumInput
              label="Diagnosis / Clinical Impression"
              placeholder="e.g. Mild Hypertension"
              value={diagnosis}
              onChangeText={setDiagnosis}
              iconName="pulse-outline"
            />
            
            <PremiumButton title="Continue to Medicines" onPress={handleNextStep} style={styles.actionBtn} />
          </View>
        )}

        {/* STEP 2: MEDICINE PARAMETERS */}
        {step === 2 && (
          <View style={styles.formSection}>
            <Text style={styles.sectionHeading}>Medicine Selection</Text>
            
            <PremiumInput
              label="Medicine Name / Brand"
              placeholder="e.g. Amoxicillin 500mg"
              value={medicine}
              onChangeText={setMedicine}
              iconName="flask-outline"
            />

            <PremiumInput
              label="Dosage Strength"
              placeholder="e.g. 1 Tablet"
              value={dosage}
              onChangeText={setDosage}
              iconName="analytics-outline"
            />

            <Text style={styles.dropdownLabel}>Frequency</Text>
            <View style={styles.freqContainer}>
              {['Once Daily', 'Twice Daily', 'Thrice Daily'].map((f) => (
                <TouchableOpacity
                  key={f}
                  onPress={() => setFrequency(f)}
                  style={[styles.freqChip, frequency === f && styles.freqChipActive]}
                >
                  <Text style={[styles.freqChipText, frequency === f && styles.freqChipTextActive]}>
                    {f}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <PremiumInput
              label="Duration"
              placeholder="e.g. 7 Days"
              value={duration}
              onChangeText={setDuration}
              iconName="time-outline"
            />

            <PremiumInput
              label="Instructions (Optional)"
              placeholder="e.g. Take after breakfast"
              value={instructions}
              onChangeText={setInstructions}
              iconName="chatbox-ellipses-outline"
            />

            <PremiumButton title="Review Details" onPress={handleNextStep} style={styles.actionBtn} />
          </View>
        )}

        {/* STEP 3: PREVIEW & GENERATE */}
        {step === 3 && (
          <View style={styles.formSection}>
            <Text style={styles.sectionHeading}>Confirm Prescription Details</Text>
            
            <GradientCard colors={['#FFFFFF', '#F8FAFC']} style={styles.reviewCard}>
              <Text style={styles.reviewTitle}>Patient: <Text style={styles.reviewText}>{patientName} ({patientAge} / {patientGender})</Text></Text>
              <Text style={styles.reviewTitle}>Diagnosis: <Text style={styles.reviewText}>{diagnosis}</Text></Text>
              
              <View style={styles.reviewDivider} />
              
              <Text style={styles.reviewTitle}>Rx Prescribed:</Text>
              <Text style={styles.medLabel}>{medicine}</Text>
              <Text style={styles.medParams}>Dosage: {dosage} • {frequency}</Text>
              <Text style={styles.medParams}>Duration: {duration}</Text>
              {instructions ? <Text style={styles.medParams}>Instructions: {instructions}</Text> : null}
            </GradientCard>

            <PremiumButton title="Digitally Sign & Generate PDF" onPress={handleGenerate} style={styles.actionBtn} />
          </View>
        )}
      </ScrollView>

      <Loading visible={loading} text="Compiling electronic signature & PDF..." />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: 24,
    flexGrow: 1,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  progressStepRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepDot: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepDotActive: {
    backgroundColor: COLORS.primary,
  },
  stepNum: {
    fontSize: SIZES.font,
    fontWeight: '700',
    color: COLORS.textSecondary,
  },
  stepNumActive: {
    color: '#FFFFFF',
  },
  stepConnector: {
    width: 60,
    height: 3,
    backgroundColor: '#E2E8F0',
  },
  stepConnectorActive: {
    backgroundColor: COLORS.primary,
  },
  formSection: {
    flex: 1,
  },
  sectionHeading: {
    fontSize: SIZES.large,
    fontWeight: '900',
    color: COLORS.text,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: '100%',
  },
  dropdownLabel: {
    fontSize: SIZES.font,
    color: COLORS.text,
    fontWeight: '600',
    marginBottom: 10,
    paddingLeft: 4,
  },
  genderRow: {
    flexDirection: 'row',
    height: 56,
    marginBottom: SIZES.base,
  },
  genderBtn: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.input,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
    ...SHADOWS.soft,
  },
  genderBtnActive: {
    borderColor: COLORS.primary,
    backgroundColor: 'rgba(14, 165, 233, 0.04)',
  },
  genderBtnText: {
    fontSize: SIZES.font,
    color: COLORS.textSecondary,
    fontWeight: '700',
  },
  genderBtnTextActive: {
    color: COLORS.primary,
  },
  freqContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  freqChip: {
    flex: 1,
    height: 48,
    borderRadius: BORDER_RADIUS.input - 4,
    backgroundColor: COLORS.card,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    ...SHADOWS.soft,
  },
  freqChipActive: {
    borderColor: COLORS.primary,
    backgroundColor: 'rgba(14, 165, 233, 0.04)',
  },
  freqChipText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '700',
  },
  freqChipTextActive: {
    color: COLORS.primary,
  },
  actionBtn: {
    marginTop: 30,
    marginBottom: 20,
  },
  reviewCard: {
    width: '100%',
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  reviewTitle: {
    fontSize: SIZES.font + 1,
    fontWeight: '800',
    color: COLORS.textSecondary,
    marginBottom: 10,
  },
  reviewText: {
    color: COLORS.text,
    fontWeight: '700',
  },
  reviewDivider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 16,
  },
  medLabel: {
    fontSize: SIZES.large,
    fontWeight: '900',
    color: COLORS.primary,
    marginBottom: 8,
  },
  medParams: {
    fontSize: SIZES.font,
    color: COLORS.text,
    fontWeight: '600',
    marginBottom: 6,
  },
});

export default CreatePrescription;
