import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { fonts, fontSizes, fontWeights } from "../../constants/typography";
import { radius } from "../../constants/radius";
import { spacing } from "../../constants/spacing";

const STATUS_COLOR_MAP: Record<string, string> = {
  "New Lead": "#7c3aed",
  "Follow Up": "#2563eb",
  Qualified: "#059669",
  Converted: "#0891b2",
  Approved: "#059669",
  Pending: "#f59e0b",
  Rejected: "#dc2626",
};

const DEFAULT_COLOR = "#747686";

interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const color = STATUS_COLOR_MAP[status] ?? DEFAULT_COLOR;
  return (
    <View style={[styles.badge, { backgroundColor: color + "20" }]}>
      <Text style={[styles.text, { color }]}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
    alignSelf: "flex-start",
  },
  text: {
    fontFamily: fonts.body,
    fontSize: fontSizes.small,
    fontWeight: fontWeights.semibold,
  },
});
