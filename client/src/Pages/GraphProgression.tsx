import { REACT_APP_SERVER_PROXY_URL } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { User } from '@react-native-google-signin/google-signin'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { UserScore } from '../types'
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

type Props = {
  courseID : string
}





const GraphProgression = ({courseID}: Props) => {
  const [data, setData] = useState<UserScore[]>([]);

  useEffect(() => {
    getData()
  },[])

  const getGoogleID = async () => {
    try {
      const value = await AsyncStorage.getItem('@user');
      const user: User = JSON.parse(value??'null')
      return user.user.id;
    } catch (e) {
      console.error(e);
    }
  } 
  
  const orderByDate = (list: UserScore[]) => {
    return list.sort((a, b) => {
      const dateA = new Date(a.time.replace(/-/g, '/')).getTime();
      const dateB = new Date(b.time.replace(/-/g, '/')).getTime();
      return dateA - dateB;
    }).reverse();
  }

  const getData = async () => {
    const id = await getGoogleID()
    const url = `${REACT_APP_SERVER_PROXY_URL}/users/userscore/getall/${id}/${courseID}`
    console.log(url)
    axios.get(url)
    .then(response => {
      const data : UserScore[] = response.data
      setData(orderByDate(data))
    })
    .catch(error => console.error("ERROR GETTING GRAPH DATA : " + error))
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{courseID.replace(/-/g, ' ')}</Text>
      {data.length > 0 &&
      <LineChart
      data={{
      labels: data.map((item,index) => ""+(index+1)),
      datasets: [
        {
          data: data.map(item => Math.round((item.score*100))).reverse()
        }
      ]
    }}
    width={420} // from react-native
    height={220}
    yAxisSuffix="%"
    yAxisInterval={1}
    chartConfig={{
      backgroundColor: "#4F46BD",
      backgroundGradientFrom: "#4F46BD",
      backgroundGradientTo: "#4F46BD",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#372f94"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
    />}
      {
        data.map((item,index) => {
          return (
            <View key={index} style={styles.cellContainer}>
              <Text style={styles.cellText}>
                {Math.round(item.score*100)}%
              </Text>
              <Text style={styles.cellText}>
                {item.time.substring(0,10)}
              </Text>
            </View>
          )
        })
      }
      {
        data.length == 0 && <Text style={[styles.cellText,{textAlign:'center',marginTop:30}]}>
          You havent taken any exams for this course!
        </Text> 
      }
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4F46BD',
    width: '100%',
    height: '100%',
  },
  cellContainer: {
    alignSelf:'center',
    width:'85%',
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    height:100,
    backgroundColor: '#372f94',
    borderRadius:25,
    padding:25,
    borderWidth:3,
    marginVertical: 10
  },
  cellText: {
    alignSelf:'center',
    color:'white',
    fontSize:24
  },
  title: {
    fontSize: 42,
    color: 'white',
    textAlign: 'center',
    marginBottom: 15,
  },
});

export default GraphProgression