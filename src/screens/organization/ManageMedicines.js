import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, TextInput, Alert, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../../components/Header';
import { COLORS, SIZES, BORDER_RADIUS, SHADOWS } from '../../styles/theme';

const ManageMedicines = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMed, setSelectedMed] = useState(null);
  const [refillQty, setRefillQty] = useState('');
  const [refillModalVisible, setRefillModalVisible] = useState(false);

  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    // TODO: Replace with original API integration
    // fetch('https://your-api.com/organization/medicines')
    //   .then(res => res.json())
    //   .then(data => setMedicines(data))
    //   .catch(err => console.error('API Error:', err));
  }, []);

  const filteredMeds = medicines.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRefillSubmit = () => {
    const qty = parseInt(refillQty, 10);
    if (isNaN(qty) || qty <= 0) {
      Alert.alert('Invalid Quantity', 'Please enter a valid positive number for stock refill.');
      return;
    }

    setMedicines(prev => prev.map(m => {
      if (m.id === selectedMed.id) {
        return { ...m, stock: m.stock + qty };
      }
      return m;
    }));

    Alert.alert('Refill Completed', `Successfully added ${qty} units to ${selectedMed.name} stock level.`);
    setRefillModalVisible(false);
    setSelectedMed(null);
    setRefillQty('');
  };

  const getStockStatus = (stock, threshold) => {
    if (stock <= threshold * 0.5) {
      return { label: 'CRITICAL', color: COLORS.danger, bg: 'rgba(239, 68, 68, 0.08)' };
    }
    if (stock <= threshold) {
      return { label: 'LOW STOCK', color: COLORS.warning, bg: 'rgba(245, 158, 11, 0.08)' };
    }
    return { label: 'IN STOCK', color: COLORS.secondary, bg: 'rgba(16, 185, 129, 0.08)' };
  };

  const renderItem = ({ item }) => {
    const status = getStockStatus(item.stock, item.threshold);
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.infoCol}>
            <Text style={styles.medName}>{item.name}</Text>
            <Text style={styles.medCat}>{item.category} • Price: {item.price}</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: status.bg }]}>
            <Text style={[styles.badgeText, { color: status.color }]}>{status.label}</Text>
          </View>
        </View>

        <View style={styles.cardBody}>
          <View style={styles.stockCol}>
            <Text style={styles.stockLabel}>CURRENT STOCK LEVEL</Text>
            <Text style={[styles.stockValue, item.stock <= item.threshold && { color: COLORS.warning }]}>
              {item.stock} <Text style={styles.unitText}>{item.unit}</Text>
            </Text>
          </View>
          <TouchableOpacity 
            onPress={() => {
              setSelectedMed(item);
              setRefillModalVisible(true);
            }}
            style={styles.refillBtn}
            activeOpacity={0.8}
          >
            <Ionicons name="add" size={16} color={COLORS.primary} />
            <Text style={styles.refillText}>Refill Stock</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header onSkipPress={() => console.log("Skip")} title="Pharmacy Stock Room" onBackPress={() => navigation.goBack()} />

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color={COLORS.textSecondary} style={styles.searchIcon} />
          <TextInput
            placeholder="Search medicine inventory..."
            placeholderTextColor="#E5E7EB"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
          />
        </View>
      </View>

      {filteredMeds.length > 0 ? (
        <FlatList
          data={filteredMeds}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="flask-outline" size={64} color={COLORS.textSecondary} />
          <Text style={styles.emptyTitle}>Item Not Found</Text>
          <Text style={styles.emptySubtitle}>No pharmacy products exist matching this search term.</Text>
        </View>
      )}

      {/* Stock Refill Modal */}
      <Modal
        visible={refillModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setRefillModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalTopRow}>
              <Text style={styles.modalHeading}>Stock Dispatch Refill</Text>
              <TouchableOpacity onPress={() => setRefillModalVisible(false)} style={styles.modalCloseBtn}>
                <Ionicons name="close" size={22} color={COLORS.text} />
              </TouchableOpacity>
            </View>

            {selectedMed && (
              <View style={styles.modalBody}>
                <Text style={styles.refillMedName}>{selectedMed.name}</Text>
                <Text style={styles.refillMedCat}>{selectedMed.category} • Category</Text>

                <View style={styles.refillCurrentCard}>
                  <Text style={styles.currentLabel}>CURRENT LEVEL</Text>
                  <Text style={styles.currentVal}>{selectedMed.stock} {selectedMed.unit}</Text>
                </View>

                <Text style={styles.inputHeading}>Enter Dispatch Quantity</Text>
                <TextInput
                  placeholder="e.g. 500"
                  placeholderTextColor="#E5E7EB"
                  keyboardType="numeric"
                  value={refillQty}
                  onChangeText={setRefillQty}
                  style={styles.modalInput}
                />

                <TouchableOpacity style={styles.submitRefillBtn} activeOpacity={0.8} onPress={handleRefillSubmit}>
                  <Text style={styles.submitRefillText}>Confirm Inward Dispatch</Text>
                </TouchableOpacity>
              </View>
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
    marginBottom: 16,
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
  infoCol: {
    flex: 1,
    paddingRight: 10,
  },
  medName: {
    fontSize: SIZES.font + 1,
    fontWeight: '800',
    color: COLORS.text,
  },
  medCat: {
    fontSize: 10,
    color: COLORS.textSecondary,
    fontWeight: '600',
    marginTop: 4,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '900',
  },
  cardBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stockCol: {
    flex: 1,
  },
  stockLabel: {
    fontSize: 8,
    fontWeight: '800',
    color: COLORS.textSecondary,
    letterSpacing: 0.5,
  },
  stockValue: {
    fontSize: SIZES.large - 2,
    fontWeight: '900',
    color: COLORS.secondary,
    marginTop: 4,
  },
  unitText: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    fontWeight: '700',
  },
  refillBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.2,
    borderColor: '#BAE6FD',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    ...SHADOWS.soft,
  },
  refillText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.primary,
    marginLeft: 4,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    marginTop: 60,
  },
  emptyTitle: {
    fontSize: SIZES.large,
    fontWeight: '800',
    color: COLORS.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: SIZES.font,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  modalCard: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.card,
    padding: 24,
    width: '100%',
    ...SHADOWS.premium,
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
  },
  modalTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
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
  refillMedName: {
    fontSize: SIZES.medium,
    fontWeight: '800',
    color: COLORS.text,
  },
  refillMedCat: {
    fontSize: 11,
    color: COLORS.textSecondary,
    fontWeight: '600',
    marginTop: 2,
  },
  refillCurrentCard: {
    borderRadius: 12,
    padding: 14,
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    marginVertical: 16,
    alignItems: 'center',
  },
  currentLabel: {
    fontSize: 8,
    fontWeight: '800',
    color: COLORS.textSecondary,
    letterSpacing: 0.5,
  },
  currentVal: {
    fontSize: SIZES.medium,
    fontWeight: '800',
    color: COLORS.text,
    marginTop: 4,
  },
  inputHeading: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 8,
  },
  modalInput: {
    height: 56,
    backgroundColor: 'rgba(15,23,42,0.20)',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 18,
    fontSize: SIZES.font,
    color: '#FFFFFF',
    fontWeight: '500',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  submitRefillBtn: {
    backgroundColor: COLORS.secondary,
    height: 52,
    borderRadius: BORDER_RADIUS.button,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.soft,
  },
  submitRefillText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});

export default ManageMedicines;
