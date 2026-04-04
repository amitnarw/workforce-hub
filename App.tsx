import "./global.css";
import QueryProvider from "./src/providers/query-provider";
import RootNavigation from "./src/navigation";
import React from "react";
import { View, ActivityIndicator } from "react-native";
import { useFonts, Inter_500Medium, Inter_600SemiBold, Inter_700Bold, Inter_400Regular, Inter_800ExtraBold } from "@expo-google-fonts/inter";
import { Manrope_400Regular, Manrope_600SemiBold, Manrope_700Bold, Manrope_800ExtraBold } from "@expo-google-fonts/manrope";
import { ThemeProvider, useTheme } from "./src/context/ThemeContext";
import { StatusBar } from "expo-status-bar";

function ThemedStatusBar() {
  const { isDark } = useTheme();
  return <StatusBar style={isDark ? "light" : "dark"} />;
}

export default function App() {
  const [fontsLoaded, fontsError] = useFonts({
    Inter: Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Manrope: Manrope_400Regular,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
  });

  if (!fontsLoaded && !fontsError) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#24389c" />
      </View>
    );
  }

  return (
    <ThemeProvider>
      <ThemedStatusBar />
      <QueryProvider>
        <RootNavigation />
      </QueryProvider>
    </ThemeProvider>
  );
}