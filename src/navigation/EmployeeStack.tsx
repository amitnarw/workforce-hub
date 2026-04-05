import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AnimatedTabNavigator from "./AnimatedTabNavigator";

export type EmployeeStackParamList = {
  MainTabs: undefined;
};

const Stack = createNativeStackNavigator<EmployeeStackParamList>();

export default function EmployeeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MainTabs" component={AnimatedTabNavigator} />
    </Stack.Navigator>
  );
}
