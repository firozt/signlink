import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

type Props = {}

const DictionaryPage = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text>
        Dictionary Page
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4F46BD',
    height: '100%',
    width: '100%',
  }
})

export default DictionaryPage