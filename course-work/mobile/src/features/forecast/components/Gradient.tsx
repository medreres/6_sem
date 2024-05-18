import {StyleSheet, View, ViewProps} from 'react-native';
import Svg, {Defs, LinearGradient, Rect, Stop} from 'react-native-svg';

type GradientProps = {
  fromColor: string;
  toColor: string;
  children?: any;
  opacityColor1?: number;
  opacityColor2?: number;
} & ViewProps;

const style = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export function Gradient({
  children,
  fromColor,
  toColor,
  opacityColor1 = 1,
  opacityColor2 = 1,
  ...otherViewProps
}: GradientProps) {
  const gradientUniqueId = `grad${fromColor}+${toColor}`.replace(
    /[^a-zA-Z0-9 ]/g,
    '',
  );
  return (
    <>
      <View
        style={[
          {
            ...StyleSheet.absoluteFillObject,
            ...style.container,
          },
          otherViewProps.style,
        ]}
        {...otherViewProps}>
        <Svg height="100%" width="100%" style={StyleSheet.absoluteFillObject}>
          <Defs>
            <LinearGradient
              id={gradientUniqueId}
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%">
              <Stop
                offset="0"
                stopColor={fromColor}
                stopOpacity={opacityColor1}
              />
              <Stop
                offset="1"
                stopColor={toColor}
                stopOpacity={opacityColor2}
              />
            </LinearGradient>
          </Defs>
          <Rect width="100%" height="100%" fill={`url(#${gradientUniqueId})`} />
        </Svg>
      </View>
      {children}
    </>
  );
}
