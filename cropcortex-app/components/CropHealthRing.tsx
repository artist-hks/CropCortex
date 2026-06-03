import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { colors, typography } from '../constants/colors';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface CropHealthRingProps {
  score: number;
  color?: string;
  size?: number;
  strokeWidth?: number;
  bgColor?: string;
}

export const CropHealthRing: React.FC<CropHealthRingProps> = ({
  score,
  color = colors.accent,
  size = 100,
  strokeWidth = 8,
  bgColor = 'rgba(255,255,255,0.1)',
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(score / 100, {
      duration: 1200,
      easing: Easing.out(Easing.cubic),
    });
  }, [score]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * (1 - progress.value),
  }));

  const getScoreColor = () => {
    if (score >= 80) return colors.primaryLight;
    if (score >= 60) return color;
    return colors.danger;
  };

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={bgColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getScoreColor()}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          animatedProps={animatedProps}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      <View style={styles.scoreContainer}>
        <Text style={[styles.score, { color: getScoreColor() }]}>{score}</Text>
        <Text style={styles.total}>/100</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  score: {
    fontSize: 28,
    fontFamily: 'NotoSans_700Bold',
    lineHeight: 32,
  },
  total: {
    fontSize: 14,
    fontFamily: 'NotoSans_400Regular',
    color: 'rgba(255,255,255,0.5)',
  },
});

export default CropHealthRing;
