import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View, StyleSheet, TextInput} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import BoxContent from '../../Componentes/BoxContents';
import {BIBLIA_API_KEY} from '@env';
import HamburgerMenu from '../../Componentes/HambuguerMenu';
import BooksHandleRequestGet from '../../Componentes/HandleRequest/BooksHandleRequestGet';

// Função para remover acentos de uma string
const removeAccents = str => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const link = 'https://www.abibliadigital.com.br/api/books';
      const result = await BooksHandleRequestGet(link, BIBLIA_API_KEY);
      if (!result?.error) {
        setBooks(result);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const filteredBooks = books.filter(book =>
    removeAccents(book.name.toLowerCase()).includes(
      removeAccents(debouncedSearchTerm.toLowerCase()),
    ),
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        <HamburgerMenu showBackButton={false} />
        <Text style={styles.title}>
          Bem vindo ao app da biblia!! Escolha um dos livros abaixo
        </Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar livro..."
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        {loading ? (
          <SkeletonPlaceholder>
            <View style={styles.gridContainer}>
              {[...Array(6)].map((_, index) => (
                <View key={index} style={styles.skeletonBoxContent} />
              ))}
            </View>
          </SkeletonPlaceholder>
        ) : (
          <View style={styles.gridContainer}>
            {filteredBooks.map((book, index) => (
              <BoxContent
                key={book.name}
                content={{book}}
                style={styles.boxContent}
                index={index}
              />
            ))}
          </View>
        )}
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
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
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
  skeletonBoxContent: {
    width: '30%',
    height: 150, // Adjust the height as needed
    borderRadius: 5,
    marginBottom: 10,
  },
});
