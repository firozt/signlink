import React, { useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Course, UserScore, Word } from '../types'
import { REACT_APP_SERVER_PROXY_URL } from '@env'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { User } from '@react-native-google-signin/google-signin'
import { useNavigation } from '@react-navigation/native'
import ListOfWordsWithImage from '../Components/ListOfWordsWithImage'

type Props = {
  correct: number,
  total: number
  courseID: string
  wrongs: Word[]
  prevScore: number
}

const FinishedTestPage = ({correct, total, courseID, wrongs, prevScore}: Props) => {
  const navigation = useNavigation();
  const [courseInfo, setCourseInfo] = useState<Course>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const googleId: string = await getGoogleID() ?? '';
        const courseResponse = await axios.get(`${REACT_APP_SERVER_PROXY_URL}/course/get/${courseID}`);
        const courseData: Course = courseResponse.data;
        courseData.cleanName = courseData.name.replace(/-/g, ' ');
        setCourseInfo(courseData);
  
        const url = `${REACT_APP_SERVER_PROXY_URL}/users/setscore/${googleId}/${courseID}/${correct / total}`;
        console.log(url);
        await axios.post(url);
      } catch (error) {
        console.error("ERROR FETCHING QUIZ DATA OR SAVING USER SCORE: " + error);
      }
    };
  
    fetchData();
  }, [courseID, correct, total]);

  const getGoogleID = async () => {
    try {
      const value = await AsyncStorage.getItem('@user');
      const user: User = JSON.parse(value??'null')
      return user.user.id;
    } catch (e) {
      console.error(e);
    }
  } 
  return (
    <>
      {
        courseInfo && 
        <View style={styles.container}>
          <Text style={styles.title}>
            {courseID.replace(/-/g, ' ')}
          </Text>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{uri: courseInfo?.iconURI}} />
          </View>
          <ScrollView style={styles.scrollViewContainer}>
            <Text style={styles.text}>
              Test Finished
            </Text>
            <Text style={styles.text}>
              Final Score:
            </Text>
            <Text style={styles.score}>
              {Math.round((correct/total)*100)}% 
            </Text>
            {
              prevScore != 0 && prevScore != null &&
              <>
                <Text style={styles.text}>
                  Previously that score was {Math.round((prevScore)*100)}% 
                </Text>
              </>
            }
            {wrongs.length > 0 && <Text style={[styles.text, {marginTop: 20}]}>List of incorrect's:</Text>}
            {
              wrongs.map((item,index) => <ListOfWordsWithImage key={index} word={item} />)
            }
          </ScrollView>
          {/* @ts-ignore */}
          <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate('Home',{})}}>
            <Text style={styles.buttonText}>Go Home</Text>
          </TouchableOpacity>
        </View>
      }
    </>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4F46BD',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    display: 'flex',
  },
  title: {
    fontSize: 50,
    color: 'white',
    textAlign: 'center',
    marginBottom: 15,
  },
  image: {
    width: 130,
    height: 130
  },
  imageContainer: {
    borderRadius: 25,
    margin: 10,
    backgroundColor: 'white',
    height: 150,
    width: 150,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  text: {
    color: 'white',
    fontSize: 28,
    textAlign: 'center',
    marginTop: 3
  },
  score : {
    color: 'white',
    fontSize: 72,
    textAlign: 'center'

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
    color: '#4F46BD',
    fontSize: 20,
    textAlign: 'center',
    width:150,
    top:8
  },
  scrollViewContainer: {
    backgroundColor: '#453dad',
    width: '100%',
    borderTopWidth: 2,
    borderBottomWidth: 2,
    marginBottom:10
  },
});


export default FinishedTestPage