// components/BottomMenu.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Import de FontAwesome
import Modal from 'react-native-modal'; // Import de react-native-modal

function BottomMenu({ isVisible, toggleMenu, setShape, setColor, handleReset, selectedShape, selectedColor }) {
  const COLORS = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'cyan', 'black', 'white'];
  const shapes = ['circle', 'square', 'triangle', 'random'];

  // Fonction pour obtenir l'icône correspondante à une forme
  const getShapeIcon = (shape) => {
    switch(shape) {
      case 'circle':
        return 'circle';
      case 'square':
        return 'square';
      case 'triangle':
        return 'caret-up'; // Utilisation d'un caret-up comme substitut pour triangle
      case 'random':
        return 'random';
      default:
        return 'circle';
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={toggleMenu}
      onSwipeComplete={toggleMenu}
      swipeDirection={['down']}
      style={styles.modal}
      propagateSwipe={true}
      animationIn="slideInUp"
      animationOut="slideOutDown"
    >
      <View style={styles.container}>
        {/* Barre de poignée pour fermer le menu */}
        <TouchableOpacity onPress={toggleMenu} style={styles.handle}>
          <View style={styles.handleBar} />
        </TouchableOpacity>

        {/* Contenu du menu */}
        <View style={styles.content}>
          <Text style={styles.heading}>Forme</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
            {shapes.map((s) => (
              <TouchableOpacity
                key={s}
                style={[
                  styles.button,
                  selectedShape === s && styles.activeButton
                ]}
                onPress={() => {
                  setShape(s);
                  console.log(`Forme sélectionnée: ${s}`);
                }}
              >
                <FontAwesome
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
          </ScrollView>

          <Text style={styles.heading}>Couleur</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.colorScroll}>
            {COLORS.map((c) => (
              <TouchableOpacity
                key={c}
                style={[
                  styles.colorButton,
                  { backgroundColor: c },
                  selectedColor === c && styles.selectedColorButton
                ]}
                onPress={() => {
                  setColor(c);
                  console.log(`Couleur sélectionnée: ${c}`);
                }}
              />
            ))}
          </ScrollView>

          <TouchableOpacity style={styles.resetButton} onPress={() => {
            handleReset();
            console.log('Bouton Reset Pressé');
          }}>
            <FontAwesome
              name="refresh"
              size={20}
              color="#fff"
              style={{ marginRight: 8 }}
            />
            <Text style={styles.resetButtonText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 10,
    paddingBottom: 30,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Pour Android
  },
  handle: {
    alignItems: 'center',
    marginBottom: 10,
  },
  handleBar: {
    width: 40,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#ccc',
  },
  content: {
    // Styles pour le contenu
  },
  heading: {
    fontWeight: '600',
    marginVertical: 8,
    fontSize: 16,
    color: '#333',
  },
  scrollContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
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
  colorScroll: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  colorButton: {
    width: 30,
    height: 30,
    marginRight: 10,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#fff',
  },
  selectedColorButton: {
    borderColor: '#000',
    borderWidth: 2,
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#FF5252',
    borderRadius: 8,
    justifyContent: 'center',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  resetButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default BottomMenu;
