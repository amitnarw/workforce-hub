import React from "react";
import { View } from "react-native";
import { layout } from "../../constants/spacing";

export function BottomSpacer() {
  return <View style={{ height: layout.bottomSpacerHeight }} />;
}
