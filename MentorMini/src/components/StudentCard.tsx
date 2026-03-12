import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Student } from '../types';
import { colors, spacing, typography, shadows, layout } from '../theme';
import { calculateAge } from '../utils/formatDate';


const getAvatarColor = (name: string): string => {
  const avatarColors = [
    '#4F6EF7', '#8B5CF6', '#059669',
    '#F59E0B', '#EF4444', '#06B6D4',
  ];
  const index = name.charCodeAt(0) % avatarColors.length;
  return avatarColors[index];
};

const getInitials = (name: string, surname: string): string => {
  return `${name.charAt(0)}${surname.charAt(0)}`.toUpperCase();
};

interface StudentCardProps {
  student: Student;
  onPress: (student: Student) => void;
}

export const StudentCard: React.FC<StudentCardProps> = ({ student, onPress }) => {
  const age = calculateAge(student.dateOfBirth);
  const initials = getInitials(student.name, student.surname);
  const avatarColor = getAvatarColor(student.name);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(student)}
      activeOpacity={0.82}
    >
      {/* Initials Avatar */}
      <View style={[styles.avatar, { backgroundColor: avatarColor }]}>
        <Text style={styles.initials}>{initials}</Text>
      </View>

      {/* Info */}
      <View style={styles.info}>
        <Text style={styles.name}>{student.name} {student.surname}</Text>
        <Text style={styles.detail}>
          {age} years old  ·  {student.email}
        </Text>
      </View>

      {/* Chevron */}
      <Text style={styles.chevron}>›</Text>
    </TouchableOpacity>
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
    ...shadows.small,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  initials: {
    ...typography.h4,
    color: colors.text.inverse,
    letterSpacing: 0.5,
  },
  info: {
    flex: 1,
  },
  name: {
    ...typography.h4,
    color: colors.text.primary,
  },
  detail: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    marginTop: 3,
  },
  chevron: {
    fontSize: 22,
    color: colors.text.disabled,
    marginLeft: spacing.sm,
  },
});
