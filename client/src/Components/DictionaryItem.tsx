import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

type Props = {
  word: string
}

const DictionaryItem = ({word}: Props) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('DictionaryPopup', {word:word})} style={styles.dictionaryItem}>
    <Text style={styles.text}>
      Test Word
    </Text>
  </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  dictionaryItem: {
    width: '100%',
    height: 75,
    display: 'flex',
    alignContent:'center',
    justifyContent:'center',
    marginVertical:2,
    backgroundColor: '#6258E1'
  },
  text: {
    color: 'white',
    fontSize: 32,
    textAlign:'center',

  }
})

export default DictionaryItem