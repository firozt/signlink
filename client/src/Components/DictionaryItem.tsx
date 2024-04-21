import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import DictionaryPopup from '../Pages/DictionaryPopup'
import { DictionaryMapping } from '../types'

type Props = {
  dictMapping: DictionaryMapping
}

const DictionaryItem = ({dictMapping}: Props) => {
  const [selected, setSelected] = useState<boolean>(false);

  return (
    <TouchableOpacity onPress={() => setSelected(!selected)} style={styles.dictionaryItem}>
    <Text style={styles.text}>
      {dictMapping.cleanText}
    </Text>
    { selected && <DictionaryPopup dictMapping={dictMapping}  /> }
  </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  dictionaryItem: {
    width: '100%',
    minHeight: 75,
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