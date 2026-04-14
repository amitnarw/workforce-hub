import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../context/ThemeContext";
import {
  BottomSpacer,
  HeaderIconButton,
  SummaryGradientCard,
  SectionHeader,
} from "../../components/ui";

interface EarningItem {
  id: string;
  title: string;
  date: string;
  amount: string;
  icon: string;
  iconColor: string;
}

const earningsHistory: EarningItem[] = [
  {
    id: "1",
    title: "Lead Conversion Bonus",
    date: "Today",
    amount: "+₹1,500",
    icon: "gift",
    iconColor: "#16a34a",
  },
  {
    id: "2",
    title: "Monthly Salary",
    date: "Yesterday",
    amount: "+₹5,000",
    icon: "cash",
    iconColor: "#2563eb",
  },
  {
    id: "3",
    title: "Performance Incentive",
    date: "12 Apr 2026",
    amount: "+₹1,000",
    icon: "star-circle",
    iconColor: "#16a34a",
  },
  {
    id: "4",
    title: "Referral Bonus",
    date: "10 Apr 2026",
    amount: "+₹2,500",
    icon: "account-group",
    iconColor: "#7c3aed",
  },
  {
    id: "5",
    title: "Weekly Target Achievement",
    date: "08 Apr 2026",
    amount: "+₹500",
    icon: "target",
    iconColor: "#2563eb",
  },
];

export default function EarningsScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]} edges={["top"]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {/* Fixed header */}
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: colors.onSurface }]}>
            Earnings
          </Text>
          <HeaderIconButton iconName="calendar-month" />
        </View>

        {/* Fixed summary card */}
        <SummaryGradientCard
          label="Total Earnings"
          value="₹24,500"
          subtitle="+12% from last month"
          pills={[
            { label: "This Month: ₹8,500" },
            { label: "Pending: ₹2,000" },
          ]}
        />

        {/* Scrollable transaction list */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.section}>
            <SectionHeader title="Transaction History" />

            {earningsHistory.map((item) => (
              <View
                key={item.id}
                style={[styles.earningCard, { backgroundColor: colors.surfaceContainerLowest }]}
              >
                <View style={[styles.iconContainer, { backgroundColor: item.iconColor + "20" }]}>
                  <MaterialCommunityIcons
                    name={item.icon as any}
                    size={22}
                    color={item.iconColor}
                  />
                </View>
                <View style={styles.earningContent}>
                  <Text style={[styles.earningTitle, { color: colors.onSurface }]}>
                    {item.title}
                  </Text>
                  <Text style={[styles.earningDate, { color: colors.onSurfaceVariant }]}>
                    {item.date}
                  </Text>
                </View>
                <Text style={[styles.amountText, { color: item.iconColor }]}>
                  {item.amount}
                </Text>
              </View>
            ))}
          </View>

          <BottomSpacer />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1 },
  scrollView: { flex: 1, minHeight: 0 },
  scrollContent: { paddingHorizontal: 16 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontFamily: "Manrope",
    fontSize: 24,
    fontWeight: "700",
  },
  section: {
    gap: 12,
  },
  earningCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  earningContent: {
    flex: 1,
    gap: 2,
  },
  earningTitle: {
    fontFamily: "Manrope",
    fontSize: 15,
    fontWeight: "600",
  },
  earningDate: {
    fontFamily: "Inter",
    fontSize: 12,
  },
  amountText: {
    fontFamily: "Inter",
    fontSize: 16,
    fontWeight: "700",
  },
});
