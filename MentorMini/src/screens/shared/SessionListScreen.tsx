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
import { Session } from '../../types';
import { ParentStackParamList } from '../../navigation/types';
import { Loader, EmptyState, SessionCard, SkeletonList } from '../../components';
import { colors, spacing, typography, layout } from '../../theme';
import { mockLessons } from '../../data/lessons';

type Props = {
  navigation: NativeStackNavigationProp<ParentStackParamList, 'SessionsList'>;
  route: RouteProp<ParentStackParamList, 'SessionsList'>;
};

export const SessionsListScreen: React.FC<Props> = ({ navigation, route }) => {
  const { lessonId, lessonTitle, studentName } = route.params;
  const insets = useSafeAreaInsets();

  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Find lesson metadata for the accent color
  const lesson = mockLessons.find((l) => l.id === lessonId);

  useFocusEffect(
    useCallback(() => {
      loadSessions();
    }, [lessonId])
  );

  const loadSessions = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await lessonService.getSessionsByLesson(lessonId);
      setSessions(data);
    } catch {
      setError('Failed to load sessions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSessionPress = (session: Session) => {
    navigation.navigate('SessionDetail', {
      sessionId: session.id,
      topic: session.topic,
    });
  };

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
          {/* Subject icon + name */}
          <View style={styles.subjectRow}>
            {lesson && (
              <View style={[
                styles.subjectIcon,
                { backgroundColor: `${lesson.color}18` }
              ]}>
                <Text style={styles.subjectEmoji}>{lesson.iconName}</Text>
              </View>
            )}
            <Text style={styles.headerTitle}>{lessonTitle}</Text>
          </View>
          <Text style={styles.headerSubtitle}>{studentName}</Text>
        </View>

        <View style={styles.headerRight} />
      </View>

      {/* ── COLORED ACCENT BAR ── */}
      {lesson && (
        <View style={[styles.accentBar, { backgroundColor: lesson.color }]} />
      )}

      {/* ── CONTENT ── */}
      <View style={styles.content}>

{loading && (
  <View style={styles.skeletonContainer}>
    <SkeletonList type="session" count={3} />
  </View>
)}
        {!loading && error && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity onPress={loadSessions}>
              <Text style={styles.retryText}>Tap to retry</Text>
            </TouchableOpacity>
          </View>
        )}

        {!loading && !error && (
          <FlatList
            data={sessions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <SessionCard
                session={item}
                onPress={handleSessionPress}
              />
            )}
            ListHeaderComponent={
              !loading && sessions.length > 0 ? (
                <View style={styles.listHeaderRow}>
                  <Text style={styles.listHeaderText}>
                    {sessions.length} {sessions.length === 1 ? 'session' : 'sessions'}
                  </Text>
                  <Text style={styles.listHeaderHint}>Most recent first</Text>
                </View>
              ) : null
            }
            ListEmptyComponent={
              <EmptyState
                icon="🗓️"
                title="No sessions yet"
                description={`No sessions have been recorded for ${lessonTitle} yet.`}
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
  subjectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  subjectIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subjectEmoji: {
    fontSize: 16,
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

  accentBar: {
    height: 3,
    width: '100%',
  },

  // ── Content ──
  content: {
    flex: 1,
  },
  listHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  listHeaderText: {
    ...typography.h4,
    color: colors.text.primary,
  },
  listHeaderHint: {
    ...typography.caption,
    color: colors.text.secondary,
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
});