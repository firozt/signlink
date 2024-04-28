import { Center, ScrollView, View } from '@gluestack-ui/themed'
import { BugIcon } from 'lucide-react-native'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import CarouselCell from './CarouselCell'
import { useNavigation } from '@react-navigation/native'
import { Course } from '../types'

type Props = {
  title: string;
  courseData: Course[]
}

const Carousel = ({title,courseData}: Props) => {
  const navigation = useNavigation();


  return (
    <>
      <Text style={styles.title}>{title}</Text>
      <ScrollView 
      showsHorizontalScrollIndicator={false}
      horizontal={true} 
      style={styles.container}
      scrollEnabled={courseData.length > 2}
      contentContainerStyle={styles.contentContainer}>
        {
          courseData.map((item, index) => (
            // @ts-ignore, issue with react-native-navigation
            <CarouselCell iconURI={item.iconURI} onPress={() => navigation.navigate('LearnOrQuiz',{courseData: item})} key={index} />
          ))
        }
      </ScrollView>
    </>
  )
}


const cellWidth = 125;
const initalPadding = 40;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    overflow: 'scroll',
    paddingHorizontal: initalPadding,
  },
  contentContainer: {
    paddingRight: cellWidth-initalPadding, // Calculate the total padding to scroll to the very right
  },
  title: {
    fontFamily: 'Roboto',
    color: 'white',
    fontSize: 36,
    marginLeft: initalPadding,
    marginBottom:8,
  },

})


export default Carousel