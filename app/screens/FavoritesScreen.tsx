import { useNavigation } from '@react-navigation/native';
import { Heart } from 'lucide-react-native';
import React, { useMemo } from 'react';
import { RefreshControl, ScrollView, Text, View } from 'react-native'; // <--- Import RefreshControl

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
    const navigation = useNavigation<any>();
    const dispatch = useAppDispatch();

    const favoriteData = useMemo(() => {
        return data.filter((item) => favoriteIds.includes(item.id));
    }, [favoriteIds, data]); // Added 'data' dependency

    const handleToggleFavorite = (id: string) => {
        dispatch(toggleFavorite(id));
    };

    return (
        <View style={[styles.screen, { backgroundColor: theme.bg }]}>
            <Header title='Favorites' theme={theme} />
            
            {/* WRAP EVERYTHING IN SCROLLVIEW SO PULL-TO-REFRESH WORKS EVEN IF EMPTY */}
            <ScrollView
                contentContainerStyle={[
                    styles.listContainer,
                    { paddingBottom: 130, paddingTop: 20, flexGrow: 1 } // flexGrow ensures full height for empty state
                ]}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor={theme.devotionalPrimary || theme.text}
                        colors={[theme.devotionalPrimary || theme.text]}
                    />
                }
            >
                {favoriteData.length > 0 ? (
                    // --- SHOW FAVORITES ---
                    favoriteData.map((item: any) => {
                        const isFav = favoriteIds.includes(item.id);
                        return (
                            <AartiCard
                                key={item.id}
                                item={item}
                                isFavorite={isFav}
                                onPress={onOpenAarti}
                                onToggleFavorite={handleToggleFavorite}
                                theme={theme}
                            />
                        );
                    })
                ) : (
                    // --- SHOW EMPTY STATE ---
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', minHeight: 300 }}>
                        <Heart size={48} color={theme.subText} strokeWidth={1} />
                        <Text style={[styles.emptyStateText, { color: theme.text, marginTop: 10 }]}>
                            No favorites yet
                        </Text>
                        <Text style={{ color: theme.subText, fontSize: 12, marginTop: 5 }}>
                            (Pull down to refresh)
                        </Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

export default FavoritesScreen;