import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EmployeeDashboard from "../screens/employee/EmployeeDashboard";

export type EmployeeStackParamList = {
  Dashboard: undefined;
};

const Stack = createNativeStackNavigator<EmployeeStackParamList>();

export default function EmployeeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Dashboard" component={EmployeeDashboard} />
    </Stack.Navigator>
  );
}