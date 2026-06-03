import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { colors } from '../../constants/colors';
import { ScanAnimation } from '../../components/ScanAnimation';
import { DiseaseResult } from '../../components/DiseaseResult';
import { useAppStore } from '../../store/useAppStore';
import { diseases } from '../../utils/mockData';
import { createColoredShadow } from '../../utils/shadows';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const VIEWFINDER_WIDTH = SCREEN_WIDTH - 80;
const VIEWFINDER_HEIGHT = 340;

export default function DiagnoseScreen() {
  const [showResult, setShowResult] = useState(false);
  const [isScanning, setIsScanning] = useState(true);
  const router = useRouter();
  const { setShowDiagnosisResult } = useAppStore();

  const currentDisease = diseases['early-blight'];

  const handleCapture = () => {
    setIsScanning(false);
    setTimeout(() => {
      setShowResult(true);
      setShowDiagnosisResult(true);
    }, 300);
  };

  const handleRetake = () => {
    setShowResult(false);
    setIsScanning(true);
    setShowDiagnosisResult(false);
  };

  return (
    <View style={styles.screen}>
      {/* Header */}
      <Animated.View entering={FadeIn.duration(400)} style={styles.header}>
        <Text style={styles.title}>Crop Doctor 🌿</Text>
        <TouchableOpacity style={styles.historyButton} onPress={() => router.push('/disease-history')}>
          <Text style={styles.historyText}>History</Text>
          <Ionicons name="time-outline" size={16} color={colors.primary} />
        </TouchableOpacity>
      </Animated.View>

      {!showResult ? (
        /* Camera View */
        <Animated.View entering={FadeInDown.delay(100).duration(500)} style={styles.cameraContainer}>
          <View style={styles.viewfinder}>
            {/* Simulated crop image */}
            <View style={styles.cropImage}>
              <View style={styles.leafShape}>
                <View style={styles.leafVein} />
                <View style={styles.leafVein2} />
                {/* Disease spots */}
                <View style={[styles.diseaseSpot, { top: '30%', left: '25%', width: 12, height: 12 }]} />
                <View style={[styles.diseaseSpot, { top: '55%', right: '20%', width: 10, height: 10 }]} />
                <View style={[styles.diseaseSpot, { bottom: '25%', left: '35%', width: 8, height: 8 }]} />
              </View>
            </View>

            {/* Scan animation overlay */}
            <ScanAnimation
              width={VIEWFINDER_WIDTH}
              height={VIEWFINDER_HEIGHT}
              isScanning={isScanning}
            />
          </View>

          {/* Instruction text */}
          <Text style={styles.instruction}>Point camera at an affected leaf or stem.</Text>

          {/* Camera controls */}
          <View style={styles.controls}>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={() => Alert.alert('Gallery', 'Gallery image selection is coming soon.')}
            >
              <Ionicons name="images-outline" size={24} color={colors.textPrimary} />
              <Text style={styles.controlLabel}>Gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.captureButton} onPress={handleCapture} activeOpacity={0.8}>
              <View style={styles.captureInner} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.controlButton}
              onPress={() => Alert.alert('Flash', 'Flash control will be enabled when the live camera is connected.')}
            >
              <Ionicons name="flash-outline" size={24} color={colors.textPrimary} />
              <Text style={styles.controlLabel}>Flash</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      ) : (
        /* Result State */
        <View style={styles.resultContainer}>
          {/* Captured thumbnail */}
          <Animated.View entering={FadeIn.duration(300)} style={styles.thumbnailContainer}>
            <View style={styles.thumbnail}>
              <View style={styles.thumbnailLeaf}>
                <Ionicons name="leaf" size={36} color={colors.primaryLight} />
              </View>
            </View>
            <TouchableOpacity onPress={handleRetake} style={styles.retakeButton}>
              <Ionicons name="camera-outline" size={16} color={colors.primary} />
              <Text style={styles.retakeText}>Retake</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Disease Result */}
          <DiseaseResult
            disease={currentDisease}
            onClose={handleRetake}
          />
        </View>
      )}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontSize: 28,
    fontFamily: 'NotoSans_700Bold',
    color: colors.textPrimary,
  },
  historyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: `${colors.primary}10`,
  },
  historyText: {
    fontSize: 14,
    fontFamily: 'NotoSans_600SemiBold',
    color: colors.primary,
  },
  // Camera
  cameraContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  viewfinder: {
    width: VIEWFINDER_WIDTH,
    height: VIEWFINDER_HEIGHT,
    borderRadius: 20,
    backgroundColor: '#1E3A2B',
    overflow: 'hidden',
    position: 'relative',
  },
  cropImage: {
    flex: 1,
    backgroundColor: 'rgba(82,183,136,0.12)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leafShape: {
    width: 140,
    height: 200,
    borderRadius: 70,
    backgroundColor: 'rgba(82,183,136,0.3)',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    position: 'relative',
    transform: [{ rotate: '-10deg' }],
  },
  leafVein: {
    position: 'absolute',
    top: '10%',
    bottom: '10%',
    left: '48%',
    width: 2,
    backgroundColor: 'rgba(45,106,79,0.3)',
  },
  leafVein2: {
    position: 'absolute',
    top: '30%',
    left: '20%',
    width: '30%',
    height: 1.5,
    backgroundColor: 'rgba(45,106,79,0.2)',
    transform: [{ rotate: '-30deg' }],
  },
  diseaseSpot: {
    position: 'absolute',
    borderRadius: 50,
    backgroundColor: 'rgba(230,57,70,0.55)',
  },
  instruction: {
    fontSize: 14,
    fontFamily: 'NotoSans_400Regular',
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 40,
    paddingBottom: 32,
  },
  controlButton: {
    alignItems: 'center',
    gap: 4,
  },
  controlLabel: {
    fontSize: 11,
    fontFamily: 'NotoSans_400Regular',
    color: colors.textSecondary,
  },
  captureButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...createColoredShadow(colors.primary, 4, 12, 0.4, 6),
  },
  captureInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.8)',
    backgroundColor: colors.primary,
  },
  // Result
  resultContainer: {
    flex: 1,
  },
  thumbnailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  thumbnail: {
    width: 64,
    height: 64,
    borderRadius: 14,
    backgroundColor: '#1E3A2B',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  thumbnailLeaf: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  retakeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  retakeText: {
    fontSize: 13,
    fontFamily: 'NotoSans_600SemiBold',
    color: colors.primary,
  },
});
