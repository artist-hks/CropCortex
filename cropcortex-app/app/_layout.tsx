import React, { useEffect } from 'react';
import { ActivityIndicator, LogBox, View } from 'react-native';
import { ErrorBoundaryProps, Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  useFonts,
  NotoSans_400Regular,
  NotoSans_600SemiBold,
  NotoSans_700Bold,
} from '@expo-google-fonts/noto-sans';
import { colors } from '../constants/colors';
import { ScreenErrorBoundary } from '../components/ScreenErrorBoundary';
import { useAppStore } from '../store/useAppStore';

// Suppress known react-native-reanimated library-internal warnings
LogBox.ignoreLogs([
  'createAnimatedComponent',
  '[Reanimated] Property',
  'props.pointerEvents',
]);

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    NotoSans_400Regular,
    NotoSans_600SemiBold,
    NotoSans_700Bold,
  });

  const router = useRouter();
  const segments = useSegments();
  const { hasCompletedOnboarding, isAuthenticated } = useAppStore();

  useEffect(() => {
    if (!fontsLoaded) return;

    const firstSegment = segments[0];
    const isOnboardingRoute = firstSegment === 'onboarding';
    const isAuthRoute = firstSegment === 'auth';

    if (!hasCompletedOnboarding && !isOnboardingRoute) {
      router.replace('/onboarding');
      return;
    }

    if (hasCompletedOnboarding && !isAuthenticated && !isAuthRoute) {
      router.replace('/auth');
      return;
    }

    if (hasCompletedOnboarding && isAuthenticated && (isOnboardingRoute || isAuthRoute)) {
      router.replace('/');
    }
  }, [fontsLoaded, hasCompletedOnboarding, isAuthenticated, router, segments]);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.bg }}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="auth" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="disease-history" />
        <Stack.Screen name="yield-forecast" />
        <Stack.Screen name="settings" />
      </Stack>
    </>
  );
}

export function ErrorBoundary(props: ErrorBoundaryProps) {
  return <ScreenErrorBoundary {...props} />;
}
