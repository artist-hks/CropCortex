import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ErrorBoundaryProps } from 'expo-router';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { colors } from '../../constants/colors';
import { TaskCard } from '../../components/TaskCard';
import { NetworkAwareOfflineBanner } from '../../components/NetworkAwareOfflineBanner';
import { ScreenErrorBoundary } from '../../components/ScreenErrorBoundary';
import { useAppStore } from '../../store/useAppStore';
import { advisoryTasks, aiAdvisorySummary } from '../../utils/mockData';
import { cardShadow } from '../../utils/shadows';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function AdvisoryScreen() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 9, 1)); // October 2025
  const [selectedDate, setSelectedDate] = useState('2025-10-14');
  const [tasks, setTasks] = useState(advisoryTasks);

  const calendarData = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const taskDates = new Set(tasks.map((t) => {
      const d = new Date(t.date);
      return d.getDate();
    }));

    return { year, month, firstDay, daysInMonth, taskDates };
  }, [currentMonth, tasks]);

  const handleToggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, done: !t.done } : t)),
    );
  };

  const filteredTasks = tasks.filter((t) => t.date === selectedDate);

  const selectedDateFormatted = (() => {
    const d = new Date(selectedDate);
    return d.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });
  })();

  const renderCalendar = () => {
    const { year, month, firstDay, daysInMonth, taskDates } = calendarData;
    const cells: React.ReactNode[] = [];

    // Weekday headers
    WEEKDAYS.forEach((day) => {
      cells.push(
        <View key={`h-${day}`} style={styles.calHeaderCell}>
          <Text style={styles.calHeaderText}>{day}</Text>
        </View>,
      );
    });

    // Empty cells before first day
    for (let i = 0; i < firstDay; i++) {
      cells.push(<View key={`e-${i}`} style={styles.calCell} />);
    }

    // Day cells
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const isSelected = dateStr === selectedDate;
      const isToday = d === 14 && month === 9 && year === 2025;
      const hasTask = taskDates.has(d);

      cells.push(
        <TouchableOpacity
          key={`d-${d}`}
          style={[
            styles.calCell,
            isSelected && styles.calCellSelected,
            isToday && !isSelected && styles.calCellToday,
          ]}
          onPress={() => setSelectedDate(dateStr)}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.calDateText,
              isSelected && styles.calDateSelected,
              isToday && !isSelected && styles.calDateToday,
            ]}
          >
            {d}
          </Text>
          {hasTask && (
            <View
              style={[
                styles.taskDot,
                isSelected && styles.taskDotSelected,
              ]}
            />
          )}
        </TouchableOpacity>,
      );
    }

    return cells;
  };

  return (
    <View style={styles.screen}>
      <NetworkAwareOfflineBanner />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View entering={FadeIn.duration(400)} style={styles.header}>
          <Text style={styles.title}>Crop Advisory</Text>
          <Text style={styles.weekLabel}>Week of Oct 13–19</Text>
        </Animated.View>

        {/* Calendar */}
        <Animated.View entering={FadeInDown.delay(100).duration(500)} style={styles.calendarCard}>
          <View style={styles.calMonthHeader}>
            <TouchableOpacity
              onPress={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            >
              <Ionicons name="chevron-back" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
            <Text style={styles.calMonthTitle}>
              {MONTH_NAMES[calendarData.month]} {calendarData.year}
            </Text>
            <TouchableOpacity
              onPress={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            >
              <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
          <View style={styles.calGrid}>{renderCalendar()}</View>
        </Animated.View>

        {/* Task List */}
        <Animated.View entering={FadeInDown.delay(200).duration(500)}>
          <View style={styles.taskHeader}>
            <Text style={styles.sectionLabel}>TASKS FOR {selectedDateFormatted.toUpperCase()}</Text>
          </View>
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                onComplete={handleToggleTask}
              />
            ))
          ) : (
            <View style={styles.emptyTasks}>
              <Ionicons name="checkmark-circle-outline" size={40} color={colors.divider} />
              <Text style={styles.emptyText}>No tasks for this date</Text>
            </View>
          )}
        </Animated.View>

        {/* Weekly AI Advisory */}
        <Animated.View entering={FadeInDown.delay(300).duration(500)} style={styles.aiAdvisory}>
          <View style={styles.aiHeader}>
            <View style={styles.aiHeaderBar} />
            <Text style={styles.aiTitle}>This Week's AI Advisory</Text>
          </View>
          <View style={styles.aiContent}>
            {aiAdvisorySummary.map((point, i) => (
              <Animated.View key={i} entering={FadeInDown.delay(400 + i * 60).duration(300)} style={styles.aiBullet}>
                <Text style={styles.aiBulletText}>{point}</Text>
              </Animated.View>
            ))}
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

export function ErrorBoundary(props: ErrorBoundaryProps) {
  return <ScreenErrorBoundary {...props} />;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontFamily: 'NotoSans_700Bold',
    color: colors.textPrimary,
  },
  weekLabel: {
    fontSize: 13,
    fontFamily: 'NotoSans_600SemiBold',
    color: colors.textSecondary,
  },
  // Calendar
  calendarCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
    ...cardShadow,
    elevation: 2,
  },
  calMonthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  calMonthTitle: {
    fontSize: 16,
    fontFamily: 'NotoSans_700Bold',
    color: colors.textPrimary,
  },
  calGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calHeaderCell: {
    width: `${100 / 7}%`,
    alignItems: 'center',
    paddingVertical: 4,
  },
  calHeaderText: {
    fontSize: 12,
    fontFamily: 'NotoSans_600SemiBold',
    color: colors.textSecondary,
  },
  calCell: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  calCellSelected: {
    backgroundColor: `${colors.primaryLight}25`,
  },
  calCellToday: {
    backgroundColor: colors.primary,
  },
  calDateText: {
    fontSize: 14,
    fontFamily: 'NotoSans_400Regular',
    color: colors.textPrimary,
  },
  calDateSelected: {
    fontFamily: 'NotoSans_700Bold',
    color: colors.primary,
  },
  calDateToday: {
    color: colors.card,
    fontFamily: 'NotoSans_700Bold',
  },
  taskDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.primary,
    position: 'absolute',
    bottom: '15%',
  },
  taskDotSelected: {
    backgroundColor: colors.primary,
  },
  // Tasks
  taskHeader: {
    marginBottom: 12,
  },
  sectionLabel: {
    fontSize: 11,
    fontFamily: 'NotoSans_600SemiBold',
    color: colors.textSecondary,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  emptyTasks: {
    alignItems: 'center',
    paddingVertical: 40,
    gap: 8,
  },
  emptyText: {
    fontSize: 14,
    fontFamily: 'NotoSans_400Regular',
    color: colors.textSecondary,
  },
  // AI Advisory
  aiAdvisory: {
    marginTop: 12,
    backgroundColor: colors.card,
    borderRadius: 20,
    overflow: 'hidden',
    ...cardShadow,
    elevation: 2,
  },
  aiHeader: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 16,
    position: 'relative',
  },
  aiHeaderBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: colors.primaryLight,
  },
  aiTitle: {
    fontSize: 15,
    fontFamily: 'NotoSans_700Bold',
    color: colors.card,
  },
  aiContent: {
    padding: 16,
    gap: 12,
  },
  aiBullet: {
    flexDirection: 'row',
  },
  aiBulletText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'NotoSans_400Regular',
    color: colors.textPrimary,
    lineHeight: 22,
  },
});
