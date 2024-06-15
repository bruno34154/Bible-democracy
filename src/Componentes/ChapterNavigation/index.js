import React, {useState} from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import ChapterSelectionMenu from '../ChapterSelectionMenu';

export default function ChapterNavigation({
  onPrevious,
  onNext,
  onSelectChapter,
  currentChapter,
  totalChapters,
}) {
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);
  const handleSelectChapter = chapter => {
    onSelectChapter(chapter);
    closeMenu();
  };

  return (
    <View style={styles.navigationContainer}>
      <TouchableOpacity
        onPress={onPrevious}
        disabled={currentChapter === 1}
        style={currentChapter === 1 ? styles.disabledButton : null}>
        <Image
          source={require('../../Assets/anterior.png')}
          style={styles.image}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={openMenu}>
        <Image
          source={require('../../Assets/livro.png')}
          style={styles.image}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onNext}
        disabled={currentChapter === totalChapters}
        style={currentChapter === totalChapters ? styles.disabledButton : null}>
        <Image
          source={require('../../Assets/proximo.png')}
          style={styles.image}
        />
      </TouchableOpacity>

      <ChapterSelectionMenu
        isVisible={menuVisible}
        onClose={closeMenu}
        onSelect={handleSelectChapter}
        totalChapters={totalChapters}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  image: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  disabledButton: {
    opacity: 0.5,
  },
});
