import { Button } from '@gluestack-ui/themed'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { User } from '@react-native-google-signin/google-signin'
import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import RNRestart from 'react-native-restart';
import GlobalStyles from '../GlobalStyles';
type Props = {
  user: User
  setUser: (newUser: any) => void
}



const UserProfile = ({user, setUser}: Props) => {
  const  logout = async () => {
    try {
      await AsyncStorage.clear()
      RNRestart.restart();

      
    } catch (error) {
      console.error('error logging out: ', error)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={GlobalStyles.heading1}>
        {user.user.name}'s Profile
      </Text>
      <View style={styles.userInfo}>
        <View >

        </View>
      </View>
      <Button onPress={() => logout()} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>
          Logout
        </Text>
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4F46BD',
    height: '100%',
    width: '100%',
  },
  logoutButton: {
    width: 100,
    backgroundColor: 'red'
    
  },
  logoutButtonText: {
    color: 'white',
    fontSize:19,
  },
  userInfo: {

  }
})

export default UserProfile