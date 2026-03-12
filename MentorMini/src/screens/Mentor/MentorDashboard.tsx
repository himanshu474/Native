import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAuth } from '../../context/AuthContext';
import { studentService } from '../../services/studentService';
import { Student } from '../../types';
import { MentorStackParamList } from '../../navigation/types';
import { Loader, EmptyState, StudentCard, RoleBadge, SkeletonList } from '../../components';
import { colors, spacing, typography, layout } from '../../theme';



type Props = {
  navigation: NativeStackNavigationProp<MentorStackParamList, 'MentorDashboard'>;
};

export const MentorDashboard: React.FC<Props> = ({ navigation }) => {
  const { user, logout } = useAuth();
  const insets = useSafeAreaInsets();

  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      loadStudents();
    }, [])
  );

  const loadStudents = async () => {
    if (!user) return;
    try {
      setLoading(true);
      setError(null);
      const data = await studentService.getStudentsByMentor(user.id);
      setStudents(data);
    } catch {
      setError('Failed to load students.');
    } finally {
      setLoading(false);
    }
  };

  const handleStudentPress = (student: Student) => {
    navigation.navigate('LessonsList', {
      studentId: student.id,
      studentName: `${student.name} ${student.surname}`,
    });
  };

  const firstName = user?.name.split(' ')[0] ?? 'there';

 return (
  <View style={[styles.root, { paddingTop: insets.top }]}>
    {/* HEADER */}
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <View style={styles.headerLeft}>
          <RoleBadge role="mentor" />
          <Text style={styles.greeting}>Welcome, {firstName} 🎓</Text>
          <Text style={styles.subtitle}>Your assigned students</Text>
        </View>
        <TouchableOpacity
          onPress={async () => { await logout(); }}
          style={styles.logoutButton}
        >
          <Text style={styles.logoutIcon}>⎋</Text>
        </TouchableOpacity>
      </View>

      {!loading && (
        <View style={styles.countChip}>
          <Text style={styles.countChipText}>
            {students.length} {students.length === 1 ? 'student' : 'students'} assigned
          </Text>
        </View>
      )}
    </View>

    {/* CONTENT */}
    <View style={styles.content}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>My Students</Text>
      </View>

      {/* Chained Logic to prevent stray text strings */}
      {loading ? (
        <SkeletonList type="student" count={3} />
      ) : error ? (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity onPress={loadStudents}>
            <Text style={styles.retryText}>Tap to retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={students}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <StudentCard student={item} onPress={handleStudentPress} />
          )}
          ListEmptyComponent={
            <EmptyState
              icon="👥"
              title="No students assigned"
              description="You don't have any students assigned yet."
            />
          }
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  </View>
);

};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background.screen,
  },
  header: {
    backgroundColor: colors.background.card,
    paddingHorizontal: layout.screenPadding,
    paddingBottom: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.default,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: spacing.md,
  },
  headerLeft: {
    gap: spacing.xs,
  },
  greeting: {
    ...typography.h2,
    color: colors.text.primary,
    marginTop: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: colors.text.secondary,
  },
  logoutButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.background.input,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutIcon: {
    fontSize: 18,
  },
  countChip: {
    marginTop: spacing.md,
    alignSelf: 'flex-start',
    backgroundColor: '#ECFDF5',
    borderRadius: 20,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  countChipText: {
    ...typography.caption,
    color: colors.mentor,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: layout.screenPadding,
    paddingTop: spacing.lg,
  },
  sectionHeader: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text.primary,
  },
  listContent: {
    paddingBottom: spacing.xxxl,
  },
  errorBox: {
    backgroundColor: '#FFF5F5',
    borderRadius: 12,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FED7D7',
  },
  errorText: {
    ...typography.body,
    color: colors.error,
    textAlign: 'center',
  },
  retryText: {
    ...typography.bodySmall,
    color: colors.primary,
    marginTop: spacing.sm,
    fontWeight: '600',
  },
});