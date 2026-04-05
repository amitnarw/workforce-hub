import React, { useRef, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TAB_LABELS: Record<string, string> = {
  Home: "Home",
  Attendance: "Attend",
  Leaves: "Leaves",
  Profile: "Profile",
};

const ICONS: Record<string, string> = {
  Home: "home-outline",
  Attendance: "clock-check-outline",
  Leaves: "file-document-outline",
  Profile: "account-circle-outline",
};

const ICONS_FOCUSED: Record<string, string> = {
  Home: "home",
  Attendance: "clock-check",
  Leaves: "file-document",
  Profile: "account-circle",
};

const COLORS = {
  barBg: "#0a0a14",
  pillBg: "#e5e5e5",
  iconInactive: "#ffffff",
  iconActive: "#0a0a14",
  textActive: "#0a0a14",
};

export default function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const pillLeft = useRef(new Animated.Value(0)).current;
  const pillWidth = useRef(new Animated.Value(0)).current;
  const [tabPositions, setTabPositions] = useState<Array<{ x: number; width: number }>>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (state && tabPositions.length === state.routes.length && tabPositions[state.index]) {
      const activeTab = tabPositions[state.index];
      
      Animated.parallel([
        Animated.spring(pillLeft, {
          toValue: activeTab.x,
          useNativeDriver: false,
          tension: 50,
          friction: 7,
        }),
        Animated.spring(pillWidth, {
          toValue: activeTab.width,
          useNativeDriver: false,
          tension: 50,
          friction: 7,
        }),
      ]).start();
      
      if (!isReady) setIsReady(true);
    }
  }, [state?.index, tabPositions]);

  if (!state) return null;

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 8 }]}>
      <View style={styles.bar}>
        <Animated.View
          style={[
            styles.activePill,
            {
              left: pillLeft,
              width: pillWidth,
              opacity: isReady ? 1 : 0,
            },
          ]}
        />
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          const icon = isFocused ? ICONS_FOCUSED[route.name] : ICONS[route.name];
          const label = TAB_LABELS[route.name] || route.name;

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
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={onPress}
              style={styles.tabButton}
              activeOpacity={0.8}
              onLayout={(event) => {
                const { x, width } = event.nativeEvent.layout;
                setTabPositions((prev) => {
                  const next = [...prev];
                  next[index] = { x, width };
                  return next;
                });
              }}
            >
              <MaterialCommunityIcons
                name={icon as any}
                size={22}
                color={isFocused ? COLORS.iconActive : COLORS.iconInactive}
              />
              {isFocused && (
                <Text style={styles.tabLabel}>{label}</Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "transparent",
    zIndex: 100,
  },
  bar: {
    flexDirection: "row",
    backgroundColor: COLORS.barBg,
    borderRadius: 28,
    marginHorizontal: 20,
    marginBottom: 12,
    paddingVertical: 6,
    paddingHorizontal: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  tabButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 18,
    zIndex: 1,
  },
  activePill: {
    position: "absolute",
    top: 6,
    bottom: 6,
    borderRadius: 24,
    backgroundColor: COLORS.pillBg,
    zIndex: 0,
  },
  tabLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.textActive,
  },
});
