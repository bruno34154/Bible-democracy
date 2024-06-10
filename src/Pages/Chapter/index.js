import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, FlatList, TouchableOpacity} from 'react-native';
import axios from 'axios';
import Tts from 'react-native-tts';
import bookNames from '../../Componentes/bookNames'; // Adjust the path accordingly

export default function Chapter({route}) {
  const {name, chapter} = route.params;
  const [verses, setVerses] = useState([]);
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    // Fetch verses
    axios
      .get(`https://bible-api.com/${name} ${chapter}?translation=almeida`)
      .then(response => {
        setVerses(response.data.verses);
      })
      .catch(e => {
        console.log('erro', e);
      });

    // Fetch available voices
    Tts.getInitStatus().then(() => {
      Tts.setDefaultLanguage('pt-BR');
      Tts.voices().then(availableVoices => {
        setVoices(availableVoices);
        const portugueseVoice = availableVoices.find(
          voice => voice.language === 'pt-BR' && voice.quality === 'high',
        );
        if (portugueseVoice) {
          Tts.setDefaultVoice(portugueseVoice.id);
        }
      });
    });
  }, [chapter, name]);

  const bookNameInPortuguese = bookNames[name] || name;

  const speakVerse = text => {
    Tts.stop();
    Tts.speak(text, {
      androidParams: {
        KEY_PARAM_PAN: 0,
        KEY_PARAM_VOLUME: 1,
        KEY_PARAM_STREAM: 'STREAM_MUSIC',
      },
    });
  };

  const renderVerse = ({item}) => (
    <View style={styles.verseContainer}>
      <Text style={styles.verseNumber}>{item.verse}</Text>
      <Text style={styles.verseText}>{item.text}</Text>
      <TouchableOpacity onPress={() => speakVerse(item.text)}>
        <Text style={styles.speakButton}>🔊</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{bookNameInPortuguese}</Text>
      <Text style={styles.description}>Capítulo {chapter}</Text>
      <FlatList
        data={verses}
        keyExtractor={item => item.verse.toString()}
        renderItem={renderVerse}
        contentContainerStyle={styles.versesContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0', // Main background color
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
    textAlign: 'center',
    marginBottom: 20,
  },
  versesContainer: {
    paddingBottom: 20,
  },
  verseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#ffffff', // Verse container background color
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  verseNumber: {
    fontWeight: 'bold',
    marginRight: 10,
    color: '#D43C12',
  },
  verseText: {
    flex: 1,
  },
  speakButton: {
    marginLeft: 10,
    fontSize: 20,
    color: '#007AFF',
  },
});
