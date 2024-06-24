import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  Linking,
} from 'react-native';

const WordMenu = ({isVisible, onClose, onMarkWord, text}) => {
  if (!isVisible) {
    return null;
  }

  const handleMarkWord = () => {
    onMarkWord();
    onClose();
  };

  const handleOpenLink = link => () => {
    const url = link; // URL que você deseja abrir
    Linking.openURL(url).catch(err =>
      console.error('Erro ao abrir o link:', err),
    );
  };
  const goBack = () => {
    onClose();
  };

  return (
    <View style={styles.container}>
      <View style={styles.menu}>
        <Text>{text}</Text>
        <View style={styles.icons}>
          <TouchableOpacity style={styles.menuItem} onPress={goBack}>
            <Image
              source={require('../../Assets/anterior.png')}
              style={styles.menuItemIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={handleMarkWord}>
            <Image
              source={require('../../Assets/check.png')}
              style={styles.menuItemIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={handleOpenLink(
              `https://www.google.com/search?q=meaning+of+${encodeURIComponent(
                text,
              )}`,
            )}>
            <Image
              source={require('../../Assets/dicionario.png')}
              style={styles.menuItemIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={handleOpenLink(
              `https://www.google.com/search?q=synonyms+for+${encodeURIComponent(
                text,
              )}`,
            )}>
            <Image
              source={require('../../Assets/encontrar.png')}
              style={styles.menuItemIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100, // Garante que o menu fique sobreposto aos versos
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menu: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 5,
  },
  icons: {
    flexDirection: 'row', // Para alinhar os ícones lado a lado
    justifyContent: 'center', // Alinha os ícones ao centro horizontalmente
    marginTop: 10, // Espaçamento superior entre o texto e os ícones
  },
  menuItem: {
    padding: 10,
  },
  menuItemIcon: {
    width: 20,
    height: 20,
  },
});

export default WordMenu;
