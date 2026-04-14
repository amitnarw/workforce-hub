import { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { Dimensions } from "react-native";
import { animation, easings } from "../constants/animations";

const SCREEN_WIDTH = Dimensions.get("window").width;

export function useTabAnimation(initialIndex = 0) {
  const translateX = useSharedValue(-initialIndex * SCREEN_WIDTH);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const scrollToIndex = (index: number) => {
    translateX.value = withTiming(-index * SCREEN_WIDTH, {
      duration: animation.duration.slow,
      easing: easings.cubicOut,
    });
  };

  return { animatedStyle, scrollToIndex, SCREEN_WIDTH };
}
