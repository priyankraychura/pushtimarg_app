import Header from '@/components/Header';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchPrasangContent, fetchVartaList } from '@/redux/slices/vartaSlice';
import { useNavigation } from '@react-navigation/native';
import { ChevronRight, Feather } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  FlatList,
  InteractionManager,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

interface VartaDetailScreenProps {
  theme: any;
  vaishnav: any; 
}

const VartaDetailScreen = ({ theme, vaishnav: initialVaishnav }: VartaDetailScreenProps) => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();

  const [refreshing, setRefreshing] = useState(false);

  // --- SAFE GROUP EXTRACTION ---
  // If 'group' is missing from props, extract it from ID (e.g., "v84_1" -> "84")
  const safeGroup = initialVaishnav.group || (initialVaishnav.id.startsWith('v84') ? '84' : '252');

  // 1. SELECT LATEST DATA FROM REDUX
  const { list84, list252 } = useAppSelector(state => state.varta);
  
  const currentVaishnav = 
      (safeGroup === '84' 
          ? list84.find(v => v.id === initialVaishnav.id) 
          : list252.find(v => v.id === initialVaishnav.id)) 
      || initialVaishnav;

  console.log("Current Vaishnav:", initialVaishnav)
  // 2. REFRESH HANDLER
  const onRefresh = async () => {
      setRefreshing(true);
      try {
          // Use 'safeGroup' here instead of 'initialVaishnav.group'
          await dispatch(fetchVartaList(safeGroup)).unwrap();
      } catch (e) {
          console.error("Detail refresh failed", e);
      } finally {
          setRefreshing(false);
      }
  };

  const handleOpenPrasang = (prasang: any, index: number) => {
    navigation.navigate('VartaRead', {
      prasangDetail: {
        ...prasang,
        vaishnavName: currentVaishnav.name, 
        prasangIndex: index,
        totalPrasangs: currentVaishnav.prasangs ? currentVaishnav.prasangs.length : 0
      }
    });

    InteractionManager.runAfterInteractions(() => {
        if (prasang.file) {
            dispatch(fetchPrasangContent(prasang.file));
        }
    });
  };

  const ProfileHeader = () => (
    <View style={{ marginBottom: 16 }}>
        <View style={[styles.profileCard, { backgroundColor: theme.card, shadowColor: theme.shadow }]}>
          <View style={[styles.profileIcon, { backgroundColor: theme.devotionalPrimary }]}>
            <Feather color="#FFF" size={32} />
          </View>
          <Text style={[styles.profileName, { color: theme.text }]}>{currentVaishnav.name}</Text>
          <Text style={[styles.profileGroup, { color: theme.devotionalSecondary }]}>
            {safeGroup === '84' ? 'Chaurasi' : 'Baso Bavan'} Vaishnav Varta
          </Text>
          <Text style={[styles.profileBio, { color: theme.subText }]}>
            {currentVaishnav.bio}
          </Text>

          <View style={[styles.statRow, { borderColor: theme.border }]}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: theme.text }]}>
                 {currentVaishnav.prasangs ? currentVaishnav.prasangs.length : 0}
              </Text>
              <Text style={[styles.statLabel, { color: theme.subText }]}>Prasangs</Text>
            </View>
            <View style={[styles.verticalDivider, { backgroundColor: theme.border }]} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: theme.text }]}>#{currentVaishnav.index}</Text>
              <Text style={[styles.statLabel, { color: theme.subText }]}>Index</Text>
            </View>
          </View>
        </View>

        <Text style={[styles.sectionHeader, { color: theme.subText }]}>PRASANGS (INCIDENTS)</Text>
    </View>
  );

  return (
    <View style={[styles.screen, { backgroundColor: theme.bg }]}>
      <Header
        title="Vaishnav Charitra"
        onBack={() => navigation.goBack()}
        theme={theme}
      />

      <FlatList
        data={currentVaishnav.prasangs || []}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        
        ListHeaderComponent={ProfileHeader}

        refreshControl={
            <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={theme.devotionalPrimary}
                colors={[theme.devotionalPrimary]}
            />
        }
        
        renderItem={({ item, index }) => (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => handleOpenPrasang(item, index)}
              style={[
                styles.prasangCard,
                { backgroundColor: theme.card, borderColor: theme.border }
              ]}
            >
              <View style={[styles.prasangNumberBox, { backgroundColor: theme.inputBg }]}>
                <Text style={[styles.prasangNumber, { color: theme.devotionalPrimary }]}>{index + 1}</Text>
              </View>

              <View style={styles.prasangContent}>
                <Text style={[styles.prasangTitle, { color: theme.text }]}>{item.title}</Text>
                <Text style={[styles.prasangPreview, { color: theme.subText }]} numberOfLines={1}>
                  Tap to read full prasang...
                </Text>
              </View>

              <ChevronRight color={theme.subText} size={20} />
            </TouchableOpacity>
        )}
        ListFooterComponent={<View style={{ height: 40 }} />}
      />
    </View>
  );
};

// ... Styles remain exactly the same as before ...
const styles = StyleSheet.create({
  screen: { flex: 1 },
  listContent: { paddingHorizontal: 24, paddingTop: 20, paddingBottom: 100 },
  profileCard: {
    borderRadius: 32,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 8,
    marginBottom: 32,
  },
  profileIcon: {
    width: 80, height: 80, borderRadius: 40,
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.2, shadowRadius: 12, elevation: 5
  },
  profileName: { fontSize: 22, fontWeight: '800', textAlign: 'center', marginBottom: 4 },
  profileGroup: { fontSize: 14, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 },
  profileBio: { fontSize: 15, textAlign: 'center', lineHeight: 22, marginBottom: 24, paddingHorizontal: 10 },
  statRow: {
    flexDirection: 'row', width: '100%', borderTopWidth: 1, paddingTop: 20, justifyContent: 'space-evenly',
  },
  statItem: { alignItems: 'center' },
  statValue: { fontSize: 18, fontWeight: '800' },
  statLabel: { fontSize: 12, fontWeight: '500' },
  verticalDivider: { width: 1, height: '100%' },
  sectionHeader: { fontSize: 13, fontWeight: '700', letterSpacing: 1, marginBottom: 16, marginLeft: 8 },
  prasangCard: {
    flexDirection: 'row', alignItems: 'center',
    padding: 16, borderRadius: 20, borderWidth: 1, marginBottom: 12, 
  },
  prasangNumberBox: {
    width: 44, height: 44, borderRadius: 14,
    justifyContent: 'center', alignItems: 'center', marginRight: 16,
  },
  prasangNumber: { fontSize: 18, fontWeight: '800' },
  prasangContent: { flex: 1 },
  prasangTitle: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
  prasangPreview: { fontSize: 13 },
});

export default VartaDetailScreen;