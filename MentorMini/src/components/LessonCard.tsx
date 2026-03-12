import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { Lesson } from '../types';
import { colors, spacing, typography, shadows, layout } from '../theme';


interface LessonCardProps {
  lesson: Lesson;
  sessionCount?: number;
  onPress: (lesson: Lesson) => void;
}

export const LessonCard: React.FC<LessonCardProps> = ({
  lesson,
  sessionCount,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(lesson)}
      activeOpacity={0.82}
    >
      {/* Colored subject icon block */}
      <View style={[styles.iconBlock, { backgroundColor: `${lesson.color}18` }]}>
        <Text style={styles.icon}>{lesson.iconName}</Text>
        {/* Subtle left accent line using lesson color */}
        <View style={[styles.accentBar, { backgroundColor: lesson.color }]} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>{lesson.title}</Text>
        {sessionCount !== undefined && (
          <Text style={styles.sessionCount}>
            {sessionCount} {sessionCount === 1 ? 'session' : 'sessions'}
          </Text>
        )}
      </View>

      {/* Arrow */}
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.card,
    borderRadius: layout.cardRadius,
    marginBottom: spacing.sm,
    overflow: 'hidden',
    ...shadows.small,
  },
  iconBlock: {
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  icon: {
    fontSize: 28,
  },
  accentBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 3,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  title: {
    ...typography.h4,
    color: colors.text.primary,
  },
  sessionCount: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    marginTop: 3,
  },
  arrow: {
    fontSize: 22,
    color: colors.text.disabled,
    paddingRight: spacing.md,
  },
});