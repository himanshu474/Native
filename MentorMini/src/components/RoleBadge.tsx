import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { UserRole } from '../types';
import { colors, spacing, typography } from '../theme';



const ROLE_CONFIG: Record<UserRole, { label: string; color: string; bg: string }> = {
  parent: { label: 'Parent', color: colors.parent, bg: '#F3EFFE' },
  student: { label: 'Student', color: colors.student, bg: colors.primaryLight },
  mentor: { label: 'Mentor', color: colors.mentor, bg: '#ECFDF5' },
};

interface RoleBadgeProps {
  role: UserRole;
}

export const RoleBadge: React.FC<RoleBadgeProps> = ({ role }) => {
  const config = ROLE_CONFIG[role];

  return (
    <View style={[styles.badge, { backgroundColor: config.bg }]}>
      <View style={[styles.dot, { backgroundColor: config.color }]} />
      <Text style={[styles.label, { color: config.color }]}>{config.label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start',
    gap: spacing.xs,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  label: {
    ...typography.caption,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});