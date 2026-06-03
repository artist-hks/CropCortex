export const colors = {
  primary: '#2D6A4F',
  primaryLight: '#52B788',
  primaryLighter: '#74C69D',
  primaryPale: '#D8F3DC',
  accent: '#E9C46A',
  accentDark: '#D4A84B',
  danger: '#E63946',
  dangerLight: '#FDEAEC',
  bg: '#F8F5F0',
  bgAlt: '#F0EDE6',
  card: '#FFFFFF',
  textPrimary: '#1B1B1B',
  textSecondary: '#6B7280',
  divider: '#E8E4DE',
  darkSurface: '#1A2E22',
  darkSurfaceLight: '#243B2E',
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
  overlay: 'rgba(0,0,0,0.5)',
  shadow: {
    color: '#000',
    offset: { width: 0, height: 2 },
    opacity: 0.08,
    radius: 12,
  },
} as const;

export const typography = {
  display: {
    fontSize: 28,
    fontFamily: 'NotoSans_700Bold',
    lineHeight: 34,
  },
  title: {
    fontSize: 22,
    fontFamily: 'NotoSans_600SemiBold',
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    fontFamily: 'NotoSans_400Regular',
    lineHeight: 24,
  },
  caption: {
    fontSize: 13,
    fontFamily: 'NotoSans_400Regular',
    lineHeight: 18,
  },
  micro: {
    fontSize: 11,
    fontFamily: 'NotoSans_600SemiBold',
    lineHeight: 14,
    textTransform: 'uppercase' as const,
    letterSpacing: 1,
  },
} as const;

export default colors;
