import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp, FadeIn } from 'react-native-reanimated';
import { colors } from '../constants/colors';
import { createShadow, chipShadow } from '../utils/shadows';

interface TreatmentStep {
  step: number;
  text: string;
  icon: string;
}

interface DiseaseResultProps {
  disease: {
    name: string;
    scientificName: string;
    crop: string;
    confidence: number;
    severity: string;
    severityValue: number;
    description: string;
    organicTreatment: TreatmentStep[];
    chemicalTreatment: TreatmentStep[];
    dosageInfo: string;
  };
  onClose?: () => void;
}

export const DiseaseResult: React.FC<DiseaseResultProps> = ({ disease, onClose }) => {
  const [activeTab, setActiveTab] = useState<'organic' | 'chemical'>('organic');

  const getSeverityColor = () => {
    if (disease.severityValue >= 0.7) return colors.danger;
    if (disease.severityValue >= 0.4) return colors.accent;
    return colors.primaryLight;
  };

  const treatments = activeTab === 'organic' ? disease.organicTreatment : disease.chemicalTreatment;

  return (
    <Animated.View entering={FadeInUp.duration(500).springify()} style={styles.container}>
      <View style={styles.handle} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.diseaseName}>{disease.name}</Text>
            <Text style={styles.scientificName}>{disease.scientificName}</Text>
          </View>
          {onClose && (
            <TouchableOpacity onPress={onClose} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
              <Ionicons name="close-circle" size={28} color={colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>

        {/* Confidence Badge */}
        <View style={styles.badgeRow}>
          <View style={[styles.badge, { backgroundColor: `${colors.primary}15` }]}>
            <Ionicons name="checkmark-circle" size={14} color={colors.primary} />
            <Text style={[styles.badgeText, { color: colors.primary }]}>{disease.confidence}% confidence</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: `${colors.primary}10` }]}>
            <Text style={[styles.badgeText, { color: colors.primary }]}>{disease.crop}</Text>
          </View>
        </View>

        {/* Severity */}
        <View style={styles.severitySection}>
          <View style={styles.severityHeader}>
            <Text style={styles.severityLabel}>Severity</Text>
            <Text style={[styles.severityValue, { color: getSeverityColor() }]}>{disease.severity}</Text>
          </View>
          <View style={styles.severityBarBg}>
            <Animated.View
              entering={FadeIn.delay(300).duration(600)}
              style={[
                styles.severityBarFill,
                {
                  width: `${disease.severityValue * 100}%`,
                  backgroundColor: getSeverityColor(),
                },
              ]}
            />
          </View>
        </View>

        {/* Description */}
        <Text style={styles.description}>{disease.description}</Text>

        {/* Treatment Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'organic' && styles.activeTab]}
            onPress={() => setActiveTab('organic')}
          >
            <Text style={styles.tabIcon}>🌿</Text>
            <Text style={[styles.tabText, activeTab === 'organic' && styles.activeTabText]}>Organic</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'chemical' && styles.activeTab]}
            onPress={() => setActiveTab('chemical')}
          >
            <Text style={styles.tabIcon}>💊</Text>
            <Text style={[styles.tabText, activeTab === 'chemical' && styles.activeTabText]}>Chemical</Text>
          </TouchableOpacity>
        </View>

        {/* Treatment Steps */}
        <View style={styles.treatmentList}>
          {treatments.map((item) => (
            <Animated.View
              key={item.step}
              entering={FadeInUp.delay(item.step * 80).duration(300)}
              style={styles.treatmentItem}
            >
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumText}>{item.step}</Text>
              </View>
              <View style={styles.treatmentContent}>
                <Text style={styles.treatmentIcon}>{item.icon}</Text>
                <Text style={styles.treatmentText}>{item.text}</Text>
              </View>
            </Animated.View>
          ))}
        </View>

        {/* Dosage Info */}
        <View style={styles.dosageBox}>
          <Ionicons name="information-circle-outline" size={18} color={colors.primary} />
          <Text style={styles.dosageText}>{disease.dosageInfo}</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.secondaryButton}>
            <Ionicons name="cart-outline" size={18} color={colors.primary} />
            <Text style={styles.secondaryButtonText}>Buy Treatment Nearby</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton}>
            <Ionicons name="share-social-outline" size={18} color={colors.primary} />
            <Text style={styles.secondaryButtonText}>Share with Extension Officer</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '85%',
    paddingTop: 8,
    ...createShadow(4, 20, 0.15, '#000', 10),
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.divider,
    alignSelf: 'center',
    marginBottom: 12,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  headerText: {
    flex: 1,
  },
  diseaseName: {
    fontSize: 24,
    fontFamily: 'NotoSans_700Bold',
    color: colors.textPrimary,
    lineHeight: 30,
  },
  scientificName: {
    fontSize: 14,
    fontFamily: 'NotoSans_400Regular',
    color: colors.textSecondary,
    fontStyle: 'italic',
    marginTop: 2,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 13,
    fontFamily: 'NotoSans_600SemiBold',
  },
  severitySection: {
    marginBottom: 16,
  },
  severityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  severityLabel: {
    fontSize: 14,
    fontFamily: 'NotoSans_600SemiBold',
    color: colors.textPrimary,
  },
  severityValue: {
    fontSize: 14,
    fontFamily: 'NotoSans_700Bold',
  },
  severityBarBg: {
    height: 6,
    backgroundColor: colors.divider,
    borderRadius: 3,
    overflow: 'hidden',
  },
  severityBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  description: {
    fontSize: 14,
    fontFamily: 'NotoSans_400Regular',
    color: colors.textSecondary,
    lineHeight: 22,
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.bg,
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: colors.card,
    ...chipShadow,
    elevation: 2,
  },
  tabIcon: {
    fontSize: 16,
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'NotoSans_600SemiBold',
    color: colors.textSecondary,
  },
  activeTabText: {
    color: colors.textPrimary,
  },
  treatmentList: {
    gap: 12,
    marginBottom: 16,
  },
  treatmentItem: {
    flexDirection: 'row',
    gap: 12,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: `${colors.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumText: {
    fontSize: 13,
    fontFamily: 'NotoSans_700Bold',
    color: colors.primary,
  },
  treatmentContent: {
    flex: 1,
    flexDirection: 'row',
    gap: 8,
  },
  treatmentIcon: {
    fontSize: 16,
  },
  treatmentText: {
    fontSize: 14,
    fontFamily: 'NotoSans_400Regular',
    color: colors.textPrimary,
    lineHeight: 21,
    flex: 1,
  },
  dosageBox: {
    flexDirection: 'row',
    gap: 10,
    padding: 14,
    backgroundColor: `${colors.primary}08`,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: `${colors.primary}20`,
    marginBottom: 20,
  },
  dosageText: {
    flex: 1,
    fontSize: 13,
    fontFamily: 'NotoSans_400Regular',
    color: colors.textPrimary,
    lineHeight: 20,
  },
  actions: {
    gap: 10,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 50,
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  secondaryButtonText: {
    fontSize: 15,
    fontFamily: 'NotoSans_600SemiBold',
    color: colors.primary,
  },
});

export default DiseaseResult;
