// Rule of thumb:
//   xs (4)  → tight internal padding (icon gaps)
//   sm (8)  → compact spacing (tag padding, small gaps)
//   md (16) → standard element spacing
//   lg (24) → section separation
//   xl (32) → screen-level padding between major sections

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
} as const;

// Common layout shortcuts
export const layout = {
  screenPadding: 20,         // Left/right padding on every screen
  cardPadding: 16,           // Inner padding of cards
  cardRadius: 16,            // Border radius on cards
  buttonRadius: 12,          // Border radius on buttons
  inputRadius: 12,           // Border radius on inputs
  avatarSize: 44,            // Standard avatar/icon tap target (min 44pt for accessibility)
} as const;

export type Spacing = typeof spacing;