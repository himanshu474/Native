import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '../../theme';


type HeaderMode = 'default' | 'dashboard' | 'modal';

interface HeaderProps {
  title: string;
  subtitle?: string;
  mode?: HeaderMode;
  showBack?: boolean;
  onBack?: () => void;
  rightElement?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  mode = 'default',
  showBack = false,
  onBack,
  rightElement,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + spacing.sm }]}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background.card} />

      <View style={styles.row}>
        {/* Left — back button */}
        <View style={styles.sideSlot}>
          {showBack && onBack && (
            <TouchableOpacity
              onPress={onBack}
              style={styles.backButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Center/Left — title */}
        <View style={[styles.titleContainer, mode === 'dashboard' && styles.titleLeft]}>
          <Text
            style={[styles.title, mode === 'dashboard' && styles.dashboardTitle]}
            numberOfLines={1}
          >
            {title}
          </Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>

        {/* Right — custom element */}
        <View style={styles.sideSlot}>
          {rightElement}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.card,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.default,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 44,
  },
  sideSlot: {
    width: 44,
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  titleLeft: {
    alignItems: 'flex-start',
  },
  title: {
    ...typography.h4,
    color: colors.text.primary,
  },
  dashboardTitle: {
    ...typography.h2,
  },
  subtitle: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    marginTop: 2,
  },
  backButton: {
    padding: spacing.xs,
  },
  backIcon: {
    fontSize: 22,
    color: colors.primary,
    fontWeight: '600',
  },
});