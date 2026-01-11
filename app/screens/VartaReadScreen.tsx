import ErrorView from '@/components/ErrorView';
import Header from '@/components/Header';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { clearCurrentPrasang, fetchPrasangContent } from '@/redux/slices/vartaSlice';
import { styles } from '@/styles';
import { useNavigation } from '@react-navigation/native';
import { MoreHorizontal, Type } from 'lucide-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, Text, TouchableOpacity, View } from 'react-native';

interface VartaReadScreenProps {
  theme: any;
  prasangDetail: any; // <--- Changed: Receive data directly, not via route
  getBaseFontSize: () => number;
}

const VartaReadScreen = ({
      theme, 
      prasangDetail, // <--- Use this prop directly
      getBaseFontSize,
    }: VartaReadScreenProps) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  
  // 1. Destructure Data directly from the prop
  // Note: We don't use route.params here because the Wrapper in App.tsx already passed it
  const { vaishnavName, prasangIndex, file } = prasangDetail;

  // 2. Get Content from Redux
  const { currentPrasang, prasangStatus, prasangError } = useAppSelector((state) => state.varta);
  
  const [fontSize, setFontSize] = useState(getBaseFontSize());
  const [showFontControl, setShowFontControl] = useState(false);
  
  const scrollY = useRef(new Animated.Value(0)).current;

  // 3. Cleanup on Unmount
  useEffect(() => {
    return () => {
      dispatch(clearCurrentPrasang());
    };
  }, [dispatch]);

  // Font Handlers
  const increaseFont = () => {
    if (fontSize < 34) setFontSize((prev: number) => prev + 2);
  };
  const decreaseFont = () => {
    if (fontSize > 12) setFontSize((prev: number) => prev - 2);
  };

  // --- RENDER LOADING ---
  if (prasangStatus === 'loading' || prasangStatus === 'idle') {
    return (
        <View style={[styles.screen, { backgroundColor: theme.bg }]}>
            <Header
                title={`Prasang ${prasangIndex + 1}`}
                subtitle={vaishnavName}
                onBack={() => navigation.goBack()}
                theme={theme}
            />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={theme.devotionalPrimary} />
            </View>
        </View>
    );
  }

  // --- RENDER ERROR ---
  if (prasangStatus === 'failed') {
    return (
        <View style={[styles.screen, { backgroundColor: theme.bg }]}>
            <Header
                title={`Prasang ${prasangIndex + 1}`}
                subtitle={vaishnavName}
                onBack={() => navigation.goBack()}
                theme={theme}
            />
            <ErrorView 
                theme={theme} 
                message={prasangError || "Unable to load story"} 
                onRetry={() => {
                    if (file) dispatch(fetchPrasangContent(file));
                }} 
            />
        </View>
    );
  }

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

        {/* Custom Font Popover */}
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
              <TouchableOpacity 
                style={[styles.controlBtn, { backgroundColor: theme.inputBg }]} 
                onPress={decreaseFont}
              >
                 <Type size={14} color={theme.text} />
              </TouchableOpacity>

              <View style={styles.sizeDisplay}>
                 <Text style={[styles.sizeText, { color: theme.text }]}>{fontSize}</Text>
                 <Text style={[styles.pxText, { color: theme.subText }]}>px</Text>
              </View>

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
        contentContainerStyle={[styles.scrollContent, { paddingHorizontal: 20, paddingBottom: 100 }]}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        {/* Render Content from Redux State */}
        <Text style={[styles.title, { color: theme.text, marginTop: 10 }]}>
            {currentPrasang?.title || prasangDetail.title}
        </Text>
        
        <View style={[styles.vartaDivider, { backgroundColor: theme.devotionalPrimary }]} />
        
        <Text style={[
          styles.content, 
          { 
            color: theme.text, 
            fontSize: fontSize,
            lineHeight: fontSize * 1.6,
            textAlign: 'justify'
          }
        ]}>
          {currentPrasang?.content}
        </Text>

        <View style={styles.footer}>
          <Text style={[styles.endMark, { color: theme.devotionalPrimary, textAlign: 'center', marginTop: 30, opacity: 0.8 }]}>
            || Jai Shri Krishna ||
          </Text>
        </View>

      </Animated.ScrollView>
    </View>
  );
};

export default VartaReadScreen;