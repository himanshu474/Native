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
import { lessonService } from '../../services/lessonServices';
import { mockSessions } from '../../data/sessions';
import { Lesson } from '../../types';
import { StudentStackParamList } from '../../navigation/types';
import { Loader, EmptyState, LessonCard, RoleBadge, SkeletonList } from '../../components';
import { colors, spacing, typography, layout } from '../../theme';



type Props = {
  navigation: NativeStackNavigationProp<StudentStackParamList, 'StudentDashboard'>;
};

export const StudentDashboard: React.FC<Props> = ({ navigation }) => {
  const { user, logout } = useAuth();
  const insets = useSafeAreaInsets();

  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      loadLessons();
    }, [])
  );

  const loadLessons = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await lessonService.getLessons();
      setLessons(data);
    } catch {
      setError('Failed to load lessons.');
    } finally {
      setLoading(false);
    }
  };

  const getSessionCount = (lessonId: string): number =>
    mockSessions.filter((s) => s.lessonId === lessonId).length;

  const handleLessonPress = (lesson: Lesson) => {
    navigation.navigate('LessonsList', {
      studentId: user?.id ?? '',
      studentName: user?.name ?? '',
    });
  };

  // Total sessions across all lessons — shown in stats row
  const totalSessions = lessons.reduce(
    (sum, lesson) => sum + getSessionCount(lesson.id), 0
  );

  const firstName = user?.name.split(' ')[0] ?? 'there';

  return (
  <View style={[styles.root, { paddingTop: insets.top }]}>
    {/* HEADER */}
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <View style={styles.headerLeft}>
          <RoleBadge role="student" />
          <Text style={styles.greeting}>Hey, {firstName} 👋</Text>
          <Text style={styles.subtitle}>Ready to learn today?</Text>
        </View>
        <TouchableOpacity
          onPress={async () => { await logout(); }}
          style={styles.logoutButton}
        >
          <Text style={styles.logoutIcon}>⎋</Text>
        </TouchableOpacity>
      </View>

      {!loading && (
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{lessons.length}</Text>
            <Text style={styles.statLabel}>Subjects</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{totalSessions}</Text>
            <Text style={styles.statLabel}>Sessions</Text>
          </View>
        </View>
      )}
    </View>

    {/* CONTENT */}
    <View style={styles.content}>
      <Text style={styles.sectionTitle}>My Lessons</Text>

      {loading ? (
        <SkeletonList type="lesson" count={4} />
      ) : error ? (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity onPress={loadLessons}>
            <Text style={styles.retryText}>Tap to retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={lessons}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <LessonCard
              lesson={item}
              sessionCount={getSessionCount(item.id)}
              onPress={handleLessonPress}
            />
          )}
          ListEmptyComponent={
            <EmptyState
              icon="📚"
              title="No lessons yet"
              description="Your mentor hasn't added any lessons yet. Check back soon."
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

  statsRow: {
    flexDirection: 'row',
    marginTop: spacing.lg,
    backgroundColor: colors.primaryLight,
    borderRadius: 14,
    padding: spacing.md,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: `${colors.primary}30`,
  },
  statNumber: {
    ...typography.h2,
    color: colors.primary,
  },
  statLabel: {
    ...typography.caption,
    color: colors.primary,
    marginTop: 2,
  },

  content: {
    flex: 1,
    paddingHorizontal: layout.screenPadding,
    paddingTop: spacing.lg,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: spacing.md,
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