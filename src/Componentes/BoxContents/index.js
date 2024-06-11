import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import bookNames from '../bookNames';
export default function BoxContent({content, style}) {
  const navigate = useNavigation();

  const readBook = () => {
    navigate.navigate('Book', {
      content: content,
    });
  };
  //const bookNameInPortuguese = bookNames[content.name] || content.name;
  return (
    <View style={[styles.container, style]}>
      <Image source={require('../../Assets/biblia.png')} style={styles.image} />
      <Text style={styles.name}>{content.book.name}</Text>
      <Text style={styles.quantity}>{content.book.quantity} capitulos</Text>
      <TouchableOpacity style={styles.button} onPress={readBook}>
        <Text style={styles.buttonText}>Ler</Text>
      </TouchableOpacity>
      {/* Adicione outros detalhes do espaço conforme necessário */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  image: {
    width: 100, // ajuste conforme necessário
    height: 100, // ajuste conforme necessário
    resizeMode: 'contain', // ajusta a imagem dentro do espaço definido sem distorção
    marginBottom: 10, // espaço entre a imagem e o texto abaixo
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },
  quantity: {
    fontSize: 14,
    color: 'black',
  },
  button: {
    backgroundColor: '#D43C12',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 10, // espaço entre o texto e o botão
    width: 100,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
