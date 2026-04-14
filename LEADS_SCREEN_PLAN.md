# Lead History Screen — Implementation Plan (Pixel-Perfect)

> **Purpose**: This document is a complete, self-contained specification for building the "Lead History" screen in this React Native / Expo project. Follow every instruction exactly. Do NOT invent, guess, or simplify anything not described here.

---

## 1. Project Context & Rules

### Tech Stack (Do NOT change)
- **React Native** with **Expo**
- `@expo/vector-icons` → `MaterialCommunityIcons` for ALL icons
- `react-native-safe-area-context` → `SafeAreaView`, `useSafeAreaInsets`
- **ThemeContext** at `src/context/ThemeContext.tsx` → `useTheme()` → `colors` object
- **StyleSheet.create(...)** for all styles (no inline style objects except for dynamic color injection)
- `ScrollView` from `react-native` for the list body
- Font families: `Manrope` (headings/names/titles) and `Inter` (body/labels/meta)

### File to create
```
src/screens/lead/LeadHistoryScreen.tsx   ← NEW FILE, create this
```

The existing file at `src/screens/lead/TeamLeadDashboard.tsx` is a **different screen** (the Dashboard). Do not modify it.

### Navigation integration
The `TeamLeadTabNavigator.tsx` at `src/navigation/TeamLeadTabNavigator.tsx` needs to be updated to add the "Leads" tab pointing to this screen. See **Section 9** for exact navigation changes.

---

## 2. Colour Tokens — Exact Values

All colours come from `useTheme()`. The hex values below are the **light mode** values from `src/context/ThemeContext.tsx`. Always reference by token name.

| Token name | Hex (light mode) | Usage in this screen |
|---|---|---|
| `colors.surface` | `#f7f9fb` | Page background (SafeAreaView + ScrollView) |
| `colors.surfaceContainerLowest` | `#ffffff` | Each lead card background |
| `colors.onSurface` | `#191c1e` | Lead name (bold), main text |
| `colors.onSurfaceVariant` | `#434655` | Secondary text: phone number, date |
| `colors.outlineVariant` | `#c4c5d7` | Card border/outline (1px) |
| `colors.primary` | `#5B8DEF` | "All" filter pill active background and border; search icon colour |
| `colors.onPrimary` | `#ffffff` | Text inside "All" active pill |
| `colors.tertiary` | `#1A7A50` | Approved badge border colour |
| `colors.tertiaryContainer` | `#2E9E70` | Approved badge background (medium green) |
| `colors.onTertiary` | `#ffffff` | Approved badge text |
| `colors.warning` | `#f59e0b` | Pending badge border colour |
| `colors.warningContainer` | `#fef3c7` | Pending badge background (light yellow) |
| `colors.onWarningContainer` | `#92400e` | Pending badge text |
| `colors.error` | `#ba1a1a` | Rejected badge border and text colour |
| `colors.errorContainer` | `#ffdad6` | Rejected badge background (light pink/red) |
| `colors.onErrorContainer` | `#93000a` | Rejected badge text |

> **Important**: `colors.warningContainer` and `colors.onWarningContainer` are already defined in `ThemeContext.tsx`. Do NOT hardcode hex values. Always use `colors.<tokenName>`.

---

## 3. Visual Layout Overview

```
SCREEN (SafeAreaView edges=["top"], bg = colors.surface)
│
├── [FIXED / STICKY] Page Header
│     "Lead History" — centered bold title
│     No back button, no right buttons
│
├── [SEARCH BAR ROW]  — horizontal row
│     ├── Search input field (rounded pill, grey bg, placeholder shown)
│     ├── Calendar/date icon button (right of input, inside same container)
│     └── Filter icon button (dark blue rounded square, separate)
│
├── [FILTER PILLS ROW] — horizontal scrollable row
│     Pills: All · Pending · Approved · Rejected
│     "All" is active by default (filled blue pill)
│     Others are inactive (outlined pill, white bg, outline border)
│
└── [SCROLLABLE LEAD CARDS LIST]
      Each card = white rounded rectangle, subtle border
      Lead cards vary by status — see Section 7 for full card spec
```

---

## 4. Page Header

### Visual description
- Full-width centered text: **"Lead History"**
- Font: `Manrope`, size `22`, weight `700`, color `colors.onSurface`
- Vertically centered, no left or right buttons
- Top padding: `16`, bottom padding: `16`
- Background: `colors.surface` (`#f7f9fb`)

### Code

```tsx
{/* Page Header */}
<View style={styles.pageHeader}>
  <Text style={[styles.pageTitle, { color: colors.onSurface }]}>
    Lead History
  </Text>
</View>
```

### Styles

```js
pageHeader: {
  alignItems: "center",
  justifyContent: "center",
  paddingTop: 16,
  paddingBottom: 12,
  paddingHorizontal: 16,
  backgroundColor: colors.surface,   // set inline: { backgroundColor: colors.surface }
},
pageTitle: {
  fontFamily: "Manrope",
  fontSize: 22,
  fontWeight: "700",
  letterSpacing: -0.2,
},
```

---

## 5. Search Bar Row

### Visual description
Looking at the screenshot, the search row has **two distinct elements** side by side:

1. **Left: Search input container** — a wide rounded pill/rectangle that spans most of the width. It contains:
   - A magnifying glass icon on the LEFT inside (grey, 18px)
   - Placeholder text: `"Search by Name, Mobile, Produc..."` (grey, truncated)
   - A calendar icon on the RIGHT inside the same container (grey/blue, 20px, icon name: `calendar-month-outline`)

2. **Right: Filter button** — a dark navy/primary-blue rounded square (44×44, borderRadius 12). Contains a white filter-list icon (`tune-variant` or `filter-variant`, 22px, `colors.onPrimary`).

### Search container background
`colors.surfaceContainerLowest` (`#ffffff`) with a border of `colors.outlineVariant` (`#c4c5d7`), `borderWidth: 1`, `borderRadius: 28`.

### State needed
```ts
const [searchText, setSearchText] = useState("");
```

### Code

```tsx
{/* Search Bar Row */}
<View style={styles.searchRow}>

  {/* Search input container */}
  <View style={[
    styles.searchContainer,
    {
      backgroundColor: colors.surfaceContainerLowest,
      borderColor: colors.outlineVariant,
    }
  ]}>
    {/* Left: magnifying glass icon */}
    <MaterialCommunityIcons
      name="magnify"
      size={20}
      color={colors.onSurfaceVariant}
    />

    {/* Text input */}
    <TextInput
      style={[styles.searchInput, { color: colors.onSurface }]}
      placeholder="Search by Name, Mobile, Produc..."
      placeholderTextColor={colors.onSurfaceVariant}
      value={searchText}
      onChangeText={setSearchText}
    />

    {/* Right: calendar icon */}
    <TouchableOpacity onPress={() => {}}>
      <MaterialCommunityIcons
        name="calendar-month-outline"
        size={22}
        color={colors.onSurfaceVariant}
      />
    </TouchableOpacity>
  </View>

  {/* Filter button */}
  <TouchableOpacity
    style={[styles.filterButton, { backgroundColor: colors.primary }]}
    onPress={() => {}}
    activeOpacity={0.8}
  >
    <MaterialCommunityIcons
      name="tune-variant"
      size={22}
      color={colors.onPrimary}
    />
  </TouchableOpacity>

</View>
```

### Styles

```js
searchRow: {
  flexDirection: "row",
  alignItems: "center",
  gap: 10,
  paddingHorizontal: 16,
  marginBottom: 14,
},
searchContainer: {
  flex: 1,
  flexDirection: "row",
  alignItems: "center",
  borderWidth: 1,
  borderRadius: 28,
  paddingHorizontal: 14,
  paddingVertical: 10,
  gap: 8,
},
searchInput: {
  flex: 1,
  fontFamily: "Inter",
  fontSize: 14,
  fontWeight: "400",
  padding: 0,          // CRITICAL: remove default TextInput padding on Android
  margin: 0,
},
filterButton: {
  width: 44,
  height: 44,
  borderRadius: 12,
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
},
```

---

## 6. Filter Pills Row

### Visual description
A horizontal row of 4 pill-shaped buttons: **All**, **Pending**, **Approved**, **Rejected**.

**Active pill ("All" by default)**:
- Background: `colors.primary` (`#5B8DEF`)
- Text color: `colors.onPrimary` (`#ffffff`)
- Border: none (no border needed when filled)
- Border radius: `20` (full pill shape)

**Inactive pills**:
- Background: `colors.surfaceContainerLowest` (`#ffffff`)
- Text color: `colors.onSurface` (`#191c1e`)
- Border: `1px solid colors.outlineVariant` (`#c4c5d7`)
- Border radius: `20`

**Layout**: horizontal `ScrollView` with `showsHorizontalScrollIndicator={false}`. Gap between pills: `8px`. Container padding: `paddingHorizontal: 16`, `marginBottom: 16`.

### State needed
```ts
const [activeFilter, setActiveFilter] = useState<"All" | "Pending" | "Approved" | "Rejected">("All");
```

### Code

```tsx
{/* Filter Pills Row */}
<ScrollView
  horizontal
  showsHorizontalScrollIndicator={false}
  contentContainerStyle={styles.filterPillsContainer}
  style={styles.filterPillsScroll}
>
  {(["All", "Pending", "Approved", "Rejected"] as const).map((filter) => {
    const isActive = activeFilter === filter;
    return (
      <TouchableOpacity
        key={filter}
        style={[
          styles.filterPill,
          isActive
            ? { backgroundColor: colors.primary, borderColor: colors.primary }
            : { backgroundColor: colors.surfaceContainerLowest, borderColor: colors.outlineVariant },
        ]}
        onPress={() => setActiveFilter(filter)}
        activeOpacity={0.8}
      >
        <Text
          style={[
            styles.filterPillText,
            { color: isActive ? colors.onPrimary : colors.onSurface },
          ]}
        >
          {filter}
        </Text>
      </TouchableOpacity>
    );
  })}
</ScrollView>
```

### Styles

```js
filterPillsScroll: {
  marginBottom: 16,
},
filterPillsContainer: {
  paddingHorizontal: 16,
  gap: 8,
  flexDirection: "row",
  alignItems: "center",
},
filterPill: {
  paddingHorizontal: 18,
  paddingVertical: 8,
  borderRadius: 20,
  borderWidth: 1,
  alignItems: "center",
  justifyContent: "center",
},
filterPillText: {
  fontFamily: "Inter",
  fontSize: 14,
  fontWeight: "500",
},
```

---

## 7. Lead Cards — Complete Specification

### General card anatomy
Each lead card is a white rounded rectangle with a subtle border. The card layout is:

```
┌─────────────────────────────────────────────────────────┐
│  [Lead Name — bold, left]          [Status Badge — right] │
│  📱 +91 XXXXXXXXXX        📅 DD Mon YYYY                 │
│  [Product Tag pill]               Est: ₹X,XX,XXX (green) │
│                                                           │
│  [Optional: Rejection Remark box — only for Rejected]     │
└─────────────────────────────────────────────────────────┘
```

### Card visual specs
- **Background**: `colors.surfaceContainerLowest` (`#ffffff`)
- **Border**: `borderWidth: 1`, `borderColor: colors.outlineVariant` (`#c4c5d7`)
- **Border radius**: `14`
- **Padding**: `16` all sides
- **Margin bottom**: `12` (gap between cards)
- **Margin horizontal**: `16` (page gutters)

### Row 1: Name + Status Badge

**Name text**:
- Font: `Manrope`, size `16`, weight `700`
- Color: `colors.onSurface`

**Status badge** (positioned on the right, vertically centered with the name):
- Shape: pill (`borderRadius: 20`, `paddingHorizontal: 12`, `paddingVertical: 4`)
- Font: `Inter`, size `12`, weight `600`
- Border: `borderWidth: 1.5`
- Status-specific colors — see table below

| Status | Badge bg | Badge border | Badge text color |
|---|---|---|---|
| Approved | `colors.tertiaryContainer` (`#2E9E70`) | `colors.tertiary` (`#1A7A50`) | `colors.onTertiary` (`#ffffff`) |
| Pending | `colors.warningContainer` (`#fef3c7`) | `colors.warning` (`#f59e0b`) | `colors.onWarningContainer` (`#92400e`) |
| Rejected | `colors.errorContainer` (`#ffdad6`) | `colors.error` (`#ba1a1a`) | `colors.onErrorContainer` (`#93000a`) |

### Row 2: Phone number + Date

Both items are on the same row, left-aligned phone, right-aligned date.

**Phone number**:
- Icon: `MaterialCommunityIcons name="cellphone"` size `14`, color `colors.onSurfaceVariant`
- Text: `+91 XXXXXXXXXX`
- Font: `Inter`, size `13`, weight `400`, color `colors.onSurfaceVariant`
- Gap between icon and text: `4`

**Date**:
- Icon: `MaterialCommunityIcons name="calendar-outline"` size `14`, color `colors.onSurfaceVariant`
- Text: `"13 Apr 2026"` (formatted as `DD Mon YYYY`)
- Font: `Inter`, size `13`, weight `400`, color `colors.onSurfaceVariant`
- Gap between icon and text: `4`

Row layout: `flexDirection: "row"`, `justifyContent: "space-between"`, `alignItems: "center"`.

### Row 3: Product tag + Est. Amount

**Product tag** (on the left):
- A pill-shaped container: `backgroundColor: colors.surfaceContainerHigh` (`#e6e8ea`), `borderRadius: 8`
- Padding: `paddingHorizontal: 10`, `paddingVertical: 4`
- Text: product name (e.g. "Insurance", "Credit Card", "MSME Loan")
- Font: `Inter`, size `12`, weight `500`, color `colors.onSurface`

**Est. Amount** (on the right — only shown when amount is present):
- Text: `"Est: ₹50,000"` or similar
- Font: `Inter`, size `13`, weight `600`
- Color: `colors.tertiary` (`#1A7A50`) — green colour, same for all statuses

### Optional Row 4: Rejection Remark (Rejected cards only)

This row is ONLY shown when `status === "Rejected"` AND a `rejectionRemark` is present.

It appears as a box INSIDE the card, below row 3, separated by a `marginTop: 10`.

**Visual**:
- Background: `colors.errorContainer` (`#ffdad6`) — very light pink/red
- Border radius: `8`
- Padding: `10` all sides
- Border: none (background is enough)

**Content inside the box** — two sub-rows stacked:
1. Row with icon + "Rejection Remark" bold label:
   - Icon: `MaterialCommunityIcons name="alert-circle-outline"` size `16`, color `colors.error`
   - Text: `"Rejection Remark"` font `Inter`, size `13`, weight `600`, color `colors.error`
2. Below that: remark text body
   - Text: the remark string (e.g. `"CIBIL score is too low (-1)"`)
   - Font: `Inter`, size `12`, weight `400`, color `colors.error`
   - `marginTop: 4`

---

## 8. Mock Data

Define this data array **outside** the component. This drives the list rendering.

```ts
type LeadStatus = "Approved" | "Pending" | "Rejected";

interface Lead {
  id: string;
  name: string;
  phone: string;
  date: string;           // Display string, e.g. "13 Apr 2026"
  product: string;        // Product tag label
  status: LeadStatus;
  estAmount?: string;     // Optional, e.g. "₹50,000" — shown when present
  rejectionRemark?: string; // Optional, only for "Rejected" status
}

const MOCK_LEADS: Lead[] = [
  {
    id: "1",
    name: "Ravi Kumar",
    phone: "+91 9876543210",
    date: "13 Apr 2026",
    product: "Insurance",
    status: "Approved",
    estAmount: "₹50,000",
  },
  {
    id: "2",
    name: "Pooja Singh",
    phone: "+91 9988776655",
    date: "12 Apr 2026",
    product: "Credit Card",
    status: "Pending",
  },
  {
    id: "3",
    name: "Amit Patel",
    phone: "+91 9123456780",
    date: "09 Apr 2026",
    product: "MSME Loan",
    status: "Rejected",
    estAmount: "₹2,00,000",
    rejectionRemark: "CIBIL score is too low (-1)",
  },
  {
    id: "4",
    name: "Sneha Gupta",
    phone: "+91 8877665544",
    date: "04 Apr 2026",
    product: "Insurance",
    status: "Approved",
  },
];
```

---

## 9. Complete LeadHistoryScreen.tsx File

Create this file at: `src/screens/lead/LeadHistoryScreen.tsx`

```tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../context/ThemeContext";

// ─── Types ────────────────────────────────────────────────────────────────────

type LeadStatus = "Approved" | "Pending" | "Rejected";
type FilterType = "All" | "Pending" | "Approved" | "Rejected";

interface Lead {
  id: string;
  name: string;
  phone: string;
  date: string;
  product: string;
  status: LeadStatus;
  estAmount?: string;
  rejectionRemark?: string;
}

// ─── Mock Data ─────────────────────────────────────────────────────────────────

const MOCK_LEADS: Lead[] = [
  {
    id: "1",
    name: "Ravi Kumar",
    phone: "+91 9876543210",
    date: "13 Apr 2026",
    product: "Insurance",
    status: "Approved",
    estAmount: "₹50,000",
  },
  {
    id: "2",
    name: "Pooja Singh",
    phone: "+91 9988776655",
    date: "12 Apr 2026",
    product: "Credit Card",
    status: "Pending",
  },
  {
    id: "3",
    name: "Amit Patel",
    phone: "+91 9123456780",
    date: "09 Apr 2026",
    product: "MSME Loan",
    status: "Rejected",
    estAmount: "₹2,00,000",
    rejectionRemark: "CIBIL score is too low (-1)",
  },
  {
    id: "4",
    name: "Sneha Gupta",
    phone: "+91 8877665544",
    date: "04 Apr 2026",
    product: "Insurance",
    status: "Approved",
  },
];

const FILTERS: FilterType[] = ["All", "Pending", "Approved", "Rejected"];

// ─── Component ─────────────────────────────────────────────────────────────────

export default function LeadHistoryScreen() {
  const { colors } = useTheme();
  const [searchText, setSearchText] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");

  // Filter leads based on active pill and search text
  const filteredLeads = MOCK_LEADS.filter((lead) => {
    const matchesFilter =
      activeFilter === "All" || lead.status === activeFilter;
    const lowerSearch = searchText.toLowerCase();
    const matchesSearch =
      !searchText ||
      lead.name.toLowerCase().includes(lowerSearch) ||
      lead.phone.includes(searchText) ||
      lead.product.toLowerCase().includes(lowerSearch);
    return matchesFilter && matchesSearch;
  });

  // ─── Badge helper ──────────────────────────────────────────────────────────

  const getBadgeStyles = (status: LeadStatus) => {
    switch (status) {
      case "Approved":
        return {
          bg: colors.tertiaryContainer,
          border: colors.tertiary,
          text: colors.onTertiary,
        };
      case "Pending":
        return {
          bg: colors.warningContainer,
          border: colors.warning,
          text: colors.onWarningContainer,
        };
      case "Rejected":
        return {
          bg: colors.errorContainer,
          border: colors.error,
          text: colors.onErrorContainer,
        };
    }
  };

  // ─── Single lead card ──────────────────────────────────────────────────────

  const renderLeadCard = (lead: Lead) => {
    const badge = getBadgeStyles(lead.status);

    return (
      <View
        key={lead.id}
        style={[
          styles.card,
          {
            backgroundColor: colors.surfaceContainerLowest,
            borderColor: colors.outlineVariant,
          },
        ]}
      >
        {/* Row 1: Name + Status Badge */}
        <View style={styles.cardRow1}>
          <Text style={[styles.leadName, { color: colors.onSurface }]}>
            {lead.name}
          </Text>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: badge.bg, borderColor: badge.border },
            ]}
          >
            <Text style={[styles.statusBadgeText, { color: badge.text }]}>
              {lead.status}
            </Text>
          </View>
        </View>

        {/* Row 2: Phone + Date */}
        <View style={styles.cardRow2}>
          <View style={styles.infoItem}>
            <MaterialCommunityIcons
              name="cellphone"
              size={14}
              color={colors.onSurfaceVariant}
            />
            <Text style={[styles.infoText, { color: colors.onSurfaceVariant }]}>
              {lead.phone}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <MaterialCommunityIcons
              name="calendar-outline"
              size={14}
              color={colors.onSurfaceVariant}
            />
            <Text style={[styles.infoText, { color: colors.onSurfaceVariant }]}>
              {lead.date}
            </Text>
          </View>
        </View>

        {/* Row 3: Product Tag + Est. Amount */}
        <View style={styles.cardRow3}>
          <View
            style={[
              styles.productTag,
              { backgroundColor: colors.surfaceContainerHigh },
            ]}
          >
            <Text style={[styles.productTagText, { color: colors.onSurface }]}>
              {lead.product}
            </Text>
          </View>
          {lead.estAmount ? (
            <Text style={[styles.estAmount, { color: colors.tertiary }]}>
              Est: {lead.estAmount}
            </Text>
          ) : null}
        </View>

        {/* Optional Row 4: Rejection Remark — only for Rejected leads */}
        {lead.status === "Rejected" && lead.rejectionRemark ? (
          <View
            style={[
              styles.rejectionBox,
              { backgroundColor: colors.errorContainer },
            ]}
          >
            <View style={styles.rejectionTitleRow}>
              <MaterialCommunityIcons
                name="alert-circle-outline"
                size={16}
                color={colors.error}
              />
              <Text
                style={[styles.rejectionTitle, { color: colors.error }]}
              >
                Rejection Remark
              </Text>
            </View>
            <Text style={[styles.rejectionText, { color: colors.error }]}>
              {lead.rejectionRemark}
            </Text>
          </View>
        ) : null}
      </View>
    );
  };

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.surface }]}
      edges={["top"]}
    >
      <View style={[styles.container, { backgroundColor: colors.surface }]}>

        {/* Page Header */}
        <View style={styles.pageHeader}>
          <Text style={[styles.pageTitle, { color: colors.onSurface }]}>
            Lead History
          </Text>
        </View>

        {/* Search Bar Row */}
        <View style={styles.searchRow}>
          <View
            style={[
              styles.searchContainer,
              {
                backgroundColor: colors.surfaceContainerLowest,
                borderColor: colors.outlineVariant,
              },
            ]}
          >
            <MaterialCommunityIcons
              name="magnify"
              size={20}
              color={colors.onSurfaceVariant}
            />
            <TextInput
              style={[styles.searchInput, { color: colors.onSurface }]}
              placeholder="Search by Name, Mobile, Produc..."
              placeholderTextColor={colors.onSurfaceVariant}
              value={searchText}
              onChangeText={setSearchText}
            />
            <TouchableOpacity onPress={() => {}}>
              <MaterialCommunityIcons
                name="calendar-month-outline"
                size={22}
                color={colors.onSurfaceVariant}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.filterButton, { backgroundColor: colors.primary }]}
            onPress={() => {}}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons
              name="tune-variant"
              size={22}
              color={colors.onPrimary}
            />
          </TouchableOpacity>
        </View>

        {/* Filter Pills Row */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterPillsContainer}
          style={styles.filterPillsScroll}
        >
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterPill,
                  isActive
                    ? {
                        backgroundColor: colors.primary,
                        borderColor: colors.primary,
                      }
                    : {
                        backgroundColor: colors.surfaceContainerLowest,
                        borderColor: colors.outlineVariant,
                      },
                ]}
                onPress={() => setActiveFilter(filter)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.filterPillText,
                    {
                      color: isActive
                        ? colors.onPrimary
                        : colors.onSurface,
                    },
                  ]}
                >
                  {filter}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Leads List */}
        <ScrollView
          style={styles.listScroll}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        >
          {filteredLeads.map((lead) => renderLeadCard(lead))}

          {/* Empty state */}
          {filteredLeads.length === 0 && (
            <View style={styles.emptyState}>
              <MaterialCommunityIcons
                name="clipboard-text-off-outline"
                size={48}
                color={colors.onSurfaceVariant}
              />
              <Text
                style={[styles.emptyStateText, { color: colors.onSurfaceVariant }]}
              >
                No leads found
              </Text>
            </View>
          )}

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
    paddingBottom: 12,
    paddingHorizontal: 16,
  },
  pageTitle: {
    fontFamily: "Manrope",
    fontSize: 22,
    fontWeight: "700",
    letterSpacing: -0.2,
  },

  // ── Search Row ──
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 16,
    marginBottom: 14,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 28,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: "400",
    padding: 0,
    margin: 0,
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  // ── Filter Pills ──
  filterPillsScroll: {
    marginBottom: 16,
  },
  filterPillsContainer: {
    paddingHorizontal: 16,
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  filterPill: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  filterPillText: {
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: "500",
  },

  // ── List ──
  listScroll: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 4,
  },

  // ── Lead Card ──
  card: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
  },
  cardRow1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  leadName: {
    fontFamily: "Manrope",
    fontSize: 16,
    fontWeight: "700",
    flex: 1,
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  statusBadgeText: {
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: "600",
  },
  cardRow2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  infoText: {
    fontFamily: "Inter",
    fontSize: 13,
    fontWeight: "400",
  },
  cardRow3: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  productTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  productTagText: {
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: "500",
  },
  estAmount: {
    fontFamily: "Inter",
    fontSize: 13,
    fontWeight: "600",
  },

  // ── Rejection Remark ──
  rejectionBox: {
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
  rejectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  rejectionTitle: {
    fontFamily: "Inter",
    fontSize: 13,
    fontWeight: "600",
  },
  rejectionText: {
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: "400",
    marginTop: 4,
    marginLeft: 22,   // align with the text after the icon (16px icon + 6px gap)
  },

  // ── Empty State ──
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    gap: 12,
  },
  emptyStateText: {
    fontFamily: "Inter",
    fontSize: 15,
    fontWeight: "400",
  },

  // ── Bottom Spacer ──
  bottomSpacer: {
    height: 20,
  },
});
```

---

## 10. Navigation Changes — TeamLeadTabNavigator.tsx

The existing `TeamLeadTabNavigator.tsx` only has 1 screen: `TeamLeadDashboard`. You must add the `LeadHistoryScreen` as the second tab ("Leads").

**File**: `src/navigation/TeamLeadTabNavigator.tsx`

### What to change

1. **Import** `LeadHistoryScreen` at the top.
2. **Add it** to the `SCREENS` and `SCREEN_NAMES` arrays.
3. **Update `CustomTabBar.tsx`** if needed to ensure the "Leads" tab name matches `SCREEN_NAMES`.

### Updated arrays (apply these exact changes)

```tsx
// BEFORE:
import TeamLeadDashboard from "../screens/lead/TeamLeadDashboard";
const SCREENS = [TeamLeadDashboard];
const SCREEN_NAMES = ["Dashboard"];

// AFTER:
import TeamLeadDashboard from "../screens/lead/TeamLeadDashboard";
import LeadHistoryScreen from "../screens/lead/LeadHistoryScreen";

const SCREENS = [TeamLeadDashboard, LeadHistoryScreen];
const SCREEN_NAMES = ["Dashboard", "Leads"];
```

> The `CustomTabBar.tsx` already has a "Leads" entry in `TAB_CONFIG` with icons `account-multiple` (active) and `account-multiple-outline` (inactive). No changes needed to the tab bar icon configuration.

---

## 11. CustomTabBar.tsx — Verify Leads Tab Config

Check that `CustomTabBar.tsx` at `src/components/ui/CustomTabBar.tsx` already has the following entry (it does, based on existing code):

```ts
Leads: {
  iconActive: "account-multiple",
  iconInactive: "account-multiple-outline",
  label: "Leads",
},
```

If it is missing or different, add/correct it. The label must be exactly `"Leads"` to match `SCREEN_NAMES["Leads"]`.

---

## 12. Imports Reference

The complete import block for `LeadHistoryScreen.tsx` must be:

```tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../context/ThemeContext";
```

> Do NOT import `FlatList` — the lead cards list is rendered with `ScrollView` and `.map()`. Do NOT import `useRef` or `useEffect` unless you add auto-refresh logic later.

---

## 13. Bottom Tab Bar — Context for the Leads Tab

From the screenshot, the bottom tab bar shows 4 tabs: **Dashboard · Leads · Earnings · Profile**. "Leads" is the **active tab** on this screen (the icon is filled/solid and label is `colors.primary` blue).

The existing `CustomTabBar.tsx` already handles active vs inactive states correctly using `isFocused`. When the user navigates to the Leads tab, the active indicator line (2px, `colors.primary`, at the bottom of the tab area) will appear under the Leads icon automatically.

No changes to `CustomTabBar.tsx` are needed for this visual behavior.

---

## 14. Critical Implementation Rules (Do NOT Violate)

1. **All colours are from `useTheme()`** — never hardcode hex values like `"#ffffff"` or `"#ba1a1a"`. Always use `colors.tokenName`.

2. **Font families**: Use `"Manrope"` for names, titles, section headings. Use `"Inter"` for all other text (labels, dates, phone numbers, badge text, remark text).

3. **No `LinearGradient`** anywhere on this screen. All backgrounds are solid colours.

4. **StyleSheet.create(...)** must contain ALL styles. Never create a plain JS object of styles inside JSX (except for the `[style, { color: colors.xxx }]` array pattern to inject theme colours).

5. **The `Rejected` card's rejection remark box** is only rendered when BOTH conditions are true:
   - `lead.status === "Rejected"`
   - `lead.rejectionRemark` is a non-empty string
   Do NOT show the box for Approved or Pending cards.

6. **Est. Amount** is only rendered when `lead.estAmount` is defined (not every lead has it — Pooja Singh's "Pending" card has no amount).

7. **Filter logic**: When a filter pill is active, only show leads whose `status` matches the pill label. "All" shows all leads. The search also stacks on top of the active filter.

8. **`padding: 0, margin: 0`** on `TextInput` is mandatory on Android to prevent unwanted extra spacing inside the search bar.

9. **`flex: 1` on `leadName`** is required so the name doesn't push the status badge off-screen on longer names.

10. **`flexShrink: 0`** on the filter button prevents it from shrinking when the search bar is wide.

---

## 15. Visual Checklist — Verify Against Screenshot

Before declaring the implementation done, verify each item below matches the reference screenshot exactly:

- [ ] Page title "Lead History" is centered, bold, Manrope 22px
- [ ] Search bar is a rounded pill with search icon on left, calendar icon on right
- [ ] Filter button is a small dark-blue rounded square (not circle)
- [ ] "All" pill is filled blue; other pills are white with grey outline border
- [ ] All 4 mock leads are visible in the list
- [ ] Ravi Kumar → "Approved" badge is **green** (medium green bg, dark green border, white text)
- [ ] Pooja Singh → "Pending" badge is **yellow/amber** (light yellow bg, amber border, dark amber text); **no Est. amount shown**
- [ ] Amit Patel → "Rejected" badge is **red** (light pink bg, red border, dark red text); Est. amount in green; rejection remark box visible at the bottom of the card
- [ ] Sneha Gupta → "Approved" badge is green; no Est. amount (can be added if desired)
- [ ] Each card has a `borderWidth: 1` outline visible around it
- [ ] "Leads" tab in bottom tab bar is the active tab (blue icon + label + indicator line)
- [ ] Bottom tab bar shows: Dashboard · Leads · Earnings · Profile (in that order)
- [ ] All icons are from `MaterialCommunityIcons` (@expo/vector-icons)
