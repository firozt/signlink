import { ScrollView, Center } from '@gluestack-ui/themed'
import { User } from '@react-native-google-signin/google-signin'
import React from 'react'
import { StyleSheet, Text } from 'react-native'
import GlobalStyles from '../GlobalStyles'
import Carousel from '../Components/Carousel'

type Props = {
  user: User
}

const HomePage = ({user}: Props) => {
  return (
    <ScrollView style={styles.container}>
      {/* <Center borderWidth={1} borderColor='black'> */}
      <Center style={styles.header}>
        <Text style={GlobalStyles.heading1}>Hey, {user.user.name}</Text>
      </Center>
      <Carousel title='Easy' enableScrolling={false} numItems={2}/>
      <Carousel title='Medium' enableScrolling={true} numItems={6}/>
      <Carousel title='Hard' enableScrolling={true} numItems={10}/>
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
})

export default HomePage