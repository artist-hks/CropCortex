import React from 'react';
import { Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors } from '../constants/colors';

interface ChipSelectorProps {
  options: string[];
  selected: string;
  onSelect: (option: string) => void;
  scrollable?: boolean;
}

export const ChipSelector: React.FC<ChipSelectorProps> = ({
  options,
  selected,
  onSelect,
  scrollable = true,
}) => {
  const chips = options.map((option) => {
    const isSelected = option === selected;
    return (
      <TouchableOpacity
        key={option}
        style={[styles.chip, isSelected && styles.chipSelected]}
        onPress={() => onSelect(option)}
        activeOpacity={0.7}
      >
        <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
          {option}
        </Text>
      </TouchableOpacity>
    );
  });

  if (scrollable) {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {chips}
      </ScrollView>
    );
  }

  return <>{chips}</>;
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 16,
    gap: 8,
    paddingVertical: 4,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 50,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  chipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    fontSize: 14,
    fontFamily: 'NotoSans_600SemiBold',
    color: colors.textSecondary,
  },
  chipTextSelected: {
    color: colors.card,
  },
});

export default ChipSelector;
