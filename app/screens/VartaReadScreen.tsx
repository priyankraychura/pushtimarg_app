import Header from '@/components/Header';
import { styles } from '@/styles';
import { useNavigation } from '@react-navigation/native';
import { MoreHorizontal, Type } from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';

interface VartaReadScreenProps {
  theme: any;
  prasangDetail: any;
  getBaseFontSize: any;
}

const VartaReadScreen = ({
      theme, 
      prasangDetail,
      getBaseFontSize,
    }: VartaReadScreenProps) => {
  const navigation = useNavigation();
  
  // Destructure the data passed from the Detail screen
  const { prasang, vaishnavName, prasangIndex, totalPrasangs } = prasangDetail;
  
  const [fontSize, setFontSize] = useState(getBaseFontSize());
  const [showFontControl, setShowFontControl] = useState(false);
  
  // Animation for Header
  const scrollY = useRef(new Animated.Value(0)).current;

  // Font Handlers
  const increaseFont = () => {
    if (fontSize < 34) setFontSize((prev: number) => prev + 2);
  };
  const decreaseFont = () => {
    if (fontSize > 12) setFontSize((prev: number) => prev - 2);
  };

  return (
    <View style={[styles.screen, { backgroundColor: theme.bg }]}>
      {/* Animated Header */}
      <View style={{ zIndex: 30 }}>
        <Header
          title={`Prasang ${prasangIndex + 1}`}
          subtitle={vaishnavName}
          onBack={() => navigation.goBack()}
          theme={theme}
          rightAction={
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <TouchableOpacity
                style={[styles.iconButton, { backgroundColor: theme.inputBg }]}
                onPress={() => {
                   setShowFontControl(!showFontControl);
                }}
              >
                <Type color={showFontControl ? theme.devotionalPrimary : theme.text} size={20} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.iconButton, { backgroundColor: theme.inputBg }]}
              >
                <MoreHorizontal color={theme.text} size={20} />
              </TouchableOpacity>
            </View>
          }
        />

        {/* 2. Custom Font Popover */}
        {showFontControl && (
          <View
            style={[
              styles.popover,
              {
                backgroundColor: theme.card,
                borderColor: theme.border,
                shadowColor: '#000',
              },
            ]}
          >
            <View style={styles.fontControlRow}>
              {/* Decrease Button */}
              <TouchableOpacity 
                style={[styles.controlBtn, { backgroundColor: theme.inputBg }]} 
                onPress={decreaseFont}
              >
                 <Type size={14} color={theme.text} />
              </TouchableOpacity>

              {/* Display Size */}
              <View style={styles.sizeDisplay}>
                 <Text style={[styles.sizeText, { color: theme.text }]}>{fontSize}</Text>
                 <Text style={[styles.pxText, { color: theme.subText }]}>px</Text>
              </View>

              {/* Increase Button */}
              <TouchableOpacity 
                style={[styles.controlBtn, { backgroundColor: theme.inputBg }]} 
                onPress={increaseFont}
              >
                 <Type size={22} color={theme.text} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
      <Animated.ScrollView 
        contentContainerStyle={[styles.scrollContent]}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        <Text style={[styles.title, { color: theme.text }]}>{prasang.title}</Text>
        <View style={[styles.vartaDivider, { backgroundColor: theme.devotionalPrimary }]} />
        
        <Text style={[
          styles.content, 
          { 
            color: theme.text, 
            fontSize: fontSize,
            lineHeight: fontSize * 1.6 
          }
        ]}>
          {prasang.content}
        </Text>

        <View style={styles.footer}>
          <Text style={[styles.endMark, { color: theme.devotionalPrimary }]}>|| Jai Shri Krishna ||</Text>
        </View>

        {/* Navigation Footer (Next/Prev could go here) */}
        <View style={styles.navFooter}>
           {/* Placeholders for prev/next logic if needed */}
        </View>
      </Animated.ScrollView>
    </View>
  );
};

export default VartaReadScreen;
