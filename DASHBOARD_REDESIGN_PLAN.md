# Dashboard Redesign — Complete Implementation Plan

## Overview

This document describes, step by step, how to redesign the **Employee Dashboard** (`src/screens/employee/EmployeeDashboard.tsx`) and its **bottom tab bar** to match the visual design shown in the reference screenshot. The app is a **React Native** project using **Expo**, **NativeWind v4** (Tailwind for RN), `expo-linear-gradient`, `@expo/vector-icons` (MaterialCommunityIcons), and `react-native-safe-area-context`.

All colours must come exclusively from the project's existing theme system — **`ThemeContext.tsx`** (light theme object `lightColors`). No hardcoded hex values should be introduced unless they map to a named token listed below.

---

## Colour Reference (from `ThemeContext.tsx` — `lightColors`)

| Token name | Hex value | Usage in design |
|---|---|---|
| `colors.primary` | `#0037b0` | Blue header background, active tab icon bg |
| `colors.primaryContainer` | `#1d4ed8` | Gradient end for header |
| `colors.onPrimary` | `#ffffff` | Text/icons on top of primary bg |
| `colors.secondary` | `#0051d5` | Tide QR icon circle |
| `colors.secondaryContainer` | `#316bf3` | Lighter blue accent |
| `colors.surfaceContainerLowest` | `#ffffff` | White card/profile card background |
| `colors.surfaceContainerLow` | `#f2f4f6` | Page background for lower half |
| `colors.surfaceContainer` | `#eceef0` | Service icon tile backgrounds (white section) |
| `colors.surface` | `#f7f9fb` | Overall page background |
| `colors.background` | `#f7f9fb` | Same as surface |
| `colors.onSurface` | `#191c1e` | Primary body text |
| `colors.onSurfaceVariant` | `#434655` | Secondary/muted text |
| `colors.outlineVariant` | `#c4c5d7` | Dividers / separator lines |
| `colors.error` | `#ba1a1a` | Red Credit Card icon colour |
| `colors.errorContainer` | `#ffdad6` | Red Credit Card icon tile background |
| `colors.warning` | `#f59e0b` | Orange/gold Insurance icon colour |
| `colors.warningContainer` | `#fef3c7` | Gold Insurance icon tile background |
| `colors.tertiary` | `#004f35` | Dark-green / MSME icon accent |
| `colors.tertiaryContainer` | `#006948` | Lighter green, MSME tile background tint |

---

## Typography Reference

| Token | Font family | Usage |
|---|---|---|
| `fontFamily: "Manrope"` | Manrope (bold) | Screen title, user name, section headers |
| `fontFamily: "Inter"` | Inter | Body text, labels, metadata |

---

## Files to Modify / Create

| File | Action |
|---|---|
| `src/screens/employee/EmployeeDashboard.tsx` | **Full rewrite** |
| `src/components/ui/CustomTabBar.tsx` | **Modify** — change tab icons and labels |
| `src/navigation/AnimatedTabNavigator.tsx` | **Modify** — update tab names |

---

## Section 1 — Page Layout

The screen is a single `ScrollView` wrapped in `SafeAreaView`. It has the following vertical sections from top to bottom:

```
┌─────────────────────────────────┐
│  1. HEADER (blue gradient)      │
│  2. PROFILE CARD (white)        │
│  3. BANNER CAROUSEL             │
│  4. SERVICE GRID (2 rows × 4)   │
└─────────────────────────────────┘
  5. BOTTOM TAB BAR (fixed)
```

There is **no** metrics grid or "Recent Leads" list on this screen. Those sections must be removed.

---

## Section 2 — Header

### Visual description
- Full-width solid blue strip (not a gradient — solid `colors.primary`)
- Horizontally: **hamburger menu icon** on the left → **"My Work Point"** centered title → **circular profile avatar icon** on the right
- White text / icons on blue background
- The header sits behind the device status bar (`SafeAreaView` with `edges={["top"]}` handles top inset internally inside the gradient)

### Implementation

```tsx
// Inside render, at the very top (before ScrollView or as a sticky header)
<LinearGradient
  colors={[colors.primary, colors.primary]}  // solid blue, no gradient
  style={styles.header}
>
  <SafeAreaView edges={["top"]}>
    <View style={styles.headerRow}>
      {/* Left: hamburger */}
      <TouchableOpacity style={styles.headerIconBtn} onPress={onMenuPress}>
        <MaterialCommunityIcons name="menu" size={26} color={colors.onPrimary} />
      </TouchableOpacity>

      {/* Center: title */}
      <Text style={styles.headerTitle}>My Work Point</Text>

      {/* Right: avatar circle */}
      <TouchableOpacity style={styles.headerIconBtn} onPress={onProfilePress}>
        <View style={styles.avatarCircle}>
          <MaterialCommunityIcons name="account" size={22} color={colors.onPrimary} />
        </View>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
</LinearGradient>
```

### Styles

```js
header: {
  backgroundColor: colors.primary,       // solid blue
  paddingBottom: 12,
},
headerRow: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingHorizontal: 20,
  paddingTop: 10,
  paddingBottom: 4,
},
headerTitle: {
  fontFamily: "Manrope",
  fontSize: 20,
  fontWeight: "700",
  color: colors.onPrimary,              // #ffffff
  letterSpacing: 0.2,
},
headerIconBtn: {
  width: 40,
  height: 40,
  alignItems: "center",
  justifyContent: "center",
},
avatarCircle: {
  width: 38,
  height: 38,
  borderRadius: 19,
  borderWidth: 2,
  borderColor: colors.onPrimary,        // white border ring
  alignItems: "center",
  justifyContent: "center",
},
```

---

## Section 3 — Profile Card

### Visual description
- White rounded card (`borderRadius: 16`) floating slightly below the blue header with a subtle shadow
- Horizontally: **circular grey avatar placeholder** (left) → **user info block** (right)
- Avatar: 72×72 circle, background `colors.surfaceContainer` (`#eceef0`), contains a generic person silhouette icon (`MaterialCommunityIcons name="account-circle"`) in `colors.onSurfaceVariant`
- User info (stacked vertically, 4px gap between rows):
  1. **Name**: "Rahul Sharma" — Manrope Bold 18px, `colors.onSurface`
  2. **Agent ID**: "Agent ID  12345678" — Inter Regular 13px, `colors.onSurfaceVariant`
  3. **Referral Code row**: bank-icon (`storefront-outline`) + "Referral Code" label (medium 13px) + "ARN1234" value (bold 13px) + copy icon (`content-copy`) tappable
  4. **Mobile row**: phone icon (`phone-outline`) + "Mobile" label + "+91 98765 43210"
  5. **Email row**: email icon (`email-outline`) + "Email" label + "rahul.sharma@email.com"
- All row icons are in `colors.primary` (`#0037b0`), ~16px
- The copy icon next to the referral code should be slightly smaller and in `colors.onSurfaceVariant`
- Card has drop shadow: `shadowColor: "#000"`, `shadowOpacity: 0.08`, `shadowRadius: 10`, `elevation: 4`
- Card sits 16px inside horizontal margins; negative `marginTop: -16` so it overlaps the bottom edge of the header

### Implementation

```tsx
<View style={styles.profileCard}>
  {/* Avatar */}
  <View style={styles.avatarContainer}>
    <MaterialCommunityIcons
      name="account-circle"
      size={72}
      color={colors.onSurfaceVariant}
    />
  </View>

  {/* Info */}
  <View style={styles.profileInfo}>
    <Text style={styles.profileName}>Rahul Sharma</Text>
    <Text style={styles.profileAgentId}>Agent ID  12345678</Text>

    {/* Referral Code */}
    <View style={styles.infoRow}>
      <MaterialCommunityIcons name="storefront-outline" size={15} color={colors.primary} />
      <Text style={styles.infoLabel}>Referral Code</Text>
      <Text style={styles.infoValue}>ARN1234</Text>
      <TouchableOpacity onPress={onCopyReferral}>
        <MaterialCommunityIcons name="content-copy" size={14} color={colors.onSurfaceVariant} />
      </TouchableOpacity>
    </View>

    {/* Mobile */}
    <View style={styles.infoRow}>
      <MaterialCommunityIcons name="phone-outline" size={15} color={colors.primary} />
      <Text style={styles.infoLabel}>Mobile</Text>
      <Text style={styles.infoValue}>+91 98765 43210</Text>
    </View>

    {/* Email */}
    <View style={styles.infoRow}>
      <MaterialCommunityIcons name="email-outline" size={15} color={colors.primary} />
      <Text style={styles.infoLabel}>Email</Text>
      <Text style={styles.infoValue}>rahul.sharma@email.com</Text>
    </View>
  </View>
</View>
```

### Styles

```js
profileCard: {
  flexDirection: "row",
  backgroundColor: colors.surfaceContainerLowest,  // #ffffff
  borderRadius: 16,
  marginHorizontal: 16,
  marginTop: -16,             // overlaps bottom of blue header
  padding: 16,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.08,
  shadowRadius: 10,
  elevation: 4,
  gap: 14,
},
avatarContainer: {
  width: 72,
  height: 72,
  borderRadius: 36,
  backgroundColor: colors.surfaceContainerHigh,   // #e6e8ea
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
},
profileInfo: {
  flex: 1,
  gap: 5,
},
profileName: {
  fontFamily: "Manrope",
  fontSize: 18,
  fontWeight: "700",
  color: colors.onSurface,
},
profileAgentId: {
  fontFamily: "Inter",
  fontSize: 13,
  color: colors.onSurfaceVariant,
  marginBottom: 2,
},
infoRow: {
  flexDirection: "row",
  alignItems: "center",
  gap: 5,
},
infoLabel: {
  fontFamily: "Inter",
  fontSize: 13,
  fontWeight: "500",
  color: colors.onSurface,
},
infoValue: {
  fontFamily: "Inter",
  fontSize: 13,
  fontWeight: "600",
  color: colors.onSurface,
  flex: 1,
},
```

---

## Section 4 — Banner Carousel

### Visual description
- Full-width image/banner that fills horizontally (16px margins on each side)
- Rounded corners: `borderRadius: 14`
- Height: ~160px
- Contains a **dark-blue overlay** at the bottom half with:
  - **Bold white headline**: "Insurance Made Easy" (Manrope Bold 18px)
  - **White subtitle**: "Protect what matters most to you today." (Inter 13px)
- Below the banner are **3 pagination dots** centered:
  - Active dot: filled circle, `colors.primary`, 8px diameter
  - Inactive dots: `colors.outlineVariant`, 6px diameter, with 4px gap between dots
- Carousel is **auto-scrolling** every 3 seconds, and also swipeable (use `FlatList` with `pagingEnabled` or `ScrollView` with `horizontal`)
- For the initial version, 3 banner slides are acceptable as static data (see data structure below)

### Banner data

```ts
const banners = [
  {
    id: "1",
    headline: "Insurance Made Easy",
    subtitle: "Protect what matters most to you today.",
    // Use a dark blue/teal gradient as background
    colors: [colors.primary, "#0a2d6e"] as const,
    iconName: "shield-check-outline",
  },
  {
    id: "2",
    headline: "Grow Your Business",
    subtitle: "Explore MSME loans tailored for you.",
    colors: [colors.tertiaryContainer, colors.tertiary] as const,
    iconName: "briefcase-outline",
  },
  {
    id: "3",
    headline: "Credit Card Offers",
    subtitle: "Exclusive cashback on every swipe.",
    colors: [colors.error, "#7a0000"] as const,
    iconName: "credit-card-outline",
  },
];
```

### Implementation (auto-scroll with dots)

```tsx
import { FlatList, useWindowDimensions } from "react-native";
import { useRef, useState, useEffect } from "react";

const { width: SCREEN_WIDTH } = useWindowDimensions();
const BANNER_WIDTH = SCREEN_WIDTH - 32;  // 16px margin each side

const [activeBannerIndex, setActiveBannerIndex] = useState(0);
const bannerRef = useRef<FlatList>(null);

// Auto-scroll every 3s
useEffect(() => {
  const timer = setInterval(() => {
    const next = (activeBannerIndex + 1) % banners.length;
    bannerRef.current?.scrollToIndex({ index: next, animated: true });
    setActiveBannerIndex(next);
  }, 3000);
  return () => clearInterval(timer);
}, [activeBannerIndex]);

// Banner item render
const renderBanner = ({ item }: { item: typeof banners[0] }) => (
  <LinearGradient
    colors={item.colors}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={[styles.bannerSlide, { width: BANNER_WIDTH }]}
  >
    {/* Large decorative icon on the right */}
    <MaterialCommunityIcons
      name={item.iconName as any}
      size={90}
      color="rgba(255,255,255,0.15)"
      style={styles.bannerIcon}
    />
    {/* Text overlay at bottom */}
    <View style={styles.bannerTextContainer}>
      <Text style={styles.bannerHeadline}>{item.headline}</Text>
      <Text style={styles.bannerSubtitle}>{item.subtitle}</Text>
    </View>
  </LinearGradient>
);

// In JSX:
<View style={styles.bannerContainer}>
  <FlatList
    ref={bannerRef}
    data={banners}
    renderItem={renderBanner}
    keyExtractor={(b) => b.id}
    horizontal
    pagingEnabled
    showsHorizontalScrollIndicator={false}
    snapToInterval={BANNER_WIDTH + 12}
    decelerationRate="fast"
    onMomentumScrollEnd={(e) => {
      const index = Math.round(e.nativeEvent.contentOffset.x / (BANNER_WIDTH + 12));
      setActiveBannerIndex(index);
    }}
    contentContainerStyle={{ gap: 12 }}
  />
  {/* Pagination dots */}
  <View style={styles.dotsRow}>
    {banners.map((_, i) => (
      <View
        key={i}
        style={[
          styles.dot,
          i === activeBannerIndex ? styles.dotActive : styles.dotInactive,
        ]}
      />
    ))}
  </View>
</View>
```

### Styles

```js
bannerContainer: {
  marginHorizontal: 16,
  marginTop: 20,
},
bannerSlide: {
  height: 160,
  borderRadius: 14,
  overflow: "hidden",
  justifyContent: "flex-end",
  padding: 16,
},
bannerIcon: {
  position: "absolute",
  right: 16,
  top: 16,
},
bannerTextContainer: {
  gap: 4,
},
bannerHeadline: {
  fontFamily: "Manrope",
  fontSize: 18,
  fontWeight: "700",
  color: colors.onPrimary,
},
bannerSubtitle: {
  fontFamily: "Inter",
  fontSize: 13,
  color: colors.onPrimary,
  opacity: 0.85,
},
dotsRow: {
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: 6,
  marginTop: 10,
},
dot: {
  borderRadius: 4,
},
dotActive: {
  width: 20,      // wider pill for active
  height: 8,
  backgroundColor: colors.primary,
  borderRadius: 4,
},
dotInactive: {
  width: 8,
  height: 8,
  backgroundColor: colors.outlineVariant,
},
```

---

## Section 5 — Service Grid

### Visual description
- White-background rounded panel (`borderRadius: 24` top corners only, or use `borderTopLeftRadius/borderTopRightRadius`) that starts immediately below the banner dots
- Contains **2 rows of 4 icon tiles** each (8 tiles total)
- Each tile is:
  - A vertical stack: Icon circle (top) → Label text (bottom)
  - Icon circle: ~56×56, rounded (`borderRadius: 16`), filled with a muted tinted background
  - Icon inside: ~28px, coloured with the accent

### The 8 service tiles (Row 1 + Row 2 = same set repeated in the screenshot)

> Note: In the screenshot both rows show the same 4 items. This plan implements them as **8 distinct navigable options** but uses the same 4 icon styles. Adjust service list with the product owner if more unique items are needed.

```ts
const services = [
  {
    id: "tide_qr",
    label: "Tide QR",
    icon: "qrcode",                       // MaterialCommunityIcons
    iconColor: colors.onPrimary,          // white icon
    bgColor: colors.secondary,            // blue (#0051d5) circle
    route: "TideQR",
  },
  {
    id: "credit_card",
    label: "Credit Card",
    icon: "credit-card-outline",
    iconColor: colors.error,              // red (#ba1a1a)
    bgColor: colors.errorContainer,       // light red (#ffdad6)
    route: "CreditCard",
  },
  {
    id: "msme",
    label: "MSME",
    icon: "shield-half-full",
    iconColor: colors.primary,            // dark blue (#0037b0)
    bgColor: colors.primaryFixed,         // light blue (#dce1ff)
    route: "MSME",
  },
  {
    id: "insurance",
    label: "Insurance",
    icon: "archive-outline",
    iconColor: colors.warning,            // amber (#f59e0b)
    bgColor: colors.warningContainer,     // light amber (#fef3c7)
    route: "Insurance",
  },
  // Row 2 — additional unique services (or repeat if not yet defined)
  {
    id: "loans",
    label: "Loans",
    icon: "bank-outline",
    iconColor: colors.tertiary,           // dark green (#004f35)
    bgColor: colors.tertiaryFixed,        // light green (#85f8c4)
    route: "Loans",
  },
  {
    id: "savings",
    label: "Savings",
    icon: "piggy-bank-outline",
    iconColor: colors.secondaryContainer, // blue
    bgColor: colors.secondaryFixed,       // light blue (#dbe1ff)
    route: "Savings",
  },
  {
    id: "mutual_funds",
    label: "Mutual Funds",
    icon: "trending-up",
    iconColor: colors.tertiaryContainer,
    bgColor: colors.onTertiaryContainer,
    route: "MutualFunds",
  },
  {
    id: "more",
    label: "More",
    icon: "dots-horizontal-circle-outline",
    iconColor: colors.onSurfaceVariant,
    bgColor: colors.surfaceContainerHigh,
    route: "More",
  },
];
```

### Implementation

```tsx
// Split into rows
const ROW_ONE = services.slice(0, 4);
const ROW_TWO = services.slice(4, 8);

<View style={styles.servicesPanel}>
  {[ROW_ONE, ROW_TWO].map((row, rowIndex) => (
    <View key={rowIndex} style={styles.servicesRow}>
      {row.map((service) => (
        <TouchableOpacity
          key={service.id}
          style={styles.serviceTile}
          onPress={() => navigation.navigate(service.route as any)}
          activeOpacity={0.7}
        >
          {/* Icon circle */}
          <View style={[styles.serviceIconCircle, { backgroundColor: service.bgColor }]}>
            <MaterialCommunityIcons
              name={service.icon as any}
              size={28}
              color={service.iconColor}
            />
          </View>
          {/* Label */}
          <Text style={styles.serviceLabel}>{service.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  ))}
</View>
```

### Styles

```js
servicesPanel: {
  backgroundColor: colors.surfaceContainerLowest,  // #ffffff
  borderTopLeftRadius: 24,
  borderTopRightRadius: 24,
  marginTop: 20,
  paddingHorizontal: 16,
  paddingTop: 20,
  paddingBottom: 120,   // leave room above tab bar
},
servicesRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 24,
},
serviceTile: {
  flex: 1,
  alignItems: "center",
  gap: 8,
},
serviceIconCircle: {
  width: 58,
  height: 58,
  borderRadius: 16,
  alignItems: "center",
  justifyContent: "center",
},
serviceLabel: {
  fontFamily: "Inter",
  fontSize: 12,
  fontWeight: "500",
  color: colors.onSurface,
  textAlign: "center",
},
```

---

## Section 6 — Bottom Tab Bar

### Visual description (from screenshot)
- 4 tabs: **Dashboard**, **Leads**, **Earnings**, **Profile**
- Active tab "Dashboard": icon in `colors.primary` blue, label in `colors.primary` blue, underline indicator bar
- Inactive tabs: icon + label in `colors.onSurfaceVariant` grey
- White background bar, no floating pill, no border radius — it's a standard flat tab bar spanning the full width
- A short **dark grey indicator bar** sits below the active tab label (like a bottom border accent, ~3px tall, 40% width of the tab, rounded, primary colour)
- The tab bar has a faint top border: 1px `colors.outlineVariant`

### Tab icons

| Tab | Inactive icon | Active icon |
|---|---|---|
| Dashboard | `view-dashboard-outline` | `view-dashboard` |
| Leads | `account-multiple-outline` | `account-multiple` |
| Earnings | `wallet-outline` | `wallet` |
| Profile | `account-circle-outline` | `account-circle` |

### Implementation — modify `CustomTabBar.tsx`

Replace the entire existing `CustomTabBar.tsx` with the following:

```tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../../context/ThemeContext";

const TAB_CONFIG: Record<string, { inactive: string; active: string; label: string }> = {
  Home: {
    inactive: "view-dashboard-outline",
    active: "view-dashboard",
    label: "Dashboard",
  },
  Leads: {
    inactive: "account-multiple-outline",
    active: "account-multiple",
    label: "Leads",
  },
  Earnings: {
    inactive: "wallet-outline",
    active: "wallet",
    label: "Earnings",
  },
  Profile: {
    inactive: "account-circle-outline",
    active: "account-circle",
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
          paddingBottom: insets.bottom || 8,
          backgroundColor: colors.surfaceContainerLowest,
          borderTopColor: colors.outlineVariant,
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const cfg = TAB_CONFIG[route.name] ?? {
          inactive: "circle-outline",
          active: "circle",
          label: route.name,
        };
        const icon = isFocused ? cfg.active : cfg.inactive;

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
            activeOpacity={0.75}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
          >
            <MaterialCommunityIcons
              name={icon as any}
              size={24}
              color={isFocused ? colors.primary : colors.onSurfaceVariant}
            />
            <Text
              style={[
                styles.label,
                {
                  color: isFocused ? colors.primary : colors.onSurfaceVariant,
                  fontWeight: isFocused ? "600" : "400",
                },
              ]}
            >
              {cfg.label}
            </Text>
            {/* Active indicator bar */}
            {isFocused && (
              <View style={[styles.indicator, { backgroundColor: colors.primary }]} />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderTopWidth: 1,
    paddingTop: 8,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
    paddingBottom: 4,
    position: "relative",
  },
  label: {
    fontFamily: "Inter",
    fontSize: 11,
  },
  indicator: {
    position: "absolute",
    bottom: 0,
    width: "40%",
    height: 3,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
});
```

---

## Section 7 — Navigation changes (`AnimatedTabNavigator.tsx`)

Update the `SCREEN_NAMES` array to match what the tab bar now expects:

```tsx
// No change needed to SCREEN_NAMES since it already uses:
const SCREEN_NAMES = ["Home", "Leads", "Earnings", "Profile"];
// TAB_CONFIG in CustomTabBar maps "Home" → "Dashboard" label
```

The `AnimatedTabNavigator` does not need structural changes.

---

## Section 8 — Complete `EmployeeDashboard.tsx` Rewrite

Below is the **complete file** the AI agent should write to `src/screens/employee/EmployeeDashboard.tsx`. Replace the entire existing file.

```tsx
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Clipboard,
  useWindowDimensions,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../context/ThemeContext";

// ── USER DATA (replace with real auth context / API call) ────────────────────
const USER = {
  name: "Rahul Sharma",
  agentId: "12345678",
  referralCode: "ARN1234",
  mobile: "+91 98765 43210",
  email: "rahul.sharma@email.com",
};

// ── BANNER DATA ──────────────────────────────────────────────────────────────
// colours are supplied at render time from theme to avoid stale closure issues

// ── SERVICE GRID DATA ────────────────────────────────────────────────────────
interface ServiceItem {
  id: string;
  label: string;
  icon: string;
  iconColorKey: keyof ReturnType<typeof useColorMap>;
  bgColorKey: keyof ReturnType<typeof useColorMap>;
  route: string;
}

// Helper hook — maps colour key strings to actual hex values from theme
function useColorMap() {
  const { colors } = useTheme();
  return {
    secondary: colors.secondary,
    onPrimary: colors.onPrimary,
    error: colors.error,
    errorContainer: colors.errorContainer,
    primary: colors.primary,
    primaryFixed: colors.primaryFixed,
    warning: colors.warning,
    warningContainer: colors.warningContainer,
    tertiary: colors.tertiary,
    tertiaryFixed: colors.tertiaryFixed,
    secondaryContainer: colors.secondaryContainer,
    secondaryFixed: colors.secondaryFixed,
    tertiaryContainer: colors.tertiaryContainer,
    onTertiaryContainer: colors.onTertiaryContainer,
    onSurfaceVariant: colors.onSurfaceVariant,
    surfaceContainerHigh: colors.surfaceContainerHigh,
  };
}

const SERVICES: ServiceItem[] = [
  { id: "tide_qr",      label: "Tide QR",      icon: "qrcode",                       iconColorKey: "onPrimary",          bgColorKey: "secondary",            route: "TideQR" },
  { id: "credit_card",  label: "Credit Card",  icon: "credit-card-outline",          iconColorKey: "error",              bgColorKey: "errorContainer",        route: "CreditCard" },
  { id: "msme",         label: "MSME",         icon: "shield-half-full",             iconColorKey: "primary",            bgColorKey: "primaryFixed",          route: "MSME" },
  { id: "insurance",    label: "Insurance",    icon: "archive-outline",              iconColorKey: "warning",            bgColorKey: "warningContainer",      route: "Insurance" },
  { id: "loans",        label: "Loans",        icon: "bank-outline",                 iconColorKey: "tertiary",           bgColorKey: "tertiaryFixed",         route: "Loans" },
  { id: "savings",      label: "Savings",      icon: "piggy-bank-outline",           iconColorKey: "secondaryContainer", bgColorKey: "secondaryFixed",        route: "Savings" },
  { id: "mutual_funds", label: "Mutual Funds", icon: "trending-up",                  iconColorKey: "tertiaryContainer",  bgColorKey: "onTertiaryContainer",   route: "MutualFunds" },
  { id: "more",         label: "More",         icon: "dots-horizontal-circle-outline",iconColorKey: "onSurfaceVariant",  bgColorKey: "surfaceContainerHigh",  route: "More" },
];

// ── COMPONENT ────────────────────────────────────────────────────────────────
export default function EmployeeDashboard() {
  const { colors } = useTheme();
  const colorMap = useColorMap();
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const BANNER_WIDTH = SCREEN_WIDTH - 32;

  const [activeBanner, setActiveBanner] = useState(0);
  const bannerRef = useRef<FlatList>(null);

  // Banner slide data (using colors at render time)
  const banners = [
    {
      id: "1",
      headline: "Insurance Made Easy",
      subtitle: "Protect what matters most to you today.",
      gradientColors: [colors.primary, "#0a2d6e"] as [string, string],
      icon: "shield-check-outline",
    },
    {
      id: "2",
      headline: "Grow Your Business",
      subtitle: "Explore MSME loans tailored for you.",
      gradientColors: [colors.tertiaryContainer, colors.tertiary] as [string, string],
      icon: "briefcase-outline",
    },
    {
      id: "3",
      headline: "Credit Card Offers",
      subtitle: "Exclusive cashback on every swipe.",
      gradientColors: [colors.error, "#7a0000"] as [string, string],
      icon: "credit-card-outline",
    },
  ];

  // Auto scroll banner
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveBanner((prev) => {
        const next = (prev + 1) % banners.length;
        bannerRef.current?.scrollToIndex({ index: next, animated: true });
        return next;
      });
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyReferral = () => {
    Clipboard.setString(USER.referralCode);
    Alert.alert("Copied!", `Referral code "${USER.referralCode}" copied to clipboard.`);
  };

  const ROW_ONE = SERVICES.slice(0, 4);
  const ROW_TWO = SERVICES.slice(4, 8);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]} edges={["top"]}>
      <View style={[styles.root, { backgroundColor: colors.background }]}>

        {/* ── HEADER ── */}
        <LinearGradient
          colors={[colors.primary, colors.primary]}
          style={styles.header}
        >
          <View style={styles.headerRow}>
            <TouchableOpacity style={styles.headerIconBtn}>
              <MaterialCommunityIcons name="menu" size={26} color={colors.onPrimary} />
            </TouchableOpacity>

            <Text style={[styles.headerTitle, { color: colors.onPrimary }]}>
              My Work Point
            </Text>

            <TouchableOpacity style={styles.headerIconBtn}>
              <View style={[styles.avatarCircle, { borderColor: colors.onPrimary }]}>
                <MaterialCommunityIcons name="account" size={22} color={colors.onPrimary} />
              </View>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* ── SCROLLABLE BODY ── */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >

          {/* ── PROFILE CARD ── */}
          <View style={[styles.profileCard, { backgroundColor: colors.surfaceContainerLowest }]}>
            {/* Avatar */}
            <View style={[styles.avatarContainer, { backgroundColor: colors.surfaceContainerHigh }]}>
              <MaterialCommunityIcons name="account-circle" size={72} color={colors.onSurfaceVariant} />
            </View>

            {/* Info */}
            <View style={styles.profileInfo}>
              <Text style={[styles.profileName, { color: colors.onSurface }]}>
                {USER.name}
              </Text>
              <Text style={[styles.agentId, { color: colors.onSurfaceVariant }]}>
                Agent ID  {USER.agentId}
              </Text>

              {/* Referral */}
              <View style={styles.infoRow}>
                <MaterialCommunityIcons name="storefront-outline" size={15} color={colors.primary} />
                <Text style={[styles.infoLabel, { color: colors.onSurface }]}>Referral Code</Text>
                <Text style={[styles.infoValue, { color: colors.onSurface }]}>{USER.referralCode}</Text>
                <TouchableOpacity onPress={handleCopyReferral} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                  <MaterialCommunityIcons name="content-copy" size={14} color={colors.onSurfaceVariant} />
                </TouchableOpacity>
              </View>

              {/* Mobile */}
              <View style={styles.infoRow}>
                <MaterialCommunityIcons name="phone-outline" size={15} color={colors.primary} />
                <Text style={[styles.infoLabel, { color: colors.onSurface }]}>Mobile</Text>
                <Text style={[styles.infoValue, { color: colors.onSurface }]}>{USER.mobile}</Text>
              </View>

              {/* Email */}
              <View style={styles.infoRow}>
                <MaterialCommunityIcons name="email-outline" size={15} color={colors.primary} />
                <Text style={[styles.infoLabel, { color: colors.onSurface }]}>Email</Text>
                <Text style={[styles.infoValue, { color: colors.onSurface }]} numberOfLines={1}>
                  {USER.email}
                </Text>
              </View>
            </View>
          </View>

          {/* ── BANNER CAROUSEL ── */}
          <View style={styles.bannerContainer}>
            <FlatList
              ref={bannerRef}
              data={banners}
              keyExtractor={(b) => b.id}
              horizontal
              pagingEnabled={false}
              showsHorizontalScrollIndicator={false}
              snapToInterval={BANNER_WIDTH + 12}
              decelerationRate="fast"
              contentContainerStyle={{ gap: 12 }}
              onMomentumScrollEnd={(e) => {
                const i = Math.round(e.nativeEvent.contentOffset.x / (BANNER_WIDTH + 12));
                setActiveBanner(i);
              }}
              renderItem={({ item }) => (
                <LinearGradient
                  colors={item.gradientColors}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={[styles.bannerSlide, { width: BANNER_WIDTH }]}
                >
                  <MaterialCommunityIcons
                    name={item.icon as any}
                    size={90}
                    color="rgba(255,255,255,0.15)"
                    style={styles.bannerIconDecor}
                  />
                  <View style={styles.bannerText}>
                    <Text style={[styles.bannerHeadline, { color: colors.onPrimary }]}>
                      {item.headline}
                    </Text>
                    <Text style={[styles.bannerSubtitle, { color: colors.onPrimary }]}>
                      {item.subtitle}
                    </Text>
                  </View>
                </LinearGradient>
              )}
            />
            {/* Dots */}
            <View style={styles.dotsRow}>
              {banners.map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.dot,
                    i === activeBanner
                      ? [styles.dotActive, { backgroundColor: colors.primary }]
                      : [styles.dotInactive, { backgroundColor: colors.outlineVariant }],
                  ]}
                />
              ))}
            </View>
          </View>

          {/* ── SERVICES PANEL ── */}
          <View style={[styles.servicesPanel, { backgroundColor: colors.surfaceContainerLowest }]}>
            {[ROW_ONE, ROW_TWO].map((row, rowIdx) => (
              <View key={rowIdx} style={styles.servicesRow}>
                {row.map((svc) => (
                  <TouchableOpacity
                    key={svc.id}
                    style={styles.serviceTile}
                    activeOpacity={0.7}
                    onPress={() => Alert.alert(svc.label, `Navigate to ${svc.route}`)}
                  >
                    <View
                      style={[
                        styles.serviceIconCircle,
                        { backgroundColor: colorMap[svc.bgColorKey] as string },
                      ]}
                    >
                      <MaterialCommunityIcons
                        name={svc.icon as any}
                        size={28}
                        color={colorMap[svc.iconColorKey] as string}
                      />
                    </View>
                    <Text style={[styles.serviceLabel, { color: colors.onSurface }]}>
                      {svc.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>

        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

// ── STYLES ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  root: { flex: 1 },
  scrollView: { flex: 1 },
  scrollContent: { paddingBottom: 16 },

  // Header
  header: { paddingBottom: 14 },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 4,
  },
  headerTitle: {
    fontFamily: "Manrope",
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  headerIconBtn: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },

  // Profile Card
  profileCard: {
    flexDirection: "row",
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: -14,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
    gap: 12,
    alignItems: "flex-start",
  },
  avatarContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  profileInfo: { flex: 1, gap: 4 },
  profileName: {
    fontFamily: "Manrope",
    fontSize: 18,
    fontWeight: "700",
  },
  agentId: {
    fontFamily: "Inter",
    fontSize: 13,
    marginBottom: 2,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    flexWrap: "nowrap",
  },
  infoLabel: {
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: "500",
  },
  infoValue: {
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: "600",
    flexShrink: 1,
  },

  // Banner
  bannerContainer: { marginHorizontal: 16, marginTop: 20 },
  bannerSlide: {
    height: 160,
    borderRadius: 14,
    overflow: "hidden",
    justifyContent: "flex-end",
    padding: 16,
  },
  bannerIconDecor: { position: "absolute", right: 16, top: 16 },
  bannerText: { gap: 4 },
  bannerHeadline: {
    fontFamily: "Manrope",
    fontSize: 18,
    fontWeight: "700",
  },
  bannerSubtitle: {
    fontFamily: "Inter",
    fontSize: 13,
    opacity: 0.85,
  },
  dotsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    marginTop: 10,
  },
  dot: { borderRadius: 4 },
  dotActive: { width: 20, height: 8, borderRadius: 4 },
  dotInactive: { width: 8, height: 8 },

  // Services Panel
  servicesPanel: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: 20,
    paddingHorizontal: 12,
    paddingTop: 20,
    paddingBottom: 120,
  },
  servicesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  serviceTile: {
    flex: 1,
    alignItems: "center",
    gap: 8,
  },
  serviceIconCircle: {
    width: 58,
    height: 58,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  serviceLabel: {
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
  },
});
```

---

## Section 9 — State / Data Wiring Notes

- `USER` object should come from your authentication/profile store (Redux/Context). For now it's a static constant at the top of the file; replace it with `useSelector` or a custom hook when the backend is ready.
- `SERVICES` routing (`route` field) will need to be hooked up to your actual navigator. If those screens don't exist yet, the `Alert.alert` placeholder is acceptable.
- `Clipboard` import: On newer React Native versions use `@react-native-clipboard/clipboard` instead of `Clipboard` from `react-native`. If the project already has that package installed, change the import line:

  ```tsx
  // Old (deprecated):
  import { Clipboard } from "react-native";

  // New (preferred):
  import Clipboard from "@react-native-clipboard/clipboard";
  ```

---

## Section 10 — Dependencies Checklist

All packages below should already be installed in this project. Verify in `package.json`:

| Package | Used for |
|---|---|
| `expo-linear-gradient` | Banner gradient, header |
| `@expo/vector-icons` | All icons (MaterialCommunityIcons) |
| `react-native-safe-area-context` | SafeAreaView, insets |
| `react-native` built-in `FlatList` | Banner carousel |
| `react-native` built-in `Clipboard` | Copy referral code (or use `@react-native-clipboard/clipboard`) |

---

## Summary of Changes

| Screen / File | What changes |
|---|---|
| `EmployeeDashboard.tsx` | Full rewrite — removes metrics + leads list, adds profile card, banner carousel, service grid |
| `CustomTabBar.tsx` | New flat tab bar replacing pill design; updates icons and labels to match screenshot |
| `AnimatedTabNavigator.tsx` | No structural changes needed |

The result matches the reference screenshot with: blue header + "My Work Point" title, white profile card with user details and referral copy, auto-scrolling banner with pagination dots, and a 2×4 service icon grid above the bottom tab bar (Dashboard / Leads / Earnings / Profile).
