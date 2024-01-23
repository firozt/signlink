import { Button, Text, View } from '@gluestack-ui/themed/build/components'
import React from 'react'
import { StyleSheet } from 'react-native'
import NavbarItem from './NavbarItem'
import { Home, HomeIcon } from 'lucide-react-native'
import { useNavigation } from '@react-navigation/native'
import { User } from '@react-native-google-signin/google-signin'

type Props = {
  user: User
}

const Navbar = ({user}: Props) => {
  const navigation = useNavigation();
  return (
    <View style={styles.nav}>
      <NavbarItem onPress={() => navigation.navigate('Home', { user: user })} iconType='home'/>
      <NavbarItem onPress={() => navigation.navigate('Profile', { user: user})} iconType='profile'/>
      <NavbarItem onPress={() => navigation.navigate('Dictionary')} iconType='book'/>
    </View>
  )
}


const styles = StyleSheet.create({
  nav: {
    display: 'flex',
    flexDirection: 'row',
    width:'100%',
    margin:0,
    
  }
})
export default Navbar