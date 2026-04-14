import React, { useState } from "react";
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
import {
  BottomSpacer,
  SummaryGradientCard,
  SectionHeader,
} from "../../components/ui";

interface WorkPointItem {
  id: string;
  title: string;
  description: string;
  points: string;
  time: string;
  icon: string;
  iconColor: string;
}

const workPointHistory: WorkPointItem[] = [
  {
    id: "1",
    title: "Lead Converted",
    description: "Converted Rahul Sharma",
    points: "+150",
    time: "Today, 2:30 PM",
    icon: "account-check",
    iconColor: "#7c3aed",
  },
  {
    id: "2",
    title: "Follow-up Completed",
    description: "Completed 5 follow-ups today",
    points: "+50",
    time: "Today, 11:00 AM",
    icon: "phone-check",
    iconColor: "#2563eb",
  },
  {
    id: "3",
    title: "Bonus Points",
    description: "Monthly performance bonus",
    points: "+100",
    time: "Yesterday",
    icon: "star-circle",
    iconColor: "#16a34a",
  },
  {
    id: "4",
    title: "Weekly Target",
    description: "Achieved weekly lead target",
    points: "+200",
    time: "12 Apr 2026",
    icon: "target",
    iconColor: "#ea580c",
  },
];

type TabType = "Points" | "Earnings";

export default function MyWorkPointScreen() {
  const { colors } = useTheme();
  const [selectedTab, setSelectedTab] = useState<TabType>("Points");

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]} edges={["top"]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.headerTitle, { color: colors.onSurface }]}>
              My Work Points
            </Text>
          </View>

          {/* Tabs */}
          <View style={[styles.tabContainer, { backgroundColor: colors.surfaceContainerLow }]}>
            <TouchableOpacity
              style={[
                styles.tab,
                selectedTab === "Points" && { backgroundColor: colors.primary },
              ]}
              onPress={() => setSelectedTab("Points")}
            >
              <Text
                style={[
                  styles.tabText,
                  { color: selectedTab === "Points" ? colors.onPrimary : colors.onSurfaceVariant },
                ]}
              >
                Points
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tab,
                selectedTab === "Earnings" && { backgroundColor: colors.primary },
              ]}
              onPress={() => setSelectedTab("Earnings")}
            >
              <Text
                style={[
                  styles.tabText,
                  { color: selectedTab === "Earnings" ? colors.onPrimary : colors.onSurfaceVariant },
                ]}
              >
                Earnings
              </Text>
            </TouchableOpacity>
          </View>

          {/* Summary Card */}
          <SummaryGradientCard
            label="Total Work Points"
            value="8,450"
            subtitle="Top 15% this month"
            subtitleColor={colors.onPrimary}
          >
            <TouchableOpacity
              style={[styles.viewDetailsButton, { backgroundColor: colors.onPrimary + "20" }]}
            >
              <Text style={[styles.viewDetailsText, { color: colors.onPrimary }]}>
                View Details
              </Text>
              <MaterialCommunityIcons name="arrow-right" size={16} color={colors.onPrimary} />
            </TouchableOpacity>
          </SummaryGradientCard>

          {/* Work Point History */}
          <View style={styles.section}>
            <SectionHeader title="History" />

            {workPointHistory.map((item) => (
              <View
                key={item.id}
                style={[styles.historyCard, { backgroundColor: colors.surfaceContainerLowest }]}
              >
                <View style={[styles.iconContainer, { backgroundColor: item.iconColor + "20" }]}>
                  <MaterialCommunityIcons
                    name={item.icon as any}
                    size={22}
                    color={item.iconColor}
                  />
                </View>
                <View style={styles.historyContent}>
                  <Text style={[styles.historyTitle, { color: colors.onSurface }]}>
                    {item.title}
                  </Text>
                  <Text style={[styles.historyDescription, { color: colors.onSurfaceVariant }]}>
                    {item.description}
                  </Text>
                </View>
                <View style={styles.pointsContainer}>
                  <Text style={[styles.pointsText, { color: item.iconColor }]}>
                    {item.points}
                  </Text>
                  <Text style={[styles.timeText, { color: colors.onSurfaceVariant }]}>
                    {item.time}
                  </Text>
                </View>
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
  scrollView: { flex: 1 },
  scrollContent: { paddingHorizontal: 16 },
  header: {
    paddingVertical: 12,
  },
  headerTitle: {
    fontFamily: "Manrope",
    fontSize: 24,
    fontWeight: "700",
  },
  tabContainer: {
    flexDirection: "row",
    borderRadius: 10,
    padding: 4,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  tabText: {
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: "600",
  },
  viewDetailsButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 10,
    borderRadius: 8,
  },
  viewDetailsText: {
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: "600",
  },
  section: {
    gap: 12,
  },
  historyCard: {
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
  historyContent: {
    flex: 1,
    gap: 2,
  },
  historyTitle: {
    fontFamily: "Manrope",
    fontSize: 15,
    fontWeight: "600",
  },
  historyDescription: {
    fontFamily: "Inter",
    fontSize: 12,
  },
  pointsContainer: {
    alignItems: "flex-end",
    gap: 2,
  },
  pointsText: {
    fontFamily: "Inter",
    fontSize: 16,
    fontWeight: "700",
  },
  timeText: {
    fontFamily: "Inter",
    fontSize: 11,
  },
});
