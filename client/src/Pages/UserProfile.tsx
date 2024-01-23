import { User } from '@react-native-google-signin/google-signin'
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

type Props = {
  user: User
}

const UserProfile = ({user}: Props) => {
  return (
    <View style={styles.container}>
      <Text>
        User Profile
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

export default UserProfile