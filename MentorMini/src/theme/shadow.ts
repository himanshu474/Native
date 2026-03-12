import { Platform } from 'react-native';

// 🌫️ UI Design Reasoning:
// Shadows create depth — they tell users "this element is interactive/elevated."
// iOS and Android handle shadows differently, so we must handle both.
//
// Rule: Use shadows sparingly. Only cards and floating buttons need shadows.
// Too many shadows = visual clutter.
//
// 3 levels:
//   small  → subtle list items
//   medium → cards (most common)
//   large  → modals, floating action buttons

const createShadow = (
  elevation: number,
  opacity: number,
  radius: number,
  offsetY: number
) =>
  Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: offsetY },
      shadowOpacity: opacity,
      shadowRadius: radius,
    },
    android: {
      elevation,
    },
    default: {},
  });

export const shadows = {
  small: createShadow(2, 0.06, 4, 1),
  medium: createShadow(4, 0.08, 8, 2),
  large: createShadow(8, 0.12, 16, 4),
} as const;

export type Shadows = typeof shadows;