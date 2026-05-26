import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system/legacy';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import { COLORS, SIZES, BORDER_RADIUS, SHADOWS } from '../../styles/theme';

const defaultPatient = {
  patientName: 'Rahul Sharma',
  age: '30',
  gender: 'Male',
  diagnosis: 'General Checkup',
  code: 'REC-' + Math.floor(100000 + Math.random() * 900000),
};

const GeneratePDF = ({ route, navigation }) => {
  const { prescriptionId, patientData } = route.params || {};
  const [isLoading, setIsLoading] = useState(false);
  const [isSigned, setIsSigned] = useState(patientData?.status === 'Signed');

  // If we receive data from CreatePrescription
  const incomingData = route.params?.data || {};

  const patient = {
    patientName: incomingData.patientName || patientData?.patientName || defaultPatient.patientName,
    age: incomingData.patientAge || patientData?.age || defaultPatient.age,
    gender: incomingData.patientGender || patientData?.gender || defaultPatient.gender,
    date: new Date().toLocaleDateString(),
    diagnosis: incomingData.diagnosis || patientData?.diagnosis || defaultPatient.diagnosis,
    code: incomingData.id || defaultPatient.code,
  };

  const medicines = incomingData.medicine ? [
    { 
      name: incomingData.medicine, 
      strength: incomingData.dosage || '', 
      dosage: incomingData.frequency || '', 
      instructions: incomingData.instructions || '', 
      duration: incomingData.duration || '' 
    }
  ] : [
    { name: 'Telmisartan Tablets IP', strength: '40 mg', dosage: '1-0-0', instructions: 'Before breakfast', duration: '30 Days' },
    { name: 'Amlodipine Besylate', strength: '5 mg', dosage: '0-0-1', instructions: 'At bedtime', duration: '30 Days' },
    { name: 'Atorvastatin Calcium', strength: '10 mg', dosage: '0-0-1', instructions: 'After dinner', duration: '15 Days' },
  ];

  const generateHTML = () => {
    const medsHtml = medicines.map((med, index) => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;">${index + 1}</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>${med.name}</strong> ${med.strength}</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;">${med.dosage}</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;">${med.duration}</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;">${med.instructions}</td>
      </tr>
    `).join('');

    return `
      <html>
        <head>
          <style>
            body { font-family: 'Helvetica', sans-serif; padding: 40px; color: #333; }
            .header { text-align: center; margin-bottom: 40px; }
            .header h1 { margin: 0; color: #0284C7; font-size: 28px; }
            .header p { margin: 5px 0; color: #666; font-size: 14px; }
            .divider { border-top: 3px solid #0284C7; margin: 20px 0; }
            .dr-details { margin-bottom: 20px; }
            .dr-details h2 { margin: 0; font-size: 20px; color: #333; }
            .patient-grid { display: flex; flex-wrap: wrap; background: #F8FAFC; padding: 20px; border-radius: 10px; border: 1px solid #E2E8F0; margin-bottom: 20px; }
            .grid-col { width: 50%; margin-bottom: 15px; }
            .grid-label { font-size: 12px; font-weight: bold; color: #64748B; margin-bottom: 5px; }
            .grid-value { font-size: 16px; font-weight: bold; color: #0F172A; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th { text-align: left; padding: 10px; background: #F1F5F9; font-size: 14px; color: #475569; }
            .footer { margin-top: 60px; text-align: right; }
            .signature { border-top: 1px solid #333; display: inline-block; padding-top: 10px; width: 200px; text-align: center; margin-top: 40px; }
            .stamp { color: #10B981; font-weight: bold; border: 2px solid #10B981; padding: 5px 10px; display: inline-block; transform: rotate(-5deg); margin-bottom: 10px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>SMART MEDICAL CENTER</h1>
            <p>100 Innovation Way, Tech Park, Suite 400</p>
            <p>Tel: +1 (555) 123-4567 • www.smartprescription.com</p>
          </div>
          <div class="divider"></div>
          <div class="dr-details">
            <h2>Dr. Anjali Desai, MD</h2>
            <p style="margin: 5px 0; color: #666;">Consulting Cardiologist & Physician</p>
            <p style="margin: 0; color: #666;">License No: LIC-2024-897315</p>
          </div>
          <div class="patient-grid">
            <div class="grid-col">
              <div class="grid-label">PATIENT NAME</div>
              <div class="grid-value">${patient.patientName}</div>
            </div>
            <div class="grid-col">
              <div class="grid-label">DATE</div>
              <div class="grid-value">${patient.date}</div>
            </div>
            <div class="grid-col">
              <div class="grid-label">AGE / GENDER</div>
              <div class="grid-value">${patient.age} Yrs / ${patient.gender}</div>
            </div>
            <div class="grid-col">
              <div class="grid-label">DIAGNOSIS</div>
              <div class="grid-value">${patient.diagnosis}</div>
            </div>
          </div>
          <h3>MEDICATIONS PRESCRIBED</h3>
          <table>
            <tr>
              <th>#</th>
              <th>Medicine</th>
              <th>Dosage</th>
              <th>Duration</th>
              <th>Instructions</th>
            </tr>
            ${medsHtml}
          </table>
          <div class="footer">
            ${isSigned ? '<div class="stamp">DIGITALLY SIGNED</div><br>' : ''}
            <div class="signature">
              <strong>Dr. Anjali Desai</strong><br>
              <span style="font-size: 12px; color: #666;">Consultant Physician</span>
            </div>
          </div>
        </body>
      </html>
    `;
  };

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      const { uri } = await Print.printToFileAsync({
        html: generateHTML(),
        base64: false
      });
      setIsLoading(false);
      
      const fileInfo = await FileSystem.getInfoAsync(uri);
      if (fileInfo.exists) {
        await Sharing.shareAsync(uri, {
          mimeType: 'application/pdf',
          dialogTitle: 'Share Prescription PDF',
          UTI: 'com.adobe.pdf'
        });
      }
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Error', 'Failed to generate and share PDF.');
      console.error(error);
    }
  };

  const handleSign = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSigned(true);
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header onSkipPress={() => console.log("Skip")} 
        title="PDF Preview" 
        onBackPress={() => navigation.goBack()} 
        rightComponent={
          <TouchableOpacity onPress={handleDownload} style={styles.downloadBtn}>
            <Ionicons name="download-outline" size={20} color={COLORS.primary} />
          </TouchableOpacity>
        }
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Paper Sheet Representation */}
        <View style={styles.paper}>
          {/* Header */}
          <View style={styles.letterhead}>
            <View style={styles.clinicDetails}>
              <Text style={styles.clinicName}>SMART MEDICAL CENTER</Text>
              <Text style={styles.clinicSub}>100 Innovation Way, Tech Park, Suite 400</Text>
              <Text style={styles.clinicPhone}>Tel: +1 (555) 123-4567 • www.smart prescription.com</Text>
            </View>
            <View style={styles.spmLogo}>
              <Ionicons name="git-network" size={32} color={COLORS.primary} />
              <Text style={styles.spmLogoText}>SPM AI</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Practitioner Info */}
          <View style={styles.drDetailsRow}>
            <View>
              <Text style={styles.drName}>Dr. Anjali Desai, MD</Text>
              <Text style={styles.drSpecialty}>Consulting Cardiologist & Physician</Text>
              <Text style={styles.drLicense}>License No: LIC-2024-897315</Text>
            </View>
            <View style={styles.rxBadge}>
              <Text style={styles.rxBadgeText}>Rx</Text>
            </View>
          </View>

          <View style={styles.lightDivider} />

          {/* Patient Details Table */}
          <View style={styles.patientGrid}>
            <View style={styles.gridRow}>
              <View style={styles.gridCol}>
                <Text style={styles.gridLabel}>PATIENT NAME</Text>
                <Text style={styles.gridValue}>{patient.patientName}</Text>
              </View>
              <View style={styles.gridCol}>
                <Text style={styles.gridLabel}>DATE</Text>
                <Text style={styles.gridValue}>{patient.date}</Text>
              </View>
            </View>
            <View style={styles.gridRow}>
              <View style={styles.gridCol}>
                <Text style={styles.gridLabel}>AGE / GENDER</Text>
                <Text style={styles.gridValue}>{patient.age} Yrs / {patient.gender || 'Male'}</Text>
              </View>
              <View style={styles.gridCol}>
                <Text style={styles.gridLabel}>RECORD ID</Text>
                <Text style={styles.gridValue}>{patient.code}</Text>
              </View>
            </View>
          </View>

          <View style={styles.lightDivider} />

          {/* Diagnosis */}
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>DIAGNOSIS / CLINICAL IMPRESSION</Text>
            <Text style={styles.diagnosisText}>{patient.diagnosis}</Text>
          </View>

          <View style={styles.lightDivider} />

          {/* Medicines Table */}
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>MEDICATIONS PRESCRIBED</Text>
            
            {medicines.map((med, index) => (
              <View key={index} style={styles.medicineItem}>
                <View style={styles.medHeaderRow}>
                  <Text style={styles.medIndex}>{index + 1}.</Text>
                  <Text style={styles.medName}>{med.name} - {med.strength}</Text>
                  <Text style={styles.medDuration}>{med.duration}</Text>
                </View>
                <View style={styles.medDetailsRow}>
                  <View style={styles.medDetailChip}>
                    <Text style={styles.medChipText}>Dosage: {med.dosage}</Text>
                  </View>
                  <View style={styles.medDetailChip}>
                    <Text style={styles.medChipText}>{med.instructions}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.spacer} />

          {/* Footer Signature */}
          <View style={styles.pdfFooter}>
            <View style={styles.footerNoteContainer}>
              <Ionicons name="information-circle-outline" size={14} color={COLORS.textSecondary} />
              <Text style={styles.footerNote}>
                This prescription is digitally protected. QR validation key is embedded on patient dashboard.
              </Text>
            </View>
            
            <View style={styles.signatureCol}>
              {isSigned ? (
                <View style={styles.verifiedStampContainer}>
                  <View style={styles.stampBorder}>
                    <Ionicons name="checkmark-seal" size={24} color={COLORS.secondary} />
                    <Text style={styles.stampText}>DIGITALLY SIGNED</Text>
                    <Text style={styles.stampDate}>{patient.date}</Text>
                  </View>
                </View>
              ) : (
                <View style={styles.unsignedContainer}>
                  <Text style={styles.unsignedText}>Requires Signature</Text>
                  <View style={styles.unsignedLine} />
                </View>
              )}
              <Text style={styles.sigDrName}>Dr. Anjali Desai</Text>
              <Text style={styles.sigDrTitle}>Consultant Physician</Text>
            </View>
          </View>
        </View>

        {/* Outer Actions */}
        <View style={styles.actionsContainer}>
          {!isSigned && (
            <TouchableOpacity onPress={handleSign} style={[styles.actionBtn, styles.signBtn]} activeOpacity={0.8}>
              <Ionicons name="pencil" size={20} color="#FFFFFF" style={styles.btnIcon} />
              <Text style={styles.signBtnText}>Apply Cryptographic Signature</Text>
            </TouchableOpacity>
          )}

          <View style={styles.rowActions}>
            <TouchableOpacity onPress={handleDownload} style={[styles.actionBtn, styles.downloadBtnBig]} activeOpacity={0.8}>
              <Ionicons name="document-text-outline" size={20} color="#FFFFFF" style={styles.btnIcon} />
              <Text style={styles.actionBtnText}>Save PDF Document</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => Alert.alert('Share', 'Secure document shared link copied to clipboard.')} 
              style={[styles.actionBtn, styles.shareBtn]} 
              activeOpacity={0.8}
            >
              <Ionicons name="share-social-outline" size={20} color={COLORS.text} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {isLoading && <Loading visible={true} message={isSigned ? "Generating PDF File..." : "Signing Document..."} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E2E8F0', // Nice light slate background to make sheet stand out
  },
  downloadBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.dark,
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  paper: {
    backgroundColor: COLORS.dark,
    borderRadius: 16,
    padding: 24,
    minHeight: 650,
    ...SHADOWS.premium,
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  letterhead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  clinicDetails: {
    flex: 1,
    paddingRight: 10,
  },
  clinicName: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.dark,
    letterSpacing: 0.5,
  },
  clinicSub: {
    fontSize: 10,
    color: COLORS.textSecondary,
    marginTop: 4,
    fontWeight: '600',
  },
  clinicPhone: {
    fontSize: 9,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  spmLogo: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#BAE6FD',
  },
  spmLogoText: {
    fontSize: 10,
    fontWeight: '900',
    color: COLORS.primary,
    marginTop: 2,
  },
  divider: {
    height: 3,
    backgroundColor: COLORS.primary,
    marginVertical: 16,
    borderRadius: 2,
  },
  drDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  drName: {
    fontSize: SIZES.medium,
    fontWeight: '800',
    color: COLORS.text,
  },
  drSpecialty: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    fontWeight: '600',
    marginTop: 2,
  },
  drLicense: {
    fontSize: 10,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  rxBadge: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1.2,
    borderColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rxBadgeText: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.warning,
    fontStyle: 'italic',
  },
  lightDivider: {
    height: 1.2,
    marginVertical: 14,
  },
  patientGrid: {
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  gridCol: {
    flex: 1,
  },
  gridLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: COLORS.textSecondary,
    letterSpacing: 0.5,
  },
  gridValue: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.text,
    marginTop: 2,
  },
  section: {
    marginVertical: 4,
  },
  sectionHeading: {
    fontSize: 10,
    fontWeight: '900',
    color: COLORS.primary,
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  diagnosisText: {
    fontSize: SIZES.font,
    color: COLORS.text,
    lineHeight: 20,
    fontWeight: '600',
  },
  medicineItem: {
    marginBottom: 12,
  },
  medHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  medIndex: {
    fontSize: SIZES.font,
    fontWeight: '800',
    color: COLORS.textSecondary,
    width: 20,
  },
  medName: {
    fontSize: SIZES.font,
    fontWeight: '800',
    color: COLORS.text,
    flex: 1,
  },
  medDuration: {
    fontSize: SIZES.small,
    fontWeight: '700',
    color: COLORS.textSecondary,
  },
  medDetailsRow: {
    flexDirection: 'row',
    paddingLeft: 20,
    marginTop: 4,
  },
  medDetailChip: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginRight: 8,
  },
  medChipText: {
    fontSize: 10,
    color: COLORS.textSecondary,
    fontWeight: '700',
  },
  spacer: {
    flex: 1,
    minHeight: 40,
  },
  pdfFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 20,
  },
  footerNoteContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginRight: 16,
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  footerNote: {
    fontSize: 8,
    color: COLORS.textSecondary,
    lineHeight: 12,
    marginLeft: 4,
    flex: 1,
  },
  signatureCol: {
    alignItems: 'center',
    minWidth: 120,
  },
  verifiedStampContainer: {
    marginBottom: 4,
  },
  stampBorder: {
    borderWidth: 1.5,
    borderColor: COLORS.secondary,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'rgba(34, 197, 94, 0.05)',
    alignItems: 'center',
  },
  stampText: {
    fontSize: 7,
    fontWeight: '900',
    color: COLORS.secondary,
    letterSpacing: 0.5,
    marginTop: 2,
  },
  stampDate: {
    fontSize: 6,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  unsignedContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  unsignedText: {
    fontSize: 9,
    color: COLORS.danger,
    fontWeight: '700',
    fontStyle: 'italic',
  },
  unsignedLine: {
    width: 100,
    height: 1,
    backgroundColor: COLORS.border,
    marginTop: 4,
  },
  sigDrName: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.text,
  },
  sigDrTitle: {
    fontSize: 8,
    color: COLORS.textSecondary,
    marginTop: 1,
  },
  actionsContainer: {
    marginTop: 20,
  },
  actionBtn: {
    height: 52,
    borderRadius: BORDER_RADIUS.button,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    ...SHADOWS.soft,
  },
  signBtn: {
    backgroundColor: COLORS.secondary,
    marginBottom: 12,
  },
  signBtnText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  rowActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  downloadBtnBig: {
    backgroundColor: COLORS.primary,
    flex: 1,
    marginRight: 12,
  },
  actionBtnText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  shareBtn: {
    backgroundColor: COLORS.dark,
    width: 52,
    borderWidth: 1.2,
    borderColor: '#CBD5E1',
  },
  btnIcon: {
    marginRight: 8,
  },
});

export default GeneratePDF;
