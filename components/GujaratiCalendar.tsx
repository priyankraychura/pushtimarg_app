import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react-native';
import React, { useMemo, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  DayData,
  WEEKDAYS,
  calculateTithi,
  generateCalendarGrid,
  getUpcomingAgiyaras
} from '../utils/calendarLogic';
import GlassView from './GlassView';
import Loader from './Loader';

interface GujaratiCalendarProps {
  theme: any;
}

const { width } = Dimensions.get('window');
const CELL_WIDTH = (width - 48) / 7;

export const GujaratiCalendar = ({theme}:GujaratiCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  const gridData = useMemo(() => generateCalendarGrid(currentDate), [currentDate]);
  const upcomingEvents = useMemo(() => getUpcomingAgiyaras(), []);
  
  // Calculate details for header (Month View) and footer (Selected Day)
  const currentViewTithiInfo = calculateTithi(currentDate);
  const selectedDayTithiInfo = useMemo(() => calculateTithi(selectedDate), [selectedDate]);

  // Check if the displayed month is the actual current month
  const isCurrentMonthView = 
    currentDate.getMonth() === new Date().getMonth() && 
    currentDate.getFullYear() === new Date().getFullYear();

  // Check if selected date is Today
  const isSelectedToday = selectedDate.toDateString() === new Date().toDateString();

  const goToPrevMonth = () => {
    setIsLoading(true);
    setTimeout(() => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
        setIsLoading(false);
    }, 50); // Small delay to allow UI to render loader
  };

  const goToNextMonth = () => {
    setIsLoading(true);
    setTimeout(() => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
        setIsLoading(false);
    }, 50);
  };

  const renderDay = React.useCallback(({ item }: { item: DayData }) => {
    const isSelected = item.date.toDateString() === selectedDate.toDateString();
    
    // Dynamic Styles based on Tithi & Theme
    let tithiColor = theme.subText;
    let bgColor = 'transparent';
    let borderColor = 'transparent';
    let labelColor = theme.text;

    if (!item.isCurrentMonth) {
        labelColor = theme.subText;
        tithiColor = 'rgba(150,150,150,0.3)';
    } else if (item.tithi.isHoliday) {
        labelColor = '#EF4444'; // Red for holidays
    }

    if (item.tithi.isAgiyaras) {
        tithiColor = '#9333EA'; // Purple
        bgColor = theme.inputBg; // Subtle bg
    } else if (item.tithi.isPoonam) {
        tithiColor = theme.accent; // Gold/Orange
        bgColor = 'rgba(245, 158, 11, 0.1)'; 
    } else if (item.tithi.isAmas) {
        tithiColor = theme.text;
        // bgColor = 'rgba(0,0,0,0.05)';
        bgColor = theme.inputBg;
    }

    if (item.isToday) {
        borderColor = theme.devotionalPrimary;
    }
    
    if (isSelected) {
        bgColor = theme.devotionalPrimary;
        labelColor = '#FFF';
        tithiColor = 'rgba(255,255,255,0.8)';
    }

    return (
      <TouchableOpacity 
        style={[
            styles.dayCell, 
            { backgroundColor: bgColor, borderColor: borderColor }
        ]}
        onPress={() => setSelectedDate(item.date)}
      >
        <Text style={[styles.dayNumber, { color: labelColor }]}>{item.date.getDate()}</Text>
        <Text style={[styles.tithiText, { color: tithiColor }]} numberOfLines={1}>
          {item.tithi.tithiName}
        </Text>
        
        {/* Indicators */}
        <View style={styles.indicatorContainer}>
           {item.tithi.isAgiyaras && <View style={[styles.dot, { backgroundColor: '#9333EA' }]} />}
           {item.tithi.isPoonam && <View style={[styles.dot, { backgroundColor: theme.accent }]} />}
           {item.tithi.isAmas && <View style={[styles.dot, { backgroundColor: theme.text }]} />}
        </View>
      </TouchableOpacity>
    );
  }, [selectedDate, theme]);

  // Helper to get special day label
  const getSpecialDayLabel = (tithi: any) => {
    if (tithi.isAgiyaras) return 'Agiyaras';
    if (tithi.isPoonam) return 'Punnami';
    if (tithi.isAmas) return 'Amas';
    if (tithi.isHoliday) return 'Sunday';
    return null;
  };

  const specialLabel = getSpecialDayLabel(selectedDayTithiInfo);

  return (
    <View style={styles.container}>
      
      {/* --- HEADER --- */}
      <GlassView theme={theme} style={[styles.headerCard, { shadowColor: theme.shadow }]}>
         <View style={styles.headerMainRow}>
            {/* Left Arrow */}
            <TouchableOpacity onPress={goToPrevMonth} style={styles.arrowBtn} hitSlop={{top:10, bottom:10, left:10, right:10}}>
                <ChevronLeft size={24} color={theme.text} />
            </TouchableOpacity>

            {/* Center Info Block */}
            <View style={styles.headerContent}>
                <View>
                    <Text style={[styles.samvatText, { color: theme.devotionalSecondary }]}>
                        Vikram Samvat {currentViewTithiInfo.vikramSamvat}
                    </Text>
                    <Text style={[styles.monthText, { color: theme.text }]}>
                        {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </Text>
                    <Text style={[styles.gujMonthText, { color: theme.devotionalPrimary }]}>
                        {currentViewTithiInfo.gujMonth} Maas
                    </Text>
                </View>

                {/* Today Indicator - Only visible on current month */}
                {isCurrentMonthView && (
                    <TouchableOpacity 
                        onPress={() => {
                            const today = new Date();
                            setCurrentDate(today);
                            setSelectedDate(today);
                        }}
                        style={[styles.todayBadge, { backgroundColor: theme.inputBg, borderColor: theme.border }]}
                    >
                        <Text style={[styles.todayText, { color: theme.text }]}>Today</Text>
                    </TouchableOpacity>
                )}
            </View>

            {/* Right Arrow */}
            <TouchableOpacity onPress={goToNextMonth} style={styles.arrowBtn} hitSlop={{top:10, bottom:10, left:10, right:10}}>
                <ChevronRight size={24} color={theme.text} />
            </TouchableOpacity>
         </View>
      </GlassView>

      {/* --- WEEKDAYS --- */}
      <View style={[styles.weekRow, { borderBottomColor: theme.border }]}>
        {WEEKDAYS.map((day, index) => (
            <Text key={index} style={[styles.weekText, { color: theme.subText }]}>{day}</Text>
        ))}
      </View>

      {/* --- GRID --- */}
      <View style={styles.gridContainer}>
          {isLoading ? (
              <View style={[styles.loadingOverlay, { backgroundColor: theme.bg }]}>
                  <Loader theme={theme} size="large" />
              </View>
          ) : (
            <FlatList
                data={gridData}
                renderItem={renderDay}
                keyExtractor={(_, index) => index.toString()}
                numColumns={7}
                scrollEnabled={false}
            />
          )}
      </View>

      {/* --- DYNAMIC SECTION (Upcoming Events OR Selected Details) --- */}
      <View style={styles.upcomingSection}>
         <View style={styles.sectionHeader}>
            <CalendarIcon size={18} color={theme.subText} />
            {/* Title changes based on selection */}
            <Text style={[styles.sectionTitle, { color: theme.subText }]}>
                {isSelectedToday 
                    ? "Upcoming Agiyaras" 
                    : selectedDate.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
                }
            </Text>
         </View>
         
         {isSelectedToday ? (
             // --- SHOW UPCOMING LIST (Default/Today) ---
             upcomingEvents.map((event, index) => (
                 <GlassView key={index} theme={theme} style={[styles.eventCard, { borderColor: theme.border }]}>
                     <View style={[styles.eventDateBox, { backgroundColor: theme.inputBg }]}>
                         <Text style={[styles.eventMonth, { color: theme.devotionalPrimary }]}>
                            {event.date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}
                         </Text>
                         <Text style={[styles.eventDay, { color: theme.devotionalPrimary }]}>
                            {event.date.getDate()}
                         </Text>
                     </View>
                     <View style={styles.eventDetails}>
                         <Text style={[styles.eventTitle, { color: theme.text }]}>
                            {event.tithi.paksha} Agiyaras
                         </Text>
                         <Text style={[styles.eventSubtitle, { color: theme.subText }]}>
                             {event.date.toLocaleDateString('en-US', { weekday: 'long' })} • {event.tithi.gujMonth}
                         </Text>
                     </View>
                     <View style={[styles.daysLeft, { backgroundColor: theme.inputBg }]}>
                         <Text style={[styles.daysLeftText, { color: theme.text }]}>
                            {Math.ceil((event.date.getTime() - new Date().getTime()) / (1000 * 3600 * 24))}d
                         </Text>
                     </View>
                 </GlassView>
             ))
         ) : (
             // --- SHOW SELECTED DATE DETAIL ---
             <GlassView theme={theme} style={[styles.eventCard, { borderColor: theme.border }]}>
                 {/* English Date Box */}
                 <View style={[styles.eventDateBox, { backgroundColor: theme.inputBg }]}>
                     <Text style={[styles.eventMonth, { color: theme.devotionalPrimary }]}>
                        {selectedDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}
                     </Text>
                     <Text style={[styles.eventDay, { color: theme.devotionalPrimary }]}>
                        {selectedDate.getDate()}
                     </Text>
                 </View>

                 {/* Tithi Info */}
                 <View style={styles.eventDetails}>
                     <Text style={[styles.eventTitle, { color: theme.text }]}>
                        {selectedDayTithiInfo.tithiName} ({selectedDayTithiInfo.paksha})
                     </Text>
                     <Text style={[styles.eventSubtitle, { color: theme.subText }]}>
                         {selectedDayTithiInfo.gujMonth} Maas • VS {selectedDayTithiInfo.vikramSamvat}
                     </Text>
                 </View>

                 {/* Special Badge (Agiyaras/Poonam etc.) */}
                 {specialLabel && (
                     <View style={[styles.daysLeft, { backgroundColor: theme.inputBg }]}>
                         <Text style={[styles.daysLeftText, { color: theme.accent }]}>
                            {specialLabel}
                         </Text>
                     </View>
                 )}
             </GlassView>
         )}
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingBottom: 20,
  },
  headerCard: {
    borderRadius: 24,
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginBottom: 16,
    borderWidth: 1,
  },
  headerMainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  arrowBtn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 8,
  },
  samvatText: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: '700',
    marginBottom: 4,
  },
  monthText: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  gujMonthText: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 2,
  },
  todayBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 4,
  },
  todayText: {
    fontSize: 11,
    fontWeight: '700',
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderBottomWidth: 1,
    marginBottom: 8,
  },
  weekText: {
    width: CELL_WIDTH,
    textAlign: 'center',
    fontSize: 11,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  gridContainer: {
    minHeight: 320,
  },
  dayCell: {
    width: CELL_WIDTH,
    height: 60,
    margin: 0,
    borderRadius: 12,
    padding: 4,
    borderWidth: 1.5,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  dayNumber: {
    fontSize: 15,
    fontWeight: '600',
  },
  tithiText: {
    fontSize: 10,
    marginTop: 2,
    fontWeight: '500',
  },
  indicatorContainer: {
    flexDirection: 'row',
    marginTop: 4,
    gap: 3,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
  },
  upcomingSection: {
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
    paddingLeft: 4,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  eventCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 20,
    marginBottom: 12,
    borderWidth: 1,
  },
  eventDateBox: {
    borderRadius: 14,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  eventMonth: {
    fontSize: 10,
    fontWeight: '800',
  },
  eventDay: {
    fontSize: 17,
    fontWeight: '800',
  },
  eventDetails: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  eventSubtitle: {
    fontSize: 13,
  },
  daysLeft: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  daysLeftText: {
    fontSize: 11,
    fontWeight: '700',
  },
  footerInfo: {
    alignItems: 'center',
    marginTop: 16,
  },
  footerText: {
    fontSize: 12,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    opacity: 0.8,
  }
});