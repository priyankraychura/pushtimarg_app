import { ChevronLeft } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TextTicker from 'react-native-text-ticker'; // Import the library

interface HeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  theme: any;
  rightAction?: React.ReactNode;
}

const Header = ({ title, subtitle, onBack, theme, rightAction }: HeaderProps) => {
  return (
    <View style={[styles.header, { backgroundColor: theme.bg }]}>
      
      {/* LEFT SECTION (Flex 1 to take available space) */}
      <View style={styles.headerLeft}>
        {onBack && (
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <ChevronLeft color={theme.text} size={26} strokeWidth={2.5} />
          </TouchableOpacity>
        )}
        
        <View style={styles.titleContainer}>
          {subtitle && (
            <Text style={[styles.headerSubtitle, { color: theme.subText }]}>
              {subtitle.toUpperCase()}
            </Text>
          )}
          
          {/* Robust Marquee Library */}
          <TextTicker
            style={[styles.headerTitle, { color: theme.text }]}
            duration={12000} // Slower speed for header readability
            loop
            bounce={false}
            repeatSpacer={50}
            marqueeDelay={1000}
            animationType="scroll"
          >
            {title}
          </TextTicker>
        </View>
      </View>

      {/* RIGHT SECTION (Fixed width or natural size) */}
      {rightAction && <View style={styles.headerRight}>{rightAction}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    zIndex: 10,
    height: 80,
  },
  headerLeft: {
    flex: 1, // Critical: Allows this section to shrink/grow so ticker knows boundary
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10, 
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1, // Critical: Forces text container to fill leftover space inside headerLeft
    marginLeft: 8,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 2,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
    borderRadius: 50,
  },
});

export default Header;