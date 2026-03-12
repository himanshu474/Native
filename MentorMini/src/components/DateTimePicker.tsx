import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Modal,
} from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { colors, spacing, typography, layout } from '../theme';
import { formatDate } from '../utils/formatDate';



interface DatePickerInputProps {
  label: string;
  value: string;           // ISO string: "2012-05-20"
  onChange: (date: string) => void;
  error?: string;
  maximumDate?: Date;
  minimumDate?: Date;
}

export const DatePickerInput: React.FC<DatePickerInputProps> = ({
  label,
  value,
  onChange,
  error,
  maximumDate = new Date(),     // Default: can't pick future dates
  minimumDate = new Date(1990, 0, 1),
}) => {
  const [showPicker, setShowPicker] = useState(false);

  const dateValue = value ? new Date(value) : new Date(2010, 0, 1);

  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      // Android fires onChange on both confirm AND dismiss
      setShowPicker(false);
      if (event.type === 'set' && selectedDate) {
        onChange(selectedDate.toISOString().split('T')[0]);
      }
    } else {
     
      if (selectedDate) {
        onChange(selectedDate.toISOString().split('T')[0]);
      }
    }
  };

  const hasValue = !!value;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>

      {/* Pressable field — looks like our Input component */}
      <TouchableOpacity
        style={[styles.field, error ? styles.fieldError : null]}
        onPress={() => setShowPicker(true)}
        activeOpacity={0.7}
      >
        <Text style={hasValue ? styles.valueText : styles.placeholderText}>
          {hasValue ? formatDate(value) : 'Select date of birth'}
        </Text>
        <Text style={styles.calendarIcon}>📅</Text>
      </TouchableOpacity>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* ── ANDROID: direct picker ── */}
      {Platform.OS === 'android' && showPicker && (
        <DateTimePicker
          value={dateValue}
          mode="date"
          display="default"
          onChange={handleChange}
          maximumDate={maximumDate}
          minimumDate={minimumDate}
        />
      )}

      {/* ── iOS: modal wrapper ── */}
      {Platform.OS === 'ios' && (
        <Modal
          visible={showPicker}
          transparent
          animationType="slide"
          onRequestClose={() => setShowPicker(false)}
        >
          <View style={styles.modalOverlay}>
            <TouchableOpacity
              style={styles.modalBackdrop}
              onPress={() => setShowPicker(false)}
            />
            <View style={styles.modalSheet}>
              {/* Modal header */}
              <View style={styles.modalHeader}>
                <TouchableOpacity onPress={() => setShowPicker(false)}>
                  <Text style={styles.modalCancel}>Cancel</Text>
                </TouchableOpacity>
                <Text style={styles.modalTitle}>Date of Birth</Text>
                <TouchableOpacity onPress={() => setShowPicker(false)}>
                  <Text style={styles.modalDone}>Done</Text>
                </TouchableOpacity>
              </View>

              <DateTimePicker
                value={dateValue}
                mode="date"
                display="spinner"
                onChange={handleChange}
                maximumDate={maximumDate}
                minimumDate={minimumDate}
                style={styles.iosPicker}
              />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing.md,
  },
  label: {
    ...typography.caption,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background.input,
    borderRadius: layout.inputRadius,
    borderWidth: 1.5,
    borderColor: 'transparent',
    paddingHorizontal: spacing.md,
    height: 52,
  },
  fieldError: {
    borderColor: colors.error,
    backgroundColor: '#FFF5F5',
  },
  valueText: {
    ...typography.body,
    color: colors.text.primary,
  },
  placeholderText: {
    ...typography.body,
    color: colors.text.disabled,
  },
  calendarIcon: {
    fontSize: 18,
  },
  errorText: {
    ...typography.caption,
    color: colors.error,
    marginTop: spacing.xs,
  },

  // ── iOS Modal ──
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalSheet: {
    backgroundColor: colors.background.card,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: spacing.xl,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.default,
  },
  modalTitle: {
    ...typography.h4,
    color: colors.text.primary,
  },
  modalCancel: {
    ...typography.body,
    color: colors.text.secondary,
  },
  modalDone: {
    ...typography.body,
    color: colors.primary,
    fontWeight: '700',
  },
  iosPicker: {
    height: 200,
  },
});