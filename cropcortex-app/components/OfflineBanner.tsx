import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { SlideInUp, SlideOutUp } from 'react-native-reanimated';
import { colors } from '../constants/colors';

interface OfflineBannerProps {
  lastSync: string;
  onRetry?: () => void;
}

export const OfflineBanner: React.FC<OfflineBannerProps> = ({ lastSync, onRetry }) => {
  return (
    <Animated.View entering={SlideInUp.duration(400).springify()} exiting={SlideOutUp.duration(300)} style={styles.container}>
      <View style={styles.content}>
        <Ionicons name="cloud-offline-outline" size={18} color="#92400E" />
        <Text style={styles.text}>
          You're offline. Showing cached data from {lastSync}.
        </Text>
      </View>
      {onRetry && (
        <TouchableOpacity onPress={onRetry} style={styles.retryButton} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FEF3C7',
    borderBottomWidth: 1,
    borderBottomColor: '#FCD34D',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  text: {
    fontSize: 13,
    fontFamily: 'NotoSans_400Regular',
    color: '#92400E',
    flex: 1,
    lineHeight: 18,
  },
  retryButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: '#92400E',
    borderRadius: 20,
    marginLeft: 8,
  },
  retryText: {
    fontSize: 12,
    fontFamily: 'NotoSans_600SemiBold',
    color: '#FFFFFF',
  },
});

export default OfflineBanner;
