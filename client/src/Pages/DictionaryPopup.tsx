import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React, { useState } from 'react'
import YoutubePlayer from "react-native-youtube-iframe";

type Props = {
  word: string
}

const DictionaryPopup = ({word}: Props) => {
  const [playing, setPlaying] = useState(false);
  const { width } = Dimensions.get('window');
  const fontSize = width / 8
  
  const getYoutubeID = (url: string) => {
    var urlObj = new URL(url);
    // Get the value of the 'v' parameter
    var videoId = urlObj.searchParams.get('v');
    
    return videoId;
  }
  return (
    <View style={styles.container}>
      <Text style={{fontSize: fontSize, color: 'white', textAlign:'center', margin:12}}>{word}</Text>
      <YoutubePlayer 
      height={600}
      play={true}
      videoId='cNtU2UH-2Rk'
      initialPlayerParams={{
        start: 	10,
        end:   12, 
        controls: false,
        loop: true,
        modestbranding: false,
        rel: false
        
      }}
      >
      </YoutubePlayer>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4F46BD',
    height: '100%',
    width: '100%',
  },
  button: {
    width:200,
  },
  heading: {
    
  }
})


export default DictionaryPopup