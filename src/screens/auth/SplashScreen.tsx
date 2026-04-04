import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Easing } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { AuthStackParamList } from "../../navigation/AuthStack";
import { SafeAreaView } from "react-native-safe-area-context";

type SplashScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, "Login">;

const COLORS = {
  primary: "#24389c",
  primaryLight: "#3f51b5",
  success: "#4ade80",
  white: "#ffffff",
};

const gradientColors: readonly [string, string, ...string[]] = [
  "hsla(231, 62%, 45%, 1)",
  "hsla(231, 62%, 35%, 1)",
  "hsla(231, 62%, 40%, 1)",
];

export default function SplashScreen() {
  const navigation = useNavigation<SplashScreenNavigationProp>();
  const spinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const spinAnimation = Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    spinAnimation.start();

    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    }, 3000);

    return () => {
      spinAnimation.stop();
      clearTimeout(timer);
    };
  }, [navigation, spinAnim]);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <LinearGradient
      colors={gradientColors as readonly [string, string, string]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <MaterialCommunityIcons name="hub" size={48} color={COLORS.white} />
          <Text style={styles.title}>Workforce Hub</Text>
          <Text style={styles.subtitle}>OPERATIONAL EXCELLENCE</Text>

          <Text style={styles.initText}>INITIALIZING SYSTEMS</Text>
        <Text style={styles.versionText}>Ver 4.0.2-B</Text>

        <View style={styles.statusRow}>
          <View style={styles.greenDot} />
          <Text style={styles.statusText}>Secure Node Active</Text>
        </View>

        <Animated.View
          style={[
            styles.spinner,
            { transform: [{ rotate: spin }] },
          ]}
        />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: "Manrope",
    color: COLORS.white,
    fontSize: 32,
    fontWeight: "700",
    marginTop: 16,
  },
  subtitle: {
    fontFamily: "Inter",
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
    letterSpacing: 4,
    marginTop: 8,
  },
  initText: {
    fontFamily: "Inter",
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 12,
    marginTop: 32,
  },
  versionText: {
    fontFamily: "Inter",
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: 10,
    marginTop: 4,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 32,
  },
  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.success,
  },
  statusText: {
    fontFamily: "Inter",
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 12,
  },
  spinner: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderTopColor: COLORS.white,
    marginTop: 32,
  },
});