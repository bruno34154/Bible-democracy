import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import HamburgerMenu from '../../Componentes/HambuguerMenu';
import {BIBLIA_API_KEY} from '@env';
import {Picker} from '@react-native-picker/picker';
import BooksHandleRequestGet from '../../Componentes/HandleRequest/BooksHandleRequestGet';

export default function CompareVerses() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('');
  const [selectedVerse, setSelectedVerse] = useState('');
  const [selectedTranslation1, setSelectedTranslation1] = useState('nvi');
  const [selectedTranslation2, setSelectedTranslation2] = useState('acf');
  const [verseText1, setVerseText1] = useState('');
  const [verseText2, setVerseText2] = useState('');
  const [loadingBooks, setLoadingBooks] = useState(true);
  const [loadingVerses, setLoadingVerses] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const link = 'https://www.abibliadigital.com.br/api/books';
      const result = await BooksHandleRequestGet(link, BIBLIA_API_KEY);
      setBooks(result);
      setLoadingBooks(false);
    };

    fetchData();
  }, []);

  const fetchVerseText = (book, chapter, verse, translation, setText) => {
    if (book && chapter && verse && translation) {
      setLoadingVerses(true);
      const fetchData = async () => {
        const link = `https://www.abibliadigital.com.br/api/verses/${translation}/${book}/${chapter}/${verse}`;
        const result = await BooksHandleRequestGet(link, BIBLIA_API_KEY);
        setText(result.text);
        setLoadingVerses(false);
      };

      fetchData();
    }
  };

  const handleCompare = () => {
    setVerseText1('');
    setVerseText2('');
    fetchVerseText(
      selectedBook,
      selectedChapter,
      selectedVerse,
      selectedTranslation1,
      setVerseText1,
    );
    fetchVerseText(
      selectedBook,
      selectedChapter,
      selectedVerse,
      selectedTranslation2,
      setVerseText2,
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <HamburgerMenu />
        <Text style={styles.title}>Comparar os versículos</Text>
        {loadingBooks ? (
          <SkeletonPlaceholder>
            <View style={styles.skeletonPicker} />
            <View style={styles.skeletonInput} />
            <View style={styles.skeletonInput} />
            <View style={styles.skeletonPicker} />
            <View style={styles.skeletonPicker} />
          </SkeletonPlaceholder>
        ) : (
          <>
            <View style={styles.pickerContainer}>
              <Text style={styles.label}>Livro:</Text>
              <Picker
                selectedValue={selectedBook}
                style={styles.picker}
                onValueChange={itemValue => setSelectedBook(itemValue)}>
                {books.map(book => (
                  <Picker.Item
                    key={book.abbrev.pt}
                    label={book.name}
                    value={book.abbrev.pt}
                  />
                ))}
              </Picker>
              <TextInput
                style={styles.input}
                placeholder="Capítulo"
                keyboardType="numeric"
                value={selectedChapter}
                onChangeText={setSelectedChapter}
              />
              <TextInput
                style={styles.input}
                placeholder="Versículo"
                keyboardType="numeric"
                value={selectedVerse}
                onChangeText={setSelectedVerse}
              />
            </View>
            <View style={styles.pickerContainer}>
              <Text style={styles.label}>Tradução 1:</Text>
              <Picker
                selectedValue={selectedTranslation1}
                style={styles.picker}
                onValueChange={itemValue => setSelectedTranslation1(itemValue)}>
                <Picker.Item label="NVI" value="nvi" />
                <Picker.Item label="ACF" value="acf" />
                <Picker.Item label="ARA" value="ra" />
              </Picker>
              <Text style={styles.label}>Tradução 2:</Text>
              <Picker
                selectedValue={selectedTranslation2}
                style={styles.picker}
                onValueChange={itemValue => setSelectedTranslation2(itemValue)}>
                <Picker.Item label="NVI" value="nvi" />
                <Picker.Item label="ACF" value="acf" />
                <Picker.Item label="ARA" value="ra" />
              </Picker>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleCompare}>
              <Text style={styles.buttonText}>Comparar</Text>
            </TouchableOpacity>
            {loadingVerses ? (
              <SkeletonPlaceholder>
                <View style={styles.skeletonVerse} />
                <View style={styles.skeletonVerse} />
              </SkeletonPlaceholder>
            ) : (
              <>
                <View style={styles.verseContainer}>
                  <Text style={styles.verseTitle}>Versículo (Tradução 1):</Text>
                  <Text style={styles.verseText}>{verseText1}</Text>
                </View>
                <View style={styles.verseContainer}>
                  <Text style={styles.verseTitle}>Versículo (Tradução 2):</Text>
                  <Text style={styles.verseText}>{verseText2}</Text>
                </View>
              </>
            )}
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  pickerContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#D43C12',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  verseContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  verseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  verseText: {
    fontSize: 16,
  },
  skeletonPicker: {
    height: 50,
    width: '100%',
    borderRadius: 5,
    marginBottom: 10,
  },
  skeletonInput: {
    height: 40,
    width: '100%',
    borderRadius: 5,
    marginBottom: 10,
  },
  skeletonVerse: {
    height: 50,
    width: '100%',
    borderRadius: 5,
    marginTop: 10,
  },
});
