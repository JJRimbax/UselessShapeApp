import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

function Menu({ setShape, setColor, handleReset }) {
  const colors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'cyan', 'black', 'white'];
  const shapes = ['circle', 'square', 'triangle', 'random'];

  return (
    <View style={styles.menu}>
      <Text style={styles.heading}>Forme</Text>
      {shapes.map((s) => (
        <TouchableOpacity key={s} style={styles.button} onPress={() => setShape(s)}>
          <Text style={styles.buttonText}>{s.charAt(0).toUpperCase() + s.slice(1)}</Text>
        </TouchableOpacity>
      ))}
      <Text style={styles.heading}>Couleur</Text>
      <TouchableOpacity style={styles.button} onPress={() => setColor('random')}>
        <Text style={styles.buttonText}>Aléatoire</Text>
      </TouchableOpacity>
      <ScrollView style={styles.colorContainer}>
        {colors.map((c) => (
          <TouchableOpacity
            key={c}
            style={[styles.colorButton, { backgroundColor: c }]}
            onPress={() => setColor(c)}
          />
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
        <Text style={styles.resetButtonText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    position: 'absolute',
    left: 10,
    top: 10,
    backgroundColor: '#ffffffcc',
    padding: 10,
    zIndex: 1000,
    borderRadius: 10,
    width: 120,
    maxHeight: '90%',
  },
  heading: {
    fontWeight: 'bold',
    marginVertical: 5,
    fontSize: 16,
    color: '#333',
  },
  button: {
    marginVertical: 5,
    padding: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  buttonText: {
    textAlign: 'center',
    color: '#333',
  },
  colorContainer: {
    marginVertical: 5,
  },
  colorButton: {
    width: 30,
    height: 30,
    marginVertical: 5,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  resetButton: {
    marginTop: 10,
    padding: 8,
    backgroundColor: '#ff5252',
    borderRadius: 5,
  },
  resetButtonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Menu;
