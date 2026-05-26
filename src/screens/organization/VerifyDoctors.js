import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Alert, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../../components/Header';
import { COLORS, SIZES, BORDER_RADIUS, SHADOWS } from '../../styles/theme';

const VerifyDoctors = ({ navigation }) => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    // TODO: Replace with original API integration
    // fetch('https://your-api.com/organization/verify-doctors')
    //   .then(res => res.json())
    //   .then(data => setQueue(data))
    //   .catch(err => console.error('API Error:', err));
  }, []);

  const handleAction = (id, doctorName, action) => {
    Alert.alert(
      action === 'approve' ? 'Approve Practitioner' : 'Decline Registration',
      `Are you sure you want to ${action} ${doctorName} into the official facility network?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: action === 'approve' ? 'Approve' : 'Decline',
          style: action === 'approve' ? 'default' : 'destructive',
          onPress: () => {
            setQueue(prev => prev.filter(dr => dr.id !== id));
            setSelectedDoctor(null);
            Alert.alert('System Registry Synced', `${doctorName} has been successfully ${action === 'approve' ? 'approved' : 'rejected'}.`);
          }
        }
      ]
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      activeOpacity={0.7}
      onPress={() => setSelectedDoctor(item)}
    >
      <View style={styles.cardHeader}>
        <View style={styles.drRow}>
          <LinearGradient colors={[COLORS.primary, COLORS.secondary]} style={styles.drAvatar}>
            <Text style={styles.drAvatarText}>{item.name.split(' ')[1][0]}</Text>
          </LinearGradient>
          <View style={styles.drDetails}>
            <Text style={styles.drName}>{item.name}</Text>
            <Text style={styles.drSpecialty}>{item.specialty} • {item.license}</Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={18} color={COLORS.textSecondary} />
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.cardReqDate}>Requested on: {item.dateRequested}</Text>
        <View style={styles.docsBadge}>
          <Ionicons name="attach" size={14} color={COLORS.primary} />
          <Text style={styles.docsBadgeText}>{item.docs.length} Attachments</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header onSkipPress={() => console.log("Skip")} title="Practitioner Verification" onBackPress={() => navigation.goBack()} />

      {queue.length > 0 ? (
        <FlatList
          data={queue}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconCircle}>
            <Ionicons name="shield-checkmark" size={44} color={COLORS.secondary} />
          </View>
          <Text style={styles.emptyTitle}>Queue Fully Audited</Text>
          <Text style={styles.emptySubtitle}>All registered practitioners are fully checked and verified.</Text>
        </View>
      )}

      {/* Review Doctor Credentials Modal */}
      <Modal
        visible={selectedDoctor !== null}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setSelectedDoctor(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalTopRow}>
              <Text style={styles.modalHeading}>Credentials Review</Text>
              <TouchableOpacity onPress={() => setSelectedDoctor(null)} style={styles.modalCloseBtn}>
                <Ionicons name="close" size={22} color={COLORS.text} />
              </TouchableOpacity>
            </View>

            {selectedDoctor && (
              <ScrollView showsVerticalScrollIndicator={false} style={styles.modalScroll}>
                <View style={styles.modalDrHeader}>
                  <LinearGradient colors={[COLORS.primary, COLORS.secondary]} style={styles.modalDrAvatar}>
                    <Text style={styles.modalDrAvatarText}>{selectedDoctor.name.split(' ')[1][0]}</Text>
                  </LinearGradient>
                  <Text style={styles.modalDrName}>{selectedDoctor.name}</Text>
                  <Text style={styles.modalDrSpecialty}>{selectedDoctor.specialty}</Text>
                </View>

                <View style={styles.credList}>
                  <View style={styles.credRow}>
                    <Text style={styles.credLabel}>MEDICAL LICENSE NUMBER</Text>
                    <Text style={styles.credVal}>{selectedDoctor.license}</Text>
                  </View>
                  <View style={styles.credDivider} />
                  <View style={styles.credRow}>
                    <Text style={styles.credLabel}>QUALIFICATIONS & SCHOOLS</Text>
                    <Text style={styles.credVal}>{selectedDoctor.education}</Text>
                  </View>
                  <View style={styles.credDivider} />
                  <View style={styles.credRow}>
                    <Text style={styles.credLabel}>OFFICIAL CONTACT EMAIL</Text>
                    <Text style={styles.credVal}>{selectedDoctor.email}</Text>
                  </View>
                </View>

                {/* Attached Files List */}
                <Text style={styles.subTitle}>Accreditation Attachments</Text>
                {selectedDoctor.docs.map((doc, idx) => (
                  <View key={idx} style={styles.docItem}>
                    <Ionicons name="document-text-outline" size={20} color={COLORS.primary} />
                    <Text style={styles.docName} numberOfLines={1}>{doc}</Text>
                    <TouchableOpacity onPress={() => Alert.alert('File View', `Displaying credentials sheet: ${doc}`)}>
                      <Text style={styles.viewDocText}>View</Text>
                    </TouchableOpacity>
                  </View>
                ))}

                {/* Decisional Actions */}
                <View style={styles.actionRow}>
                  <TouchableOpacity 
                    onPress={() => handleAction(selectedDoctor.id, selectedDoctor.name, 'decline')} 
                    style={[styles.modalBtn, styles.declineBtn]}
                  >
                    <Text style={styles.declineText}>Decline Registry</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    onPress={() => handleAction(selectedDoctor.id, selectedDoctor.name, 'approve')} 
                    style={[styles.modalBtn, styles.approveBtn]}
                  >
                    <Text style={styles.approveText}>Approve Credentials</Text>
                  </TouchableOpacity>
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
  listContent: {
    padding: 24,
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
    alignItems: 'center',
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
  cardBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardReqDate: {
    fontSize: 11,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  docsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  docsBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.primary,
    marginLeft: 4,
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
    maxHeight: '90%',
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
    marginBottom: 10,
  },
  modalDrHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  modalDrAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  modalDrAvatarText: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  modalDrName: {
    fontSize: SIZES.large - 2,
    fontWeight: '900',
    color: COLORS.text,
  },
  modalDrSpecialty: {
    fontSize: SIZES.font,
    color: COLORS.textSecondary,
    fontWeight: '600',
    marginTop: 4,
  },
  credList: {
    borderRadius: 14,
    padding: 16,
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    marginBottom: 20,
  },
  credRow: {
    marginVertical: 4,
  },
  credLabel: {
    fontSize: 8,
    fontWeight: '800',
    color: COLORS.textSecondary,
    letterSpacing: 0.5,
  },
  credVal: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.text,
    marginTop: 4,
    lineHeight: 18,
  },
  credDivider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 10,
  },
  subTitle: {
    fontSize: SIZES.medium,
    fontWeight: '900',
    color: COLORS.text,
    marginBottom: 12,
  },
  docItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 10,
    borderWidth: 1.2,
    borderColor: '#F1F5F9',
    padding: 12,
    marginBottom: 10,
  },
  docName: {
    fontSize: 12,
    color: COLORS.text,
    fontWeight: '700',
    marginLeft: 8,
    flex: 1,
  },
  viewDocText: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.primary,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 10,
  },
  modalBtn: {
    height: 52,
    borderRadius: BORDER_RADIUS.button,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    ...SHADOWS.soft,
  },
  declineBtn: {
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
    borderWidth: 1.2,
    borderColor: 'rgba(239, 68, 68, 0.15)',
    marginRight: 12,
  },
  declineText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.danger,
  },
  approveBtn: {
    backgroundColor: COLORS.secondary,
  },
  approveText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    marginTop: 80,
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

export default VerifyDoctors;
