import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { BlurView } from "@react-native-community/blur";
import { useTheme } from "../../context/ThemeContext";

// ─── Constants ────────────────────────────────────────────────────────────────

const SERVICE_ITEMS = [
  { id: "tide_qr", label: "Tide QR", iconName: "qrcode" },
  { id: "credit_card", label: "Credit Card", iconName: "credit-card-outline" },
  { id: "msme", label: "MSME", iconName: "shield-half-full" },
  { id: "insurance", label: "Insurance", iconName: "shield-check-outline" },
] as const;

const BANNER_GRADIENTS = [
  { id: "1", headline: "Insurance Made Easy", subtitle: "Protect what matters most to you today.", grad: ["#5B8DEF", "#3B6FD4"] as [string, string], icon: "shield-check-outline" },
  { id: "2", headline: "Grow Your Business", subtitle: "MSME loans tailored for you.", grad: ["#4ECDC4", "#2E9E87"] as [string, string], icon: "briefcase-outline" },
  { id: "3", headline: "Credit Card Offers", subtitle: "Exclusive cashback on every swipe.", grad: ["#FF6B6B", "#C0392B"] as [string, string], icon: "credit-card-outline" },
];

// ─── Component ────────────────────────────────────────────────────────────────

interface EmployeeDashboardProps {
  onMenuPress?: () => void;
}

export default function EmployeeDashboard({ onMenuPress }: EmployeeDashboardProps) {
  const { colors } = useTheme();

  const [activeBanner, setActiveBanner] = useState(0);
  const bannerListRef = useRef<FlatList>(null);
  const bannerTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const screenWidth = Dimensions.get("window").width;
  const BANNER_ITEM_WIDTH = screenWidth - 32;
  const BANNER_SNAP_INTERVAL = BANNER_ITEM_WIDTH + 12;

  const getServiceColors = (id: string) => {
    switch (id) {
      case "tide_qr": return { iconColor: "#ffffff", bgColor: "#6B9FFF" };
      case "credit_card": return { iconColor: "#C0392B", bgColor: "#FFEBEE" };
      case "msme": return { iconColor: "#1565C0", bgColor: "#E3F2FD" };
      case "insurance": return { iconColor: "#E67E22", bgColor: "#FFF8E1" };
      default: return { iconColor: colors.onSurfaceVariant, bgColor: colors.surfaceContainerHigh };
    }
  };

  useEffect(() => {
    bannerTimerRef.current = setInterval(() => {
      setActiveBanner((prev) => {
        const next = (prev + 1) % BANNER_GRADIENTS.length;
        try { bannerListRef.current?.scrollToIndex({ index: next, animated: true }); } catch (_) { }
        return next;
      });
    }, 4000);
    return () => { if (bannerTimerRef.current) clearInterval(bannerTimerRef.current); };
  }, []);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: "#3B6FD4" }]} edges={["top"]}>
      <View style={[styles.root, { backgroundColor: colors.background }]}>

        {/* ── HEADER ── */}
        <View style={[styles.header, { backgroundColor: "#3B6FD4" }]}>
          <View style={styles.headerRow}>
            <TouchableOpacity style={styles.headerIconBtn} onPress={onMenuPress}>
              <MaterialCommunityIcons name="menu" size={26} color="#ffffff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>My Work Point</Text>
            <View style={styles.headerRight}>
              <TouchableOpacity style={styles.headerIconBtn}>
                <MaterialCommunityIcons name="bell-outline" size={22} color="#ffffff" />
              </TouchableOpacity>
              <View style={styles.headerAvatar}>
                <MaterialCommunityIcons name="account" size={18} color="#5B8DEF" />
              </View>
            </View>
          </View>
        </View>

        {/* ── SCROLL AREA ── */}
        <ScrollView
          style={[styles.scrollView]}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={true}
        >

          {/* ── PROFILE CARD (full white card) ── */}
          <View style={styles.profileCardOuter}>
            <View style={[styles.profileCard, { backgroundColor: colors.surfaceContainerLowest }]}>
              {/* Top row: name+badge left, avatar right */}
              <View style={styles.profileTopRow}>
                <View style={styles.profileIdentity}>
                  <Text style={[styles.profileName, { color: colors.onSurface }]}>Rahul Sharma</Text>
                  <View style={[styles.profileBadge, { backgroundColor: colors.primaryFixed }]}>
                    <MaterialCommunityIcons name="check-decagram" size={11} color={colors.primary} />
                    <Text style={[styles.profileBadgeText, { color: colors.primary }]}>Top Agent</Text>
                  </View>
                  <View style={styles.profileOnlineRow}>
                    <View style={styles.onlineDot} />
                    <Text style={[styles.onlineText, { color: colors.onSurfaceVariant }]}>Online</Text>
                  </View>
                </View>
                <View style={styles.profileAvatarWrap}>
                  <View style={[styles.profileAvatar, { backgroundColor: colors.primaryFixed }]}>
                    <MaterialCommunityIcons name="account" size={28} color={colors.primary} />
                  </View>
                  <View style={styles.profileOnlineBadge} />
                </View>
              </View>

              {/* Stats row */}
              <View style={[styles.profileStatsRow, { backgroundColor: colors.surfaceContainerLow }]}>
                <View style={styles.profileStatItem}>
                  <Text style={[styles.profileStatValue, { color: colors.onSurface }]}>24</Text>
                  <Text style={[styles.profileStatLabel, { color: colors.onSurfaceVariant }]}>Leads Today</Text>
                </View>
                <View style={[styles.profileStatDivider, { backgroundColor: colors.outlineVariant }]} />
                <View style={styles.profileStatItem}>
                  <Text style={[styles.profileStatValue, { color: colors.onSurface }]}>₹84,500</Text>
                  <Text style={[styles.profileStatLabel, { color: colors.onSurfaceVariant }]}>This Month</Text>
                </View>
                <View style={[styles.profileStatDivider, { backgroundColor: colors.outlineVariant }]} />
                <View style={styles.profileStatItem}>
                  <Text style={[styles.profileStatValue, { color: colors.onSurface }]}>3</Text>
                  <Text style={[styles.profileStatLabel, { color: colors.onSurfaceVariant }]}>Rank</Text>
                </View>
              </View>

              {/* Info chips row */}
              <View style={styles.profileInfoRow}>
                <View style={[styles.infoChip, { backgroundColor: colors.surfaceContainerLow }]}>
                  <View style={[styles.infoChipIcon, { backgroundColor: colors.primaryFixed }]}>
                    <MaterialCommunityIcons name="card-account-details-outline" size={11} color={colors.primary} />
                  </View>
                  <Text style={[styles.infoChipText, { color: colors.onSurface }]}>ARN1234</Text>
                  <TouchableOpacity onPress={() => Alert.alert("Copied!", "Referral code copied.")} hitSlop={{ top: 6, bottom: 6, left: 4, right: 4 }}>
                    <MaterialCommunityIcons name="content-copy" size={10} color={colors.onSurfaceVariant} />
                  </TouchableOpacity>
                </View>
                <View style={[styles.infoChip, { backgroundColor: colors.surfaceContainerLow }]}>
                  <View style={[styles.infoChipIcon, { backgroundColor: colors.primaryFixed }]}>
                    <MaterialCommunityIcons name="phone-outline" size={11} color={colors.primary} />
                  </View>
                  <Text style={[styles.infoChipText, { color: colors.onSurface }]}>+91 98765 43210</Text>
                </View>
                <View style={[styles.infoChip, { backgroundColor: colors.surfaceContainerLow }]}>
                  <View style={[styles.infoChipIcon, { backgroundColor: colors.primaryFixed }]}>
                    <MaterialCommunityIcons name="email-outline" size={11} color={colors.primary} />
                  </View>
                  <Text style={[styles.infoChipText, { color: colors.onSurface }]} numberOfLines={1}>rahul.sharma@email.com</Text>
                </View>
              </View>
            </View>
          </View>

          {/* ── BANNER CAROUSEL ── */}
          <View style={styles.bannerContainer}>
            <FlatList
              ref={bannerListRef}
              data={BANNER_GRADIENTS}
              keyExtractor={(b) => b.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToInterval={BANNER_SNAP_INTERVAL}
              snapToAlignment="start"
              decelerationRate="fast"
              contentContainerStyle={{ gap: 12 }}
              onMomentumScrollEnd={(e) => {
                const newIndex = Math.round(e.nativeEvent.contentOffset.x / BANNER_SNAP_INTERVAL);
                setActiveBanner(Math.max(0, Math.min(newIndex, BANNER_GRADIENTS.length - 1)));
              }}
              renderItem={({ item }) => (
                <View style={[styles.bannerSlide, { width: BANNER_ITEM_WIDTH }]}>
                  <LinearGradient
                    colors={item.grad}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.bannerGradient}
                  >
                    <MaterialCommunityIcons
                      name={item.icon as any}
                      size={108}
                      color="rgba(255,255,255,0.18)"
                      style={styles.bannerDecorIcon}
                    />
                    <View style={styles.bannerContent}>
                      <Text style={styles.bannerHeadline}>{item.headline}</Text>
                      <Text style={styles.bannerSubtitle}>{item.subtitle}</Text>
                      <TouchableOpacity style={styles.bannerCta} activeOpacity={0.85}>
                        <Text style={styles.bannerCtaText}>Explore</Text>
                        <MaterialCommunityIcons name="arrow-right" size={14} color="#ffffff" />
                      </TouchableOpacity>
                    </View>
                  </LinearGradient>
                </View>
              )}
            />

            {/* Dots */}
            <View style={styles.dotsRow}>
              {BANNER_GRADIENTS.map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.dot,
                    i === activeBanner
                      ? { width: 24, height: 6, backgroundColor: "#5B8DEF", borderRadius: 3 }
                      : { width: 6, height: 6, backgroundColor: "#C4C5D7", borderRadius: 3 },
                  ]}
                />
              ))}
            </View>
          </View>

          {/* ── SERVICES PANEL ── */}
          <View style={[styles.servicesPanel, { backgroundColor: colors.surfaceContainerLowest }]}>
            <View style={styles.servicesPanelHeader}>
              <View>
                <Text style={[styles.servicesPanelTitle, { color: colors.onSurface }]}>Quick Services</Text>
                <Text style={[styles.servicesPanelSubtitle, { color: colors.onSurfaceVariant }]}>All financial services in one place</Text>
              </View>
              <TouchableOpacity style={[styles.viewAllBtn, { backgroundColor: "#D6E5FF" }]} activeOpacity={0.7}>
                <Text style={[styles.viewAllText, { color: "#5B8DEF" }]}>View All</Text>
                <MaterialCommunityIcons name="chevron-right" size={14} color="#5B8DEF" />
              </TouchableOpacity>
            </View>

            <View style={styles.servicesRow}>
              {SERVICE_ITEMS.map((svc) => {
                const { iconColor, bgColor } = getServiceColors(svc.id);
                return (
                  <TouchableOpacity
                    key={svc.id}
                    style={styles.serviceTile}
                    activeOpacity={0.75}
                    onPress={() => Alert.alert(svc.label, `Navigate to ${svc.label}`)}
                  >
                    <View style={[styles.serviceIconBox, { backgroundColor: bgColor }]}>
                      <MaterialCommunityIcons name={svc.iconName as any} size={26} color={iconColor} />
                    </View>
                    <Text style={[styles.serviceLabel, { color: colors.onSurface }]}>{svc.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },

  root: { flex: 1, minHeight: 0 },

  // Header
  header: {
    // backgroundColor set inline from colors.primary
    paddingBottom: 10,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontFamily: "Manrope",
    fontSize: 18,
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: 0.3
  },
  headerIconBtn: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  headerAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },

  // Scroll
  scrollView: { flex: 1, minHeight: 0 },
  scrollContent: { flexGrow: 1 },

  // Profile Card — full white background, overlaps header
  profileCardOuter: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  profileCard: {
    borderRadius: 20,
    overflow: "hidden",
    padding: 14,
    shadowColor: "#3B6FD4",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 5,
  },
  // Top row: identity left, avatar right
  profileTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  profileIdentity: {
    flex: 1,
    paddingRight: 10,
    gap: 4,
  },
  profileName: {
    fontFamily: "Manrope",
    fontSize: 17,
    fontWeight: "800",
    letterSpacing: 0.2,
  },
  profileBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  profileBadgeText: {
    fontFamily: "Inter",
    fontSize: 10,
    fontWeight: "700",
  },
  profileOnlineRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 3,
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#4ADE80",
  },
  onlineText: {
    fontFamily: "Inter",
    fontSize: 10,
    fontWeight: "500",
  },
  profileAvatarWrap: {
    position: "relative",
  },
  profileAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  profileOnlineBadge: {
    position: "absolute",
    bottom: 1,
    right: 1,
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: "#4ADE80",
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  // Stats row
  profileStatsRow: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 4,
    marginBottom: 12,
  },
  profileStatItem: {
    flex: 1,
    alignItems: "center",
    gap: 2,
  },
  profileStatDivider: {
    width: 1,
    height: 24,
  },
  profileStatValue: {
    fontFamily: "Manrope",
    fontSize: 14,
    fontWeight: "800",
  },
  profileStatLabel: {
    fontFamily: "Inter",
    fontSize: 9,
    fontWeight: "500",
    letterSpacing: 0.2,
  },
  // Info chips row
  profileInfoRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  infoChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 20,
  },
  infoChipIcon: {
    width: 18,
    height: 18,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  infoChipText: {
    fontFamily: "Inter",
    fontSize: 11,
    fontWeight: "600",
  },

  // Banner
  bannerContainer: { marginHorizontal: 16, marginTop: 24 },
  bannerSlide: {
    borderRadius: 18,
    overflow: "hidden",
  },
  bannerGradient: {
    height: 165,
    borderRadius: 18,
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  bannerDecorIcon: {
    position: "absolute",
    right: 14,
    top: 14,
  },
  bannerContent: {
    padding: 18,
    gap: 5,
  },
  bannerHeadline: {
    fontFamily: "Manrope",
    fontSize: 20,
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: 0.2,
  },
  bannerSubtitle: {
    fontFamily: "Inter",
    fontSize: 13,
    color: "rgba(255,255,255,0.85)",
    lineHeight: 18,
  },
  bannerCta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(255,255,255,0.25)",
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    marginTop: 6,
  },
  bannerCtaText: {
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: "700",
    color: "#ffffff",
  },
  dotsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 14,
  },
  dot: { borderRadius: 3 },

  // Services Panel
  servicesPanel: {
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    marginTop: 28,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 28,
  },
  servicesPanelHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  servicesPanelTitle: {
    fontFamily: "Manrope",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 2,
  },
  servicesPanelSubtitle: {
    fontFamily: "Inter",
    fontSize: 12,
  },
  viewAllBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
  },
  viewAllText: {
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: "700",
  },
  servicesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  serviceTile: {
    flex: 1,
    alignItems: "center",
    gap: 8,
  },
  serviceIconBox: {
    width: 60,
    height: 60,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  serviceLabel: {
    fontFamily: "Inter",
    fontSize: 11,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 14,
  },
});