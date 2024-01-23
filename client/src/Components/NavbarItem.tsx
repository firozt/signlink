import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Text, View } from '@gluestack-ui/themed/build/components';
import { BookIcon, HomeIcon, SettingsIcon, UserIcon } from 'lucide-react-native';

type Props = {
  onPress: () => any;
  iconType: string
};


const buttonMapping = new Map<string, React.ReactNode>([
  ['home', <HomeIcon color={'#4684BD'} />],
  ['profile', <UserIcon color={'#4684BD'} />],
  ['book', <BookIcon color={'#4684BD'} />],
]);

const NavbarItem = ({ onPress, iconType }: Props) => {


  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <View style={styles.textContainer}>
          {/* <Text style={styles.buttonText}>Press Me</Text> */}
          {buttonMapping.get(iconType)}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
    height: 55, 
  },
  button: {
    backgroundColor: '#4B42B9',
    width: '100%',
    height: '100%',
  },
  textContainer: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});

export default NavbarItem;
