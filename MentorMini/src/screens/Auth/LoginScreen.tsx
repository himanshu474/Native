import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, Input } from '../../components';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/authService';
import { colors, spacing, typography, layout } from '../../theme';

const TEST_ACCOUNTS = [
  { label: 'Parent', email: 'parent@mentora.com' },
  { label: 'Student', email: 'student@mentora.com' },
  { label: 'Mentor', email: 'mentor@mentora.com' },
];

export const LoginScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

 
  const validate = (): boolean => {
    let valid = true;

    if (!email.trim()) {
      setEmailError('Email is required.');
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Enter a valid email address.');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password is required.');
      valid = false;
    } else if (password.length < 3) {
      setPasswordError('Password must be at least 3 characters.');
      valid = false;
    } else {
      setPasswordError('');
    }

    return valid;
  };

  const handleLogin = async () => {
  setError(null);
  if (!validate()) return;

  try {
    setLoading(true);
    const { user, token } = await authService.login(email.trim(), password);
    await login(user, token);        
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Login failed. Please try again.');
  } finally {
    setLoading(false);
  }
};

  const fillTestAccount = (testEmail: string) => {
    setEmail(testEmail);
    setPassword('password123');
    setEmailError('');
    setPasswordError('');
    setError(null);
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + spacing.xl, paddingBottom: insets.bottom + spacing.xl },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoEmoji}>🎓</Text>
          </View>
          <Text style={styles.appName}>Mentora</Text>
          <Text style={styles.tagline}>Learning that grows with you</Text>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Welcome back</Text>
          <Text style={styles.formSubtitle}>Sign in to continue your journey</Text>

          {error && (
            <View style={styles.errorBanner}>
              <Text style={styles.errorBannerIcon}>⚠️</Text>
              <Text style={styles.errorBannerText}>{error}</Text>
            </View>
          )}

          <Input
            label="Email Address"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (emailError) setEmailError('');
            }}
            error={emailError}
            placeholder="you@example.com"
            keyboardType="email-address"
            autoComplete="email"
            returnKeyType="next"
          />

          <Input
            label="Password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (passwordError) setPasswordError('');
            }}
            error={passwordError}
            placeholder="Enter your password"
            isPassword
            returnKeyType="done"
            onSubmitEditing={handleLogin}
          />

          <TouchableOpacity
            style={styles.forgotPassword}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
          </TouchableOpacity>

          <Button
            label="Sign In"
            onPress={handleLogin}
            loading={loading}
            disabled={loading}
            fullWidth
            style={styles.loginButton}
          />
        </View>

      
        <View style={styles.testSection}>
          <Text style={styles.testLabel}>DEV — Quick Login</Text>
          <View style={styles.testRow}>
            {TEST_ACCOUNTS.map((account) => (
              <TouchableOpacity
                key={account.email}
                style={styles.testChip}
                onPress={() => fillTestAccount(account.email)}
              >
                <Text style={styles.testChipText}>{account.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background.screen,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: layout.screenPadding,
  },

  hero: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    marginBottom: spacing.lg,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  logoEmoji: {
    fontSize: 40,
  },
  appName: {
    ...typography.h1,
    color: colors.primary,
    letterSpacing: -1,
  },
  tagline: {
    ...typography.body,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },

  formCard: {
    backgroundColor: colors.background.card,
    borderRadius: 24,
    padding: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  formTitle: {
    ...typography.h2,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  formSubtitle: {
    ...typography.body,
    color: colors.text.secondary,
    marginBottom: spacing.lg,
  },

  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5F5',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FED7D7',
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  errorBannerIcon: {
    fontSize: 16,
    marginRight: spacing.sm,
  },
  errorBannerText: {
    ...typography.bodySmall,
    color: colors.error,
    flex: 1,
  },

  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: -spacing.sm,
    marginBottom: spacing.lg,
  },
  forgotPasswordText: {
    ...typography.bodySmall,
    color: colors.primary,
    fontWeight: '600',
  },

  loginButton: {
    marginTop: spacing.xs,
  },

  testSection: {
    marginTop: spacing.xl,
    alignItems: 'center',
  },
  testLabel: {
    ...typography.caption,
    color: colors.text.disabled,
    marginBottom: spacing.sm,
    letterSpacing: 1,
  },
  testRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  testChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.background.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border.default,
  },
  testChipText: {
    ...typography.caption,
    color: colors.text.secondary,
    fontWeight: '600',
  },
});