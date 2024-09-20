import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, PanResponder } from 'react-native';
import Shape from './Shape';

function DrawingArea({ shape, color, reset }) {
  const [shapes, setShapes] = useState([]);
  const [currentShape, setCurrentShape] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const sizeRef = useRef(10);

  const getRandomColor = () => {
    const colors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'cyan', 'black', 'white'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const getRandomShape = () => {
    const shapes = ['circle', 'square', 'triangle'];
    return shapes[Math.floor(Math.random() * shapes.length)];
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        const posX = evt.nativeEvent.locationX;
        const posY = evt.nativeEvent.locationY;
        sizeRef.current = 10;
        const newShape = {
          x: posX,
          y: posY,
          size: sizeRef.current,
          color: color === 'random' ? getRandomColor() : color,
          shape: shape === 'random' ? getRandomShape() : shape,
        };
        setCurrentShape(newShape);
        setIsDrawing(true);
      },
      onPanResponderMove: () => {
        if (isDrawing) {
          sizeRef.current += 2;
          setCurrentShape((prevShape) => ({
            ...prevShape,
            size: sizeRef.current,
          }));
        }
      },
      onPanResponderRelease: () => {
        if (currentShape) {
          setShapes((prevShapes) => [...prevShapes, currentShape]);
          setCurrentShape(null);
          setIsDrawing(false);
        }
      },
    })
  ).current;

  useEffect(() => {
    if (reset) {
      setShapes([]);
      setCurrentShape(null);
    }
  }, [reset]);

  return (
    <View style={styles.drawingArea} {...panResponder.panHandlers}>
      {shapes.map((shapeProps, index) => (
        <Shape key={index} {...shapeProps} />
      ))}
      {currentShape && <Shape {...currentShape} />}
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
