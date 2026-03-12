import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { studentService } from '../../services/studentService';
import { useAuth } from '../../context/AuthContext';
import { ParentStackParamList } from '../../navigation/types';
import { Button, DatePickerInput, Input } from '../../components';
import { colors, spacing, typography, layout } from '../../theme';



type Props = {
  navigation: NativeStackNavigationProp<ParentStackParamList, 'CreateStudent'>;
};

interface FormFields {
  name: string;
  surname: string;
  email: string;
  password: string;
  dateOfBirth: string;
}

interface FormErrors {
  name: string;
  surname: string;
  email: string;
  password: string;
  dateOfBirth: string;
}

const EMPTY_FORM: FormFields = {
  name: '',
  surname: '',
  email: '',
  password: '',
  dateOfBirth: '',
};

const EMPTY_ERRORS: FormErrors = {
  name: '',
  surname: '',
  email: '',
  password: '',
  dateOfBirth: '',
};

export const CreateStudentScreen: React.FC<Props> = ({ navigation }) => {
  const { user } = useAuth();
  const insets = useSafeAreaInsets();

  const [form, setForm] = useState<FormFields>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>(EMPTY_ERRORS);
  const [loading, setLoading] = useState(false);

  const updateField = (field: keyof FormFields, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Clear error as user types
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors = { ...EMPTY_ERRORS };
    let valid = true;

    if (!form.name.trim()) {
      newErrors.name = 'First name is required.';
      valid = false;
    }

    if (!form.surname.trim()) {
      newErrors.surname = 'Surname is required.';
      valid = false;
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email is required.';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Enter a valid email address.';
      valid = false;
    }

    if (!form.password) {
      newErrors.password = 'Password is required.';
      valid = false;
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
      valid = false;
    }

    if (!form.dateOfBirth.trim()) {
      newErrors.dateOfBirth = 'Date of birth is required.';
      valid = false;
    } 

    setErrors(newErrors);
    return valid;
  };

  const handleCreate = async () => {
    if (!validate() || !user) return;

    try {
      setLoading(true);
      await studentService.createStudent({
        parentId: user.id,
        name: form.name.trim(),
        surname: form.surname.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
        dateOfBirth: form.dateOfBirth,
      });

      // Success — go back. useFocusEffect on dashboard will reload list.
      navigation.goBack();

    } catch (err) {
      Alert.alert(
        'Error',
        'Failed to create student. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* ── HEADER ── */}
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Student</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + spacing.xl },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* ── SECTION 1: Identity ── */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Personal Info</Text>
          <View style={styles.sectionCard}>
            <Input
              label="First Name"
              value={form.name}
              onChangeText={(v) => updateField('name', v)}
              error={errors.name}
              placeholder="e.g. Liam"
              autoCapitalize="words"
              returnKeyType="next"
            />
            <Input
              label="Surname"
              value={form.surname}
              onChangeText={(v) => updateField('surname', v)}
              error={errors.surname}
              placeholder="e.g. Johnson"
              autoCapitalize="words"
              returnKeyType="next"
            />
          </View>
        </View>

        {/* ── SECTION 2: Account ── */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Account Details</Text>
          <View style={styles.sectionCard}>
            <Input
              label="Email Address"
              value={form.email}
              onChangeText={(v) => updateField('email', v)}
              error={errors.email}
              placeholder="student@example.com"
              keyboardType="email-address"
              autoComplete="email"
              returnKeyType="next"
            />
            <Input
              label="Password"
              value={form.password}
              onChangeText={(v) => updateField('password', v)}
              error={errors.password}
              placeholder="Min. 6 characters"
              isPassword
              returnKeyType="next"
            />
          </View>
        </View>

        {/* ── SECTION 3: Personal ── */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Date of Birth</Text>
          <View style={styles.sectionCard}>
             <DatePickerInput
      label="Date of Birth"
      value={form.dateOfBirth}
      onChange={(date: string) => updateField('dateOfBirth', date)}
      error={errors.dateOfBirth}
    />
            <Text style={styles.formatHint}>
              💡 Format: YYYY-MM-DD — e.g. 2012-05-20
            </Text>
          </View>
        </View>

        {/* ── SUBMIT ── */}
        <View style={styles.submitSection}>
          <Button
            label="Create Student"
            onPress={handleCreate}
            loading={loading}
            disabled={loading}
            fullWidth
          />
          <Button
            label="Cancel"
            onPress={() => navigation.goBack()}
            variant="ghost"
            fullWidth
            style={styles.cancelButton}
          />
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

  // ── Header ──
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background.card,
    paddingHorizontal: layout.screenPadding,
    paddingBottom: spacing.md,
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
  },
  headerRight: {
    width: 40,
  },

  // ── Form sections ──
  scrollContent: {
    padding: layout.screenPadding,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionLabel: {
    ...typography.caption,
    color: colors.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
  },
  sectionCard: {
    backgroundColor: colors.background.card,
    borderRadius: layout.cardRadius,
    padding: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  formatHint: {
    ...typography.caption,
    color: colors.text.secondary,
    marginTop: -spacing.xs,
    marginLeft: spacing.xs,
  },

  // ── Submit ──
  submitSection: {
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  cancelButton: {
    marginTop: spacing.xs,
  },
});