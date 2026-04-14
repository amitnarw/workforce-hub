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

        {/* Fixed Page Header */}
        <View style={styles.pageHeader}>
          <Text style={[styles.pageTitle, { color: colors.onSurface }]}>
            Earnings & Ledger
          </Text>
        </View>

        {/* Fixed earnings card */}
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

        {/* Scrollable transaction list */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
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
    minHeight: 0,
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
    marginHorizontal: 16,
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