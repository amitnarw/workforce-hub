# 🚨 STRICT IMPLEMENTATION PLAN: Earnings & Profile Screens 🚨

**To the AI Agent executing this plan:**
You previously failed this task because you reused or referenced existing code from the `employee` screens. The user was unhappy because the result looked completely different from their design reference.

**CRITICAL INSTRUCTIONS FOR YOU (THE AI AGENT):**
1. **DO NOT** reuse any code from `src/screens/employee/EarningsScreen.tsx`.
2. **DO NOT** reuse any code from `src/screens/employee/ProfileScreen.tsx`.
3. **DO NOT** try to merge the code below with any existing file contents. 
4. **YOU MUST COMPLETELY REPLACE** the contents of the target files with the exact code provided below. **COPY AND PASTE IT EXACTLY AS PROVIDED.**
5. **DO NOT** add extra imports, state, or UI elements that are not in the code provided below.

---

## 1. Implement `EarningsScreen.tsx`

**Target File:** `src/screens/lead/EarningsScreen.tsx`

If this file already exists, **DELETE ALL ITS CONTENTS** before pasting the code below. Do not try to merge it.

### Exact Code to Paste:

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

## 2. Implement `ProfileScreen.tsx`

**Target File:** `src/screens/lead/ProfileScreen.tsx`

If this file already exists, **DELETE ALL ITS CONTENTS** before pasting the code below. Do not try to merge it.

### Exact Code to Paste:

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

## 3. Link them up in `TeamLeadTabNavigator.tsx`

**Target File:** `src/navigation/TeamLeadTabNavigator.tsx`

If the screens aren't linked, update the arrays at the top of the file to include these new screens.

```tsx
import TeamLeadDashboard from "../screens/lead/TeamLeadDashboard";
import LeadHistoryScreen from "../screens/lead/LeadHistoryScreen";
import EarningsScreen from "../screens/lead/EarningsScreen";
import ProfileScreen from "../screens/lead/ProfileScreen";

const SCREENS = [TeamLeadDashboard, LeadHistoryScreen, EarningsScreen, ProfileScreen];
const SCREEN_NAMES = ["Dashboard", "Leads", "Earnings", "Profile"];
```

### Final Checklist for the AI Agent:
* [ ] Did you paste the FULL code for `src/screens/lead/EarningsScreen.tsx`?
* [ ] Did you paste the FULL code for `src/screens/lead/ProfileScreen.tsx`?
* [ ] Have you verified that NO traces of the `employee` folder screens are in the newly created tab screens?
* [ ] Is "Earnings & Ledger" horizontally centered?
* [ ] Does the Profile avatar circle have absolutely no text inside it?
