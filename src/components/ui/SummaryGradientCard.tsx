import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../../context/ThemeContext";
import { fonts, fontSizes, fontWeights } from "../../constants/typography";
import { radius } from "../../constants/radius";
import { spacing } from "../../constants/spacing";

interface Pill {
  label: string;
}

interface SummaryGradientCardProps {
  label: string;
  value: string;
  subtitle: string;
  subtitleColor?: string;
  pills?: Pill[];
  children?: React.ReactNode;
}

export function SummaryGradientCard({
  label,
  value,
  subtitle,
  subtitleColor,
  pills,
  children,
}: SummaryGradientCardProps) {
  const { colors } = useTheme();
  return (
    <LinearGradient
      colors={[colors.primary, colors.primaryContainer]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <View style={styles.content}>
        <Text style={[styles.label, { color: colors.onPrimary }]}>{label}</Text>
        <Text style={[styles.value, { color: colors.onPrimary }]}>{value}</Text>
        <Text style={[styles.subtitle, { color: subtitleColor ?? "#86efac" }]}>{subtitle}</Text>
      </View>
      {pills && pills.length > 0 && (
        <View style={styles.pillContainer}>
          {pills.map((pill, i) => (
            <View key={i} style={[styles.pill, { backgroundColor: colors.onPrimary + "20" }]}>
              <Text style={[styles.pillText, { color: colors.onPrimary }]}>{pill.label}</Text>
            </View>
          ))}
        </View>
      )}
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.xxl,
    padding: spacing.xl,
    marginBottom: spacing.xxl,
  },
  content: {
    marginBottom: spacing.lg,
  },
  label: {
    fontFamily: fonts.body,
    fontSize: fontSizes.bodyMd,
    fontWeight: fontWeights.medium,
    marginBottom: spacing.xs,
  },
  value: {
    fontFamily: fonts.headline,
    fontSize: fontSizes.displayXl,
    fontWeight: fontWeights.extrabold,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: fontSizes.bodyMd,
    fontWeight: fontWeights.medium,
  },
  pillContainer: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  pill: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm - 2,
    borderRadius: radius.xxl,
  },
  pillText: {
    fontFamily: fonts.body,
    fontSize: fontSizes.small,
    fontWeight: fontWeights.semibold,
  },
});
