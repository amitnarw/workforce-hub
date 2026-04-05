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
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../context/ThemeContext";
import { AppHeader, MetricCard, PrimaryCard, Button, LineChart } from "../../components/ui";

interface MetricCard {
  id: string;
  title: string;
  value: string;
  trend?: string;
  badge?: string;
  badgeColor?: string;
  icon: string;
  iconBgColor: string;
  iconColor: string;
}

interface ActionItem {
  id: string;
  avatar: string;
  name: string;
  description: string;
  actionText: string;
  actionType: "primary" | "secondary";
}

interface SidebarItem {
  id: string;
  icon: string;
  label: string;
  active?: boolean;
  showLogout?: boolean;
}

const metrics: MetricCard[] = [
  {
    id: "1",
    title: "Total Users",
    value: "12,842",
    trend: "+12%",
    icon: "account-multiple",
    iconBgColor: "secondaryContainer",
    iconColor: "secondary",
  },
  {
    id: "2",
    title: "Pending KYC",
    value: "158",
    badge: "Critical",
    icon: "shield-check",
    iconBgColor: "errorContainer",
    iconColor: "error",
  },
  {
    id: "3",
    title: "Pending Withdrawals",
    value: "$42.3k",
    badge: "24h Limit",
    icon: "cash",
    iconBgColor: "tertiaryContainer",
    iconColor: "onTertiaryContainer",
  },
  {
    id: "4",
    title: "Total Projects",
    value: "892",
    badge: "8 New",
    icon: "folder-multiple",
    iconBgColor: "primaryContainer",
    iconColor: "onPrimaryContainer",
  },
];

const actionItems: ActionItem[] = [
  {
    id: "1",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDwF86E1n4zRfatVMRMI0OvmmCrGF67HyYU5PEV3jfmceHVeszPelGM5b3ubulD6uL5TewLNYKt-mYISjV45-6H_jo1qCm0WUcxkwp9S9_Wi2GBj0OKXkcnJD95kCSq1EiRMVjX2h1LIW13lJV9SMmoPQuaSqrQjxFVZyQwcQcRoxWwIBY6rMpv_4KILaozR2Y1RNPdNgzEYy0hbvTds_s0ZQMIvtYwqk6IB8KZQfoaMrkeSM5TwxL97zofg-PTZp7Xebb9AmqJnA",
    name: "Jordan Miller",
    description: "KYC Document Uploaded",
    actionText: "REVIEW",
    actionType: "primary",
  },
  {
    id: "2",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBIjSNC6u1mxoGYYTnxZJwzn9dvCI9LVstYWLbmCNTXXkUm-b-zjADE9ecCiaXxuhUTmEc78Ywmt56mUH_Umbu_8N2A_p7XS7RJOIqfzmF1wDlSqGEZiGbe02b2mA_ITBR9_3OsDoydRzqLoU09TQm4h-u6oTTihTqMecubNeKAHVg2bYE01gGz_gQeyqpj4IdU_VULZYl9i9Nf86l59mmdI84_nJhSzp3j1MQ_Vj7V9yAHZCfNVHu69CRxj_bcT57TSFBlyZuRWw",
    name: "Sarah Williams",
    description: "Withdrawal: $1,250.00",
    actionText: "APPROVE",
    actionType: "primary",
  },
  {
    id: "3",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAc_3emndu5KlPZ1mnu5Y5FKuCHzlXOd1cpxaZkYQC9NUPzcFR0fq4AMy4URBYnxl-1YVksu3v94wraI6cOzuIVhRnUfY6ey30sv4Ah81BStQ4D5Al7PPseXKObKTlV5KzIwv5lpfSKaD-Jld5Gz80Hc2lJKOM-WFw7KJZKGfo2Svwn05IjnySktlEoTuhPPx654MZWb6nHX5Q2Lj-XNbiB9YBmG-eXcpOO0RhgGohcNL8HvHrI0cWsqHp3FwI4T6N2agMPFUuHwQ",
    name: "Robert Lang",
    description: "New Project Proposal",
    actionText: "VIEW",
    actionType: "secondary",
  },
];

const sidebarItems: SidebarItem[] = [
  { id: "1", icon: "view-dashboard", label: "Dashboard", active: true },
  { id: "2", icon: "account-group", label: "Team Management" },
  { id: "3", icon: "file-document", label: "Tax Documents" },
  { id: "4", icon: "cog", label: "Profile Settings" },
  { id: "5", icon: "logout", label: "Logout", showLogout: true },
];

const weeklyData = [
  { day: "MON", height: 60 },
  { day: "TUE", height: 40 },
  { day: "WED", height: 80 },
  { day: "THU", height: 70 },
  { day: "FRI", height: 90 },
  { day: "SAT", height: 50 },
  { day: "SUN", height: 100 },
];

const mapImages = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD2-tuxJ5BsO60dFvcyE4f6KKzXxZ7GlG_JuvRlwLAxbRWCg8wzE-yNHPgQzVDfk9CIcn0aBTGGgpWDHz4gP_alBFwON-ZsnjAKd6tVeCpH9ZKefFaWBC3T7bmHxALhr7o0pRmvdzLbWuXi0xo7gmzsuMk2ZJPTd9DWHfTSlEVXUsxCO0Re4BT5Zr_bdWmBoO4eOyBbKOx8mSwSJcJ60zHwBhvUTBmmV0GDEv95vabciU1CVe666u-aqoiPIoZBugA1v6lsvOCHmg",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDUokcJPsdslanaSCKXMwrCf5J1wtlh1dHcWKRA9UyKBrZG9n4p348pGH3Alh2dIYuVoK48bAjhYirE9xmPq8Hd51Lkc8nTSZYO0R9WftZApHCQikG15ZeLgqnSQoBaxcZ9jXU2XcrSbzchwKRTOrP1lbGxGfAy0zunqUmsaBGYCznjj5xizG0WdPzUre1iYMAJR-xOXn982lUklen-HLOfVwHGvQ53KsUCMa51VleEcC6VgtOa6kZB3QcBpJOtSwdWUnh-4Y1VFg",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDeiDZ9KXe_c-kziVo_1CX15pnVKl_CN489qITgyKZt7ma-PM-LyQ51hFkx2z3N2ztZZN6YhBQa1ZMVtkJqAI5I5IxM9SjoRbo3bJzPnggXbKPUPPTeTBbHZBkrKOIESVtcmCrwd5g96UVoHiFX2wLI3yXwkQHTOZHjZc6znC-_YPfvYf6_MqjFuXjkk0b90YCsycjK48I7bYOU20J0SL7lYvQJwoFri0tuIGqsd7aAfEj9fWxWR-u15rnvuP1kks2kgAFtXOv22g",
];

export default function AdminDashboard() {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.surface }]} edges={["top"]}>
      {/* Fixed Header */}
      <AppHeader
        title="System Overview"
        subtitle="Operational intelligence"
        rightButtons="all"
        onNotificationPress={() => {}}
      />

      <View style={[styles.container, { backgroundColor: colors.surface }]}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Metrics Grid */}
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
                badgeType={metric.id === "2" ? "error" : "info"}
                trend={metric.trend}
                style={styles.metricCardWrapper}
              />
            ))}
          </View>

          {/* System Activity Chart */}
          <View style={[styles.activityCard, { backgroundColor: colors.surfaceContainerLowest }]}>
            <View style={styles.activityHeader}>
              <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>System Activity</Text>
              <View style={styles.activityTabs}>
                <TouchableOpacity style={[styles.activityTab, styles.activityTabActive, { backgroundColor: colors.primary }]}>
                  <Text style={[styles.activityTabText, { color: colors.onPrimary }]}>Last 7 Days</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.activityTab, { backgroundColor: "transparent" }]}>
                  <Text style={[styles.activityTabTextInactive, { color: colors.onSurfaceVariant }]}>Last 30 Days</Text>
                </TouchableOpacity>
              </View>
            </View>
            <LineChart
              data={weeklyData.map((d) => ({ label: d.day, value: d.height }))}
              height={120}
              showLabels
              showValues
            />
            <Text style={[styles.activityFooter, { color: colors.onSurfaceVariant }]}>
              Real-time engagement metrics across all sectors
            </Text>
          </View>

          {/* Action Required Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>Action Required</Text>
              <TouchableOpacity>
                <Text style={[styles.viewAllText, { color: colors.primary }]}>View All Tasks (12)</Text>
              </TouchableOpacity>
            </View>

            {actionItems.map((item) => (
              <View key={item.id} style={[styles.actionCard, { backgroundColor: colors.surfaceContainerLowest }]}>
                <Image source={{ uri: item.avatar }} style={styles.actionAvatar} />
                <View style={styles.actionContent}>
                  <Text style={[styles.actionName, { color: colors.onSurface }]}>{item.name}</Text>
                  <Text style={[styles.actionDescription, { color: colors.onSurfaceVariant }]}>{item.description}</Text>
                </View>
                <TouchableOpacity
                  style={[
                    styles.actionBtn,
                    {
                      backgroundColor: item.actionType === "primary" ? colors.primary : colors.secondaryContainer,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.actionBtnText,
                      { color: item.actionType === "primary" ? colors.onPrimary : colors.onSecondaryContainer },
                    ]}
                  >
                    {item.actionText}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          {/* Bottom Grid */}
          <View style={styles.bottomGrid}>
            {/* Network Expansion */}
            <View style={[styles.networkCard, { backgroundColor: colors.surfaceContainerLowest }]}>
              <View style={styles.networkHeader}>
                <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>Network Expansion</Text>
                <TouchableOpacity style={[styles.accessMapsBtn, { backgroundColor: colors.secondaryContainer }]}>
                  <MaterialCommunityIcons name="web" size={16} color={colors.onSecondaryContainer} />
                  <Text style={[styles.accessMapsText, { color: colors.onSecondaryContainer }]}>Access Maps</Text>
                </TouchableOpacity>
              </View>
              <Text style={[styles.networkDesc, { color: colors.onSurfaceVariant }]}>
                Manage geo-distributed resources across multiple territories.
              </Text>
              <View style={styles.mapImagesContainer}>
                {mapImages.map((uri, index) => (
                  <Image key={index} source={{ uri }} style={styles.mapImage} />
                ))}
              </View>
            </View>

            {/* Annual Revenue */}
            <PrimaryCard
              title="Annual Revenue"
              subtitle="Target achieved: 104%"
              value="$2.4M"
              trend="+18.4%"
              trendValue="YoY"
              progress={104}
            />
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
    gap: 16,
  },
  headerLeft: {
    flex: 1,
  },
  pageTitle: {
    fontFamily: "Manrope",
    fontSize: 24,
    fontWeight: "700",
    letterSpacing: -0.02,
    marginBottom: 4,
  },
  pageSubtitle: {
    fontFamily: "Inter",
    fontSize: 14,
    lineHeight: 20,
  },
  notificationBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 24,
  },
  metricCard: {
    width: "47%",
    borderRadius: 16,
    padding: 16,
  },
  metricHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 8,
  },
  metricIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  metricTitle: {
    fontFamily: "Inter",
    fontSize: 12,
    marginBottom: 2,
  },
  metricValue: {
    fontFamily: "Manrope",
    fontSize: 24,
    fontWeight: "700",
  },
  metricBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  metricBadgeText: {
    fontFamily: "Inter",
    fontSize: 10,
    fontWeight: "600",
  },
  trendRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  trendText: {
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: "500",
  },
  activityCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  activityHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  activityTabs: {
    flexDirection: "row",
    gap: 8,
  },
  activityTab: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  activityTabActive: {},
  activityTabText: {
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: "600",
  },
  activityTabTextInactive: {
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: "500",
  },
  activityFooter: {
    fontFamily: "Inter",
    fontSize: 12,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
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
  actionCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  actionAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  actionContent: {
    flex: 1,
  },
  actionName: {
    fontFamily: "Manrope",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 2,
  },
  actionDescription: {
    fontFamily: "Inter",
    fontSize: 12,
  },
  actionBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  actionBtnText: {
    fontFamily: "Inter",
    fontSize: 11,
    fontWeight: "600",
  },
  bottomGrid: {
    gap: 16,
    marginBottom: 24,
  },
  networkCard: {
    borderRadius: 16,
    padding: 16,
  },
  networkHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  accessMapsBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  accessMapsText: {
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: "500",
  },
  networkDesc: {
    fontFamily: "Inter",
    fontSize: 12,
    marginBottom: 12,
  },
  mapImagesContainer: {
    flexDirection: "row",
    gap: 12,
  },
  mapImage: {
    width: 80,
    height: 60,
    borderRadius: 8,
  },
  revenueCard: {
    borderRadius: 16,
    padding: 16,
  },
  revenueContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  revenueLeft: {},
  revenueTarget: {
    fontFamily: "Inter",
    fontSize: 12,
    marginBottom: 4,
  },
  revenueAmount: {
    fontFamily: "Manrope",
    fontSize: 36,
    fontWeight: "800",
    marginBottom: 4,
  },
  revenueYoY: {
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: "500",
  },
  circularProgress: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  circularProgressText: {
    fontFamily: "Manrope",
    fontSize: 20,
    fontWeight: "700",
  },
  sidebar: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  sidebarHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#c5c5d4",
  },
  sidebarAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  sidebarName: {
    fontFamily: "Manrope",
    fontSize: 16,
    fontWeight: "600",
  },
  sidebarRole: {
    fontFamily: "Inter",
    fontSize: 12,
  },
  sidebarItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 4,
  },
  sidebarLabel: {
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: "500",
  },
});