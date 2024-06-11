import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

const HamburgerMenu = ({compareVerses}) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenuVisibility = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.hamburgerButton}
        onPress={toggleMenuVisibility}>
        <Text style={styles.hamburgerButtonText}>☰</Text>
      </TouchableOpacity>
      {menuVisible && (
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem} onPress={compareVerses}>
            <Text style={styles.menuItemText}>Comparar Versículos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={compareVerses}>
            <Text style={styles.menuItemText}>Localizar Igrejas</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10, // Ensures the menu is on top of other content
  },
  hamburgerButton: {
    backgroundColor: '#D43C12',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  hamburgerButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  menuContainer: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 5,
    marginTop: 10,
    elevation: 1,
    zIndex: 10,
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#D43C12',
    borderRadius: 5,
    marginBottom: 10,
  },
  menuItemText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HamburgerMenu;
