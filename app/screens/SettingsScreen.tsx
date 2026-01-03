import {
  Bell,
  ChevronLeft,
  CircleHelp,
  FileText,
  Moon,
  Play,
  Sun,
  Type
} from 'lucide-react-native';
import {
  Alert,
  Image,
  Linking,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

// Custom Components
import Header from '@/components/Header';
import { styles } from '@/styles';

interface SettingsScreenProps {
  theme: any;
  isDark: boolean;
  toggleTheme: () => void;
  toggleNotification: () => void;
  notificationsEnabled: boolean;
  playerEnabled: boolean;
  togglePlayer: () => void;
  textSizeMode: string;
  onCycleTextSize: () => void;
}

const SettingsScreen = ({ 
  theme, 
  isDark, 
  toggleTheme, 
  textSizeMode, 
  onCycleTextSize,
  notificationsEnabled,
  playerEnabled,
  togglePlayer,
  toggleNotification
}: SettingsScreenProps) => {
  // const [notifications, setNotifications] = useState(true);
  const url = "https://priyank.space/privacy-policy/pushtimarg";

  const handlePress = async () => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };

  return (
    <View style={[styles.screen, { backgroundColor: theme.bg }]}>
      <Header title="Settings" theme={theme} />
      <ScrollView style={styles.settingsContainer} contentContainerStyle={{ paddingBottom: 130 }}>
        
        {/* APPEARANCE */}
        <View style={styles.settingGroupTitle}>
          <Text style={[styles.groupTitleText, { color: theme.subText }]}>APPEARANCE</Text>
        </View>

        <View style={[styles.settingSection, { backgroundColor: theme.card, borderColor: theme.border, borderWidth: 1 }]}>
          <View style={[styles.settingRow, { borderBottomColor: theme.border, borderBottomWidth: 1 }]}>
            <View style={styles.settingLabel}>
              <View style={[styles.settingIcon, { backgroundColor: theme.inputBg }]}>
                {isDark ? <Moon color={theme.text} size={20} /> : <Sun color={theme.text} size={20} />}
              </View>
              <Text style={[styles.settingText, { color: theme.text }]}>Dark Mode</Text>
            </View>
            <Switch 
              value={isDark} 
              onValueChange={toggleTheme} 
              trackColor={{ false: '#E9E9EA', true: theme.devotionalPrimary }}
              thumbColor={'#FFF'}
              ios_backgroundColor="#E9E9EA"
            />
          </View>
          
          <TouchableOpacity style={styles.settingRow} onPress={onCycleTextSize}>
            <View style={styles.settingLabel}>
              <View style={[styles.settingIcon, { backgroundColor: theme.inputBg }]}>
                <Type color={theme.text} size={20} />
              </View>
              <Text style={[styles.settingText, { color: theme.text }]}>Text Size</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
               <Text style={{ color: theme.subText, fontSize: 16, marginRight: 8 }}>{textSizeMode}</Text>
               <ChevronLeft color={theme.subText} size={16} style={{transform: [{rotate: '180deg'}]}} />
            </View>
          </TouchableOpacity>
        </View>

        {/* GENERAL (Notifications) */}
        <View style={styles.settingGroupTitle}>
          <Text style={[styles.groupTitleText, { color: theme.subText }]}>GENERAL</Text>
        </View>

      <View style={[styles.settingSection, { backgroundColor: theme.card, borderColor: theme.border, borderWidth: 1 }]}>
        {/* <View style={[styles.settingSection, { backgroundColor: theme.card, borderColor: theme.border, borderWidth: 1 }]}> */}
        <View style={[styles.settingRow, { borderBottomColor: theme.border, borderBottomWidth: 1 }]}>
            <View style={styles.settingLabel}>
              <View style={[styles.settingIcon, { backgroundColor: theme.inputBg }]}>
                <Bell color={theme.text} size={20} />
              </View>
              <Text style={[styles.settingText, { color: theme.text }]}>Notifications</Text>
            </View>
            <Switch 
              value={notificationsEnabled} 
              onValueChange={toggleNotification} 
              trackColor={{ false: '#E9E9EA', true: theme.devotionalPrimary }}
              thumbColor={'#FFF'}
              ios_backgroundColor="#E9E9EA"
            />
          </View>
        {/* </View> */}
        {/* <View style={[styles.settingSection, { backgroundColor: theme.card, borderColor: theme.border, borderWidth: 1 }]}> */}
          <View style={styles.settingRow}>
            <View style={styles.settingLabel}>
              <View style={[styles.settingIcon, { backgroundColor: theme.inputBg }]}>
                <Play color={theme.text} size={20} />
              </View>
              <Text style={[styles.settingText, { color: theme.text }]}>Floating Player</Text>
            </View>
            <Switch 
              value={playerEnabled} 
              onValueChange={togglePlayer} 
              trackColor={{ false: '#E9E9EA', true: theme.devotionalPrimary }}
              thumbColor={'#FFF'}
              ios_backgroundColor="#E9E9EA"
            />
          </View>
        {/* </View> */}
        </View>

        {/* SUPPORT & LEGAL */}
        <View style={styles.settingGroupTitle}>
          <Text style={[styles.groupTitleText, { color: theme.subText }]}>SUPPORT & LEGAL</Text>
        </View>

        <View style={[styles.settingSection, { backgroundColor: theme.card, borderColor: theme.border, borderWidth: 1 }]}>
          <TouchableOpacity style={[styles.settingRow, { borderBottomColor: theme.border, borderBottomWidth: 1 }]}>
            <View style={styles.settingLabel}>
              <View style={[styles.settingIcon, { backgroundColor: theme.inputBg }]}>
                <CircleHelp color={theme.text} size={20} />
              </View>
              <Text style={[styles.settingText, { color: theme.text }]}>FAQs</Text>
            </View>
            <ChevronLeft color={theme.subText} size={16} style={{transform: [{rotate: '180deg'}]}} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingRow} onPress={handlePress}>
            <View style={styles.settingLabel}>
              <View style={[styles.settingIcon, { backgroundColor: theme.inputBg }]}>
                <FileText color={theme.text} size={20} />
              </View>
              <Text style={[styles.settingText, { color: theme.text }]}>Privacy Policy</Text>
            </View>
            <ChevronLeft color={theme.subText} size={16} style={{transform: [{rotate: '180deg'}]}} />
          </TouchableOpacity>
        </View>

        {/* ABOUT */}
        <View style={styles.settingGroupTitle}>
          <Text style={[styles.groupTitleText, { color: theme.subText }]}>ABOUT</Text>
        </View>

        <View style={[styles.settingSection, { backgroundColor: theme.card, borderColor: theme.border, borderWidth: 1 }]}>
           <View style={{ padding: 20 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                 <View style={{ width: 48, height: 48, borderRadius: 12, backgroundColor: theme.devotionalPrimary, alignItems: 'center', justifyContent: 'center', marginRight: 16, overflow: 'hidden' }}>
                    <Image 
                      source={require('../../assets/icons/playstore-icon.png')}
                      style={{ width: '100%', height: '100%' }}
                      resizeMode="cover"
                    />
                 </View>
                 <View>
                   <Text style={[styles.cardTitle, { color: theme.text, fontSize: 18 }]}>Pushtimarg</Text>
                   <Text style={[styles.cardSubtitle, { color: theme.subText }]}>v1.0.0 (Beta)</Text>
                 </View>
              </View>
              <Text style={{ color: theme.subText, lineHeight: 22, fontSize: 15 }}>
                Designed with devotion for the Vaishnav community. May this app aid in your daily Nitya Niyam.
              </Text>
           </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;