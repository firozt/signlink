import { REACT_APP_SERVER_PROXY_URL } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { User } from '@react-native-google-signin/google-signin'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React, { useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'

type Props = {
  setUser: (newUser: User) => void
}
const Login = ({setUser}: Props) => {
  const navigation = useNavigation()
  const [alert, setAlert] = useState<string>('');
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const checkParams = () => {
    let error = ''
    if (email == '') {
      error += 'Email cannot be empty\n'
    }
    if (password == '') {
      error += 'Password cannot be empty\n'
    }
    if (error =='') return true
    setAlert("ERROR : \n"+error)
    return false
  }
  

  const makeLoginRequest = () => {
    const url = `${REACT_APP_SERVER_PROXY_URL}/users/login`
    if (!checkParams()) return;
    axios.post(url, {
      email: email,
      password: password
    })
    .then(response => {
      const id: string = response.data
      const user: User = {
        user: {
          id: id,
          name: null,
          email: email,
          photo: null,
          familyName: null,
          givenName: null
        },
        idToken: null,
        serverAuthCode: null,
      }
      setUser(user)
      AsyncStorage.setItem('@user',JSON.stringify(user));
      //@ts-ignore
      navigation.navigate('Home', {user: user})       
    })
    .catch(error => {
      // console.error("ERROR LOGGING IN :"+error)
      setAlert("Invalid credentials")
    })
  }

  return (
    <View style={styles.container}>
      {
        alert != "" ? <Text style={styles.error}>{alert}</Text> : null
      }
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.textInput}
        placeholder="email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={[styles.textInput, {marginBottom: 30}]}
        placeholder="password"
        secureTextEntry={true} 
        value={password}
        onChangeText={setPassword}
      />
      <Button  title="Login" onPress={makeLoginRequest} />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#372f94',
    borderWidth: 2,
    borderColor: 'black',
    width: '80%',
    borderRadius: 25,
    padding: 25,
    display: 'flex',
    margin: 15,
  },
  textInput: {
    backgroundColor: 'white',
    alignSelf: 'center',
    width: "100%",
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'gray',
    marginVertical: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: '400',
    color:'white',
    textAlign:'center',
    marginBottom:10,
  },
  error: {
    color:'red',
    textAlign: 'center',
    margin: 3
  }

})

export default Login