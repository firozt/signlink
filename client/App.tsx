import React, { useState } from 'react';
import { View, Button } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { GluestackUIProvider, Text } from '@gluestack-ui/themed';
import { IOS_GOOGLE_LOGIN_ID, WEB_GOOGLE_ID } from '@env';
import { config } from '@gluestack-ui/config';



GoogleSignin.configure({
  webClientId: WEB_GOOGLE_ID,
  iosClientId: IOS_GOOGLE_LOGIN_ID,
});

export default function App() {
  const [user, setUser] = useState<string>('');
  
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(user)
      setUser(JSON.stringify(userInfo));
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

  return (
    <GluestackUIProvider config={config}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Hello World!</Text>
        <Button title="Sign in with Google" onPress={() => signIn()} />
      </View>
    </GluestackUIProvider>
  );
}
