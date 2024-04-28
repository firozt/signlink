import { Center } from '@gluestack-ui/themed'
import { BugIcon } from 'lucide-react-native'
import React from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'

type Props = {
  onPress: () => any 
  iconURI: string
}

const CarouselCell = ({onPress, iconURI}: Props) => {

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Center style={styles.cell} >
        <Image style={{height:120, width:120}} source={{uri : iconURI}} />
      </Center>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal:5,

  },
  cell: {
    borderWidth: 1,
    height: 160,
    width: 160,
    borderRadius: 25,
    backgroundColor: 'white',
  }
})


export default CarouselCell