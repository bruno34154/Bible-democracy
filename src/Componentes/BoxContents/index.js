import React from 'react';
import {Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Animated, {FadeInLeft, FadeOutRight} from 'react-native-reanimated';

export default function BoxContent({content, style, index}) {
  const navigate = useNavigation();

  const readBook = () => {
    navigate.navigate('Book', {
      content: content,
    });
  };

  return (
    <Animated.View
      style={[styles.container, style]}
      entering={FadeInLeft.duration(700)
        .springify()
        .damping(8)
        .delay(index * 100)}
      exiting={FadeOutRight}>
      <Image source={require('../../Assets/biblia.png')} style={styles.image} />
      <Text style={styles.name}>{content.book.name}</Text>
      <Text style={styles.quantity}>{content.book.chapters} capitulos</Text>
      <TouchableOpacity style={styles.button} onPress={readBook}>
        <Text style={styles.buttonText}>Ler</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 2,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
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
    marginTop: 10,
    width: 100,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
