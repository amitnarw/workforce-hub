# Dashboard Redesign — Implementation Plan V2 (Pixel-Perfect)

## Why the Previous Plan Failed — Diff Analysis

The previous plan produced a result that differed from the reference screenshot in these specific ways:

| # | Problem | Root cause in old plan |
|---|---|---|
| 1 | Avatar was a large **dark filled** silhouette | Used `MaterialCommunityIcons name="account-circle" size={72}` — this icon is a solid dark shape that fills the entire circle |
| 2 | White gap visible between blue header and profile card | `marginTop: -16` on the card was not enough; the ScrollView itself had a white background |
| 3 | `LinearGradient` used for solid-blue header | Caused subtle rendering artifact; a plain `View` is correct |
| 4 | Service rows showed 8 different services | Reference screenshot shows **the same 4 services repeated in both rows** |
| 5 | Services panel `paddingBottom: 120` caused large empty gap | Should be smaller since tab bar handles its own inset |
| 6 | Profile card info row text overflow | `infoValue` had `flex: 1` which stretches it but on small phones it overflows |
| 7 | Active tab indicator position unreliable | Using `position: "absolute"` bottom inside a flex column item is unreliable |
| 8 | `Clipboard` import is deprecated in React Native | Should use `@react-native-clipboard/clipboard` or graceful fallback |

---

## Project Tech Stack (Do Not Change These)

- **React Native** with **Expo**
- `expo-linear-gradient` — for banner cards only
- `@expo/vector-icons` → `MaterialCommunityIcons`
- `react-native-safe-area-context` → `SafeAreaView`, `useSafeAreaInsets`
- **ThemeContext** at `src/context/ThemeContext.tsx` → `useTheme()` → `colors` object

---

## Colour Tokens — Exact Hex Values

Use `colors.<tokenName>` from `useTheme()`. The exact hex values are listed for reference only.

| Token | Hex | Description |
|---|---|---|
| `colors.primary` | `#0037b0` | Blue — header background, active tab text/icon, Tide QR icon circle bg |
| `colors.primaryFixed` | `#dce1ff` | Very light blue — MSME icon tile background |
| `colors.onPrimary` | `#ffffff` | White — all text/icons on blue backgrounds |
| `colors.secondary` | `#0051d5` | Mid blue — Tide QR icon foreground colour (icon ON the blue circle) |
| `colors.secondaryFixed` | `#dbe1ff` | Light blue — Savings tile background |
| `colors.secondaryContainer` | `#316bf3` | Blue — Savings icon colour |
| `colors.error` | `#ba1a1a` | Red — Credit Card icon colour |
| `colors.errorContainer` | `#ffdad6` | Light red/pink — Credit Card tile background |
| `colors.warning` | `#f59e0b` | Amber/gold — Insurance icon colour |
| `colors.warningContainer` | `#fef3c7` | Light yellow — Insurance tile background |
| `colors.tertiary` | `#004f35` | Dark green — Loans icon colour |
| `colors.tertiaryFixed` | `#85f8c4` | Light mint green — Loans tile background |
| `colors.tertiaryContainer` | `#006948` | Medium green — Mutual Funds icon colour |
| `colors.onTertiaryContainer` | `#76eab6` | Light green — Mutual Funds tile background |
| `colors.surface` | `#f7f9fb` | Very light grey — page/scroll background |
| `colors.background` | `#f7f9fb` | Same as surface |
| `colors.surfaceContainerLowest` | `#ffffff` | Pure white — profile card bg, services panel bg, tab bar bg |
| `colors.surfaceContainerHigh` | `#e6e8ea` | Light grey — avatar circle background |
| `colors.surfaceContainerHighest` | `#e0e3e5` | Light grey — More tile background |
| `colors.onSurface` | `#191c1e` | Near-black — primary body text |
| `colors.onSurfaceVariant` | `#434655` | Dark grey — secondary text, avatar icon colour, inactive tabs |
| `colors.outlineVariant` | `#c4c5d7` | Light grey — tab bar top border, inactive dots |

---

## Files to Change

| File | What to do |
|---|---|
| `src/screens/employee/EmployeeDashboard.tsx` | **Full rewrite** — paste the complete code from Section 9 below |
| `src/components/ui/CustomTabBar.tsx` | **Full rewrite** — paste the complete code from Section 10 below |
| `src/navigation/AnimatedTabNavigator.tsx` | **No changes needed** |

---

## Section 1 — Full Page Layout

```
SCREEN (SafeAreaView, bg = colors.background = #f7f9fb)
│
├── [FIXED TOP] Plain View Header (bg = colors.primary = #0037b0)
│     height: auto, paddingTop handled by SafeAreaView edges=["top"]
│
└── [SCROLLABLE] ScrollView (bg = colors.background = #f7f9fb)
      │
      ├── Profile Card (white, shadow, marginTop: 16, marginHorizontal: 16)
      │
      ├── Banner Carousel (marginTop: 20, marginHorizontal: 16)
      │
      ├── Pagination Dots (marginTop: 10, centered)
      │
      └── Services Panel (white, borderTopRadius: 24, marginTop: 20,
                          paddingBottom: 24)  ← tabs add their own spacing

[FIXED BOTTOM] CustomTabBar (white, borderTopWidth: 1)
```

**Critical rule**: The `ScrollView` background is `colors.background` (`#f7f9fb` — light grey). Only the profile card and services panel are white. This creates the visual layering seen in the reference where grey shows between sections.

---

## Section 2 — Header (Plain View, NOT LinearGradient)

### What it looks like
- Solid blue rectangle spanning full screen width
- Left: three-bar hamburger icon (white, 26px)
- Center: "My Work Point" text (white, bold, Manrope 20px)
- Right: circular outlined avatar (white outline ring, white account icon inside)
- Blue covers the phone status bar area too (SafeAreaView with `edges={["top"]}` wraps the content inside the blue, so the inset area is also blue)

### CRITICAL: Do NOT use LinearGradient here
Use a plain `View` with `backgroundColor: colors.primary`. LinearGradient is only for the banner cards.

### Code

```tsx
<View style={[styles.header, { backgroundColor: colors.primary }]}>
  <SafeAreaView edges={["top"]}>
    <View style={styles.headerRow}>

      {/* Left — hamburger */}
      <TouchableOpacity style={styles.headerIconBtn}>
        <MaterialCommunityIcons name="menu" size={26} color={colors.onPrimary} />
      </TouchableOpacity>

      {/* Center — title */}
      <Text style={[styles.headerTitle, { color: colors.onPrimary }]}>
        My Work Point
      </Text>

      {/* Right — avatar ring */}
      <TouchableOpacity style={styles.headerIconBtn}>
        <View style={[styles.headerAvatarRing, { borderColor: colors.onPrimary }]}>
          <MaterialCommunityIcons name="account" size={20} color={colors.onPrimary} />
        </View>
      </TouchableOpacity>

    </View>
  </SafeAreaView>
</View>
```

### Styles

```js
header: {
  // backgroundColor set inline from colors.primary
},
headerRow: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingHorizontal: 16,
  paddingTop: 8,
  paddingBottom: 12,
},
headerTitle: {
  fontFamily: "Manrope",
  fontSize: 20,
  fontWeight: "700",
  letterSpacing: 0.3,
},
headerIconBtn: {
  width: 40,
  height: 40,
  alignItems: "center",
  justifyContent: "center",
},
headerAvatarRing: {
  width: 36,
  height: 36,
  borderRadius: 18,
  borderWidth: 2,
  alignItems: "center",
  justifyContent: "center",
},
```

---

## Section 3 — Profile Card

### What it looks like
- White card (`#ffffff`) with rounded corners (borderRadius: 16) and a drop shadow
- Placed 16px below the header (NOT overlapping — positive `marginTop: 16`)
- Left side: circular grey avatar placeholder (72×72)
- Right side: user info stacked vertically

### Avatar — CRITICAL IMPLEMENTATION DETAIL

The avatar is **NOT** `MaterialCommunityIcons name="account-circle"` — that icon renders as a completely dark filled circle silhouette which looks wrong.

The correct way is:
1. A `View` (72×72, borderRadius: 36) with `backgroundColor: colors.surfaceContainerHigh` (`#e6e8ea` — light grey)
2. Inside it, a `MaterialCommunityIcons name="account"` at size **40** with `color: colors.onSurfaceVariant` (`#434655` — dark grey)

This creates the correct look: a **light grey circle** with a **smaller dark grey person silhouette** centered inside it.

```tsx
{/* ✅ CORRECT avatar implementation */}
<View style={[styles.profileAvatar, { backgroundColor: colors.surfaceContainerHigh }]}>
  <MaterialCommunityIcons name="account" size={40} color={colors.onSurfaceVariant} />
</View>

{/* ❌ WRONG — do NOT do this */}
{/* <MaterialCommunityIcons name="account-circle" size={72} color={colors.onSurfaceVariant} /> */}
```

### Info rows

Each row has: **icon (16px, primary blue)** → **label text (medium weight)** → **value text (regular)**

For the Referral Code row, after the value there is also a **copy icon** (14px, `colors.onSurfaceVariant`).

The label and value text are on the SAME row, separated by a small gap. Use `flexDirection: "row"` and `alignItems: "center"`.

### Icons for each info row

| Row | Icon name | Icon colour |
|---|---|---|
| Referral Code | `card-account-details-outline` | `colors.primary` |
| Mobile | `phone-outline` | `colors.primary` |
| Email | `email-outline` | `colors.primary` |

### Code

```tsx
<View style={[styles.profileCard, { backgroundColor: colors.surfaceContainerLowest }]}>

  {/* Avatar */}
  <View style={[styles.profileAvatar, { backgroundColor: colors.surfaceContainerHigh }]}>
    <MaterialCommunityIcons name="account" size={40} color={colors.onSurfaceVariant} />
  </View>

  {/* Info block */}
  <View style={styles.profileInfo}>

    <Text style={[styles.profileName, { color: colors.onSurface }]}>
      Rahul Sharma
    </Text>
    <Text style={[styles.profileAgentId, { color: colors.onSurfaceVariant }]}>
      Agent ID  12345678
    </Text>

    {/* Referral Code */}
    <View style={styles.infoRow}>
      <MaterialCommunityIcons name="card-account-details-outline" size={15} color={colors.primary} />
      <Text style={[styles.infoLabel, { color: colors.onSurface }]}>Referral Code</Text>
      <Text style={[styles.infoValue, { color: colors.onSurface }]} numberOfLines={1}>
        ARN1234
      </Text>
      <TouchableOpacity
        onPress={() => Alert.alert("Copied", "Referral code copied!")}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <MaterialCommunityIcons name="content-copy" size={14} color={colors.onSurfaceVariant} />
      </TouchableOpacity>
    </View>

    {/* Mobile */}
    <View style={styles.infoRow}>
      <MaterialCommunityIcons name="phone-outline" size={15} color={colors.primary} />
      <Text style={[styles.infoLabel, { color: colors.onSurface }]}>Mobile</Text>
      <Text style={[styles.infoValue, { color: colors.onSurface }]} numberOfLines={1}>
        +91 98765 43210
      </Text>
    </View>

    {/* Email */}
    <View style={styles.infoRow}>
      <MaterialCommunityIcons name="email-outline" size={15} color={colors.primary} />
      <Text style={[styles.infoLabel, { color: colors.onSurface }]}>Email</Text>
      <Text style={[styles.infoValue, { color: colors.onSurface }]} numberOfLines={1}>
        rahul.sharma@email.com
      </Text>
    </View>

  </View>
</View>
```

### Styles

```js
profileCard: {
  flexDirection: "row",
  alignItems: "flex-start",
  borderRadius: 16,
  marginHorizontal: 16,
  marginTop: 16,        // 16px gap BELOW the header — NOT negative, NOT overlapping
  padding: 16,
  gap: 14,
  // Shadow (iOS)
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.10,
  shadowRadius: 8,
  // Shadow (Android)
  elevation: 4,
},
profileAvatar: {
  width: 72,
  height: 72,
  borderRadius: 36,
  alignItems: "center",
  justifyContent: "center",
  // DO NOT set overflow: "hidden" — it clips the icon incorrectly on some devices
},
profileInfo: {
  flex: 1,
  gap: 4,
},
profileName: {
  fontFamily: "Manrope",
  fontSize: 18,
  fontWeight: "700",
  lineHeight: 24,
},
profileAgentId: {
  fontFamily: "Inter",
  fontSize: 13,
  marginBottom: 4,
},
infoRow: {
  flexDirection: "row",
  alignItems: "center",
  gap: 4,
  minHeight: 20,
},
infoLabel: {
  fontFamily: "Inter",
  fontSize: 12,
  fontWeight: "500",
},
infoValue: {
  fontFamily: "Inter",
  fontSize: 12,
  fontWeight: "400",
  flex: 1,              // takes remaining space, clips with numberOfLines={1}
},
```

---

## Section 4 — Banner Carousel

### What it looks like
- 3 swipeable banner slides
- Each slide: dark-to-darker linear gradient, tall rounded rectangle (height 160px)
- A large semi-transparent icon floats in the top-right of the banner (decorative, ~90px, opacity ~15%)
- Bold white headline bottom-left, white subtitle below headline
- Below the FlatList: 3 pagination dots centered horizontally
  - Active dot: wider pill shape (20×8px), `colors.primary` blue
  - Inactive dots: circle (8×8px), `colors.outlineVariant` grey
- The first banner slide shows a dark blue gradient with a shield-check icon and "Insurance Made Easy" headline

### Banner slides data

```ts
// Define INSIDE the component, after `const { colors } = useTheme();` so colors is in scope
const BANNERS = [
  {
    id: "1",
    headline: "Insurance Made Easy",
    subtitle: "Protect what matters most to you today.",
    gradientStart: colors.primary,        // #0037b0
    gradientEnd: "#001a5e",               // very dark navy
    iconName: "shield-check-outline",
  },
  {
    id: "2",
    headline: "Grow Your Business",
    subtitle: "MSME loans tailored for you.",
    gradientStart: colors.tertiaryContainer,  // #006948
    gradientEnd: colors.tertiary,             // #004f35
    iconName: "briefcase-outline",
  },
  {
    id: "3",
    headline: "Credit Card Offers",
    subtitle: "Exclusive cashback on every swipe.",
    gradientStart: colors.error,   // #ba1a1a
    gradientEnd: "#6a0000",
    iconName: "credit-card-outline",
  },
] as const;
```

### State and refs needed

```ts
const [activeBanner, setActiveBanner] = useState(0);
const bannerListRef = useRef<FlatList>(null);
const bannerTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
const screenWidth = Dimensions.get("window").width;
const BANNER_ITEM_WIDTH = screenWidth - 32; // 16px margin each side
const BANNER_SNAP_INTERVAL = BANNER_ITEM_WIDTH + 12; // 12px gap between slides
```

### Auto-scroll logic

```ts
useEffect(() => {
  bannerTimerRef.current = setInterval(() => {
    setActiveBanner((prev) => {
      const next = (prev + 1) % BANNERS.length;
      try {
        bannerListRef.current?.scrollToIndex({ index: next, animated: true });
      } catch (_) {}
      return next;
    });
  }, 3000);
  return () => {
    if (bannerTimerRef.current) clearInterval(bannerTimerRef.current);
  };
}, []);
```

### JSX

```tsx
{/* Banner container */}
<View style={styles.bannerContainer}>
  <FlatList
    ref={bannerListRef}
    data={BANNERS}
    keyExtractor={(b) => b.id}
    horizontal
    showsHorizontalScrollIndicator={false}
    pagingEnabled={false}
    snapToInterval={BANNER_SNAP_INTERVAL}
    snapToAlignment="start"
    decelerationRate="fast"
    contentContainerStyle={{ gap: 12 }}
    onMomentumScrollEnd={(e) => {
      const newIndex = Math.round(
        e.nativeEvent.contentOffset.x / BANNER_SNAP_INTERVAL
      );
      setActiveBanner(Math.max(0, Math.min(newIndex, BANNERS.length - 1)));
    }}
    renderItem={({ item }) => (
      <LinearGradient
        colors={[item.gradientStart, item.gradientEnd]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.bannerSlide, { width: BANNER_ITEM_WIDTH }]}
      >
        {/* Decorative icon — top right, very transparent */}
        <MaterialCommunityIcons
          name={item.iconName as any}
          size={100}
          color="rgba(255, 255, 255, 0.12)"
          style={styles.bannerIconDecor}
        />
        {/* Text — bottom left */}
        <View style={styles.bannerTextBlock}>
          <Text style={styles.bannerHeadline}>{item.headline}</Text>
          <Text style={styles.bannerSubtitle}>{item.subtitle}</Text>
        </View>
      </LinearGradient>
    )}
  />

  {/* Pagination dots */}
  <View style={styles.dotsRow}>
    {BANNERS.map((_, i) => (
      <View
        key={i}
        style={[
          styles.dot,
          i === activeBanner
            ? { width: 20, height: 8, backgroundColor: colors.primary, borderRadius: 4 }
            : { width: 8, height: 8, backgroundColor: colors.outlineVariant, borderRadius: 4 },
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
},
bannerIconDecor: {
  position: "absolute",
  top: 10,
  right: 10,
},
bannerTextBlock: {
  padding: 16,
  gap: 4,
},
bannerHeadline: {
  fontFamily: "Manrope",
  fontSize: 18,
  fontWeight: "700",
  color: "#ffffff",
},
bannerSubtitle: {
  fontFamily: "Inter",
  fontSize: 13,
  color: "rgba(255, 255, 255, 0.85)",
},
dotsRow: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: 6,
  marginTop: 12,
},
dot: {
  borderRadius: 4,
},
```

---

## Section 5 — Service Grid

### What it looks like
- White panel with only the **top two corners** rounded (borderTopLeftRadius: 24, borderTopRightRadius: 24)
- Appears immediately below the pagination dots (marginTop: 20)
- 2 rows, each with 4 equally spaced tiles
- Each tile = centered icon square + label text below

### CRITICAL: Both rows show the SAME 4 services

Looking at the reference screenshot: **Row 1 and Row 2 are identical** — both show Tide QR, Credit Card, MSME, Insurance. Do NOT invent 8 different services. Repeat the same 4 in both rows.

### Service tile data

```ts
// Define as a constant OUTSIDE the component (no colors needed in definition)
// Colors are applied in JSX using the colors object from useTheme()
const SERVICE_ITEMS = [
  {
    id: "tide_qr",
    label: "Tide QR",
    iconName: "qrcode",
  },
  {
    id: "credit_card",
    label: "Credit Card",
    iconName: "credit-card-outline",
  },
  {
    id: "msme",
    label: "MSME",
    iconName: "shield-half-full",
  },
  {
    id: "insurance",
    label: "Insurance",
    iconName: "archive-outline",
  },
] as const;
```

### Icon colours and tile backgrounds (applied in JSX using `colors`)

| Service | Icon color token | Hex | Tile background token | Hex |
|---|---|---|---|---|
| Tide QR | `colors.onPrimary` | `#ffffff` (white icon) | `colors.primary` | `#0037b0` (blue circle) |
| Credit Card | `colors.error` | `#ba1a1a` (red icon) | `colors.errorContainer` | `#ffdad6` (pink bg) |
| MSME | `colors.primary` | `#0037b0` (blue icon) | `colors.primaryFixed` | `#dce1ff` (light blue bg) |
| Insurance | `colors.warning` | `#f59e0b` (amber icon) | `colors.warningContainer` | `#fef3c7` (light yellow bg) |

### JSX — render rows in a helper function

```tsx
// Helper to get colors for each service
const getServiceColors = (id: string) => {
  switch (id) {
    case "tide_qr":
      return { iconColor: colors.onPrimary, bgColor: colors.primary };
    case "credit_card":
      return { iconColor: colors.error, bgColor: colors.errorContainer };
    case "msme":
      return { iconColor: colors.primary, bgColor: colors.primaryFixed };
    case "insurance":
      return { iconColor: colors.warning, bgColor: colors.warningContainer };
    default:
      return { iconColor: colors.onSurfaceVariant, bgColor: colors.surfaceContainerHigh };
  }
};

// In JSX:
<View style={[styles.servicesPanel, { backgroundColor: colors.surfaceContainerLowest }]}>
  {/* Row 1 */}
  <View style={styles.servicesRow}>
    {SERVICE_ITEMS.map((svc) => {
      const { iconColor, bgColor } = getServiceColors(svc.id);
      return (
        <TouchableOpacity
          key={`r1_${svc.id}`}
          style={styles.serviceTile}
          activeOpacity={0.7}
          onPress={() => console.log("Navigate to:", svc.id)}
        >
          <View style={[styles.serviceIconBox, { backgroundColor: bgColor }]}>
            <MaterialCommunityIcons name={svc.iconName as any} size={28} color={iconColor} />
          </View>
          <Text style={[styles.serviceLabel, { color: colors.onSurface }]}>{svc.label}</Text>
        </TouchableOpacity>
      );
    })}
  </View>

  {/* Row 2 — same items, different keys */}
  <View style={styles.servicesRow}>
    {SERVICE_ITEMS.map((svc) => {
      const { iconColor, bgColor } = getServiceColors(svc.id);
      return (
        <TouchableOpacity
          key={`r2_${svc.id}`}
          style={styles.serviceTile}
          activeOpacity={0.7}
          onPress={() => console.log("Navigate to:", svc.id)}
        >
          <View style={[styles.serviceIconBox, { backgroundColor: bgColor }]}>
            <MaterialCommunityIcons name={svc.iconName as any} size={28} color={iconColor} />
          </View>
          <Text style={[styles.serviceLabel, { color: colors.onSurface }]}>{svc.label}</Text>
        </TouchableOpacity>
      );
    })}
  </View>
</View>
```

### Styles

```js
servicesPanel: {
  borderTopLeftRadius: 24,
  borderTopRightRadius: 24,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  marginTop: 20,
  paddingHorizontal: 16,
  paddingTop: 24,
  paddingBottom: 32,        // modest bottom padding — tab bar has its own space
},
servicesRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: 28,
},
serviceTile: {
  flex: 1,
  alignItems: "center",
  gap: 8,
  paddingHorizontal: 4,
},
serviceIconBox: {
  width: 60,
  height: 60,
  borderRadius: 16,           // rounded square, NOT a full circle
  alignItems: "center",
  justifyContent: "center",
},
serviceLabel: {
  fontFamily: "Inter",
  fontSize: 12,
  fontWeight: "500",
  textAlign: "center",
  lineHeight: 16,
},
```

---

## Section 6 — Bottom Tab Bar (CustomTabBar.tsx)

### What it looks like
- Full-width flat white bar pinned to the bottom of the screen
- 1px grey top border (`colors.outlineVariant`)
- 4 tabs: **Dashboard**, **Leads**, **Earnings**, **Profile**
- Each tab: icon (24px) on top, label text (11px) below
- **Active tab** (Dashboard): icon + label both in `colors.primary` blue; a small blue bar appears at the very bottom edge of the screen (not inside the tab button — it is on the container's bottom border area)
- **Inactive tabs**: icon + label both in `colors.onSurfaceVariant` grey

### Active indicator bar

The indicator is a `2px`-tall horizontal bar at the VERY BOTTOM of the active tab column. The safest way: inside the tab `TouchableOpacity`, position it `absolute` with `bottom: 0`, `left: "15%"`, `right: "15%"`, `height: 2`.

### Tab configuration

```ts
const TAB_CONFIG: Record<string, {
  iconActive: string;
  iconInactive: string;
  label: string;
}> = {
  Home: {
    iconActive: "view-dashboard",
    iconInactive: "view-dashboard-outline",
    label: "Dashboard",
  },
  Leads: {
    iconActive: "account-group",
    iconInactive: "account-group-outline",
    label: "Leads",
  },
  Earnings: {
    iconActive: "receipt",
    iconInactive: "receipt-outline",
    label: "Earnings",
  },
  Profile: {
    iconActive: "account-circle",
    iconInactive: "account-circle-outline",
    label: "Profile",
  },
};
```

### Complete CustomTabBar.tsx file

```tsx
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
    iconActive: "view-dashboard",
    iconInactive: "view-dashboard-outline",
    label: "Dashboard",
  },
  Leads: {
    iconActive: "account-group",
    iconInactive: "account-group-outline",
    label: "Leads",
  },
  Earnings: {
    iconActive: "receipt",
    iconInactive: "receipt-outline",
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
          backgroundColor: colors.surfaceContainerLowest,  // #ffffff
          borderTopColor: colors.outlineVariant,            // #c4c5d7
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
        const iconName = isFocused ? cfg.iconActive : cfg.iconInactive;
        const iconColor = isFocused ? colors.primary : colors.onSurfaceVariant;
        const labelColor = isFocused ? colors.primary : colors.onSurfaceVariant;
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
            {/* Icon */}
            <MaterialCommunityIcons name={iconName as any} size={24} color={iconColor} />

            {/* Label */}
            <Text
              style={[
                styles.tabLabel,
                {
                  color: labelColor,
                  fontWeight: isFocused ? "600" : "400",
                },
              ]}
            >
              {cfg.label}
            </Text>

            {/* Active bottom indicator bar */}
            {isFocused && (
              <View
                style={[styles.activeIndicator, { backgroundColor: colors.primary }]}
              />
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
    paddingTop: 10,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 6,
    gap: 2,
    position: "relative",   // needed for absolute indicator
  },
  tabLabel: {
    fontFamily: "Inter",
    fontSize: 11,
    letterSpacing: 0.1,
  },
  activeIndicator: {
    position: "absolute",
    bottom: 0,
    left: "20%",
    right: "20%",
    height: 2,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
});
```

---

## Section 7 — AnimatedTabNavigator.tsx

**No changes required.** The file already has:

```ts
const SCREEN_NAMES = ["Home", "Leads", "Earnings", "Profile"];
```

The `CustomTabBar` maps `"Home"` → label `"Dashboard"` internally.

However, **verify** that `AnimatedTabNavigator.tsx` renders `CustomTabBar` and NOT the old pill-style navigator. If it still imports an old version, make it import from `src/components/ui/CustomTabBar`.

---

## Section 8 — Imports needed at top of EmployeeDashboard.tsx

```tsx
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../context/ThemeContext";
```

> **Note on Clipboard**: Do NOT import `Clipboard` from `react-native` (deprecated). Instead, just use `Alert.alert("Copied!", "Referral code copied.")` as the copy feedback for now.

---

## Section 9 — Complete EmployeeDashboard.tsx (Paste This Entire File)

```tsx
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../context/ThemeContext";

// ─── Constants outside component ─────────────────────────────────────────────

const SERVICE_ITEMS = [
  { id: "tide_qr",     label: "Tide QR",     iconName: "qrcode" },
  { id: "credit_card", label: "Credit Card", iconName: "credit-card-outline" },
  { id: "msme",        label: "MSME",        iconName: "shield-half-full" },
  { id: "insurance",   label: "Insurance",   iconName: "archive-outline" },
] as const;

// ─── Component ────────────────────────────────────────────────────────────────

export default function EmployeeDashboard() {
  const { colors } = useTheme();

  // Banner carousel state
  const [activeBanner, setActiveBanner] = useState(0);
  const bannerListRef = useRef<FlatList>(null);
  const bannerTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Screen width for banner sizing
  const screenWidth = Dimensions.get("window").width;
  const BANNER_ITEM_WIDTH = screenWidth - 32;
  const BANNER_SNAP_INTERVAL = BANNER_ITEM_WIDTH + 12;

  // Banner data — defined here so colors is in scope
  const BANNERS = [
    {
      id: "1",
      headline: "Insurance Made Easy",
      subtitle: "Protect what matters most to you today.",
      gradientColors: [colors.primary, "#001a5e"] as [string, string],
      iconName: "shield-check-outline",
    },
    {
      id: "2",
      headline: "Grow Your Business",
      subtitle: "MSME loans tailored for you.",
      gradientColors: [colors.tertiaryContainer, colors.tertiary] as [string, string],
      iconName: "briefcase-outline",
    },
    {
      id: "3",
      headline: "Credit Card Offers",
      subtitle: "Exclusive cashback on every swipe.",
      gradientColors: [colors.error, "#6a0000"] as [string, string],
      iconName: "credit-card-outline",
    },
  ];

  // Helper to resolve service icon + bg colors
  const getServiceColors = (id: string) => {
    switch (id) {
      case "tide_qr":
        return { iconColor: colors.onPrimary, bgColor: colors.primary };
      case "credit_card":
        return { iconColor: colors.error, bgColor: colors.errorContainer };
      case "msme":
        return { iconColor: colors.primary, bgColor: colors.primaryFixed };
      case "insurance":
        return { iconColor: colors.warning, bgColor: colors.warningContainer };
      default:
        return { iconColor: colors.onSurfaceVariant, bgColor: colors.surfaceContainerHigh };
    }
  };

  // Auto-scroll banner every 3 seconds
  useEffect(() => {
    bannerTimerRef.current = setInterval(() => {
      setActiveBanner((prev) => {
        const next = (prev + 1) % BANNERS.length;
        try {
          bannerListRef.current?.scrollToIndex({ index: next, animated: true });
        } catch (_) {
          // scrollToIndex can throw if list hasn't mounted yet; ignore
        }
        return next;
      });
    }, 3000);
    return () => {
      if (bannerTimerRef.current) clearInterval(bannerTimerRef.current);
    };
  }, []);

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.primary }]}
      edges={["top"]}
    >
      <View style={[styles.root, { backgroundColor: colors.background }]}>

        {/* ══════════════════════════════════════════ HEADER ══ */}
        {/*
          Plain View — NOT LinearGradient.
          Background is the solid primary blue.
          SafeAreaView with edges=["top"] is used on the outer SafeAreaView,
          so the header View here does NOT need another SafeAreaView inside it.
        */}
        <View style={[styles.header, { backgroundColor: colors.primary }]}>
          <View style={styles.headerRow}>

            {/* Hamburger menu */}
            <TouchableOpacity style={styles.headerIconBtn}>
              <MaterialCommunityIcons name="menu" size={26} color={colors.onPrimary} />
            </TouchableOpacity>

            {/* Title */}
            <Text style={[styles.headerTitle, { color: colors.onPrimary }]}>
              My Work Point
            </Text>

            {/* Avatar outline button */}
            <TouchableOpacity style={styles.headerIconBtn}>
              <View style={[styles.headerAvatarRing, { borderColor: colors.onPrimary }]}>
                <MaterialCommunityIcons name="account" size={20} color={colors.onPrimary} />
              </View>
            </TouchableOpacity>

          </View>
        </View>

        {/* ═══════════════════════════════════════ SCROLL AREA ══ */}
        <ScrollView
          style={[styles.scrollView, { backgroundColor: colors.background }]}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >

          {/* ── Profile Card ────────────────────────────────── */}
          <View style={[styles.profileCard, { backgroundColor: colors.surfaceContainerLowest }]}>

            {/* Avatar: light grey circle + dark grey person icon */}
            <View style={[styles.profileAvatar, { backgroundColor: colors.surfaceContainerHigh }]}>
              <MaterialCommunityIcons
                name="account"
                size={40}
                color={colors.onSurfaceVariant}
              />
            </View>

            {/* Info */}
            <View style={styles.profileInfo}>
              <Text style={[styles.profileName, { color: colors.onSurface }]}>
                Rahul Sharma
              </Text>
              <Text style={[styles.profileAgentId, { color: colors.onSurfaceVariant }]}>
                Agent ID  12345678
              </Text>

              {/* Referral Code */}
              <View style={styles.infoRow}>
                <MaterialCommunityIcons
                  name="card-account-details-outline"
                  size={14}
                  color={colors.primary}
                />
                <Text style={[styles.infoLabel, { color: colors.onSurface }]}>
                  Referral Code
                </Text>
                <Text
                  style={[styles.infoValue, { color: colors.onSurface }]}
                  numberOfLines={1}
                >
                  ARN1234
                </Text>
                <TouchableOpacity
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  onPress={() => Alert.alert("Copied!", "Referral code ARN1234 copied.")}
                >
                  <MaterialCommunityIcons
                    name="content-copy"
                    size={13}
                    color={colors.onSurfaceVariant}
                  />
                </TouchableOpacity>
              </View>

              {/* Mobile */}
              <View style={styles.infoRow}>
                <MaterialCommunityIcons
                  name="phone-outline"
                  size={14}
                  color={colors.primary}
                />
                <Text style={[styles.infoLabel, { color: colors.onSurface }]}>
                  Mobile
                </Text>
                <Text
                  style={[styles.infoValue, { color: colors.onSurface }]}
                  numberOfLines={1}
                >
                  +91 98765 43210
                </Text>
              </View>

              {/* Email */}
              <View style={styles.infoRow}>
                <MaterialCommunityIcons
                  name="email-outline"
                  size={14}
                  color={colors.primary}
                />
                <Text style={[styles.infoLabel, { color: colors.onSurface }]}>
                  Email
                </Text>
                <Text
                  style={[styles.infoValue, { color: colors.onSurface }]}
                  numberOfLines={1}
                >
                  rahul.sharma@email.com
                </Text>
              </View>
            </View>
          </View>

          {/* ── Banner Carousel ──────────────────────────────── */}
          <View style={styles.bannerContainer}>
            <FlatList
              ref={bannerListRef}
              data={BANNERS}
              keyExtractor={(b) => b.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToInterval={BANNER_SNAP_INTERVAL}
              snapToAlignment="start"
              decelerationRate="fast"
              contentContainerStyle={{ gap: 12 }}
              onMomentumScrollEnd={(e) => {
                const newIndex = Math.round(
                  e.nativeEvent.contentOffset.x / BANNER_SNAP_INTERVAL
                );
                setActiveBanner(
                  Math.max(0, Math.min(newIndex, BANNERS.length - 1))
                );
              }}
              renderItem={({ item }) => (
                <LinearGradient
                  colors={item.gradientColors}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={[styles.bannerSlide, { width: BANNER_ITEM_WIDTH }]}
                >
                  {/* Decorative icon — top right, very transparent */}
                  <MaterialCommunityIcons
                    name={item.iconName as any}
                    size={100}
                    color="rgba(255, 255, 255, 0.12)"
                    style={styles.bannerIconDecor}
                  />
                  {/* Text — bottom left */}
                  <View style={styles.bannerTextBlock}>
                    <Text style={styles.bannerHeadline}>{item.headline}</Text>
                    <Text style={styles.bannerSubtitle}>{item.subtitle}</Text>
                  </View>
                </LinearGradient>
              )}
            />

            {/* Pagination dots */}
            <View style={styles.dotsRow}>
              {BANNERS.map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.dot,
                    i === activeBanner
                      ? {
                          width: 20,
                          height: 8,
                          backgroundColor: colors.primary,
                          borderRadius: 4,
                        }
                      : {
                          width: 8,
                          height: 8,
                          backgroundColor: colors.outlineVariant,
                          borderRadius: 4,
                        },
                  ]}
                />
              ))}
            </View>
          </View>

          {/* ── Services Panel ───────────────────────────────── */}
          <View
            style={[
              styles.servicesPanel,
              { backgroundColor: colors.surfaceContainerLowest },
            ]}
          >
            {/* Row 1 */}
            <View style={styles.servicesRow}>
              {SERVICE_ITEMS.map((svc) => {
                const { iconColor, bgColor } = getServiceColors(svc.id);
                return (
                  <TouchableOpacity
                    key={`r1_${svc.id}`}
                    style={styles.serviceTile}
                    activeOpacity={0.7}
                    onPress={() => Alert.alert(svc.label, `Tapped ${svc.label}`)}
                  >
                    <View style={[styles.serviceIconBox, { backgroundColor: bgColor }]}>
                      <MaterialCommunityIcons
                        name={svc.iconName as any}
                        size={28}
                        color={iconColor}
                      />
                    </View>
                    <Text style={[styles.serviceLabel, { color: colors.onSurface }]}>
                      {svc.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Row 2 — same services, different row key prefix */}
            <View style={styles.servicesRow}>
              {SERVICE_ITEMS.map((svc) => {
                const { iconColor, bgColor } = getServiceColors(svc.id);
                return (
                  <TouchableOpacity
                    key={`r2_${svc.id}`}
                    style={styles.serviceTile}
                    activeOpacity={0.7}
                    onPress={() => Alert.alert(svc.label, `Tapped ${svc.label}`)}
                  >
                    <View style={[styles.serviceIconBox, { backgroundColor: bgColor }]}>
                      <MaterialCommunityIcons
                        name={svc.iconName as any}
                        size={28}
                        color={iconColor}
                      />
                    </View>
                    <Text style={[styles.serviceLabel, { color: colors.onSurface }]}>
                      {svc.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

// ─── StyleSheet ────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  root: {
    flex: 1,
  },

  // ── Header ──────────────────────────────────────────────
  header: {
    // backgroundColor set inline
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
  },
  headerTitle: {
    fontFamily: "Manrope",
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  headerIconBtn: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerAvatarRing: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },

  // ── Scroll ──────────────────────────────────────────────
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,   // clearance above fixed tab bar
  },

  // ── Profile Card ────────────────────────────────────────
  profileCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: 16,          // 16px gap BELOW header — positive, not negative!
    padding: 16,
    gap: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 4,
  },
  profileAvatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
    // DO NOT add overflow: "hidden" — causes clipping issues on Android
  },
  profileInfo: {
    flex: 1,
    gap: 4,
  },
  profileName: {
    fontFamily: "Manrope",
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 24,
  },
  profileAgentId: {
    fontFamily: "Inter",
    fontSize: 13,
    marginBottom: 4,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    minHeight: 22,
  },
  infoLabel: {
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: "500",
  },
  infoValue: {
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: "400",
    flex: 1,
  },

  // ── Banner Carousel ──────────────────────────────────────
  bannerContainer: {
    marginHorizontal: 16,
    marginTop: 20,
  },
  bannerSlide: {
    height: 160,
    borderRadius: 14,
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  bannerIconDecor: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  bannerTextBlock: {
    padding: 16,
    gap: 4,
  },
  bannerHeadline: {
    fontFamily: "Manrope",
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
  },
  bannerSubtitle: {
    fontFamily: "Inter",
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.85)",
  },
  dotsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 12,
  },
  dot: {
    borderRadius: 4,
  },

  // ── Services Panel ───────────────────────────────────────
  servicesPanel: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: 20,
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 32,
  },
  servicesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 28,
  },
  serviceTile: {
    flex: 1,
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 2,
  },
  serviceIconBox: {
    width: 60,
    height: 60,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  serviceLabel: {
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
    lineHeight: 16,
  },
});
```

---

## Section 10 — Complete CustomTabBar.tsx (Paste This Entire File)

```tsx
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
    iconActive: "view-dashboard",
    iconInactive: "view-dashboard-outline",
    label: "Dashboard",
  },
  Leads: {
    iconActive: "account-group",
    iconInactive: "account-group-outline",
    label: "Leads",
  },
  Earnings: {
    iconActive: "receipt",
    iconInactive: "receipt-outline",
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
            {isFocused && (
              <View
                style={[styles.activeIndicator, { backgroundColor: colors.primary }]}
              />
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
    paddingTop: 10,
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
  activeIndicator: {
    position: "absolute",
    bottom: 0,
    left: "20%",
    right: "20%",
    height: 2,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
});
```

---

## Section 11 — Visual Checklist (AI Agent Must Verify Before Finishing)

After writing the code, verify these points visually/logically:

- [ ] Header is solid blue with NO gradient — just `backgroundColor: colors.primary`
- [ ] The `SafeAreaView` on the root has `backgroundColor: colors.primary` so the status bar area is also blue (not white/grey)
- [ ] Profile card avatar is a LIGHT GREY `View` circle (72×72, `backgroundColor: colors.surfaceContainerHigh` = `#e6e8ea`) with a smaller (40px) dark grey `account` icon inside — NOT `account-circle` at 72px
- [ ] Profile card has `marginTop: 16` (positive number) — it sits BELOW the header with a gap, does NOT overlap the header
- [ ] The `ScrollView` background is `colors.background` = `#f7f9fb` (light grey), so grey shows between the white card sections
- [ ] Banner carousel slides have `height: 160`, `borderRadius: 14`, and use `LinearGradient`
- [ ] Pagination dots: active = 20×8 pill in `colors.primary` blue; inactive = 8×8 circle in `colors.outlineVariant` grey
- [ ] Both service rows show the SAME 4 items: Tide QR, Credit Card, MSME, Insurance
- [ ] Tide QR tile: BLUE (`colors.primary`) rounded-square background, WHITE icon inside
- [ ] Credit Card tile: PINK (`colors.errorContainer`) background, RED (`colors.error`) icon
- [ ] MSME tile: LIGHT BLUE (`colors.primaryFixed`) background, DARK BLUE (`colors.primary`) icon
- [ ] Insurance tile: LIGHT YELLOW (`colors.warningContainer`) background, AMBER (`colors.warning`) icon
- [ ] Services panel has `borderTopLeftRadius: 24` and `borderTopRightRadius: 24` but ZERO radius on bottom corners
- [ ] Tab bar shows: Dashboard | Leads | Earnings | Profile (labels in this order)
- [ ] Active tab (Dashboard by default) icon and label are `colors.primary` blue
- [ ] Inactive tab icons and labels are `colors.onSurfaceVariant` grey
- [ ] Tab bar has a 1px top border in `colors.outlineVariant`
- [ ] No floating pill style on tab bar — it was replaced with this flat style
