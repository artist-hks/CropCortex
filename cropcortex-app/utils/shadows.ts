import { Platform, ViewStyle } from 'react-native';

/**
 * Creates cross-platform shadow styles.
 * Uses boxShadow on web (to avoid deprecation warnings) and
 * shadow* props + elevation on native (iOS/Android).
 */
export const createShadow = (
  offsetY: number = 2,
  blurRadius: number = 12,
  opacity: number = 0.08,
  color: string = '#000',
  elevation: number = 2,
): ViewStyle => {
  if (Platform.OS === 'web') {
    return {
      boxShadow: `0px ${offsetY}px ${blurRadius}px rgba(0, 0, 0, ${opacity})`,
    } as any;
  }
  return {
    shadowColor: color,
    shadowOffset: { width: 0, height: offsetY },
    shadowOpacity: opacity,
    shadowRadius: blurRadius,
    elevation,
  };
};

/** Standard card shadow */
export const cardShadow = createShadow(2, 12, 0.08, '#000', 2);

/** Smaller shadow for chips/tags */
export const chipShadow = createShadow(2, 6, 0.05, '#000', 1);

/** Larger shadow for elevated components */
export const elevatedShadow = createShadow(4, 20, 0.15, '#000', 6);

/** Colored shadow (e.g. for primary-colored buttons) */
export const createColoredShadow = (
  color: string,
  offsetY: number = 4,
  blurRadius: number = 12,
  opacity: number = 0.4,
  elevation: number = 6,
): ViewStyle => {
  if (Platform.OS === 'web') {
    // Parse hex color to rgba for web boxShadow
    return {
      boxShadow: `0px ${offsetY}px ${blurRadius}px ${color}66`,
    } as any;
  }
  return {
    shadowColor: color,
    shadowOffset: { width: 0, height: offsetY },
    shadowOpacity: opacity,
    shadowRadius: blurRadius,
    elevation,
  };
};
