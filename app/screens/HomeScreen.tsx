import { DownloadCloud, Feather, PlayCircle, RefreshCcw, Sunrise, WifiOff, X } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TextTicker from 'react-native-text-ticker';
import VersionCheck from 'react-native-version-check';

// Custom Components
import AartiCard from '@/components/AartiCard';
import SectionHeader from '@/components/SectionHeader';
import TithiCard from '@/components/TithiCard';
import { CATEGORIES } from '@/constants';
import { styles } from '@/styles';

interface HomeScreenProps {
  theme: any;
  data: any[];
  onNavigate: (screen: string) => void;
  onOpenAarti: (item: any) => void;
  onToggleFavorite: (id: string) => void;
  favoriteIds: string[];
  onCategorySelect: (category: string) => void;
  lastReadAarti: any;
  userName: string;
  onOpenProfile: () => void;
  // --- NEW PROPS FOR ERROR HANDLING ---
  isLoading: boolean;
  isError: boolean;
  onRefresh: () => void;
}

// --- LOCAL MARQUEE COMPONENT ---
const MARQUEE_THRESHOLD = 20;

const HeroMarqueeTitle = ({ text, style }: { text: string, style: any }) => {
  const isLongText = text.length > MARQUEE_THRESHOLD;

  if (isLongText) {
    return (
      <View style={{ overflow: 'hidden', justifyContent: 'center', marginBottom: 4, width: '75%' }}>
        <TextTicker
          style={style}
          duration={12000}
          loop
          bounce={false}
          repeatSpacer={50}
          marqueeDelay={1000}
          animationType="scroll"
        >
          {text}
        </TextTicker>
      </View>
    );
  }

  return (
    <Text style={[style, { marginBottom: 4 }]} numberOfLines={1}>
      {text}
    </Text>
  );
};

const HomeScreen = ({
  theme,
  data,
  onNavigate,
  onOpenAarti,
  onToggleFavorite,
  favoriteIds,
  onCategorySelect,
  lastReadAarti,
  userName,
  onOpenProfile,
  isLoading,  // <--- NEW
  isError,    // <--- NEW
  onRefresh,  // <--- NEW
}: HomeScreenProps) => {
  const [greeting, setGreeting] = useState('Jai Shree Krishna');
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');

    const checkAppVersion = async () => {
      try {
        const update = await VersionCheck.needUpdate();
        if (update?.isNeeded) {
          setIsUpdateAvailable(true);
        }
      } catch (error) {
        console.log("Error checking app version:", error);
      }
    };

    checkAppVersion();
  }, []);

  const handleUpdateApp = async () => {
    try {
      const url = await VersionCheck.getStoreUrl();
      if (url) {
        await Linking.openURL(url);
      }
      setIsUpdateAvailable(false);
    } catch (error) {
      console.log("Error opening store:", error);
    }
  };

  // --- SAFEGUARD HERO ITEM ---
  // If data is empty (no internet) and no lastRead, use a placeholder to prevent crash
  const heroItem = lastReadAarti || data[0] || {
    id: 'placeholder',
    title: 'Welcome to Pushtimarg',
    subtitle: 'Start your day with devotion',
    category: 'General',
    file: null // Marker that this is not a real aarti
  };

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: theme.bg }]}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 130 }}
    >
      {/* Dynamic Header */}
      <View style={styles.homeHeader}>
        <View>
          <Text style={[styles.greeting, { color: theme.subText }]}>
            {greeting.toUpperCase()}
          </Text>
          <Text style={[styles.greetingName, { color: theme.text }]}>
            {userName || 'Vaishnav'}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.profileIcon, { backgroundColor: theme.inputBg }]}
          onPress={onOpenProfile}
        >
          <Feather color={theme.devotionalPrimary} size={20} />
        </TouchableOpacity>
      </View>

      {/* --- UPDATE BANNER --- */}
      {isUpdateAvailable && (
        <View style={{ paddingHorizontal: 24, marginBottom: 16 }}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={handleUpdateApp}
            style={[
              localStyles.updateCard,
              { backgroundColor: theme.card, borderColor: theme.devotionalPrimary }
            ]}
          >
            <View style={[localStyles.updateIconBox, { backgroundColor: theme.devotionalPrimary }]}>
              <DownloadCloud color="#FFF" size={20} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[localStyles.updateTitle, { color: theme.text }]}>New Update Available</Text>
              <Text style={[localStyles.updateSub, { color: theme.subText }]}>Tap to download & restart</Text>
            </View>
            <TouchableOpacity onPress={() => setIsUpdateAvailable(false)} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <X color={theme.subText} size={18} />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      )}

      {/* Tithi & Panchang Card */}
      <View style={{ paddingHorizontal: 24, marginBottom: 20 }}>
        <TithiCard theme={theme} />
      </View>

      {/* Enhanced Hero Card */}
      <TouchableOpacity
        activeOpacity={heroItem.file ? 0.95 : 1} // Disable press if placeholder
        style={[
          styles.heroCard,
          {
            backgroundColor: theme.devotionalPrimary,
            shadowColor: theme.devotionalPrimary,
          },
        ]}
        onPress={() => heroItem.file && onOpenAarti(heroItem)}
      >
        <View
          style={{ position: 'absolute', top: -20, right: -20, opacity: 0.1 }}
        >
          <Sunrise color='#FFF' size={120} />
        </View>

        <View style={styles.heroContent}>
          <View
            style={[
              styles.heroBadge,
              { backgroundColor: 'rgba(255,255,255,0.15)' },
            ]}
          >
            <Text style={styles.heroBadgeText}>
                {heroItem.file ? "CONTINUE READING" : "WELCOME"}
            </Text>
          </View>

          <HeroMarqueeTitle
            text={heroItem.title}
            style={styles.heroTitle}
          />

          <Text style={styles.heroSub} numberOfLines={1}>
            {heroItem.subtitle}
          </Text>
        </View>
        
        {/* Only show play button if it's a real item */}
        {heroItem.file && (
            <View style={styles.heroPlay}>
            <View
                style={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderRadius: 30,
                padding: 8,
                }}
            >
                <PlayCircle color='#FFF' size={40} fill='rgba(255,255,255,0.2)' />
            </View>
            </View>
        )}
      </TouchableOpacity>

      {/* Categories */}
      <SectionHeader
        action='View All'
        title='Nitya Niyam'
        theme={theme}
        onActionPress={() => onCategorySelect("All")}
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScroll}
      >
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          return (
            <TouchableOpacity
              key={cat.id}
              activeOpacity={0.8}
              onPress={() => onCategorySelect(cat.title)}
              style={[
                styles.categoryCard,
                {
                  backgroundColor: theme.card,
                  shadowColor: theme.shadow,
                  borderColor: theme.border,
                  borderWidth: 1,
                },
              ]}
            >
              <View
                style={[styles.catIcon, { backgroundColor: theme.inputBg }]}
              >
                <Icon
                  size={22}
                  color={theme.devotionalPrimary}
                  strokeWidth={2}
                />
              </View>
              <Text style={[styles.catText, { color: theme.text }]}>
                {cat.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Today's Pick - WITH ERROR HANDLING */}
      <SectionHeader
        title="Today's Pick"
        theme={theme}
      />
      <View style={styles.listContainer}>
        {isLoading ? (
            // 1. LOADING STATE
            <View style={{ padding: 20, alignItems: 'center' }}>
                <ActivityIndicator size="small" color={theme.devotionalPrimary} />
            </View>
        ) : (isError || data.length === 0) ? (
            // 2. ERROR / EMPTY STATE
            <View style={[localStyles.errorContainer, { backgroundColor: theme.card, borderColor: theme.border }]}>
                <View style={[localStyles.errorIconBox, { backgroundColor: theme.inputBg }]}>
                    <WifiOff size={24} color={theme.subText} />
                </View>
                <Text style={[localStyles.errorText, { color: theme.subText }]}>
                    Unable to load content
                </Text>
                <TouchableOpacity 
                    onPress={onRefresh}
                    activeOpacity={0.7}
                    style={[localStyles.retryBtn, { backgroundColor: theme.inputBg }]}
                >
                    <RefreshCcw size={16} color={theme.text} style={{ marginRight: 8 }} />
                    <Text style={{ color: theme.text, fontWeight: '600', fontSize: 13 }}>Retry</Text>
                </TouchableOpacity>
            </View>
        ) : (
            // 3. SUCCESS STATE
            data.slice(0, 2).map((item: any) => {
                const isFav = favoriteIds.includes(item.id);
                return (
                    <AartiCard
                    key={item.id}
                    item={item}
                    onPress={onOpenAarti}
                    onToggleFavorite={onToggleFavorite}
                    isFavorite={isFav}
                    theme={theme}
                    />
                );
            })
        )}
      </View>
    </ScrollView>
  );
};

const localStyles = StyleSheet.create({
  updateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
  },
  updateIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  updateTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  updateSub: {
    fontSize: 12,
  },
  // --- NEW STYLES FOR ERROR STATE ---
  errorContainer: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    borderStyle: 'dashed',
    marginHorizontal: 4, // Align with cards
  },
  errorIconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  errorText: {
    fontSize: 14,
    marginBottom: 16,
  },
  retryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
  }
});

export default HomeScreen;