import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';
import PremiumInput from '../../components/PremiumInput';
import PremiumButton from '../../components/PremiumButton';
import GradientCard from '../../components/GradientCard';
import Loading from '../../components/Loading';
import PremiumBackground from '../../components/PremiumBackground';
import { COLORS, SIZES, BORDER_RADIUS, SHADOWS } from '../../styles/theme';
import { savePrescription, saveUpcomingReminders } from '../../utils/storage';
import { scheduleMedicineReminders } from '../../utils/notifications';

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
  const [frequency, setFrequency] = useState('Once daily');
  const [customFrequency, setCustomFrequency] = useState('');
  const [customUnit, setCustomUnit] = useState('Hours'); // 'Hours' or 'Minutes'
  const [duration, setDuration] = useState('');
  const [instructions, setInstructions] = useState('');
  const [startTime, setStartTime] = useState('');

  const handleNextStep = () => {
    if (step === 1) {
      if (!patientName || !patientAge || !diagnosis) {
        alert('Please fill out all patient details.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!medicine) {
        alert('Please enter at least the medicine name.');
        return;
      }
      if (frequency === 'Custom' && !customFrequency) {
        alert('Please specify the custom frequency.');
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

  const handleGenerate = async () => {
    setLoading(true);
    
    // Determine frequency text
    let finalFrequency = frequency;
    if (frequency === 'Custom') {
      const val = parseInt(customFrequency, 10) || 1;
      const unitLabel = customUnit === 'Minutes' 
        ? (val === 1 ? 'minute' : 'minutes') 
        : (val === 1 ? 'hour' : 'hours');
      finalFrequency = `Every ${val} ${unitLabel}`;
    }
    
    const prescriptionData = {
      patientName,
      patientAge,
      patientGender,
      diagnosis,
      medicine,
      dosage: dosage || '1 Tablet',
      frequency: finalFrequency || 'Once daily',
      duration: duration || '1 day',
      instructions: instructions || 'No additional instructions',
      startTime: startTime || '09:00 AM',
      doctorId: 'doc_123',
    };

    const savedPrescription = await savePrescription(prescriptionData);
    
    if (savedPrescription) {
      const scheduledReminders = await scheduleMedicineReminders(savedPrescription);
      await saveUpcomingReminders(scheduledReminders);
    }

    setTimeout(() => {
      setLoading(false);
      navigation.navigate('GeneratePDF', { data: prescriptionData });
    }, 1800);
  };

  return (
    <PremiumBackground safeArea={true}>
      <Header onSkipPress={() => console.log("Skip")}
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
              placeholder="e.g. Vikram Singh"
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
            <View style={styles.chipContainer}>
              {['Every 1 hour', 'Every 3 hours', 'Every 6 hours', 'Every 12 hours', 'Once daily', 'Twice daily', 'Custom'].map((f) => (
                <TouchableOpacity
                  key={f}
                  onPress={() => setFrequency(f)}
                  style={[styles.chip, frequency === f && styles.chipActive]}
                >
                  <Text style={[styles.chipText, frequency === f && styles.chipTextActive]}>
                    {f}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {frequency === 'Custom' && (
              <View style={{ marginBottom: 20 }}>
                <View style={styles.row}>
                  <View style={{ flex: 1, marginRight: 12 }}>
                    <PremiumInput
                      label="Custom Interval Value"
                      placeholder="e.g. 5"
                      value={customFrequency}
                      onChangeText={setCustomFrequency}
                      keyboardType="numeric"
                      iconName="repeat-outline"
                    />
                  </View>
                  <View style={{ flex: 1.2 }}>
                    <Text style={styles.dropdownLabel}>Time Unit</Text>
                    <View style={styles.genderRow}>
                      {['Hours', 'Minutes'].map((unit) => (
                        <TouchableOpacity
                          key={unit}
                          onPress={() => setCustomUnit(unit)}
                          style={[styles.genderBtn, customUnit === unit && styles.genderBtnActive]}
                        >
                          <Text style={[styles.genderBtnText, customUnit === unit && styles.genderBtnTextActive]}>
                            {unit}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                </View>
              </View>
            )}

            <PremiumInput
              label="Duration (e.g., 5 days)"
              placeholder="e.g. 5 days"
              value={duration}
              onChangeText={setDuration}
              iconName="time-outline"
            />

            <PremiumInput
              label="Start Time (Optional)"
              placeholder="e.g. 08:00 AM"
              value={startTime}
              onChangeText={setStartTime}
              iconName="alarm-outline"
            />

            <Text style={styles.dropdownLabel}>Instructions</Text>
            <View style={styles.chipContainer}>
              {['Before food', 'After food', 'Empty stomach'].map((inst) => (
                <TouchableOpacity
                  key={inst}
                  onPress={() => setInstructions(inst)}
                  style={[styles.chip, instructions === inst && styles.chipActive]}
                >
                  <Text style={[styles.chipText, instructions === inst && styles.chipTextActive]}>
                    {inst}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <PremiumInput
              label="Custom Instructions (Optional)"
              placeholder="e.g. Avoid dairy products for 2 hours after taking"
              value={instructions}
              onChangeText={setInstructions}
              iconName="chatbox-ellipses-outline"
              multiline={true}
              numberOfLines={4}
            />

            <PremiumButton title="Review Details" onPress={handleNextStep} style={styles.actionBtn} />
          </View>
        )}

        {/* STEP 3: PREVIEW & GENERATE */}
        {step === 3 && (
          <View style={styles.formSection}>
            <Text style={styles.sectionHeading}>Confirm Prescription Details</Text>
            
            <GradientCard colors={['rgba(255,255,255,0.10)', 'rgba(255,255,255,0.05)']} style={styles.reviewCard}>
              <Text style={styles.reviewTitle}>Patient: <Text style={styles.reviewText}>{patientName} ({patientAge} / {patientGender})</Text></Text>
              <Text style={styles.reviewTitle}>Diagnosis: <Text style={styles.reviewText}>{diagnosis}</Text></Text>
              
              <View style={styles.reviewDivider} />
              
              <Text style={styles.reviewTitle}>Rx Prescribed:</Text>
              <Text style={styles.medLabel}>{medicine}</Text>
              <Text style={styles.medParams}>
                Dosage: {dosage || '1 Tablet'} • {frequency === 'Custom' 
                  ? `Every ${customFrequency || '?'} ${customUnit.toLowerCase()}` 
                  : (frequency || 'Once daily')}
              </Text>
              <Text style={styles.medParams}>Duration: {duration || '1 day'}</Text>
              <Text style={styles.medParams}>Instructions: {instructions || 'No additional instructions'}</Text>
              <Text style={styles.medParams}>Start Time: {startTime || '09:00 AM'}</Text>
            </GradientCard>

            <PremiumButton title="Digitally Sign & Generate PDF" onPress={handleGenerate} style={styles.actionBtn} />
          </View>
        )}
      </ScrollView>

      <Loading visible={loading} text="Compiling electronic signature & PDF..." />
    </PremiumBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollContent: {
    padding: 24,
    flexGrow: 1,
    paddingBottom: 120,
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
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  stepDotActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  stepNum: {
    fontSize: SIZES.font,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.6)',
  },
  stepNumActive: {
    color: '#FFFFFF',
  },
  stepConnector: {
    width: 60,
    height: 3,
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
    color: '#FFFFFF',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: '100%',
  },
  dropdownLabel: {
    fontSize: SIZES.font,
    color: 'rgba(255,255,255,0.85)',
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
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
    paddingHorizontal: 18,
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  genderBtnActive: {
    backgroundColor: '#60A5FA',
    borderColor: '#93C5FD',
  },
  genderBtnText: {
    fontSize: SIZES.font,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '700',
  },
  genderBtnTextActive: {
    color: '#FFFFFF',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  chip: {
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    marginBottom: 8,
    paddingHorizontal: 18,
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  chipActive: {
    backgroundColor: '#60A5FA',
    borderColor: '#93C5FD',
  },
  chipText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '700',
  },
  chipTextActive: {
    color: '#FFFFFF',
  },
  actionBtn: {
    marginTop: 30,
    marginBottom: 20,
  },
  reviewCard: {
    width: '100%',
    marginBottom: 36,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.25)',
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
