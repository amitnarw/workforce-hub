import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";

interface AppHeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightButtons?: "all" | "theme" | "notification" | "none";
  onNotificationPress?: () => void;
}

export function AppHeader({
  title,
  subtitle,
  showBackButton = false,
  onBackPress,
  rightButtons = "all",
  onNotificationPress,
}: AppHeaderProps) {
  const { colors, isDark, toggleTheme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <View style={styles.leftSection}>
        {showBackButton && (
          <TouchableOpacity
            style={[styles.backButton, { backgroundColor: colors.surfaceContainerLow }]}
            onPress={onBackPress}
          >
            <MaterialCommunityIcons
              name="chevron-left"
              size={24}
              color={colors.onSurface}
            />
          </TouchableOpacity>
        )}
        <View>
          <Text style={[styles.title, { color: colors.onSurface }]}>{title}</Text>
          {subtitle && (
            <Text style={[styles.subtitle, { color: colors.onSurfaceVariant }]}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      <View style={styles.rightSection}>
        {rightButtons === "all" || rightButtons === "theme" ? (
          <TouchableOpacity
            style={[styles.iconButton, { backgroundColor: colors.surfaceContainerLow }]}
            onPress={toggleTheme}
          >
            <MaterialCommunityIcons
              name={isDark ? "weather-sunny" : "weather-night"}
              size={20}
              color={colors.onSurface}
            />
          </TouchableOpacity>
        ) : null}
        {rightButtons === "all" || rightButtons === "notification" ? (
          <TouchableOpacity
            style={[styles.iconButton, { backgroundColor: colors.surfaceContainerLow }]}
            onPress={onNotificationPress}
          >
            <MaterialCommunityIcons
              name="bell-outline"
              size={20}
              color={colors.onSurface}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "Manrope",
    fontSize: 24,
    fontWeight: "700",
    letterSpacing: -0.02,
  },
  subtitle: {
    fontFamily: "Inter",
    fontSize: 12,
    marginTop: 2,
  },
  rightSection: {
    flexDirection: "row",
    gap: 8,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
