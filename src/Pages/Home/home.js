import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View, StyleSheet} from 'react-native';
import axios from 'axios';
import BoxContent from '../../Componentes/BoxContents';
import {BIBLIA_API_KEY} from '@env';
export default function Home() {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    axios
      .get(`https://api.biblia.com/v1/bible/contents/LEB?key=${BIBLIA_API_KEY}`)
      .then(response => {
        setBooks(response.data.books);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);
  return (
    <ScrollView>
      <View>
        <Text style={styles.title}>
          Bem vindo ao app da biblia!! Escolha um dos livros abaixo
        </Text>
        <View style={styles.gridContainer}>
          {books.map(book => (
            <BoxContent
              key={book.passage}
              content={{
                name: book.passage,
                quantity: book.chapters.length,
              }}
              style={styles.boxContent}
            />
          ))}
        </View>
      </View>
    </ScrollView>
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
    marginTop: 10,
    color: 'black',
  },
  gridContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  boxContent: {
    width: '30%', // Adjust the width to ensure two items per row with space between
    marginBottom: 10,
  },
});
