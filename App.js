import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import DrawingArea from './components/DrawingArea';
import BottomMenu from './components/BottomMenu';
import { FontAwesome } from '@expo/vector-icons'; 

export default function App() {
  const [shape, setShape] = useState('circle'); 
  const [color, setColor] = useState('random'); 
  const [reset, setReset] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  useEffect(() => {
    console.log(`Shape changé en: ${shape}`);
  }, [shape]);

  useEffect(() => {
    console.log(`Couleur changée en: ${color}`);
  }, [color]);

  const handleReset = () => {
    setReset(true);
    setTimeout(() => setReset(false), 0); 
    console.log('Réinitialisation des formes.');
  };

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
    console.log(`Menu ${!isMenuVisible ? 'ouvert' : 'fermé'}.`);
  };

  return (
    <View style={styles.container}>
      <DrawingArea shape={shape} color={color} reset={reset} />
      
      {/* Bouton flottant pour ouvrir/fermer le menu */}
      <TouchableOpacity style={styles.floatingButton} onPress={toggleMenu}>
        <FontAwesome name="bars" size={24} color="#fff" />
      </TouchableOpacity>
      
      {/* Menu en bas de l'écran */}
      <BottomMenu
        isVisible={isMenuVisible}
        toggleMenu={toggleMenu}
        setShape={setShape}
        setColor={setColor}
        handleReset={handleReset}
        selectedShape={shape}
        selectedColor={color}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30, 
    right: 20,
    backgroundColor: '#4CAF50',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, 
  },
});
