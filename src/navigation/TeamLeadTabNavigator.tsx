import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import CustomTabBar from "../components/ui/CustomTabBar";
import TeamLeadDashboard from "../screens/lead/TeamLeadDashboard";

const SCREENS = [TeamLeadDashboard];
const SCREEN_NAMES = ["Dashboard"];

export default function TeamLeadTabNavigator() {
  const insets = useSafeAreaInsets();
  const [activeIndex, setActiveIndex] = useState(0);
  const translateX = useSharedValue(0);

  useEffect(() => {
    translateX.value = withTiming(-activeIndex * Dimensions.get("window").width, {
      duration: 300,
      easing: Easing.out(Easing.cubic),
    });
  }, [activeIndex]);

  const handleTabPress = (routeName: string) => {
    const newIndex = SCREEN_NAMES.indexOf(routeName);
    if (newIndex !== -1) {
      setActiveIndex(newIndex);
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const tabBarState = {
    index: activeIndex,
    routes: SCREEN_NAMES.map((name) => ({ key: name, name })),
  };

  const tabBarDescriptors = Object.fromEntries(
    SCREEN_NAMES.map((name) => [
      name,
      {
        options: { tabBarAccessibilityLabel: name },
      },
    ])
  );

  const tabBarNavigation = {
    navigate: handleTabPress,
    emit: () => ({ defaultPrevented: false }),
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <Animated.View style={[styles.screensContainer, animatedStyle]}>
        {SCREENS.map((ScreenComponent, index) => (
          <View key={SCREEN_NAMES[index]} style={styles.screen}>
            <ScreenComponent />
          </View>
        ))}
      </Animated.View>
      <CustomTabBar
        state={tabBarState as any}
        descriptors={tabBarDescriptors as any}
        navigation={tabBarNavigation as any}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screensContainer: {
    flex: 1,
    flexDirection: "row",
  },
  screen: {
    width: Dimensions.get("window").width,
    flexShrink: 0,
  },
});
