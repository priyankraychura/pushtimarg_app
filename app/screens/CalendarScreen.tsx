import { GujaratiCalendar } from '@/components/GujaratiCalendar';
import Header from '@/components/Header';
import Loader from '@/components/Loader';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { InteractionManager, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

interface CalendarScreenProps {
  theme: any;
}

export default function CalendarScreen({theme}: CalendarScreenProps) {
  const navigation = useNavigation();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const task = InteractionManager.runAfterInteractions(() => {
      setIsReady(true);
    });

    return () => task.cancel();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      <SafeAreaView style={{flex: 1}}>
        <Header
            title="Panchang" 
            // onBack={() => navigation.goBack()} 
            theme={theme}
        />
        
        <ScrollView 
            contentContainerStyle={styles.scrollContent} 
            showsVerticalScrollIndicator={false}
            
        >
            <View style={styles.content}>
                {isReady ? (
                    <GujaratiCalendar theme={theme}/>
                ) : (
                    <View style={{ height: 400, justifyContent: 'center', alignItems: 'center' }}>
                        <Loader theme={theme} size="large" />
                    </View>
                )}
            </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 130,
  },
  content: {
    paddingTop: 10,
    padding: 24,
  }
});