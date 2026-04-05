import React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";
import { useTheme } from "../../context/ThemeContext";

interface PrimaryCardProps {
  title: string;
  subtitle?: string;
  value?: string;
  trend?: string;
  trendValue?: string;
  progress?: number;
  style?: ViewStyle;
  children?: React.ReactNode;
}

export function PrimaryCard({
  title,
  subtitle,
  value,
  trend,
  trendValue,
  progress,
  style,
  children,
}: PrimaryCardProps) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.primaryContainer },
        style,
      ]}
    >
      <Text style={[styles.title, { color: colors.onPrimaryContainer }]}>
        {title}
      </Text>
      {subtitle && (
        <Text style={[styles.subtitle, { color: colors.onPrimaryContainer }]}>
          {subtitle}
        </Text>
      )}
      {value && (
        <Text style={[styles.value, { color: colors.onPrimary }]}>
          {value}
        </Text>
      )}
      {(trend || trendValue) && (
        <View style={styles.trendRow}>
          {trend && (
            <Text style={[styles.trend, { color: colors.onPrimary }]}>
              {trend}
            </Text>
          )}
          {trendValue && (
            <Text style={[styles.trendValue, { color: colors.onPrimary }]}>
              {trendValue}
            </Text>
          )}
        </View>
      )}
      {progress !== undefined && (
        <View style={[styles.progressBar, { backgroundColor: colors.primary }]}>
          <View
            style={[
              styles.progressFill,
              {
                backgroundColor: colors.onPrimary,
                width: `${Math.min(progress, 100)}%`,
              },
            ]}
          />
        </View>
      )}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
  },
  title: {
    fontFamily: "Manrope",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: "Inter",
    fontSize: 12,
    marginBottom: 8,
  },
  value: {
    fontFamily: "Manrope",
    fontSize: 36,
    fontWeight: "800",
    marginVertical: 8,
  },
  trendRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 4,
  },
  trend: {
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: "600",
  },
  trendValue: {
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: "500",
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginTop: 12,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
});
