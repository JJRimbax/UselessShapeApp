import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

function Shape({ x, y, size, color, shape }) {
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  }, []);

  const commonStyle = {
    position: 'absolute',
    left: x - size / 2,
    top: y - size / 2,
    transform: [{ scale: scaleAnim }],
  };

  if (shape === 'circle') {
    return (
      <Animated.View
        style={[
          commonStyle,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: color,
          },
        ]}
      />
    );
  } else if (shape === 'square') {
    return (
      <Animated.View
        style={[
          commonStyle,
          {
            width: size,
            height: size,
            backgroundColor: color,
          },
        ]}
      />
    );
  } else if (shape === 'triangle') {
    return (
      <Animated.View
        style={[
          commonStyle,
          {
            width: 0,
            height: 0,
            backgroundColor: 'transparent',
            borderLeftWidth: size / 2,
            borderRightWidth: size / 2,
            borderBottomWidth: size,
            borderLeftColor: 'transparent',
            borderRightColor: 'transparent',
            borderBottomColor: color,
          },
        ]}
      />
    );
  }
  return null;
}

export default Shape;
