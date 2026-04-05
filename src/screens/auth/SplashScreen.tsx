import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StackNavigationProp } from "@react-navigation/native-stack";
import type { AuthStackParamList } from "../../navigation/AuthStack";

type SplashScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  "Splash"
>;

interface Props {
  navigation: SplashScreenNavigationProp;
}

const COLORS = {
  primary: "#24389c",
  primaryDark: "#1a2a7a",
  purple: "#6c34c4",
  gold: "#f5c842",
  white: "#ffffff",
  silver: "#c4c9d4",
  silverDark: "#8b90a0",
  green: "#22c55e",
};

const MESH_OVERLAYS = [
  // Purple top-right
  { colors: ["#6c34c4", "transparent"] as const, start: { x: 0.9, y: 0 } as const, end: { x: 0.1, y: 1 } as const, opacity: 0.4 },
  // Dark bottom-left
  { colors: ["#0a1640", "transparent"] as const, start: { x: 0, y: 0.7 } as const, end: { x: 1, y: 0 } as const, opacity: 0.55 },
  // Vertical blue center
  { colors: ["#1e3599", "transparent"] as const, start: { x: 0.5, y: 0 } as const, end: { x: 0.5, y: 1 } as const, opacity: 0.25 },
  // Top accent
  { colors: ["#1a2a7a", "transparent"] as const, start: { x: 0, y: 0 } as const, end: { x: 1, y: 0.4 } as const, opacity: 0.5 },
];

export default function SplashScreen({ navigation }: Props) {
  const spinAnim = useRef(new Animated.Value(0)).current;
  const dotAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Spinner rotation
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 1400,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // Pulsing green dot
    Animated.loop(
      Animated.sequence([
        Animated.timing(dotAnim, {
          toValue: 1,
          duration: 900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(dotAnim, {
          toValue: 0,
          duration: 900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Auto-navigate to Login after 3s
    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation, spinAnim, dotAnim]);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const dotScale = dotAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.7, 1.5],
  });

  const dotOpacity = dotAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1],
  });

  return (
    <View style={styles.container}>
      {/* Base gradient — deep navy to blue */}
      <LinearGradient
        colors={["#0d1b4b", "#1a2a7a", "#24389c"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Mesh overlay 1 — purple top-right glow */}
      <LinearGradient
        colors={MESH_OVERLAYS[0].colors}
        start={MESH_OVERLAYS[0].start}
        end={MESH_OVERLAYS[0].end}
        style={[StyleSheet.absoluteFill, { opacity: MESH_OVERLAYS[0].opacity }]}
      />

      {/* Mesh overlay 2 — dark bottom-left depth */}
      <LinearGradient
        colors={MESH_OVERLAYS[1].colors}
        start={MESH_OVERLAYS[1].start}
        end={MESH_OVERLAYS[1].end}
        style={[StyleSheet.absoluteFill, { opacity: MESH_OVERLAYS[1].opacity }]}
      />

      {/* Mesh overlay 3 — vertical blue shaft */}
      <LinearGradient
        colors={MESH_OVERLAYS[2].colors}
        start={MESH_OVERLAYS[2].start}
        end={MESH_OVERLAYS[2].end}
        style={[StyleSheet.absoluteFill, { opacity: MESH_OVERLAYS[2].opacity }]}
      />

      {/* Mesh overlay 4 — top blue sheen */}
      <LinearGradient
        colors={MESH_OVERLAYS[3].colors}
        start={MESH_OVERLAYS[3].start}
        end={MESH_OVERLAYS[3].end}
        style={[StyleSheet.absoluteFill, { opacity: MESH_OVERLAYS[3].opacity }]}
      />

      {/* Center content */}
      <View style={styles.centerContent}>
        {/* Logo — two overlapping rounded squares */}
        <View style={styles.logoContainer}>
          {/* Back square — purple */}
          <View style={styles.logoBack} />
          {/* Front square — primary blue */}
          <View style={styles.logoFront} />
        </View>

        {/* "hub" pill badge */}
        <View style={styles.hubBadge}>
          <Text style={styles.hubBadgeText}>hub</Text>
        </View>

        {/* App name */}
        <Text style={styles.appName}>Workforce Hub</Text>

        {/* Tagline — gold */}
        <Text style={styles.tagline}>OPERATIONAL EXCELLENCE</Text>
      </View>

      {/* Bottom status bar */}
      <View style={styles.bottomBar}>
        {/* Left — Secure Node Active */}
        <View style={styles.statusLeft}>
          <Animated.View
            style={[
              styles.greenDot,
              {
                transform: [{ scale: dotScale }],
                opacity: dotOpacity,
              },
            ]}
          />
          <Text style={styles.statusText}>Secure Node Active</Text>
        </View>

        {/* Center — spinner + initializing text */}
        <View style={styles.statusCenter}>
          <Animated.View style={{ transform: [{ rotate: spin }] }}>
            {/* Spinner arc — half ring */}
            <View style={styles.spinnerWrapper}>
              <View style={styles.spinnerArc} />
              <View style={[styles.spinnerArc, styles.spinnerArcDim]} />
            </View>
          </Animated.View>
          <Text style={styles.initText}>INITIALIZING SYSTEMS</Text>
        </View>

        {/* Right — version */}
        <Text style={styles.versionText}>Ver 4.0.2-B</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    width: 72,
    height: 72,
    marginBottom: 18,
  },
  logoBack: {
    position: "absolute",
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: "#6c34c4",
    top: 10,
    left: 12,
    opacity: 0.9,
  },
  logoFront: {
    position: "absolute",
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: "#24389c",
    top: 4,
    left: 4,
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.18)",
  },
  hubBadge: {
    backgroundColor: "rgba(196, 201, 212, 0.12)",
    borderRadius: 50,
    paddingHorizontal: 18,
    paddingVertical: 5,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(196, 201, 212, 0.2)",
  },
  hubBadgeText: {
    color: "#c4c9d4",
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 3,
    textTransform: "uppercase",
    fontFamily: "Inter_600SemiBold",
  },
  appName: {
    color: "#ffffff",
    fontSize: 33,
    fontWeight: "800",
    fontFamily: "Manrope_800ExtraBold",
    letterSpacing: -0.5,
    marginBottom: 10,
  },
  tagline: {
    color: "#f5c842",
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 4,
    fontFamily: "Inter_600SemiBold",
  },
  bottomBar: {
    position: "absolute",
    bottom: 48,
    left: 0,
    right: 0,
    paddingHorizontal: 28,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  statusLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    flex: 1,
  },
  greenDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#22c55e",
  },
  statusText: {
    color: "#8b90a0",
    fontSize: 10,
    fontFamily: "Inter_400Regular",
  },
  statusCenter: {
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  spinnerWrapper: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  spinnerArc: {
    position: "absolute",
    width: 20,
    height: 10,
    borderRadius: 10,
    borderTopWidth: 2,
    borderColor: "#c4c9d4",
  },
  spinnerArcDim: {
    bottom: 0,
    top: undefined,
    borderTopWidth: 2,
    borderBottomWidth: 0,
    borderColor: "#8b90a0",
    opacity: 0.4,
  },
  initText: {
    color: "#c4c9d4",
    fontSize: 8,
    fontWeight: "500",
    letterSpacing: 1.5,
    fontFamily: "Inter_500Medium",
  },
  versionText: {
    color: "#8b90a0",
    fontSize: 10,
    fontFamily: "Inter_400Regular",
    flex: 1,
    textAlign: "right",
  },
});
