import React from 'react';
import { Text, StyleSheet, TouchableOpacity, ActivityIndicator, ViewStyle } from 'react-native';
import { colors } from '../constants/colors';

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'ghost' | 'danger' | 'white';
  size?: 'large' | 'medium' | 'small';
  style?: ViewStyle;
  icon?: React.ReactNode;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  label,
  onPress,
  loading = false,
  disabled = false,
  variant = 'primary',
  size = 'large',
  style,
  icon,
}) => {
  const buttonStyles = [
    styles.base,
    styles[variant],
    styles[`size_${size}`],
    disabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`text_${variant}`],
    styles[`textSize_${size}`],
    disabled && styles.textDisabled,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'ghost' ? colors.primary : colors.card}
        />
      ) : (
        <>
          {icon}
          <Text style={textStyles}>{label}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 50,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  ghost: {
    backgroundColor: colors.transparent,
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  danger: {
    backgroundColor: colors.danger,
  },
  white: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  disabled: {
    opacity: 0.5,
  },
  size_large: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    width: '100%' as any,
  },
  size_medium: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  size_small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  text: {
    fontFamily: 'NotoSans_600SemiBold',
  },
  text_primary: {
    color: colors.card,
  },
  text_ghost: {
    color: colors.primary,
  },
  text_danger: {
    color: colors.card,
  },
  text_white: {
    color: colors.textPrimary,
  },
  textDisabled: {
    opacity: 0.7,
  },
  textSize_large: {
    fontSize: 16,
  },
  textSize_medium: {
    fontSize: 15,
  },
  textSize_small: {
    fontSize: 13,
  },
});

export default PrimaryButton;
