import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAuth } from '../../context/AuthContext';
import { studentService } from '../../services/studentService';
import { Student } from '../../types';
import { ParentStackParamList } from '../../navigation/types';
import { useRefresh } from '../../hooks/useRefresh';

import {
//   Loader,
  EmptyState,
  StudentCard,
  SkeletonList,
  SearchBar,
} from '../../components';
import { colors, spacing, typography, layout } from '../../theme';

type Props = {
  navigation: NativeStackNavigationProp<ParentStackParamList, 'ParentDashboard'>;
};

export const ParentDashboard: React.FC<Props> = ({ navigation }) => {
  const { user, logout } = useAuth();
  const insets = useSafeAreaInsets();

  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
const [searchQuery, setSearchQuery] = useState('');


  // Runs every time this screen is focused
  useFocusEffect(
    useCallback(() => {
      loadStudents();
    }, [])
  );

  const filteredStudents = students.filter((student) => {
  if (!searchQuery.trim()) return true;
  const query = searchQuery.toLowerCase();
  const fullName = `${student.name} ${student.surname}`.toLowerCase();
  return (
    fullName.includes(query) ||
    student.email.toLowerCase().includes(query)
  );
});

  const loadStudents = async () => {
    if (!user) return;
    try {
      setLoading(true);
      setError(null);
      const data = await studentService.getStudentsByParent(user.id);
      setStudents(data);
    } catch (err) {
      setError('Failed to load students. Please try again.');
    } finally {
      setLoading(false);
    }
  };

    const { isRefreshing, onRefresh } = useRefresh(loadStudents);


  const handleStudentPress = (student: Student) => {
    navigation.navigate('LessonsList', {
      studentId: student.id,
      studentName: `${student.name} ${student.surname}`,
    });
  };

  const handleAddStudent = () => {
    navigation.navigate('CreateStudent');
  };

  const firstName = user?.name.split(' ')[0] ?? 'there';

 return (
  <View style={[styles.root, { paddingTop: insets.top }]}>
    {/* HEADER */}
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <View>
          <Text style={styles.greeting}>Hello, {firstName} 👋</Text>
          <Text style={styles.headerSubtitle}>Manage your students</Text>
        </View>
        <TouchableOpacity onPress={async () => { await logout(); }} style={styles.logoutButton}>
          <Text style={styles.logoutIcon}>⎋</Text>
        </TouchableOpacity>
      </View>

      {!loading && (
        <View style={styles.statsRow}>
          <View style={styles.statChip}>
            <Text style={styles.statNumber}>{students.length}</Text>
            <Text style={styles.statLabel}>
              {students.length === 1 ? 'Student' : 'Students'}
            </Text>
          </View>
        </View>
      )}
    </View>

    {/* CONTENT */}
    <View style={styles.content}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>My Students</Text>
        <TouchableOpacity onPress={handleAddStudent} style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Add</Text>
        </TouchableOpacity>
      </View>

      {/* Logic chain: Loading -> Error -> List */}
      {loading ? (
        <SkeletonList type="student" count={4} />
      ) : error ? (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity onPress={loadStudents}>
            <Text style={styles.retryText}>Tap to retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {students.length > 0 && (
            <SearchBar
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search students..."
            />
          )}
          <FlatList
            data={filteredStudents}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <StudentCard student={item} onPress={handleStudentPress} />
            )}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={onRefresh}
                tintColor={colors.primary}
                colors={[colors.primary]}
              />
            }
            ListEmptyComponent={
              searchQuery ? (
                <EmptyState
                  icon="🔍"
                  title="No results found"
                  description={`No students match "${searchQuery}".`}
                />
              ) : (
                <EmptyState
                  icon="👨‍🎓"
                  title="No students yet"
                  description="Add your first student to get started."
                  actionLabel="Add Student"
                  onAction={handleAddStudent}
                />
              )
            }
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
    </View>

    {/* FAB */}
    {!loading && students.length > 0 && (
      <TouchableOpacity
        style={[styles.fab, { bottom: insets.bottom + spacing.lg }]}
        onPress={handleAddStudent}
        activeOpacity={0.85}
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    )}
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
  greeting: {
    ...typography.h2,
    color: colors.text.primary,
  },
  headerSubtitle: {
    ...typography.body,
    color: colors.text.secondary,
    marginTop: 2,
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
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  statChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    borderRadius: 20,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    gap: spacing.xs,
  },
  statNumber: {
    ...typography.h4,
    color: colors.primary,
  },
  statLabel: {
    ...typography.bodySmall,
    color: colors.primary,
  },

  content: {
    flex: 1,
    paddingHorizontal: layout.screenPadding,
    paddingTop: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text.primary,
  },
  addButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    backgroundColor: colors.primaryLight,
    borderRadius: 20,
  },
  addButtonText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '700',
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

  fab: {
    position: 'absolute',
    right: layout.screenPadding,
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  fabIcon: {
    fontSize: 28,
    color: colors.text.inverse,
    lineHeight: 32,
  },
});