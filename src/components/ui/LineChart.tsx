import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { useTheme } from "../../context/ThemeContext";

interface ChartDataPoint {
  label: string;
  value: number;
}

interface LineChartProps {
  data: ChartDataPoint[];
  height?: number;
  showLabels?: boolean;
  showValues?: boolean;
  lineColor?: string;
  fillColor?: string;
}

export function LineChart({
  data,
  height = 120,
  showLabels = true,
  showValues = false,
  lineColor,
  fillColor,
}: LineChartProps) {
  const { colors } = useTheme();

  const chartWidth = Dimensions.get("window").width - 64;
  const maxValue = Math.max(...data.map((d) => d.value));
  const minValue = Math.min(...data.map((d) => d.value));
  const range = maxValue - minValue || 1;

  const strokeColor = lineColor || colors.primary;
  const fill = fillColor || `${colors.primary}20`;

  const getY = (value: number) => {
    return height - ((value - minValue) / range) * height;
  };

  const getX = (index: number) => {
    return (index / (data.length - 1)) * chartWidth;
  };

  const pathD = data
    .map((point, index) => {
      const x = getX(index);
      const y = getY(point.value);
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  const areaD = `${pathD} L ${chartWidth} ${height} L 0 ${height} Z`;

  return (
    <View style={styles.container}>
      {showValues && (
        <View style={styles.valuesContainer}>
          {data.map((point, index) => (
            <Text
              key={index}
              style={[styles.valueText, { color: colors.onSurfaceVariant }]}
            >
              {point.value}
            </Text>
          ))}
        </View>
      )}
      <View style={[styles.chartContainer, { height }]}>
        <View style={[styles.svgContainer, { height }]}>
          {data.map((point, index) => {
            const x = getX(index);
            const y = getY(point.value);
            return (
              <View
                key={index}
                style={[
                  styles.pointContainer,
                  {
                    left: x - 4,
                    top: y - 4,
                  },
                ]}
              >
                <View
                  style={[
                    styles.point,
                    { backgroundColor: strokeColor },
                  ]}
                />
              </View>
            );
          })}
          {data.map((point, index) => {
            const x = getX(index);
            const nextX = index < data.length - 1 ? getX(index + 1) : x;
            const y = getY(point.value);
            const nextY = index < data.length - 1 ? getY(data[index + 1].value) : y;
            const lineLength = Math.sqrt(
              Math.pow(nextX - x, 2) + Math.pow(nextY - y, 2)
            );
            const angle = Math.atan2(nextY - y, nextX - x) * (180 / Math.PI);
            return (
              <View
                key={`line-${index}`}
                style={[
                  styles.line,
                  {
                    width: lineLength,
                    backgroundColor: strokeColor,
                    left: x,
                    top: y,
                    transform: [{ rotate: `${angle}deg` }],
                    transformOrigin: "left center",
                  },
                ]}
              />
            );
          })}
        </View>
      </View>
      {showLabels && (
        <View style={styles.labelsContainer}>
          {data.map((point, index) => (
            <Text
              key={index}
              style={[styles.label, { color: colors.onSurfaceVariant }]}
            >
              {point.label}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  valuesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 8,
  },
  valueText: {
    fontFamily: "Inter",
    fontSize: 10,
    textAlign: "center",
    flex: 1,
  },
  chartContainer: {
    width: "100%",
    position: "relative",
  },
  svgContainer: {
    width: "100%",
    position: "relative",
  },
  pointContainer: {
    position: "absolute",
    width: 8,
    height: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  point: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  line: {
    position: "absolute",
    height: 2,
  },
  labelsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 8,
  },
  label: {
    fontFamily: "Inter",
    fontSize: 10,
    textAlign: "center",
    flex: 1,
  },
});
