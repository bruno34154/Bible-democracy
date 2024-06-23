import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Animated, {
  BounceIn,
  SlideInRight,
  SlideOutRight,
} from 'react-native-reanimated';

const HamburgerMenu = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const navigate = useNavigation();
  const compareVerses = () => {
    navigate.navigate('CompareVerses');
  };
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
        <Animated.View
          key={'HamburgerMenu'}
          style={styles.menuContainer}
          entering={SlideInRight.duration(500)}
          exiting={SlideOutRight.duration(500)}>
          <Animated.View entering={BounceIn.delay(300)} style={styles.menuItem}>
            <TouchableOpacity onPress={compareVerses}>
              <Text style={styles.menuItemText}>Comparar Versículos</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View entering={BounceIn.delay(500)} style={styles.menuItem}>
            <TouchableOpacity
              onPress={() => {
                console.log('localizar igrejas');
              }}>
              <Text style={styles.menuItemText}>Localizar Igrejas</Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  hamburgerButton: {
    backgroundColor: '#D43C12',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: 40,
    height: 40,
    position: 'absolute',
    right: 0,
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
    marginTop: 50,
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
