import { Moon, PartyPopper, Sparkle, Sun, Sunrise, Sunset } from 'lucide-react-native';

// --- THEME ---

export const PALETTE = {
  light: {
    bg: '#F5F5F7', // iOS System Gray 6
    card: '#FFFFFF',
    text: '#1C1C1E',
    subText: '#8E8E93',
    primary: '#007AFF',
    devotionalPrimary: '#1E3A8A', // Deep Royal Blue
    devotionalSecondary: '#3B82F6', // Lighter Blue
    accent: '#F59E0B', // Warm Gold
    border: 'rgba(0,0,0,0.06)',
    surface: '#FFFFFF',
    glass: 'rgba(255, 255, 255, 0.95)',
    inputBg: 'rgba(118, 118, 128, 0.08)',
    heroGradient: ['#1E3A8A', '#2563EB'],
    shadow: 'rgba(0, 0, 0, 0.08)',
  },
  dark: {
    bg: '#000000',
    card: '#1C1C1E', // iOS System Gray 6 Dark
    text: '#FFFFFF',
    subText: '#98989D',
    primary: '#0A84FF',
    devotionalPrimary: '#60A5FA', // Softer Blue for Dark Mode
    devotionalSecondary: '#3B82F6',
    accent: '#FCD34D', // Light Gold
    border: 'rgba(255,255,255,0.12)',
    surface: '#1C1C1E',
    glass: 'rgba(28, 28, 30, 0.95)',
    inputBg: 'rgba(118, 118, 128, 0.24)',
    heroGradient: ['#172554', '#1E40AF'],
    shadow: 'rgba(0, 0, 0, 0.3)',
  },
};

// --- DATA ---

export const CATEGORIES = [
  { id: '1', title: 'Mangala', icon: Sunrise },
  { id: '2', title: 'Rajbhog', icon: Sun },
  { id: '3', title: 'Sandhya', icon: Sunset },
  { id: '4', title: 'Shayan', icon: Moon },
  { id: '5', title: 'Utsav', icon: PartyPopper },
  { id: '6', title: 'Stuti', icon: Sparkle },
];

const INITIAL_AARTI_DATA = [
  {
    id: 'a1',
    title: 'Mangala Aarti',
    subtitle: 'Shrinathji Temple',
    category: 'Mangala',
    isFavorite: true,
    content: {
      gujarati: `"આરતી શ્રી નાથજીની મંગળા કરી ... પ્રભુ મંગળા કરી\nશંખ વાગ્યા શ્રી નાથજી જાગ્યા ઉતાવળ કરી,\nપ્રભુ ઉતાવળ કરી... ...આરતી\n\nનિરખતા મુખારવિંદ (૨) શોચના કરી,\nપ્રભુ ઝારીજી ભર્યા...આરતી\nવસ્ત્ર અંગીકાર કર્યા (૨) ઝારીજી ભર્યા,\n\nપ્રભુ ઝારીજી ભર્યા... ..આરતી\nમાથે મુગટ કાને કુંડળ (૨) મોરલી ધરી\nપ્રભુ ઝારીજી ભર્યા... ...આરતી\n\nમાથે મુકટ કાને કુંડળ (૨) મોરલી ધરી,\nપ્રભુ હીરલે જડી... ...આરતી\nધનન ઘનન ઘંટા વાગે (૨) ઝાલરી ઘણી,\n\nપ્રભુ ઝાલરી ઘણી... ...આરતી\nતાલને મૃદંગ વાગે (૨) વાગે વેણુ વાંસણી,\nપ્રભુ વાગે વેણુ વાંસણી... ...આરતી\n\nદાસ જાણીને દર્શન દેજો (૨) દયા તો કરી,\nપ્રભુ કૃપા તો કરી... ...આરતી\nનમી નમીને પાય લાગુ (૨) અંતરમાં ધરી,\n\nપ્રભુ અંતરમાં ધરી... ..આરતી"`,
      english: `Mangala Aarti Shrinathjini, Mangle kar darshan \nVallabh kul ma vhala lago, Vaishnav na jivan \n\nJai Dev Jai Dev Jai Mangalkari \nShri Yamunajini aarti, saune chhe pyari \n\nDarshan karine dhanya thaya, man ma harakh may \nDas dayana swami shamaliya, charne shish namay`,
      meaning: `Aarti of Shrinathji during Mangala time. \nBy having darshan, the day becomes auspicious. \nYou are beloved in the lineage of Vallabh, and the life of Vaishnavs.`,
    },
  },
  {
    id: 'a2',
    title: 'Yamunashtak',
    subtitle: 'Mahaprabhuji',
    category: 'Stotra',
    isFavorite: false,
    content: {
      gujarati: `નમામિ યમુનામહં સકલ સિદ્ધિ હેતું મુદા \nમુરારિ પદ પંકજ સ્ફુરદમંદ રેણુત્કટામ \nતટસ્થ નવ કાનન પ્રકટ મોદ પુષ્પાંબુના \nસુરાસુર સુપૂજિત સ્મર પિતુઃ શ્રિયં બિભ્રતીમ`,
      english: `Namami Yamunamaham Sakala Siddhi Hetum Muda \nMurari Pada Pankaja Sfuradamanda Renutkatam \nTatastha Nav Kanana Prakata Moda Pushpambuna \nSurasura Supujita Smara Pituh Shriyam Bibhratim`,
      meaning: `I bow to Sri Yamuna, the bestower of all spiritual powers. \nHer banks are covered with the dust from the lotus feet of Murari (Krishna).`,
    },
  },
  {
    id: 'a3',
    title: 'Rajbhog Aarti',
    subtitle: 'Nitya Niyam',
    category: 'Rajbhog',
    isFavorite: false,
    content: {
      gujarati: `જય જય શ્રી ગોકુલેશ, જય જય શ્રી ગોકુલેશ \nપરમ કૃપાળુ નાથ, વલ્લભ વંશ વિભૂષણ`,
      english: `Jay Jay Shree Gokulesh, Jay Jay Shree Gokulesh \nParam krupalu nath, Vallabh vansh vibhushan`,
      meaning: `Glory to the Lord of Gokul. \nThe most merciful Lord, the ornament of the lineage of Vallabh.`,
    },
  },
];

export default INITIAL_AARTI_DATA
