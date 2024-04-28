import { Button } from '@gluestack-ui/themed'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { User } from '@react-native-google-signin/google-signin'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import RNRestart from 'react-native-restart';
import { REACT_APP_SERVER_PROXY_URL } from '@env';
import { UserInfo, UserScore, UserScoreByDifficulty } from '../types';
import UserInfoTable from '../Components/UserInfoTable';
import ProgressBar from '../Components/ProgressBar';

type Props = {
  user: User
  setUser: (newUser: any) => void
}

type DifficultyMapping = {
  [key: string]: 'easy' | 'medium' | 'hard';
};
type TotalNumberMapping = {
  [key: string]: number;
};

const defaultUserScoreObject: UserScoreByDifficulty = {
  easy: 0,
  medium: 0,
  hard: 0,
}

    // maps courseid (unhyphenated) to difficulty
    const nameDifficultyMapping: DifficultyMapping = {
      alphabet1: 'easy',
      alphabet2: 'easy',
      basicwords: 'medium',
      numbers: 'easy',
      questionmarker:'medium',
      animal:'hard',
    };
    
    // maps difficulty to total number of courses for that difficulty
    const nameTotalCourseMapping: TotalNumberMapping = {
      easy: 3,
      medium: 2,
      hard: 1,
    }
  

const UserProfile = ({user, setUser}: Props) => {
  const { width } = Dimensions.get('window');
  const fontSize = width / 8
  const [userInfo, setUserInfo] = useState<UserInfo>()
  const [userScore, setUserScore] = useState<UserScoreByDifficulty>(defaultUserScoreObject);




  // calling the get all userscore endpoint returns every userscore object associated with a given user
  const parseUserScoreResponse = (userScoreResponse : UserScore[]): UserScoreByDifficulty => {
    const parsedScores: UserScoreByDifficulty = {
      easy: 0,
      medium: 0,
      hard: 0,
    }


    userScoreResponse.forEach((item) => {
      const courseName: string = removeCharacterFromString(item.courseID,'-') 
      if (nameDifficultyMapping[courseName] == 'easy') {
        parsedScores.easy += item.score
      } else if (nameDifficultyMapping[courseName] == 'medium') {
        parsedScores.medium += item.score
      } else if (nameDifficultyMapping[courseName] == 'hard') {
        parsedScores.hard += item.score
      } else {
        console.error('cannot find course ' + courseName)
      }
    })
    
    // divide by total number course for each difficulty to get average
    parsedScores.easy /= nameTotalCourseMapping.easy
    parsedScores.medium /= nameTotalCourseMapping.medium
    parsedScores.hard /= nameTotalCourseMapping.hard
    return parsedScores
  }


  const removeCharacterFromString = (str: string, characterToRemove: string) => {
    const regex = new RegExp(characterToRemove, 'g');
    
    // Replace occurrences of the characterToRemove with an empty string
    return str.replace(regex, '');
  }
  
  useEffect(() => {
    getUserInfo()
  },[])

  useEffect(() => {
    getUserScores()
  },[userInfo])

  const getGoogleID = async () => {
    try {
      const value = await AsyncStorage.getItem('@user');
      const user: User = JSON.parse(value??'null')
      return user.user.id;
    } catch (e) {
      console.error(e);
    }
  }

  const getUserScores = async () => {
    const googleId: string = await getGoogleID()??'';
    const url = `${REACT_APP_SERVER_PROXY_URL}/users/userscore/${googleId}`
    console.log(url)
    axios.get(url)
    .then(response => {
      const data: UserScore[] = response.data
      setUserScore(parseUserScoreResponse(data))
    })
    .catch(error => console.error("ERROR FETCHIN USER SCORES : " + error))
  }

  const  logout = async () => {
    try {
      await AsyncStorage.clear()
      RNRestart.restart();
    } catch (error) {
      console.error('error logging out: ', error)
    }
  }
  
  // gets user info using the id stored in storage
  const getUserInfo = async () => {
    const userInfo: User = JSON.parse(await AsyncStorage.getItem('@user')??'null');
    if (userInfo==null) {
      console.error('no user data stored in local storage, should be signed out')
    }
    const url = `${REACT_APP_SERVER_PROXY_URL}/users/get_info/${userInfo.user.id}` 
    console.log(url)
    axios.get(url)
    .then(response => {
      const data : UserInfo = response.data
      setUserInfo(data)
    }).catch(error => console.error("ERROR GETTING USER ON USER PAGE " + error))
  }

  return (
    <View style={styles.container}>
      <Text style={{fontSize: fontSize, color: 'white', textAlign:'center', margin:12}}>
        {userInfo?.name}'s Profile
      </Text>
      <UserInfoTable userInfo={userInfo}/>
      <View style={styles.container2}>
        <Button onPress={() => logout()} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>
            Logout
          </Text>
        </Button>
      </View>
      <View style={styles.progressSectionContainer}>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>Easy</Text>
          <ProgressBar progress={userScore.easy*100}/>
        </View>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>Medium</Text>
          <ProgressBar progress={userScore.medium*100}/>
        </View>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>Hard</Text>
          <ProgressBar progress={userScore.hard*100}/>
        </View>
      </View>
    </View>
  )

}
// #453DAB
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4F46BD',
    height: '100%',
    width: '100%',
    flex: 1,
  },
  logoutButton: {
    margin: 5,
    width: 100,
    backgroundColor: 'red',
  },
  logoutButtonText: {
    color: 'white',
    fontSize:19,
  },
  container2: {
    flex: 1,
    flexDirection: 'row-reverse'
  },
  progressText: {
    color: 'white',
    // textAlign: 'center',
    fontSize: 20,
    bottom: 25,
    marginLeft: '15%',
    marginBottom: 5,
    marginTop: 25,
    fontWeight:'500'
  },
  progressContainer: {
    margin: 20,
  },
  progressSectionContainer: {
    display:'flex',
    justifyContent:'flex-start',
    alignContent:'flex-start',

    bottom: 150
  }

})
export default UserProfile