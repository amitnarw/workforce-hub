import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TeamLeadDashboard from "../screens/lead/TeamLeadDashboard";

export type TeamLeadStackParamList = {
  Dashboard: undefined;
};

const Stack = createNativeStackNavigator<TeamLeadStackParamList>();

export default function TeamLeadStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Dashboard" component={TeamLeadDashboard} />
    </Stack.Navigator>
  );
}