import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn, FadeInDown, FadeInRight } from 'react-native-reanimated';
import { colors } from '../../constants/colors';
import { CropHealthRing } from '../../components/CropHealthRing';
import { WeatherWidget } from '../../components/WeatherWidget';
import { OfflineBanner } from '../../components/OfflineBanner';
import { PrimaryButton } from '../../components/Buttons';
import { useAppStore } from '../../store/useAppStore';
import { useRouter } from 'expo-router';
import { cardShadow, chipShadow } from '../../utils/shadows';
import {
  userData,
  weatherData,
  fieldData,
  alertData,
  quickActions,
  cropCalendarPeek,
  mandiPrices,
} from '../../utils/mockData';

export default function HomeScreen() {
  const router = useRouter();
  const { isOnline, showOfflineBanner, lastSyncTimestamp, setOnline } = useAppStore();
  const [isAlertDismissed, setIsAlertDismissed] = useState(false);

  const currentDate = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <View style={styles.screen}>
      {showOfflineBanner && (
        <OfflineBanner lastSync={lastSyncTimestamp} onRetry={() => setOnline(true)} />
      )}

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Greeting + Weather */}
        <Animated.View entering={FadeIn.duration(400)} style={styles.greeting}>
          <View>
            <Text style={styles.greetingText}>Namaste, {userData.name} 🌾</Text>
            <Text style={styles.dateText}>{currentDate}</Text>
          </View>
        </Animated.View>

        <WeatherWidget
          temp={weatherData.temp}
          condition={weatherData.condition}
          location={`${userData.district}, ${userData.state}`}
        />

        {/* Field Health Card */}
        <Animated.View entering={FadeInDown.delay(100).duration(500)} style={styles.fieldCard}>
          <View style={styles.fieldCardHeader}>
            <View>
              <Text style={styles.fieldCardTitle}>Your Field — {fieldData.name}</Text>
              <Text style={styles.fieldCardSub}>Last updated: {fieldData.lastUpdated}</Text>
            </View>
          </View>

          <View style={styles.fieldCardBody}>
            <CropHealthRing score={fieldData.ndviScore} size={100} />
            <View style={styles.fieldStatus}>
              <Text style={styles.statusText}>🟡 {fieldData.stressNote}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.viewMapButton} activeOpacity={0.8} onPress={() => router.push('/field')}>
            <Text style={styles.viewMapText}>View Satellite Map →</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Alert Banner */}
        {alertData.active && !isAlertDismissed && (
          <Animated.View entering={FadeInDown.delay(200).duration(400)}>
            <TouchableOpacity style={styles.alertBanner} activeOpacity={0.8} onPress={() => router.push('/disease-history')}>
              <View style={styles.alertContent}>
                <Text style={styles.alertIcon}>⚠</Text>
                <Text style={styles.alertText}>{alertData.message}</Text>
              </View>
              <TouchableOpacity
                onPress={() => setIsAlertDismissed(true)}
                hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              >
                <Ionicons name="close-circle-outline" size={22} color="rgba(230,57,70,0.6)" />
              </TouchableOpacity>
            </TouchableOpacity>
          </Animated.View>
        )}

        {/* Quick Actions */}
        <Animated.View entering={FadeInDown.delay(300).duration(400)} style={styles.actionsGrid}>
          {quickActions.map((action, index) => (
            <Animated.View key={action.id} entering={FadeInDown.delay(300 + index * 60).duration(400)}>
              <TouchableOpacity 
                style={styles.actionCard} 
                activeOpacity={0.7}
                onPress={() => {
                  if (action.id === 'diagnose') router.push('/diagnose');
                  else if (action.id === 'prices') router.push('/market');
                  else if (action.id === 'advisory') router.push('/advisory');
                  else router.push('/field');
                }}
              >
                <View style={[styles.actionIcon, { backgroundColor: action.bgColor }]}>
                  <Ionicons name={action.icon} size={26} color={action.color} />
                </View>
                <Text style={styles.actionLabel}>{action.label}</Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </Animated.View>

        {/* Crop Calendar Peek */}
        <Animated.View entering={FadeInDown.delay(500).duration(400)}>
          <Text style={styles.sectionLabel}>THIS WEEK</Text>
          <FlatList
            horizontal
            data={cropCalendarPeek}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.calendarList}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <Animated.View entering={FadeInRight.delay(index * 80).duration(300)}>
                <View style={styles.calendarCard}>
                  <View style={styles.calendarDay}>
                    <Text style={styles.calendarDayText}>{item.day}</Text>
                    <Text style={styles.calendarDateText}>{item.date.split(' ')[1]}</Text>
                  </View>
                  <View style={styles.calendarInfo}>
                    <Text style={styles.calendarIcon}>{item.icon}</Text>
                    <Text style={styles.calendarTask} numberOfLines={2}>{item.task}</Text>
                    <View style={styles.calendarMeta}>
                      <Text style={styles.calendarCrop}>{item.crop}</Text>
                      <View style={[
                        styles.urgencyDot,
                        {
                          backgroundColor:
                            item.urgency === 'critical' ? colors.danger :
                            item.urgency === 'warning' ? colors.accent :
                            colors.primaryLight,
                        },
                      ]} />
                    </View>
                  </View>
                </View>
              </Animated.View>
            )}
          />
        </Animated.View>

        {/* Market Prices Strip */}
        <Animated.View entering={FadeInDown.delay(600).duration(400)}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionLabel}>TODAY'S MANDI PRICES</Text>
            <View style={styles.districtBadge}>
              <Text style={styles.districtText}>{userData.district}</Text>
            </View>
          </View>
          <FlatList
            horizontal
            data={mandiPrices.slice(0, 6)}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.pricesList}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const isUp = item.change >= 0;
              return (
                <TouchableOpacity style={styles.priceChip} activeOpacity={0.7} onPress={() => router.push('/market')}>
                  <Text style={styles.priceEmoji}>{item.emoji}</Text>
                  <Text style={styles.priceCrop}>{item.crop}</Text>
                  <Text style={styles.priceValue}>₹{item.price.toLocaleString('en-IN')}</Text>
                  <View style={styles.priceChangeRow}>
                    <Ionicons
                      name={isUp ? 'caret-up' : 'caret-down'}
                      size={11}
                      color={isUp ? colors.primary : colors.danger}
                    />
                    <Text style={[styles.priceChange, { color: isUp ? colors.primary : colors.danger }]}>
                      {Math.abs(item.change).toFixed(1)}%
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  greeting: {
    marginBottom: 4,
  },
  greetingText: {
    fontSize: 24,
    fontFamily: 'NotoSans_700Bold',
    color: colors.textPrimary,
  },
  dateText: {
    fontSize: 14,
    fontFamily: 'NotoSans_400Regular',
    color: colors.textSecondary,
    marginTop: 2,
  },
  // Field Health Card
  fieldCard: {
    backgroundColor: colors.darkSurface,
    borderRadius: 20,
    padding: 20,
    marginTop: 16,
  },
  fieldCardHeader: {
    marginBottom: 16,
  },
  fieldCardTitle: {
    fontSize: 18,
    fontFamily: 'NotoSans_700Bold',
    color: colors.card,
  },
  fieldCardSub: {
    fontSize: 12,
    fontFamily: 'NotoSans_400Regular',
    color: 'rgba(255,255,255,0.45)',
    marginTop: 2,
  },
  fieldCardBody: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginBottom: 16,
  },
  fieldStatus: {
    flex: 1,
  },
  statusText: {
    fontSize: 14,
    fontFamily: 'NotoSans_600SemiBold',
    color: colors.accent,
    lineHeight: 20,
  },
  viewMapButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    borderRadius: 50,
    alignSelf: 'flex-start',
  },
  viewMapText: {
    fontSize: 13,
    fontFamily: 'NotoSans_600SemiBold',
    color: colors.card,
  },
  // Alert
  alertBanner: {
    backgroundColor: colors.dangerLight,
    borderRadius: 14,
    padding: 14,
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: `${colors.danger}20`,
  },
  alertContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  alertIcon: {
    fontSize: 18,
  },
  alertText: {
    flex: 1,
    fontSize: 13,
    fontFamily: 'NotoSans_600SemiBold',
    color: colors.danger,
    lineHeight: 18,
  },
  // Quick Actions
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 20,
  },
  actionCard: {
    width: '100%',
    aspectRatio: 1,
    minWidth: 150,
    maxWidth: 175,
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    ...cardShadow,
    elevation: 2,
    flex: 1,
  },
  actionIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionLabel: {
    fontSize: 13,
    fontFamily: 'NotoSans_600SemiBold',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  // Calendar Peek
  sectionLabel: {
    fontSize: 11,
    fontFamily: 'NotoSans_600SemiBold',
    color: colors.textSecondary,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginTop: 24,
    marginBottom: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  districtBadge: {
    backgroundColor: `${colors.primary}12`,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
  },
  districtText: {
    fontSize: 12,
    fontFamily: 'NotoSans_600SemiBold',
    color: colors.primary,
  },
  calendarList: {
    gap: 10,
  },
  calendarCard: {
    width: 200,
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    gap: 12,
    ...cardShadow,
    elevation: 1,
  },
  calendarDay: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
  },
  calendarDayText: {
    fontSize: 11,
    fontFamily: 'NotoSans_600SemiBold',
    color: colors.textSecondary,
    textTransform: 'uppercase',
  },
  calendarDateText: {
    fontSize: 20,
    fontFamily: 'NotoSans_700Bold',
    color: colors.textPrimary,
  },
  calendarInfo: {
    flex: 1,
  },
  calendarIcon: {
    fontSize: 16,
    marginBottom: 2,
  },
  calendarTask: {
    fontSize: 13,
    fontFamily: 'NotoSans_600SemiBold',
    color: colors.textPrimary,
    lineHeight: 18,
  },
  calendarMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  calendarCrop: {
    fontSize: 11,
    fontFamily: 'NotoSans_400Regular',
    color: colors.textSecondary,
  },
  urgencyDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  // Market Prices
  pricesList: {
    gap: 10,
    paddingBottom: 4,
  },
  priceChip: {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    minWidth: 100,
    ...chipShadow,
    elevation: 1,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  priceEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  priceCrop: {
    fontSize: 12,
    fontFamily: 'NotoSans_600SemiBold',
    color: colors.textSecondary,
    marginBottom: 2,
  },
  priceValue: {
    fontSize: 16,
    fontFamily: 'NotoSans_700Bold',
    color: colors.textPrimary,
  },
  priceChangeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginTop: 2,
  },
  priceChange: {
    fontSize: 12,
    fontFamily: 'NotoSans_600SemiBold',
  },
});
