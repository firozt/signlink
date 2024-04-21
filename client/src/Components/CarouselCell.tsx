import { Center } from '@gluestack-ui/themed'
import { BugIcon } from 'lucide-react-native'
import React from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import { imageMappings } from '../imageMappings'

type Props = {
  onPress: () => any 
  iconURI: string
}

const CarouselCell = ({onPress, iconURI}: Props) => {

  // const name = iconURI
  // const imageSource = require(`../../public/icons/${name}`)

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Center style={styles.cell} >
        {/* <BugIcon color={'#4684BD'} size={75}/> */}

        {/* <Image style={{height:100, width:100}} source={{uri : 'https://i.ibb.co/HFrPDQG/alphabet-1.png'}} /> */}
        <Image style={{height:100, width:100}} source={{uri : iconURI}} />
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
    height: 125,
    width: 125,
    borderRadius: 25,
    backgroundColor: 'white',
  }
})


export default CarouselCell