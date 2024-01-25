import { Button, Center, ScrollView, Text, View, createStyle } from '@gluestack-ui/themed'
import React, { useState } from 'react'
import { IOS_GOOGLE_LOGIN_ID, WEB_GOOGLE_ID } from '@env';
import { GoogleSignin, User, statusCodes } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// This page will only appear for users who are not signed in, they do not have any 
// user account details saved into their async storage

type Props = {
  setUser: (newUser: User) => void
}


GoogleSignin.configure({
  webClientId: WEB_GOOGLE_ID,
  iosClientId: IOS_GOOGLE_LOGIN_ID,
});


const NewUser = ({setUser}: Props) => {
  const navigation = useNavigation()
  // attempts to login with google
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo: User = await GoogleSignin.signIn();
      successfullSignin(userInfo)
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };


  const successfullSignin = async (userInfo: User) => {
    try {
      const done = await AsyncStorage.setItem('@user',JSON.stringify(userInfo));
      setUser(userInfo)
      navigation.navigate('Home', {user: userInfo})
      
    } catch (error: unknown) {
      console.error(error)
    }
  }

  return (
    <View style={styles.container}>
      <Center marginTop={'33%'} >
        {/* <Image style={{width: 125, height: 125}} source={require('../../public/SL-logo.png')} /> */}
        <Image  style={{width: 300, height: 300}} source={require('../../public/SL-logo-transparent.png')} />
        <Button style={styles.button}>
          <Image  style={{width:25,height:25, right:10}} source={require('../../public/googlelogo.png')} />
          <Text 
          color='white'
          onPress={() => signIn()}>
            Login with Google
          </Text>
          
        </Button>
      </Center>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4F46BD',
    height: '100%',
    width: '100%',
  },
  button: {
    width:200,
  }
})

export default NewUser