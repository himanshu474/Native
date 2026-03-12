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
import { RouteProp } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { lessonService } from '../../services/lessonServices';
import { mockSessions } from '../../data/sessions';
import { Lesson } from '../../types';
import { ParentStackParamList } from '../../navigation/types';
import { Loader, EmptyState, LessonCard, SkeletonList, SearchBar } from '../../components';
import { colors, spacing, typography, layout } from '../../theme';



type Props = {
  navigation: NativeStackNavigationProp<ParentStackParamList, 'LessonsList'>;
  route: RouteProp<ParentStackParamList, 'LessonsList'>;
};

export const LessonsListScreen: React.FC<Props> = ({ navigation, route }) => {
  const { studentName } = route.params;
  const insets = useSafeAreaInsets();

  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState('');

const filteredLessons = lessons.filter((lesson) => {
  if (!searchQuery.trim()) return true;
  return lesson.title.toLowerCase().includes(searchQuery.toLowerCase());
});

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
      setError('Failed to load lessons. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getSessionCount = (lessonId: string): number =>
    mockSessions.filter((s) => s.lessonId === lessonId).length;

  const handleLessonPress = (lesson: Lesson) => {
    navigation.navigate('SessionsList', {
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      studentName,
    });
  };

  // Possessive name — "Liam's" or "Alex's"
  const possessiveName = studentName.endsWith('s')
    ? `${studentName}'`
    : `${studentName}'s`;

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>

      {/* ── HEADER ── */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>{possessiveName} Lessons</Text>
          {!loading && (
            <Text style={styles.headerSubtitle}>
              {lessons.length} {lessons.length === 1 ? 'subject' : 'subjects'}
            </Text>
          )}
        </View>
        <View style={styles.headerRight} />
      </View>

      {/* ── CONTENT ── */}
      <View style={styles.content}>

{loading && (
  <View style={styles.skeletonContainer}>
    <SkeletonList type="lesson" count={4} />
  </View>
)}
        {!loading && error && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity onPress={loadLessons}>
              <Text style={styles.retryText}>Tap to retry</Text>
            </TouchableOpacity>
          </View>
        )}

        {!loading && !error && (
          <FlatList
data={filteredLessons} 
            keyExtractor={(item) => item.id}
            
            renderItem={({ item }) => (
              <LessonCard
                lesson={item}
                sessionCount={getSessionCount(item.id)}
                onPress={handleLessonPress}
              />
            )}
           ListHeaderComponent={
  <>
    {lessons.length > 0 && (
      <View style={styles.searchWrapper}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search subjects..."
        />
      </View>
    )}
    <Text style={styles.listHeader}>
      Select a subject to view sessions
    </Text>
  </>
}
            ListEmptyComponent={
              <EmptyState
                icon="📚"
                title="No lessons available"
                description="No lessons have been added yet."
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

  // ── Header ──
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.card,
    paddingHorizontal: layout.screenPadding,
    paddingBottom: spacing.md,
    paddingTop: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.default,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: colors.primary,
    fontWeight: '600',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    ...typography.h4,
    color: colors.text.primary,
  },
  headerSubtitle: {
    ...typography.caption,
    color: colors.text.secondary,
    marginTop: 2,
  },
  headerRight: {
    width: 40,
  },

  // ── Content ──
  content: {
    flex: 1,
  },
  listHeader: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },
  listContent: {
    padding: layout.screenPadding,
    paddingBottom: spacing.xxxl,
  },
  errorBox: {
    margin: layout.screenPadding,
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
  skeletonContainer: {
  padding: layout.screenPadding,
},
searchWrapper: {
  marginBottom: spacing.sm,
},
});