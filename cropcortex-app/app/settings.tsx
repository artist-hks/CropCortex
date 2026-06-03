import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ErrorBoundaryProps } from 'expo-router';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { colors } from '../constants/colors';
import { NetworkAwareOfflineBanner } from '../components/NetworkAwareOfflineBanner';
import { ScreenErrorBoundary } from '../components/ScreenErrorBoundary';
import { useAppStore } from '../store/useAppStore';
import { userData, languages } from '../utils/mockData';

export default function SettingsScreen() {
  const { logout, selectedLanguage } = useAppStore();
  const [notifications, setNotifications] = useState({
    cropAlerts: true,
    priceAlerts: true,
    advisoryReminders: true,
    govSchemes: false,
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const currentLang = languages.find((l) => l.code === selectedLanguage);

  return (
    <View style={styles.screen}>
      <NetworkAwareOfflineBanner />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <Animated.View entering={FadeIn.duration(400)} style={styles.profileSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{userData.avatar}</Text>
          </View>
          <Text style={styles.userName}>{userData.fullName}</Text>
          <Text style={styles.userMobile}>{userData.mobile}</Text>
        </Animated.View>

        {/* My Fields */}
        <Animated.View entering={FadeInDown.delay(100).duration(400)}>
          <TouchableOpacity
            style={styles.settingsRow}
            onPress={() => Alert.alert('My Fields', 'Field management is coming soon.')}
          >
            <View style={styles.settingsRowLeft}>
              <View style={[styles.settingsIcon, { backgroundColor: `${colors.primary}10` }]}>
                <Ionicons name="leaf-outline" size={20} color={colors.primary} />
              </View>
              <View>
                <Text style={styles.settingsLabel}>My Fields</Text>
                <Text style={styles.settingsValue}>3 fields registered</Text>
              </View>
            </View>
            <View style={styles.settingsRowRight}>
              <Text style={styles.manageText}>Manage</Text>
              <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
            </View>
          </TouchableOpacity>
        </Animated.View>

        {/* Language */}
        <Animated.View entering={FadeInDown.delay(150).duration(400)}>
          <TouchableOpacity
            style={styles.settingsRow}
            onPress={() => Alert.alert('Language', 'Language switching is coming soon.')}
          >
            <View style={styles.settingsRowLeft}>
              <View style={[styles.settingsIcon, { backgroundColor: `${colors.accent}15` }]}>
                <Ionicons name="language-outline" size={20} color={colors.accent} />
              </View>
              <View>
                <Text style={styles.settingsLabel}>Language</Text>
                <Text style={styles.settingsValue}>{currentLang?.native || 'English'}</Text>
              </View>
            </View>
            <View style={styles.settingsRowRight}>
              <Text style={styles.manageText}>Change</Text>
              <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
            </View>
          </TouchableOpacity>
        </Animated.View>

        {/* Notifications */}
        <Animated.View entering={FadeInDown.delay(200).duration(400)} style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>

          <View style={styles.toggleRow}>
            <View style={styles.toggleInfo}>
              <Ionicons name="alert-circle-outline" size={18} color={colors.danger} />
              <Text style={styles.toggleLabel}>Crop Alerts</Text>
            </View>
            <Switch
              value={notifications.cropAlerts}
              onValueChange={() => toggleNotification('cropAlerts')}
              trackColor={{ false: colors.divider, true: `${colors.primary}60` }}
              thumbColor={notifications.cropAlerts ? colors.primary : '#f4f3f4'}
            />
          </View>

          <View style={styles.toggleRow}>
            <View style={styles.toggleInfo}>
              <Ionicons name="trending-up-outline" size={18} color={colors.primaryLight} />
              <Text style={styles.toggleLabel}>Market Price Alerts</Text>
            </View>
            <Switch
              value={notifications.priceAlerts}
              onValueChange={() => toggleNotification('priceAlerts')}
              trackColor={{ false: colors.divider, true: `${colors.primary}60` }}
              thumbColor={notifications.priceAlerts ? colors.primary : '#f4f3f4'}
            />
          </View>

          <View style={styles.toggleRow}>
            <View style={styles.toggleInfo}>
              <Ionicons name="calendar-outline" size={18} color={colors.accent} />
              <Text style={styles.toggleLabel}>Advisory Reminders</Text>
            </View>
            <Switch
              value={notifications.advisoryReminders}
              onValueChange={() => toggleNotification('advisoryReminders')}
              trackColor={{ false: colors.divider, true: `${colors.primary}60` }}
              thumbColor={notifications.advisoryReminders ? colors.primary : '#f4f3f4'}
            />
          </View>

          <View style={styles.toggleRow}>
            <View style={styles.toggleInfo}>
              <Ionicons name="megaphone-outline" size={18} color={colors.textSecondary} />
              <Text style={styles.toggleLabel}>Government Scheme Updates</Text>
            </View>
            <Switch
              value={notifications.govSchemes}
              onValueChange={() => toggleNotification('govSchemes')}
              trackColor={{ false: colors.divider, true: `${colors.primary}60` }}
              thumbColor={notifications.govSchemes ? colors.primary : '#f4f3f4'}
            />
          </View>
        </Animated.View>

        {/* Offline Data */}
        <Animated.View entering={FadeInDown.delay(300).duration(400)} style={styles.section}>
          <Text style={styles.sectionTitle}>Offline Data</Text>
          <View style={styles.offlineCard}>
            <View style={styles.storageRow}>
              <View>
                <Text style={styles.storageLabel}>Storage Used</Text>
                <Text style={styles.storageValue}>48 MB / 200 MB</Text>
              </View>
              <View style={styles.storageBadge}>
                <Text style={styles.storageBadgeText}>24%</Text>
              </View>
            </View>
            <View style={styles.storageBarBg}>
              <View style={[styles.storageBarFill, { width: '24%' }]} />
            </View>
            <TouchableOpacity
              style={styles.downloadButton}
              onPress={() => Alert.alert('Offline Data', 'District data download is coming soon.')}
            >
              <Ionicons name="cloud-download-outline" size={18} color={colors.primary} />
              <Text style={styles.downloadText}>Download district data for offline use</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* About */}
        <Animated.View entering={FadeInDown.delay(400).duration(400)} style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.aboutList}>
            <TouchableOpacity
              style={styles.aboutRow}
              onPress={() => Alert.alert('App Version', 'CropCortex version 1.0.0')}
            >
              <Ionicons name="information-circle-outline" size={18} color={colors.textSecondary} />
              <Text style={styles.aboutText}>App Version 1.0.0</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.aboutRow}
              onPress={() => Alert.alert('Share App', 'App sharing is coming soon.')}
            >
              <Ionicons name="share-social-outline" size={18} color={colors.textSecondary} />
              <Text style={styles.aboutText}>Share App</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.aboutRow}
              onPress={() => Alert.alert('Rate Us', 'Store ratings will be available after release.')}
            >
              <Ionicons name="star-outline" size={18} color={colors.textSecondary} />
              <Text style={styles.aboutText}>Rate Us</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.aboutRow}
              onPress={() => Alert.alert('Privacy Policy', 'Privacy policy content is coming soon.')}
            >
              <Ionicons name="shield-checkmark-outline" size={18} color={colors.textSecondary} />
              <Text style={styles.aboutText}>Privacy Policy</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Logout */}
        <Animated.View entering={FadeInDown.delay(500).duration(400)} style={styles.logoutSection}>
          <TouchableOpacity style={styles.logoutButton} onPress={logout}>
            <Ionicons name="log-out-outline" size={18} color={colors.danger} />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
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
    paddingBottom: 48,
  },
  // Profile
  profileSection: {
    alignItems: 'center',
    paddingVertical: 28,
    marginBottom: 8,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 24,
    fontFamily: 'NotoSans_700Bold',
    color: colors.card,
  },
  userName: {
    fontSize: 22,
    fontFamily: 'NotoSans_700Bold',
    color: colors.textPrimary,
  },
  userMobile: {
    fontSize: 14,
    fontFamily: 'NotoSans_400Regular',
    color: colors.textSecondary,
    marginTop: 2,
  },
  // Settings Row
  settingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  settingsRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingsIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsLabel: {
    fontSize: 15,
    fontFamily: 'NotoSans_600SemiBold',
    color: colors.textPrimary,
  },
  settingsValue: {
    fontSize: 13,
    fontFamily: 'NotoSans_400Regular',
    color: colors.textSecondary,
    marginTop: 1,
  },
  settingsRowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  manageText: {
    fontSize: 13,
    fontFamily: 'NotoSans_600SemiBold',
    color: colors.primary,
  },
  // Section
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'NotoSans_700Bold',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  // Toggle
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.card,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  toggleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  toggleLabel: {
    fontSize: 15,
    fontFamily: 'NotoSans_400Regular',
    color: colors.textPrimary,
  },
  // Offline
  offlineCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  storageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  storageLabel: {
    fontSize: 14,
    fontFamily: 'NotoSans_600SemiBold',
    color: colors.textPrimary,
  },
  storageValue: {
    fontSize: 13,
    fontFamily: 'NotoSans_400Regular',
    color: colors.textSecondary,
    marginTop: 2,
  },
  storageBadge: {
    backgroundColor: `${colors.primary}10`,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  storageBadgeText: {
    fontSize: 13,
    fontFamily: 'NotoSans_700Bold',
    color: colors.primary,
  },
  storageBarBg: {
    height: 6,
    backgroundColor: colors.bg,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 16,
  },
  storageBarFill: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: colors.primary,
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 50,
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  downloadText: {
    fontSize: 14,
    fontFamily: 'NotoSans_600SemiBold',
    color: colors.primary,
  },
  // About
  aboutList: {
    backgroundColor: colors.card,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.divider,
  },
  aboutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  aboutText: {
    fontSize: 15,
    fontFamily: 'NotoSans_400Regular',
    color: colors.textPrimary,
  },
  // Logout
  logoutSection: {
    marginTop: 28,
    alignItems: 'center',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  logoutText: {
    fontSize: 16,
    fontFamily: 'NotoSans_600SemiBold',
    color: colors.danger,
  },
});
