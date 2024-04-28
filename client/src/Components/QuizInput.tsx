import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Word } from '../types';

type Props = {
  wordList: Word[]
  correct: string
  onInput: () => void
  currentidx: number
  incrementScore: () => void
  onWrong: (wrong: Word) => void
};

const QuizInput = ({wordList, correct,onInput, currentidx, incrementScore, onWrong}: Props) => {
  const [buttonPressed, setButtonPressed] = useState('');
  const [buttonNames, setButtonNames] = useState<string[]>(['1','2','3','4'])
  const [answerStatus, setAnswerStatus] = useState<'correct' | 'incorrect' | ''>('');
  
  // returns shuffled array and index of new item
  const insertRandomly = (array: any[], value: any) => {
    const randomIndex = Math.floor(Math.random() * (array.length + 1)); // Generate random index from 0 to array.length
    array.splice(randomIndex, 0, value); // Insert value at randomIndex without removing any elements
    return array
  }

  useEffect(() => {
    const buttonNameList : string[] = getRandomIncorrects()
    setButtonNames(insertRandomly(buttonNameList.map((item) => item.replace(/-/g, ' ')), correct))
  },[currentidx])
  
  const handleButtonClick = (button: string) => {
    setButtonPressed(button)
    if (button == correct) {
      console.log('correct')
      incrementScore()
      setAnswerStatus('correct')
    } else {
      console.log('incorrect')
      setAnswerStatus('incorrect')
      const orgText = button.replace(/ /g, '-') // hyphenate string again as that is what is saved 
      const wrongWord: Word | undefined = wordList.find(item => item.wordText == orgText)
      if (wrongWord == undefined) {
        console.error("wrong word is undefined")
        return
      }
      onWrong(wrongWord)
    }

    // wait a second then go to the next questions
    setTimeout(() => {
      console.log('next')
      setAnswerStatus('')

      onInput()
    }, 1000);


  }

  const getRandomIncorrects = () => {
    const max = wordList.length;
    const min = 0;
    
    let idx1, idx2, idx3;
    
    do {
        idx1 = Math.floor(Math.random() * (max - min)) + min;
        idx2 = Math.floor(Math.random() * (max - min)) + min;
        idx3 = Math.floor(Math.random() * (max - min)) + min;
    } while (idx1 === idx2 || idx1 === idx3 || idx2 === idx3);

    return [
        wordList[idx1]?.wordText,
        wordList[idx2]?.wordText,
        wordList[idx3]?.wordText,
    ];
};


  return (
    <View style={styles.container}>
      {/* Render answer status */}
      {answerStatus === 'correct' && <Text style={styles.correctText}>Correct!</Text>}
      {answerStatus === 'incorrect' && <Text style={styles.incorrectText}>{correct.replace(/-/g, ' ')}</Text>}
      { answerStatus === '' && <Text></Text>}
      <View style={styles.buttonContainer}>
        <View style={styles.row}>
          <TouchableOpacity
            style={[
              styles.button,
              buttonPressed === 'option1' && styles.buttonPressed,
            ]}
            onPress={() => handleButtonClick(buttonNames[0])}>
            <Text style={styles.buttonText}>{buttonNames[0]}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              buttonPressed === 'option2' && styles.buttonPressed,
            ]}
            onPress={() => handleButtonClick(buttonNames[1])}>
            <Text style={styles.buttonText}>{buttonNames[1]}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={[
              styles.button,
              buttonPressed === 'option3' && styles.buttonPressed,
            ]}
            onPress={() => handleButtonClick(buttonNames[2])}>
            <Text style={styles.buttonText}>{buttonNames[2]}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              buttonPressed === 'option4' && styles.buttonPressed,
            ]}
            onPress={() => handleButtonClick(buttonNames[3])}>
            <Text style={styles.buttonText}>{buttonNames[3]}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
  
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4F46BD',
    height: 361,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
  },
  buttonContainer: {
    flexDirection: 'column', // Arrange buttons vertically
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    bottom: 10
  },
  row: {
    flexDirection: 'row', // Arrange buttons horizontally
    justifyContent: 'center', // Center horizontally
    alignItems: 'center', // Center vertically
  },
  button: {
    margin: 15,
    width: 175,
    height: 60,
    backgroundColor: '#fbf7f5',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
  },
  buttonPressed: {
    backgroundColor: '#9c81b8', // Purplish shade
    opacity: 0.8, // Slightly opaque
  },
  correctText: {
    color: 'green',
    fontSize: 32,
    fontWeight: '900',
    bottom: 50,
  },
  incorrectText: {
    color: 'red',
    fontSize: 32,
    fontWeight: '900',
    bottom: 50,

  },
});

export default QuizInput;
