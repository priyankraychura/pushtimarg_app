import GlassView from '@/components/GlassView';
import Header from '@/components/Header';
import { VARTA_DATA, Vaishnav } from '@/content/vartaData';
import { useNavigation } from '@react-navigation/native';
import { ChevronRight } from 'lucide-react-native';
import { useState } from 'react';
import {
	FlatList,
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
	const [activeGroup, setActiveGroup] = useState<'84' | '252'>('84');

	const filteredData = VARTA_DATA.filter((v) => v.group === activeGroup);

	const handleToggle = (group: '84' | '252') => {
		setActiveGroup(group);
	};

	return (
		<View style={[styles.screen, { backgroundColor: theme.bg }]}>
			<Header
				title='Vaishnav Varta'
				theme={theme}
			/>

			{/* Segmented Toggle */}
			<View style={styles.toggleContainer}>
				<GlassView theme={theme} style={styles.toggleWrapper}>
					<TouchableOpacity
						style={[
							styles.toggleBtn,
							activeGroup === '84' && {
								backgroundColor: theme.devotionalPrimary,
							},
						]}
						onPress={() => handleToggle('84')}
					>
						<Text
							style={[
								styles.toggleText,
								{ color: activeGroup === '84' ? '#FFF' : theme.subText },
							]}
						>
							84 Vaishnav
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[
							styles.toggleBtn,
							activeGroup === '252' && {
								backgroundColor: theme.devotionalPrimary,
							},
						]}
						onPress={() => handleToggle('252')}
					>
						<Text
							style={[
								styles.toggleText,
								{ color: activeGroup === '252' ? '#FFF' : theme.subText },
							]}
						>
							252 Vaishnav
						</Text>
					</TouchableOpacity>
				</GlassView>
			</View>

			<FlatList
				data={filteredData}
				keyExtractor={(item) => item.id}
				contentContainerStyle={styles.listContainer}
				renderItem={({ item }: { item: Vaishnav }) => (
					<TouchableOpacity
						activeOpacity={0.8}
						onPress={() => navigation.navigate('VartaDetail', { vaishnav: item })}
						style={[
							styles.card,
							{ backgroundColor: theme.card, borderColor: theme.border },
						]}
					>
						<View style={styles.cardIndexContainer}>
							<Text style={[styles.cardIndex, { color: theme.subText }]}>
								#{item.index}
							</Text>
						</View>

						<View style={styles.cardContent}>
							<Text style={[styles.cardTitle, { color: theme.text }]}>
								{item.name}
							</Text>
							<Text
								style={[styles.cardSub, { color: theme.subText }]}
								numberOfLines={1}
							>
								{item.prasangs.length} Prasangs
							</Text>
						</View>

						<View style={[styles.iconBox, { backgroundColor: theme.inputBg }]}>
							<ChevronRight color={theme.subText} size={20} />
						</View>
					</TouchableOpacity>
				)}
				initialNumToRender={10}
				maxToRenderPerBatch={10}
				windowSize={5}
			/>
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
