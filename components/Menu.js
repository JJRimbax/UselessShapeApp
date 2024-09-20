import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

function Menu({ setShape, setColor, handleReset, selectedShape, selectedColor }) {
  const colors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'cyan', 'black', 'white'];
  const shapes = ['circle', 'square', 'triangle', 'random'];

  const getShapeIcon = (shape) => {
    switch(shape) {
      case 'circle':
        return 'md-radio-button-on';
      case 'square':
        return 'md-square';
      case 'triangle':
        return 'md-triangle';
      case 'random':
        return 'md-shuffle';
      default:
        return 'md-radio-button-on';
    }
  };

  return (
    <View style={styles.menu}>
      <Text style={styles.heading}>Forme</Text>
      {shapes.map((s) => (
        <TouchableOpacity
          key={s}
          style={[
            styles.button,
            selectedShape === s && styles.activeButton
          ]}
          onPress={() => setShape(s)}
        >
          <Ionicons
            name={getShapeIcon(s)}
            size={20}
            color={selectedShape === s ? '#fff' : '#333'}
            style={{ marginRight: 8 }}
          />
          <Text style={[
            styles.buttonText,
            selectedShape === s ? styles.activeButtonText : null
          ]}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.heading}>Couleur</Text>
      <TouchableOpacity
        style={[
          styles.button,
          selectedColor === 'random' && styles.activeButton
        ]}
        onPress={() => setColor('random')}
      >
        <Ionicons
          name="md-color-palette"
          size={20}
          color={selectedColor === 'random' ? '#fff' : '#333'}
          style={{ marginRight: 8 }}
        />
        <Text style={[
          styles.buttonText,
          selectedColor === 'random' ? styles.activeButtonText : null
        ]}>
          Aléatoire
        </Text>
      </TouchableOpacity>
      <ScrollView 
        contentContainerStyle={styles.colorContainer} 
        horizontal={false}
      >
        {colors.map((c) => (
          <TouchableOpacity
            key={c}
            style={[
              styles.colorButton,
              { backgroundColor: c },
              selectedColor === c && styles.selectedColorButton
            ]}
            onPress={() => setColor(c)}
          />
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
        <Ionicons
          name="md-refresh"
          size={20}
          color="#fff"
          style={{ marginRight: 8 }}
        />
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
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 15,
    zIndex: 1000,
    borderRadius: 12,
    width: 160,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, 
  },
  heading: {
    fontWeight: '600',
    marginVertical: 8,
    fontSize: 16,
    color: '#333',
  },
  button: {
    marginVertical: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  activeButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: '#333',
    fontSize: 14,
  },
  activeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  colorContainer: {
    marginVertical: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  colorButton: {
    width: 30,
    height: 30,
    marginVertical: 5,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#fff',
  },
  selectedColorButton: {
    borderColor: '#000',
    borderWidth: 2,
  },
  resetButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#FF5252',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  resetButtonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default Menu;
