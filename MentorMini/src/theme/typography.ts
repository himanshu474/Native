import { Platform } from 'react-native';

// 🔤 UI Design Reasoning:
// Typography hierarchy tells users WHAT to read first.
// Use max 3-4 font sizes per screen to avoid visual chaos.
//
// System fonts (San Francisco on iOS, Roboto on Android) look native and load instantly.
//
// Weight system:
//   Regular (400) → body text
//   Medium (500)  → labels, captions
//   SemiBold (600) → card titles, section headers
//   Bold (700)    → screen titles, key numbers

const fontFamily = Platform.select({
  ios: {
    regular: 'System',
    medium: 'System',
    semiBold: 'System',
    bold: 'System',
  },
  android: {
    regular: 'Roboto',
    medium: 'Roboto-Medium',
    semiBold: 'Roboto-Medium',
    bold: 'Roboto-Bold',
  },
  default: {
    regular: 'System',
    medium: 'System',
    semiBold: 'System',
    bold: 'System',
  },
});

export const typography = {
  // Screen titles — largest, bold
  h1: {
    fontSize: 28,
    fontWeight: '700' as const,
    lineHeight: 36,
    letterSpacing: -0.5,
  },
  // Section headers
  h2: {
    fontSize: 22,
    fontWeight: '700' as const,
    lineHeight: 30,
    letterSpacing: -0.3,
  },
  // Card titles
  h3: {
    fontSize: 18,
    fontWeight: '600' as const,
    lineHeight: 26,
  },
  // Sub-section labels
  h4: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
  // Standard body text
  body: {
    fontSize: 15,
    fontWeight: '400' as const,
    lineHeight: 22,
  },
  // Secondary body / descriptions
  bodySmall: {
    fontSize: 13,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  // Labels, tags, captions
  caption: {
    fontSize: 12,
    fontWeight: '500' as const,
    lineHeight: 16,
    letterSpacing: 0.2,
  },
  // Buttons
  button: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 20,
    letterSpacing: 0.1,
  },
} as const;

export type Typography = typeof typography;