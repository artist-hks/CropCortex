import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, Circle, Line, Text as SvgText } from 'react-native-svg';
import { colors } from '../constants/colors';

interface DataPoint {
  label: string;
  value: number;
}

interface LineChartSVGProps {
  data: DataPoint[];
  color?: string;
  width?: number;
  height?: number;
  showDots?: boolean;
  showLabels?: boolean;
  showGrid?: boolean;
  fillOpacity?: number;
}

export const LineChartSVG: React.FC<LineChartSVGProps> = ({
  data,
  color = colors.primaryLight,
  width = 320,
  height = 180,
  showDots = true,
  showLabels = true,
  showGrid = true,
  fillOpacity = 0.1,
}) => {
  if (data.length === 0) return null;

  const paddingLeft = 40;
  const paddingRight = 16;
  const paddingTop = 16;
  const paddingBottom = showLabels ? 32 : 16;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const values = data.map((d) => d.value);
  const minValue = Math.min(...values) * 0.9;
  const maxValue = Math.max(...values) * 1.1;
  const valueRange = maxValue - minValue || 1;

  const getX = (index: number) => paddingLeft + (index / (data.length - 1)) * chartWidth;
  const getY = (value: number) => paddingTop + chartHeight - ((value - minValue) / valueRange) * chartHeight;

  // Build path
  const points = data.map((d, i) => ({ x: getX(i), y: getY(d.value) }));

  let pathD = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const cpx1 = prev.x + (curr.x - prev.x) * 0.4;
    const cpx2 = curr.x - (curr.x - prev.x) * 0.4;
    pathD += ` C ${cpx1} ${prev.y} ${cpx2} ${curr.y} ${curr.x} ${curr.y}`;
  }

  // Fill path
  const fillD = pathD + ` L ${points[points.length - 1].x} ${paddingTop + chartHeight} L ${points[0].x} ${paddingTop + chartHeight} Z`;

  // Y-axis labels
  const ySteps = 4;
  const yLabels = Array.from({ length: ySteps + 1 }, (_, i) => {
    const val = minValue + (valueRange / ySteps) * i;
    return Math.round(val);
  });

  return (
    <View style={[styles.container, { width, height }]}>
      <Svg width={width} height={height}>
        {/* Grid lines */}
        {showGrid &&
          yLabels.map((val, i) => {
            const y = getY(val);
            return (
              <React.Fragment key={`grid-${i}`}>
                <Line
                  x1={paddingLeft}
                  y1={y}
                  x2={width - paddingRight}
                  y2={y}
                  stroke={colors.divider}
                  strokeWidth={1}
                  strokeDasharray="4 4"
                />
                <SvgText
                  x={paddingLeft - 8}
                  y={y + 4}
                  fill={colors.textSecondary}
                  fontSize={10}
                  textAnchor="end"
                  fontFamily="NotoSans_400Regular"
                >
                  {val}
                </SvgText>
              </React.Fragment>
            );
          })}

        {/* Area fill */}
        <Path d={fillD} fill={color} opacity={fillOpacity} />

        {/* Line */}
        <Path d={pathD} stroke={color} strokeWidth={2.5} fill="none" strokeLinecap="round" strokeLinejoin="round" />

        {/* Dots */}
        {showDots &&
          points.map((point, i) => (
            <React.Fragment key={`dot-${i}`}>
              <Circle cx={point.x} cy={point.y} r={4} fill={color} />
              <Circle cx={point.x} cy={point.y} r={2} fill="#fff" />
            </React.Fragment>
          ))}

        {/* Highlight last point */}
        {points.length > 0 && (
          <>
            <Circle
              cx={points[points.length - 1].x}
              cy={points[points.length - 1].y}
              r={7}
              fill={color}
              opacity={0.2}
            />
            <Circle
              cx={points[points.length - 1].x}
              cy={points[points.length - 1].y}
              r={5}
              fill={color}
            />
            <Circle
              cx={points[points.length - 1].x}
              cy={points[points.length - 1].y}
              r={2.5}
              fill="#fff"
            />
          </>
        )}

        {/* X-axis labels */}
        {showLabels &&
          data.map((d, i) => (
            <SvgText
              key={`label-${i}`}
              x={getX(i)}
              y={height - 6}
              fill={colors.textSecondary}
              fontSize={10}
              textAnchor="middle"
              fontFamily="NotoSans_400Regular"
            >
              {d.label}
            </SvgText>
          ))}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
});

export default LineChartSVG;
