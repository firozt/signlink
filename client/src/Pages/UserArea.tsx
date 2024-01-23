import { Button, ScrollView, Text } from '@gluestack-ui/themed'
import { User } from '@react-native-google-signin/google-signin'
import React from 'react'
import Navbar from '../Components/Navbar'
import { StyleSheet } from 'react-native'
import HomePage from './HomePage'
import AsyncStorage from '@react-native-async-storage/async-storage'

type Props = {
    user: User
}

const UserArea = ({ user }: Props) => {
  return (
    <>
      <ScrollView style={styles.container}>
        {/* <Text style={styles.text}>
          ID: {user.user.id}
          {JSON.stringify(user, null, 2)}
        </Text> */}
        <HomePage user={user}/>
      </ScrollView>
      <Button onPress={async () => AsyncStorage.clear()} />
      <Navbar />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4F46BD',
    width:'100%'
  },
  text: {
    color: 'white',
  }
})

export default UserArea