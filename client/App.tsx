import React, { useEffect, useState } from 'react';
import { 
  GluestackUIStyledProvider,  
  Spinner,  
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
import Quiz from './src/Pages/Quiz';
import DictionaryPopup from './src/Pages/DictionaryPopup';
import LearnOrQuiz from './src/Pages/LearnOrQuiz';
import { Course } from './src/types';
import Learn from './src/Pages/Learn';
import GraphProgression from './src/Pages/GraphProgression';

type RootStackparamList = {
  Home: { user: User },
  NewUser: (newUser: User) => void,
  Profile: { user: User }
  Dictionary: undefined
  Quiz: { courseID: string, testmode: boolean, prevScore: number },
  Learn: { courseData: Course },
  LearnOrQuiz: { courseData: Course  },
  GraphProgression : { courseID: string},
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
      <Spinner size='large' />
    )
  }

  return (
    <NavigationContainer>
      <GluestackUIStyledProvider config={config}>
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
          <Stack.Screen 
            name='Quiz'
            options={{
              headerShown: true,
              gestureEnabled: true,
              headerStyle: {
                backgroundColor: '#333587',
              },
              headerTintColor: '#FFFFFF',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}>
            {(props) => <Quiz prevScore={props.route.params?.prevScore} courseID={props.route.params?.courseID} testmode={props.route?.params?.testmode} {...props} />}
          </Stack.Screen>
          <Stack.Screen 
            name='GraphProgression'
            options={{
              headerShown: true,
              gestureEnabled: true,
              headerStyle: {
                backgroundColor: '#333587',
              },
              headerTintColor: '#FFFFFF',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}>
            {(props) => <GraphProgression courseID={props.route.params?.courseID} {...props} />}
          </Stack.Screen>
          <Stack.Screen 
            name='Learn'
            options={{
              headerShown: true,
              gestureEnabled: true,
              headerStyle: {
                backgroundColor: '#333587',
              },
              headerTintColor: '#FFFFFF',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}>
            {(props) => <Learn courseData={props.route.params?.courseData} {...props} />}
          </Stack.Screen>
          <Stack.Screen 
            name='LearnOrQuiz'
            options={{
              headerShown: true,
              gestureEnabled: true,
              headerStyle: {
                backgroundColor: '#333587',
              },
              headerTintColor: '#FFFFFF',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}>
            {(props) => <LearnOrQuiz courseData={props.route.params?.courseData} {...props} />}
          </Stack.Screen>

          
        </Stack.Navigator>
        {
          user? <Navbar user={user} /> : null
        }
      </GluestackUIStyledProvider>
    </NavigationContainer>
  );
}
