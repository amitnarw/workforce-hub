import { Easing } from "react-native-reanimated";

export const animation = {
  duration: {
    fast: 150,
    normal: 250,
    slow: 300,
  },
} as const;

export const easings = {
  cubicOut: Easing.out(Easing.cubic),
  cubicIn: Easing.in(Easing.cubic),
  cubicInOut: Easing.inOut(Easing.cubic),
};
