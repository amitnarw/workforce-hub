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

interface Assignment {
  id: string;
  icon: string;
  title: string;
  badge?: string;
  dueTime: string;
  isNew?: boolean;
}

interface NavItem {
  icon: string;
  label: string;
}

const assignments: Assignment[] = [
  {
    id: "1",
    icon: "inventory-2",
    title: "Inventory Management",
    badge: "New",
    dueTime: "04:00 PM",
    isNew: true,
  },
  {
    id: "2",
    icon: "local-shipping",
    title: "Logistics Verification",
    dueTime: "06:30 PM",
  },
];

const navItems: NavItem[] = [
  { icon: "view-dashboard", label: "Dashboard" },
  { icon: "account-group", label: "Team" },
  { icon: "fact-check", label: "Review" },
  { icon: "dots-horizontal", label: "More" },
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
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Image
                source={{
                  uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuA6Cgam_584-LYEDKhBLuwo0IdSO4IZiEVK0ePIXjaME25UVkhLaGytqEsWkZ9qXq-HwAwpuZR63mGL2NqV8fJCp_kBcyhuas7GywNq0weswAywcYbbVUEcboTjtelkg3tikgVevDvbaDha5Kyu0LFM1w6nr5k0Nb4TN1klv7eDhIXrqGRuE7Q66Gpk_460UR_-V3aQ18GdzjHhT7bQZLbYxPbid-A8lDSvOgIJheg_TDk-8ycUnH1gMc-VZR6fleYxvG33r0bzVA",
                }}
                style={styles.profileImage}
              />
            </View>
            <View style={styles.headerCenter}>
              <Text style={[styles.logo, { color: colors.primary }]}>Workforce Hub</Text>
            </View>
            <View style={styles.headerRight}>
              <TouchableOpacity style={[styles.themeToggleBtn, { backgroundColor: colors.surfaceContainerLow }]} onPress={toggleTheme}>
                <MaterialCommunityIcons
                  name={isDark ? "weather-sunny" : "weather-night"}
                  size={20}
                  color="#ffffff"
                />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.notificationBtn, { backgroundColor: colors.surfaceContainerLow }]}>
                <MaterialCommunityIcons
                  name="bell-outline"
                  size={22}
                  color="#ffffff"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Greeting Section */}
          <View style={styles.greetingSection}>
            <Text style={[styles.greetingText, { color: colors.onSurface }]}>Hello, Alex</Text>
            <Text style={[styles.greetingSubtext, { color: colors.onSurfaceVariant }]}>
              Tuesday, Oct 24th • 2 tasks remaining
            </Text>
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
              <TouchableOpacity style={[styles.balanceActionBtn, { backgroundColor: colors.primary }]}>
                <Text style={[styles.balanceActionText, { color: colors.onPrimary }]}>Withdraw Funds</Text>
              </TouchableOpacity>
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

          {/* Refer a Friend */}
          <View style={[styles.referCard, { backgroundColor: colors.surfaceContainerLow }]}>
            <View style={styles.referContent}>
              <Text style={[styles.referTitle, { color: colors.onSurface }]}>Refer a Friend, Earn $50</Text>
              <Text style={[styles.referDescription, { color: colors.onSurfaceVariant }]}>
                Get rewarded for expanding the team.
              </Text>
              <TouchableOpacity style={[styles.referBtn, { backgroundColor: colors.primary }]}>
                <Text style={[styles.referBtnText, { color: colors.onPrimary }]}>Share Invite</Text>
              </TouchableOpacity>
            </View>
            <MaterialCommunityIcons
              name="party-popper"
              size={48}
              color={colors.primary}
              style={styles.referIcon}
            />
          </View>

          <View style={styles.bottomSpacer} />
        </ScrollView>

        {/* Bottom Navigation */}
        <View style={[styles.bottomNav, { backgroundColor: colors.surfaceContainerLowest, borderTopColor: colors.outlineVariant }]}>
          {navItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.navItem}>
              <MaterialCommunityIcons
                name={item.icon as any}
                size={24}
                color={index === 0 ? colors.primary : colors.onSurfaceVariant}
              />
              <Text
                style={[
                  styles.navLabel,
                  { color: index === 0 ? colors.primary : colors.onSurfaceVariant },
                  index === 0 && styles.navLabelActive,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
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
    paddingTop: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerLeft: {
    width: 40,
    alignItems: "flex-start",
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
  },
  headerRight: {
    flexDirection: "row",
    gap: 8,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  logo: {
    fontFamily: "Manrope",
    fontSize: 18,
    fontWeight: "600",
  },
  notificationBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  themeToggleBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  greetingSection: {
    marginBottom: 20,
  },
  greetingText: {
    fontFamily: "Manrope",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
  },
  greetingSubtext: {
    fontFamily: "Inter",
    fontSize: 14,
  },
  alertContainer: {
    marginBottom: 20,
    borderRadius: 12,
    overflow: "hidden",
  },
  alertGradient: {
    padding: 16,
  },
  alertContent: {
    marginBottom: 12,
  },
  alertIconRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 8,
  },
  alertTitle: {
    fontFamily: "Manrope",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  alertSubtitle: {
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 4,
  },
  alertDescription: {
    fontFamily: "Inter",
    fontSize: 14,
  },
  alertAction: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 4,
  },
  alertActionText: {
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: "600",
  },
  balanceCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  balanceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  balanceLabel: {
    fontFamily: "Inter",
    fontSize: 14,
  },
  balanceAmount: {
    fontFamily: "Manrope",
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 16,
  },
  balanceActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  balanceActionBtn: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  balanceActionText: {
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: "600",
  },
  historyBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  historyText: {
    fontFamily: "Inter",
    fontSize: 14,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: "Manrope",
    fontSize: 18,
    fontWeight: "600",
  },
  viewAllText: {
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: "500",
  },
  assignmentCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  assignmentIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  assignmentContent: {
    flex: 1,
  },
  assignmentTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  assignmentTitle: {
    fontFamily: "Manrope",
    fontSize: 16,
    fontWeight: "600",
  },
  newBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  newBadgeText: {
    fontFamily: "Inter",
    fontSize: 10,
    fontWeight: "600",
  },
  scheduleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  scheduleText: {
    fontFamily: "Inter",
    fontSize: 13,
  },
  referCard: {
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  referContent: {
    flex: 1,
  },
  referTitle: {
    fontFamily: "Manrope",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  referDescription: {
    fontFamily: "Inter",
    fontSize: 14,
    marginBottom: 12,
  },
  referBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  referBtnText: {
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: "600",
  },
  referIcon: {
    marginLeft: 16,
  },
  bottomSpacer: {
    height: 80,
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderTopWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
  },
  navLabel: {
    fontFamily: "Inter",
    fontSize: 11,
    marginTop: 4,
  },
  navLabelActive: {
    fontWeight: "600",
  },
});