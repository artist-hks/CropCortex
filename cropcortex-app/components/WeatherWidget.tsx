import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/colors';

interface WeatherWidgetProps {
  temp: number;
  condition: string;
  location: string;
  icon?: string;
}

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({
  temp,
  condition,
  location,
  icon = 'partly-sunny-outline',
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Ionicons name={icon as any} size={28} color={colors.accent} />
        <View style={styles.tempBlock}>
          <Text style={styles.temp}>{temp}°C</Text>
          <Text style={styles.condition}>{condition}</Text>
        </View>
      </View>
      <View style={styles.locationChip}>
        <Ionicons name="location-outline" size={13} color={colors.textSecondary} />
        <Text style={styles.locationText}>{location}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  tempBlock: {},
  temp: {
    fontSize: 18,
    fontFamily: 'NotoSans_700Bold',
    color: colors.textPrimary,
  },
  condition: {
    fontSize: 12,
    fontFamily: 'NotoSans_400Regular',
    color: colors.textSecondary,
  },
  locationChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.bg,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  locationText: {
    fontSize: 12,
    fontFamily: 'NotoSans_600SemiBold',
    color: colors.textSecondary,
  },
});

export default WeatherWidget;
