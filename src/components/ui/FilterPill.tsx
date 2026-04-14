import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { fonts, fontSizes, fontWeights } from "../../constants/typography";
import { radius } from "../../constants/radius";
import { spacing } from "../../constants/spacing";

interface FilterPillProps {
  label: string;
  isActive: boolean;
  onPress: () => void;
}

export function FilterPill({ label, isActive, onPress }: FilterPillProps) {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      style={[
        styles.pill,
        {
          backgroundColor: isActive ? colors.primary : colors.surfaceContainerLow,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.text,
          {
            color: isActive ? colors.onPrimary : colors.onSurfaceVariant,
          },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
  },
  text: {
    fontFamily: fonts.label,
    fontSize: fontSizes.body,
    fontWeight: fontWeights.semibold,
  },
});
