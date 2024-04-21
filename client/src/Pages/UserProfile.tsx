import { Button } from '@gluestack-ui/themed'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { User } from '@react-native-google-signin/google-signin'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import RNRestart from 'react-native-restart';
import { SERVER_PROXY_URL } from '@env';
import { UserInfo } from '../types';
import UserInfoTable from '../Components/UserInfoTable';


type Props = {
  user: User
  setUser: (newUser: any) => void
}

const UserProfile = ({user, setUser}: Props) => {
  const { width } = Dimensions.get('window');
  const fontSize = width / 8
  const [userInfo, setUserInfo] = useState<UserInfo>()


  const  logout = async () => {
    try {
      await AsyncStorage.clear()
      RNRestart.restart();

      
    } catch (error) {
      console.error('error logging out: ', error)
    }
  }

  // gets user info using the id stored in storage
  const getUserInfo = async () => {
    const userInfo: User = JSON.parse(await AsyncStorage.getItem('@user')??'null');
    const url = `${SERVER_PROXY_URL}/users/get_info/${userInfo.user.id}` 
    console.log(url)
    axios.get(url)
    .then(response => {
      const data : UserInfo = response.data
      setUserInfo(data)
    }).catch(error => console.error("ERROR GETTING USER ON USER PAGE " + error))
  }

  useEffect(() => {
    getUserInfo()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={{fontSize: fontSize, color: 'white', textAlign:'center', margin:12}}>
        {userInfo?.name}'s Profile
      </Text>
      <UserInfoTable userInfo={userInfo}/>
      <View style={styles.container2}>
        <Button onPress={() => logout()} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>
            Logout
          </Text>
        </Button>
      </View>
    </View>
  )

}
// #453DAB
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4F46BD',
    height: '100%',
    width: '100%',
    flex: 1,
  },
  logoutButton: {
    margin: 5,
    width: 100,
    backgroundColor: 'red',

    
  },
  logoutButtonText: {
    color: 'white',
    fontSize:19,
  },
  container2: {
    flex: 1,
    flexDirection: 'row-reverse'
  }

})
export default UserProfile