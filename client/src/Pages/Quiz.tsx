import { View, Text } from 'react-native'
import React from 'react'



type Props = {
  courseID: string
}

const Quiz = ({courseID}: Props) => {
  return (
    <View>
      <Text>
        Quiz: {courseID}
      </Text>
    </View>
  )
}

export default Quiz