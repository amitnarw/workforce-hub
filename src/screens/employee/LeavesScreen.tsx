import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../context/ThemeContext";
import { AppHeader, MetricCard, PrimaryCard } from "../../components/ui";

const metrics = [
  {
    id: "1",
    title: "Available",
    value: "12",
    icon: "calendar-check",
    iconBgColor: "successContainer",
    iconColor: "success",
    badge: "Days",
  },
  {
    id: "2",
    title: "Used",
    value: "8",
    icon: "calendar-remove",
    iconBgColor: "errorContainer",
    iconColor: "error",
    badge: "Days",
  },
  {
    id: "3",
    title: "Pending",
    value: "2",
    icon: "clock-alert",
    iconBgColor: "warningContainer",
    iconColor: "warning",
    badge: "Requests",
  },
  {
    id: "4",
    title: "Sick Leave",
    value: "5",
    icon: "hospital",
    iconBgColor: "tertiaryContainer",
    iconColor: "tertiary",
    badge: "Days",
  },
];

export default function LeavesScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.surface }]} edges={["top"]}>
      <AppHeader
        title="Leaves"
        subtitle="Manage your time off"
        rightButtons="notification"
        onNotificationPress={() => {}}
      />
      <View style={[styles.container, { backgroundColor: colors.surface }]}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.metricsGrid}>
            {metrics.map((metric) => (
              <MetricCard
                key={metric.id}
                title={metric.title}
                value={metric.value}
                icon={metric.icon}
                iconBgColor={metric.iconBgColor}
                iconColor={metric.iconColor}
                badge={metric.badge}
                badgeType="info"
                style={styles.metricCardWrapper}
              />
            ))}
          </View>
          <PrimaryCard
            title="Leave Balance"
            subtitle="Annual leave remaining"
            value="12 Days"
            trend="60%"
            trendValue="Used"
            progress={60}
            style={styles.balanceCard}
          />
          <View style={styles.bottomSpacer} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
  },
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 24,
  },
  metricCardWrapper: {
    width: "47%",
  },
  balanceCard: {
    marginBottom: 24,
  },
  bottomSpacer: {
    height: 120,
  },
});
