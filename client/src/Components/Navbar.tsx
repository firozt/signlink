import { Button, Text, View } from '@gluestack-ui/themed/build/components'
import React from 'react'
import { StyleSheet } from 'react-native'
import NavbarItem from './NavbarItem'
import { HomeIcon } from 'lucide-react-native'

type Props = {}

const Navbar = (props: Props) => {
  return (
    <View style={styles.nav}>
      <NavbarItem onPress={() => 1+1} iconType='home'/>
      <NavbarItem onPress={() => 1+1} iconType='profile'/>
      <NavbarItem onPress={() => 1+1} iconType='settings'/>
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