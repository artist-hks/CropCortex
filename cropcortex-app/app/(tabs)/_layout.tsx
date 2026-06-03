import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/colors';

const tabIcons = {
  index: 'home-outline',
  field: 'map-outline',
  diagnose: 'camera-outline',
  market: 'trending-up-outline',
  advisory: 'calendar-outline',
} as const;

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.divider,
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontFamily: 'NotoSans_600SemiBold',
          fontSize: 11,
        },
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={tabIcons[route.name as keyof typeof tabIcons]} size={size} color={color} />
        ),
      })}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="field" options={{ title: 'Field' }} />
      <Tabs.Screen name="diagnose" options={{ title: 'Doctor' }} />
      <Tabs.Screen name="market" options={{ title: 'Prices' }} />
      <Tabs.Screen name="advisory" options={{ title: 'Advisory' }} />
    </Tabs>
  );
}
