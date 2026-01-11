import { Check, MoreHorizontal, Type } from 'lucide-react-native';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator // <--- Added this
    ,







    Animated,
    AppState,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import YoutubePlayer, { YoutubeIframeRef } from 'react-native-youtube-iframe';

// Custom Components
import GlassView from '@/components/GlassView';
import Header from '@/components/Header';
import { styles } from '@/styles';

interface AartiDetailScreenProps {
    isLoading: boolean;
    aarti: any;
    onBack: () => void;
    theme: any;
    baseFontSize: number;
    playerEnabled: boolean;
}

const FONT_OPTIONS = [
    { label: 'Small', value: 16 },
    { label: 'Medium', value: 20 },
    { label: 'Large', value: 26 },
];

// --- CONSTANTS FOR PLAYER SIZE ---
const PLAYER_WIDTH = 200;
const PLAYER_HEIGHT = PLAYER_WIDTH * (9 / 16); // ~112.5px (16:9 aspect ratio)

const AartiDetailScreen = ({
    isLoading,
    aarti,
    onBack,
    theme,
    baseFontSize,
    playerEnabled,
}: AartiDetailScreenProps) => {
    // --- Text Reader State ---
    const [script, setScript] = useState('gujarati');
    const [fontSize, setFontSize] = useState(baseFontSize || 20);
    const [showFontMenu, setShowFontMenu] = useState(false);

    // --- Header Animation State ---
    const scrollY = useRef(new Animated.Value(0)).current;

    // --- YouTube Player State ---
    const playerRef = useRef<YoutubeIframeRef>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isVideoReady, setIsVideoReady] = useState(false); // <--- New State for Loader

    // Add this state to track app visibility
    const appState = useRef(AppState.currentState);

    useEffect(() => {
        const subscription = AppState.addEventListener('change', (nextAppState) => {
            if (
                appState.current.match(/active/) &&
                (nextAppState === 'inactive' || nextAppState === 'background')
            ) {
                // App went to background -> PAUSE VIDEO
                setIsPlaying(false);
            }
            appState.current = nextAppState;
        });

        return () => {
            subscription.remove();
        };
    }, []);

    // Sync font size
    useEffect(() => {
        if (baseFontSize) setFontSize(baseFontSize);
    }, [baseFontSize]);

    const onStateChange = useCallback((state: string) => {
        if (state === 'ended') {
            setIsPlaying(false);
        } else if (state === 'playing') {
            setIsPlaying(true);
        } else if (state === 'paused') {
            setIsPlaying(false);
        }
    }, []);

    const handleSelectSize = (size: number) => {
        setFontSize(size);
        setShowFontMenu(false);
    };

    const videoId = aarti?.videoId;

    if (isLoading) {
        return (
            <View style={{ flex: 1, backgroundColor: theme.bg, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={theme.primary || '#D35400'} />
            </View>
        );
    }

    return (
        <View style={[styles.screen, { backgroundColor: theme.bg }]}>
            {/* --- Menu Overlay --- */}
            {showFontMenu && (
                <TouchableWithoutFeedback onPress={() => setShowFontMenu(false)}>
                    <View style={localStyles.overlay} />
                </TouchableWithoutFeedback>
            )}

            {/* --- Header --- */}
            <View style={{ zIndex: 30 }}>
                <Header
                    title={aarti.title}
                    subtitle={aarti.category}
                    onBack={onBack}
                    theme={theme}
                    rightAction={
                        <View style={{ flexDirection: 'row', gap: 12 }}>
                            <TouchableOpacity
                                style={[styles.iconButton, { backgroundColor: theme.inputBg }]}
                                onPress={() => setShowFontMenu(!showFontMenu)}
                            >
                                <Type color={showFontMenu ? theme.devotionalPrimary : theme.text} size={20} />
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.iconButton, { backgroundColor: theme.inputBg }]}>
                                <MoreHorizontal color={theme.text} size={20} />
                            </TouchableOpacity>
                        </View>
                    }
                />

                {/* Font Menu */}
                {showFontMenu && (
                    <View style={[styles.fontSizeDropdown, { backgroundColor: theme.card, borderColor: theme.border }]}>
                        <Text style={[localStyles.menuLabel, { color: theme.subText }]}>TEXT SIZE</Text>
                        {FONT_OPTIONS.map((opt) => {
                            const isActive = fontSize === opt.value;
                            return (
                                <TouchableOpacity
                                    key={opt.label}
                                    style={[styles.fontSizeDropdownButton, { backgroundColor: isActive ? theme.inputBg : 'transparent' }]}
                                    onPress={() => handleSelectSize(opt.value)}
                                >
                                    <Text style={{ color: theme.text, fontWeight: isActive ? '600' : '400' }}>{opt.label}</Text>
                                    {isActive && <Check size={16} color={theme.devotionalPrimary} />}
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                )}
            </View>

            {/* --- Content --- */}
            <Animated.ScrollView
                style={styles.readerContent}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 160 }}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
                scrollEventThrottle={16}
            >
                {/* Language Segments */}
                <View style={[styles.segmentContainer, { backgroundColor: theme.inputBg }]}>
                    {['gujarati', 'english', 'meaning'].map((s) => {
                        const isActive = script === s;
                        return (
                            <TouchableOpacity
                                key={s}
                                onPress={() => setScript(s)}
                                style={[
                                    styles.segmentBtn,
                                    isActive && {
                                        backgroundColor: theme.card,
                                        shadowColor: theme.shadow,
                                        shadowOpacity: 0.1,
                                        shadowRadius: 4,
                                        elevation: 2,
                                    },
                                ]}
                            >
                                <Text style={[styles.segmentText, { color: isActive ? theme.text : theme.subText, fontWeight: isActive ? '700' : '500' }]}>
                                    {s.charAt(0).toUpperCase() + s.slice(1)}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* Title & Lyrics */}
                <View style={styles.readerHeader}>
                    <Text style={[styles.readerTitle, { color: theme.text }]}>{aarti.title}</Text>
                    <View style={[styles.divider, { backgroundColor: theme.devotionalPrimary }]} />
                </View>

                <Text style={[styles.lyricsText, { color: theme.text, fontSize: fontSize, lineHeight: fontSize * 1.6 }]}>
                    {aarti.content[script]}
                </Text>

                <View style={{ alignItems: 'center', marginTop: 40, opacity: 0.8 }}>
                    <Text style={[styles.endMark, { color: theme.devotionalPrimary }]}>|| Jai Shri Krishna ||</Text>
                </View>
            </Animated.ScrollView>

            {/* --- RIGHT ALIGNED GLASS PLAYER WITH LOADER --- */}
            {playerEnabled && videoId &&(
                <View style={localStyles.playerWrapper}>
                    <GlassView
                        theme={theme}
                        style={[
                            localStyles.glassPlayerContainer,
                            { borderColor: theme.border }
                        ]}
                    >
                        <View style={localStyles.videoClipper}>
                            {/* Loader Overlay: Only shows when video is NOT ready */}
                            {!isVideoReady && (
                                <View style={localStyles.loadingOverlay}>
                                    <ActivityIndicator size="small" color={theme.devotionalPrimary} />
                                </View>
                            )}

                            <YoutubePlayer
                                ref={playerRef}
                                height={PLAYER_HEIGHT}
                                width={PLAYER_WIDTH}
                                play={isPlaying}
                                videoId={videoId}
                                onChangeState={onStateChange}
                                onReady={() => setIsVideoReady(true)} // <--- Set ready state here
                                initialPlayerParams={{
                                    controls: 1,
                                    modestbranding: 1,
                                    loop: false,
                                    rel: 0,
                                }}
                                webViewProps={{
                                    androidLayerType: 'hardware',
                                }}
                            />
                        </View>
                    </GlassView>
                </View>
            )}
        </View>
    );
};

const localStyles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0, bottom: 0, left: 0, right: 0,
        zIndex: 20,
    },
    menuLabel: {
        fontSize: 11,
        marginLeft: 8,
        marginBottom: 6,
        fontWeight: '600',
    },
    playerWrapper: {
        position: 'absolute',
        bottom: 30,
        right: 20,
        zIndex: 50,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 16,
        elevation: 8,
    },
    glassPlayerContainer: {
        width: PLAYER_WIDTH,
        height: PLAYER_HEIGHT,
        borderRadius: 16,
        borderWidth: 1,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    videoClipper: {
        width: PLAYER_WIDTH,
        height: PLAYER_HEIGHT,
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: '#000', // <--- Black background hides white flash
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject, // Covers the entire video area
        backgroundColor: '#000', // Black background for the loader
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10, // Ensures it sits on top of the iframe
    }
});

export default AartiDetailScreen;