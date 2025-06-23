"use client"

import { forwardRef, useCallback, useImperativeHandle, useRef } from "react"
import { Pressable, StyleSheet, type ViewProps } from "react-native"
import Svg, { Path } from "react-native-svg"
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withDelay, useAnimatedProps } from "react-native-reanimated"

const AnimatedPath = Animated.createAnimatedComponent(Path)

export interface WifiIconHandle {
  startAnimation: () => void
}

interface WifiIconProps extends ViewProps {
  size?: number
  color?: string
  onPress?: () => void
}

const WIFI_LEVELS = [
  { d: "M12 20h.01", initialOpacity: 1, delay: 0 },
  { d: "M8.5 16.429a5 5 0 0 1 7 0", initialOpacity: 1, delay: 0.1 },
  { d: "M5 12.859a10 10 0 0 1 14 0", initialOpacity: 1, delay: 0.2 },
  { d: "M2 8.82a15 15 0 0 1 20 0", initialOpacity: 1, delay: 0.3 },
]

const WifiIcon = forwardRef<WifiIconHandle, WifiIconProps>(
  ({ onPress, style, size = 28, color = "currentColor", ...props }, ref) => {
    const isControlledRef = useRef(false)
    const opacityValues = WIFI_LEVELS.map(() => useSharedValue(1))

    const resetAnimation = useCallback(() => {
      // Reset all levels to invisible except the first one
      opacityValues.forEach((opacity, index) => {
        opacity.value = index === 0 ? 1 : 0
      })
    }, [opacityValues])

    const startAnimation = useCallback(() => {
      // First reset all animations
      resetAnimation()

      // Then animate each level with its delay
      WIFI_LEVELS.forEach((level, index) => {
        opacityValues[index].value = withDelay(level.delay * 1000, withSpring(1, { damping: 20, stiffness: 300 }))
      })
    }, [opacityValues, resetAnimation])

    useImperativeHandle(ref, () => {
      isControlledRef.current = true
      return {
        startAnimation,
      }
    })

    const handlePress = useCallback(() => {
      if (!isControlledRef.current) {
        startAnimation()
      }
      onPress?.()
    }, [onPress, startAnimation])

    return (
      <Pressable style={[styles.container, style]} onPress={handlePress} {...props}>
        <Svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {WIFI_LEVELS.map((level, index) => {
            const animatedProps = useAnimatedProps(() => {
              return {
                opacity: opacityValues[index].value,
              }
            })

            return <AnimatedPath key={index} d={level.d} animatedProps={animatedProps} />
          })}
        </Svg>
      </Pressable>
    )
  },
)

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
})

WifiIcon.displayName = "WifiIcon"

export { WifiIcon }

