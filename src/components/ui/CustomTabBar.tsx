import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../../context/ThemeContext";

const TAB_CONFIG: Record<string, {
  iconActive: string;
  iconInactive: string;
  label: string;
}> = {
  Home: {
    iconActive: "home",
    iconInactive: "home-outline",
    label: "Home",
  },
  Leads: {
    iconActive: "account-multiple",
    iconInactive: "account-multiple-outline",
    label: "Leads",
  },
  Earnings: {
    iconActive: "wallet",
    iconInactive: "wallet-outline",
    label: "Earnings",
  },
  Profile: {
    iconActive: "account-circle",
    iconInactive: "account-circle-outline",
    label: "Profile",
  },
};

export default function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.surfaceContainerLowest,
          borderTopColor: colors.outlineVariant,
          paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const cfg = TAB_CONFIG[route.name] ?? {
          iconActive: "circle",
          iconInactive: "circle-outline",
          label: route.name,
        };
        const { options } = descriptors[route.key];

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            style={styles.tab}
            onPress={onPress}
            activeOpacity={0.8}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel ?? cfg.label}
          >
            <MaterialCommunityIcons
              name={(isFocused ? cfg.iconActive : cfg.iconInactive) as any}
              size={24}
              color={isFocused ? colors.primary : colors.onSurfaceVariant}
            />
            <Text
              style={[
                styles.tabLabel,
                {
                  color: isFocused ? colors.primary : colors.onSurfaceVariant,
                  fontWeight: isFocused ? "600" : "400",
                },
              ]}
            >
              {cfg.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 12,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 6,
    gap: 2,
    position: "relative",
  },
  tabLabel: {
    fontFamily: "Inter",
    fontSize: 11,
    letterSpacing: 0.1,
  },
});