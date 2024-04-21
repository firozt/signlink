import { ScrollView, Center } from '@gluestack-ui/themed'
import { User } from '@react-native-google-signin/google-signin'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import GlobalStyles from '../GlobalStyles'
import Carousel from '../Components/Carousel'
import axios from 'axios'
import { SERVER_PROXY_URL } from '@env'
import { Course } from '../types'

type Props = {
  user: User
}

const HomePage = ({user}: Props) => {
  const [courseList, setCourseList] = useState<Course[]>();


  useEffect(() => {
    requestAllCourses()
  },[])


  const requestAllCourses = async () => {
    const url = `${SERVER_PROXY_URL}/course/getall`
    axios.get(url)
    .then(response => {
      const data: Course = response.data
      setCourseList(response.data)
    })
    .catch(error => console.error("ERROR FETCHING ALL COURSES: " + error))
  }
  


  return (
    <ScrollView style={styles.container}>
      <Center style={styles.header}>
        <Text style={GlobalStyles.heading1}>Hey, {user.user.name}</Text>
      </Center>
      <View style={styles.container2}>
        <Carousel title='Easy' courseData={courseList?.filter(course => course.difficulty == 'easy')??[]} />
        <Carousel title='Medium' courseData={courseList?.filter(course => course.difficulty == 'medium')??[]} />
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
  }
})

export default HomePage