import React from 'react';
import {View, StyleSheet, Text, FlatList, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import HamburgerMenu from '../../Componentes/HambuguerMenu';

export default function Book({route}) {
  const navigation = useNavigation();
  const {content} = route.params;
  const chapters = Array.from(
    {length: content.book.chapters},
    (_, index) => index + 1,
  );

  const openChapter = chapter => {
    navigation.navigate('Chapter', {
      name: content.book.name,
      chapter: chapter,
      abbrev: content.book.abbrev,
    });
  };

  return (
    <View style={styles.container}>
      <HamburgerMenu />
      <Text style={styles.title}>{content.book.name}</Text>
      <Text style={styles.description}>{content.book.chapters} Capitulos</Text>
      <FlatList
        data={chapters}
        numColumns={4}
        keyExtractor={item => item.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.chapterBox}
            onPress={() => openChapter(item)}>
            <Text style={styles.chapterText}>{item}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.gridContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  gridContainer: {
    justifyContent: 'center',
  },
  chapterBox: {
    flex: 1,
    margin: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chapterText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#D43C12',
  },
});
