import React from 'react';
import { ErrorBoundaryProps } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../constants/colors';

export function ScreenErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Something went wrong.</Text>
      <Text style={styles.message}>{error.message}</Text>
      <TouchableOpacity style={styles.button} onPress={retry} activeOpacity={0.8}>
        <Text style={styles.buttonText}>Try again</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bg,
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontFamily: 'NotoSans_700Bold',
    color: colors.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    fontFamily: 'NotoSans_400Regular',
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 18,
    textAlign: 'center',
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: 14,
    fontFamily: 'NotoSans_600SemiBold',
    color: colors.card,
  },
});
