import { styles } from "@/styles";
import { ActivityIndicator, Text, useColorScheme, View } from "react-native";

// 2. Update Loading Screen to be Theme-Aware
const LoadingScreen = () => {
  const scheme = useColorScheme(); // Returns 'light' or 'dark'
  const isDark = scheme === 'dark';

  return (
    <View style={[
      styles.loadingContainer, 
      { backgroundColor: isDark ? '#121212' : '#ffffff' } // Dynamic background
    ]}>
      <ActivityIndicator 
        size="large" 
        color={isDark ? '#ffffff' : '#0000ff'} // Dynamic spinner color
      />
      <Text style={[
        styles.loadingText, 
        { color: isDark ? '#ffffff' : '#333333' } // Dynamic text color
      ]}>
        Loading settings...
      </Text>
    </View>
  );
};

export default LoadingScreen;