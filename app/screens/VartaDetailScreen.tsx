import Header from '@/components/Header';
import { useNavigation } from '@react-navigation/native';
import { ChevronRight, Feather } from 'lucide-react-native';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface VartaDetailScreenProps {
  theme: any;
  vaishnav: any;
}

const VartaDetailScreen = ({
      theme, 
      vaishnav,
    }: VartaDetailScreenProps) => {
  const navigation = useNavigation<any>();

  // Updated Handler: Navigates to VartaRead instead of AartiDetail
  const handleOpenPrasang = (prasang: any, index: number) => {
    navigation.navigate('VartaRead', {
      prasangDetail: {
        prasang: prasang,
        vaishnavName: vaishnav.name,
        prasangIndex: index,
        totalPrasangs: vaishnav.prasangs.length
      }
    });
  };

  return (
    <View style={[styles.screen, { backgroundColor: theme.bg }]}>
      <Header 
        title="Vaishnav Charitra" 
        onBack={() => navigation.goBack()} 
        theme={theme}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* 1. Vaishnav Profile Header */}
        <View style={[styles.profileCard, { backgroundColor: theme.card, shadowColor: theme.shadow }]}>
          <View style={[styles.profileIcon, { backgroundColor: theme.devotionalPrimary }]}>
            <Feather color="#FFF" size={32} />
          </View>
          <Text style={[styles.profileName, { color: theme.text }]}>{vaishnav.name}</Text>
          <Text style={[styles.profileGroup, { color: theme.devotionalSecondary }]}>
            {vaishnav.group === '84' ? 'Chaurasi' : 'Doso Bavan'} Vaishnav Varta
          </Text>
          <Text style={[styles.profileBio, { color: theme.subText }]}>
            {vaishnav.bio}
          </Text>
          
          <View style={[styles.statRow, { borderColor: theme.border }]}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: theme.text }]}>{vaishnav.prasangs.length}</Text>
              <Text style={[styles.statLabel, { color: theme.subText }]}>Prasangs</Text>
            </View>
            <View style={[styles.verticalDivider, { backgroundColor: theme.border }]} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: theme.text }]}>#{vaishnav.index}</Text>
              <Text style={[styles.statLabel, { color: theme.subText }]}>Index</Text>
            </View>
          </View>
        </View>

        {/* 2. Prasang List */}
        <Text style={[styles.sectionHeader, { color: theme.subText }]}>PRASANGS (INCIDENTS)</Text>
        
        <View style={styles.prasangList}>
          {vaishnav.prasangs.map((prasang: any, index: number) => (
            <TouchableOpacity
              key={prasang.id}
              activeOpacity={0.7}
              onPress={() => handleOpenPrasang(prasang, index)}
              style={[
                styles.prasangCard, 
                { backgroundColor: theme.card, borderColor: theme.border }
              ]}
            >
              <View style={[styles.prasangNumberBox, { backgroundColor: theme.inputBg }]}>
                <Text style={[styles.prasangNumber, { color: theme.devotionalPrimary }]}>{index + 1}</Text>
              </View>
              
              <View style={styles.prasangContent}>
                <Text style={[styles.prasangTitle, { color: theme.text }]}>{prasang.title}</Text>
                <Text style={[styles.prasangPreview, { color: theme.subText }]} numberOfLines={1}>
                  Tap to read full prasang...
                </Text>
              </View>

              <ChevronRight color={theme.subText} size={20} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1 },
  scrollContent: { paddingHorizontal: 24, paddingTop: 20, paddingBottom: 130 },
  
  // Profile Header Styling
  profileCard: {
    borderRadius: 32,
    padding: 24,
    alignItems: 'center',
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

  // Prasang Section
  sectionHeader: { fontSize: 13, fontWeight: '700', letterSpacing: 1, marginBottom: 16, marginLeft: 8 },
  prasangList: { gap: 12 },
  
  // Prasang Item Card
  prasangCard: {
    flexDirection: 'row', alignItems: 'center',
    padding: 16, borderRadius: 20, borderWidth: 1,
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