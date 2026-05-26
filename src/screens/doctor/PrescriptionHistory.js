import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';
import { COLORS, SIZES, BORDER_RADIUS, SHADOWS } from '../../styles/theme';
import { api } from '../../utils/api';

const PrescriptionHistory = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [prescriptions, setPrescriptions] = useState([]);

  const filters = ['All', 'Generated', 'Signed'];

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.doctor.getHistory();
        if (res.success) {
          const list = res.data.map(item => ({
            id: item.id.toString(),
            patientName: item.patientName,
            age: item.patientAge.toString(),
            date: new Date(item.createdAt).toLocaleDateString(),
            diagnosis: item.diagnosis,
            status: item.isSigned ? 'Signed' : 'Generated',
            code: `SPM-${item.id}-${item.patientName.slice(0, 2).toUpperCase()}`,
            pdfUrl: item.pdfPath
          }));
          setPrescriptions(list);
        }
      } catch (error) {
        console.error('History Fetch Error:', error);
      }
    };
    fetchHistory();
  }, []);

  const filteredPrescriptions = prescriptions.filter(item => {
    const matchesSearch = item.patientName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.diagnosis.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'All' || item.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Generated':
        return { bg: 'rgba(34, 197, 94, 0.08)', text: COLORS.success };
      case 'Signed':
        return { bg: 'rgba(14, 165, 233, 0.08)', text: COLORS.primary };
      case 'Pending':
      default:
        return { bg: 'rgba(245, 158, 11, 0.08)', text: COLORS.warning };
    }
  };

  const renderItem = ({ item }) => {
    const statusStyle = getStatusStyle(item.status);
    return (
      <TouchableOpacity 
        style={styles.card}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('GeneratePDF', { prescriptionId: item.id, patientData: item })}
      >
        <View style={styles.cardHeader}>
          <View>
            <Text style={styles.patientName}>{item.patientName}</Text>
            <Text style={styles.patientSub}>Age: {item.age} • {item.code}</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: statusStyle.bg }]}>
            <Text style={[styles.badgeText, { color: statusStyle.text }]}>{item.status}</Text>
          </View>
        </View>

        <View style={styles.cardBody}>
          <View style={styles.infoRow}>
            <Ionicons name="medical-outline" size={16} color={COLORS.textSecondary} />
            <Text style={styles.diagnosisText}>{item.diagnosis}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="calendar-outline" size={16} color={COLORS.textSecondary} />
            <Text style={styles.dateText}>{item.date}</Text>
          </View>
        </View>

        <View style={styles.cardFooter}>
          <Text style={styles.viewDetailsText}>View Digital Prescription</Text>
          <Ionicons name="chevron-forward" size={16} color={COLORS.primary} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header onSkipPress={() => console.log("Skip")} title="Prescription Logs" onBackPress={() => navigation.goBack()} />

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color={COLORS.textSecondary} style={styles.searchIcon} />
          <TextInput
            placeholder="Search patient, diagnosis, or code..."
            placeholderTextColor="#E5E7EB"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={18} color={COLORS.textSecondary} />
            </TouchableOpacity>
          ) : null}
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
                style={[
                  styles.filterChip,
                  isActive && styles.filterChipActive
                ]}
              >
                <Text style={[
                  styles.filterText,
                  isActive && styles.filterTextActive
                ]}>
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
            <Ionicons name="document-text-outline" size={48} color={COLORS.textSecondary} />
          </View>
          <Text style={styles.emptyTitle}>No Prescriptions Found</Text>
          <Text style={styles.emptySubtitle}>Try adjusting your search filters or create a new prescription.</Text>
        </View>
      )}
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
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: 12,
    marginBottom: 12,
  },
  patientName: {
    fontSize: SIZES.medium + 1,
    fontWeight: '800',
    color: COLORS.text,
  },
  patientSub: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
  },
  cardBody: {
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  diagnosisText: {
    fontSize: SIZES.font,
    color: COLORS.text,
    marginLeft: 8,
    fontWeight: '600',
  },
  dateText: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    marginLeft: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  viewDetailsText: {
    fontSize: SIZES.font,
    fontWeight: '700',
    color: COLORS.primary,
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

export default PrescriptionHistory;
