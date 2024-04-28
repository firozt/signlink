import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import { Course, UserScore } from '../types'
import { useNavigation } from '@react-navigation/native'
import { REACT_APP_SERVER_PROXY_URL } from '@env'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { User } from '@react-native-google-signin/google-signin'
import { LineChart } from 'react-native-charts-wrapper'

type Props = {
  courseData: Course
}

const LearnOrQuiz = ({courseData}: Props) => {
  const navigation = useNavigation();
  const [score, setScore] = useState<number>(0);

  
  useEffect(()=> {
    getScore()
  },[])

  const getGoogleID = async () => {
    try {
      const value = await AsyncStorage.getItem('@user');
      const user: User = JSON.parse(value??'null')
      return user.user.id;
    } catch (e) {
      console.error(e);
    }
  }
  const getScore = async () => {
    const googleID: string = await getGoogleID()??''
    const url = `${REACT_APP_SERVER_PROXY_URL}/users/get/${googleID}/${courseData.name}`
    console.log("URL IS : ")
    console.log(url)
    axios.get(url)
    .then(response => {
      const data: UserScore = response.data
      if (data!=null){
        setScore(data.score);
      }
    })
    .catch(error => console.error("COULD NOT GET USERS SCORE: "+ error))
  }
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={{alignItems:'center'}}>
      <View>
        <Text style={styles.title}>
          {courseData.cleanName?? courseData.name}
        </Text>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{uri: courseData.iconURI }} />
        </View>
      </View>
      <View >
        <Text style={styles.score}>
          Last Score :
        </Text>
        <Text style={styles.score}>
          {score? Math.round(score*100) : 0}%
        </Text>
      </View>
      <View style={styles.buttonContainer}>
      {/*  @ts-ignore, issue with react-native-navigation */}
        <TouchableOpacity style={[styles.button]} onPress={() => navigation.navigate('Learn',{courseData: courseData})}>
          <Text style={styles.buttonText}>Learn</Text>
        </TouchableOpacity>
      {/*  @ts-ignore, issue with react-native-navigation */}
        <TouchableOpacity style={[styles.button]} onPress={() => navigation.navigate('Quiz',{courseID: courseData.name, testmode: false, prevScore: score})}>
          <Text style={styles.buttonText}>Endless Quiz</Text>
      </TouchableOpacity>
      {/*  @ts-ignore, issue with react-native-navigation */}
      <TouchableOpacity style={[styles.button]} onPress={() => navigation.navigate('Quiz',{courseID: courseData.name, testmode: true, prevScore: score})}>
        <Text style={styles.buttonText}>Exam</Text>
      </TouchableOpacity>
      {/*  @ts-ignore, issue with react-native-navigation */}
      <TouchableOpacity style={[styles.button]} onPress={() => navigation.navigate('GraphProgression',{courseID : courseData.name})}>
        <Text style={styles.buttonText}>Progression Graph</Text>
      </TouchableOpacity>
      </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4F46BD',
    width: '100%',
    height: '100%',
  },
  image: {
    width: 250,
    height: 250,

  },
  imageContainer: {
    width: 275,
    height: 275,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginBottom: 10,
  },
  title: {
    fontSize: 42,
    color: 'white',
    textAlign: 'center',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 5,
    alignItems: 'center',
    height: 65,
    width: 250,
  },
  buttonText: {
    fontSize: 24,
    color: '#4F46BD',
    top: 5
  },
  buttonContainer: {
    marginTop: 10
  },
  score: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
  }
})

export default LearnOrQuiz