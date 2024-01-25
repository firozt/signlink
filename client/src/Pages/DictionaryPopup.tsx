import { View, Text } from 'react-native'
import React from 'react'

type Props = {
  word: string
}

const DictionaryPopup = ({word}: Props) => {
  return (
    <View>
      <Text>DictionaryPopup</Text>
      <Text>{word}</Text>
    </View>
  )
}

export default DictionaryPopup