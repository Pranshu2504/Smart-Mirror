import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Platform, PanResponder, Animated } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const PlannerScreen = () => {
    const navigation = useNavigation();
    
    // States
    const [currentDate, setCurrentDate] = useState(new Date());
    const [viewMode, setViewMode] = useState<'month' | 'week'>('month');
    const [activeWeekIndex, setActiveWeekIndex] = useState(0);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Calculations
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    let firstDayOfWeek = new Date(year, month, 1).getDay();
    firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

    const calendarGrid: {day: number, type: string, isToday?: boolean}[] = [];
    
    for (let i = 0; i < firstDayOfWeek; i++) {
        const prevMonthLastDate = new Date(year, month, 0).getDate();
        const paddedDay = prevMonthLastDate - (firstDayOfWeek - 1) + i;
        calendarGrid.push({ day: paddedDay, type: 'padding' });
    }

    for (let i = 1; i <= daysInMonth; i++) {
        const isToday = i === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
        calendarGrid.push({ day: i, type: 'current', isToday });
    }

    const remainder = calendarGrid.length % 7;
    if (remainder !== 0) {
        for (let i = 1; i <= 7 - remainder; i++) {
            calendarGrid.push({ day: i, type: 'padding' });
        }
    }

    const weeksChunks: any[] = [];
    for (let i = 0; i < calendarGrid.length; i += 7) {
        weeksChunks.push(calendarGrid.slice(i, i + 7));
    }

    useEffect(() => {
        if (weeksChunks.length > 0 && activeWeekIndex >= weeksChunks.length) {
            setActiveWeekIndex(weeksChunks.length - 1);
        }
    }, [weeksChunks.length, activeWeekIndex]);

    // Refs for Gesture Handler Closures
    const currentDateRef = useRef(currentDate);
    currentDateRef.current = currentDate;
    const viewModeRef = useRef(viewMode);
    viewModeRef.current = viewMode;
    const activeWeekIndexRef = useRef(activeWeekIndex);
    activeWeekIndexRef.current = activeWeekIndex;

    const fadeAnim = useRef(new Animated.Value(1)).current;

    const triggerTransition = (newStateCallback: () => void) => {
        Animated.timing(fadeAnim, {
            toValue: 0.2,
            duration: 80,
            useNativeDriver: true,
        }).start(() => {
            newStateCallback();
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }).start();
        });
    };

    // Swipe Gesture Handler
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => false,
            onMoveShouldSetPanResponder: (_, gestureState) => {
                // Determine horizontal swipe heavily favoring X axis to avoid blocking scroll
                return Math.abs(gestureState.dx) > 40 && Math.abs(gestureState.dy) < 20;
            },
            onPanResponderRelease: (_, gestureState) => {
                const prevDate = currentDateRef.current;
                
                if (gestureState.dx > 60) {
                    // Swiped right (Prev)
                    triggerTransition(() => {
                        if (viewModeRef.current === 'month') {
                            setCurrentDate(new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
                        } else {
                            if (activeWeekIndexRef.current > 0) {
                                setActiveWeekIndex(prev => prev - 1);
                            } else {
                                const prevMonthDate = new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1);
                                setCurrentDate(prevMonthDate);
                                
                                // Calculate last week of the previous month
                                const lastDay = new Date(prevMonthDate.getFullYear(), prevMonthDate.getMonth() + 1, 0).getDate();
                                let firstDay = new Date(prevMonthDate.getFullYear(), prevMonthDate.getMonth(), 1).getDay();
                                firstDay = firstDay === 0 ? 6 : firstDay - 1;
                                const totalGridDays = lastDay + firstDay;
                                const lastWeekIdx = Math.ceil(totalGridDays / 7) - 1;
                                setActiveWeekIndex(lastWeekIdx);
                            }
                        }
                    });
                } else if (gestureState.dx < -60) {
                    // Swiped left (Next)
                    triggerTransition(() => {
                        if (viewModeRef.current === 'month') {
                            setCurrentDate(new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
                        } else {
                            const currentWeeksCount = weeksChunks.length;
                            if (activeWeekIndexRef.current < currentWeeksCount - 1) {
                                setActiveWeekIndex(prev => prev + 1);
                            } else {
                                setCurrentDate(new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
                                setActiveWeekIndex(0);
                            }
                        }
                    });
                }
            },
        })
    ).current;

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerIconWrapper}>
                    <Ionicons name="chevron-back" size={28} color="#000" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.monthSelector}>
                    <Text style={styles.monthText}>{`${MONTHS[month]} ${year}`}</Text>
                    <Ionicons name="caret-down" size={14} color="#000" style={{ marginLeft: 5 }} />
                </TouchableOpacity>

                <View style={styles.headerRightIcons}>
                    {/* Calendar Toggle */}
                    <TouchableOpacity style={styles.headerIconWrapper} onPress={() => setViewMode('month')}>
                        <Ionicons name="calendar-outline" size={24} color={viewMode === 'month' ? '#000000' : '#bbbbbb'} />
                    </TouchableOpacity>
                    {/* Week Split View Toggle */}
                    <TouchableOpacity style={styles.headerIconWrapper} onPress={() => setViewMode('week')}>
                        <View style={[styles.splitIcon, { borderColor: viewMode === 'week' ? '#000000' : '#bbbbbb' }]}>
                            <View style={[styles.splitHalf, { borderBottomWidth: 1, borderColor: viewMode === 'week' ? '#000000' : '#bbbbbb' }]} />
                            <View style={styles.splitHalf} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Content Container resolving swipe gestures via native view property */}
            <Animated.View style={{ flex: 1, opacity: fadeAnim }} {...panResponder.panHandlers}>

                {/* MONTH VIEW */}
                {viewMode === 'month' && (
                    <>
                        <View style={styles.daysRow}>
                            {DAYS.map((day, idx) => (
                                <View key={idx} style={styles.dayCol}>
                                    <Text style={styles.dayText}>{day}</Text>
                                </View>
                            ))}
                        </View>

                        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                            <View style={styles.calendarGrid}>
                                {calendarGrid.map((item, idx) => (
                                    <View key={idx} style={styles.dateCellWrapper}>
                                        <View style={[styles.dateCell, item.isToday && styles.activeDateCell]}>
                                            <Text style={[
                                                styles.dateText,
                                                item.type === 'padding' && styles.paddingDateText,
                                                item.isToday && styles.activeDateText
                                            ]}>
                                                {item.day}
                                            </Text>
                                        </View>
                                    </View>
                                ))}
                            </View>

                            <View style={styles.statsContainer}>
                                <View style={styles.statCard}>
                                    <Text style={styles.statTitle}>OOTD</Text>
                                    <Text style={[styles.statValue, { color: '#0066FF' }]}>0</Text>
                                </View>
                                <View style={styles.statCard}>
                                    <Text style={styles.statTitle}>Most worn</Text>
                                    <Ionicons name="shirt" size={32} color="#f0f0f0" style={{ marginTop: 8 }} />
                                </View>
                                <View style={styles.statCard}>
                                    <Text style={styles.statTitle}>Expenses</Text>
                                    <Text style={[styles.statValue, { color: '#0066FF' }]}>$0.00</Text>
                                </View>
                            </View>

                            <Text style={styles.footerText}>Your stats aren't visible to others <Text style={{fontSize: 14}}>😊</Text></Text>
                        </ScrollView>
                    </>
                )}

                {/* WEEK VIEW */}
                {viewMode === 'week' && (
                    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                        {/* Sub Header */}
                        <View style={styles.weekHeader}>
                            <TouchableOpacity onPress={() => activeWeekIndex > 0 && setActiveWeekIndex(activeWeekIndex - 1)}>
                                <Ionicons name="caret-back" size={16} color="#cccccc" />
                            </TouchableOpacity>
                            <Text style={styles.weekHeaderText}>Week {activeWeekIndex + 1}</Text>
                            <TouchableOpacity onPress={() => activeWeekIndex < weeksChunks.length - 1 && setActiveWeekIndex(activeWeekIndex + 1)}>
                                <Ionicons name="caret-forward" size={16} color="#cccccc" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.weekGrid}>
                            {weeksChunks[activeWeekIndex]?.map((item, idx) => (
                                <View key={idx} style={styles.weekDayColumn}>
                                    <View style={styles.weekDayHeader}>
                                        <Text style={styles.weekDayName}>{DAYS[idx]}</Text>
                                        <View style={item.isToday ? styles.activeWeekDateCircle : null}>
                                            <Text style={[styles.weekDateNum, item.type === 'padding' && styles.paddingDateText, item.isToday && styles.activeWeekDateText]}>
                                                {item.day}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.weekCardPlaceholder} />
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                )}

            </Animated.View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { 
        flex: 1, 
        backgroundColor: '#FFFFFF',
        paddingTop: Platform.OS === 'android' ? 10 : 0,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingTop: 10,
        paddingBottom: 20,
    },
    headerIconWrapper: {
        padding: 5,
    },
    monthSelector: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 15, 
    },
    monthText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    headerRightIcons: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    splitIcon: {
        width: 22,
        height: 22,
        borderWidth: 1.5,
        borderRadius: 4,
        flexDirection: 'column',
    },
    splitHalf: {
        flex: 1,
    },
    daysRow: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    dayCol: {
        flex: 1,
        alignItems: 'center',
    },
    dayText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#b0b0b0',
    },
    calendarGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 10,
    },
    dateCellWrapper: {
        width: '14.28%',
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    dateCell: {
        width: 38,
        height: 38,
        borderRadius: 19,
        alignItems: 'center',
        justifyContent: 'center',
    },
    activeDateCell: {
        backgroundColor: '#222222',
    },
    dateText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000000',
    },
    paddingDateText: {
        color: '#d0d0d0',
    },
    activeDateText: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 30,
        gap: 10,
    },
    statCard: {
        flex: 1,
        backgroundColor: '#F7F8FA',
        borderRadius: 16,
        padding: 15,
        alignItems: 'center',
        minHeight: 90,
    },
    statTitle: {
        fontSize: 13,
        color: '#666666',
        fontWeight: '500',
        marginBottom: 10,
    },
    statValue: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    footerText: {
        textAlign: 'center',
        fontSize: 14,
        color: '#666666',
        marginTop: 25,
        marginBottom: 30,
        fontWeight: '500',
    },
    // Week View Styles
    weekHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 15,
        gap: 20,
    },
    weekHeaderText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#222',
    },
    weekGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 15,
        paddingBottom: 40,
    },
    weekDayColumn: {
        width: '25%', // 4 columns
        alignItems: 'center',
        paddingHorizontal: 8,
        marginBottom: 20,
    },
    weekDayHeader: {
        alignItems: 'center',
        marginBottom: 15,
        height: 50, // standardized height for day + date 
    },
    weekDayName: {
        fontSize: 13,
        color: '#aaaaaa',
        fontWeight: '500',
        marginBottom: 5,
    },
    weekDateNum: {
        fontSize: 14,
        fontWeight: '500',
        color: '#aaaaaa',
    },
    activeWeekDateCircle: {
        width: 26,
        height: 26,
        borderRadius: 13,
        backgroundColor: '#222',
        alignItems: 'center',
        justifyContent: 'center',
    },
    activeWeekDateText: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
    weekCardPlaceholder: {
        width: '100%',
        aspectRatio: 0.8,
        backgroundColor: '#F7F8FA',
        borderRadius: 12,
    }
});

export default PlannerScreen;
