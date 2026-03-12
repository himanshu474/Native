import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { lessonService } from '../../services/lessonServices';
import { Session } from '../../types';
import { ParentStackParamList } from '../../navigation/types';
import { Loader, Card, SkeletonDetail } from '../../components';
import { colors, spacing, typography, layout, shadows } from '../../theme';
import { formatDate } from '../../utils/formatDate';
import { mockLessons } from '../../data/lessons';
import { mockSessions } from '../../data/sessions';



type Props = {
  navigation: NativeStackNavigationProp<ParentStackParamList, 'SessionDetail'>;
  route: RouteProp<ParentStackParamList, 'SessionDetail'>;
};

export const SessionDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { sessionId, topic } = route.params;
  const insets = useSafeAreaInsets();

  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSession();
  }, [sessionId]);

  const loadSession = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await lessonService.getSessionById(sessionId);
      setSession(data);
    } catch {
      setError('Failed to load session details.');
    } finally {
      setLoading(false);
    }
  };

  // Find the parent lesson for this session (for color + icon)
  const lesson = session
    ? mockLessons.find((l) => l.id === session.lessonId)
    : null;

  // Find sibling sessions (same lesson) for the "More Sessions" section
  const siblingsSessions = session
    ? mockSessions
        .filter((s) => s.lessonId === session.lessonId && s.id !== session.id)
        .slice(0, 2) // show max 2
    : [];

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
        <Text style={styles.headerTitle} numberOfLines={1}>
          Session Notes
        </Text>
        <View style={styles.headerRight} />
      </View>

      {/* ── COLORED ACCENT BAR ── */}
      {lesson && (
        <View style={[styles.accentBar, { backgroundColor: lesson.color }]} />
      )}

{loading && (
  <ScrollView showsVerticalScrollIndicator={false}>
    <SkeletonDetail />
  </ScrollView>
)}
      {!loading && error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity onPress={loadSession}>
            <Text style={styles.retryText}>Tap to retry</Text>
          </TouchableOpacity>
        </View>
      )}

      {!loading && !error && session && (
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: insets.bottom + spacing.xxxl },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* ── SUBJECT CONTEXT BANNER ── */}
          {lesson && (
            <View style={[styles.subjectBanner, { backgroundColor: `${lesson.color}12` }]}>
              <Text style={styles.subjectBannerEmoji}>{lesson.iconName}</Text>
              <Text style={[styles.subjectBannerText, { color: lesson.color }]}>
                {lesson.title}
              </Text>
            </View>
          )}

          {/* ── SESSION HEADER ── */}
          <View style={styles.sessionHeader}>
            <Text style={styles.topicTitle}>{session.topic}</Text>
            <View style={styles.dateBadge}>
              <Text style={styles.dateIcon}>📅</Text>
              <Text style={styles.dateText}>{formatDate(session.date)}</Text>
            </View>
          </View>

          {/* ── DIVIDER ── */}
          <View style={styles.divider} />

          {/* ── NOTES SECTION ── */}
          <View style={styles.notesSection}>
            <Text style={styles.notesLabel}>SESSION NOTES</Text>
            <Text style={styles.notesBody}>{session.summary}</Text>
          </View>

          {/* ── MORE FROM THIS SUBJECT ── */}
          {siblingsSessions.length > 0 && (
            <View style={styles.moreSection}>
              <Text style={styles.moreLabel}>MORE FROM {lesson?.title.toUpperCase()}</Text>
              {siblingsSessions.map((sibling) => (
                <TouchableOpacity
                  key={sibling.id}
                  style={styles.siblingCard}
                  onPress={() =>
                    navigation.replace('SessionDetail', {
                      sessionId: sibling.id,
                      topic: sibling.topic,
                    })
                  }
                  activeOpacity={0.8}
                >
                  <View style={styles.siblingContent}>
                    <Text style={styles.siblingTopic} numberOfLines={1}>
                      {sibling.topic}
                    </Text>
                    <Text style={styles.siblingDate}>
                      {formatDate(sibling.date)}
                    </Text>
                  </View>
                  <Text style={styles.siblingChevron}>›</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>
      )}
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
  headerTitle: {
    ...typography.h4,
    color: colors.text.primary,
    flex: 1,
    textAlign: 'center',
  },
  headerRight: {
    width: 40,
  },
  accentBar: {
    height: 3,
  },

  // ── Loading / Error ──
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
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

  // ── Scroll content ──
  scrollContent: {
    padding: layout.screenPadding,
  },

  // ── Subject banner ──
  subjectBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 10,
    marginBottom: spacing.lg,
    alignSelf: 'flex-start',
  },
  subjectBannerEmoji: {
    fontSize: 16,
  },
  subjectBannerText: {
    ...typography.caption,
    fontWeight: '700',
    letterSpacing: 0.3,
  },

  // ── Session header ──
  sessionHeader: {
    marginBottom: spacing.lg,
  },
  topicTitle: {
    ...typography.h1,
    color: colors.text.primary,
    marginBottom: spacing.md,
    lineHeight: 36,
  },
  dateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  dateIcon: {
    fontSize: 15,
  },
  dateText: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },

  // ── Divider ──
  divider: {
    height: 1,
    backgroundColor: colors.border.default,
    marginBottom: spacing.lg,
  },

  // ── Notes ──
  notesSection: {
    marginBottom: spacing.xl,
  },
  notesLabel: {
    ...typography.caption,
    color: colors.text.disabled,
    letterSpacing: 1.2,
    marginBottom: spacing.md,
  },
  notesBody: {
    ...typography.body,
    color: colors.text.primary,
    lineHeight: 26,
   
  },

  // ── More sessions ──
  moreSection: {
    marginTop: spacing.md,
  },
  moreLabel: {
    ...typography.caption,
    color: colors.text.disabled,
    letterSpacing: 1.2,
    marginBottom: spacing.md,
  },
  siblingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.card,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
    ...shadows.small,
  },
  siblingContent: {
    flex: 1,
  },
  siblingTopic: {
    ...typography.h4,
    color: colors.text.primary,
  },
  siblingDate: {
    ...typography.caption,
    color: colors.text.secondary,
    marginTop: 3,
  },
  siblingChevron: {
    fontSize: 22,
    color: colors.text.disabled,
  },
});