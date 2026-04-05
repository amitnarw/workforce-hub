import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "destructive";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export function Button({
  title,
  onPress,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  style,
  textStyle,
  icon,
}: ButtonProps) {
  const { colors } = useTheme();

  const getBackgroundColor = () => {
    if (disabled) return colors.surfaceContainerHigh;
    switch (variant) {
      case "primary":
        return colors.primary;
      case "secondary":
        return colors.secondaryContainer;
      case "outline":
        return "transparent";
      case "ghost":
        return "transparent";
      case "destructive":
        return colors.error;
      default:
        return colors.primary;
    }
  };

  const getTextColor = () => {
    if (disabled) return colors.onSurfaceVariant;
    switch (variant) {
      case "primary":
        return colors.onPrimary;
      case "secondary":
        return colors.onSecondaryContainer;
      case "outline":
        return colors.primary;
      case "ghost":
        return colors.primary;
      case "destructive":
        return colors.onError;
      default:
        return colors.onPrimary;
    }
  };

  const getBorderStyle = (): ViewStyle => {
    if (variant === "outline") {
      return {
        borderWidth: 1,
        borderColor: disabled ? colors.surfaceContainerHigh : colors.primary,
      };
    }
    return {};
  };

  const getSizeStyle = (): ViewStyle => {
    switch (size) {
      case "sm":
        return { paddingVertical: 8, paddingHorizontal: 12 };
      case "md":
        return { paddingVertical: 12, paddingHorizontal: 16 };
      case "lg":
        return { paddingVertical: 16, paddingHorizontal: 24 };
      default:
        return { paddingVertical: 12, paddingHorizontal: 16 };
    }
  };

  const getTextSizeStyle = (): TextStyle => {
    switch (size) {
      case "sm":
        return { fontSize: 12 };
      case "md":
        return { fontSize: 14 };
      case "lg":
        return { fontSize: 16 };
      default:
        return { fontSize: 14 };
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: getBackgroundColor() },
        getBorderStyle(),
        getSizeStyle(),
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator size="small" color={getTextColor()} />
      ) : (
        <>
          {icon}
          <Text
            style={[
              styles.text,
              { color: getTextColor() },
              getTextSizeStyle(),
              icon ? { marginLeft: 8 } : {},
              textStyle,
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  text: {
    fontFamily: "Inter",
    fontWeight: "600",
  },
});
