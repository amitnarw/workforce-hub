import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../context/ThemeContext";
import { AppHeader, MetricCard } from "../../components/ui";

const metrics = [
  {
    id: "1",
    title: "Present",
    value: "22",
    icon: "check-circle",
    iconBgColor: "successContainer",
    iconColor: "success",
    badge: "Today",
  },
  {
    id: "2",
    title: "Absent",
    value: "2",
    icon: "account-off",
    iconBgColor: "errorContainer",
    iconColor: "error",
    badge: "Excused",
  },
  {
    id: "3",
    title: "Late",
    value: "3",
    icon: "clock-alert",
    iconBgColor: "warningContainer",
    iconColor: "warning",
    badge: "This Week",
  },
  {
    id: "4",
    title: "Overtime",
    value: "12h",
    icon: "clock-plus",
    iconBgColor: "tertiaryContainer",
    iconColor: "tertiary",
    badge: "+2h",
  },
];

export default function AttendanceScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.surface }]} edges={["top"]}>
      <AppHeader
        title="Attendance"
        subtitle="Track your records"
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
          <View style={[styles.summaryCard, { backgroundColor: colors.surfaceContainerLowest }]}>
            <Text style={[styles.summaryTitle, { color: colors.onSurface }]}>Monthly Summary</Text>
            <View style={styles.summaryRow}>
              <View style={styles.summaryItem}>
                <Text style={[styles.summaryValue, { color: colors.onSurface }]}>96%</Text>
                <Text style={[styles.summaryLabel, { color: colors.onSurfaceVariant }]}>Attendance Rate</Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryItem}>
                <Text style={[styles.summaryValue, { color: colors.onSurface }]}>184</Text>
                <Text style={[styles.summaryLabel, { color: colors.onSurfaceVariant }]}>Days Present</Text>
              </View>
            </View>
          </View>
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
  summaryCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  summaryTitle: {
    fontFamily: "Manrope",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  summaryItem: {
    flex: 1,
    alignItems: "center",
  },
  summaryValue: {
    fontFamily: "Manrope",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 4,
  },
  summaryLabel: {
    fontFamily: "Inter",
    fontSize: 12,
  },
  summaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: "#e0e0e0",
  },
  bottomSpacer: {
    height: 120,
  },
});
