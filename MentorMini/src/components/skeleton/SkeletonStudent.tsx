import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SkeletonBox } from './SkeletonBox';
import { colors, spacing, layout } from '../../theme';


export const SkeletonStudent: React.FC = () => {
  return (
    <View style={styles.card}>
      <SkeletonBox width={48} height={48} borderRadius={16} delay={0} />
      <View style={styles.lines}>
        <SkeletonBox width="65%" height={16} borderRadius={6} delay={100} />
        <SkeletonBox width="45%" height={13} borderRadius={5}
          style={styles.secondLine} delay={200} />
      </View>
      <SkeletonBox width={10} height={18} borderRadius={4} delay={150} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.card,
    borderRadius: layout.cardRadius,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  lines: {
    flex: 1,
    marginHorizontal: spacing.md,
    gap: spacing.sm,
  },
  secondLine: {
    marginTop: spacing.xs,
  },
});