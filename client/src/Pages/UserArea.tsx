import React from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './HomePage';
import Profile from './UserProfile';
import NewUser from './NewUser';
import {
  User
} from '@react-native-google-signin/google-signin/lib/typescript/src/types';
export type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  New: undefined;
  // ... other route definitions
};

type Props = {
  user: User;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const UserArea = ({ user }: Props) => {
  return (
    <Stack.Navigator initialRouteName='Home' >
      <Stack.Screen name='Home'>
        {(props) => <HomePage user={user} {...props} />}
      </Stack.Screen>
      <Stack.Screen name='Profile' component={Profile} />
      <Stack.Screen name='New' component={NewUser} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4F46BD',
    width: '100%',
  },
  text: {
    color: 'white',
  },
});

export default UserArea;
