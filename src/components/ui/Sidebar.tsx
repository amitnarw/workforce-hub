import React, { ReactNode, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Platform } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { BlurView } from "@react-native-community/blur";
import { useTheme } from "../../context/ThemeContext";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const DRAWER_WIDTH = SCREEN_WIDTH * 0.75;

const SIDEBAR_ITEMS = [
  { id: "home",     label: "Home",          icon: "home-outline",         iconActive: "home" },
  { id: "leads",    label: "Leads",         icon: "account-multiple-outline", iconActive: "account-multiple" },
  { id: "earnings", label: "Earnings",      icon: "wallet-outline",      iconActive: "wallet" },
  { id: "profile",  label: "My Profile",   icon: "account-circle-outline", iconActive: "account-circle" },
  { id: "settings", label: "Settings",     icon: "cog-outline",         iconActive: "cog" },
  { id: "logout",   label: "Logout",        icon: "logout",              isRed: true },
];

interface SidebarProps {
  visible: boolean;
  onClose: () => void;
  onNavigate?: (screenName: string) => void;
  children?: ReactNode;
}

const SCREEN_NAME_MAP: Record<string, string> = {
  home: "Home",
  leads: "Leads",
  earnings: "Earnings",
  profile: "Profile",
};

export default function Sidebar({ visible, onClose, onNavigate }: SidebarProps) {
  const { colors } = useTheme();

  const translateX = useSharedValue(-DRAWER_WIDTH);
  const backdropOpacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      translateX.value = withTiming(0, { duration: 300, easing: Easing.out(Easing.cubic) });
      backdropOpacity.value = withTiming(1, { duration: 250 });
    } else {
      translateX.value = withTiming(-DRAWER_WIDTH, { duration: 280, easing: Easing.in(Easing.cubic) });
      backdropOpacity.value = withTiming(0, { duration: 200 });
    }
  }, [visible]);

  const drawerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  if (!visible && translateX.value === -DRAWER_WIDTH) return null;

  return (
    <View style={styles.overlay} pointerEvents={visible ? "auto" : "none"}>
      {/* Animated backdrop — full screen dark overlay with blur on iOS */}
      <Animated.View style={[styles.backdrop, backdropStyle]}>
        {/* Solid dark overlay — covers entire screen */}
        <View style={styles.backdropOverlay} />
        {/* iOS blur on top of dark overlay for frosted glass effect */}
        {Platform.OS === "ios" && (
          <BlurView
            style={StyleSheet.absoluteFill}
            blurType="dark"
            blurAmount={20}
            reducedTransparencyFallbackColor="rgba(0,0,0,0.7)"
          />
        )}
        {/* Tap to close */}
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          onPress={onClose}
          activeOpacity={1}
        />
      </Animated.View>

      {/* Animated drawer panel */}
      <Animated.View
        style={[
          styles.drawer,
          { backgroundColor: colors.surfaceContainerLowest },
          drawerStyle,
        ]}
      >
        {/* Header */}
        <LinearGradient
          colors={[colors.primary, "#3B6FD4"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.drawerHeader}
        >
          <View style={styles.drawerHeaderContent}>
            <View style={[styles.drawerAvatar, { backgroundColor: "rgba(255,255,255,0.25)" }]}>
              <MaterialCommunityIcons name="account" size={28} color="#ffffff" />
            </View>
            <View style={styles.drawerUserInfo}>
              <Text style={styles.drawerName}>Rahul Sharma</Text>
              <Text style={styles.drawerRole}>Top Agent</Text>
            </View>
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <MaterialCommunityIcons name="close" size={20} color="rgba(255,255,255,0.8)" />
            </TouchableOpacity>
          </View>
          <View style={styles.headerCurve} />
        </LinearGradient>

        {/* Menu */}
        <View style={styles.menuList}>
          {SIDEBAR_ITEMS.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.menuItem,
                index === 0 && [styles.menuItemActive, { backgroundColor: colors.primaryFixed + "40" }],
              ]}
              activeOpacity={0.7}
              onPress={() => {
                const screenName = SCREEN_NAME_MAP[item.id];
                if (screenName && onNavigate) {
                  onNavigate(screenName);
                }
                onClose();
              }}
            >
              <View style={[
                styles.menuIconWrap,
                index === 0 && { backgroundColor: colors.primary },
              ]}>
                <MaterialCommunityIcons
                  name={(index === 0 ? item.iconActive : item.icon) as any}
                  size={20}
                  color={index === 0 ? "#ffffff" : (item.isRed ? "#D64545" : colors.onSurfaceVariant)}
                />
              </View>
              <Text style={[
                styles.menuLabel,
                { color: item.isRed ? "#D64545" : colors.onSurface },
              ]}>
                {item.label}
              </Text>
              {index === 0 && <View style={[styles.activeDot, { backgroundColor: colors.primary }]} />}
            </TouchableOpacity>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.onSurfaceVariant }]}>Version 1.0.0</Text>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
    zIndex: 9999,
  },
  backdrop: {
    flex: 1,
    position: "relative",
  },
  backdropOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.55)",
  },
  drawer: {
    width: DRAWER_WIDTH,
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    overflow: "hidden",
  },
  drawerHeader: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 24,
    position: "relative",
  },
  drawerHeaderContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  drawerAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  drawerUserInfo: { flex: 1 },
  drawerName: {
    fontFamily: "Manrope",
    fontSize: 17,
    fontWeight: "800",
    color: "#ffffff",
  },
  drawerRole: {
    fontFamily: "Inter",
    fontSize: 12,
    color: "rgba(255,255,255,0.75)",
    marginTop: 2,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerCurve: {
    position: "absolute",
    bottom: -1,
    left: 0,
    right: 0,
    height: 20,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  menuList: {
    padding: 12,
    paddingTop: 16,
    gap: 4,
    flex: 1,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 13,
    paddingHorizontal: 12,
    borderRadius: 14,
  },
  menuItemActive: {},
  menuIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.04)",
  },
  menuLabel: {
    fontFamily: "Inter",
    fontSize: 15,
    fontWeight: "600",
    flex: 1,
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  footer: {
    padding: 20,
    alignItems: "center",
  },
  footerText: {
    fontFamily: "Inter",
    fontSize: 11,
  },
});