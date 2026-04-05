import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../context/ThemeContext";
import { AppHeader, Button, MetricCard } from "../../components/ui";

interface Assignment {
  id: string;
  icon: string;
  title: string;
  badge?: string;
  dueTime: string;
  isNew?: boolean;
}

const assignments: Assignment[] = [
  {
    id: "1",
    icon: "package-variant",
    title: "Inventory Management",
    badge: "New",
    dueTime: "04:00 PM",
    isNew: true,
  },
  {
    id: "2",
    icon: "truck",
    title: "Logistics Verification",
    dueTime: "06:30 PM",
  },
];

const metrics = [
  {
    id: "1",
    title: "Tasks",
    value: "5",
    icon: "clipboard-check",
    iconBgColor: "primaryContainer",
    iconColor: "primary",
    badge: "Pending",
  },
  {
    id: "2",
    title: "Completed",
    value: "12",
    icon: "check-circle",
    iconBgColor: "successContainer",
    iconColor: "success",
    badge: "Today",
  },
  {
    id: "3",
    title: "Earnings",
    value: "$840",
    icon: "cash",
    iconBgColor: "tertiaryContainer",
    iconColor: "tertiary",
    badge: "Weekly",
  },
  {
    id: "4",
    title: "Rating",
    value: "4.9",
    icon: "star",
    iconBgColor: "warningContainer",
    iconColor: "warning",
    badge: "Excellent",
  },
];

export default function EmployeeDashboard() {
  const { colors, isDark, toggleTheme } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.surface }]} edges={["top"]}>
      <View style={[styles.container, { backgroundColor: colors.surface }]}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <AppHeader
            title="Workforce Hub"
            rightButtons="both"
            onNotificationPress={() => {}}
          />

          {/* Greeting Section */}
          <View style={styles.greetingSection}>
            <Text style={[styles.greetingText, { color: colors.onSurface }]}>Hello, Alex</Text>
            <Text style={[styles.greetingSubtext, { color: colors.onSurfaceVariant }]}>
              Tuesday, Oct 24th • 2 tasks remaining
            </Text>
          </View>

          {/* Horizontal Metrics Div */}
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

          {/* Verification Alert */}
          <TouchableOpacity style={styles.alertContainer}>
            <LinearGradient
              colors={[colors.errorContainer, isDark ? "#5c1a1a" : "#ffdad6"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.alertGradient}
            >
              <View style={styles.alertContent}>
                <View style={styles.alertIconRow}>
                  <MaterialCommunityIcons
                    name="shield-lock"
                    size={20}
                    color={colors.error}
                  />
                  <MaterialCommunityIcons
                    name="alert-circle"
                    size={20}
                    color={colors.error}
                  />
                </View>
                <Text style={[styles.alertTitle, { color: colors.onErrorContainer }]}>Verification Required</Text>
                <Text style={[styles.alertSubtitle, { color: colors.error }]}>Action Required</Text>
                <Text style={[styles.alertDescription, { color: colors.onErrorContainer }]}>
                  Complete your KYC to unlock full withdrawal features.
                </Text>
              </View>
              <View style={styles.alertAction}>
                <Text style={[styles.alertActionText, { color: colors.error }]}>Complete Now</Text>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={20}
                  color={colors.error}
                />
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Current Balance */}
          <View style={[styles.balanceCard, { backgroundColor: colors.surfaceContainerLowest }]}>
            <View style={styles.balanceHeader}>
              <Text style={[styles.balanceLabel, { color: colors.onSurfaceVariant }]}>Current Balance</Text>
              <MaterialCommunityIcons
                name="wallet-outline"
                size={24}
                color={colors.primary}
              />
            </View>
            <Text style={[styles.balanceAmount, { color: colors.onSurface }]}>$1,284.50</Text>
            <View style={styles.balanceActions}>
              <Button
              title="Withdraw Funds"
              variant="primary"
              size="md"
              onPress={() => {}}
            />
            <TouchableOpacity style={styles.historyBtn}>
              <MaterialCommunityIcons
                name="history"
                size={18}
                color={colors.primary}
              />
              <Text style={[styles.historyText, { color: colors.primary }]}>history</Text>
            </TouchableOpacity>
            </View>
          </View>

          {/* Today's Assignments */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>Today's Assignments</Text>
              <TouchableOpacity>
                <Text style={[styles.viewAllText, { color: colors.primary }]}>View All</Text>
              </TouchableOpacity>
            </View>

            {assignments.map((assignment) => (
              <TouchableOpacity key={assignment.id} style={[styles.assignmentCard, { backgroundColor: colors.surfaceContainerLowest }]}>
                <View style={[styles.assignmentIconContainer, { backgroundColor: colors.primaryFixed }]}>
                  <MaterialCommunityIcons
                    name={assignment.icon as any}
                    size={24}
                    color={colors.primary}
                  />
                </View>
                <View style={styles.assignmentContent}>
                  <View style={styles.assignmentTitleRow}>
                    <Text style={[styles.assignmentTitle, { color: colors.onSurface }]}>{assignment.title}</Text>
                    {assignment.isNew && (
                      <View style={[styles.newBadge, { backgroundColor: colors.primary }]}>
                        <Text style={[styles.newBadgeText, { color: colors.onPrimary }]}>{assignment.badge}</Text>
                      </View>
                    )}
                  </View>
                  <View style={styles.scheduleRow}>
                    <MaterialCommunityIcons
                      name="clock-outline"
                      size={14}
                      color={colors.onSurfaceVariant}
                    />
                    <Text style={[styles.scheduleText, { color: colors.onSurfaceVariant }]}>
                      Due: {assignment.dueTime}
                    </Text>
                  </View>
                </View>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={24}
                  color={colors.onSurfaceVariant}
                />
              </TouchableOpacity>
            ))}
          </View>

          <View style={[styles.referCard, { backgroundColor: colors.surfaceContainerLowest }]}>
            <View style={styles.referContent}>
              <Text style={[styles.referTitle, { color: colors.onSurface }]}>Refer a Friend, Earn 0</Text>
              <Text style={[styles.referDescription, { color: colors.onSurfaceVariant }]}>
                Get rewarded for expanding the team.
              </Text>
              <Button title="Share Invite" variant="primary" size="sm" onPress={() => {}} />
            </View>
            <MaterialCommunityIcons name="party-popper" size={48} color={colors.primary} style={styles.referIcon} />
          </View>

          <View style={styles.bottomSpacer} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1 },
  scrollView: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingTop: 16 },
  greetingSection: { marginBottom: 20 },
  greetingText: { fontFamily: "Manrope", fontSize: 24, fontWeight: "700", marginBottom: 4 },
  greetingSubtext: { fontFamily: "Inter", fontSize: 14 },
  metricsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginBottom: 24 },
  metricCardWrapper: { width: "47%" },
  alertContainer: { marginBottom: 20, borderRadius: 12, overflow: "hidden" },
  alertGradient: { padding: 16 },
  alertContent: { marginBottom: 12 },
  alertIconRow: { flexDirection: "row", gap: 8, marginBottom: 8 },
  alertTitle: { fontFamily: "Manrope", fontSize: 16, fontWeight: "600", marginBottom: 2 },
  alertSubtitle: { fontFamily: "Inter", fontSize: 12, fontWeight: "500", marginBottom: 4 },
  alertDescription: { fontFamily: "Inter", fontSize: 14 },
  alertAction: { flexDirection: "row", alignItems: "center", justifyContent: "flex-end", gap: 4 },
  alertActionText: { fontFamily: "Inter", fontSize: 14, fontWeight: "600" },
  balanceCard: { borderRadius: 16, padding: 16, marginBottom: 24, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  balanceHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  balanceLabel: { fontFamily: "Inter", fontSize: 14 },
  balanceAmount: { fontFamily: "Manrope", fontSize: 32, fontWeight: "700", marginBottom: 16 },
  balanceActions: { flexDirection: "row", alignItems: "center", gap: 16 },
  historyBtn: { flexDirection: "row", alignItems: "center", gap: 4 },
  historyText: { fontFamily: "Inter", fontSize: 14 },
  section: { marginBottom: 24 },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  sectionTitle: { fontFamily: "Manrope", fontSize: 18, fontWeight: "600" },
  viewAllText: { fontFamily: "Inter", fontSize: 14, fontWeight: "500" },
  assignmentCard: { flexDirection: "row", alignItems: "center", borderRadius: 12, padding: 16, marginBottom: 12, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 1 },
  assignmentIconContainer: { width: 48, height: 48, borderRadius: 12, alignItems: "center", justifyContent: "center", marginRight: 12 },
  assignmentContent: { flex: 1 },
  assignmentTitleRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 4 },
  assignmentTitle: { fontFamily: "Manrope", fontSize: 16, fontWeight: "600" },
  newBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
  newBadgeText: { fontFamily: "Inter", fontSize: 10, fontWeight: "600" },
  scheduleRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  scheduleText: { fontFamily: "Inter", fontSize: 13 },
  referCard: { borderRadius: 16, padding: 20, flexDirection: "row", alignItems: "center", marginBottom: 24 },
  referContent: { flex: 1 },
  referTitle: { fontFamily: "Manrope", fontSize: 16, fontWeight: "700", marginBottom: 4 },
  referDescription: { fontFamily: "Inter", fontSize: 14, marginBottom: 12 },
  referIcon: { marginLeft: 16 },
  bottomSpacer: { height: 120 },
});
