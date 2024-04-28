import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

type Props = {
  imageURI: string,

}

const QuizQuestion = ({imageURI}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri: imageURI}} />
      </View>
      <Text style={styles.text}>
        Which of these corresponds to the sign
      </Text>
    </View>
  
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4F46BD',
    display: 'flex',
    flexDirection: 'column',
    alignItems:'center',
    borderBottomWidth: 5,
    borderBottomColor: '#333587',
    borderStyle: 'solid',
    paddingBottom: 20,
    paddingTop: 20,
  },
  image: {
    width: 250,
    height: 250,
    
  },
  text: {
    fontSize: 32,
    margin: 10,
    textAlign: 'center',
    color: 'white',
  },
  imageContainer: {
    width: 250,
    height: 250,
    backgroundColor: 'white',
  }
})

export default QuizQuestion