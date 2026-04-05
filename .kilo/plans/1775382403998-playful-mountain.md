# Bottom Navigation Redesign Plan

## Problem
The current bottom navigation doesn't match the reference image. Previous attempts had issues with:
- Visibility of icons and text
- Missing rounded pill shape for active tab
- Incorrect styling and layout

## Reference Image Analysis
The target design features:
- **Floating container**: Rounded tab bar with margins from screen edges (not full-width)
- **Dark background**: Deep dark color (~#0a0a14)
- **Active tab**: Light-colored pill background (#e5e5e5) with icon + label text
- **Inactive tabs**: Icon only, no label, white outline icons
- **4 tabs**: Home (active), Attendance, Leaves, Profile
- **Rounded corners**: ~24px border-radius on the container
- **Spacing**: Margin from bottom and sides

## Implementation Plan

### Step 1: Create Custom Tab Bar Component
Create a new file `src/components/ui/CustomTabBar.tsx` that renders the floating pill-shaped tab bar.

### Step 2: Update MainTabNavigator
Modify `src/navigation/MainTabNavigator.tsx` to:
- Use `tabBar` prop to render the custom tab bar component
- Remove `tabBarStyle` overrides (custom component handles all styling)
- Keep `tabBarShowLabel: false`
- Keep current icons: home, clock-check, file-document, account-circle

### Step 3: Update Screen Bottom Padding
Modify `EmployeeDashboard.tsx` (and other screens) to:
- Increase `bottomSpacer` height to account for the floating tab bar
- Ensure content doesn't get hidden behind the tab bar

### Step 4: Color Scheme
Match the reference image colors:
- Tab bar background: `#0a0a14` (deep dark)
- Active pill background: `#e5e5e5` (light gray)
- Active icon/text color: `#0a0a14` (dark)
- Inactive icon color: `#ffffff` (white, outline style)

### Step 5: Layout Details
- Tab bar container: `marginHorizontal: 20`, `marginBottom: 8`, `borderRadius: 24`
- Tab bar height: `~56px + safe area insets + 8`
- Active pill: `borderRadius: 20`, `paddingHorizontal: 16`, `paddingVertical: 8`
- Icon size: `22px`
- Text: `fontSize: 13`, `fontWeight: 600`

## Files to Modify
1. `src/components/ui/CustomTabBar.tsx` - NEW file
2. `src/navigation/MainTabNavigator.tsx` - Main changes
3. `src/screens/employee/EmployeeDashboard.tsx` - Bottom spacer adjustment
4. `src/screens/employee/AttendanceScreen.tsx` - Bottom spacer adjustment
5. `src/screens/employee/LeavesScreen.tsx` - Bottom spacer adjustment
6. `src/screens/employee/ProfileScreen.tsx` - Bottom spacer adjustment

## Technical Approach
Use `tabBar` prop on `Tab.Navigator` to provide a completely custom tab bar component. This gives full control over the rendering and avoids fighting with react-navigation's default tab bar styling.

The custom tab bar will:
- Receive `state`, `descriptors`, and `navigation` props from react-navigation
- Iterate over `state.routes` to render each tab
- Use `navigation.navigate()` for tab switching
- Check `state.index === index` to determine active tab

## Exact Implementation

### CustomTabBar.tsx (new file)
```tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 8 }]}>
      <View style={styles.bar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          const icon = isFocused ? ICONS_FOCUSED[route.name] : ICONS[route.name];

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
              activeOpacity={0.7}
            >
              <View style={[styles.tabContent, isFocused && styles.activePill]}>
                <MaterialCommunityIcons
                  name={icon as any}
                  size={22}
                  color={isFocused ? COLORS.iconActive : COLORS.iconInactive}
                />
                {isFocused && (
                  <Text style={styles.tabLabel}>{route.name}</Text>
                )}
              </View>
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
    alignItems: "center",
  },
  bar: {
    flexDirection: "row",
    backgroundColor: COLORS.barBg,
    borderRadius: 24,
    marginHorizontal: 20,
    marginBottom: 8,
    paddingVertical: 8,
    paddingHorizontal: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  activePill: {
    backgroundColor: COLORS.pillBg,
    paddingHorizontal: 16,
  },
  tabLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.textActive,
  },
});
```

### MainTabNavigator.tsx changes
- Remove all `tabBarStyle` config
- Add `tabBar: (props) => <CustomTabBar {...props} />` to `screenOptions`
- Remove `tabBarButton` overrides from individual screens
- Remove `tabBarIcon` overrides from individual screens
- Keep `tabBarShowLabel: false` and `headerShown: false`
- Remove `useSafeAreaInsets` import (handled by CustomTabBar)
- Remove `TabItem` component entirely

### Screen changes
- EmployeeDashboard: increase `bottomSpacer` height from 100 to 120
- AttendanceScreen, LeavesScreen, ProfileScreen: add `paddingBottom: 100` to content view
