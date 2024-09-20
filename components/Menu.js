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
      <ScrollView>
        {colors.map((c) => (
          <TouchableOpacity
            key={c}
            style={[styles.colorButton, { backgroundColor: c }]}
            onPress={() => setColor(c)}
          />
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    position: 'absolute',
    left: 10,
    top: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    zIndex: 1000,
    borderRadius: 5,
    maxHeight: '90%',
  },
  heading: {
    fontWeight: 'bold',
    marginVertical: 5,
  },
  button: {
    marginVertical: 5,
    padding: 5,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  buttonText: {
    textAlign: 'center',
  },
  colorButton: {
    width: 30,
    height: 30,
    marginVertical: 5,
    borderRadius: 15,
  },
  resetButton: {
    marginTop: 10,
    padding: 5,
    backgroundColor: '#f00',
    borderRadius: 5,
  },
});

export default Menu;
