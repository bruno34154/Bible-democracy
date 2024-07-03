import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

const OptionsMenu = ({
  disponibleVersion,
  handleVersionChange,
  speakChapter,
  increaseFontSize,
  decreaseFontSize,
  optionsVisible,
  toggleOptionsVisibility,
}) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.toggleOptionsButton}
        onPress={toggleOptionsVisibility}>
        <Text style={styles.toggleOptionsButtonText}>
          {optionsVisible ? 'Ocultar Opções' : 'Opções de leitura do capitulo'}
        </Text>
      </TouchableOpacity>
      {optionsVisible && (
        <View style={styles.optionsContainer}>
          <Text style={styles.title}>Versões da Biblia</Text>
          <View style={styles.versionButtonsContainer}>
            {disponibleVersion.map(version => (
              <TouchableOpacity
                key={version}
                style={styles.versionButton}
                onPress={handleVersionChange(version)}>
                <Text style={styles.versionButtonText}>
                  {version === 'ra' ? 'ARA' : version.toUpperCase()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.title}>Tamanho da fonte</Text>
          <View style={styles.fontSizeButtonsContainer}>
            <TouchableOpacity
              style={styles.fontSizeButton}
              onPress={increaseFontSize}>
              <Text style={styles.fontSizeButtonText}>A+</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.fontSizeButton}
              onPress={decreaseFontSize}>
              <Text style={styles.fontSizeButtonText}>A-</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  toggleOptionsButton: {
    backgroundColor: '#D43C12',
    padding: 10,
    borderRadius: 5,
    width: 250,
    alignItems: 'center',
    marginBottom: 20,
    marginLeft: 50,
  },
  toggleOptionsButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  optionsContainer: {
    marginBottom: 20,
  },
  versionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  versionButton: {
    padding: 10,
    backgroundColor: '#D43C12',
    borderRadius: 5,
  },
  versionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  speakButtonContainer: {
    backgroundColor: '#D43C12',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  speakButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  fontSizeButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  fontSizeButton: {
    padding: 10,
    backgroundColor: '#D43C12',
    borderRadius: 5,
  },
  fontSizeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
    color: 'black',
  },
});

export default OptionsMenu;
