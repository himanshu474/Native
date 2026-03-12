export const colors = {
  // Brand
  primary: '#4F6EF7',        // Main interactive color — buttons, links, active states
  primaryLight: '#EEF1FF',   // Soft tint for backgrounds, selected states
  primaryDark: '#3451C7',    // Pressed/active button state

  // Neutrals — for text and layout structure
  text: {
    primary: '#1A1D23',      // Headings — near-black, not pure black (softer)
    secondary: '#6B7280',    // Subtext, captions
    disabled: '#9CA3AF',     // Placeholders, disabled inputs
    inverse: '#FFFFFF',      // Text on dark backgrounds
  },

  // Backgrounds
  background: {
    screen: '#F8F9FA',       // Main screen background
    card: '#FFFFFF',         // Card backgrounds
    input: '#F3F4F6',        // Input field backgrounds
  },

  // Borders
  border: {
    default: '#E5E7EB',
    focus: '#4F6EF7',
  },

  // Semantic
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',

  // Role-based accent colors (subtle visual identity per dashboard)
  parent: '#8B5CF6',         // Purple — nurturing, parental
  student: '#4F6EF7',        // Blue — focus, learning
  mentor: '#059669',         // Green — growth, guidance
} as const;

export type Colors = typeof colors;