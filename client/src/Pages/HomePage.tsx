import { ScrollView, Center } from '@gluestack-ui/themed'
import { User } from '@react-native-google-signin/google-signin'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import GlobalStyles from '../GlobalStyles'
import Carousel from '../Components/Carousel'
import axios from 'axios'
import { Course, UserInfo } from '../types'
import { REACT_APP_SERVER_PROXY_URL } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import RNRestart from 'react-native-restart';

type Props = {
  user: User
}

const HomePage = ({user}: Props) => {
  const [courseList, setCourseList] = useState<Course[]>();
  const [name, setName] = useState<string>('');
  const navigation = useNavigation()

  useEffect(() => {
    checkStorage()
    getUserInfo()
    requestAllCourses()
  },[])

  const checkStorage = async () => {
    try {
      const users = await AsyncStorage.getItem('@users');
      if (users == null) {
      }
  } catch (error) {
    console.error('Error retrieving data from AsyncStorage:', error);
  }
  }
  const getGoogleID = async () => {
    try {
      const value = await AsyncStorage.getItem('@user');
      const user: User = JSON.parse(value??'null')
      return user.user.id;
    } catch (e) {
      console.error(e);
    }
  }
  const getUserInfo = async () => {
    const id = await getGoogleID()
    const url = `${REACT_APP_SERVER_PROXY_URL}/users/get_info/${id}` 
    console.log(url)
    axios.get(url)
    .then(response => {
      const data : UserInfo = response.data
      setName(data.name)
    }).catch(error => console.error("ERROR GETTING USER ON USER PAGE " + error))
  }


  const requestAllCourses = async () => {
    const url = `${REACT_APP_SERVER_PROXY_URL}/course/getall`
    console.log(url)
    axios.get(url)
    .then(response => {
      const data: Course[] = response.data
      data.map(item => item.cleanName = item.name.replace(/-/g, ' '))
      setCourseList(response.data)
    })
    .catch(error => console.error("ERROR FETCHING ALL COURSES: " + error))
  }
  return (
    <ScrollView style={styles.container}>
      <Center style={styles.header}>
        <Text style={GlobalStyles.heading1}>Hey, {name}</Text>
      </Center>
      <View style={styles.container2}>
        <Carousel title='Easy' courseData={courseList?.filter(course => course.difficulty == 'easy')??[]} />
        <View style={styles.divider}/>
        <Carousel title='Medium' courseData={courseList?.filter(course => course.difficulty == 'medium')??[]} />
        <View style={styles.divider}/>
        <Carousel title='Hard' courseData={courseList?.filter(course => course.difficulty == 'hard')??[]} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 25,
    paddingBottom: 25,
  },
  container: {
    backgroundColor: '#4F46BD',
    width: '100%',
  },
  text: {
    color: 'white',
  },
  container2: {
    display: 'flex',
    marginBottom:30,
  },
  divider: {
    height: 3,
    backgroundColor: '#372f94',
    marginVertical: 30
  }
})

export default HomePage
