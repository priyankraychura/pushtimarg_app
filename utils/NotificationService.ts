import * as Notifications from 'expo-notifications';
import { getUpcomingAgiyaras } from './calendarLogic';

// --- CONFIGURATION ---

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

// --- MESSAGES ---

const getMessageForPaksha = (paksha: 'Sud' | 'Vad', gujMonth: string) => {
  const greeting = "Jay Shree Krishna! 🙏";

  const messages = [
    `${greeting} Tomorrow is ${paksha} Agiyaras of ${gujMonth} month. A perfect day for fasting and remembering Thakorji.`,
    `${greeting} Prepare for ${paksha} Agiyaras tomorrow. "Fasting is not just of the body, but of the senses."`,
    `${greeting} Tomorrow is a holy Agiyaras. May your devotion brings you closer to Prabhu.`,
  ];

  return messages[Math.floor(Math.random() * messages.length)];
};

// --- CORE FUNCTIONS ---

export async function setupNotifications() {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    console.log('Notification permissions not granted');
    return;
  }

  await Notifications.cancelAllScheduledNotificationsAsync();
  await scheduleAgiyarasAlerts();
}

async function scheduleAgiyarasAlerts() {
  const upcomingEvents = getUpcomingAgiyaras();

  // Removed log: console.log(`Found ${upcomingEvents.length} upcoming Agiyaras dates.`);

  for (const event of upcomingEvents) {
    const { date, tithi } = event;

    // --- CALCULATE NOTIFICATION TIME (Day Before at 8:00 PM) ---
    const triggerDate = new Date(date);
    triggerDate.setDate(date.getDate() - 1);
    triggerDate.setHours(20, 0, 0, 0);

    // Skip if the trigger time is already in the past
    if (triggerDate.getTime() <= Date.now()) {
      continue;
    }

    const bodyText = getMessageForPaksha(tithi.paksha, tithi.gujMonth);

    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: `🔔 Agiyaras Reminder`,
          body: bodyText,
          sound: 'default',
          data: { type: 'agiyaras', date: date.toISOString() },
        },
        trigger: {
          // Explicitly define the trigger type to satisfy TypeScript
          type: Notifications.SchedulableTriggerInputTypes.DATE,
          date: triggerDate,
        },
      });

      // Removed log: console.log(`Scheduled alert for...`);
    } catch (e) {
      console.error("Failed to schedule notification:", e);
    }
  }
}

export async function sendTestNotification() {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    alert('Permission not granted!');
    return;
  }

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "🔔 Test Notification",
      body: "Jay Shree Krishna! This is how the Agiyaras alert will look.",
      sound: 'default',
    },
    trigger: {
      // Fires 2 seconds from now
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 2,
      repeats: false,
    },
  });

  console.log("Test notification scheduled for 2 seconds from now.");
}