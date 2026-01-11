import ErrorView from '@/components/ErrorView';
import GlassView from '@/components/GlassView';
import Header from '@/components/Header';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchVartaList } from '@/redux/slices/vartaSlice';
import { useNavigation } from '@react-navigation/native';
import { ChevronRight } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

interface VartaListScreenProps {
    theme: any;
}

const VartaListScreen = ({ theme }: VartaListScreenProps) => {
    const navigation = useNavigation<any>();
    const dispatch = useAppDispatch();
    
    // 1. Set '252' as the default active group
    const [activeGroup, setActiveGroup] = useState<'84' | '252'>('252');
    const [refreshing, setRefreshing] = useState(false);

    const { list84, list252, listStatus, listError } = useAppSelector((state) => state.varta);
    const currentData = activeGroup === '84' ? list84 : list252;

    useEffect(() => {
        if (currentData.length === 0 && listStatus !== 'loading') {
            dispatch(fetchVartaList(activeGroup));
        }
    }, [activeGroup, currentData.length, listStatus, dispatch]);

    const onRefresh = async () => {
        setRefreshing(true);
        try {
            await dispatch(fetchVartaList(activeGroup)).unwrap(); 
        } catch (error) {
            console.error("Refresh failed", error);
        } finally {
            setRefreshing(false);
        }
    };

    const handleToggle = (group: '84' | '252') => {
        setActiveGroup(group);
    };

    const renderContent = () => {
        if (listStatus === 'loading' && currentData.length === 0 && !refreshing) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color={theme.devotionalPrimary} />
                </View>
            );
        }

        if (listStatus === 'failed' && currentData.length === 0) {
            return (
                <View style={{ flex: 1 }}>
                     <ErrorView 
                        theme={theme} 
                        message={listError || "Failed to load Varta list"} 
                        onRetry={() => dispatch(fetchVartaList(activeGroup))} 
                    />
                </View>
            );
        }

        return (
            <FlatList
                data={currentData}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor={theme.devotionalPrimary}
                        colors={[theme.devotionalPrimary]}
                    />
                }
                renderItem={({ item }: { item: any }) => (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('VartaDetail', { vaishnav: item })}
                        style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}
                    >
                        <View style={styles.cardIndexContainer}>
                            <Text style={[styles.cardIndex, { color: theme.subText }]}>#{item.index}</Text>
                        </View>
                        <View style={styles.cardContent}>
                            <Text style={[styles.cardTitle, { color: theme.text }]}>{item.name}</Text>
                            <Text style={[styles.cardSub, { color: theme.subText }]} numberOfLines={1}>
                                {item.prasangs ? item.prasangs.length : 0} Prasangs
                            </Text>
                        </View>
                        <View style={[styles.iconBox, { backgroundColor: theme.inputBg }]}>
                            <ChevronRight color={theme.subText} size={20} />
                        </View>
                    </TouchableOpacity>
                )}
                ListEmptyComponent={
                     <View style={{ alignItems: 'center', marginTop: 40, opacity: 0.6 }}>
                        <Text style={{ color: theme.subText }}>No data available</Text>
                    </View>
                }
            />
        );
    };

    return (
        <View style={[styles.screen, { backgroundColor: theme.bg }]}>
            <Header title='Vaishnav Varta' theme={theme} />

            <View style={styles.toggleContainer}>
                <GlassView theme={theme} style={styles.toggleWrapper}>
                    {/* 2. Swapped Buttons: 252 First */}
                    <TouchableOpacity
                        style={[styles.toggleBtn, activeGroup === '252' && { backgroundColor: theme.devotionalPrimary }]}
                        onPress={() => handleToggle('252')}
                    >
                        <Text style={[styles.toggleText, { color: activeGroup === '252' ? '#FFF' : theme.subText }]}>
                            252 Vaishnav
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.toggleBtn, activeGroup === '84' && { backgroundColor: theme.devotionalPrimary }]}
                        onPress={() => handleToggle('84')}
                    >
                        <Text style={[styles.toggleText, { color: activeGroup === '84' ? '#FFF' : theme.subText }]}>
                            84 Vaishnav
                        </Text>
                    </TouchableOpacity>
                </GlassView>
            </View>

            {renderContent()}
        </View>
    );
};

const styles = StyleSheet.create({
    screen: { flex: 1 },
    toggleContainer: { paddingHorizontal: 24, marginVertical: 16 },
    toggleWrapper: {
        flexDirection: 'row',
        borderRadius: 16,
        padding: 4,
        overflow: 'hidden',
    },
    toggleBtn: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 12,
    },
    toggleText: { fontWeight: '700', fontSize: 14 },
    listContainer: { paddingHorizontal: 24, paddingBottom: 40 },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        marginBottom: 12,
        borderRadius: 20,
        borderWidth: 1,
    },
    cardIndexContainer: {
        width: 40,
        height: 40,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
        backgroundColor: 'rgba(0,0,0,0.03)',
    },
    cardIndex: { fontSize: 14, fontWeight: '700' },
    cardContent: { flex: 1 },
    cardTitle: { fontSize: 16, fontWeight: '700', marginBottom: 2 },
    cardSub: { fontSize: 12 },
    iconBox: {
        width: 32,
        height: 32,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default VartaListScreen;