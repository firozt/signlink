import { Center, ScrollView, View } from '@gluestack-ui/themed'
import { BugIcon } from 'lucide-react-native'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import CarouselCell from './CarouselCell'

type Props = {
  enableScrolling: boolean;
  numItems: number;
  title: string;
}

const Carousel = ({enableScrolling, numItems, title}: Props) => {

  const array = Array.from({ length: numItems }, (_, index) => index);

  return (
    <>
      <Text style={styles.title}>{title}</Text>
      <ScrollView 
      showsHorizontalScrollIndicator={false}
      horizontal={true} 
      style={styles.container}
      scrollEnabled={enableScrolling}
      contentContainerStyle={styles.contentContainer}>
        {
          array.map((item) => (
            <CarouselCell onPress={() => 1+1} key={item} />
          ))
        }
      </ScrollView>
    </>
  )
}


const cellWidth = 125;
const initalPadding = 40;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    overflow: 'scroll',
    paddingHorizontal: initalPadding
  },
  contentContainer: {
    paddingRight: cellWidth-initalPadding, // Calculate the total padding to scroll to the very right
  },
  title: {
    fontFamily: 'Roboto',
    color: 'white',
    fontSize: 36,
    marginLeft: initalPadding,
    marginBottom:10
  }
})


export default Carousel