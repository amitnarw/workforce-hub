import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/auth/LoginScreen";
import SplashScreen from "../screens/auth/SplashScreen";
import EmployeeDashboard from "../screens/employee/EmployeeDashboard";
import LeadHistoryScreen from "../screens/employee/LeadHistoryScreen";
import LeadsScreen from "../screens/employee/LeadsScreen";
import MyWorkPointScreen from "../screens/employee/MyWorkPointScreen";
import EarningsScreen from "../screens/employee/EarningsScreen";
import ProfileScreen from "../screens/employee/ProfileScreen";
import TeamLeadDashboard from "../screens/lead/TeamLeadDashboard";
import AdminDashboard from "../screens/admin/AdminDashboard";
import AnimatedTabNavigator from "./AnimatedTabNavigator";

export type AuthStackParamList = {
  Splash: undefined;
  Login: undefined;
  MainTabs: undefined;
  EmployeeDashboard: undefined;
  LeadHistoryScreen: undefined;
  LeadsScreen: undefined;
  MyWorkPointScreen: undefined;
  EarningsScreen: undefined;
  ProfileScreen: undefined;
  TeamLeadDashboard: undefined;
  AdminDashboard: undefined;
};

export type EnvironmentDetails = {
  environment: "development" | "staging" | "production";
  version: string;
  buildNumber: string;
  lastUpdated: string;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const environmentDetails: EnvironmentDetails = {
  environment: "production",
  version: "1.0.0",
  buildNumber: "1",
  lastUpdated: "2026-04-04T16:50:08+05:30",
};

export { environmentDetails };

export default function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Splash"
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="MainTabs" component={AnimatedTabNavigator} />
      <Stack.Screen name="EmployeeDashboard" component={EmployeeDashboard} />
      <Stack.Screen name="TeamLeadDashboard" component={TeamLeadDashboard} />
      <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
    </Stack.Navigator>
  );
}
