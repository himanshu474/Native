import { View,
     Text,
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet,
    ViewStyle,
    TextStyle
    } from 'react-native'
import React from 'react'
import { colors,spacing,typography,layout } from '../../theme'

type ButtonVariant='primary' |'secondary' |'ghost';
type ButtonSize='large' | 'medium' | 'small';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  size = 'large',
  loading = false,
  disabled = false,
  fullWidth = false,
  style,
}) => {
  const isDisabled = disabled || loading;
return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.75}
      style={[
        styles.base,
        styles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        style,
      ]}
    >
        {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? colors.text.inverse : colors.primary}
        />
      ) : (
        <Text style={[styles.label, styles[`${variant}Label`], styles[`${size}Label`]]}>
          {label}
        </Text>
      )}

    </TouchableOpacity>

  );
};



const styles = StyleSheet.create({
  base: {
    borderRadius: layout.buttonRadius,
    alignItems: 'center',
    justifyContent: 'center',
    // Min 44pt height — Apple HIG accessibility requirement
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },

  // --- Variants ---
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.primaryLight,
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  ghost: {
    backgroundColor: 'transparent',
  },

  // --- Sizes ---
  large: {
    height: 54,
    paddingHorizontal: spacing.xl,
  },
  medium: {
    height: 44,
    paddingHorizontal: spacing.lg,
  },
  small: {
    height: 34,
    paddingHorizontal: spacing.md,
  },

  // --- Labels ---
  label: {
    ...typography.button,
  },
  primaryLabel: {
    color: colors.text.inverse,
  },
  secondaryLabel: {
    color: colors.primary,
  },
  ghostLabel: {
    color: colors.primary,
  },
  largeLabel: {
    fontSize: 16,
  },
  mediumLabel: {
    fontSize: 15,
  },
  smallLabel: {
    fontSize: 13,
  },
});