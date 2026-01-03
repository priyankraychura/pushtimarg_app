import { Moon, Sparkles, Sunrise } from 'lucide-react-native';
import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../styles';
import { usePanchang } from '../utils/usePanchang';

// --- TYPES ---
interface TithiData {
  vikramSamvat: string;
  fullTithi: string;
  festival?: string;
  isEkadashi?: boolean;
  sunrise: string;
  sunset: string;
}

interface TithiCardProps {
  theme: any;
  // We removed the 'tithi' prop because the card now fetches it internally
}
// --- COMPONENT ---
const TithiCard = ({ theme }: TithiCardProps) => {
  const tithi = usePanchang(); // <--- Data is now fetched here

  if (!tithi) return null;

  return (
    <View style={[styles.tithiCard, { backgroundColor: theme.card, shadowColor: theme.shadow, borderColor: theme.border }]}>
      <View style={styles.tithiRow}>
        <View style={styles.tithiMain}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
             <Moon color={theme.devotionalPrimary} size={16} strokeWidth={2.5} style={{ marginRight: 6 }} />
             <Text style={[styles.samvatText, { color: theme.subText }]}>VS {tithi.vikramSamvat}</Text>
          </View>
          <Text style={[styles.tithiText, { color: theme.text }]}>{tithi.fullTithi}</Text>
          
          {tithi.festival ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
               <Sparkles color={theme.accent} size={14} style={{ marginRight: 4 }} />
               <Text style={[styles.festivalText, { color: theme.devotionalPrimary }]}>{tithi.festival}</Text>
            </View>
          ) : null}
        </View>
        
        <View style={styles.tithiSide}>
          {tithi.isEkadashi && (
            <View style={[styles.badge, { backgroundColor: '#FFF9E6', borderColor: theme.accent }]}>
               <Text style={[styles.badgeText, { color: '#B45309' }]}>AGIYARAS</Text>
            </View>
          )}
          <View style={[styles.sunRow, { marginTop: tithi.isEkadashi ? 8 : 0 }]}>
             <Sunrise color={theme.subText} size={14} />
             <Text style={[styles.sunTime, { color: theme.subText }]}>{tithi.sunrise}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TithiCard;