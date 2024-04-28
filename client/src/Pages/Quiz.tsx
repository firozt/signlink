import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { REACT_APP_SERVER_PROXY_URL } from '@env'
import { Word } from '../types'
import QuizQuestion from '../Components/QuizQuestion'
import QuizInput from '../Components/QuizInput'
import FinishedTestPage from './FinishedTestPage'


type Props = {
  courseID: string
  testmode: boolean
  prevScore: number
}


const Quiz = ({courseID, testmode, prevScore}: Props) => {
  const [quizData, setQuizData] = useState<Word[]>([]);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [finished, setFinished] = useState<boolean>(false);
  const [correct, setCorrect] = useState<number>(0);
  const [wrongs, setWrongs] = useState<Word[]>([])

  const incrementCurrentIdx = () => {
    if (currentIdx >= quizData.length-1) {
      if (testmode) {
        // end test here
        setFinished(true)
        return
      }
      // reshuffle and start at zero again
      setQuizData(shuffleArray(quizData))
      setCurrentIdx(0)
    } else {
      if (wrongs.length > 0 && !testmode) {
        // put higher priority to this word
        const randomChange = 2; // 20% chance
        const random = Math.floor(Math.random() * 10) + 1; // randomly picks a number 1-10
        if (random <= randomChange) {
          // do change
          setQuizData(prev => [...prev, wrongs[0]]) // insert wrong into currrent slot
          console.log('inserting wrong: ' + wrongs[0].wordText)
          setWrongs(wrongs.slice(1)) // remove top of the stack
        }
      }
      setCurrentIdx(currentIdx+1)
    }
  }

  useEffect(() => {
    getCourseData()
  },[])

  useEffect(() => {
  },[currentIdx])

  // gets all word pairings
  const getCourseData = async () => {
    const url = `${REACT_APP_SERVER_PROXY_URL}/words/getall/${courseID}`
    console.log(url)
    axios.get(url)
    .then(response => {
      const data: Word[] = response.data
      setQuizData(shuffleArray(data))
    })
    .catch(error => {
      console.error("ERROR FETCHING QUIZ DATA :" + error )
    })
  }

  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Generate random index from 0 to i
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements at i and j
    }
    return array;
  }

  return (
    <View>
      { 
        finished ?
        <FinishedTestPage 
        prevScore={prevScore}
        correct={Math.min(correct,quizData.length)} 
        total={quizData.length} 
        courseID={courseID} 
        wrongs={wrongs}
        />
        :
        quizData.length > 0 ?
        <>
          {
            testmode &&
            <View style={styles.counterContainer}>
              <Text style={styles.counter}>
                Score : {correct}
              </Text>
              <Text style={styles.counter}>
                {currentIdx+1} / {quizData.length}
              </Text>
            </View>
          }
          {finished ||  <QuizQuestion imageURI={quizData[currentIdx].imageURI} />}
          <QuizInput 
          correct={quizData[currentIdx].wordText} 
          wordList={quizData.filter(item => item.wordText !== quizData[currentIdx].wordText)} 
          onInput={incrementCurrentIdx}
          currentidx={currentIdx}
          incrementScore={() => setCorrect(correct+1)}
          onWrong={(wrong: Word) => setWrongs(prev => [...prev, wrong])}
          />
        </> :
        <View>
          <Text>
            Loading...
          </Text>
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4F46BD',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  counter: {
    color:'white',
    fontSize: 24,
    marginTop: 5,
    marginHorizontal: 20
  },
  counterContainer: {
    backgroundColor: '#4F46BD',
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})
export default Quiz