import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AdminDashboard from "../screens/admin/AdminDashboard";

export type AdminStackParamList = {
  Dashboard: undefined;
};

const Stack = createNativeStackNavigator<AdminStackParamList>();

export default function AdminStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Dashboard" component={AdminDashboard} />
    </Stack.Navigator>
  );
}