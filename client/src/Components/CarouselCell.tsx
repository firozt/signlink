import { Center } from '@gluestack-ui/themed'
import { BugIcon } from 'lucide-react-native'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

type Props = {
  onPress: () => any 
}

const CarouselCell = ({onPress}: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Center style={styles.cell} >
        <BugIcon color={'#4684BD'} size={75}/>
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
    backgroundColor: 'white'

  }
})


export default CarouselCell