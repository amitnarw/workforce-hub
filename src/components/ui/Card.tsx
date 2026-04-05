import React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";

interface MetricCardProps {
  title: string;
  value: string;
  icon: string;
  iconBgColor?: string;
  iconColor?: string;
  badge?: string;
  badgeType?: "info" | "warning" | "error" | "success";
  trend?: string;
  style?: ViewStyle;
}

export function MetricCard({
  title,
  value,
  icon,
  iconBgColor = "primaryContainer",
  iconColor = "onPrimaryContainer",
  badge,
  badgeType = "info",
  trend,
  style,
}: MetricCardProps) {
  const { colors } = useTheme();

  const getBgColor = () => {
    const colorMap: Record<string, string> = {
      secondaryContainer: colors.secondaryContainer,
      errorContainer: colors.errorContainer,
      tertiaryContainer: colors.tertiaryContainer,
      primaryContainer: colors.primaryContainer,
      surfaceContainerHigh: colors.surfaceContainerHigh,
    };
    return colorMap[iconBgColor] || colors.surfaceContainerLow;
  };

  const getIconColor = () => {
    const colorMap: Record<string, string> = {
      secondary: colors.secondary,
      error: colors.error,
      onTertiaryContainer: colors.onTertiaryContainer,
      onPrimaryContainer: colors.onPrimaryContainer,
      primary: colors.primary,
    };
    return colorMap[iconColor] || colors.primary;
  };

  const getBadgeBgColor = () => {
    switch (badgeType) {
      case "error":
        return colors.errorContainer;
      case "warning":
        return colors.warningContainer;
      case "success":
        return colors.successContainer;
      default:
        return colors.surfaceContainerHigh;
    }
  };

  const getBadgeTextColor = () => {
    switch (badgeType) {
      case "error":
        return colors.error;
      case "warning":
        return colors.onWarningContainer;
      case "success":
        return colors.onSuccessContainer;
      default:
        return colors.onSurfaceVariant;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.surfaceContainerLowest }, style]}>
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: getBgColor() }]}>
          <MaterialCommunityIcons
            name={icon as any}
            size={22}
            color={getIconColor()}
          />
        </View>
        <View>
          <Text style={[styles.title, { color: colors.onSurfaceVariant }]}>{title}</Text>
          <Text style={[styles.value, { color: colors.onSurface }]}>{value}</Text>
        </View>
      </View>
      {badge && (
        <View style={[styles.badge, { backgroundColor: getBadgeBgColor() }]}>
          <Text style={[styles.badgeText, { color: getBadgeTextColor() }]}>
            {badge}
          </Text>
        </View>
      )}
      {trend && (
        <View style={styles.trendRow}>
          <MaterialCommunityIcons name="trending-up" size={14} color={colors.tertiary} />
          <Text style={[styles.trendText, { color: colors.tertiary }]}>{trend}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 8,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "Inter",
    fontSize: 12,
    marginBottom: 2,
  },
  value: {
    fontFamily: "Manrope",
    fontSize: 24,
    fontWeight: "700",
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  badgeText: {
    fontFamily: "Inter",
    fontSize: 10,
    fontWeight: "600",
  },
  trendRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  trendText: {
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: "500",
  },
});
