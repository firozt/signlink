import { REACT_APP_SERVER_PROXY_URL } from '@env'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Course, Word } from '../types'
import { ScrollView } from '@gluestack-ui/themed'

type Props = {
  courseData: Course
}

const Learn = ({courseData}: Props) => {
  const [courseWords, setCourseWords] = useState<Word[]>([]);

  useEffect(() => {
    getCourseData()
  },[])

  // gets all word pairings
  const getCourseData = async () => {
    const url = `${REACT_APP_SERVER_PROXY_URL}/words/getall/${courseData.name}`
    console.log(url)
    axios.get(url)
    .then(response => {
      const data: Word[] = response.data
      setCourseWords(data);
    })
    .catch(error => {
      console.error("ERROR FETCHING QUIZ DATA :" + error )
    })
  }
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        {courseData.cleanName?? courseData.name}
      </Text>
      {courseWords.map((item, index) => (
        <View style={styles.cell} key={index}>
          <Text style={styles.itemText}>{item.wordText}</Text>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{uri: item.imageURI}} />
          </View>
        </View>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4F46BD',
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 42,
    color: 'white',
    textAlign: 'center',
    marginBottom: 15,
  },
  cell : {
    marginVertical: 10,
    width: '90%',
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
  image: {

    width:100,
    height:100,
    borderRadius: 25,
  },
  itemText: {
    fontSize: 24,
    color: 'white',
    minWidth:175
  },
  imageContainer: {
    width: 100,
    height: 100,
    backgroundColor: 'white',
    borderRadius: 25,

  }

})

export default Learn