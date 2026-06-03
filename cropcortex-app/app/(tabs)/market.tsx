import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  TextInput,
  FlatList,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { colors } from '../../constants/colors';
import { PriceRow } from '../../components/PriceRow';
import { ChipSelector } from '../../components/ChipSelector';
import { LineChartSVG } from '../../components/LineChartSVG';
import { BottomSheet } from '../../components/BottomSheet';
import { PrimaryButton } from '../../components/Buttons';
import { useAppStore } from '../../store/useAppStore';
import { mandiPrices, priceHistory, nearbyMandis, priceCategories, userData } from '../../utils/mockData';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function MarketScreen() {
  const { selectedCategory, setSelectedCategory } = useAppStore();
  const [showDetail, setShowDetail] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState(mandiPrices[0]);
  const [targetPrice, setTargetPrice] = useState('');

  const filteredPrices = selectedCategory === 'All'
    ? mandiPrices
    : selectedCategory === 'My Crops'
    ? mandiPrices.filter((p) => ['Tomato', 'Cotton'].includes(p.crop))
    : mandiPrices.filter((p) => p.category === selectedCategory);

  const chartData = priceHistory.map((p) => ({
    label: `${p.day}`,
    value: p.price,
  }));

  const handleCropPress = (crop: typeof mandiPrices[0]) => {
    setSelectedCrop(crop);
    setShowDetail(true);
  };

  const handleSetPriceAlert = () => {
    const parsedTarget = Number(targetPrice);
    if (!Number.isFinite(parsedTarget) || parsedTarget <= 0) {
      Alert.alert('Invalid Target', 'Enter a valid target price to create an alert.');
      return;
    }

    Alert.alert('Price Alert Set', `We'll notify you when ${selectedCrop.crop} reaches ₹${parsedTarget.toLocaleString('en-IN')}.`);
    setTargetPrice('');
  };

  return (
    <View style={styles.screen}>
      {/* Header */}
      <Animated.View entering={FadeIn.duration(400)} style={styles.header}>
        <Text style={styles.title}>Mandi Prices</Text>
        <TouchableOpacity
          style={styles.locationChip}
          onPress={() => Alert.alert('Location', 'District selection is coming soon.')}
        >
          <Ionicons name="location-outline" size={14} color={colors.primary} />
          <Text style={styles.locationText}>{userData.district}</Text>
          <Ionicons name="pencil-outline" size={12} color={colors.textSecondary} />
        </TouchableOpacity>
      </Animated.View>

      {/* Filter chips */}
      <View style={styles.filterContainer}>
        <ChipSelector
          options={priceCategories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </View>

      {/* Price List */}
      <FlatList
        data={filteredPrices}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeInDown.delay(index * 50).duration(300)}>
            <PriceRow
              crop={item.crop}
              variety={item.variety}
              emoji={item.emoji}
              price={item.price}
              prevPrice={item.prevPrice}
              change={item.change}
              mandi={item.mandi}
              onPress={() => handleCropPress(item)}
            />
          </Animated.View>
        )}
      />

      {/* Detail Bottom Sheet */}
      <BottomSheet
        visible={showDetail}
        onClose={() => setShowDetail(false)}
        title={`${selectedCrop.emoji} ${selectedCrop.crop}`}
      >
        {/* Price chart */}
        <Text style={styles.detailSection}>Price Trend — Last 30 Days</Text>
        <View style={styles.chartContainer}>
          <LineChartSVG
            data={chartData}
            color={colors.primaryLight}
            width={SCREEN_WIDTH - 72}
            height={180}
          />
        </View>

        {/* Nearby mandis */}
        <Text style={styles.detailSection}>Prices Across Nearby Mandis</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.mandiScroll}>
          {nearbyMandis.map((mandi) => (
            <View key={mandi.name} style={styles.mandiCard}>
              <Text style={styles.mandiName}>{mandi.name}</Text>
              <Text style={styles.mandiPrice}>₹{mandi.price.toLocaleString('en-IN')}</Text>
              <Text style={styles.mandiDistance}>{mandi.distance}</Text>
            </View>
          ))}
        </ScrollView>

        {/* AI Recommendation */}
        <View style={styles.aiCard}>
          <View style={styles.aiHeader}>
            <Ionicons name="trending-up" size={18} color={colors.accent} />
            <Text style={styles.aiTitle}>AI Sell Recommendation</Text>
          </View>
          <Text style={styles.aiText}>
            📈 Prices expected to rise 8–12% in next 7 days based on reduced supply from
            major growing districts and upcoming festival demand. Consider holding stock.
          </Text>
        </View>

        {/* Price Alert */}
        <View style={styles.alertSection}>
          <Text style={styles.detailSection}>Set Price Alert</Text>
          <View style={styles.alertInputRow}>
            <View style={styles.alertInputContainer}>
              <Text style={styles.alertPrefix}>₹</Text>
              <TextInput
                style={styles.alertInput}
                placeholder="Enter target price"
                placeholderTextColor={colors.divider}
                value={targetPrice}
                onChangeText={setTargetPrice}
                keyboardType="number-pad"
              />
            </View>
            <TouchableOpacity style={styles.alertSetButton} onPress={handleSetPriceAlert}>
              <Ionicons name="notifications-outline" size={18} color={colors.card} />
            </TouchableOpacity>
          </View>
          <Text style={styles.alertHint}>
            We'll notify you via SMS when {selectedCrop.crop} reaches your target price.
          </Text>
        </View>
      </BottomSheet>
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
  locationChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: `${colors.primary}10`,
  },
  locationText: {
    fontSize: 14,
    fontFamily: 'NotoSans_600SemiBold',
    color: colors.primary,
  },
  filterContainer: {
    marginBottom: 8,
  },
  listContent: {
    paddingBottom: 32,
  },
  // Detail Sheet
  detailSection: {
    fontSize: 16,
    fontFamily: 'NotoSans_700Bold',
    color: colors.textPrimary,
    marginTop: 16,
    marginBottom: 12,
  },
  chartContainer: {
    backgroundColor: colors.bg,
    borderRadius: 16,
    padding: 12,
  },
  mandiScroll: {
    marginHorizontal: -4,
  },
  mandiCard: {
    backgroundColor: colors.bg,
    borderRadius: 14,
    padding: 14,
    marginHorizontal: 4,
    minWidth: 130,
    alignItems: 'center',
  },
  mandiName: {
    fontSize: 13,
    fontFamily: 'NotoSans_600SemiBold',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 4,
  },
  mandiPrice: {
    fontSize: 20,
    fontFamily: 'NotoSans_700Bold',
    color: colors.primary,
  },
  mandiDistance: {
    fontSize: 11,
    fontFamily: 'NotoSans_400Regular',
    color: colors.textSecondary,
    marginTop: 2,
  },
  // AI Card
  aiCard: {
    backgroundColor: `${colors.accent}15`,
    borderRadius: 14,
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: `${colors.accent}30`,
  },
  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  aiTitle: {
    fontSize: 14,
    fontFamily: 'NotoSans_700Bold',
    color: colors.textPrimary,
  },
  aiText: {
    fontSize: 14,
    fontFamily: 'NotoSans_400Regular',
    color: colors.textPrimary,
    lineHeight: 22,
  },
  // Alert
  alertSection: {
    marginTop: 8,
  },
  alertInputRow: {
    flexDirection: 'row',
    gap: 10,
  },
  alertInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bg,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.divider,
    paddingHorizontal: 14,
    height: 48,
  },
  alertPrefix: {
    fontSize: 16,
    fontFamily: 'NotoSans_700Bold',
    color: colors.textPrimary,
    marginRight: 4,
  },
  alertInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'NotoSans_400Regular',
    color: colors.textPrimary,
  },
  alertSetButton: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertHint: {
    fontSize: 12,
    fontFamily: 'NotoSans_400Regular',
    color: colors.textSecondary,
    marginTop: 8,
    lineHeight: 18,
  },
});
