import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Linking} from 'react-native';

export default function About() {
  const handleLinkPress = url => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sobre o Projeto</Text>
      <Text style={styles.description}>
        Este aplicativo é um projeto que visa democratizar o acesso à Bíblia,
        fornecendo uma plataforma onde as pessoas podem ler, ouvir e estudar a
        Bíblia Sagrada. Nosso objetivo é tornar a Bíblia acessível para todos,
        independente de onde estejam.
      </Text>
      <Text style={styles.description}>
        Você pode encontrar o código-fonte do projeto e contribuir através do
        nosso repositório no GitHub.
      </Text>
      <TouchableOpacity
        onPress={() =>
          handleLinkPress('https://github.com/bruno34154/Bible-democracy')
        }
        style={styles.linkContainer}>
        <Text style={styles.link}>Projeto no GitHub</Text>
      </TouchableOpacity>
      <Text style={styles.description}>
        Se você deseja apoiar o projeto financeiramente, pode fazer uma doação
        através da nossa vaquinha.
      </Text>
      <TouchableOpacity
        onPress={() => handleLinkPress('https://www.vakinha.com.br/4929281')}
        style={styles.linkContainer}>
        <Text style={styles.link}>Apoie o Projeto</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  linkContainer: {
    marginBottom: 20,
  },
  link: {
    fontSize: 16,
    color: '#0066cc',
    textAlign: 'center',
  },
});
