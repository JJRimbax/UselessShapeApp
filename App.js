import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import DrawingArea from './components/DrawingArea';
import Menu from './components/Menu';

export default function App() {
  const [shape, setShape] = useState('circle'); 
  const [color, setColor] = useState('random'); 
  const [reset, setReset] = useState(false);

  const handleReset = () => {
    setReset(true);
    setTimeout(() => setReset(false), 0); 
  };

  return (
    <View style={styles.container}>
      <Menu setShape={setShape} setColor={setColor} handleReset={handleReset} />
      <DrawingArea shape={shape} color={color} reset={reset} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
