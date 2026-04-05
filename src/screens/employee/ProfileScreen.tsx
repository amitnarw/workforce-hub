import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../context/ThemeContext";
import { AppHeader, MetricCard } from "../../components/ui";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const metrics = [
  {
    id: "1",
    title: "Projects",
    value: "12",
    icon: "folder-multiple",
    iconBgColor: "primaryContainer",
    iconColor: "primary",
    badge: "Active",
  },
  {
    id: "2",
    title: "Tasks Done",
    value: "148",
    icon: "check-circle",
    iconBgColor: "successContainer",
    iconColor: "success",
    badge: "Total",
  },
  {
    id: "3",
    title: "Rating",
    value: "4.8",
    icon: "star",
    iconBgColor: "warningContainer",
    iconColor: "warning",
    badge: "Excellent",
  },
  {
    id: "4",
    title: "Streak",
    value: "15",
    icon: "fire",
    iconBgColor: "tertiaryContainer",
    iconColor: "tertiary",
    badge: "Days",
  },
];

export default function ProfileScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.surface }]} edges={["top"]}>
      <AppHeader
        title="Profile"
        subtitle="Account settings"
        rightButtons="notification"
        onNotificationPress={() => {}}
      />
      <View style={[styles.container, { backgroundColor: colors.surface }]}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.profileHeader, { backgroundColor: colors.surfaceContainerLowest }]}>
            <Image
              source={{
                uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeW-KcZzGxG8Wlt4H55mtHQoSm_0X85XApPGgBVgLpj0GBQ0npa0moBb6YKRdDHdHG2ND2uEwUT4_r0uQT4FtYxrxd35QazHuOrXbjuM-AJtPH37tzbC8mkS9ZI7X6daPfnpd5Eyhtqzta_i_XskM_6ilYIIdJQJMD66OkCuo_WJS6ckqnvakKiktVCWqtGBoAu8flo4Ndedu3_wkDPGAweu2TafhRVm1SFGRP_vDXeb7LhWS73LVJ0RqQ2O1oE4s5JEZjjgAXYg",
              }}
              style={styles.profileImage}
            />
            <Text style={[styles.profileName, { color: colors.onSurface }]}>Alex Johnson</Text>
            <Text style={[styles.profileRole, { color: colors.onSurfaceVariant }]}>Senior Developer</Text>
          </View>

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

          <View style={[styles.settingsCard, { backgroundColor: colors.surfaceContainerLowest }]}>
            <Text style={[styles.settingsTitle, { color: colors.onSurface }]}>Settings</Text>
            {[
              { icon: "account-outline", label: "Personal Info" },
              { icon: "bell-outline", label: "Notifications" },
              { icon: "shield-outline", label: "Privacy & Security" },
              { icon: "help-circle-outline", label: "Help & Support" },
            ].map((item, index) => (
              <TouchableOpacity key={index} style={styles.settingItem}>
                <View style={styles.settingLeft}>
                  <MaterialCommunityIcons name={item.icon as any} size={22} color={colors.onSurfaceVariant} />
                  <Text style={[styles.settingLabel, { color: colors.onSurface }]}>{item.label}</Text>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={22} color={colors.onSurfaceVariant} />
              </TouchableOpacity>
            ))}
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
  profileHeader: {
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    marginBottom: 24,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  profileName: {
    fontFamily: "Manrope",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
  },
  profileRole: {
    fontFamily: "Inter",
    fontSize: 14,
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
  settingsCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  settingsTitle: {
    fontFamily: "Manrope",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  settingLabel: {
    fontFamily: "Inter",
    fontSize: 14,
  },
  bottomSpacer: {
    height: 120,
  },
});
