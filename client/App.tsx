import React, { useEffect, useState } from 'react';
import { } from 'react-native';
import { GluestackUIProvider, GluestackUIStyledProvider, Text, Button, View, ButtonText, Switch, AlertDialog } from "@gluestack-ui/themed"
import { config } from "@gluestack-ui/config"
import NewUser from './src/Pages/NewUser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@react-native-google-signin/google-signin/lib/typescript/src/types';
import UserArea from './src/Pages/UserArea';


export default function App() {
  const [loggedIn, setLoggedIn] = React.useState<boolean>(false);
  const [user, setUser] = React.useState<any>();
  useEffect(() => {
    isLoggedIn().then((isLoggedIn) => setLoggedIn(isLoggedIn))
  },[])

  // Checks local storage to see if a user is saved
  const isLoggedIn= async (): Promise<boolean> => {
    try {
      const user: User | null = JSON.parse(await AsyncStorage.getItem('@user')??'null');
      setUser(user);
      return !!user;
    } catch (error) {
      return false
    }
  }


  return (
    <GluestackUIStyledProvider config={config}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {
          loggedIn ? <UserArea user={user} /> : <NewUser />
        }
      </View>
    </GluestackUIStyledProvider>
  );
}
