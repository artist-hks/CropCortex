import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { colors } from '../constants/colors';
import { cardShadow } from '../utils/shadows';

interface TaskCardProps {
  task: {
    id: string;
    task: string;
    crop: string;
    field: string;
    time: string;
    priority: 'critical' | 'recommended' | 'optional';
    icon: string;
    done: boolean;
  };
  index?: number;
  onComplete: (taskId: string) => void;
}

const priorityConfig = {
  critical: { color: colors.danger, label: 'Critical', borderColor: colors.danger },
  recommended: { color: colors.accent, label: 'Recommended', borderColor: colors.accent },
  optional: { color: colors.primaryLight, label: 'Optional', borderColor: colors.primaryLight },
};

export const TaskCard: React.FC<TaskCardProps> = ({ task, index = 0, onComplete }) => {
  const config = priorityConfig[task.priority];

  return (
    <Animated.View entering={FadeInDown.delay(index * 60).duration(400)}>
      <TouchableOpacity
        style={[
          styles.container,
          { borderLeftColor: config.borderColor },
          task.done && styles.doneContainer,
        ]}
        activeOpacity={0.8}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.iconCircle}>
              <Ionicons name={task.icon as any} size={20} color={colors.primary} />
            </View>
            <View style={styles.headerText}>
              <Text style={[styles.taskText, task.done && styles.doneText]}>{task.task}</Text>
              <View style={styles.meta}>
                <Text style={styles.metaText}>{task.crop}</Text>
                <Text style={styles.metaDot}>·</Text>
                <Text style={styles.metaText}>{task.field}</Text>
              </View>
            </View>
          </View>
          <View style={styles.footer}>
            <View style={[styles.timeBadge]}>
              <Ionicons name="time-outline" size={12} color={colors.textSecondary} />
              <Text style={styles.timeText}>{task.time}</Text>
            </View>
            <View style={[styles.priorityBadge, { backgroundColor: `${config.color}15` }]}>
              <View style={[styles.priorityDot, { backgroundColor: config.color }]} />
              <Text style={[styles.priorityText, { color: config.color }]}>{config.label}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={[styles.checkbox, task.done && styles.checkboxDone]}
          onPress={() => onComplete(task.id)}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          {task.done && <Ionicons name="checkmark" size={16} color={colors.card} />}
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: 14,
    borderLeftWidth: 4,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    marginBottom: 10,
    ...cardShadow,
    elevation: 2,
  },
  doneContainer: {
    opacity: 0.6,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 10,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: `${colors.primary}10`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
  },
  taskText: {
    fontSize: 15,
    fontFamily: 'NotoSans_600SemiBold',
    color: colors.textPrimary,
    lineHeight: 20,
  },
  doneText: {
    textDecorationLine: 'line-through',
    color: colors.textSecondary,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 3,
  },
  metaText: {
    fontSize: 12,
    fontFamily: 'NotoSans_400Regular',
    color: colors.textSecondary,
  },
  metaDot: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginLeft: 52,
  },
  timeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    backgroundColor: colors.bg,
    borderRadius: 20,
  },
  timeText: {
    fontSize: 11,
    fontFamily: 'NotoSans_400Regular',
    color: colors.textSecondary,
  },
  priorityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  priorityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  priorityText: {
    fontSize: 11,
    fontFamily: 'NotoSans_600SemiBold',
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.divider,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  checkboxDone: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
});

export default TaskCard;
