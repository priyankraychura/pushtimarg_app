import { useNavigation } from '@react-navigation/native';
import { Search, X } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import {
	FlatList,
	KeyboardAvoidingView,
	Platform,
	RefreshControl, // <--- 1. IMPORT ADDED
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from 'react-native';

// Custom Components
import AartiCard from '@/components/AartiCard';
import CategoryChip from '@/components/CategoryChip';
import Header from '@/components/Header';
import Loader from '@/components/Loader';
import { CATEGORIES } from '@/constants';
import { styles } from '@/styles';

// Redux
import { useAppDispatch } from '@/redux/hooks';

interface AartiListScreenProps {
    theme: any;
    data: any[];
    favoriteIds: string[];
    onToggleFavorite: (id: string) => void;
    initialFilter?: string;
    onOpenAarti: (item: any) => void;
    // --- 2. NEW PROPS ADDED ---
    refreshing: boolean;
    onRefresh: () => void;
}

const AartiListScreen = ({
    theme,
    data,
    favoriteIds,
    onToggleFavorite,
    initialFilter,
    onOpenAarti,
    refreshing, // <--- Destructure new prop
    onRefresh,  // <--- Destructure new prop
}: AartiListScreenProps) => {
    const navigation = useNavigation<any>();
    const dispatch = useAppDispatch();

    const [activeFilter, setActiveFilter] = useState(initialFilter || 'All');
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [filteredData, setFilteredData] = useState(data);

    useEffect(() => {
        if (initialFilter) {
            handleFilterChange(initialFilter);
        }
    }, [initialFilter]);

    // Effect to handle filtering with debounce/delay for loader
    useEffect(() => {
        // Only show local loader if we are NOT pulling to refresh
        if (!refreshing) setIsLoading(true);
        
        const timer = setTimeout(() => {
            const newData = data.filter((item: any) => {
                const matchesCategory =
                    activeFilter === 'All' || item.category === activeFilter;
                const matchesSearch =
                    searchQuery === '' ||
                    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
                return matchesCategory && matchesSearch;
            });
            setFilteredData(newData);
            setIsLoading(false);
        }, 300);

        return () => clearTimeout(timer);
    }, [activeFilter, searchQuery, data, refreshing]);

    const handleFilterChange = (filter: string) => {
        setActiveFilter(filter);
    };

    const toggleSearch = () => {
        if (isSearchVisible) {
            setSearchQuery('');
            setIsSearchVisible(false);
        } else {
            setIsSearchVisible(true);
        }
    };

    const filterOptions = [{ id: 'all_default', title: 'All' }, ...CATEGORIES];

    return (
        <View style={[styles.screen, { backgroundColor: theme.bg }]}>
            <Header
                title='Library'
                theme={theme}
                rightAction={
                    <TouchableOpacity
                        style={[styles.iconButton, { backgroundColor: theme.inputBg }]}
                        onPress={toggleSearch}
                    >
                        {isSearchVisible ? (
                            <X color={theme.text} size={20} />
                        ) : (
                            <Search color={theme.text} size={20} />
                        )}
                    </TouchableOpacity>
                }
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                {/* Search Input Area */}
                {isSearchVisible && (
                    <View style={{ paddingHorizontal: 20, paddingBottom: 10 }}>
                        <View
                            style={[
                                styles.searchBar,
                                { backgroundColor: theme.card, borderColor: theme.border },
                            ]}
                        >
                            <Search color={theme.subText} size={18} />
                            <TextInput
                                style={[styles.searchInput, { color: theme.text }]}
                                placeholder='Search by title...'
                                placeholderTextColor={theme.subText}
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                                autoFocus
                            />
                        </View>
                    </View>
                )}

                {/* Filter Chips */}
                <View style={{ height: 60, marginVertical: 8 }}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.chipContainer}
                    >
                        {filterOptions.map((cat) => (
                            <CategoryChip
                                key={cat.title}
                                title={cat.title}
                                active={activeFilter === cat.title}
                                onPress={() => {
                                    handleFilterChange(cat.title);
                                }}
                                theme={theme}
                            />
                        ))}
                    </ScrollView>
                </View>

                {/* Main List */}
                {isLoading && !refreshing ? ( // Hide local loader if pulling to refresh
                    <View
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                    >
                        <Loader theme={theme} size='large' />
                    </View>
                ) : (
                    <FlatList
                        data={filteredData}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={[
                            styles.listContainer,
                            { paddingBottom: 130 },
                        ]}
                        // --- 3. REFRESH CONTROL ADDED HERE ---
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                                tintColor={theme.devotionalPrimary || theme.text} // iOS Spinner Color
                                colors={[theme.devotionalPrimary || theme.text]}  // Android Spinner Color
                            />
                        }
                        renderItem={({ item }: { item: any }) => {
                            const isFav = favoriteIds.includes(item.id);
                            return (
                                <AartiCard
                                    item={item}
                                    onPress={onOpenAarti}
                                    onToggleFavorite={onToggleFavorite}
                                    isFavorite={isFav}
                                    theme={theme}
                                />
                            );
                        }}
                        ListEmptyComponent={
                            <View
                                style={{ alignItems: 'center', marginTop: 40, opacity: 0.6 }}
                            >
                                <Text style={{ color: theme.subText }}>No results found</Text>
                            </View>
                        }
                        initialNumToRender={10}
                        maxToRenderPerBatch={10}
                        windowSize={5}
                    />
                )}
            </KeyboardAvoidingView>
        </View>
    );
};

export default AartiListScreen;