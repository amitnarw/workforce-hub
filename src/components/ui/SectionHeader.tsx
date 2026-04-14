import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { fonts, fontSizes, fontWeights } from "../../constants/typography";
import { spacing } from "../../constants/spacing";

interface SectionHeaderProps {
  title: string;
  rightText?: string;
  onRightPress?: () => void;
}

export function SectionHeader({ title, rightText, onRightPress }: SectionHeaderProps) {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.onSurface }]}>{title}</Text>
      {rightText ? (
        <TouchableOpacity onPress={onRightPress} activeOpacity={0.7}>
          <Text style={[styles.rightText, { color: colors.primary }]}>{rightText}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  title: {
    fontFamily: fonts.headline,
    fontSize: fontSizes.sectionLg,
    fontWeight: fontWeights.semibold,
  },
  rightText: {
    fontFamily: fonts.body,
    fontSize: fontSizes.bodyMd,
    fontWeight: fontWeights.medium,
  },
});
