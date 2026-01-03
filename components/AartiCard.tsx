import { Heart } from 'lucide-react-native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import TextTicker from 'react-native-text-ticker'; // Make sure to install this package
import { styles } from '../styles';

interface AartiItem {
  id: string;
  title: string;
  subtitle: string;
}

interface AartiCardProps {
  item: AartiItem;
  isFavorite: boolean; 
  onPress: (item: AartiItem) => void;
  onToggleFavorite: (id: string) => void;
  theme: any;
}

const AartiCard = ({ item, isFavorite, onPress, onToggleFavorite, theme }: AartiCardProps) => {
  return (
    <TouchableOpacity 
      activeOpacity={0.9}
      style={[
        styles.card, 
        { 
          backgroundColor: theme.card,
          shadowColor: theme.shadow,
          borderColor: theme.border,
          borderWidth: 1
        }
      ]} 
      onPress={() => onPress(item)}
    >
      <View style={styles.cardContentRow}>
        <View style={[styles.cardIconBox, { backgroundColor: theme.inputBg }]}>
          <Text style={{fontSize: 20}}>🪔</Text> 
        </View>
        
        <View style={styles.cardInfo}>
          {/* Robust Marquee Library - Only if text is long */}
          {item.title.length > 25 ? (
            <TextTicker
                style={[styles.cardTitle, { color: theme.text, marginBottom: 0 }]}
                duration={10000} // Speed (higher = slower)
                loop
                bounce={false} // Continuous scroll style
                repeatSpacer={50} // Gap between loops
                marqueeDelay={1000} // Wait 1s before scrolling starts
                animationType="scroll"
            >
                {item.title}
            </TextTicker>
          ) : (
            <Text style={[styles.cardTitle, { color: theme.text, marginBottom: 0 }]} numberOfLines={1}>
                {item.title}
            </Text>
          )}
          
          <Text style={[styles.cardSubtitle, { color: theme.subText }]}>{item.subtitle}</Text>
        </View>

        <View style={styles.cardAction}>
           <TouchableOpacity 
             style={[styles.favoriteBtn]} 
             onPress={() => onToggleFavorite(item.id)}
             hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
           >
              <Heart 
                fill={isFavorite ? theme.accent : "transparent"} 
                stroke={isFavorite ? theme.accent : theme.subText} 
                size={20} 
              />
           </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(AartiCard);