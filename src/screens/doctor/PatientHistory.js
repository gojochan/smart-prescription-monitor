import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';
import { COLORS, SIZES, BORDER_RADIUS, SHADOWS } from '../../styles/theme';
import { api } from '../../utils/api';

const PatientHistory = ({ navigation }) => {
  const [search, setSearch] = useState('');

  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await api.doctor.getPatientHistory(search, '');
        const items = res.data || [];
        // Group by patientName to aggregate diagnoses
        const grouped = {};
        items.forEach((item, index) => {
          const key = item.patientName;
          if (!grouped[key]) {
            grouped[key] = {
              id: item._id || index.toString(),
              name: item.patientName,
              gender: item.patientGender,
              age: item.patientAge + ' Yrs',
              visits: 'N/A',
              diagnoses: item.diagnosis ? [item.diagnosis] : [],
            };
          } else {
            if (item.diagnosis && !grouped[key].diagnoses.includes(item.diagnosis)) {
              grouped[key].diagnoses.push(item.diagnosis);
            }
          }
        });
        setPatients(Object.values(grouped));
      } catch (err) {
        console.error('PatientHistory API Error:', err);
      }
    };
    fetchPatients();
  }, [search]);

  const filteredPatients = patients.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderPatient = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => alert(`Opening comprehensive timeline for ${item.name}`)}
    >
      <View style={styles.cardHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {item.name.split(' ').map(n => n[0]).join('')}
          </Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.subInfo}>{item.gender} • {item.age} Years • {item.visits}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
      </View>

      <View style={styles.divider} />

      <View style={styles.diagnosesSection}>
        <Text style={styles.diagnosesLabel}>Diagnoses History:</Text>
        <View style={styles.chips}>
          {item.diagnoses.map((diag, i) => (
            <View key={i} style={styles.chip}>
              <Text style={styles.chipText}>{diag}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header onSkipPress={() => console.log("Skip")} title="Patient Medical timelines" onBackPress={() => navigation.goBack()} />
      <View style={styles.content}>
        {/* Premium search bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={COLORS.textSecondary} style={styles.searchIcon} />
          <TextInput
            placeholder="Search patient records database..."
            placeholderTextColor="#E5E7EB"
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
          />
        </View>

        <FlatList
          data={filteredPatients}
          keyExtractor={(item) => item.id}
          renderItem={renderPatient}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <Text style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', marginTop: 40 }}>
              No patient records found.
            </Text>
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15,23,42,0.20)',
    borderRadius: 20,
    paddingHorizontal: 18,
    height: 56,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.25)',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: SIZES.medium,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  listContent: {
    paddingBottom: 20,
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
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(14, 165, 233, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: SIZES.medium,
    fontWeight: '800',
    color: COLORS.primary,
  },
  info: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontSize: SIZES.medium,
    fontWeight: '800',
    color: COLORS.text,
  },
  subInfo: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  divider: {
    height: 1,
    marginVertical: 16,
  },
  diagnosesSection: {
    alignItems: 'flex-start',
  },
  diagnosesLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 6,
  },
  chipText: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.text,
  },
});

export default PatientHistory;
