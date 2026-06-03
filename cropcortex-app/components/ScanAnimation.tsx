import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { colors } from '../constants/colors';
import { createColoredShadow } from '../utils/shadows';

interface ScanAnimationProps {
  width: number;
  height: number;
  isScanning?: boolean;
}

export const ScanAnimation: React.FC<ScanAnimationProps> = ({
  width,
  height,
  isScanning = true,
}) => {
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0.8);
  const borderOpacity = useSharedValue(0.6);

  useEffect(() => {
    if (isScanning) {
      translateY.value = withRepeat(
        withTiming(height - 4, { duration: 2000, easing: Easing.inOut(Easing.linear) }),
        -1,
        true,
      );
      borderOpacity.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 800 }),
          withTiming(0.4, { duration: 800 }),
        ),
        -1,
        true,
      );
    } else {
      translateY.value = 0;
      borderOpacity.value = 0;
    }
  }, [isScanning, height]);

  const lineStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  const borderStyle = useAnimatedStyle(() => ({
    borderColor: `rgba(82, 183, 136, ${borderOpacity.value})`,
  }));

  if (!isScanning) return null;

  return (
    <View style={[styles.container, { width, height }]}>
      {/* Pulsing border */}
      <Animated.View style={[styles.scanBorder, borderStyle]} />

      {/* Scanning line */}
      <Animated.View style={[styles.scanLine, lineStyle, { width: width - 16 }]}>
        <View style={styles.scanLineGlow} />
      </Animated.View>

      {/* Corner markers */}
      <View style={[styles.corner, styles.topLeft]} />
      <View style={[styles.corner, styles.topRight]} />
      <View style={[styles.corner, styles.bottomLeft]} />
      <View style={[styles.corner, styles.bottomRight]} />
    </View>
  );
};

const CORNER_SIZE = 24;
const CORNER_WIDTH = 3;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  scanBorder: {
    position: 'absolute',
    top: 4,
    left: 4,
    right: 4,
    bottom: 4,
    borderWidth: 2,
    borderRadius: 16,
  },
  scanLine: {
    height: 2,
    position: 'absolute',
    left: 8,
    top: 0,
  },
  scanLineGlow: {
    flex: 1,
    height: 2,
    borderRadius: 1,
    backgroundColor: colors.primaryLight,
    ...createColoredShadow(colors.primaryLight, 0, 8, 0.8, 4),
  },
  corner: {
    position: 'absolute',
    width: CORNER_SIZE,
    height: CORNER_SIZE,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: CORNER_WIDTH,
    borderLeftWidth: CORNER_WIDTH,
    borderColor: colors.primaryLight,
    borderTopLeftRadius: 8,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: CORNER_WIDTH,
    borderRightWidth: CORNER_WIDTH,
    borderColor: colors.primaryLight,
    borderTopRightRadius: 8,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: CORNER_WIDTH,
    borderLeftWidth: CORNER_WIDTH,
    borderColor: colors.primaryLight,
    borderBottomLeftRadius: 8,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: CORNER_WIDTH,
    borderRightWidth: CORNER_WIDTH,
    borderColor: colors.primaryLight,
    borderBottomRightRadius: 8,
  },
});

export default ScanAnimation;
