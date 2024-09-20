import React, { useState, useEffect, useRef, useMemo } from 'react';
import { View, StyleSheet, PanResponder } from 'react-native';
import Shape from './Shape';

function DrawingArea({ shape, color, reset }) {
  const [shapes, setShapes] = useState([]);
  const growInterval = useRef(null);
  const currentShapeRef = useRef(null);

  const getRandomColor = () => {
    const colors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'cyan', 'black', 'white'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const getRandomShape = () => {
    const shapesArray = ['circle', 'square', 'triangle'];
    return shapesArray[Math.floor(Math.random() * shapesArray.length)];
  };


  useEffect(() => {
    console.log(`DrawingArea: shape = ${shape}, color = ${color}`);
  }, [shape, color]);

  const panResponder = useMemo(() => 
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        const { locationX, locationY } = evt.nativeEvent;
        console.log(`Touch at x: ${locationX}, y: ${locationY}`);

        const initialSize = 10;
        const newShape = {
          id: Date.now() + Math.random(), 
          x: locationX,
          y: locationY,
          size: initialSize,
          color: color === 'random' ? getRandomColor() : color,
          shape: shape === 'random' ? getRandomShape() : shape,
        };
        console.log(`Creating new shape: ${JSON.stringify(newShape)}`);
        currentShapeRef.current = newShape;
        setShapes(prevShapes => [...prevShapes, currentShapeRef.current]);

        growInterval.current = setInterval(() => {
          setShapes(prevShapes => 
            prevShapes.map(s => 
              s.id === currentShapeRef.current.id ? { ...s, size: s.size + 2 } : s
            )
          );
        }, 50);
      },
      onPanResponderRelease: () => {
        if (growInterval.current) {
          clearInterval(growInterval.current);
          growInterval.current = null;
          currentShapeRef.current = null;
        }
      },
      onPanResponderTerminate: () => {
        if (growInterval.current) {
          clearInterval(growInterval.current);
          growInterval.current = null;
          currentShapeRef.current = null;
        }
      },
    }), [shape, color]);

  useEffect(() => {
    if (reset) {
      setShapes([]);
      currentShapeRef.current = null;
      if (growInterval.current) {
        clearInterval(growInterval.current);
        growInterval.current = null;
      }
      console.log('DrawingArea: Reset effectué.');
    }
  }, [reset]);

  return (
    <View style={styles.drawingArea} {...panResponder.panHandlers}>
      {shapes.map(shapeItem => (
        <Shape key={shapeItem.id} {...shapeItem} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  drawingArea: {
    flex: 1,
    backgroundColor: '#fff', 
  },
});

export default DrawingArea;
