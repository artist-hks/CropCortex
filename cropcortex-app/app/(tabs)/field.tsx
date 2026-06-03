import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  DimensionValue,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ErrorBoundaryProps } from 'expo-router';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { colors } from '../../constants/colors';
import { NDVIMapPlaceholder } from '../../components/NDVIMapPlaceholder';
import { LineChartSVG } from '../../components/LineChartSVG';
import { ChipSelector } from '../../components/ChipSelector';
import { NetworkAwareOfflineBanner } from '../../components/NetworkAwareOfflineBanner';
import { ScreenErrorBoundary } from '../../components/ScreenErrorBoundary';
import { useAppStore } from '../../store/useAppStore';
import { fieldData, fields as allFields } from '../../utils/mockData';
import { cardShadow } from '../../utils/shadows';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CHART_WIDTH = SCREEN_WIDTH - 64;

export default function FieldScreen() {
  const { activeFieldId, setActiveField, fields } = useAppStore();

  const ndviChartData = fieldData.ndviHistory.map((item) => ({
    label: item.month,
    value: item.score,
  }));

  const soilLevels: Record<string, { label: string; value: string; color: string; width: DimensionValue }> = {
    ph: { label: 'pH', value: `${fieldData.soilReport.ph}`, color: colors.primaryLight, width: '65%' },
    nitrogen: { label: 'N', value: fieldData.soilReport.nitrogen, color: fieldData.soilReport.nitrogen === 'Low' ? colors.danger : colors.accent, width: fieldData.soilReport.nitrogen === 'Low' ? '30%' : '55%' },
    phosphorus: { label: 'P', value: fieldData.soilReport.phosphorus, color: colors.danger, width: '25%' },
    potassium: { label: 'K', value: fieldData.soilReport.potassium, color: colors.primaryLight, width: '80%' },
  };

  return (
    <View style={styles.screen}>
      <NetworkAwareOfflineBanner />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View entering={FadeIn.duration(400)} style={styles.header}>
          <Text style={styles.title}>My Field</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => Alert.alert('Add Field', 'Field boundary capture is coming soon.')}
          >
            <Ionicons name="add" size={18} color={colors.primary} />
            <Text style={styles.addButtonText}>Add Field</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Field selector chips */}
        <View style={styles.chipContainer}>
          <ChipSelector
            options={allFields.map((f) => f.name)}
            selected={allFields.find((f) => f.id === activeFieldId)?.name || ''}
            onSelect={(name) => {
              const field = allFields.find((f) => f.name === name);
              if (field) setActiveField(field.id);
            }}
          />
        </View>

        {/* NDVI Map */}
        <Animated.View entering={FadeInDown.delay(100).duration(500)} style={styles.section}>
          <NDVIMapPlaceholder />
        </Animated.View>

        {/* NDVI Timeline */}
        <Animated.View entering={FadeInDown.delay(200).duration(500)} style={styles.section}>
          <Text style={styles.sectionTitle}>Field Health Over Time</Text>
          <View style={styles.chartCard}>
            <LineChartSVG
              data={ndviChartData}
              color={colors.primaryLight}
              width={CHART_WIDTH}
              height={200}
            />
          </View>
        </Animated.View>

        {/* Field Stats */}
        <Animated.View entering={FadeInDown.delay(300).duration(500)} style={styles.statsRow}>
          <View style={styles.statChip}>
            <Ionicons name="resize-outline" size={16} color={colors.primary} />
            <View>
              <Text style={styles.statLabel}>Area</Text>
              <Text style={styles.statValue}>{fieldData.area}</Text>
            </View>
          </View>
          <View style={styles.statChip}>
            <Ionicons name="leaf-outline" size={16} color={colors.primary} />
            <View>
              <Text style={styles.statLabel}>Crop</Text>
              <Text style={styles.statValue}>{fieldData.crop}</Text>
            </View>
          </View>
          <View style={styles.statChip}>
            <Ionicons name="flower-outline" size={16} color={colors.primary} />
            <View>
              <Text style={styles.statLabel}>Stage</Text>
              <Text style={styles.statValue}>{fieldData.stage}</Text>
            </View>
          </View>
        </Animated.View>

        {/* Soil Report */}
        <Animated.View entering={FadeInDown.delay(400).duration(500)} style={styles.section}>
          <Text style={styles.sectionTitle}>Soil Report</Text>
          {fieldData.soilReport.uploaded ? (
            <View style={styles.soilCard}>
              <Text style={styles.soilHeader}>Extracted Soil Parameters</Text>
              {Object.entries(soilLevels).map(([key, level]) => (
                <View key={key} style={styles.soilRow}>
                  <View style={styles.soilLabelContainer}>
                    <Text style={styles.soilLabel}>{level.label}</Text>
                    <Text style={styles.soilValue}>{level.value}</Text>
                  </View>
                  <View style={styles.soilBarBg}>
                    <Animated.View
                      entering={FadeIn.delay(500).duration(600)}
                      style={[styles.soilBarFill, { width: level.width, backgroundColor: level.color }]}
                    />
                  </View>
                </View>
              ))}
              <View style={styles.soilLegend}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: colors.danger }]} />
                  <Text style={styles.legendText}>Low</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: colors.accent }]} />
                  <Text style={styles.legendText}>Medium</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: colors.primaryLight }]} />
                  <Text style={styles.legendText}>High</Text>
                </View>
              </View>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.uploadCard}
              onPress={() => Alert.alert('Upload Soil Report', 'PDF and photo upload will be available in the next build.')}
            >
              <View style={styles.uploadBorder}>
                <Ionicons name="cloud-upload-outline" size={32} color={colors.textSecondary} />
                <Text style={styles.uploadTitle}>Upload Soil Report</Text>
                <Text style={styles.uploadSub}>Tap to upload PDF or photo for fertilizer recommendations</Text>
              </View>
            </TouchableOpacity>
          )}
        </Animated.View>
      </ScrollView>
    </View>
  );
}

export function ErrorBoundary(props: ErrorBoundaryProps) {
  return <ScreenErrorBoundary {...props} />;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontFamily: 'NotoSans_700Bold',
    color: colors.textPrimary,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 50,
    backgroundColor: `${colors.primary}10`,
  },
  addButtonText: {
    fontSize: 14,
    fontFamily: 'NotoSans_600SemiBold',
    color: colors.primary,
  },
  chipContainer: {
    marginHorizontal: -16,
    marginBottom: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'NotoSans_700Bold',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  chartCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    ...cardShadow,
    elevation: 2,
  },
  // Stats
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  statChip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  statLabel: {
    fontSize: 11,
    fontFamily: 'NotoSans_400Regular',
    color: colors.textSecondary,
  },
  statValue: {
    fontSize: 14,
    fontFamily: 'NotoSans_700Bold',
    color: colors.textPrimary,
  },
  // Soil
  soilCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    ...cardShadow,
    elevation: 2,
  },
  soilHeader: {
    fontSize: 14,
    fontFamily: 'NotoSans_600SemiBold',
    color: colors.textPrimary,
    marginBottom: 16,
  },
  soilRow: {
    marginBottom: 14,
  },
  soilLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  soilLabel: {
    fontSize: 14,
    fontFamily: 'NotoSans_600SemiBold',
    color: colors.textPrimary,
  },
  soilValue: {
    fontSize: 13,
    fontFamily: 'NotoSans_400Regular',
    color: colors.textSecondary,
  },
  soilBarBg: {
    height: 8,
    backgroundColor: colors.bg,
    borderRadius: 4,
    overflow: 'hidden',
  },
  soilBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  soilLegend: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 11,
    fontFamily: 'NotoSans_400Regular',
    color: colors.textSecondary,
  },
  // Upload
  uploadCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 4,
  },
  uploadBorder: {
    borderWidth: 2,
    borderColor: colors.divider,
    borderStyle: 'dashed',
    borderRadius: 14,
    padding: 32,
    alignItems: 'center',
    gap: 8,
  },
  uploadTitle: {
    fontSize: 16,
    fontFamily: 'NotoSans_600SemiBold',
    color: colors.textPrimary,
  },
  uploadSub: {
    fontSize: 13,
    fontFamily: 'NotoSans_400Regular',
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
