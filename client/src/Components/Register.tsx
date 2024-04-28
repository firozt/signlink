import { REACT_APP_SERVER_PROXY_URL } from '@env'
import { FormControl, VStack, Input, InputField, InputSlot, InputIcon, ButtonText } from '@gluestack-ui/themed'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { User } from '@react-native-google-signin/google-signin'
import axios from 'axios'
import { Heading, EyeIcon, EyeOffIcon } from 'lucide-react-native'
import React, { useState } from 'react'
import { Text, Button, View, StyleSheet, TextInput } from 'react-native'
import { UserInfo } from '../types'
import { useNavigation } from '@react-navigation/native'

type Props = {
  setUser: (newUser: User) => void
}

const Register = ({setUser}: Props) => {
  const navigation = useNavigation()

  const [alert, setAlert] = useState<string>('');
  const [email, setEmail] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
    // for regular logins
  const checkParams = () => {
    let error = ''
    if (email == '') {
      error += 'Email cannot be empty\n'
    }
    if (username == '') {
      error += 'Username cannot be empty\n'

    }
    if (password == '') {
      error += 'Password cannot be empty\n'
    }
    if (error =='') return true
    setAlert("ERROR : \n"+error)
    return false
  }

  const makeRegisterRequest = () => {
    setAlert('')
    if (!checkParams()) return
    const url =` ${REACT_APP_SERVER_PROXY_URL}${"/users/register"}`
    console.log(url)
    axios.post(url,{
      id:'',
      email: email,
      password: password,
      name: username,
    })
    .then(response => {
      console.log(response.status)

      const id: string = response.data
      const user: User = {
        user: {
          id: id,
          name: username,
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
      // console.error(error)
      setAlert("Email is either invalid or already taken")
      return
    })

  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      {
        alert != "" ? <Text style={styles.error}>{alert}</Text> : null
      }
      <TextInput
        style={styles.textInput}
        placeholder="email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.textInput}
        placeholder="username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={[styles.textInput, {marginBottom: 30}]}
        placeholder="password"
        secureTextEntry={true} 
        value={password}
        onChangeText={setPassword}
      />
      <Button  title="Register" onPress={makeRegisterRequest} />
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

export default Register