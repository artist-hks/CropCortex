import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Animated, { FadeIn, FadeInDown, useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { ErrorBoundaryProps, useRouter } from 'expo-router';
import { colors } from '../constants/colors';
import { PrimaryButton } from '../components/Buttons';
import { ScreenErrorBoundary } from '../components/ScreenErrorBoundary';
import { indianStates } from '../utils/mockData';
import { useAppStore } from '../store/useAppStore';

export default function AuthScreen() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [mobile, setMobile] = useState('');
  const [name, setName] = useState('');
  const [state, setState] = useState('');
  const [password, setPassword] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const otpRefs = useRef<(TextInput | null)[]>([]);
  const underlinePos = useSharedValue(0);

  const { setAuthenticated, setUser, setGuest } = useAppStore();

  useEffect(() => {
    underlinePos.value = withTiming(activeTab === 'login' ? 0 : 1, { duration: 250 });
  }, [activeTab]);

  const underlineStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: underlinePos.value * 160 }],
  }));

  const handleSendOtp = () => {
    if (mobile.length >= 10) {
      setShowOtp(true);
    }
  };

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setAuthenticated(true);
      setUser({
        name: name || 'Ramesh',
        fullName: name || 'Ramesh Patil',
        mobile: `+91 ${mobile}`,
        state: state || 'Maharashtra',
        district: 'Nashik',
        language: 'en',
        avatar: (name || 'RP').substring(0, 2).toUpperCase(),
      });
      router.replace('/');
    }, 1500);
  };

  const handleGuestContinue = () => {
    setGuest(true);
    setAuthenticated(true);
    setUser({
      name: 'Guest',
      fullName: 'Guest User',
      mobile: '',
      state: 'Maharashtra',
      district: 'Nashik',
      language: 'en',
      avatar: 'GU',
    });
    router.replace('/');
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo */}
        <Animated.View entering={FadeIn.duration(500)} style={styles.logoContainer}>
          <View style={styles.logoIcon}>
            <Svg width={32} height={32} viewBox="0 0 32 32">
              <Path d="M16 2C16 2 8 6 8 16c0 6 3.6 10 8 14 4.4-4 8-8 8-14 0-10-8-14-8-14z" fill={colors.primary} />
              <Path d="M16 8c0 0-3 2.5-3 7s1.5 6.5 3 9c1.5-2.5 3-4 3-9s-3-7-3-7z" fill={colors.primaryLight} />
            </Svg>
          </View>
          <Text style={styles.logoText}>CropCortex</Text>
          <Text style={styles.tagline}>Khet ki samajh, haath mein.</Text>
        </Animated.View>

        {/* Tab Switcher */}
        <Animated.View entering={FadeInDown.delay(100).duration(400)} style={styles.tabContainer}>
          <TouchableOpacity style={styles.tab} onPress={() => setActiveTab('login')}>
            <Text style={[styles.tabText, activeTab === 'login' && styles.tabTextActive]}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab} onPress={() => setActiveTab('register')}>
            <Text style={[styles.tabText, activeTab === 'register' && styles.tabTextActive]}>Register</Text>
          </TouchableOpacity>
          <Animated.View style={[styles.tabUnderline, underlineStyle]} />
        </Animated.View>

        {/* Form Fields */}
        <Animated.View entering={FadeInDown.delay(200).duration(400)} style={styles.form}>
          {/* Mobile Number */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Mobile Number</Text>
            <View style={styles.phoneInput}>
              <View style={styles.countryCode}>
                <Text style={styles.countryCodeText}>+91</Text>
              </View>
              <TextInput
                style={styles.phoneTextInput}
                placeholder="98765 43210"
                placeholderTextColor={colors.divider}
                value={mobile}
                onChangeText={setMobile}
                keyboardType="phone-pad"
                maxLength={10}
              />
            </View>
          </View>

          {/* Name (register only) */}
          {activeTab === 'register' && (
            <Animated.View entering={FadeInDown.duration(300)} style={styles.inputGroup}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your name"
                placeholderTextColor={colors.divider}
                value={name}
                onChangeText={setName}
              />
            </Animated.View>
          )}

          {/* State (register only) */}
          {activeTab === 'register' && (
            <Animated.View entering={FadeInDown.delay(50).duration(300)} style={styles.inputGroup}>
              <Text style={styles.label}>State</Text>
              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => setShowStateDropdown(!showStateDropdown)}
              >
                <Text style={[styles.dropdownText, !state && styles.placeholder]}>
                  {state || 'Select your state'}
                </Text>
                <Ionicons name="chevron-down" size={18} color={colors.textSecondary} />
              </TouchableOpacity>
              {showStateDropdown && (
                <ScrollView style={styles.dropdownList} nestedScrollEnabled>
                  {indianStates.map((s) => (
                    <TouchableOpacity
                      key={s}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setState(s);
                        setShowStateDropdown(false);
                      }}
                    >
                      <Text style={styles.dropdownItemText}>{s}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}
            </Animated.View>
          )}

          {/* Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter password"
              placeholderTextColor={colors.divider}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          {/* OTP Section */}
          {!showOtp ? (
            <PrimaryButton label="Send OTP" onPress={handleSendOtp} disabled={mobile.length < 10} />
          ) : (
            <Animated.View entering={FadeInDown.duration(400)} style={styles.otpSection}>
              <Text style={styles.otpLabel}>Enter 4-digit OTP sent to +91 {mobile}</Text>
              <View style={styles.otpRow}>
                {otp.map((digit, i) => (
                  <TextInput
                    key={i}
                    ref={(ref) => { otpRefs.current[i] = ref; }}
                    style={[styles.otpBox, Boolean(digit) && styles.otpBoxFilled]}
                    value={digit}
                    onChangeText={(v) => handleOtpChange(v, i)}
                    onKeyPress={({ nativeEvent }) => handleOtpKeyPress(nativeEvent.key, i)}
                    keyboardType="number-pad"
                    maxLength={1}
                    textAlign="center"
                    autoFocus={i === 0}
                  />
                ))}
              </View>
              <PrimaryButton
                label="Verify OTP"
                onPress={handleVerify}
                loading={loading}
                disabled={otp.some((d) => !d)}
              />
            </Animated.View>
          )}
        </Animated.View>

        {/* Guest Continue */}
        <TouchableOpacity onPress={handleGuestContinue} style={styles.guestLink}>
          <Text style={styles.guestLinkText}>Continue as Guest</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
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
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
    paddingVertical: 60,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 36,
  },
  logoIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: `${colors.primary}10`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  logoText: {
    fontSize: 28,
    fontFamily: 'NotoSans_700Bold',
    color: colors.primary,
  },
  tagline: {
    fontSize: 14,
    fontFamily: 'NotoSans_400Regular',
    color: colors.textSecondary,
    fontStyle: 'italic',
    marginTop: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 28,
    position: 'relative',
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  tab: {
    width: 160,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 16,
    fontFamily: 'NotoSans_600SemiBold',
    color: colors.textSecondary,
  },
  tabTextActive: {
    color: colors.primary,
  },
  tabUnderline: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    width: 160,
    height: 2,
    backgroundColor: colors.primary,
    borderRadius: 1,
  },
  form: {
    gap: 16,
  },
  inputGroup: {
    gap: 6,
  },
  label: {
    fontSize: 14,
    fontFamily: 'NotoSans_600SemiBold',
    color: colors.textPrimary,
  },
  input: {
    height: 50,
    backgroundColor: colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.divider,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: 'NotoSans_400Regular',
    color: colors.textPrimary,
  },
  phoneInput: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.divider,
    overflow: 'hidden',
  },
  countryCode: {
    width: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: colors.divider,
    backgroundColor: colors.bg,
  },
  countryCodeText: {
    fontSize: 15,
    fontFamily: 'NotoSans_600SemiBold',
    color: colors.textPrimary,
  },
  phoneTextInput: {
    flex: 1,
    paddingHorizontal: 14,
    fontSize: 16,
    fontFamily: 'NotoSans_400Regular',
    color: colors.textPrimary,
  },
  dropdown: {
    height: 50,
    backgroundColor: colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.divider,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownText: {
    fontSize: 16,
    fontFamily: 'NotoSans_400Regular',
    color: colors.textPrimary,
  },
  placeholder: {
    color: colors.divider,
  },
  dropdownList: {
    maxHeight: 160,
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.divider,
    marginTop: 4,
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  dropdownItemText: {
    fontSize: 15,
    fontFamily: 'NotoSans_400Regular',
    color: colors.textPrimary,
  },
  otpSection: {
    gap: 16,
    alignItems: 'center',
  },
  otpLabel: {
    fontSize: 14,
    fontFamily: 'NotoSans_400Regular',
    color: colors.textSecondary,
    textAlign: 'center',
  },
  otpRow: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
  },
  otpBox: {
    width: 56,
    height: 56,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: colors.divider,
    backgroundColor: colors.card,
    fontSize: 24,
    fontFamily: 'NotoSans_700Bold',
    color: colors.textPrimary,
  },
  otpBoxFilled: {
    borderColor: colors.primary,
    backgroundColor: `${colors.primary}08`,
  },
  guestLink: {
    marginTop: 24,
    alignItems: 'center',
    paddingVertical: 12,
  },
  guestLinkText: {
    fontSize: 14,
    fontFamily: 'NotoSans_600SemiBold',
    color: colors.textSecondary,
  },
});
