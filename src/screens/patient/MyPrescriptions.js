import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, TextInput, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../../components/Header';
import { COLORS, SIZES, BORDER_RADIUS, SHADOWS } from '../../styles/theme';

const MyPrescriptions = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  const filters = ['All', 'Active', 'Completed'];

  const prescriptions = [
    {
      id: '1',
      drName: 'Dr. Sarah Wilson',
      specialty: 'Cardiologist',
      date: 'May 22, 2026',
      clinic: 'Smart Medical Center',
      status: 'Active',
      code: 'SPM-9821-LH',
      diagnosis: 'Hypertension Checkup',
      medicines: [
        { name: 'Telmisartan Tablets', strength: '40 mg', dosage: '1-0-0', instructions: 'Before breakfast', duration: '30 Days' },
        { name: 'Amlodipine Besylate', strength: '5 mg', dosage: '0-0-1', instructions: 'At bedtime', duration: '30 Days' },
      ],
    },
    {
      id: '2',
      drName: 'Dr. James Smith',
      specialty: 'Dermatologist',
      date: 'Apr 10, 2026',
      clinic: 'Skin & Allergy Care',
      status: 'Completed',
      code: 'SPM-3081-BR',
      diagnosis: 'Eczema Flare-up',
      medicines: [
        { name: 'Hydrocortisone Cream', strength: '1%', dosage: 'Apply twice daily', instructions: 'External use', duration: '7 Days' },
      ],
    },
  ];

  const filteredPrescriptions = prescriptions.filter(item => {
    const matchesSearch = item.drName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.diagnosis.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'All' || item.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      activeOpacity={0.7}
      onPress={() => setSelectedPrescription(item)}
    >
      <View style={styles.cardHeader}>
        <View style={styles.drRow}>
          <LinearGradient colors={[COLORS.primary, COLORS.secondary]} style={styles.drAvatar}>
            <Text style={styles.drAvatarText}>{item.drName.split(' ')[1][0]}</Text>
          </LinearGradient>
          <View style={styles.drDetails}>
            <Text style={styles.drName}>{item.drName}</Text>
            <Text style={styles.drSpecialty}>{item.specialty} • {item.clinic}</Text>
          </View>
        </View>
        <View style={[
          styles.badge, 
          { backgroundColor: item.status === 'Active' ? 'rgba(16, 185, 129, 0.08)' : 'rgba(100, 116, 139, 0.08)' }
        ]}>
          <Text style={[
            styles.badgeText, 
            { color: item.status === 'Active' ? COLORS.secondary : COLORS.textSecondary }
          ]}>
            {item.status}
          </Text>
        </View>
      </View>

      <View style={styles.cardBody}>
        <View style={styles.diagRow}>
          <Text style={styles.diagLabel}>DIAGNOSIS</Text>
          <Text style={styles.diagValue}>{item.diagnosis}</Text>
        </View>
        <View style={styles.medCountRow}>
          <Ionicons name="medical-outline" size={16} color={COLORS.primary} />
          <Text style={styles.medCountText}>{item.medicines.length} Medicines Prescribed</Text>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <Text style={styles.footerDate}>Issued on {item.date}</Text>
        <View style={styles.footerAction}>
          <Text style={styles.footerActionText}>View Details</Text>
          <Ionicons name="chevron-forward" size={14} color={COLORS.primary} />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header onSkipPress={() => console.log("Skip")} title="My Prescriptions" onBackPress={() => navigation.goBack()} />

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color={COLORS.textSecondary} style={styles.searchIcon} />
          <TextInput
            placeholder="Search prescriptions, doctors, code..."
            placeholderTextColor="#E5E7EB"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
          />
        </View>
      </View>

      {/* Filter Chips */}
      <View style={styles.filterContainer}>
        <FlatList
          data={filters}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.filterList}
          renderItem={({ item }) => {
            const isActive = selectedFilter === item;
            return (
              <TouchableOpacity
                onPress={() => setSelectedFilter(item)}
                style={[styles.filterChip, isActive && styles.filterChipActive]}
              >
                <Text style={[styles.filterText, isActive && styles.filterTextActive]}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {filteredPrescriptions.length > 0 ? (
        <FlatList
          data={filteredPrescriptions}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconCircle}>
            <Ionicons name="receipt-outline" size={44} color={COLORS.textSecondary} />
          </View>
          <Text style={styles.emptyTitle}>No Prescriptions Found</Text>
          <Text style={styles.emptySubtitle}>You don't have any prescriptions registered matching this search query.</Text>
        </View>
      )}

      {/* Detailed Prescription Modal */}
      <Modal
        visible={selectedPrescription !== null}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setSelectedPrescription(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalTopRow}>
              <Text style={styles.modalHeading}>Prescription Details</Text>
              <TouchableOpacity onPress={() => setSelectedPrescription(null)} style={styles.modalCloseBtn}>
                <Ionicons name="close" size={22} color={COLORS.text} />
              </TouchableOpacity>
            </View>

            {selectedPrescription && (
              <ScrollView showsVerticalScrollIndicator={false} style={styles.modalScroll}>
                <View style={styles.modalDrCard}>
                  <View style={styles.drRow}>
                    <LinearGradient colors={[COLORS.primary, COLORS.secondary]} style={styles.drAvatar}>
                      <Text style={styles.drAvatarText}>{selectedPrescription.drName.split(' ')[1][0]}</Text>
                    </LinearGradient>
                    <View style={styles.drDetails}>
                      <Text style={styles.modalDrName}>{selectedPrescription.drName}</Text>
                      <Text style={styles.modalDrSpecialty}>{selectedPrescription.specialty}</Text>
                      <Text style={styles.modalDrClinic}>{selectedPrescription.clinic}</Text>
                    </View>
                  </View>
                  <View style={styles.modalCodeCard}>
                    <Text style={styles.modalCodeLbl}>SECURE HASH CODE</Text>
                    <Text style={styles.modalCodeVal}>{selectedPrescription.code}</Text>
                  </View>
                </View>

                <Text style={styles.sectionTitle}>Diagnosis</Text>
                <View style={styles.diagnosisBox}>
                  <Text style={styles.diagnosisVal}>{selectedPrescription.diagnosis}</Text>
                </View>

                <Text style={styles.sectionTitle}>Prescribed Meds</Text>
                {selectedPrescription.medicines.map((med, index) => (
                  <View key={index} style={styles.medBox}>
                    <View style={styles.medHeader}>
                      <Text style={styles.medNameText}>{index + 1}. {med.name}</Text>
                      <Text style={styles.medStrengthText}>{med.strength}</Text>
                    </View>
                    <View style={styles.medDetailsRow}>
                      <View style={styles.medChip}>
                        <Text style={styles.medChipText}>Dosage: {med.dosage}</Text>
                      </View>
                      <View style={styles.medChip}>
                        <Text style={styles.medChipText}>{med.instructions}</Text>
                      </View>
                      <View style={styles.medChip}>
                        <Text style={styles.medChipText}>{med.duration}</Text>
                      </View>
                    </View>
                  </View>
                ))}

                <View style={styles.modalFooterAlert}>
                  <Ionicons name="shield-checkmark" size={18} color={COLORS.secondary} />
                  <Text style={styles.modalFooterAlertText}>
                    This record is digitally signed. Verified at clinical registry SPM.
                  </Text>
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  searchContainer: {
    paddingHorizontal: 24,
    marginTop: 8,
    marginBottom: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15,23,42,0.20)',
    borderRadius: 20,
    paddingHorizontal: 18,
    height: 56,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.25)',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: SIZES.font,
    color: '#FFFFFF',
    fontWeight: '500',
    height: '100%',
  },
  filterContainer: {
    marginBottom: 16,
  },
  filterList: {
    paddingHorizontal: 24,
  },
  filterChip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: BORDER_RADIUS.pill,
    backgroundColor: COLORS.card,
    borderWidth: 1.2,
    borderColor: COLORS.border,
    marginRight: 10,
    ...SHADOWS.soft,
  },
  filterChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textSecondary,
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.card,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1.2,
    borderColor: '#F1F5F9',
    ...SHADOWS.soft,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottomWidth: 1.2,
    borderBottomColor: '#F8FAFC',
    paddingBottom: 12,
    marginBottom: 12,
  },
  drRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  drAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  drAvatarText: {
    fontSize: 15,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  drDetails: {
    flex: 1,
  },
  drName: {
    fontSize: SIZES.font + 1,
    fontWeight: '800',
    color: COLORS.text,
  },
  drSpecialty: {
    fontSize: 10,
    color: COLORS.textSecondary,
    marginTop: 2,
    fontWeight: '600',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
  },
  cardBody: {
    marginBottom: 14,
  },
  diagRow: {
    marginBottom: 10,
  },
  diagLabel: {
    fontSize: 8,
    fontWeight: '800',
    color: COLORS.textSecondary,
    letterSpacing: 0.5,
  },
  diagValue: {
    fontSize: SIZES.font,
    color: COLORS.text,
    fontWeight: '700',
    marginTop: 2,
  },
  medCountRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  medCountText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginLeft: 6,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1.2,
    borderTopColor: '#F8FAFC',
  },
  footerDate: {
    fontSize: 11,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  footerAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerActionText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.primary,
    marginRight: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: COLORS.card,
    borderTopLeftRadius: BORDER_RADIUS.card,
    borderTopRightRadius: BORDER_RADIUS.card,
    padding: 24,
    maxHeight: '85%',
    ...SHADOWS.premium,
  },
  modalTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalHeading: {
    fontSize: SIZES.large - 2,
    fontWeight: '900',
    color: COLORS.text,
  },
  modalCloseBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
  },
  modalScroll: {
    marginBottom: 20,
  },
  modalDrCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    marginBottom: 20,
  },
  modalDrName: {
    fontSize: SIZES.medium,
    fontWeight: '800',
    color: COLORS.text,
  },
  modalDrSpecialty: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
    fontWeight: '600',
  },
  modalDrClinic: {
    fontSize: 10,
    color: COLORS.textSecondary,
    marginTop: 1,
  },
  modalCodeCard: {
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  modalCodeLbl: {
    fontSize: 8,
    fontWeight: '800',
    color: COLORS.textSecondary,
    letterSpacing: 0.5,
  },
  modalCodeVal: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.primary,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: SIZES.medium,
    fontWeight: '900',
    color: COLORS.text,
    marginBottom: 10,
  },
  diagnosisBox: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    borderWidth: 1.2,
    borderColor: '#F1F5F9',
    padding: 14,
    marginBottom: 20,
  },
  diagnosisVal: {
    fontSize: SIZES.font,
    color: COLORS.text,
    fontWeight: '700',
  },
  medBox: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    borderWidth: 1.2,
    borderColor: '#F1F5F9',
    padding: 14,
    marginBottom: 12,
  },
  medHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  medNameText: {
    fontSize: SIZES.font,
    fontWeight: '800',
    color: COLORS.text,
  },
  medStrengthText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textSecondary,
  },
  medDetailsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  medChip: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginRight: 6,
    marginBottom: 4,
  },
  medChipText: {
    fontSize: 10,
    color: COLORS.textSecondary,
    fontWeight: '700',
  },
  modalFooterAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1.2,
    borderColor: 'rgba(16, 185, 129, 0.15)',
    marginTop: 10,
  },
  modalFooterAlertText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.secondary,
    marginLeft: 8,
    flex: 1,
    lineHeight: 16,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    marginTop: 50,
  },
  emptyIconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: SIZES.large,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: SIZES.font,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default MyPrescriptions;
