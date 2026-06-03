import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { colors } from '../constants/colors';
import { diagnosisHistory } from '../utils/mockData';
import { cardShadow } from '../utils/shadows';

const severityConfig: Record<string, { color: string; bgColor: string }> = {
  Mild: { color: colors.primaryLight, bgColor: `${colors.primaryLight}15` },
  Moderate: { color: colors.accent, bgColor: `${colors.accent}15` },
  Severe: { color: colors.danger, bgColor: `${colors.danger}10` },
};

export default function DiseaseHistoryScreen() {
  const router = useRouter();

  const renderItem = ({ item, index }: { item: typeof diagnosisHistory[0]; index: number }) => {
    const severity = severityConfig[item.severity] || severityConfig.Moderate;

    return (
      <Animated.View entering={FadeInDown.delay(index * 60).duration(400)}>
        <TouchableOpacity style={styles.card} activeOpacity={0.7}>
          {/* Thumbnail placeholder */}
          <View style={styles.thumbnail}>
            <Ionicons name="leaf" size={24} color={colors.primaryLight} />
          </View>

          <View style={styles.cardContent}>
            <View style={styles.cardHeader}>
              <Text style={styles.diseaseName}>{item.disease}</Text>
              <View style={[styles.severityBadge, { backgroundColor: severity.bgColor }]}>
                <View style={[styles.severityDot, { backgroundColor: severity.color }]} />
                <Text style={[styles.severityText, { color: severity.color }]}>{item.severity}</Text>
              </View>
            </View>

            <View style={styles.cardMeta}>
              <View style={styles.metaItem}>
                <Ionicons name="leaf-outline" size={13} color={colors.textSecondary} />
                <Text style={styles.metaText}>{item.crop}</Text>
              </View>
              <View style={styles.metaItem}>
                <Ionicons name="calendar-outline" size={13} color={colors.textSecondary} />
                <Text style={styles.metaText}>{item.date}</Text>
              </View>
            </View>

            <View style={styles.confidenceRow}>
              <Text style={styles.confidenceLabel}>Confidence:</Text>
              <View style={styles.confidenceBarBg}>
                <View
                  style={[
                    styles.confidenceBarFill,
                    {
                      width: `${item.confidence}%`,
                      backgroundColor: item.confidence >= 90 ? colors.primary : colors.accent,
                    },
                  ]}
                />
              </View>
              <Text style={styles.confidenceValue}>{item.confidence}%</Text>
            </View>
          </View>

          <Ionicons name="chevron-forward" size={18} color={colors.divider} />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={styles.screen}>
      <Animated.View entering={FadeIn.duration(400)} style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.title}>Diagnosis History</Text>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{diagnosisHistory.length}</Text>
        </View>
      </Animated.View>

      <FlatList
        data={diagnosisHistory}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="camera-outline" size={48} color={colors.divider} />
            <Text style={styles.emptyTitle}>No diagnoses yet</Text>
            <Text style={styles.emptyText}>Take a photo of a sick leaf to get started.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.divider,
  },
  title: {
    flex: 1,
    fontSize: 22,
    fontFamily: 'NotoSans_700Bold',
    color: colors.textPrimary,
  },
  countBadge: {
    backgroundColor: `${colors.primary}10`,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  countText: {
    fontSize: 14,
    fontFamily: 'NotoSans_700Bold',
    color: colors.primary,
  },
  listContent: {
    padding: 16,
    paddingTop: 4,
    gap: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 14,
    gap: 12,
    ...cardShadow,
    elevation: 2,
  },
  thumbnail: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: '#1E3A2B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  diseaseName: {
    fontSize: 16,
    fontFamily: 'NotoSans_600SemiBold',
    color: colors.textPrimary,
    flex: 1,
  },
  severityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 20,
  },
  severityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  severityText: {
    fontSize: 11,
    fontFamily: 'NotoSans_600SemiBold',
  },
  cardMeta: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 6,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  metaText: {
    fontSize: 12,
    fontFamily: 'NotoSans_400Regular',
    color: colors.textSecondary,
  },
  confidenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  confidenceLabel: {
    fontSize: 11,
    fontFamily: 'NotoSans_400Regular',
    color: colors.textSecondary,
  },
  confidenceBarBg: {
    flex: 1,
    height: 4,
    backgroundColor: colors.bg,
    borderRadius: 2,
    overflow: 'hidden',
  },
  confidenceBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  confidenceValue: {
    fontSize: 12,
    fontFamily: 'NotoSans_700Bold',
    color: colors.primary,
    minWidth: 32,
    textAlign: 'right',
  },
  // Empty state
  empty: {
    alignItems: 'center',
    paddingVertical: 60,
    gap: 8,
  },
  emptyTitle: {
    fontSize: 18,
    fontFamily: 'NotoSans_700Bold',
    color: colors.textPrimary,
  },
  emptyText: {
    fontSize: 14,
    fontFamily: 'NotoSans_400Regular',
    color: colors.textSecondary,
  },
});
