import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SkeletonBox } from './SkeletonBox';
import { colors, spacing, layout } from '../../theme';

export const SkeletonSession: React.FC = () => {
  return (
    <View style={styles.card}>
      {/* Top row */}
      <View style={styles.topRow}>
        <SkeletonBox width="55%" height={16} borderRadius={6} />
        <SkeletonBox width={80} height={24} borderRadius={8} />
      </View>

      {/* Summary lines — two lines of varying width */}
      <SkeletonBox
        width="100%"
        height={13}
        borderRadius={5}
        style={styles.summaryLine}
      />
      <SkeletonBox
        width="75%"
        height={13}
        borderRadius={5}
        style={styles.summaryLine}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <SkeletonBox width="40%" height={13} borderRadius={5} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background.card,
    borderRadius: layout.cardRadius,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  summaryLine: {
    marginBottom: spacing.sm,
  },
  footer: {
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border.default,
  },
});