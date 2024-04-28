import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native';
import { Word } from '../types';

type Props = {
  word: Word
}

const ListOfWordsWithImage = ({word}: Props) => {
  return (
    <View style={styles.cell}>
      <Text style={styles.text}>{word.wordText.replace(/-/g, ' ')}</Text>
      <View style={styles.imageContainer}>
        <Image style={styles.wrongsImage} source={{uri: word.imageURI}} />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({




  cell : {
    marginVertical: 10,
    width: '95%',
    height: 110,
    backgroundColor: '#372f94',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    alignSelf: 'center',
    borderWidth: 5,
    borderColor: 'black',
    borderRadius: 25,
  },
  wrongsImage: {
    width: 100,
    height: 100,
    borderRadius: 25,
  },
  imageContainer: {
    width: 100,
    height: 100,
    backgroundColor: 'white',
    borderRadius: 25,
  },
  text: {
    fontSize: 24,
    color: 'white',
    minWidth:225,
  }
});
export default ListOfWordsWithImage