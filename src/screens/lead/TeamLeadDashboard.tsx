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

interface PendingSubmission {
  id: string;
  icon: string;
  iconColor: string;
  title: string;
  submittedBy: string;
  timeAgo: string;
}

const pendingSubmissions: PendingSubmission[] = [
  {
    id: "1",
    icon: "inventory-2",
    iconColor: "",
    title: "Project Delta Completion",
    submittedBy: "Sarah Jenkins",
    timeAgo: "22m ago",
  },
  {
    id: "2",
    icon: "schedule",
    iconColor: "",
    title: "Weekly Inventory Audit",
    submittedBy: "Marcus Chen",
    timeAgo: "1h ago",
  },
  {
    id: "3",
    icon: "assignment-late",
    iconColor: "",
    title: "Shift Exception Report",
    submittedBy: "Elena Rodriguez",
    timeAgo: "3h ago",
  },
];

const navItems = [
  { icon: "view-dashboard", label: "Dashboard", active: true },
  { icon: "account-group", label: "Team", active: false },
  { icon: "fact-check", label: "Review", active: false },
  { icon: "dots-horizontal", label: "More", active: false },
];

export default function TeamLeadDashboard() {
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
            <Text style={[styles.headerTitle, { color: colors.onSurface }]}>Team Oversight</Text>
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

          {/* User Profile */}
          <View style={styles.profileSection}>
            <Image
              source={{
                uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeW-KcZzGxG8Wlt4H55mtHQoSm_0X85XApPGgBVgLpj0GBQ0npa0moBb6YKRdDHdHG2ND2uEwUT4_r0uQT4FtYxrxd35QazHuOrXbjuM-AJtPH37tzbC8mkS9ZI7X6daPfnpd5Eyhtqzta_i_XskM_6ilYIIdJQJMD66OkCuo_WJS6ckqnvakKiktVCWqtGBoAu8flo4Ndedu3_wkDPGAweu2TafhRVm1SFGRP_vDXeb7LhWS73LVJ0RqQ2O1oE4s5JEZjjgAXYg",
              }}
              style={styles.profileImage}
            />
          </View>

          {/* Active Employees Card */}
          <View style={[styles.card, { backgroundColor: colors.surfaceContainerLow }]}>
            <View style={styles.cardHeader}>
              <Text style={[styles.cardTitle, { color: colors.onSurface }]}>Active Employees</Text>
            </View>
            <View style={styles.activeEmployeesRow}>
              <Text style={[styles.employeeCount, { color: colors.onSurface }]}>24</Text>
              <View style={[styles.newBadge, { backgroundColor: colors.secondaryContainer }]}>
                <Text style={[styles.newBadgeText, { color: colors.secondary }]}>+3 today</Text>
              </View>
            </View>
            <View style={styles.avatarStack}>
              <Image
                source={{
                  uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuAn_kHsnW3qNl-44w0ngXD4PjuH8VX-PNUmZtTARzqw56unFnUHx8a6Tb7xIY7h5IQjqLWNJPrwgpY1Y9r1ZiRIdgDuDyxlr4S24U5ZieeMAeVxMtnZcY-CVeArnXdrVxFo4lYpV898dLZ0_Nd8ENffr8TC1z2XbIB9wZ4C3TaNKmjrDU_pnFD4C8lG9PegYADcBrc1OD07C4IWBkuwFm7V1x0uLTn6HQ16FUILftoXuCQ4pYQtFJVNvwFyLR1hWmZYTb70Vt-PPQ",
                }}
                style={styles.stackAvatar}
              />
              <Image
                source={{
                  uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuD8Yjj2OXLgs8jRu5uk9j3BGeu2_iZMJo853zcNaiXX-2rruIivuXc9dZu7g6HMqExHalefu-nwPhvI_n1giyKyv_fkLuHxXymGBz80bj6CFsTWlZnpOUrEALqBxJ9NjCu_NpLaIwo3mK8MPlgAvn7JlDoKOgGLuCRa0xpgUBASXBRff81xsjkHKIJAkBBALTcEqPIrcJRdrqG1olQ4VBnQlAvkWG2FwvcW9-m1VDicL63Ie14hjdHKEcEpDHhFVIw5zfLIP7c1fg",
                }}
                style={styles.stackAvatar}
              />
              <Image
                source={{
                  uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuA80AAWrI2NGyLiKrRrNfc_GIWKuz7mytwnOL3rqzLblJDb4-S1CCLByc5z5fHpudGdKMTHwq5eBfK0kGc1KlVJC3a0PZRaFU-1t6Hu3hNErkQ99nUpadgtwYpM-a9IVRlzbb4whcwYDxD2HuNDf29lM-dWEkBsZ2Bz3EaBgxAhRFpTKwkPQjCoEVh12-nmvht9kWctmoTLPKsJYJ6jNn0iXAS6hmfdQqhdfhoVCCQDrvkjeo74K_Pc3PQYFviN42VpfPdLNNsm6A",
                }}
                style={styles.stackAvatar}
              />
              <View style={[styles.moreAvatar, { backgroundColor: colors.primaryFixedDim }]}>
                <Text style={[styles.moreAvatarText, { color: colors.onPrimaryFixed }]}>+21</Text>
              </View>
            </View>
          </View>

          {/* Work Completion Card */}
          <View style={[styles.card, { backgroundColor: colors.surfaceContainerLow }]}>
            <Text style={[styles.cardTitle, { color: colors.onSurface }]}>Work Completion %</Text>
            <Text style={[styles.completionPercent, { color: colors.onSurface }]}>87.5%</Text>
            <Text style={[styles.completionSubtext, { color: colors.onSurfaceVariant }]}>142 of 162 tasks submitted</Text>
          </View>

          {/* Team Earnings Card */}
          <View style={[styles.card, styles.earningsCard, { backgroundColor: colors.primaryContainer }]}>
            <Text style={[styles.cardTitle, styles.earningsCardTitle, { color: colors.onPrimaryContainer }]}>Team Earnings</Text>
            <Text style={[styles.earningsAmount, { color: colors.onPrimaryContainer }]}>$12,840.00</Text>
            <View style={styles.earningsTrend}>
              <MaterialCommunityIcons
                name="trending-up"
                size={16}
                color={colors.success}
              />
              <Text style={[styles.earningsTrendText, { color: colors.onPrimaryContainer }]}>12% increase from last week</Text>
            </View>
          </View>

          {/* Pending Submissions Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>Pending Submissions</Text>
            <Text style={[styles.sectionSubtitle, { color: colors.onSurfaceVariant }]}>4 Awaiting</Text>

            {pendingSubmissions.map((submission) => (
              <TouchableOpacity key={submission.id} style={[styles.submissionCard, { backgroundColor: colors.surfaceContainerLow }]}>
                <View style={styles.submissionIconContainer}>
                  <MaterialCommunityIcons
                    name={submission.icon as any}
                    size={28}
                    color={submission.id === "3" ? colors.error : colors.tertiary}
                  />
                </View>
                <View style={styles.submissionContent}>
                  <Text style={[styles.submissionTitle, { color: colors.onSurface }]}>{submission.title}</Text>
                  <Text style={[styles.submissionMeta, { color: colors.onSurfaceVariant }]}>
                    Submitted by {submission.submittedBy} • {submission.timeAgo}
                  </Text>
                  <View style={styles.submissionActions}>
                    <TouchableOpacity>
                      <Text style={[styles.detailsBtn, { color: colors.primary }]}>Details</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.reviewNowBtn, { backgroundColor: colors.primary }]}>
                      <Text style={[styles.reviewNowBtnText, { color: colors.onPrimary }]}>Review Now</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))}

            <TouchableOpacity style={styles.viewAllLink}>
              <Text style={[styles.viewAllLinkText, { color: colors.primary }]}>View All Pending History</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.bottomSpacer} />
        </ScrollView>

        {/* Floating Action Buttons */}
        <View style={styles.floatingButtons}>
          <TouchableOpacity style={[styles.fabPrimary, { backgroundColor: colors.primary }]}>
            <MaterialCommunityIcons name="calendar-clock" size={24} color={colors.onPrimary} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.fabSecondary, { backgroundColor: colors.secondaryContainer }]}>
            <MaterialCommunityIcons
              name="chat-outline"
              size={24}
              color={colors.onSecondaryContainer}
            />
          </TouchableOpacity>
        </View>

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
                style={[
                  styles.navLabel,
                  { color: item.active ? colors.primary : colors.onSurfaceVariant },
                  item.active && styles.navLabelActive,
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
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontFamily: "Manrope",
    fontSize: 24,
    fontWeight: "700",
  },
  headerRight: {
    flexDirection: "row",
    gap: 8,
  },
  notificationBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  themeToggleBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  profileSection: {
    marginBottom: 20,
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  cardTitle: {
    fontFamily: "Manrope",
    fontSize: 16,
    fontWeight: "600",
  },
  activeEmployeesRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  employeeCount: {
    fontFamily: "Manrope",
    fontSize: 32,
    fontWeight: "700",
  },
  newBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  newBadgeText: {
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: "500",
  },
  avatarStack: {
    flexDirection: "row",
    marginLeft: -4,
  },
  stackAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#ffffff",
    marginLeft: -8,
  },
  moreAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -8,
  },
  moreAvatarText: {
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: "600",
  },
  completionPercent: {
    fontFamily: "Manrope",
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 4,
  },
  completionSubtext: {
    fontFamily: "Inter",
    fontSize: 14,
  },
  earningsCard: {},
  earningsCardTitle: {},
  earningsAmount: {
    fontFamily: "Manrope",
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 4,
  },
  earningsTrend: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  earningsTrendText: {
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: "500",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: "Manrope",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontFamily: "Inter",
    fontSize: 14,
    marginBottom: 12,
  },
  submissionCard: {
    flexDirection: "row",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  submissionIconContainer: {
    marginRight: 12,
  },
  submissionContent: {
    flex: 1,
  },
  submissionTitle: {
    fontFamily: "Manrope",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  submissionMeta: {
    fontFamily: "Inter",
    fontSize: 12,
    marginBottom: 8,
  },
  submissionActions: {
    flexDirection: "row",
    gap: 16,
  },
  detailsBtn: {
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: "500",
  },
  reviewNowBtn: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  reviewNowBtnText: {
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: "500",
  },
  viewAllLink: {
    alignItems: "center",
    paddingVertical: 8,
  },
  viewAllLinkText: {
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: "500",
  },
  bottomSpacer: {
    height: 120,
  },
  floatingButtons: {
    position: "absolute",
    bottom: 100,
    right: 16,
    gap: 12,
  },
  fabPrimary: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  fabSecondary: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
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