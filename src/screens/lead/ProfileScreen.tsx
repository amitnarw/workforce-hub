import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../context/ThemeContext";

// ─── Types ────────────────────────────────────────────────────────────────────

interface MenuItem {
  id: string;
  iconName: string;
  label: string;
}

// ─── Static Data ───────────────────────────────────────────────────────────────

const MENU_ITEMS: MenuItem[] = [
  {
    id: "1",
    iconName: "information-outline",
    label: "About LeadMaster",
  },
  {
    id: "2",
    iconName: "link-variant",
    label: "Share App Download Link",
  },
  {
    id: "3",
    iconName: "help-circle-outline",
    label: "Help & Support",
  },
];

// ─── Component ─────────────────────────────────────────────────────────────────

export default function ProfileScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.surface }]}
      edges={["top"]}
    >
      <View style={[styles.container, { backgroundColor: colors.surface }]}>

        {/* Page Header */}
        <View style={styles.pageHeader}>
          <Text style={[styles.pageTitle, { color: colors.onSurface }]}>
            Profile
          </Text>
        </View>

        {/* Scrollable body */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >

          {/* Avatar Section */}
          <View style={styles.avatarSection}>
            {/* Large solid blue circle — NO content inside, NO icon */}
            <View
              style={[styles.avatarCircle, { backgroundColor: colors.primary }]}
            />

            {/* Name */}
            <Text style={[styles.userName, { color: colors.onSurface }]}>
              John Agent
            </Text>

            {/* Phone */}
            <Text style={[styles.userPhone, { color: colors.onSurfaceVariant }]}>
              +91 9876543210
            </Text>
          </View>

          {/* Referral Code Card */}
          <View
            style={[
              styles.referralCard,
              {
                backgroundColor: colors.surfaceContainerLowest,
                borderColor: colors.outlineVariant,
              },
            ]}
          >
            {/* Left: label + value stacked */}
            <View style={styles.referralLeft}>
              <Text
                style={[styles.referralLabel, { color: colors.onSurfaceVariant }]}
              >
                Referral Code
              </Text>
              <Text style={[styles.referralValue, { color: colors.primary }]}>
                LM-AGT-2026
              </Text>
            </View>

            {/* Right: copy icon button */}
            <TouchableOpacity
              onPress={() => {}}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <MaterialCommunityIcons
                name="content-copy"
                size={22}
                color={colors.onSurfaceVariant}
              />
            </TouchableOpacity>
          </View>

          {/* Menu Section */}
          <View
            style={[
              styles.menuContainer,
              { backgroundColor: colors.surfaceContainerLowest },
            ]}
          >
            {MENU_ITEMS.map((item, index) => (
              <React.Fragment key={item.id}>
                <TouchableOpacity
                  style={styles.menuRow}
                  onPress={() => {}}
                  activeOpacity={0.7}
                >
                  {/* Left: icon + label */}
                  <View style={styles.menuRowLeft}>
                    <MaterialCommunityIcons
                      name={item.iconName as any}
                      size={22}
                      color={colors.onSurfaceVariant}
                    />
                    <Text
                      style={[styles.menuRowLabel, { color: colors.onSurface }]}
                    >
                      {item.label}
                    </Text>
                  </View>

                  {/* Right: chevron */}
                  <MaterialCommunityIcons
                    name="chevron-right"
                    size={22}
                    color={colors.onSurfaceVariant}
                  />
                </TouchableOpacity>

                {/* Separator — NOT after last item */}
                {index < MENU_ITEMS.length - 1 && (
                  <View
                    style={[
                      styles.menuSeparator,
                      { backgroundColor: colors.outlineVariant },
                    ]}
                  />
                )}
              </React.Fragment>
            ))}
          </View>

          {/* Log Out Button */}
          <TouchableOpacity
            style={[styles.logoutButton, { borderColor: colors.primary }]}
            onPress={() => {}}
            activeOpacity={0.8}
          >
            <View style={styles.logoutButtonInner}>
              <MaterialCommunityIcons
                name="logout"
                size={20}
                color={colors.primary}
              />
              <Text style={[styles.logoutButtonText, { color: colors.primary }]}>
                Log Out
              </Text>
            </View>
          </TouchableOpacity>

          {/* Bottom spacer */}
          <View style={styles.bottomSpacer} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },

  // ── Header ──
  pageHeader: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 16,
    paddingBottom: 14,
    paddingHorizontal: 16,
  },
  pageTitle: {
    fontFamily: "Manrope",
    fontSize: 22,
    fontWeight: "700",
    letterSpacing: -0.2,
  },

  // ── ScrollView ──
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },

  // ── Avatar Section ──
  avatarSection: {
    alignItems: "center",
    marginBottom: 28,
  },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userName: {
    fontFamily: "Manrope",
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 16,
  },
  userPhone: {
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: "400",
    textAlign: "center",
    marginTop: 4,
  },

  // ── Referral Card ──
  referralCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 24,
  },
  referralLeft: {
    gap: 4,
  },
  referralLabel: {
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: "400",
  },
  referralValue: {
    fontFamily: "Manrope",
    fontSize: 18,
    fontWeight: "700",
  },

  // ── Menu Section ──
  menuContainer: {
    borderRadius: 14,
    overflow: "hidden",
    marginBottom: 24,
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 18,
  },
  menuRowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  menuRowLabel: {
    fontFamily: "Inter",
    fontSize: 15,
    fontWeight: "400",
  },
  menuSeparator: {
    height: 1,
    marginHorizontal: 16,
  },

  // ── Log Out Button ──
  logoutButton: {
    borderWidth: 1.5,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  logoutButtonInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  logoutButtonText: {
    fontFamily: "Inter",
    fontSize: 16,
    fontWeight: "600",
  },

  // ── Bottom Spacer ──
  bottomSpacer: {
    height: 20,
  },
});