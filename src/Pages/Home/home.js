import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View, StyleSheet} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import BoxContent from '../../Componentes/BoxContents';
import {BIBLIA_API_KEY} from '@env';
import HamburgerMenu from '../../Componentes/HambuguerMenu';
import BooksHandleRequestGet from '../../Componentes/HandleRequest/BooksHandleRequestGet';

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <ScrollView>
      <View style={styles.container}>
        <HamburgerMenu />
        <Text style={styles.title}>
          Bem vindo ao app da biblia!! Escolha um dos livros abaixo
        </Text>
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
            {books.map((book, index) => (
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
