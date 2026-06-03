import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ViewToken,
} from 'react-native';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import Svg, { Circle, Path, Rect, Line } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors } from '../constants/colors';
import { PrimaryButton } from '../components/Buttons';
import { onboardingSlides, languages } from '../utils/mockData';
import { useAppStore } from '../store/useAppStore';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const FieldVisual: React.FC = () => (
  <Svg width={280} height={240} viewBox="0 0 280 240">
    {/* Sun */}
    <Circle cx={220} cy={50} r={30} fill={colors.accent} opacity={0.9} />
    <Circle cx={220} cy={50} r={42} fill={colors.accent} opacity={0.15} />
    {/* Field rows */}
    {[0, 1, 2, 3, 4].map((i) => (
      <Rect key={i} x={20} y={120 + i * 22} width={240} height={14} rx={4} fill={i % 2 === 0 ? colors.primary : colors.primaryLight} opacity={0.7 - i * 0.08} />
    ))}
    {/* Crop icons */}
    <Circle cx={60} cy={100} r={8} fill={colors.primaryLight} />
    <Line x1={60} y1={100} x2={60} y2={118} stroke={colors.primary} strokeWidth={2} />
    <Circle cx={140} cy={95} r={10} fill={colors.primaryLight} />
    <Line x1={140} y1={95} x2={140} y2={118} stroke={colors.primary} strokeWidth={2} />
    <Circle cx={210} cy={98} r={7} fill={colors.primaryLight} />
    <Line x1={210} y1={98} x2={210} y2={118} stroke={colors.primary} strokeWidth={2} />
    {/* Satellite dish */}
    <Path d="M35 30 Q50 15 65 30" stroke={colors.accent} strokeWidth={2} fill="none" />
    <Path d="M40 38 Q50 28 60 38" stroke={colors.accent} strokeWidth={2} fill="none" />
    <Circle cx={50} cy={42} r={3} fill={colors.accent} />
  </Svg>
);

const ScanVisual: React.FC = () => (
  <View style={styles.scanVisual}>
    <View style={styles.phoneFrame}>
      <View style={styles.leafContainer}>
        <Svg width={100} height={120} viewBox="0 0 100 120">
          <Path d="M50 10 C20 30 15 70 50 110 C85 70 80 30 50 10Z" fill={colors.primaryLight} opacity={0.8} />
          <Path d="M50 20 L50 100" stroke={colors.primary} strokeWidth={1.5} />
          <Path d="M50 40 L35 30" stroke={colors.primary} strokeWidth={1} />
          <Path d="M50 55 L65 45" stroke={colors.primary} strokeWidth={1} />
          <Path d="M50 70 L38 62" stroke={colors.primary} strokeWidth={1} />
          {/* Disease spots */}
          <Circle cx={38} cy={50} r={6} fill={colors.danger} opacity={0.6} />
          <Circle cx={62} cy={65} r={5} fill={colors.danger} opacity={0.5} />
          <Circle cx={45} cy={80} r={4} fill={colors.accent} opacity={0.5} />
        </Svg>
      </View>
      <View style={styles.scanLineSim} />
    </View>
  </View>
);

const ChartVisual: React.FC = () => (
  <Svg width={260} height={200} viewBox="0 0 260 200">
    {/* Grid */}
    {[0, 1, 2, 3].map((i) => (
      <Line key={i} x1={30} y1={30 + i * 40} x2={240} y2={30 + i * 40} stroke={colors.divider} strokeWidth={1} />
    ))}
    {/* Bars */}
    {[
      { x: 50, h: 80, c: colors.primaryLight },
      { x: 90, h: 100, c: colors.primaryLight },
      { x: 130, h: 65, c: colors.accent },
      { x: 170, h: 120, c: colors.primary },
      { x: 210, h: 140, c: colors.primary },
    ].map((bar, i) => (
      <Rect key={i} x={bar.x} y={190 - bar.h} width={24} height={bar.h} rx={6} fill={bar.c} opacity={0.85} />
    ))}
    {/* Trend line */}
    <Path d="M 62 130 Q 102 110 142 140 Q 182 90 222 60" stroke={colors.accent} strokeWidth={2.5} fill="none" strokeLinecap="round" />
    {/* Arrow up */}
    <Path d="M230 55 L222 60 L230 65" stroke={colors.accent} strokeWidth={2} fill="none" />
  </Svg>
);

const SlideVisuals: Record<string, React.FC> = {
  field: FieldVisual,
  scan: ScanVisual,
  chart: ChartVisual,
};

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const currentIndexRef = useRef(0);
  const router = useRouter();
  const { selectedLanguage, setLanguage, completeOnboarding } = useAppStore();

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems[0]) {
      const idx = viewableItems[0].index ?? 0;
      currentIndexRef.current = idx;
      setCurrentIndex(idx);
    }
  }).current;

  const handleNext = () => {
    const idx = currentIndexRef.current;
    if (idx < onboardingSlides.length - 1) {
      const nextIdx = idx + 1;
      flatListRef.current?.scrollToIndex({ index: nextIdx, animated: true });
      currentIndexRef.current = nextIdx;
      setCurrentIndex(nextIdx);
    } else {
      setShowLanguageSelector(true);
    }
  };

  const handleLanguageSelect = (code: string) => {
    setLanguage(code as any);
  };

  const handleContinue = () => {
    completeOnboarding();
    router.replace('/auth');
  };

  const renderSlide = ({ item, index }: { item: typeof onboardingSlides[0]; index: number }) => {
    const Visual = SlideVisuals[item.visual];
    return (
      <View style={[styles.slide, { width: SCREEN_WIDTH }]}>
        <Animated.View entering={FadeIn.delay(200).duration(500)} style={styles.visualContainer}>
          <Visual />
        </Animated.View>
        <Animated.View entering={FadeInUp.delay(300).duration(500)} style={styles.textContainer}>
          <Text style={styles.headline}>{item.headline}</Text>
          {item.subtitle ? <Text style={styles.subtitle}>{item.subtitle}</Text> : null}
          <Text style={styles.body}>{item.body}</Text>
        </Animated.View>
      </View>
    );
  };

  if (showLanguageSelector) {
    return (
      <View style={styles.screen}>
        <Animated.View entering={FadeIn.duration(400)} style={styles.langContainer}>
          <Text style={styles.langTitle}>Choose your language</Text>
          <Text style={styles.langTitleHindi}>अपनी भाषा चुनें</Text>

          <View style={styles.langGrid}>
            {languages.map((lang) => (
              <TouchableOpacity
                key={lang.code}
                style={[
                  styles.langPill,
                  selectedLanguage === lang.code && styles.langPillSelected,
                ]}
                onPress={() => handleLanguageSelect(lang.code)}
              >
                <Text
                  style={[
                    styles.langPillText,
                    selectedLanguage === lang.code && styles.langPillTextSelected,
                  ]}
                >
                  {lang.native}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.langCta}>
            <PrimaryButton label="Continue" onPress={handleContinue} />
          </View>
        </Animated.View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        ref={flatListRef}
        data={onboardingSlides}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
      />

      {/* Progress dots + CTA */}
      <Animated.View entering={FadeInDown.delay(400).duration(400)} style={styles.footer}>
        <View style={styles.dots}>
          {onboardingSlides.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, currentIndex === i && styles.dotActive]}
            />
          ))}
        </View>
        <View style={styles.ctaContainer}>
          <PrimaryButton
            label={currentIndex === onboardingSlides.length - 1 ? 'Get Started' : 'Next →'}
            onPress={handleNext}
          />
          {currentIndex === onboardingSlides.length - 1 && (
            <TouchableOpacity onPress={() => setShowLanguageSelector(true)} style={styles.langLink}>
              <Ionicons name="language-outline" size={16} color={colors.primary} />
              <Text style={styles.langLinkText}>Select Language</Text>
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  visualContainer: {
    width: 280,
    height: 260,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    backgroundColor: `${colors.primary}08`,
    borderRadius: 24,
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  headline: {
    fontSize: 28,
    fontFamily: 'NotoSans_700Bold',
    color: colors.textPrimary,
    textAlign: 'center',
    lineHeight: 36,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'NotoSans_600SemiBold',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 8,
  },
  body: {
    fontSize: 16,
    fontFamily: 'NotoSans_400Regular',
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 320,
  },
  footer: {
    paddingHorizontal: 32,
    paddingBottom: 48,
    paddingTop: 16,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 24,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.divider,
  },
  dotActive: {
    width: 24,
    backgroundColor: colors.primary,
  },
  ctaContainer: {
    gap: 16,
    alignItems: 'center',
  },
  langLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
  },
  langLinkText: {
    fontSize: 14,
    fontFamily: 'NotoSans_600SemiBold',
    color: colors.primary,
  },
  // Language selector
  langContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  langTitle: {
    fontSize: 24,
    fontFamily: 'NotoSans_700Bold',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 4,
  },
  langTitleHindi: {
    fontSize: 22,
    fontFamily: 'NotoSans_600SemiBold',
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
  },
  langGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 40,
  },
  langPill: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 50,
    borderWidth: 1.5,
    borderColor: colors.divider,
    backgroundColor: colors.card,
  },
  langPillSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  langPillText: {
    fontSize: 16,
    fontFamily: 'NotoSans_600SemiBold',
    color: colors.textPrimary,
  },
  langPillTextSelected: {
    color: colors.card,
  },
  langCta: {
    paddingHorizontal: 16,
  },
  // Scan visual
  scanVisual: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneFrame: {
    width: 180,
    height: 220,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: colors.darkSurface,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  leafContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanLineSim: {
    position: 'absolute',
    left: 8,
    right: 8,
    height: 2,
    top: '50%',
    backgroundColor: colors.primaryLight,
    borderRadius: 1,
    opacity: 0.8,
  },
});
