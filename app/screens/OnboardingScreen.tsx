import { styles } from '@/styles';
import { ChevronLeft } from 'lucide-react-native';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface OnboardingScreenProps {
  onFinish: () => void;
  theme: any;
}

const OnboardingScreen = ({ onFinish, theme }: OnboardingScreenProps) => {
  return (
    <View style={[styles.onboardingContainer, { backgroundColor: theme.bg }]}>
      {/* Abstract Background Shapes */}
      <View style={[styles.decorativeCircle, { backgroundColor: theme.devotionalPrimary, opacity: 0.08, top: -150, right: -100, width: 400, height: 400 }]} />
      <View style={[styles.decorativeCircle, { backgroundColor: theme.accent, opacity: 0.05, bottom: -100, left: -50, width: 300, height: 300 }]} />
      
      <View style={styles.onboardingContent}>
        <View style={[styles.logoContainer, { backgroundColor: theme.card, shadowColor: theme.shadow, overflow: 'hidden' }]}>
          <Image 
            source={require('../../assets/icons/playstore-icon.png')}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          />
        </View>
        <Text style={[styles.onboardingTitle, { color: theme.text }]}>Pushtimarg</Text>
        <Text style={[styles.onboardingSubtitle, { color: theme.subText }]}>
          Discover peace in your daily Nitya Niyam. Your personal sanctuary for devotion.
        </Text>
        
        <TouchableOpacity 
          style={[styles.primaryButton, { backgroundColor: theme.devotionalPrimary, shadowColor: theme.devotionalPrimary }]} 
          onPress={onFinish}
          activeOpacity={0.9}
        >
          <Text style={styles.primaryButtonText}>Begin Journey</Text>
          <ChevronLeft color="#FFF" size={20} style={{ transform: [{rotate: '180deg'}] }} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnboardingScreen;