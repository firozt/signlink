import React, { useState } from 'react';
import { } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { IOS_GOOGLE_LOGIN_ID, WEB_GOOGLE_ID } from '@env';
import { GluestackUIProvider, GluestackUIStyledProvider, Text, Button, View, ButtonText, Switch, AlertDialog } from "@gluestack-ui/themed"
import { config } from "@gluestack-ui/config"

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

  const [showAlert, setShowAlert] = React.useState<boolean>(false);
  

  return (
    <GluestackUIStyledProvider config={config}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{user}</Text>
        <Text>Hello World!</Text>
        <Button onPress={() => signIn()} >
          <Text color='white'>Sign in with google</Text>
        </Button>
        <AlertDialog isOpen={true}/>
        <Switch size="md" isDisabled={false}  />
      
      </View>
    </GluestackUIStyledProvider>
  );
}
