import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React, { useState } from 'react'
import YoutubePlayer from "react-native-youtube-iframe";
import { DictionaryMapping } from '../types';

type Props = {
  dictMapping: DictionaryMapping
}

const DictionaryPopup = ({dictMapping}: Props) => {
  const getYoutubeID = (url: string) => {
    const id = url.split('=')[1] // at most this will be len 3, always pick 1
    return id;
  }

  return (
    <View style={styles.container}>
      {/* <Text style={{fontSize: fontSize, color: 'white', textAlign:'center', margin:12}}>{word}</Text> */}
      <YoutubePlayer 
      height={250}
      play={true}
      mute={true}
      videoId={getYoutubeID(dictMapping?.url)??''}
      initialPlayerParams={{
        start: 	dictMapping.startTime | 0,
        end:   dictMapping.endTime | 0,
        controls: true,
        loop: true,
        modestbranding: false,
        rel: false
      }}
      >
      </YoutubePlayer>
      <View style={{margin:10}}>
        {/* <Text>
          Full URL Here : 
        </Text>
        <Text>
          {dictMapping.url}
        </Text> */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10
  }
})


export default DictionaryPopup