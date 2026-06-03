import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography } from '../constants/colors';

interface PriceRowProps {
  crop: string;
  variety: string;
  emoji: string;
  price: number;
  prevPrice: number;
  change: number;
  mandi: string;
  onPress?: () => void;
}

export const PriceRow: React.FC<PriceRowProps> = ({
  crop,
  variety,
  emoji,
  price,
  prevPrice,
  change,
  mandi,
  onPress,
}) => {
  const isUp = change >= 0;
  const changeColor = isUp ? colors.primary : colors.danger;
  const arrowIcon = isUp ? 'caret-up' : 'caret-down';

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.left}>
        <Text style={styles.emoji}>{emoji}</Text>
        <View style={styles.info}>
          <Text style={styles.cropName}>{crop}</Text>
          <Text style={styles.variety}>{variety}</Text>
        </View>
      </View>
      <View style={styles.right}>
        <View style={styles.priceColumn}>
          <Text style={styles.price}>₹{price.toLocaleString('en-IN')}</Text>
          <Text style={styles.prevPrice}>₹{prevPrice.toLocaleString('en-IN')}</Text>
        </View>
        <View style={[styles.changeBadge, { backgroundColor: isUp ? 'rgba(45,106,79,0.08)' : 'rgba(230,57,70,0.08)' }]}>
          <Ionicons name={arrowIcon} size={12} color={changeColor} />
          <Text style={[styles.changeText, { color: changeColor }]}>
            {Math.abs(change).toFixed(1)}%
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  emoji: {
    fontSize: 28,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  cropName: {
    fontSize: 16,
    fontFamily: 'NotoSans_600SemiBold',
    color: colors.textPrimary,
  },
  variety: {
    fontSize: 13,
    fontFamily: 'NotoSans_400Regular',
    color: colors.textSecondary,
    marginTop: 1,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  priceColumn: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 18,
    fontFamily: 'NotoSans_700Bold',
    color: colors.textPrimary,
  },
  prevPrice: {
    fontSize: 12,
    fontFamily: 'NotoSans_400Regular',
    color: colors.textSecondary,
    textDecorationLine: 'line-through',
  },
  changeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  changeText: {
    fontSize: 13,
    fontFamily: 'NotoSans_600SemiBold',
  },
});

export default PriceRow;
