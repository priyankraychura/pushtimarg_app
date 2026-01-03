import { DownloadCloud, ShieldAlert, Sparkles } from 'lucide-react-native';
import { Dimensions, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// Assuming GlassView component export is named correctly or adapt import
// If GlassView is not exported as default, change import { GlassView } ...

const { width } = Dimensions.get('window');

interface ForceUpdateScreenProps {
  storeUrl: string;
  theme: any;
}

const ForceUpdateScreen = ({ storeUrl, theme }: ForceUpdateScreenProps) => {
  const handleUpdate = () => {
    if (storeUrl) {
      Linking.openURL(storeUrl);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      {/* Decorative Background Elements */}
      <View style={[styles.circle, { backgroundColor: theme.devotionalPrimary, opacity: 0.08, top: -100, right: -80 }]} />
      <View style={[styles.circle, { backgroundColor: theme.accent, opacity: 0.06, bottom: -60, left: -60 }]} />

      <View style={styles.content}>
        {/* Main Icon */}
        <View style={[styles.iconContainer, { backgroundColor: theme.inputBg }]}>
          <DownloadCloud size={64} color={theme.devotionalPrimary} strokeWidth={1.5} />
        </View>

        <Text style={[styles.title, { color: theme.text }]}>Major Update Required</Text>
        
        <Text style={[styles.subtitle, { color: theme.subText }]}>
          We've updated Pushtimarg Aarti with significant improvements. Please update to the latest version to continue using the app.
        </Text>

        {/* Benefits Card */}
        <View style={[styles.infoCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <View style={styles.featureRow}>
            <Sparkles size={20} color={theme.accent} />
            <Text style={[styles.featureText, { color: theme.text }]}>New Features & Content</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.featureRow}>
            <ShieldAlert size={20} color={theme.devotionalPrimary} />
            <Text style={[styles.featureText, { color: theme.text }]}>Critical Security Fixes</Text>
          </View>
        </View>

        {/* Action Button */}
        <TouchableOpacity
          style={[styles.updateButton, { backgroundColor: theme.devotionalPrimary }]}
          onPress={handleUpdate}
          activeOpacity={0.9}
        >
          <Text style={styles.buttonText}>Update Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  circle: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
  },
  content: {
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
    paddingHorizontal: 10,
  },
  infoCard: {
    width: '100%',
    padding: 20,
    borderRadius: 24,
    marginBottom: 32,
    borderWidth: 1,
    opacity: 0.9,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 4,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.05)',
    marginVertical: 12,
  },
  featureText: {
    fontSize: 15,
    fontWeight: '600',
  },
  updateButton: {
    width: '100%',
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});

export default ForceUpdateScreen;