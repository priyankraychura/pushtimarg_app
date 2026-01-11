import { Heart } from 'lucide-react-native';
import React, { useCallback, useMemo } from 'react';
import { FlatList, RefreshControl, Text, View } from 'react-native';

import AartiCard from '@/components/AartiCard';
import Header from '@/components/Header';
import { useAppDispatch } from '@/redux/hooks';
import { toggleFavorite } from '@/redux/slices/userSlice';
import { styles } from '@/styles';

interface FavoritesScreenProps {
    theme: any;
    favoriteIds: string[];
    data: any[];
    onOpenAarti: (item: any) => void;
    // --- NEW PROPS ---
    refreshing: boolean;
    onRefresh: () => void;
}

const FavoritesScreen = ({ 
    theme, 
    favoriteIds, 
    data, 
    onOpenAarti,
    refreshing, 
    onRefresh 
}: FavoritesScreenProps) => {

    const dispatch = useAppDispatch();

    const favoriteData = useMemo(() => {
        return data.filter((item) => favoriteIds.includes(item.id));
    }, [favoriteIds, data]);

    const handleToggleFavorite = useCallback((id: string) => {
        dispatch(toggleFavorite(id));
    }, [dispatch]);

    const renderItem = useCallback(({ item }: { item: any }) => {
        const isFav = favoriteIds.includes(item.id);
        return (
            <AartiCard
                item={item}
                isFavorite={isFav}
                onPress={onOpenAarti}
                onToggleFavorite={handleToggleFavorite}
                theme={theme}
            />
        );
    }, [favoriteIds, onOpenAarti, handleToggleFavorite, theme]);

    const ListEmptyComponent = useMemo(() => (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', minHeight: 300 }}>
            <Heart size={48} color={theme.subText} strokeWidth={1} />
            <Text style={[styles.emptyStateText, { color: theme.text, marginTop: 10 }]}>
                No favorites yet
            </Text>
            <Text style={{ color: theme.subText, fontSize: 12, marginTop: 5 }}>
                (Pull down to refresh)
            </Text>
        </View>
    ), [theme]);

    return (
        <View style={[styles.screen, { backgroundColor: theme.bg }]}>
            <Header title='Favorites' theme={theme} />
            
            <FlatList
                data={favoriteData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={[
                    styles.listContainer,
                    { paddingBottom: 130, paddingTop: 20, flexGrow: 1 }
                ]}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor={theme.devotionalPrimary || theme.text}
                        colors={[theme.devotionalPrimary || theme.text]}
                    />
                }
                ListEmptyComponent={ListEmptyComponent}
            />
        </View>
    );
};

export default FavoritesScreen;