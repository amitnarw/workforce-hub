import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";

interface HeaderIconButtonProps {
  iconName: string;
  onPress?: () => void;
  size?: number;
  color?: string;
}

export function HeaderIconButton({ iconName, onPress, size = 24, color }: HeaderIconButtonProps) {
  const { colors } = useTheme();
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.7}>
      <MaterialCommunityIcons
        name={iconName as any}
        size={size}
        color={color ?? colors.onSurface}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
