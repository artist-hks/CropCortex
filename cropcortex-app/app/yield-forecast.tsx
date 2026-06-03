import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Rect, Text as SvgText, Line } from 'react-native-svg';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { colors } from '../constants/colors';
import { PrimaryButton } from '../components/Buttons';
import { yieldForecast } from '../utils/mockData';
import { cardShadow } from '../utils/shadows';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CHART_WIDTH = SCREEN_WIDTH - 64;
const CHART_HEIGHT = 200;
const BAR_WIDTH = 48;

const statusColors = {
  good: colors.primaryLight,
  warning: colors.accent,
  critical: colors.danger,
};

export default function YieldForecastScreen() {
  const { comparison } = yieldForecast;
  const maxVal = Math.max(comparison.yourField, comparison.districtAvg, comparison.lastSeason) * 1.2;

  const bars = [
    { label: 'Your Field', value: comparison.yourField, color: colors.primary },
    { label: 'District Avg', value: comparison.districtAvg, color: colors.primaryLight },
    { label: 'Last Season', value: comparison.lastSeason, color: colors.accent },
  ];

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View entering={FadeIn.duration(400)} style={styles.header}>
          <Text style={styles.title}>Yield Forecast 🌾</Text>
          <TouchableOpacity
            style={styles.infoButton}
            onPress={() => Alert.alert('Yield Forecast', 'This estimate combines satellite health, weather, and district yield history.')}
          >
            <Ionicons name="information-circle-outline" size={22} color={colors.textSecondary} />
          </TouchableOpacity>
        </Animated.View>

        {/* Hero Card */}
        <Animated.View entering={FadeInDown.delay(100).duration(500)} style={styles.heroCard}>
          <Text style={styles.heroLabel}>Expected Yield</Text>
          <Text style={styles.heroValue}>{yieldForecast.yieldRange}</Text>
          <Text style={styles.heroUnit}>{yieldForecast.unit}</Text>
          <Text style={styles.heroSubtitle}>
            Based on satellite data, weather forecast, and district historical yields.
          </Text>

          {/* Confidence Bar */}
          <View style={styles.confSection}>
            <View style={styles.confHeader}>
              <Text style={styles.confLabel}>Model Confidence</Text>
              <Text style={styles.confValue}>{yieldForecast.confidence}%</Text>
            </View>
            <View style={styles.confBarBg}>
              <Animated.View
                entering={FadeIn.delay(600).duration(800)}
                style={[styles.confBarFill, { width: `${yieldForecast.confidence}%` }]}
              />
            </View>
          </View>
        </Animated.View>

        {/* Yield Comparison Chart */}
        <Animated.View entering={FadeInDown.delay(200).duration(500)} style={styles.section}>
          <Text style={styles.sectionTitle}>Yield vs. District Average</Text>
          <View style={styles.chartCard}>
            <Svg width={CHART_WIDTH} height={CHART_HEIGHT}>
              {/* Grid lines */}
              {[0, 1, 2, 3].map((i) => {
                const y = 20 + (i / 3) * (CHART_HEIGHT - 60);
                const val = ((3 - i) / 3 * maxVal).toFixed(1);
                return (
                  <React.Fragment key={i}>
                    <Line x1={40} y1={y} x2={CHART_WIDTH - 10} y2={y} stroke={colors.divider} strokeWidth={1} strokeDasharray="4 4" />
                    <SvgText x={35} y={y + 4} fill={colors.textSecondary} fontSize={10} textAnchor="end">{val}</SvgText>
                  </React.Fragment>
                );
              })}

              {/* Bars */}
              {bars.map((bar, i) => {
                const barHeight = (bar.value / maxVal) * (CHART_HEIGHT - 60);
                const x = 60 + i * (BAR_WIDTH + 40);
                const y = CHART_HEIGHT - 40 - barHeight;

                return (
                  <React.Fragment key={i}>
                    <Rect x={x} y={y} width={BAR_WIDTH} height={barHeight} rx={8} fill={bar.color} />
                    <SvgText x={x + BAR_WIDTH / 2} y={y - 8} fill={colors.textPrimary} fontSize={13} fontWeight="bold" textAnchor="middle">
                      {bar.value}
                    </SvgText>
                    <SvgText x={x + BAR_WIDTH / 2} y={CHART_HEIGHT - 16} fill={colors.textSecondary} fontSize={10} textAnchor="middle">
                      {bar.label}
                    </SvgText>
                  </React.Fragment>
                );
              })}
            </Svg>

            {/* Legend */}
            <View style={styles.legend}>
              {bars.map((bar) => (
                <View key={bar.label} style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: bar.color }]} />
                  <Text style={styles.legendText}>{bar.label}</Text>
                </View>
              ))}
            </View>
          </View>
        </Animated.View>

        {/* Key Factors */}
        <Animated.View entering={FadeInDown.delay(300).duration(500)} style={styles.section}>
          <Text style={styles.sectionTitle}>Key Factors</Text>
          <View style={styles.factorsGrid}>
            {yieldForecast.factors.map((factor, index) => (
              <Animated.View
                key={factor.label}
                entering={FadeInDown.delay(400 + index * 60).duration(300)}
                style={styles.factorCard}
              >
                <View style={[styles.factorIcon, { backgroundColor: `${statusColors[factor.status]}15` }]}>
                  <Ionicons name={factor.icon as any} size={22} color={statusColors[factor.status]} />
                </View>
                <Text style={styles.factorLabel}>{factor.label}</Text>
                <Text style={[styles.factorValue, { color: statusColors[factor.status] }]}>{factor.value}</Text>
                <View style={[styles.factorBadge, { backgroundColor: `${statusColors[factor.status]}15` }]}>
                  <View style={[styles.factorDot, { backgroundColor: statusColors[factor.status] }]} />
                  <Text style={[styles.factorStatus, { color: statusColors[factor.status] }]}>
                    {factor.status === 'good' ? 'Good' : factor.status === 'warning' ? 'Alert' : 'Critical'}
                  </Text>
                </View>
              </Animated.View>
            ))}
          </View>
        </Animated.View>

        {/* Insurer Widget */}
        <Animated.View entering={FadeInDown.delay(500).duration(500)} style={styles.insurerCard}>
          <View style={styles.insurerHeader}>
            <Text style={styles.insurerIcon}>📋</Text>
            <Text style={styles.insurerTitle}>Share with Crop Insurer</Text>
          </View>
          <Text style={styles.insurerText}>
            This forecast report can be submitted to PM Fasal Bima Yojana for faster
            claim processing. Satellite-verified data is accepted by all major crop insurers.
          </Text>
          <View style={styles.insurerCta}>
            <PrimaryButton
              label="Generate PDF Report"
              onPress={() => Alert.alert('PDF Report', 'PDF report generation is coming soon.')}
              size="medium"
            />
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontFamily: 'NotoSans_700Bold',
    color: colors.textPrimary,
  },
  infoButton: {
    padding: 4,
  },
  // Hero Card
  heroCard: {
    backgroundColor: colors.darkSurface,
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
  },
  heroLabel: {
    fontSize: 14,
    fontFamily: 'NotoSans_600SemiBold',
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 4,
  },
  heroValue: {
    fontSize: 36,
    fontFamily: 'NotoSans_700Bold',
    color: colors.card,
    lineHeight: 42,
  },
  heroUnit: {
    fontSize: 16,
    fontFamily: 'NotoSans_400Regular',
    color: 'rgba(255,255,255,0.5)',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 13,
    fontFamily: 'NotoSans_400Regular',
    color: 'rgba(255,255,255,0.45)',
    lineHeight: 20,
    marginBottom: 20,
  },
  confSection: {},
  confHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  confLabel: {
    fontSize: 13,
    fontFamily: 'NotoSans_600SemiBold',
    color: 'rgba(255,255,255,0.6)',
  },
  confValue: {
    fontSize: 13,
    fontFamily: 'NotoSans_700Bold',
    color: colors.accent,
  },
  confBarBg: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  confBarFill: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: colors.accent,
  },
  // Sections
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
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 12,
    fontFamily: 'NotoSans_400Regular',
    color: colors.textSecondary,
  },
  // Factors
  factorsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  factorCard: {
    width: (SCREEN_WIDTH - 44) / 2,
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    ...cardShadow,
    elevation: 2,
  },
  factorIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  factorLabel: {
    fontSize: 13,
    fontFamily: 'NotoSans_400Regular',
    color: colors.textSecondary,
    marginBottom: 2,
  },
  factorValue: {
    fontSize: 20,
    fontFamily: 'NotoSans_700Bold',
    marginBottom: 8,
  },
  factorBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  factorDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  factorStatus: {
    fontSize: 11,
    fontFamily: 'NotoSans_600SemiBold',
  },
  // Insurer
  insurerCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  insurerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  insurerIcon: {
    fontSize: 22,
  },
  insurerTitle: {
    fontSize: 17,
    fontFamily: 'NotoSans_700Bold',
    color: colors.textPrimary,
  },
  insurerText: {
    fontSize: 14,
    fontFamily: 'NotoSans_400Regular',
    color: colors.textSecondary,
    lineHeight: 22,
    marginBottom: 16,
  },
  insurerCta: {
    alignItems: 'flex-start',
  },
});
