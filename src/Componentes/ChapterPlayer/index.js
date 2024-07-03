import React, {useEffect, useState, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Tts from 'react-native-tts';
import Icon from 'react-native-vector-icons/FontAwesome';

const ChapterPlayer = ({verses}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const utteranceListenerRef = useRef(null);
  const [verseReading, setVerseReading] = useState(0);
  const [stopPressed, setStopPressed] = useState(false);

  useEffect(() => {
    const fetchVoices = async () => {
      try {
        const status = await Tts.getInitStatus();
        if (status === 'success') {
          Tts.setDefaultLanguage('pt-BR');
          const availableVoices = await Tts.voices();
          const portugueseVoice = availableVoices.find(
            voice => voice.language === 'pt-BR' && voice.quality === 'high',
          );
          if (portugueseVoice) {
            Tts.setDefaultVoice(portugueseVoice.id);
          }
        }
      } catch (e) {
        console.error('Error fetching voices', e);
      }
    };

    fetchVoices();
  }, []);

  useEffect(() => {
    const onUtteranceComplete = () => {
      setCurrentVerseIndex(prevIndex => {
        const nextIndex = prevIndex + 1;
        if (nextIndex < verses.length) {
          Tts.speak(verses[nextIndex].text, {
            androidParams: {
              KEY_PARAM_PAN: 0,
              KEY_PARAM_VOLUME: 1,
              KEY_PARAM_STREAM: 'STREAM_MUSIC',
            },
          });
        } else {
          setIsPlaying(false);
        }
        return nextIndex;
      });
    };

    if (isPlaying) {
      setVerseReading(currentVerseIndex);

      Tts.speak(verses[currentVerseIndex].text, {
        androidParams: {
          KEY_PARAM_PAN: 0,
          KEY_PARAM_VOLUME: 1,
          KEY_PARAM_STREAM: 'STREAM_MUSIC',
        },
      });
      utteranceListenerRef.current = Tts.addEventListener(
        'tts-finish',
        onUtteranceComplete,
      );
    }

    return () => {
      if (utteranceListenerRef.current) {
        utteranceListenerRef.current.remove();
        utteranceListenerRef.current = null;
      }
    };
  }, [isPlaying, currentVerseIndex, verses]);

  const handlePlayPause = () => {
    if (isPlaying) {
      Tts.stop();
      setIsPlaying(false);
    } else {
      if (stopPressed) {
        setCurrentVerseIndex(0);
      }
      setIsPlaying(true);
      setStopPressed(false);
    }
  };

  const handleStop = () => {
    Tts.stop();
    setIsPlaying(false);
    setStopPressed(true);
    setCurrentVerseIndex(0);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handlePlayPause}>
        <Icon name={isPlaying ? 'pause' : 'play'} size={20} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleStop}>
        <Icon name="stop" size={20} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.status}>
        {isPlaying
          ? `Versiculo ${currentVerseIndex + 1}`
          : 'Leitura de capitulo'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  status: {
    marginLeft: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#D43C12',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ChapterPlayer;
