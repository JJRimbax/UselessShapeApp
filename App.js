import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import DrawingArea from './components/DrawingArea';
import BottomMenu from './components/BottomMenu';
import { FontAwesome } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();


function HomeScreen() {
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
      

      <TouchableOpacity style={styles.floatingButton} onPress={toggleMenu}>
        <FontAwesome name="bars" size={24} color="#fff" />
      </TouchableOpacity>
      

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

function InfoScreen() {
  return (
    <View style={styles.infoContainer}>
      <FontAwesome name="info-circle" size={100} color="#4CAF50" />
      <Text style={styles.infoText}>Bienvenue sur l'application de dessin de formes !</Text>
    </View>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            gestureEnabled: true, 
            headerShown: false, 
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Info" component={InfoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
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
  infoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  infoText: {
    marginTop: 20,
    fontSize: 18,
    color: '#333',
  },
});
