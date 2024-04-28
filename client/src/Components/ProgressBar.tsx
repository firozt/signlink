import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

type Props = {
  progress: number
}

const ProgressBar = ({progress}: Props) => {
  
  const totalWidth = 300
  return (
    <View style={styles.progressBar}>
      <View style={[styles.progressContainer, { width: totalWidth }]}>
        <View style={{width: `${progress}%`,backgroundColor:'#6cab6c',height:50}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  progressContainer: {
    backgroundColor: '#ddd',
    height: 30,
    borderRadius: 20,
    overflow: 'hidden',
    marginVertical: 10,
  },
  progressBar: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    display: 'flex',
  },
});

export default ProgressBar