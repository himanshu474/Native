import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Session } from '../types';
import { colors, spacing, typography, shadows, layout } from '../theme';
import { formatShortDate } from '../utils/formatDate';


interface SessionCardProps {
  session: Session;
  onPress: (session: Session) => void;
}

export const SessionCard: React.FC<SessionCardProps> = ({ session, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(session)}
      activeOpacity={0.82}
    >
      {/* Top row: topic + date */}
      <View style={styles.topRow}>
        <Text style={styles.topic} numberOfLines={1}>{session.topic}</Text>
        <View style={styles.dateChip}>
          <Text style={styles.dateText}>{formatShortDate(session.date)}</Text>
        </View>
      </View>

      {/* Summary preview */}
      <Text style={styles.summary} numberOfLines={2}>
        {session.summary}
      </Text>

      {/* Read more affordance */}
      <View style={styles.footer}>
        <Text style={styles.readMore}>Read full notes →</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background.card,
    borderRadius: layout.cardRadius,
    padding: spacing.md,
    marginBottom: spacing.sm,
    ...shadows.small,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  topic: {
    ...typography.h4,
    color: colors.text.primary,
    flex: 1,
  },
  dateChip: {
    backgroundColor: colors.background.input,
    borderRadius: 8,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    flexShrink: 0,
  },
  dateText: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  summary: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  footer: {
    marginTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border.default,
    paddingTop: spacing.sm,
  },
  readMore: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
  },
});