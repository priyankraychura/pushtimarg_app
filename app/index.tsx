import {
    Dimensions,
    InteractionManager,
    LayoutAnimation,
    Platform,
    StatusBar,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

// REDUX IMPORTS
import { Provider } from 'react-redux';

// --- NAV IMPORTS ---
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Book, Calendar as CalendarIcon, Heart, Home, Settings } from 'lucide-react-native';

// Components
import EditProfileModal from '@/components/EditProfileModal';
import ErrorView from '@/components/ErrorView';
import GlassView from '@/components/GlassView';

// Screens
import AartiDetailScreen from './screens/AartiDetailScreen';
import AartiListScreen from './screens/AartiListScreen';
import CalendarScreen from './screens/CalendarScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import HomeScreen from './screens/HomeScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import SettingsScreen from './screens/SettingsScreen';
import VartaDetailScreen from './screens/VartaDetailScreen';
import VartaListScreen from './screens/VartaListScreen';
import VartaReadScreen from './screens/VartaReadScreen';

import { PALETTE } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchAartiContent, fetchContentList, setListFilter, setSelectedAartiMetadata } from '@/redux/slices/contentSlice';
import { cycleTextSize, toggleNotifications, togglePlayer, toggleTheme } from '@/redux/slices/settingsSlice';
import {
    completeOnboarding,
    setLastReadAarti,
    setProfileModalVisible,
    toggleFavorite,
    updateProfile,
} from '@/redux/slices/userSlice';
import { persistor, store } from '@/redux/store';
import { styles } from '@/styles';
import { setupNotifications } from '@/utils/NotificationService';
import * as Notifications from 'expo-notifications';
import { useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import VersionCheck from 'react-native-version-check';
import { PersistGate } from 'redux-persist/integration/react';
import ForceUpdateScreen from './screens/ForceUpdateScreen';
import LoadingScreen from './screens/LoadingScreen';

import { useFocusEffect } from '@react-navigation/native'; // <--- Import useFocusEffect
import { useCallback } from 'react'; // <--- Import useCallback
import { BackHandler } from 'react-native'; // <--- Import BackHandler
import ExitModal from '@/components/ExitModal';

const { width, height } = Dimensions.get('window');

// Define Navigators
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// --- CUSTOM HOOK: GLOBAL HANDLERS ---
// This centralizes logic used in multiple screens (Home, Favorites, AartiList)
const useGlobalHandlers = (navigation: any) => {
    const dispatch = useAppDispatch();
    
    const handleToggleFavorite = (id: string) => {
        dispatch(toggleFavorite(id));
    };

    const handleOpenAarti = (aarti: any) => {
        dispatch(setLastReadAarti(aarti));
        // 1. Set Metadata Immediately
        dispatch(setSelectedAartiMetadata(aarti));

        // 2. Navigate Immediately
        navigation.navigate('AartiDetail', { aarti });

        // 3. Fetch Data AFTER animation
        InteractionManager.runAfterInteractions(() => {
            dispatch(fetchAartiContent(aarti.file));
        });
    };

    return { handleToggleFavorite, handleOpenAarti };
};

// --- BOTTOM NAV COMPONENT ---
const BottomNav = ({ activeTab, onTabChange, theme }: any) => {
    const tabs = [
        { id: 'Home', icon: Home, label: 'Home' },
        { id: 'Calendar', icon: CalendarIcon, label: 'Calendar' },
        { id: 'Varta', icon: Book, label: 'Varta' },
        { id: 'Favorites', icon: Heart, label: 'Saved' },
        { id: 'Settings', icon: Settings, label: 'Settings' },
    ];

    const handlePress = (id: string) => {
        onTabChange(id);
    };

    return (
        <View style={[styles.bottomNavContainer]}>
            <GlassView
                theme={theme}
                style={[styles.bottomNavInner, { shadowColor: theme.shadow }]}
            >
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <TouchableOpacity
                            key={tab.id}
                            style={styles.navItem}
                            onPress={() => handlePress(tab.id)}
                            activeOpacity={0.8}
                        >
                            <View
                                style={[
                                    styles.navIconContainer,
                                    isActive && { backgroundColor: theme.inputBg },
                                ]}
                            >
                                <Icon
                                    color={isActive ? theme.devotionalPrimary : theme.subText}
                                    size={24}
                                    strokeWidth={isActive ? 2.5 : 2}
                                />
                            </View>
                            {isActive && (
                                <Text
                                    style={[styles.navLabel, { color: theme.devotionalPrimary }]}
                                >
                                    {tab.label}
                                </Text>
                            )}
                        </TouchableOpacity>
                    );
                })}
            </GlassView>
        </View>
    );
};

const CustomTabBarBridge = ({ state, descriptors, navigation, theme }: any) => {
    const activeTab = state.routes[state.index].name;
    const handleTabChange = (tabId: string) => {
        const isFocused = activeTab === tabId;
        const event = navigation.emit({
            type: 'tabPress',
            target: state.routes.find((r: any) => r.name === tabId)?.key,
            canPreventDefault: true,
        });
        if (!isFocused && !event.defaultPrevented) navigation.navigate(tabId);
    };
    return (
        <BottomNav
            activeTab={activeTab}
            onTabChange={handleTabChange}
            theme={theme}
        />
    );
};

// --- TAB NAVIGATOR ---
const MainTabNavigator = ({ navigation }: any) => {
    const dispatch = useAppDispatch();
    
    // Use Global Handlers Hook
    const { handleOpenAarti, handleToggleFavorite } = useGlobalHandlers(navigation);
    const { listStatus } = useAppSelector((state) => state.content);

    // Selectors
    const { isDark, textSizeMode } = useAppSelector((state) => state.settings);
    const { profile, lastReadAarti, favoriteIds } = useAppSelector((state) => state.user);
    const { items: bhajanList } = useAppSelector((state) => state.content);
    const { notificationsEnabled, playerEnabled } = useAppSelector((state) => state.settings);

    const theme = isDark ? PALETTE.dark : PALETTE.light;

    // --- EXIT MODAL LOGIC START ---
    const [exitModalVisible, setExitModalVisible] = useState(false);

    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                // If the user is on the MainTabs, show the modal instead of closing immediately
                setExitModalVisible(true);
                return true; // Return true to stop default back behavior (closing app)
            };

            // 1. Subscribe
            const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

            // 2. Unsubscribe using the subscription object
            return () => subscription.remove();
        }, [])
    );
    // --- EXIT MODAL LOGIC END ---

    // Props for screens
    const homeProps = {
        theme: theme,
        data: bhajanList,
        onNavigate: (screen: string) => navigation.navigate(screen),
        onOpenAarti: handleOpenAarti,      // Uses global handler
        onToggleFavorite: handleToggleFavorite, // Uses global handler
        favoriteIds: favoriteIds,
        onCategorySelect: (cat: string) => {
            dispatch(setListFilter(cat));
            navigation.navigate('Aartis'); 
        },
        lastReadAarti,
        userName: profile.name,
        onOpenProfile: () => dispatch(setProfileModalVisible(true)),
        isLoading: listStatus === 'loading',
        isError: listStatus === 'failed',
        onRefresh: () => dispatch(fetchContentList()),
    };

    return (
        <View style={{ flex: 1, backgroundColor: theme.bg }}>
            <StatusBar
                barStyle={isDark ? 'light-content' : 'dark-content'}
                backgroundColor={theme.bg}
            />

            {/* RENDER EXIT MODAL HERE */}
            <ExitModal 
                visible={exitModalVisible} 
                onClose={() => setExitModalVisible(false)} 
                theme={theme} 
            />

            <Tab.Navigator
                screenOptions={{ headerShown: false }}
                tabBar={(props) => <CustomTabBarBridge {...props} theme={theme} />}
            >
                <Tab.Screen name='Home'>
                    {(props) => (
                        <HomeScreen
                            {...homeProps}
                            onCategorySelect={(cat: string) => {
                                dispatch(setListFilter(cat));
                                props.navigation.navigate('Aartis'); 
                            }}
                        />
                    )}
                </Tab.Screen>

                <Tab.Screen name='Calendar'>
                    {() => <CalendarScreen theme={theme}/>}
                </Tab.Screen>

                <Tab.Screen name='Varta'>
                    {() => <VartaListScreen theme={theme} />}
                </Tab.Screen>

                <Tab.Screen name='Favorites'>
                    {() => <FavoritesRouteWrapper />}
                </Tab.Screen>

                <Tab.Screen name='Settings'>
                    {() => (
                        <SettingsScreen
                            theme={theme}
                            isDark={isDark}
                            toggleTheme={() => {
                                LayoutAnimation.configureNext(
                                    LayoutAnimation.Presets.easeInEaseOut
                                );
                                dispatch(toggleTheme());
                            }}
                            notificationsEnabled={notificationsEnabled}
                            playerEnabled={playerEnabled}
                            togglePlayer={() => dispatch(togglePlayer())}
                            toggleNotification={() => dispatch(toggleNotifications())}
                            textSizeMode={textSizeMode}
                            onCycleTextSize={() => dispatch(cycleTextSize())}
                        />
                    )}
                </Tab.Screen>
            </Tab.Navigator>
        </View>
    );
};

// --- ROUTE WRAPPERS ---

// 1. Aarti Detail Wrapper
const AartiDetailRoute = ({ route, navigation }: any) => {
    const { aarti: metadata } = route.params;
    const { selectedAartiContent, detailStatus, detailError } = useAppSelector((state) => state.content);
    const dispatch = useAppDispatch();
    
    const { isDark, textSizeMode, playerEnabled } = useAppSelector((state) => state.settings);
    const theme = isDark ? PALETTE.dark : PALETTE.light;
    
    const getBaseFontSize = () =>
        textSizeMode === 'Small' ? 16 : textSizeMode === 'Large' ? 24 : 20;

    if (detailStatus === 'failed') {
        return (
            <ErrorView 
                theme={theme} 
                message={detailError || "Could not load content"} 
                onRetry={() => {
                    // Retry fetching the specific file
                    dispatch(fetchAartiContent(metadata.file));
                }}
            />
        );
    }

    const isLoading = detailStatus === 'loading' || !selectedAartiContent;

    if (isLoading) {
        return (
            <View style={{ flex: 1, backgroundColor: theme.bg, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={theme.primary || '#D35400'} />
            </View>
        );
    }

    return (
        <AartiDetailScreen
            isLoading={isLoading}
            aarti={selectedAartiContent} 
            onBack={() => navigation.goBack()}
            theme={theme}
            baseFontSize={getBaseFontSize()}
            playerEnabled={playerEnabled}
        />
    );
};

// 2. Varta Detail Wrapper
const VartaDetailRoute = ({ route, navigation }: any) => {
    const { vaishnav } = route.params;
    const { isDark } = useAppSelector((state) => state.settings);
    const theme = isDark ? PALETTE.dark : PALETTE.light;

    return <VartaDetailScreen theme={theme} vaishnav={vaishnav} />;
};

// 3. Varta Reader Wrapper
const VartaReadRoute = ({ route, navigation }: any) => {
    const { prasangDetail } = route.params;
    const { isDark, textSizeMode } = useAppSelector((state) => state.settings);
    const theme = isDark ? PALETTE.dark : PALETTE.light;
    const getBaseFontSize = () =>
        textSizeMode === 'Small' ? 16 : textSizeMode === 'Large' ? 24 : 20;

    return (
        <VartaReadScreen
            theme={theme}
            prasangDetail={prasangDetail}
            getBaseFontSize={getBaseFontSize}
        />
    );
};

// 4. Aarti List Wrapper (Updated with Global Hook)
const AartiListRoute = ({ navigation }: any) => {
    const dispatch = useAppDispatch(); // Make sure to use dispatch
    const { isDark } = useAppSelector((state) => state.settings);
    
    // Select Data
    const { listFilter, items, listStatus, listError } = useAppSelector((state) => state.content);
    const { favoriteIds } = useAppSelector((state) => state.user);
    
    // Use Global Handlers Hook
    const { handleOpenAarti, handleToggleFavorite } = useGlobalHandlers(navigation);
    
    const theme = isDark ? PALETTE.dark : PALETTE.light;

    // --- REFRESH LOGIC START ---
    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = async () => {
        setRefreshing(true);
        try {
            // Dispatch your fetch action here. 
            // If fetchContentList returns a promise (AsyncThunk), we can await it.
            await dispatch(fetchContentList()); 
        } catch (error) {
            console.error("Refresh failed", error);
        } finally {
            setRefreshing(false);
        }
    };
    // --- REFRESH LOGIC END ---

    if (listStatus === 'failed' && items.length === 0) {
        return (
            <ErrorView 
                theme={theme}
                message={listError || "Could not load library"}
                onRetry={() => dispatch(fetchContentList())}
            />
        );
    }

    return (
        <AartiListScreen
            theme={theme}
            data={items} 
            favoriteIds={favoriteIds}
            onToggleFavorite={handleToggleFavorite}
            onOpenAarti={handleOpenAarti}
            initialFilter={listFilter}
            // Pass new props
            refreshing={refreshing}
            onRefresh={handleRefresh}
        />
    );
};

// --- 5. FAVORITES WRAPPER (New Wrapper) ---
const FavoritesRouteWrapper = () => {
    const dispatch = useAppDispatch();
    const navigation = useNavigation<any>(); // Hook for navigation

    // 1. Get Data
    const { isDark } = useAppSelector((state) => state.settings);
    const { items: bhajanList, listStatus, listError } = useAppSelector((state) => state.content);
    const { favoriteIds } = useAppSelector((state) => state.user);
    
    // 2. Get Handlers
    const { handleOpenAarti } = useGlobalHandlers(navigation);
    const theme = isDark ? PALETTE.dark : PALETTE.light;

    // 3. Refresh Logic
    const [refreshing, setRefreshing] = useState(false);
    const handleRefresh = async () => {
        setRefreshing(true);
        try {
            await dispatch(fetchContentList()); 
        } catch (error) {
            console.error(error);
        } finally {
            setRefreshing(false);
        }
    };

    // 4. Error Check
    // If fetching failed AND we have no data to show, show ErrorView
    if (listStatus === 'failed' && bhajanList.length === 0) {
        return (
            <ErrorView 
                theme={theme}
                message={listError || "Could not load favorites"}
                onRetry={() => dispatch(fetchContentList())}
            />
        );
    }

    return (
        <FavoritesScreen
            theme={theme}
            favoriteIds={favoriteIds}
            data={bhajanList}
            onOpenAarti={handleOpenAarti}
            refreshing={refreshing}
            onRefresh={handleRefresh}
        />
    );
};

// --- MAIN APP CONTENT ---
const MainAppContent = () => {
    const dispatch = useAppDispatch();
    
    // --- GLOBAL DATA FETCHING ---
    // Moved here so it runs once on App startup, not just when Tabs load
    useEffect(() => {
        dispatch(fetchContentList());
    }, [dispatch]);

    const { onboarded, profile, isProfileModalVisible } = useAppSelector(
        (state) => state.user
    );
    const { isDark, notificationsEnabled } = useAppSelector((state) => state.settings);
    const theme = isDark ? PALETTE.dark : PALETTE.light;

     // Force Update State
    const [forceUpdateRequired, setForceUpdateRequired] = useState(false);
    const [storeUrl, setStoreUrl] = useState(
    Platform.OS === 'android' 
        ? 'https://play.google.com/store/apps/details?id=com.priyank.pushtimarg' 
        : 'https://apps.apple.com/app/idYOUR_IOS_APP_ID'
    );

    // --- CHECK FOR MAJOR UPDATES ---
    useEffect(() => {
        const checkVersion = async () => {
            try {
                const update = await VersionCheck.needUpdate();
                if (update?.isNeeded) {
                    const currentMajor = parseInt(update.currentVersion.split('.')[0], 10);
                    const latestMajor = parseInt(update.latestVersion.split('.')[0], 10);
                    
                    if (latestMajor > currentMajor) {
                        setStoreUrl(update.storeUrl);
                        setForceUpdateRequired(true);
                    }
                }
            } catch (e) {
                console.log("Version check error:", e);
            }
        };
        checkVersion();
    }, []);
    
    useEffect(() => {
        if (!onboarded) return;

        if (notificationsEnabled) {
            setupNotifications(); 
        } else {
            Notifications.cancelAllScheduledNotificationsAsync();
            console.log("Notifications disabled: specific alerts cancelled.");
        }
    }, [onboarded, notificationsEnabled]);

     // 1. Force Update Check (Highest Priority)
    if (forceUpdateRequired) {
        return (
            <SafeAreaProvider style={{ flex: 1, backgroundColor: theme.bg }}>
                <ForceUpdateScreen storeUrl={storeUrl} theme={theme} />
            </SafeAreaProvider>
        );
    }

    if (!onboarded) {
        return (
            <OnboardingScreen
                onFinish={() => dispatch(completeOnboarding())}
                theme={theme}
            />
        );
    }

    return (
        <SafeAreaProvider
            style={{ flex: 1, backgroundColor: theme.bg, paddingTop: 20 }}
        >
            <EditProfileModal
                visible={isProfileModalVisible}
                onClose={() => dispatch(setProfileModalVisible(false))}
                theme={theme}
                user={profile}
                setUser={(u) => dispatch(updateProfile(u))}
            />

            <Stack.Navigator
                screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
            >
                <Stack.Screen name='MainTabs' component={MainTabNavigator} />
                <Stack.Screen name='Aartis' component={AartiListRoute} />
                <Stack.Screen name='AartiDetail' component={AartiDetailRoute} />
                <Stack.Screen name='VartaDetail' component={VartaDetailRoute} />
                <Stack.Screen name='VartaRead' component={VartaReadRoute} />
            </Stack.Navigator>
        </SafeAreaProvider>
    );
};

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={<LoadingScreen />} persistor={persistor}>
                <MainAppContent />
            </PersistGate>
        </Provider>
    );
}