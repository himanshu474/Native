import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SkeletonBox } from './SkeletonBox';
import { colors, spacing, layout } from '../../theme';

export const SkeletonLesson: React.FC = () => {
  return (
    <View style={styles.card}>
      {/* Icon block */}
      <SkeletonBox width={64} height={64} borderRadius={0} />

      {/* Text */}
      <View style={styles.lines}>
        <SkeletonBox width="55%" height={16} borderRadius={6} />
        <SkeletonBox
          width="35%"
          height={13}
          borderRadius={5}
          style={styles.secondLine}
        />
      </View>

      {/* Arrow */}
      <SkeletonBox
        width={10}
        height={18}
        borderRadius={4}
        style={styles.arrow}
      />
    </View>
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
  },
  lines: {
    flex: 1,
    marginHorizontal: spacing.md,
    paddingVertical: spacing.md,
    gap: spacing.xs,
  },
  secondLine: {
    marginTop: spacing.xs,
  },
  arrow: {
    marginRight: spacing.md,
  },
});