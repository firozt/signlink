import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { 
  Button,
  GluestackUIStyledProvider,  
  View 
} from "@gluestack-ui/themed"
import { 
  config
} from "@gluestack-ui/config"
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  User
} from '@react-native-google-signin/google-signin/lib/typescript/src/types';
import {
  NavigationContainer
} from '@react-navigation/native';
import {
  createNativeStackNavigator
} from '@react-navigation/native-stack';
import NewUser from './src/Pages/NewUser';
import HomePage from './src/Pages/HomePage';
import UserProfile from './src/Pages/UserProfile';
import Navbar from './src/Components/Navbar';
import DictionaryPage from './src/Pages/DictionaryPage';

type RootStackparamList = {
  Home: { user: User },
  NewUser: (newUser: User) => void,
  Profile: { user: User }
  Dictionary: undefined
}
const Stack = createNativeStackNavigator<RootStackparamList>();


export default function App() {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [user, setUser] = React.useState<any>();
  useEffect(() => {
    isLoggedIn().then(() => setLoading(false))
  },[])

  // Checks local storage to see if a user is saved
  const isLoggedIn= async ()=> {
    try {
      const user: User | null = JSON.parse(await AsyncStorage.getItem('@user')??'null');
      setUser(user);
    } catch (error) {
      console.error(error)
    }
  }
  if (loading) {
    return (
      <Text>Loading</Text>
    )
  }

  return (
    <NavigationContainer>
      <GluestackUIStyledProvider config={config}>
        {/* <Stack.Navigator initialRouteName={user===undefined ? 'NewUser': 'Home'}> */}
        <Stack.Navigator initialRouteName={user==null?'NewUser':'Home'}>
          <Stack.Screen 
          name='Home'
          options={{
            headerShown:false,
            gestureEnabled:false,
          }}>
            {(props) => <HomePage user={user} {...props} />}
          </Stack.Screen>
          <Stack.Screen 
          name='Profile'
          options={{
            headerShown:false,
            gestureEnabled:false,
          }}>
            {(props) => <UserProfile user={user} setUser={(newUser: User) => setUser(newUser)} {...props} />}
          </Stack.Screen>
          <Stack.Screen 
          name='NewUser'
          options={{
            headerShown:false,
            gestureEnabled:false,
          }}>
            {(props) => <NewUser setUser={(newUser: User) => setUser(newUser)} {...props} />}
          </Stack.Screen>
          <Stack.Screen 
          name='Dictionary' 
          component={DictionaryPage} 
          options={{
            headerShown:false,
            gestureEnabled:false,
          }}/>
        </Stack.Navigator>
        {
          user? <Navbar user={user} /> : null
        }
      </GluestackUIStyledProvider>
    </NavigationContainer>
  );
}
