import { Dimensions, Platform, StatusBar, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  mainContent: {
    flex: 1,
  },
  screen: {
    flex: 1,
  },

  // Onboarding
  onboardingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    position: 'relative',
    overflow: 'hidden',
  },
  decorativeCircle: {
    position: 'absolute',
    borderRadius: 999,
  },
  onboardingContent: {
    alignItems: 'center',
    width: '100%',
    zIndex: 2,
  },
  logoContainer: {
    marginBottom: 48,
    width: 120,
    height: 120,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 12,
  },
  onboardingTitle: {
    fontSize: 40,
    fontWeight: '800',
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 48,
  },
  onboardingSubtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 56,
    lineHeight: 28,
    paddingHorizontal: 20,
  },
  primaryButton: {
    paddingVertical: 20,
    paddingHorizontal: 32,
    width: '100%',
    borderRadius: 28,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
    letterSpacing: 0.5,
  },

  // Headers
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    zIndex: 10,
    height: 80, // Fixed height for animation math
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 2,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
    borderRadius: 50,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Home Specifics
  homeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 24,
  },
  greeting: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 6,
  },
  greetingName: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  profileIcon: {
    width: 48,
    height: 48,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Sections
  title: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 16, marginTop: 10
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 32,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.4,
  },
  sectionAction: {
    fontSize: 14,
    fontWeight: '700',
  },

  // Tithi Card
  tithiCard: {
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  tithiRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  tithiMain: {
    flex: 1,
  },
  samvatText: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  tithiText: {
    fontSize: 22,
    fontWeight: '800',
    marginTop: 2,
    letterSpacing: -0.5,
  },
  festivalText: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  tithiSide: {
    alignItems: 'flex-end',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  sunRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  sunTime: {
    fontSize: 12,
    fontWeight: '600',
  },

  // Hero Card
  heroCard: {
    marginHorizontal: 24,
    borderRadius: 32,
    padding: 20,
    height: 150,
    justifyContent: 'space-between',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.25,
    shadowRadius: 30,
    elevation: 16,
    position: 'relative',
    overflow: 'hidden',
  },
  heroContent: {
    zIndex: 2,
  },
  heroBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
    alignSelf: 'flex-start',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)'
  },
  heroBadgeText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  heroTitle: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  heroSub: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22,
  },
  heroPlay: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    zIndex: 1,
  },

  // Categories
  horizontalScroll: {
    paddingLeft: 24,
    paddingRight: 12,
  },
  categoryCard: {
    width: 105,
    height: 120,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  catIcon: {
    width: 52,
    height: 52,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  catText: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.2,
  },

  // Lists
  listContainer: {
    paddingHorizontal: 24,
  },
  card: {
    borderRadius: 24,
    marginBottom: 16,
    padding: 18,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
  },
  cardContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIconBox: {
    width: 56,
    height: 56,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 18,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  cardSubtitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  cardAction: {
    paddingLeft: 12,
  },
  favoriteBtn: {
    padding: 12,
    borderRadius: 50,
  },

  // Chips
  chipContainer: {
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  chip: {
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 100,
    marginRight: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  chipText: {
    fontSize: 14,
  },

  // Search
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 50,
    borderRadius: 16,
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    height: '100%',
    marginLeft: 10,
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContainer: {
    width: width * 0.9,
    maxWidth: 400,
    borderRadius: 32,
    padding: 24,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 40,
    elevation: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '800',
  },
  modalCloseBtn: {
    padding: 4,
  },
  modalBody: {
    gap: 16,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 56,
    borderRadius: 16,
  },
  modalInput: {
    flex: 1,
    fontSize: 16,
    height: '100%',
  },
  saveButton: {
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },

  // Reader Detail
  segmentContainer: {
    flexDirection: 'row',
    padding: 5,
    marginHorizontal: 24,
    marginVertical: 20,
    borderRadius: 20,
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 16,
  },
  segmentText: {
    fontSize: 13,
  },
  readerContent: {
    flex: 1,
    paddingHorizontal: 32,
  },
  readerHeader: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 40,
  },
  readerTitle: {
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  lyricsText: {
    fontWeight: '400',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  divider: {
    height: 4,
    width: 48,
    borderRadius: 4,
    marginTop: 20,
    opacity: 0.3,
  },
  endMark: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  fontSizeDropdown: {
    position: 'absolute',
    top: 65, // Just below the header
    right: 30, // Aligned with the Type icon
    width: 140,
    borderRadius: 12,
    padding: 8,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 10,
  },
  fontSizeDropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 2
  },

  // Settings
  settingsContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  settingGroupTitle: {
    marginTop: 28,
    marginBottom: 10,
    paddingLeft: 12,
  },
  groupTitleText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  settingSection: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
    minHeight: 60,
  },
  settingLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  settingIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 17,
    fontWeight: '600',
  },

  // Navigation
  bottomNavContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingBottom: Platform.OS === 'ios' ? 34 : 24,
  },
  bottomNavInner: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: width - 48,
    borderRadius: 32,
    paddingVertical: 14,
    paddingHorizontal: 12,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 20,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
  },
  navIconContainer: {
    padding: 8,
    borderRadius: 14,
    overflow: 'hidden', // Ensures border radius persists on active state
  },
  navLabel: {
    fontSize: 10,
    fontWeight: '700',
    marginTop: 2,
  },

  // Empty States
  emptyStateIcon: {
    width: 100,
    height: 100,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyStateText: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 12,
  },
  emptyStateSub: {
    fontSize: 16,
    textAlign: 'center',
    maxWidth: 260,
    lineHeight: 24,
  },

  // --- NEW: Mini Player (Replaces old audioBar) ---
  miniPlayerContainer: {
    position: 'absolute',
    bottom: 34,
    left: 16,
    right: 16,
    borderRadius: 32,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 20,
    overflow: 'hidden',
  },
  miniPlayerInner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingRight: 16,
  },
  miniPlayerVideoWrapper: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  miniPlayerInfo: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
    justifyContent: 'center',
  },
  miniPlayerTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  miniPlayerArtist: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  miniPlayerControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  controlBtnSmall: {
    padding: 8,
  },
  controlBtnMain: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },

  // Vart Read Screen
  // Popover Styles
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 60
  },
  content: {
    fontWeight: '400',
    textAlign: 'justify'
  }, // Justified text for Varta

  footer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
    opacity: 0.8
  },
  navFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },
  vartaDivider: {
    height: 4,
    width: 40,
    borderRadius: 2,
    marginBottom: 24,
    opacity: 0.8
  },

  popover: {
    position: 'absolute',
    top: 65,
    right: 20,
    width: 180,
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    zIndex: 100,
    elevation: 5,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  fontControlRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  controlBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sizeDisplay: {
    alignItems: 'center',
  },
  sizeText: {
    fontSize: 18,
    fontWeight: '700',
  },
  pxText: {
    fontSize: 10,
    fontWeight: '500',
    marginTop: -2
  },
});
