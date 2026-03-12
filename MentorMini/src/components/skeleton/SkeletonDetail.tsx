import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SkeletonBox } from './SkeletonBox';
import { colors, spacing, layout } from '../../theme';



export const SkeletonDetail: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Subject banner */}
      <SkeletonBox width={120} height={32} borderRadius={10} />

      {/* Topic title — large, two lines */}
      <View style={styles.titleBlock}>
        <SkeletonBox width="90%" height={32} borderRadius={8} />
        <SkeletonBox
          width="60%"
          height={32}
          borderRadius={8}
          style={styles.titleSecondLine}
        />
      </View>

      {/* Date badge */}
      <SkeletonBox
        width={160}
        height={20}
        borderRadius={6}
        style={styles.dateLine}
      />

      {/* Divider gap */}
      <View style={styles.dividerGap} />

      {/* Section label */}
      <SkeletonBox
        width={120}
        height={12}
        borderRadius={4}
        style={styles.sectionLabel}
      />

      {/* Body text — 4 lines of varying width */}
      {['100%', '95%', '88%', '70%'].map((w, i) => (
        <SkeletonBox
          key={i}
          width={w as `${number}%`}
          height={15}
          borderRadius={5}
          style={styles.bodyLine}
        />
      ))}

      {/* More sessions label */}
      <SkeletonBox
        width={140}
        height={12}
        borderRadius={4}
        style={styles.moreSectionLabel}
      />

      {/* 2 sibling session cards */}
      {[1, 2].map((i) => (
        <View key={i} style={styles.siblingCard}>
          <View style={styles.siblingLines}>
            <SkeletonBox width="60%" height={16} borderRadius={6} />
            <SkeletonBox
              width="40%"
              height={12}
              borderRadius={4}
              style={styles.siblingSecondLine}
            />
          </View>
          <SkeletonBox width={10} height={18} borderRadius={4} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: layout.screenPadding,
  },
  titleBlock: {
    marginTop: spacing.lg,
    gap: spacing.sm,
  },
  titleSecondLine: {
    marginTop: spacing.sm,
  },
  dateLine: {
    marginTop: spacing.md,
  },
  dividerGap: {
    height: 1,
    backgroundColor: colors.border.default,
    marginVertical: spacing.lg,
  },
  sectionLabel: {
    marginBottom: spacing.md,
  },
  bodyLine: {
    marginBottom: spacing.sm,
  },
  moreSectionLabel: {
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  siblingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.card,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  siblingLines: {
    flex: 1,
    gap: spacing.xs,
  },
  siblingSecondLine: {
    marginTop: spacing.xs,
  },
});