import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View, StyleSheet} from 'react-native';
import axios from 'axios';
import BoxContent from '../../Componentes/BoxContents';
import {BIBLIA_API_KEY} from '@env';
import HamburgerMenu from '../../Componentes/HambuguerMenu';
export default function Home() {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    axios
      .get('https://www.abibliadigital.com.br/api/books', {
        headers: {
          Authorization: `Bearer ${BIBLIA_API_KEY}`,
        },
      })
      .then(response => {
        setBooks(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);
  return (
    <ScrollView>
      <View>
        <HamburgerMenu />
        <Text style={styles.title}>
          Bem vindo ao app da biblia!! Escolha um dos livros abaixo
        </Text>
        <View style={styles.gridContainer}>
          {books.map(book => (
            <BoxContent
              key={book.name}
              content={{
                book: book,
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
    marginTop: 70,
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