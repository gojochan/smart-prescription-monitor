export const COLORS = {
  primary: '#0ea5e9', // Trustworthy medical blue/teal from logo
  secondary: '#38bdf8', // Lighter accent
  dark: '#0f172a', // Deep slate for backgrounds
  background: '#0f172a',
  card: '#1e293b', // Elevated surface for cards/inputs
  cardBorder: '#334155', // Clean border
  text: '#f8fafc', // White text for dark mode
  textSecondary: '#94a3b8',
  textTertiary: '#64748b',
  danger: '#ef4444',
  success: '#10b981',
  warning: '#f59e0b',
  border: '#334155',
  glass: 'rgba(30, 41, 59, 0.7)',
  glassLight: 'rgba(255, 255, 255, 0.05)',
  gradientColors: ['#0f172a', '#172554'],
  accentGradient: ['#0ea5e9', '#0284c7'],
};

export const SHADOWS = {
  premium: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  soft: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  glass: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  glow: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  }
};

export const GLASSMORPHISM = {
  backgroundColor: COLORS.card,
  borderWidth: 1,
  borderColor: COLORS.cardBorder,
  overflow: 'hidden',
  ...SHADOWS.soft,
};

export const BORDER_RADIUS = {
  sm: 8,
  md: 12,
  button: 12,
  input: 12,
  card: 16,
  lg: 24,
  xl: 32,
  pill: 999,
};

export const SIZES = {
  xs: 4,
  sm: 8,
  base: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 48,
  fontSm: 12,
  fontBase: 14,
  fontMd: 16,
  fontLg: 18,
  fontXl: 24,
  fontTitle: 24,
};

export const FONTS = {
  bold: 'System',
  semiBold: 'System',
  medium: 'System',
  regular: 'System',
  light: 'System',
};
