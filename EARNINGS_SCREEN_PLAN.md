# Earnings & Ledger Screen — Implementation Plan (Pixel-Perfect)

> **Purpose**: This document is a complete, self-contained specification for building the "Earnings & Ledger" screen in this React Native / Expo project. Follow every instruction exactly. Do NOT invent, simplify, or change anything not described here.

---

## 1. Project Context & Rules

### Tech Stack (Do NOT change)
- **React Native** with **Expo**
- `expo-linear-gradient` → `LinearGradient` — used ONLY for the Total Earnings card
- `@expo/vector-icons` → `MaterialCommunityIcons` for ALL icons
- `react-native-safe-area-context` → `SafeAreaView`, `useSafeAreaInsets`
- **ThemeContext** at `src/context/ThemeContext.tsx` → `useTheme()` → `colors` object
- **StyleSheet.create(...)** for all styles — no plain JS style objects inside JSX, only the `[style, { color: colors.xxx }]` array pattern for dynamic theming
- `ScrollView` from `react-native` for the transactions list
- Font families: `"Manrope"` (all headings/names) and `"Inter"` (all body/labels/amounts/dates)

### File to create
```
src/screens/lead/EarningsScreen.tsx   ← NEW FILE, create this
```

> Do NOT edit or reuse `src/screens/employee/EarningsScreen.tsx`. That is a different screen with different data and layout. The new file goes under `src/screens/lead/`.

### Navigation integration
`TeamLeadTabNavigator.tsx` at `src/navigation/TeamLeadTabNavigator.tsx` already has:
- index 0 → `TeamLeadDashboard` ("Dashboard")
- index 1 → `LeadHistoryScreen` ("Leads")

You must add the new `EarningsScreen` as index 2 ("Earnings"). See **Section 10** for exact changes.

---

## 2. Colour Tokens — Exact Values

All colours come from `useTheme()`. Hex values shown are **light mode** values from `src/context/ThemeContext.tsx`. Always reference by token name, NEVER by hardcoded hex.

| Token name | Hex (light mode) | Usage on this screen |
|---|---|---|
| `colors.surface` | `#f7f9fb` | Page background (SafeAreaView, ScrollView) |
| `colors.surfaceContainerLowest` | `#ffffff` | Each transaction row card background |
| `colors.surfaceContainerHigh` | `#e6e8ea` | Wallet icon background box (semi-transparent overlay inside gradient card) |
| `colors.onSurface` | `#191c1e` | "Recent Transactions" section title; transaction title text |
| `colors.onSurfaceVariant` | `#434655` | Transaction date/time text; empty state text |
| `colors.outlineVariant` | `#c4c5d7` | Transaction card border (1px) |
| `colors.primary` | `#5B8DEF` | LinearGradient start colour (left/top of earnings card) |
| `colors.onPrimary` | `#ffffff` | All text inside the earnings gradient card; wallet icon colour |
| `colors.tertiary` | `#1A7A50` | Transaction icon background fill (light green circle) BG: use `colors.tertiaryFixed` |
| `colors.tertiaryFixed` | `#A0F5C0` | Transaction icon circle background (light mint green) |
| `colors.tertiaryContainer` | `#2E9E70` | Transaction icon arrow colour (medium green) |

### Gradient card colours (LinearGradient)
The Total Earnings card uses a **diagonal gradient from left-top to right-bottom**:
- `gradientStart` = `colors.primary` (`#5B8DEF`) — blue, left side
- `gradientEnd` = `"#1a2fa0"` — deep navy/indigo, right side

> The `gradientEnd` is `"#1a2fa0"` — this is a hardcoded value because no theme token exactly matches the deep indigo visible in the screenshot. This is the ONLY hardcoded colour permitted on this screen.

```
LinearGradient
  colors={[colors.primary, "#1a2fa0"]}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 1 }}
```

---

## 3. Visual Layout Overview

```
SCREEN (SafeAreaView edges=["top"], bg = colors.surface)
│
├── [FIXED HEADER] — centered "Earnings & Ledger" title
│     No back button, no right buttons
│
└── [SCROLLVIEW — full screen below header]
      │
      ├── [TOTAL EARNINGS CARD] — full-width gradient card
      │     Blue→Indigo diagonal gradient, border-radius 16
      │     Left: "Total Earnings" label (small) + "₹ 45,200" large amount
      │     Right: wallet icon in a semi-transparent white box
      │
      ├── [SECTION TITLE] — "Recent Transactions"
      │     Bold, left-aligned, Manrope
      │
      └── [TRANSACTION ROWS — repeated list]
            Each row = white card with border
            Left: circular green icon (down-arrow = credit/income)
            Center: title (2 lines allowed) + date/time
            Right: "+ ₹ 2,500" in green

[BOTTOM TAB BAR] — Dashboard · Leads · Earnings (active) · Profile
```

---

## 4. Page Header

### Visual description
- Full-width centered text: **"Earnings & Ledger"**
- Font: `Manrope`, size `22`, weight `700`, color `colors.onSurface`
- Aligned **center** — NOT left, NOT right
- No back button on the left, no icon button on the right
- Vertical padding: `paddingTop: 16`, `paddingBottom: 14`
- Background: transparent (inherits `colors.surface` from parent)

### Code

```tsx
{/* Page Header */}
<View style={styles.pageHeader}>
  <Text style={[styles.pageTitle, { color: colors.onSurface }]}>
    Earnings & Ledger
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

## 5. Total Earnings Card

### Visual description
- Full-width card (no horizontal margin — it touches the edges of the padded scroll container)
- `borderRadius: 16`
- Blue-to-indigo **diagonal** `LinearGradient` (`start={{ x: 0, y: 0 }}`, `end={{ x: 1, y: 1 }}`)
- `padding: 20` all sides
- `marginBottom: 24` below the card
- Height: auto (content-driven, roughly 110–120px tall)

### Layout inside the card

The card's interior is a **horizontal row** (`flexDirection: "row"`) with:
- **Left block** (`flex: 1`): stacked vertically
  1. "Total Earnings" — label text
  2. "₹ 45,200" — large amount text
- **Right block** (`flexShrink: 0`): wallet icon in a slightly-transparent white box

### Left block — label

- Text: `"Total Earnings"`
- Font: `Inter`, size `13`, weight `400`
- Color: `colors.onPrimary` (`#ffffff`) but at reduced opacity: use `rgba(255, 255, 255, 0.80)` — slightly transparent white, NOT `colors.onPrimary` token (since we need opacity)
- `marginBottom: 8`

> **Important**: Use the literal string `"rgba(255, 255, 255, 0.80)"` for the label colour — do not use `colors.onPrimary` for this specific text since the theme token has no opacity.

### Left block — amount

- Text: `"₹ 45,200"` — note the space between `₹` and the number
- Font: `Manrope`, size `38`, weight `800`
- Color: `colors.onPrimary` (`#ffffff`) — pure white, full opacity
- `lineHeight: 46` — prevents clipping on tall numbers

### Right block — wallet icon box

- A `View` with:
  - `width: 56`, `height: 56`, `borderRadius: 12`
  - `backgroundColor: "rgba(255, 255, 255, 0.18)"` — frosted-glass white overlay effect
  - `alignItems: "center"`, `justifyContent: "center"`
- Inside: `MaterialCommunityIcons name="wallet" size={28} color={colors.onPrimary}`

> The icon name is `"wallet"` (filled, not outline). This matches the square wallet icon visible in the screenshot.

### Complete JSX for the earnings card

```tsx
{/* Total Earnings Card */}
<LinearGradient
  colors={[colors.primary, "#1a2fa0"]}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 1 }}
  style={styles.earningsCard}
>
  {/* Left: label + amount */}
  <View style={styles.earningsCardLeft}>
    <Text style={styles.earningsLabel}>Total Earnings</Text>
    <Text style={[styles.earningsAmount, { color: colors.onPrimary }]}>
      ₹ 45,200
    </Text>
  </View>

  {/* Right: wallet icon box */}
  <View style={styles.earningsIconBox}>
    <MaterialCommunityIcons
      name="wallet"
      size={28}
      color={colors.onPrimary}
    />
  </View>
</LinearGradient>
```

### Styles for the earnings card

```js
earningsCard: {
  borderRadius: 16,
  padding: 20,
  marginBottom: 24,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
},
earningsCardLeft: {
  flex: 1,
  gap: 4,
},
earningsLabel: {
  fontFamily: "Inter",
  fontSize: 13,
  fontWeight: "400",
  color: "rgba(255, 255, 255, 0.80)",   // semi-transparent white — hardcoded intentionally
  marginBottom: 4,
},
earningsAmount: {
  fontFamily: "Manrope",
  fontSize: 38,
  fontWeight: "800",
  lineHeight: 46,
  // color set inline: { color: colors.onPrimary }
},
earningsIconBox: {
  width: 56,
  height: 56,
  borderRadius: 12,
  backgroundColor: "rgba(255, 255, 255, 0.18)",   // frosted-glass — hardcoded intentionally
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
},
```

---

## 6. "Recent Transactions" Section Title

### Visual description
- Text: `"Recent Transactions"`
- Font: `Manrope`, size `20`, weight `700`
- Color: `colors.onSurface` (`#191c1e`)
- Aligned left
- `marginBottom: 14` — gap below the title before the first transaction card

### Code

```tsx
{/* Section title */}
<Text style={[styles.sectionTitle, { color: colors.onSurface }]}>
  Recent Transactions
</Text>
```

### Style

```js
sectionTitle: {
  fontFamily: "Manrope",
  fontSize: 20,
  fontWeight: "700",
  marginBottom: 14,
},
```

---

## 7. Transaction Row Cards — Complete Specification

### Visual anatomy of one row

```
┌─────────────────────────────────────────────────────────┐
│  [Green circle] │  Lead Approved - MSME Loan  │ +₹2,500 │
│   (down arrow)  │  12 Oct 2026 • 10:30 AM     │         │
└─────────────────────────────────────────────────────────┘
```

### Card container

- **Background**: `colors.surfaceContainerLowest` (`#ffffff`)
- **Border**: `borderWidth: 1`, `borderColor: colors.outlineVariant` (`#c4c5d7`)
- **Border radius**: `14`
- **Padding**: `14` all sides
- **Margin bottom**: `10` (gap between cards)
- **Layout**: `flexDirection: "row"`, `alignItems: "center"`, `gap: 12`

### Left: Icon circle

- `View` with:
  - `width: 44`, `height: 44`, `borderRadius: 22` (full circle)
  - `backgroundColor: colors.tertiaryFixed` (`#A0F5C0`) — light mint green
  - `alignItems: "center"`, `justifyContent: "center"`
  - `flexShrink: 0`
- Inside: `MaterialCommunityIcons name="arrow-down" size={22} color={colors.tertiaryContainer}`
  - `colors.tertiaryContainer` = `#2E9E70` — medium green arrow

> The arrow points **downward** (`"arrow-down"`). This represents an **incoming credit** transaction. In the screenshot, ALL transactions show a down-arrow — they are all credits. Do NOT use `"arrow-up"` or any other icon name.

### Center block: title + date/time

The center block takes up all remaining space (`flex: 1`).

**Transaction title**:
- Font: `Manrope`, size `15`, weight `600`
- Color: `colors.onSurface` (`#191c1e`)
- Allows wrapping to 2 lines (`numberOfLines` — do NOT set this; let it wrap naturally)

**Date/time text** (below the title):
- Text: `"12 Oct 2026 • 10:30 AM"` — notice the `•` bullet separator with spaces on both sides
- Font: `Inter`, size `12`, weight `400`
- Color: `colors.onSurfaceVariant` (`#434655`)
- `marginTop: 2`

### Right: Amount text

- Text: `"+ ₹ 2,500"` — note the spaces: `"+"` then space, then `"₹"` then space, then amount
- Font: `Inter`, size `15`, weight `700`
- Color: `colors.tertiaryContainer` (`#2E9E70`) — same medium green as the arrow icon
- `flexShrink: 0`
- `alignSelf: "center"`

---

## 8. Mock Data

Define this data array **outside** the component at the top of the file. This is the ONLY data that drives the list. Use exactly this structure and values to match the screenshot.

```ts
interface Transaction {
  id: string;
  title: string;
  datetime: string;    // Full display string, e.g. "12 Oct 2026 • 10:30 AM"
  amount: string;      // Display string with spaces, e.g. "+ ₹ 2,500"
}

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    title: "Lead Approved - MSME Loan",
    datetime: "12 Oct 2026 • 10:30 AM",
    amount: "+ ₹ 2,500",
  },
  {
    id: "2",
    title: "Lead Approved - MSME Loan",
    datetime: "12 Oct 2026 • 10:30 AM",
    amount: "+ ₹ 2,500",
  },
  {
    id: "3",
    title: "Lead Approved - MSME Loan",
    datetime: "12 Oct 2026 • 10:30 AM",
    amount: "+ ₹ 2,500",
  },
  {
    id: "4",
    title: "Lead Approved - MSME Loan",
    datetime: "12 Oct 2026 • 10:30 AM",
    amount: "+ ₹ 2,500",
  },
  {
    id: "5",
    title: "Lead Approved - MSME Loan",
    datetime: "12 Oct 2026 • 10:30 AM",
    amount: "+ ₹ 2,500",
  },
  {
    id: "6",
    title: "Lead Approved - MSME Loan",
    datetime: "12 Oct 2026 • 10:30 AM",
    amount: "+ ₹ 2,500",
  },
];
```

> The screenshot shows 6 visible transactions, all identical in this mock. Use `id` as the unique key for `.map()`.

---

## 9. Complete EarningsScreen.tsx File

Create this file at: `src/screens/lead/EarningsScreen.tsx`

```tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../context/ThemeContext";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Transaction {
  id: string;
  title: string;
  datetime: string;
  amount: string;
}

// ─── Mock Data ─────────────────────────────────────────────────────────────────

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    title: "Lead Approved - MSME Loan",
    datetime: "12 Oct 2026 • 10:30 AM",
    amount: "+ ₹ 2,500",
  },
  {
    id: "2",
    title: "Lead Approved - MSME Loan",
    datetime: "12 Oct 2026 • 10:30 AM",
    amount: "+ ₹ 2,500",
  },
  {
    id: "3",
    title: "Lead Approved - MSME Loan",
    datetime: "12 Oct 2026 • 10:30 AM",
    amount: "+ ₹ 2,500",
  },
  {
    id: "4",
    title: "Lead Approved - MSME Loan",
    datetime: "12 Oct 2026 • 10:30 AM",
    amount: "+ ₹ 2,500",
  },
  {
    id: "5",
    title: "Lead Approved - MSME Loan",
    datetime: "12 Oct 2026 • 10:30 AM",
    amount: "+ ₹ 2,500",
  },
  {
    id: "6",
    title: "Lead Approved - MSME Loan",
    datetime: "12 Oct 2026 • 10:30 AM",
    amount: "+ ₹ 2,500",
  },
];

// ─── Component ─────────────────────────────────────────────────────────────────

export default function EarningsScreen() {
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
            Earnings & Ledger
          </Text>
        </View>

        {/* Scrollable body */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >

          {/* Total Earnings Card */}
          <LinearGradient
            colors={[colors.primary, "#1a2fa0"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.earningsCard}
          >
            {/* Left: label + amount */}
            <View style={styles.earningsCardLeft}>
              <Text style={styles.earningsLabel}>Total Earnings</Text>
              <Text style={[styles.earningsAmount, { color: colors.onPrimary }]}>
                ₹ 45,200
              </Text>
            </View>

            {/* Right: wallet icon box */}
            <View style={styles.earningsIconBox}>
              <MaterialCommunityIcons
                name="wallet"
                size={28}
                color={colors.onPrimary}
              />
            </View>
          </LinearGradient>

          {/* Section title */}
          <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>
            Recent Transactions
          </Text>

          {/* Transaction rows */}
          {MOCK_TRANSACTIONS.map((txn) => (
            <View
              key={txn.id}
              style={[
                styles.txnCard,
                {
                  backgroundColor: colors.surfaceContainerLowest,
                  borderColor: colors.outlineVariant,
                },
              ]}
            >
              {/* Left: icon circle */}
              <View
                style={[
                  styles.txnIconCircle,
                  { backgroundColor: colors.tertiaryFixed },
                ]}
              >
                <MaterialCommunityIcons
                  name="arrow-down"
                  size={22}
                  color={colors.tertiaryContainer}
                />
              </View>

              {/* Center: title + date */}
              <View style={styles.txnContent}>
                <Text style={[styles.txnTitle, { color: colors.onSurface }]}>
                  {txn.title}
                </Text>
                <Text
                  style={[styles.txnDatetime, { color: colors.onSurfaceVariant }]}
                >
                  {txn.datetime}
                </Text>
              </View>

              {/* Right: amount */}
              <Text
                style={[
                  styles.txnAmount,
                  { color: colors.tertiaryContainer },
                ]}
              >
                {txn.amount}
              </Text>
            </View>
          ))}

          {/* Bottom spacer — keeps last card above the tab bar */}
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
    paddingTop: 4,
  },

  // ── Earnings Card ──
  earningsCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  earningsCardLeft: {
    flex: 1,
  },
  earningsLabel: {
    fontFamily: "Inter",
    fontSize: 13,
    fontWeight: "400",
    color: "rgba(255, 255, 255, 0.80)",
    marginBottom: 4,
  },
  earningsAmount: {
    fontFamily: "Manrope",
    fontSize: 38,
    fontWeight: "800",
    lineHeight: 46,
  },
  earningsIconBox: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.18)",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  // ── Section Title ──
  sectionTitle: {
    fontFamily: "Manrope",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 14,
  },

  // ── Transaction Card ──
  txnCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    marginBottom: 10,
  },
  txnIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  txnContent: {
    flex: 1,
  },
  txnTitle: {
    fontFamily: "Manrope",
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 20,
  },
  txnDatetime: {
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: "400",
    marginTop: 2,
  },
  txnAmount: {
    fontFamily: "Inter",
    fontSize: 15,
    fontWeight: "700",
    flexShrink: 0,
    alignSelf: "center",
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

The current state of the file:
```tsx
import TeamLeadDashboard from "../screens/lead/TeamLeadDashboard";
import LeadHistoryScreen from "../screens/lead/LeadHistoryScreen";

const SCREENS = [TeamLeadDashboard, LeadHistoryScreen];
const SCREEN_NAMES = ["Dashboard", "Leads"];
```

### Required changes — apply these EXACTLY

```tsx
// ADD this import (line 3, after the LeadHistoryScreen import):
import EarningsScreen from "../screens/lead/EarningsScreen";

// REPLACE SCREENS array:
const SCREENS = [TeamLeadDashboard, LeadHistoryScreen, EarningsScreen];

// REPLACE SCREEN_NAMES array:
const SCREEN_NAMES = ["Dashboard", "Leads", "Earnings"];
```

No other changes to `TeamLeadTabNavigator.tsx` are needed.

---

## 11. CustomTabBar.tsx — Verify Earnings Tab Config

Check that `src/components/ui/CustomTabBar.tsx` has an `Earnings` entry in `TAB_CONFIG`. It should already exist. If it is missing, add it:

```ts
Earnings: {
  iconActive: "wallet",
  iconInactive: "wallet-outline",
  label: "Earnings",
},
```

> The exact icon names are `"wallet"` (active/filled) and `"wallet-outline"` (inactive). The label must be exactly `"Earnings"` to match `SCREEN_NAMES[2]`.

When the Earnings tab is active, the wallet icon is filled (`"wallet"`), the label and icon are `colors.primary` blue, and the 2px blue indicator line appears at the bottom of the tab.

---

## 12. Imports Reference

The complete import block for `EarningsScreen.tsx` must be:

```tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../context/ThemeContext";
```

**What NOT to import**:
- Do NOT import `useState` — there is no local state on this screen (no filter pills, no search)
- Do NOT import `useRef` — not needed
- Do NOT import `FlatList` — the list is rendered with `ScrollView` + `.map()`
- Do NOT import `TouchableOpacity` — no tappable elements in the transaction rows
- Do NOT import anything from `react-navigation` — routing is handled by the parent navigator

---

## 13. Pixel-Level Spacing Reference Table

| Element | Property | Value |
|---|---|---|
| SafeAreaView edges | edges | `["top"]` only |
| Page header top padding | paddingTop | `16` |
| Page header bottom padding | paddingBottom | `14` |
| ScrollView horizontal padding | paddingHorizontal | `16` |
| Earnings card border-radius | borderRadius | `16` |
| Earnings card padding | padding | `20` |
| Earnings card bottom margin | marginBottom | `24` |
| Earnings label font size | fontSize | `13` |
| Earnings label bottom margin | marginBottom | `4` |
| Earnings amount font size | fontSize | `38` |
| Earnings amount line height | lineHeight | `46` |
| Wallet icon box size | width/height | `56 × 56` |
| Wallet icon box border-radius | borderRadius | `12` |
| Wallet icon size | size | `28` |
| Section title font size | fontSize | `20` |
| Section title weight | fontWeight | `"700"` |
| Section title bottom margin | marginBottom | `14` |
| Transaction card border-radius | borderRadius | `14` |
| Transaction card border width | borderWidth | `1` |
| Transaction card padding | padding | `14` |
| Transaction card bottom margin | marginBottom | `10` |
| Transaction row gap | gap | `12` |
| Icon circle size | width/height | `44 × 44` |
| Icon circle border-radius | borderRadius | `22` (full circle) |
| Icon size (arrow) | size | `22` |
| Transaction title font size | fontSize | `15` |
| Transaction title weight | fontWeight | `"600"` |
| Transaction title line height | lineHeight | `20` |
| Date/time font size | fontSize | `12` |
| Date/time top margin | marginTop | `2` |
| Amount font size | fontSize | `15` |
| Amount font weight | fontWeight | `"700"` |
| Bottom spacer height | height | `20` |

---

## 14. Critical Implementation Rules (Do NOT Violate)

1. **All colour tokens via `useTheme()`** — the only exceptions are the two deliberately hardcoded `rgba(...)` strings inside the earnings card (`"rgba(255, 255, 255, 0.80)"` for label opacity and `"rgba(255, 255, 255, 0.18)"` for icon box background) and the gradient end `"#1a2fa0"`.

2. **`LinearGradient` is only used for the earnings card** — nowhere else on this screen.

3. **The icon for every transaction is `"arrow-down"`** (MaterialCommunityIcons). The icon circle background is `colors.tertiaryFixed` (mint green). The arrow color is `colors.tertiaryContainer` (medium green). Do NOT use any other icon name for this screen's transaction rows.

4. **The amount colour is `colors.tertiaryContainer`** — matching the arrow icon color. Do NOT use `colors.tertiary` (darker green) or `colors.success` (bright green) or any hardcoded green.

5. **The page title is centered** (`alignItems: "center"` on the header View) — NOT left-aligned. This is different from most screens.

6. **`StyleSheet.create(...)` must contain ALL styles** — never write `style={{ fontFamily: "Inter", ... }}` directly in JSX.

7. **Do NOT add any state** (`useState`) — this screen has no interactive filtering, no search, no tabs. It is a pure display screen.

8. **The `earningsLabel` style uses a hardcoded `color`** inside the StyleSheet: `color: "rgba(255, 255, 255, 0.80)"`. This is intentional. It does NOT follow the `{ color: colors.xxx }` inline pattern because the theme system does not support opacity variants.

9. **`flexShrink: 0` on icon circle and amount text** — prevents them from shrinking when the title text is long and wraps to 2 lines.

10. **The `gap: 12` on `txnCard`** replaces any `marginRight` or `paddingLeft` on individual children. Do NOT add `marginRight: 12` to the icon circle in addition to the gap — this will create double spacing.

11. **ScrollView `contentContainerStyle`** uses `paddingHorizontal: 16` and `paddingTop: 4`. The `style` prop on ScrollView has only `flex: 1`. Do NOT set `paddingHorizontal` on both.

12. **The `bottomSpacer` height is `20`** — small because the tab bar already handles its own safe-area inset via `useSafeAreaInsets` in `CustomTabBar.tsx`.

---

## 15. Visual Checklist — Verify Against Screenshot

Before declaring the implementation done, verify each item below matches the reference screenshot exactly:

- [ ] Page title is `"Earnings & Ledger"` — note the `&` ampersand, NOT `"and"`
- [ ] Page title is **centered** horizontally (not left-aligned)
- [ ] The earnings card is full-width, diagonal gradient from blue (left) to deep navy (right)
- [ ] `"Total Earnings"` label inside card is slightly transparent white (not opaque white)
- [ ] Amount `"₹ 45,200"` is large (38px), bold (800), pure white — note the space between ₹ and number
- [ ] Wallet icon box is a rounded square (~56×56), semi-transparent white, contains a filled wallet icon
- [ ] `"Recent Transactions"` section title is bold, left-aligned, Manrope 20px
- [ ] Each transaction row has a **circle** icon (not rounded square — it is `borderRadius: 22` = full circle)
- [ ] The icon circle is **mint green** (`colors.tertiaryFixed`), arrow is **medium green** (`colors.tertiaryContainer`)
- [ ] Transaction title is `"Lead Approved - MSME Loan"` — note title case and hyphens
- [ ] Date/time is `"12 Oct 2026 • 10:30 AM"` — bullet `•` separator with spaces
- [ ] Amount is `"+ ₹ 2,500"` — note spaces between `+`, `₹`, and the numbers
- [ ] Amount colour is **medium green** (`colors.tertiaryContainer`) — same green as the arrow
- [ ] All 6 transaction rows are visible (the list scrolls to reveal more)
- [ ] Page background is light grey (`colors.surface` = `#f7f9fb`) — NOT pure white
- [ ] Transaction card backgrounds are pure white (`colors.surfaceContainerLowest` = `#ffffff`)
- [ ] `"Earnings"` tab in the bottom bar is **active** — filled wallet icon, blue label, blue indicator bar
- [ ] Bottom bar shows: Dashboard · Leads · Earnings · Profile (in that order, left to right)
