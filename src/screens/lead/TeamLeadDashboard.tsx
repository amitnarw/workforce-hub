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
import { AppHeader, MetricCard, PrimaryCard, Button, BottomSpacer } from "../../components/ui";

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
    icon: "package-variant",
    iconColor: "#6c3400",
    title: "Project Delta Completion",
    submittedBy: "Sarah Jenkins",
    timeAgo: "22m ago",
  },
  {
    id: "2",
    icon: "clock-outline",
    iconColor: "#6c3400",
    title: "Weekly Inventory Audit",
    submittedBy: "Marcus Chen",
    timeAgo: "1h ago",
  },
  {
    id: "3",
    icon: "clipboard-alert",
    iconColor: "#ba1a1a",
    title: "Shift Exception Report",
    submittedBy: "Elena Rodriguez",
    timeAgo: "3h ago",
  },
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
          <AppHeader
            title="Team Oversight"
            subtitle="Sunday, April 5"
            rightButtons="all"
            onNotificationPress={() => {}}
          />

          {/* User Greeting Section */}
          <View style={styles.greetingSection}>
            <View style={styles.greetingContent}>
              <Text style={[styles.greetingText, { color: colors.onSurfaceVariant }]}>Good Morning,</Text>
              <Text style={[styles.userName, { color: colors.onSurface }]}>Alex</Text>
            </View>
            <Image
              source={{
                uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeW-KcZzGxG8Wlt4H55mtHQoSm_0X85XApPGgBVgLpj0GBQ0npa0moBb6YKRdDHdHG2ND2uEwUT4_r0uQT4FtYxrxd35QazHuOrXbjuM-AJtPH37tzbC8mkS9ZI7X6daPfnpd5Eyhtqzta_i_XskM_6ilYIIdJQJMD66OkCuo_WJS6ckqnvakKiktVCWqtGBoAu8flo4Ndedu3_wkDPGAweu2TafhRVm1SFGRP_vDXeb7LhWS73LVJ0RqQ2O1oE4s5JEZjjgAXYg",
              }}
              style={styles.profileImage}
            />
          </View>

          {/* Metrics Cards - Horizontal Row */}
          <View style={styles.metricsRow}>
            <MetricCard
              title="Active Employees"
              value="24"
              icon="account-group"
              iconBgColor="secondaryContainer"
              iconColor="secondary"
              badge="+3 today"
              style={styles.metricCardWrapper}
            />

            <MetricCard
              title="Work Completion"
              value="87.5%"
              icon="clipboard-check"
              iconBgColor="surfaceContainerHigh"
              iconColor="primary"
              badge="142 of 162"
              style={styles.metricCardWrapper}
            />

            <PrimaryCard
              title="Team Earnings"
              value="$12,840.00"
              trend="12%"
              style={styles.metricCardWrapper}
            />
          </View>

          {/* Pending Submissions Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>Pending Submissions</Text>
              <View style={[styles.sectionBadge, { backgroundColor: colors.errorContainer }]}>
                <Text style={[styles.sectionBadgeText, { color: colors.error }]}>4</Text>
              </View>
            </View>

            {pendingSubmissions.map((submission) => (
              <View key={submission.id} style={[styles.submissionCard, { backgroundColor: colors.surfaceContainerLowest }]}>
                <View style={[styles.submissionIconBox, { backgroundColor: submission.id === "3" ? colors.errorContainer : colors.tertiaryContainer }]}>
                  <MaterialCommunityIcons
                    name={submission.icon as any}
                    size={22}
                    color={submission.id === "3" ? colors.error : colors.tertiary}
                  />
                </View>
                <View style={styles.submissionContent}>
                  <Text style={[styles.submissionTitle, { color: colors.onSurface }]}>{submission.title}</Text>
                  <Text style={[styles.submissionMeta, { color: colors.onSurfaceVariant }]}>
                    {submission.submittedBy} • {submission.timeAgo}
                  </Text>
                  <View style={styles.submissionActions}>
                    <Button
                        title="Details"
                        variant="ghost"
                        size="sm"
                        onPress={() => {}}
                      />
                      <Button
                        title="Review Now"
                        variant="primary"
                        size="sm"
                        onPress={() => {}}
                      />
                  </View>
                </View>
              </View>
            ))}
          </View>

          <BottomSpacer />
        </ScrollView>

        {/* Floating Action Buttons */}
        <View style={styles.floatingButtons}>
          <TouchableOpacity style={[styles.fabPrimary, { backgroundColor: colors.primary }]}>
            <MaterialCommunityIcons name="calendar-clock" size={24} color={colors.onPrimary} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.fabSecondary, { backgroundColor: colors.surfaceContainerHighest }]}>
            <MaterialCommunityIcons name="chat-outline" size={24} color={colors.onSurface} />
          </TouchableOpacity>
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
    paddingBottom: 100,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  headerLeft: {
    gap: 2,
  },
  headerTitle: {
    fontFamily: "Manrope",
    fontSize: 22,
    fontWeight: "700",
    letterSpacing: -0.02,
  },
  headerDate: {
    fontFamily: "Inter",
    fontSize: 13,
    fontWeight: "400",
  },
  headerRight: {
    flexDirection: "row",
    gap: 8,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  greetingSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  greetingContent: {
    gap: 2,
  },
  greetingText: {
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: "400",
  },
  userName: {
    fontFamily: "Manrope",
    fontSize: 24,
    fontWeight: "700",
  },
  profileImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  metricsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 24,
  },
  metricCard: {
    flex: 1,
    borderRadius: 16,
    padding: 14,
    minHeight: 100,
  },
  metricCardWrapper: {
    flex: 1,
  },
  earningsCard: {
    minHeight: 100,
  },
  metricLabel: {
    fontFamily: "Inter",
    fontSize: 11,
    fontWeight: "500",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  metricValueRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  metricValue: {
    fontFamily: "Manrope",
    fontSize: 22,
    fontWeight: "700",
  },
  metricBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  metricBadgeText: {
    fontFamily: "Inter",
    fontSize: 10,
    fontWeight: "600",
  },
  metricSubtext: {
    fontFamily: "Inter",
    fontSize: 11,
    marginTop: 4,
  },
  trendRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 6,
  },
  trendText: {
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: "600",
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 14,
  },
  sectionTitle: {
    fontFamily: "Manrope",
    fontSize: 18,
    fontWeight: "600",
  },
  sectionBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionBadgeText: {
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: "700",
  },
  submissionCard: {
    flexDirection: "row",
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
  },
  submissionIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  submissionContent: {
    flex: 1,
  },
  submissionTitle: {
    fontFamily: "Manrope",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 4,
  },
  submissionMeta: {
    fontFamily: "Inter",
    fontSize: 12,
    marginBottom: 10,
  },
  submissionActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  actionBtn: {
    fontFamily: "Inter",
    fontSize: 13,
    fontWeight: "500",
  },
  reviewBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
  },
  reviewBtnText: {
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: "600",
  },
  floatingButtons: {
    position: "absolute",
    bottom: 90,
    right: 16,
    gap: 10,
  },
  fabPrimary: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#24389c",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  fabSecondary: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#191c1d",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
});
