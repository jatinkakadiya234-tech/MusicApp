/**
 * Centralized App Theme System
 * All design tokens (colors, typography, spacing, border radius, shadows, component styles)
 * are defined in this single file.
 */

export const colors = {
  // Dark Background Palette (Stitch Music Design Inspired)
  background: '#090A0F',
  surface: '#12151E',
  surfaceElevated: '#1A1E2E',
  surfaceCard: '#161A26',
  surfaceHover: '#222838',

  // Primary & Secondary Accents
  primary: '#6366F1', // Indigo Vibrant Accent
  primaryDark: '#4F46E5',
  primaryLight: '#818CF8',
  secondary: '#EC4899', // Pink Accent
  accentGradient: ['#6366F1', '#A855F7', '#EC4899'],

  // Functional Status Colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',

  // Text Hierarchy
  textPrimary: '#FFFFFF',
  textSecondary: '#94A3B8',
  textMuted: '#64748B',
  textDisabled: '#475569',
  textOnPrimary: '#FFFFFF',

  // Borders & Dividers
  border: '#1E293B',
  borderLight: '#334155',
  divider: '#1E293B',

  // Special Music Player UI Colors
  playerBackground: '#0F121C',
  playerProgressBackground: '#1E293B',
  playerProgressActive: '#6366F1',
  heartActive: '#EF4444',

  // Navigation Bar Colors
  tabBarBackground: '#0D0F17',
  tabBarActive: '#6366F1',
  tabBarInactive: '#64748B',

  // Overlay & Glassmorphism
  overlay: 'rgba(9, 10, 15, 0.85)',
  cardGlass: 'rgba(26, 30, 46, 0.75)',
};

export const typography = {
  fontFamily: {
    regular: 'System',
    medium: 'System',
    semibold: 'System',
    bold: 'System',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    header: 28,
    display: 34,
  },
  fontWeight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    heavy: '800',
  },
  lineHeight: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 28,
    xl: 32,
    display: 40,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 48,
};

export const borderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const shadows = {
  sm: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
};

export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
};

export default theme;
