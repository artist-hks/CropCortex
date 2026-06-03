import React from 'react';
import { View, Text, StyleSheet, DimensionValue } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { colors } from '../constants/colors';

const zones: Array<{
  id: string;
  color: string;
  x: DimensionValue;
  y: DimensionValue;
  width: DimensionValue;
  height: DimensionValue;
  opacity: number;
}> = [
  { id: 'z1', color: colors.primaryLight, x: '5%', y: '10%', width: '45%', height: '35%', opacity: 0.8 },
  { id: 'z2', color: colors.accent, x: '55%', y: '5%', width: '30%', height: '25%', opacity: 0.7 },
  { id: 'z3', color: colors.primary, x: '8%', y: '50%', width: '35%', height: '30%', opacity: 0.85 },
  { id: 'z4', color: colors.danger, x: '48%', y: '55%', width: '18%', height: '18%', opacity: 0.7 },
  { id: 'z5', color: colors.accent, x: '70%', y: '40%', width: '22%', height: '35%', opacity: 0.6 },
  { id: 'z6', color: colors.primaryLight, x: '30%', y: '30%', width: '25%', height: '25%', opacity: 0.75 },
];

const gridLines = Array.from({ length: 8 }, (_, i) => i);

export const NDVIMapPlaceholder: React.FC = () => {
  return (
    <Animated.View entering={FadeIn.duration(600)} style={styles.container}>
      {/* Grid pattern for satellite feel */}
      {gridLines.map((i) => (
        <View
          key={`h-${i}`}
          style={[
            styles.gridLine,
            { top: `${(i + 1) * 11}%`, left: 0, right: 0, height: 1 },
          ]}
        />
      ))}
      {gridLines.map((i) => (
        <View
          key={`v-${i}`}
          style={[
            styles.gridLine,
            { left: `${(i + 1) * 11}%`, top: 0, bottom: 0, width: 1 },
          ]}
        />
      ))}

      {/* NDVI colored zones */}
      {zones.map((zone) => (
        <Animated.View
          key={zone.id}
          entering={FadeIn.delay(200).duration(500)}
          style={[
            styles.zone,
            {
              backgroundColor: zone.color,
              left: zone.x,
              top: zone.y,
              width: zone.width,
              height: zone.height,
              opacity: zone.opacity,
            },
          ]}
        />
      ))}

      {/* Field boundary */}
      <View style={styles.fieldBoundary} />

      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: colors.primaryLight }]} />
          <Text style={styles.legendText}>Healthy</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: colors.accent }]} />
          <Text style={styles.legendText}>Stress</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: colors.danger }]} />
          <Text style={styles.legendText}>Critical</Text>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 240,
    backgroundColor: '#1E3A2B',
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  gridLine: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  zone: {
    position: 'absolute',
    borderRadius: 12,
  },
  fieldBoundary: {
    position: 'absolute',
    top: '5%',
    left: '3%',
    right: '3%',
    bottom: '15%',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.25)',
    borderRadius: 8,
    borderStyle: 'dashed',
  },
  legend: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 3,
  },
  legendText: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.6)',
    fontFamily: 'NotoSans_400Regular',
  },
});

export default NDVIMapPlaceholder;
