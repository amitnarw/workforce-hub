import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";

interface AnimatedTabContentProps {
  children: React.ReactNode;
  isActive: boolean;
}

export default function AnimatedTabContent({ children, isActive }: AnimatedTabContentProps) {
  const opacity = useSharedValue(isActive ? 1 : 0);
  const translateY = useSharedValue(isActive ? 0 : 20);

  useEffect(() => {
    opacity.value = withTiming(isActive ? 1 : 0, {
      duration: 250,
      easing: Easing.out(Easing.cubic),
    });
    translateY.value = withTiming(isActive ? 0 : 20, {
      duration: 250,
      easing: Easing.out(Easing.cubic),
    });
  }, [isActive]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: isActive ? "auto" : "none",
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
