import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SCREEN_WIDTH = Dimensions.get("window").width;

import CustomTabBar from "../components/ui/CustomTabBar";
import AdminDashboard from "../screens/admin/AdminDashboard";
import { useTabAnimation } from "../hooks/useTabAnimation";

const SCREENS = [AdminDashboard];
const SCREEN_NAMES = ["Dashboard"];

export default function AdminTabNavigator() {
  const insets = useSafeAreaInsets();
  const [activeIndex, setActiveIndex] = useState(0);
  const { animatedStyle, scrollToIndex } = useTabAnimation(0);

  useEffect(() => {
    scrollToIndex(activeIndex);
  }, [activeIndex]);

  const handleTabPress = (routeName: string) => {
    const newIndex = SCREEN_NAMES.indexOf(routeName);
    if (newIndex !== -1) {
      setActiveIndex(newIndex);
    }
  };

  const tabBarState = {
    index: activeIndex,
    routes: SCREEN_NAMES.map((name) => ({ key: name, name })),
  };

  const tabBarDescriptors = Object.fromEntries(
    SCREEN_NAMES.map((name) => [
      name,
      { options: { tabBarAccessibilityLabel: name } },
    ])
  );

  const tabBarNavigation = {
    navigate: handleTabPress,
    emit: () => ({ defaultPrevented: false }),
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View style={styles.screenArea}>
        <Animated.View style={[styles.screensRow, animatedStyle]}>
          {SCREENS.map((ScreenComponent, index) => (
            <View key={SCREEN_NAMES[index]} style={[styles.screen, { width: SCREEN_WIDTH }]}>
              <ScreenComponent />
            </View>
          ))}
        </Animated.View>
      </View>

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
  screenArea: {
    flex: 1,
    overflow: "hidden",
  },
  screensRow: {
    flex: 1,
    flexDirection: "row",
  },
  screen: {
    width: SCREEN_WIDTH,
    flexShrink: 0,
  },
});
