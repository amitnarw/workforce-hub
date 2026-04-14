import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../context/ThemeContext";
import { BottomSpacer, HeaderIconButton } from "../../components/ui";

interface MenuItem {
  id: string;
  icon: string;
  label: string;
  hasToggle?: boolean;
  hasChevron?: boolean;
  isLogout?: boolean;
  toggleValue?: boolean;
}

const menuItems: MenuItem[] = [
  {
    id: "1",
    icon: "bell-outline",
    label: "Notifications",
    hasToggle: true,
    toggleValue: true,
  },
  {
    id: "2",
    icon: "help-circle-outline",
    label: "Help & Support",
    hasChevron: true,
  },
  {
    id: "3",
    icon: "shield-outline",
    label: "Privacy Policy",
    hasChevron: true,
  },
  {
    id: "4",
    icon: "file-document-outline",
    label: "Terms of Service",
    hasChevron: true,
  },
  {
    id: "5",
    icon: "power",
    label: "Logout",
    isLogout: true,
  },
];

export default function ProfileScreen() {
  const { colors } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

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
              Profile
            </Text>
            <HeaderIconButton iconName="cog-outline" />
          </View>

          {/* Profile Card */}
          <View style={[styles.profileCard, { backgroundColor: colors.surfaceContainerLowest }]}>
            {/* Avatar */}
            <View style={[styles.avatarContainer, { backgroundColor: colors.primary }]}>
              <Text style={[styles.avatarText, { color: colors.onPrimary }]}>AS</Text>
            </View>

            {/* Name and Role */}
            <Text style={[styles.profileName, { color: colors.onSurface }]}>
              Amit Singh
            </Text>
            <Text style={[styles.profileRole, { color: colors.onSurfaceVariant }]}>
              Senior Sales Executive
            </Text>

            {/* Contact Info */}
            <View style={styles.contactInfo}>
              <View style={styles.contactRow}>
                <MaterialCommunityIcons
                  name="email-outline"
                  size={16}
                  color={colors.onSurfaceVariant}
                />
                <Text style={[styles.contactText, { color: colors.onSurfaceVariant }]}>
                  amit.singh@company.com
                </Text>
              </View>
              <View style={styles.contactRow}>
                <MaterialCommunityIcons
                  name="phone-outline"
                  size={16}
                  color={colors.onSurfaceVariant}
                />
                <Text style={[styles.contactText, { color: colors.onSurfaceVariant }]}>
                  +91 98765 43210
                </Text>
              </View>
              <View style={styles.contactRow}>
                <MaterialCommunityIcons
                  name="card-outline"
                  size={16}
                  color={colors.onSurfaceVariant}
                />
                <Text style={[styles.contactText, { color: colors.onSurfaceVariant }]}>
                  Employee ID: EMP001
                </Text>
              </View>
            </View>

            {/* Edit Profile Button */}
            <TouchableOpacity
              style={[styles.editButton, { backgroundColor: colors.primary }]}
            >
              <Text style={[styles.editButtonText, { color: colors.onPrimary }]}>
                Edit Profile
              </Text>
            </TouchableOpacity>
          </View>

          {/* Settings Menu */}
          <View style={[styles.settingsCard, { backgroundColor: colors.surfaceContainerLowest }]}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.menuItem,
                  index === menuItems.length - 1 && styles.menuItemLast,
                ]}
              >
                <View style={styles.menuItemLeft}>
                  <MaterialCommunityIcons
                    name={item.icon as any}
                    size={22}
                    color={item.isLogout ? colors.error : colors.onSurfaceVariant}
                  />
                  <Text
                    style={[
                      styles.menuLabel,
                      { color: item.isLogout ? colors.error : colors.onSurface },
                    ]}
                  >
                    {item.label}
                  </Text>
                </View>
                {item.hasToggle && (
                  <Switch
                    value={notificationsEnabled}
                    onValueChange={setNotificationsEnabled}
                    trackColor={{ false: colors.outline, true: colors.primary }}
                    thumbColor={colors.surfaceContainerLowest}
                  />
                )}
                {item.hasChevron && (
                  <MaterialCommunityIcons
                    name="chevron-right"
                    size={22}
                    color={colors.onSurfaceVariant}
                  />
                )}
              </TouchableOpacity>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  headerTitle: {
    fontFamily: "Manrope",
    fontSize: 24,
    fontWeight: "700",
  },
  profileCard: {
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    marginBottom: 16,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  avatarText: {
    fontFamily: "Inter",
    fontSize: 28,
    fontWeight: "700",
  },
  profileName: {
    fontFamily: "Manrope",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 4,
  },
  profileRole: {
    fontFamily: "Inter",
    fontSize: 14,
    marginBottom: 16,
  },
  contactInfo: {
    width: "100%",
    gap: 8,
    marginBottom: 20,
    alignItems: "center",
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  contactText: {
    fontFamily: "Inter",
    fontSize: 13,
  },
  editButton: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
  },
  editButtonText: {
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: "600",
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  statValue: {
    fontFamily: "Manrope",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 2,
  },
  statLabel: {
    fontFamily: "Inter",
    fontSize: 12,
  },
  settingsCard: {
    borderRadius: 16,
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  menuLabel: {
    fontFamily: "Inter",
    fontSize: 15,
  },
});
