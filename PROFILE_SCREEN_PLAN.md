# Profile Screen — Implementation Plan (Pixel-Perfect)

> **Purpose**: This document is a complete, self-contained specification for building the "Profile" screen in this React Native / Expo project. Follow every instruction exactly. Do NOT invent, simplify, or add anything not described here.

---

## 1. Project Context & Rules

### Tech Stack (Do NOT change)
- **React Native** with **Expo**
- `@expo/vector-icons` → `MaterialCommunityIcons` for ALL icons
- `react-native-safe-area-context` → `SafeAreaView`
- **ThemeContext** at `src/context/ThemeContext.tsx` → `useTheme()` → `colors` object
- **StyleSheet.create(...)** for all styles — no plain JS style objects inside JSX, only the `[style, { color: colors.xxx }]` array pattern for dynamic theming
- `ScrollView` from `react-native` — wraps the entire body below the header
- Font families: `"Manrope"` (name, title, button) and `"Inter"` (phone, labels, menu items)

### File to create
```
src/screens/lead/ProfileScreen.tsx   ← NEW FILE, create this
```

> Do NOT edit or reuse `src/screens/employee/ProfileScreen.tsx`. That is a completely different layout. This new file goes under `src/screens/lead/`.

### Do NOT use LinearGradient here
There is **no gradient** on this screen. All backgrounds are solid colours from the theme system.

### Navigation integration
`TeamLeadTabNavigator.tsx` at `src/navigation/TeamLeadTabNavigator.tsx` currently has:
- index 0 → `TeamLeadDashboard` ("Dashboard")
- index 1 → `LeadHistoryScreen` ("Leads")
- index 2 → `EarningsScreen` ("Earnings")

Add the new `ProfileScreen` as index 3 ("Profile"). See **Section 9** for exact changes.

---

## 2. Colour Tokens — Exact Values

All colours come from `useTheme()`. Hex values shown are **light mode** values from `src/context/ThemeContext.tsx`. Always reference by token name, NEVER by hardcoded hex.

| Token name | Hex (light mode) | Usage on this screen |
|---|---|---|
| `colors.surface` | `#f7f9fb` | Page background (SafeAreaView + ScrollView) |
| `colors.surfaceContainerLowest` | `#ffffff` | Referral code card background; menu rows background |
| `colors.onSurface` | `#191c1e` | Page title; user name; menu item text |
| `colors.onSurfaceVariant` | `#434655` | Phone number text; "Referral Code" label; menu item icons |
| `colors.outlineVariant` | `#c4c5d7` | Referral card border; separator lines between menu rows |
| `colors.primary` | `#5B8DEF` | Avatar circle fill; referral code value text; Log Out button border + text + icon |
| `colors.onPrimary` | `#ffffff` | (Not used directly in this screen — avatar has no text on it) |

> **No hardcoded colours** are needed on this screen. All values come from the token list above.

---

## 3. Visual Layout Overview

```
SCREEN (SafeAreaView edges=["top"], bg = colors.surface)
│
├── [CENTERED HEADER]
│     "Profile" — centered bold title
│     No back button, no icon button
│
└── [SCROLLVIEW — full body]
      │
      ├── [AVATAR SECTION — centered]
      │     Large circle filled with colors.primary (blue)
      │     No icon or text inside the circle — it is a plain solid blue circle
      │     User name below: "John Agent" (bold, centered)
      │     Phone number below: "+91 9876543210" (grey, centered)
      │
      ├── [REFERRAL CODE CARD]
      │     White card with border (outlineVariant)
      │     Label: "Referral Code" (small grey label text, top-left inside card)
      │     Value: "LM-AGT-2026" (blue, bold, larger)
      │     Right: copy icon (outlined copy icon, grey)
      │
      ├── [MENU SECTION]
      │     White background section, no card border
      │     3 rows, each = icon + label + right chevron
      │     Thin separator between rows (outlineVariant)
      │     Row 1: About LeadMaster
      │     Row 2: Share App Download Link
      │     Row 3: Help & Support
      │
      ├── [LOG OUT BUTTON]
      │     Full-width outlined button (border only, white/transparent fill)
      │     Contains: logout-arrow icon (left) + "Log Out" text (center)
      │     Border and text both in colors.primary (blue)
      │
      └── [BOTTOM SPACER]
```

---

## 4. Page Header

### Visual description
- Full-width centered text: **"Profile"**
- Font: `Manrope`, size `22`, weight `700`, color `colors.onSurface`
- **Centered** — NOT left-aligned
- No back button on left, no icon button on right
- Padding: `paddingTop: 16`, `paddingBottom: 14`
- Background: transparent (inherits `colors.surface` from parent)

### Code

```tsx
{/* Page Header */}
<View style={styles.pageHeader}>
  <Text style={[styles.pageTitle, { color: colors.onSurface }]}>
    Profile
  </Text>
</View>
```

### Styles

```js
pageHeader: {
  alignItems: "center",
  justifyContent: "center",
  paddingTop: 16,
  paddingBottom: 14,
  paddingHorizontal: 16,
},
pageTitle: {
  fontFamily: "Manrope",
  fontSize: 22,
  fontWeight: "700",
  letterSpacing: -0.2,
},
```

---

## 5. Avatar Section

### Visual description

The avatar section is centered on the screen. It consists of three elements stacked vertically:

1. **Avatar circle** — a large filled blue circle
2. **User name** — bold large text immediately below the circle
3. **Phone number** — smaller grey text below the name

### Avatar circle — CRITICAL DETAILS

Looking at the screenshot carefully:
- The avatar is a **large solid filled circle** with `backgroundColor: colors.primary` (`#5B8DEF`)
- It is **NOT** a `MaterialCommunityIcons` icon — it has NO icon or initials inside it
- It is a plain `View` with `borderRadius` = half of width/height, filled with `colors.primary`
- Size: `width: 100`, `height: 100`, `borderRadius: 50`
- There is NO border ring around it
- There is NO shadow on it
- The fill is deep blue/navy matching `colors.primary` exactly

```tsx
{/* Avatar circle — plain solid blue circle, no icon inside */}
<View style={[styles.avatarCircle, { backgroundColor: colors.primary }]} />
```

> **WRONG approaches** — do NOT do any of these:
> - `<MaterialCommunityIcons name="account" ... />` — wrong, no icon here
> - `<Image source={...} />` — wrong, no photo here
> - Adding initials text like "JA" inside — wrong, it's a completely solid circle with nothing inside
> - Adding a shadow — wrong, no shadow visible in the screenshot

### User name text

- Text: `"John Agent"`
- Font: `Manrope`, size `22`, weight `700`
- Color: `colors.onSurface` (`#191c1e`)
- `textAlign: "center"`
- `marginTop: 16` — gap between bottom of the circle and name

### Phone number text

- Text: `"+91 9876543210"` — no space between the digits (different formatting from other screens)
- Font: `Inter`, size `14`, weight `400`
- Color: `colors.onSurfaceVariant` (`#434655`)
- `textAlign: "center"`
- `marginTop: 4`

### Avatar section container

```tsx
{/* Avatar Section */}
<View style={styles.avatarSection}>
  {/* Large solid blue circle — NO content inside */}
  <View style={[styles.avatarCircle, { backgroundColor: colors.primary }]} />

  {/* Name */}
  <Text style={[styles.userName, { color: colors.onSurface }]}>
    John Agent
  </Text>

  {/* Phone */}
  <Text style={[styles.userPhone, { color: colors.onSurfaceVariant }]}>
    +91 9876543210
  </Text>
</View>
```

### Styles

```js
avatarSection: {
  alignItems: "center",
  marginBottom: 28,
  paddingTop: 8,
},
avatarCircle: {
  width: 100,
  height: 100,
  borderRadius: 50,
},
userName: {
  fontFamily: "Manrope",
  fontSize: 22,
  fontWeight: "700",
  textAlign: "center",
  marginTop: 16,
},
userPhone: {
  fontFamily: "Inter",
  fontSize: 14,
  fontWeight: "400",
  textAlign: "center",
  marginTop: 4,
},
```

---

## 6. Referral Code Card

### Visual description

A full-width white card with a visible border, containing:
- **Top-left**: small grey label text `"Referral Code"`
- **Below the label**: larger bold blue code `"LM-AGT-2026"`
- **Right side** (vertically centered in the card): a copy/duplicate icon

The card is a `View` with `flexDirection: "row"`, `alignItems: "center"`, `justifyContent: "space-between"`.

### Card container

- Background: `colors.surfaceContainerLowest` (`#ffffff`)
- Border: `borderWidth: 1`, `borderColor: colors.outlineVariant` (`#c4c5d7`)
- Border radius: `12`
- Padding: `paddingHorizontal: 16`, `paddingVertical: 14`
- Margin bottom: `24`

### Left block (label + value, stacked vertically)

**Label**:
- Text: `"Referral Code"`
- Font: `Inter`, size `12`, weight `400`
- Color: `colors.onSurfaceVariant` (`#434655`)
- `marginBottom: 4`

**Value**:
- Text: `"LM-AGT-2026"`
- Font: `Manrope`, size `18`, weight `700`
- Color: `colors.primary` (`#5B8DEF`) — blue
- NO marginTop needed (sibling of label with `gap` or `marginBottom` on label)

### Right block (copy icon)

- `MaterialCommunityIcons name="content-copy" size={22} color={colors.onSurfaceVariant}`
- The copy icon uses the outlined/regular copy icon variant (`"content-copy"`)
- It is wrapped in a `TouchableOpacity` with `onPress={() => {}}` (no-op for mock)
- `hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}` for better tap area

### Code

```tsx
{/* Referral Code Card */}
<View
  style={[
    styles.referralCard,
    {
      backgroundColor: colors.surfaceContainerLowest,
      borderColor: colors.outlineVariant,
    },
  ]}
>
  {/* Left: label + value */}
  <View style={styles.referralLeft}>
    <Text style={[styles.referralLabel, { color: colors.onSurfaceVariant }]}>
      Referral Code
    </Text>
    <Text style={[styles.referralValue, { color: colors.primary }]}>
      LM-AGT-2026
    </Text>
  </View>

  {/* Right: copy icon */}
  <TouchableOpacity
    onPress={() => {}}
    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
  >
    <MaterialCommunityIcons
      name="content-copy"
      size={22}
      color={colors.onSurfaceVariant}
    />
  </TouchableOpacity>
</View>
```

### Styles

```js
referralCard: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  borderWidth: 1,
  borderRadius: 12,
  paddingHorizontal: 16,
  paddingVertical: 14,
  marginBottom: 24,
},
referralLeft: {
  gap: 4,
},
referralLabel: {
  fontFamily: "Inter",
  fontSize: 12,
  fontWeight: "400",
},
referralValue: {
  fontFamily: "Manrope",
  fontSize: 18,
  fontWeight: "700",
},
```

---

## 7. Menu Section (3 Rows)

### Visual description

Three tappable rows, displayed with no outer box/card — they appear on the same `colors.surface` page background. Each row:
- Left: icon (circular outline icon) + label text
- Right: chevron arrow pointing right
- Below each row (except the last): a thin 1px separator line in `colors.outlineVariant`

The three rows are vertically stacked. There is **no card container wrapping them** — they sit directly on the page background.

> Looking at the screenshot: the menu rows have their own white background area (it looks like there's a white section behind them, wider than the page). On closer inspection, this is the `colors.surfaceContainerLowest` (`#ffffff`) background of a container view, creating a white panel that fills the width. There is NO visible card border/outline on the container — just the white fill contrasting with the grey page.

### Outer container

- `View` with `backgroundColor: colors.surfaceContainerLowest` (`#ffffff`)
- `borderRadius: 14`
- `marginBottom: 24`
- `overflow: "hidden"` — ensures the borderRadius clips the rows cleanly

### Menu items data

Define this OUTSIDE the component:

```ts
interface MenuItem {
  id: string;
  iconName: string;
  label: string;
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: "1",
    iconName: "information-outline",
    label: "About LeadMaster",
  },
  {
    id: "2",
    iconName: "link-variant",
    label: "Share App Download Link",
  },
  {
    id: "3",
    iconName: "help-circle-outline",
    label: "Help & Support",
  },
];
```

### Icon specifications per row

| Row | Icon name | Icon size | Icon color |
|---|---|---|---|
| About LeadMaster | `"information-outline"` | `22` | `colors.onSurfaceVariant` |
| Share App Download Link | `"link-variant"` | `22` | `colors.onSurfaceVariant` |
| Help & Support | `"help-circle-outline"` | `22` | `colors.onSurfaceVariant` |

> All three icons and all chevrons use `colors.onSurfaceVariant` colour. None of them use `colors.primary` blue.

### Row layout

Each row is a `TouchableOpacity` with:
- `flexDirection: "row"`, `alignItems: "center"`, `justifyContent: "space-between"`
- `paddingHorizontal: 16`, `paddingVertical: 18`
- Below the row (except the last): a separator line `View` with `height: 1`, `backgroundColor: colors.outlineVariant`, `marginHorizontal: 16`

### Chevron

- `MaterialCommunityIcons name="chevron-right" size={22} color={colors.onSurfaceVariant}`

### Code

```tsx
{/* Menu Section */}
<View
  style={[
    styles.menuContainer,
    { backgroundColor: colors.surfaceContainerLowest },
  ]}
>
  {MENU_ITEMS.map((item, index) => (
    <React.Fragment key={item.id}>
      <TouchableOpacity
        style={styles.menuRow}
        onPress={() => {}}
        activeOpacity={0.7}
      >
        {/* Left: icon + label */}
        <View style={styles.menuRowLeft}>
          <MaterialCommunityIcons
            name={item.iconName as any}
            size={22}
            color={colors.onSurfaceVariant}
          />
          <Text style={[styles.menuRowLabel, { color: colors.onSurface }]}>
            {item.label}
          </Text>
        </View>

        {/* Right: chevron */}
        <MaterialCommunityIcons
          name="chevron-right"
          size={22}
          color={colors.onSurfaceVariant}
        />
      </TouchableOpacity>

      {/* Separator — shown between rows but NOT after the last row */}
      {index < MENU_ITEMS.length - 1 && (
        <View
          style={[
            styles.menuSeparator,
            { backgroundColor: colors.outlineVariant },
          ]}
        />
      )}
    </React.Fragment>
  ))}
</View>
```

### Styles

```js
menuContainer: {
  borderRadius: 14,
  overflow: "hidden",
  marginBottom: 24,
},
menuRow: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingHorizontal: 16,
  paddingVertical: 18,
},
menuRowLeft: {
  flexDirection: "row",
  alignItems: "center",
  gap: 14,
},
menuRowLabel: {
  fontFamily: "Inter",
  fontSize: 15,
  fontWeight: "400",
},
menuSeparator: {
  height: 1,
  marginHorizontal: 16,
},
```

---

## 8. Log Out Button

### Visual description

A full-width button at the bottom of the scrollable content with:
- **NO fill** — the button interior is transparent/white (the page background shows through)
- **Border**: `borderWidth: 1.5`, `borderColor: colors.primary` (`#5B8DEF`) — blue outline
- **Border radius**: `12`
- **Icon**: `MaterialCommunityIcons name="logout"` on the LEFT of the text, `size: 20`, `color: colors.primary`
- **Text**: `"Log Out"` centered-ish (the icon+text together are centered as a group)
- **Text font**: `Inter`, size `16`, weight `600`, color `colors.primary`
- The icon and text are a horizontal `flexDirection: "row"` group, centered inside the button

### Layout note

The button is a `TouchableOpacity`. Inside it, a `View` with `flexDirection: "row"`, `alignItems: "center"`, `justifyContent: "center"`, `gap: 8` holds both the icon and the text. This creates the appearance of the icon and text being centered together as a unit.

### Code

```tsx
{/* Log Out Button */}
<TouchableOpacity
  style={[
    styles.logoutButton,
    { borderColor: colors.primary },
  ]}
  onPress={() => {}}
  activeOpacity={0.8}
>
  <View style={styles.logoutButtonInner}>
    <MaterialCommunityIcons
      name="logout"
      size={20}
      color={colors.primary}
    />
    <Text style={[styles.logoutButtonText, { color: colors.primary }]}>
      Log Out
    </Text>
  </View>
</TouchableOpacity>
```

### Styles

```js
logoutButton: {
  borderWidth: 1.5,
  borderRadius: 12,
  paddingVertical: 16,
  paddingHorizontal: 16,
  marginBottom: 16,
},
logoutButtonInner: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
},
logoutButtonText: {
  fontFamily: "Inter",
  fontSize: 16,
  fontWeight: "600",
},
```

---

## 9. Complete ProfileScreen.tsx File

Create this file at: `src/screens/lead/ProfileScreen.tsx`

```tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../context/ThemeContext";

// ─── Types ────────────────────────────────────────────────────────────────────

interface MenuItem {
  id: string;
  iconName: string;
  label: string;
}

// ─── Static Data ───────────────────────────────────────────────────────────────

const MENU_ITEMS: MenuItem[] = [
  {
    id: "1",
    iconName: "information-outline",
    label: "About LeadMaster",
  },
  {
    id: "2",
    iconName: "link-variant",
    label: "Share App Download Link",
  },
  {
    id: "3",
    iconName: "help-circle-outline",
    label: "Help & Support",
  },
];

// ─── Component ─────────────────────────────────────────────────────────────────

export default function ProfileScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.surface }]}
      edges={["top"]}
    >
      <View style={[styles.container, { backgroundColor: colors.surface }]}>

        {/* Page Header */}
        <View style={styles.pageHeader}>
          <Text style={[styles.pageTitle, { color: colors.onSurface }]}>
            Profile
          </Text>
        </View>

        {/* Scrollable body */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >

          {/* Avatar Section */}
          <View style={styles.avatarSection}>
            {/* Large solid blue circle — NO content inside, NO icon */}
            <View
              style={[styles.avatarCircle, { backgroundColor: colors.primary }]}
            />

            {/* Name */}
            <Text style={[styles.userName, { color: colors.onSurface }]}>
              John Agent
            </Text>

            {/* Phone */}
            <Text style={[styles.userPhone, { color: colors.onSurfaceVariant }]}>
              +91 9876543210
            </Text>
          </View>

          {/* Referral Code Card */}
          <View
            style={[
              styles.referralCard,
              {
                backgroundColor: colors.surfaceContainerLowest,
                borderColor: colors.outlineVariant,
              },
            ]}
          >
            {/* Left: label + value stacked */}
            <View style={styles.referralLeft}>
              <Text
                style={[styles.referralLabel, { color: colors.onSurfaceVariant }]}
              >
                Referral Code
              </Text>
              <Text style={[styles.referralValue, { color: colors.primary }]}>
                LM-AGT-2026
              </Text>
            </View>

            {/* Right: copy icon button */}
            <TouchableOpacity
              onPress={() => {}}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <MaterialCommunityIcons
                name="content-copy"
                size={22}
                color={colors.onSurfaceVariant}
              />
            </TouchableOpacity>
          </View>

          {/* Menu Section */}
          <View
            style={[
              styles.menuContainer,
              { backgroundColor: colors.surfaceContainerLowest },
            ]}
          >
            {MENU_ITEMS.map((item, index) => (
              <React.Fragment key={item.id}>
                <TouchableOpacity
                  style={styles.menuRow}
                  onPress={() => {}}
                  activeOpacity={0.7}
                >
                  {/* Left: icon + label */}
                  <View style={styles.menuRowLeft}>
                    <MaterialCommunityIcons
                      name={item.iconName as any}
                      size={22}
                      color={colors.onSurfaceVariant}
                    />
                    <Text
                      style={[styles.menuRowLabel, { color: colors.onSurface }]}
                    >
                      {item.label}
                    </Text>
                  </View>

                  {/* Right: chevron */}
                  <MaterialCommunityIcons
                    name="chevron-right"
                    size={22}
                    color={colors.onSurfaceVariant}
                  />
                </TouchableOpacity>

                {/* Separator — NOT after last item */}
                {index < MENU_ITEMS.length - 1 && (
                  <View
                    style={[
                      styles.menuSeparator,
                      { backgroundColor: colors.outlineVariant },
                    ]}
                  />
                )}
              </React.Fragment>
            ))}
          </View>

          {/* Log Out Button */}
          <TouchableOpacity
            style={[styles.logoutButton, { borderColor: colors.primary }]}
            onPress={() => {}}
            activeOpacity={0.8}
          >
            <View style={styles.logoutButtonInner}>
              <MaterialCommunityIcons
                name="logout"
                size={20}
                color={colors.primary}
              />
              <Text style={[styles.logoutButtonText, { color: colors.primary }]}>
                Log Out
              </Text>
            </View>
          </TouchableOpacity>

          {/* Bottom spacer */}
          <View style={styles.bottomSpacer} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },

  // ── Header ──
  pageHeader: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 16,
    paddingBottom: 14,
    paddingHorizontal: 16,
  },
  pageTitle: {
    fontFamily: "Manrope",
    fontSize: 22,
    fontWeight: "700",
    letterSpacing: -0.2,
  },

  // ── ScrollView ──
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },

  // ── Avatar Section ──
  avatarSection: {
    alignItems: "center",
    marginBottom: 28,
  },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userName: {
    fontFamily: "Manrope",
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 16,
  },
  userPhone: {
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: "400",
    textAlign: "center",
    marginTop: 4,
  },

  // ── Referral Card ──
  referralCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 24,
  },
  referralLeft: {
    gap: 4,
  },
  referralLabel: {
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: "400",
  },
  referralValue: {
    fontFamily: "Manrope",
    fontSize: 18,
    fontWeight: "700",
  },

  // ── Menu Section ──
  menuContainer: {
    borderRadius: 14,
    overflow: "hidden",
    marginBottom: 24,
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 18,
  },
  menuRowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  menuRowLabel: {
    fontFamily: "Inter",
    fontSize: 15,
    fontWeight: "400",
  },
  menuSeparator: {
    height: 1,
    marginHorizontal: 16,
  },

  // ── Log Out Button ──
  logoutButton: {
    borderWidth: 1.5,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  logoutButtonInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  logoutButtonText: {
    fontFamily: "Inter",
    fontSize: 16,
    fontWeight: "600",
  },

  // ── Bottom Spacer ──
  bottomSpacer: {
    height: 20,
  },
});
```

---

## 10. Navigation Changes — TeamLeadTabNavigator.tsx

**File**: `src/navigation/TeamLeadTabNavigator.tsx`

Current state of the import and arrays section:
```tsx
import TeamLeadDashboard from "../screens/lead/TeamLeadDashboard";
import LeadHistoryScreen from "../screens/lead/LeadHistoryScreen";
import EarningsScreen from "../screens/lead/EarningsScreen";

const SCREENS = [TeamLeadDashboard, LeadHistoryScreen, EarningsScreen];
const SCREEN_NAMES = ["Dashboard", "Leads", "Earnings"];
```

### Required changes — apply EXACTLY

```tsx
// ADD this import after EarningsScreen:
import ProfileScreen from "../screens/lead/ProfileScreen";

// REPLACE SCREENS array:
const SCREENS = [TeamLeadDashboard, LeadHistoryScreen, EarningsScreen, ProfileScreen];

// REPLACE SCREEN_NAMES array:
const SCREEN_NAMES = ["Dashboard", "Leads", "Earnings", "Profile"];
```

No other changes to `TeamLeadTabNavigator.tsx` are needed.

---

## 11. CustomTabBar.tsx — Verify Profile Tab Config

Check that `src/components/ui/CustomTabBar.tsx` has a `Profile` entry in `TAB_CONFIG`. It should already exist. Verify it exactly matches:

```ts
Profile: {
  iconActive: "account-circle",
  iconInactive: "account-circle-outline",
  label: "Profile",
},
```

The label must be exactly `"Profile"` to match `SCREEN_NAMES[3]`. When this tab is active, the icon is `"account-circle"` (filled), both icon and label are `colors.primary` blue, and the 2px indicator line appears at the bottom of the tab.

---

## 12. Imports Reference

The complete import block for `ProfileScreen.tsx` must be:

```tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../context/ThemeContext";
```

**What NOT to import**:
- Do NOT import `useState` — there is no local state (no toggle, no copy-toast, no modal)
- Do NOT import `useRef` — not needed
- Do NOT import `LinearGradient` — no gradient on this screen
- Do NOT import `Switch` — no toggle switches in this design
- Do NOT import `Alert` — no copy confirmation needed (button is a no-op for this mock)
- Do NOT import `Image` — no photo support; avatar is a plain View

---

## 13. Pixel-Level Spacing Reference Table

| Element | Property | Value |
|---|---|---|
| SafeAreaView edges | edges | `["top"]` only |
| Page title font size | fontSize | `22` |
| Page title weight | fontWeight | `"700"` |
| Header paddingTop | paddingTop | `16` |
| Header paddingBottom | paddingBottom | `14` |
| ScrollView horizontal padding | paddingHorizontal | `16` |
| ScrollView paddingTop | paddingTop | `8` |
| Avatar circle width/height | width, height | `100 × 100` |
| Avatar circle border-radius | borderRadius | `50` (full circle) |
| Avatar section bottom margin | marginBottom | `28` |
| Name marginTop (below circle) | marginTop | `16` |
| Name font size | fontSize | `22` |
| Name font weight | fontWeight | `"700"` |
| Phone marginTop (below name) | marginTop | `4` |
| Phone font size | fontSize | `14` |
| Referral card border radius | borderRadius | `12` |
| Referral card border width | borderWidth | `1` |
| Referral card paddingHorizontal | paddingHorizontal | `16` |
| Referral card paddingVertical | paddingVertical | `14` |
| Referral card marginBottom | marginBottom | `24` |
| Referral label font size | fontSize | `12` |
| Referral value font size | fontSize | `18` |
| Referral value weight | fontWeight | `"700"` |
| Copy icon size | size | `22` |
| Menu container border radius | borderRadius | `14` |
| Menu container marginBottom | marginBottom | `24` |
| Menu row paddingHorizontal | paddingHorizontal | `16` |
| Menu row paddingVertical | paddingVertical | `18` |
| Menu icon size | size | `22` |
| Menu icon-to-label gap | gap | `14` |
| Menu label font size | fontSize | `15` |
| Separator height | height | `1` |
| Separator marginHorizontal | marginHorizontal | `16` |
| Chevron icon size | size | `22` |
| Logout button border width | borderWidth | `1.5` |
| Logout button border radius | borderRadius | `12` |
| Logout button paddingVertical | paddingVertical | `16` |
| Logout icon size | size | `20` |
| Logout icon-to-text gap | gap | `8` |
| Logout text font size | fontSize | `16` |
| Logout text weight | fontWeight | `"600"` |
| Bottom spacer height | height | `20` |

---

## 14. Critical Implementation Rules (Do NOT Violate)

1. **The avatar circle has absolutely nothing inside it** — no icon, no text, no image, no initials. It is `<View style={[styles.avatarCircle, { backgroundColor: colors.primary }]} />` with no children.

2. **The page title "Profile" is centered** — use `alignItems: "center"` on the header View. This is the same pattern as the Earnings and Lead History screens, NOT the same as the older employee screens which have left-aligned titles.

3. **The referral code value colour is `colors.primary`** (blue). The label text colour is `colors.onSurfaceVariant` (grey). Do NOT swap them.

4. **All three menu icons use `colors.onSurfaceVariant`** — NOT `colors.primary`. The icons in this design are grey, NOT blue.

5. **The separator line is `marginHorizontal: 16`** (inset from card edges) — it does NOT span full width inside the container. This matches the screenshot where you can see the line doesn't touch the edges.

6. **The Log Out button has NO background fill** — `backgroundColor` must NOT be set on the button, or if set, it must be transparent. The screenshot shows a white/transparent interior with a blue border outline only.

7. **`overflow: "hidden"` is required on `menuContainer`** — without it, the `borderRadius: 14` will not clip the internal `TouchableOpacity` press-ripple/highlight animations correctly on Android.

8. **The Log Out icon is `"logout"`** — NOT `"logout-variant"`, NOT `"exit-to-app"`, NOT `"power"`. The `"logout"` icon shows an arrow pointing out of a box, matching the screenshot.

9. **NO shadow or elevation** on any element in this screen — the referral card, the menu container, and the logout button have no shadows. Only `borderWidth` creates visual separation.

10. **The referral value text `"LM-AGT-2026"` is hardcoded** mock data — it includes capital letters and hyphens exactly as shown.

11. **`React.Fragment` with `key={item.id}`** is required when wrapping the menu row and separator together in the map — do NOT use a plain `View` as the wrapper (it would break the `overflow: "hidden"` visual on the container).

12. **`hitSlop` on the copy icon button** — required so the small icon is easy to tap on mobile. Use `{ top: 8, bottom: 8, left: 8, right: 8 }`.

---

## 15. Visual Checklist — Verify Against Screenshot

Before declaring the implementation done, verify each item below matches the reference screenshot exactly:

- [ ] Page title is `"Profile"` — singular, centered, bold, Manrope 22px
- [ ] Avatar is a large **solid blue circle** (`colors.primary`) — NO icon or text inside it
- [ ] Avatar is `100×100` with `borderRadius: 50` — a perfect circle
- [ ] User name is `"John Agent"` — Manrope 22px bold, centered, `marginTop: 16` from circle
- [ ] Phone is `"+91 9876543210"` — NO spaces between digits, Inter 14px grey, centered
- [ ] Referral code card has a visible `borderWidth: 1` grey outline
- [ ] Label inside card is `"Referral Code"` — small grey Inter text
- [ ] Value inside card is `"LM-AGT-2026"` — Manrope 18px bold, **blue** (`colors.primary`)
- [ ] Copy icon is on the **right** side of the referral card, grey, `size: 22`
- [ ] Menu section has a **white background** (`colors.surfaceContainerLowest`) but NO visible border around the container
- [ ] Menu row 1: `"information-outline"` icon + `"About LeadMaster"` label + right chevron
- [ ] Menu row 2: `"link-variant"` icon + `"Share App Download Link"` label + right chevron
- [ ] Menu row 3: `"help-circle-outline"` icon + `"Help & Support"` label + right chevron
- [ ] Thin separator lines appear **between** rows 1-2 and 2-3, but NOT after row 3
- [ ] Separators are inset from the edges (`marginHorizontal: 16`), not full-width
- [ ] Log Out button has a **blue border** (`colors.primary`), **transparent fill**
- [ ] Log Out button contains: `"logout"` icon left + `"Log Out"` text, both in `colors.primary` blue
- [ ] Icon and text inside Log Out button are **centered** as a group
- [ ] Page background is light grey (`colors.surface`), not white
- [ ] `"Profile"` tab in bottom bar is **active** — filled `"account-circle"` icon, blue label, blue indicator bar
- [ ] Bottom bar shows: Dashboard · Leads · Earnings · Profile (left to right, in that order)
