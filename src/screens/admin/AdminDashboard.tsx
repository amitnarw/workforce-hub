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

interface MetricCard {
  id: string;
  title: string;
  value: string;
  trend?: string;
  badge?: string;
  badgeColor?: string;
  icon: string;
}

interface ActionItem {
  id: string;
  avatar: string;
  name: string;
  role: string;
  description: string;
  actionText: string;
  actionColor: string;
  time: string;
  icon: string;
  iconColor: string;
}

interface SidebarItem {
  id: string;
  icon: string;
  label: string;
  active?: boolean;
}

const metrics: MetricCard[] = [
  {
    id: "1",
    title: "Total Users",
    value: "12,842",
    trend: "+12%",
    icon: "account-group",
  },
  {
    id: "2",
    title: "Pending KYC",
    value: "158",
    badge: "Critical",
    badgeColor: "",
    icon: "shield-lock",
  },
  {
    id: "3",
    title: "Pending Withdrawals",
    value: "$42.3k",
    badge: "24h limit",
    badgeColor: "",
    icon: "cash-multiple",
  },
  {
    id: "4",
    title: "Total Projects",
    value: "892",
    badge: "8 new",
    badgeColor: "",
    icon: "folder-multiple",
  },
];

const actionItems: ActionItem[] = [
  {
    id: "1",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAn_kHsnW3qNl-44w0ngXD4PjuH8VX-PNUmZtTARzqw56unFnUHx8a6Tb7xIY7h5IQjqLWNJPrwgpY1Y9r1ZiRIdgDuDyxlr4S24U5ZieeMAeVxMtnZcY-CVeArnXdrVxFo4lYpV898dLZ0_Nd8ENffr8TC1z2XbIB9wZ4C3TaNKmjrDU_pnFD4C8lG9PegYADcBrc1OD07C4IWBkuwFm7V1x0uLTn6HQ16FUILftoXuCQ4pYQtFJVNvwFyLR1hWmZYTb70Vt-PPQ",
    name: "Jordan Miller",
    role: "KYC",
    description: "Document verification pending",
    actionText: "Review KYC",
    actionColor: "",
    time: "2m ago",
    icon: "file-document",
    iconColor: "",
  },
  {
    id: "2",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD8Yjj2OXLgs8jRu5uk9j3BGeu2_iZMJo853zcNaiXX-2rruIivuXc9dZu7g6HMqExHalefu-nwPhvI_n1giyKyv_fkLuHxXymGBz80bj6CFsTWlZnpOUrEALqBxJ9NjCu_NpLaIwo3mK8MPlgAvn7JlDoKOgGLuCRa0xpgUBASXBRff81xsjkHKIJAkBBALTcEqPIrcJRdrqG1olQ4VBnQlAvkWG2FwvcW9-m1VDicL63Ie14hjdHKEcEpDHhFVIw5zfLIP7c1fg",
    name: "Sarah Williams",
    role: "Withdrawal",
    description: "Request: $1,250.00",
    actionText: "Approve",
    actionColor: "",
    time: "5m ago",
    icon: "bank-transfer",
    iconColor: "",
  },
  {
    id: "3",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA80AAWrI2NGyLiKrRrNfc_GIWKuz7mytwnOL3rqzLblJDb4-S1CCLByc5z5fHpudGdKMTHwq5eBfK0kGc1KlVJC3a0PZRaFU-1t6Hu3hNErkQ99nUpadgtwYpM-a9IVRlzbb4whcwYDxD2HuNDf29lM-dWEkBsZ2Bz3EaBgxAhRFpTKwkPQjCoEVh12-nmvht9kWctmoTLPKsJYJ6jNn0iXAS6hmfdQqhdfhoVCCQDrvkjeo74K_Pc3PQYFviN42VpfPdLNNsm6A",
    name: "Robert Lang",
    role: "New Project",
    description: "Infrastructure Setup - Phase 2",
    actionText: "Assign Team",
    actionColor: "",
    time: "1h ago",
    icon: "folder-plus",
    iconColor: "",
  },
];

const sidebarItems: SidebarItem[] = [
  { id: "1", icon: "view-dashboard", label: "Dashboard", active: true },
  { id: "2", icon: "account-group", label: "Team Management" },
  { id: "3", icon: "file-document", label: "Tax Documents" },
  { id: "4", icon: "cog", label: "Profile Settings" },
  { id: "5", icon: "logout", label: "Logout" },
];

const navItems = [
  { icon: "view-dashboard", label: "Dashboard", active: true },
  { icon: "account-group", label: "Team" },
  { icon: "fact-check", label: "Review" },
  { icon: "dots-horizontal", label: "More" },
];

export default function AdminDashboard() {
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
              <View style={[styles.logoContainer, { backgroundColor: colors.primary }]}>
                <MaterialCommunityIcons
                  name="briefcase"
                  size={24}
                  color={colors.onPrimary}
                />
              </View>
              <Text style={[styles.logoText, { color: colors.primary }]}>Workforce Hub</Text>
            </View>
            <View style={styles.headerRight}>
              <TouchableOpacity style={[styles.navLinks, { backgroundColor: colors.surfaceContainerLow }]}>
                <Text style={styles.navLinkText}>Dashboard</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.navLinks, { backgroundColor: colors.surfaceContainerLow }]}>
                <Text style={[styles.navLinkInactive, { color: colors.onSurfaceVariant }]}>Team</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.navLinks, { backgroundColor: colors.surfaceContainerLow }]}>
                <Text style={[styles.navLinkInactive, { color: colors.onSurfaceVariant }]}>Review</Text>
              </TouchableOpacity>
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

          {/* Admin Profile Card */}
          <View style={[styles.adminCard, { backgroundColor: colors.surfaceContainerLow }]}>
            <View style={styles.adminInfo}>
              <Image
                source={{
                  uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeW-KcZzGxG8Wlt4H55mtHQoSm_0X85XApPGgBVgLpj0GBQ0npa0moBb6YKRdDHdHG2ND2uEwUT4_r0uQT4FtYxrxd35QazHuOrXbjuM-AJtPH37tzbC8mkS9ZI7X6daPfnpd5Eyhtqzta_i_XskM_6ilYIIdJQJMD66OkCuo_WJS6ckqnvakKiktVCWqtGBoAu8flo4Ndedu3_wkDPGAweu2TafhRVm1SFGRP_vDXeb7LhWS73LVJ0RqQ2O1oE4s5JEZjjgAXYg",
                }}
                style={styles.adminAvatar}
              />
              <View>
                <Text style={[styles.adminName, { color: colors.onSurface }]}>System Administrator Alex Morgan</Text>
                <View style={[styles.adminBadge, { backgroundColor: colors.tertiaryFixed }]}>
                  <MaterialCommunityIcons
                    name="shield-account"
                    size={14}
                    color={colors.tertiaryFixedDim}
                  />
                  <Text style={[styles.adminBadgeText, { color: colors.tertiary }]}>Admin</Text>
                </View>
              </View>
            </View>
          </View>

          {/* System Overview Metrics */}
          <View style={styles.metricsGrid}>
            {metrics.map((metric) => (
              <View key={metric.id} style={[styles.metricCard, { backgroundColor: colors.surfaceContainerLowest }]}>
                <View style={styles.metricHeader}>
                  <MaterialCommunityIcons
                    name={metric.icon as any}
                    size={22}
                    color={colors.primary}
                  />
                  {metric.badge && (
                    <View
                      style={[
                        styles.metricBadge,
                        {
                          backgroundColor:
                            metric.id === "2"
                              ? colors.error
                              : metric.id === "3"
                              ? colors.tertiaryFixedDim
                              : colors.success,
                        },
                      ]}
                    >
                      <Text style={styles.metricBadgeText}>{metric.badge}</Text>
                    </View>
                  )}
                </View>
                <Text style={[styles.metricValue, { color: colors.onSurface }]}>{metric.value}</Text>
                <Text style={[styles.metricTitle, { color: colors.onSurfaceVariant }]}>{metric.title}</Text>
                {metric.trend && (
                  <View style={styles.trendRow}>
                    <MaterialCommunityIcons
                      name="trending-up"
                      size={14}
                      color={colors.success}
                    />
                    <Text style={[styles.trendText, { color: colors.success }]}>{metric.trend} from last month</Text>
                  </View>
                )}
              </View>
            ))}
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
              <TouchableOpacity key={item.id} style={[styles.actionCard, { backgroundColor: colors.surfaceContainerLowest }]}>
                <View style={[styles.actionIconContainer, { backgroundColor: colors.surfaceContainerLow }]}>
                  <MaterialCommunityIcons
                    name={item.icon as any}
                    size={24}
                    color={item.id === "1" ? colors.error : item.id === "2" ? colors.primary : colors.secondary}
                  />
                </View>
                <Image source={{ uri: item.avatar }} style={styles.actionAvatar} />
                <View style={styles.actionContent}>
                  <Text style={[styles.actionName, { color: colors.onSurface }]}>{item.name}</Text>
                  <Text style={[styles.actionRole, { color: colors.primary }]}>{item.role}</Text>
                  <Text style={[styles.actionDescription, { color: colors.onSurfaceVariant }]}>{item.description}</Text>
                </View>
                <View style={styles.actionRight}>
                  <TouchableOpacity
                    style={[
                      styles.actionBtn,
                      {
                        backgroundColor:
                          item.id === "1" ? colors.error : item.id === "2" ? colors.primary : colors.secondary,
                      },
                    ]}
                  >
                    <Text style={[styles.actionBtnText, { color: colors.onPrimary }]}>{item.actionText}</Text>
                  </TouchableOpacity>
                  <Text style={[styles.actionTime, { color: colors.onSurfaceVariant }]}>{item.time}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Network Expansion */}
          <View style={[styles.networkCard, { backgroundColor: colors.surfaceContainerLow }]}>
            <View style={styles.networkHeader}>
              <MaterialCommunityIcons
                name="access-point-network"
                size={24}
                color={colors.primary}
              />
              <Text style={[styles.networkTitle, { color: colors.onSurface }]}>Network Expansion</Text>
            </View>
            <View style={[styles.networkMapPlaceholder, { backgroundColor: colors.surfaceContainerHigh }]}>
              <MaterialCommunityIcons
                name="map-marker-radius"
                size={48}
                color={colors.primaryFixedDim}
              />
              <Text style={[styles.networkMapText, { color: colors.onSurfaceVariant }]}>Geographic expansion access maps</Text>
            </View>
          </View>

          {/* Annual Revenue */}
          <View style={[styles.revenueCard, { backgroundColor: colors.surfaceContainerLow }]}>
            <View style={styles.revenueHeader}>
              <Text style={[styles.revenueTitle, { color: colors.onSurface }]}>Annual Revenue</Text>
              <View style={[styles.revenueBadge, { backgroundColor: colors.surfaceContainerHigh }]}>
                <MaterialCommunityIcons
                  name="target"
                  size={16}
                  color={colors.success}
                />
                <Text style={[styles.revenueBadgeText, { color: colors.success }]}>104% Target</Text>
              </View>
            </View>
            <Text style={[styles.revenueAmount, { color: colors.onSurface }]}>$2.4M</Text>
            <View style={styles.revenueTrend}>
              <MaterialCommunityIcons
                name="trending-up"
                size={16}
                color={colors.success}
              />
              <Text style={[styles.revenueTrendText, { color: colors.success }]}>+18.4% YoY</Text>
            </View>
            <View style={styles.revenueProgressContainer}>
              <View style={[styles.revenueProgressBg, { backgroundColor: colors.surfaceContainerHigh }]}>
                <View style={[styles.revenueProgressFill, { width: "104%", backgroundColor: colors.success }]} />
              </View>
              <Text style={[styles.revenueProgressText, { color: colors.success }]}>104%</Text>
            </View>
          </View>

          {/* Sidebar Navigation */}
          <View style={[styles.sidebar, { backgroundColor: colors.surfaceContainerLowest }]}>
            {sidebarItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[styles.sidebarItem, item.active && { backgroundColor: colors.primaryFixed }]}
              >
                <MaterialCommunityIcons
                  name={item.icon as any}
                  size={22}
                  color={item.active ? colors.primary : colors.onSurfaceVariant}
                />
                <Text
                  style={[
                    styles.sidebarLabel,
                    { color: item.active ? colors.primary : colors.onSurfaceVariant },
                    item.active && styles.sidebarLabelActive,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
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
                color={item.active ? colors.primary : colors.onSurfaceVariant}
              />
              <Text
                style={[styles.navLabel, { color: item.active ? colors.primary : colors.onSurfaceVariant }]}
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
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    flexWrap: "wrap",
    gap: 8,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logoContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    fontFamily: "Manrope",
    fontSize: 18,
    fontWeight: "700",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  navLinks: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  navLinkText: {
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: "600",
    color: "#ffffff",
  },
  navLinkInactive: {
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: "500",
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
  adminCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  adminInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  adminAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  adminName: {
    fontFamily: "Manrope",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  adminBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  adminBadgeText: {
    fontFamily: "Inter",
    fontSize: 11,
    fontWeight: "600",
  },
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 24,
  },
  metricCard: {
    width: "47%",
    borderRadius: 12,
    padding: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  metricHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  metricBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  metricBadgeText: {
    fontFamily: "Inter",
    fontSize: 9,
    fontWeight: "700",
    color: "#ffffff",
  },
  metricValue: {
    fontFamily: "Manrope",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 2,
  },
  metricTitle: {
    fontFamily: "Inter",
    fontSize: 12,
    marginBottom: 4,
  },
  trendRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  trendText: {
    fontFamily: "Inter",
    fontSize: 10,
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
  actionCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  actionIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  actionAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  actionContent: {
    flex: 1,
  },
  actionName: {
    fontFamily: "Manrope",
    fontSize: 14,
    fontWeight: "600",
  },
  actionRole: {
    fontFamily: "Inter",
    fontSize: 11,
    fontWeight: "600",
    textTransform: "uppercase",
    marginBottom: 2,
  },
  actionDescription: {
    fontFamily: "Inter",
    fontSize: 12,
  },
  actionRight: {
    alignItems: "flex-end",
    gap: 6,
  },
  actionBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  actionBtnText: {
    fontFamily: "Inter",
    fontSize: 11,
    fontWeight: "600",
  },
  actionTime: {
    fontFamily: "Inter",
    fontSize: 10,
  },
  networkCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  networkHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
  },
  networkTitle: {
    fontFamily: "Manrope",
    fontSize: 16,
    fontWeight: "600",
  },
  networkMapPlaceholder: {
    height: 100,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  networkMapText: {
    fontFamily: "Inter",
    fontSize: 12,
    marginTop: 8,
  },
  revenueCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  revenueHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  revenueTitle: {
    fontFamily: "Manrope",
    fontSize: 16,
    fontWeight: "600",
  },
  revenueBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  revenueBadgeText: {
    fontFamily: "Inter",
    fontSize: 11,
    fontWeight: "600",
  },
  revenueAmount: {
    fontFamily: "Manrope",
    fontSize: 36,
    fontWeight: "700",
    marginBottom: 4,
  },
  revenueTrend: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 12,
  },
  revenueTrendText: {
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: "500",
  },
  revenueProgressContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  revenueProgressBg: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  revenueProgressFill: {
    height: "100%",
    borderRadius: 4,
  },
  revenueProgressText: {
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: "600",
  },
  sidebar: {
    borderRadius: 12,
    padding: 8,
    marginBottom: 24,
  },
  sidebarItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  sidebarLabel: {
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: "500",
  },
  sidebarLabelActive: {
    fontWeight: "600",
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
});