import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native'
import GlobalStyles from '../GlobalStyles'
import { Button, Center, Input, InputField, InputIcon, InputSlot, SearchIcon } from '@gluestack-ui/themed'
import DictionaryItem from '../Components/DictionaryItem'
import Navbar from '../Components/Navbar'
import { User } from '@react-native-google-signin/google-signin/lib/typescript/src/types'
import { DictionaryMapping } from '../types'
import { SERVER_PROXY_URL } from '@env';

import axios from 'axios'
import { Sprout } from 'lucide-react-native'

type Props = {
}

const array = [...Array(2).keys()]; // temp


const DictionaryPage = ( props: Props) => {
  const [listData, setListData] = useState<DictionaryMapping[]>()
  const [search, setSearch] = useState<string>('');


  useEffect(() => {
    defaultWords()
  },[])

  const defaultWords = async () => {
    const url = `${SERVER_PROXY_URL}/dictionary/getall/15`
    axios.get(url).then(response => {
      const data: DictionaryMapping[] = response.data
      console.log(data)
      setListData(data)
    }).catch(error => console.error("ERROR MAKING DICTIONARY INIT REQUST : " + error))
  }

  const searchRequest = async () => {
    const url = `${SERVER_PROXY_URL}/dictionary/getlike/${search}`
    axios.get(url)
    .then(response => {
      const data : DictionaryMapping[] = response.data
      setListData(data);
    })
  }

  const handleSearch = () => {
    if (search == '') {
      defaultWords
      return;
    }
    searchRequest()
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Center>
            <Text style={GlobalStyles.heading1}>
              Dictionary
            </Text>
            <View style={styles.inputGroup}>
              <Input  style={styles.searchBar}>
                <InputSlot>
                  <InputIcon marginLeft={10} as={SearchIcon}/>
                </InputSlot>
                <InputField 
                  top={3}
                  placeholder="Search"
                  onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => setSearch(e.nativeEvent.text)}
                />
              </Input>
              <TouchableOpacity style={styles.button} onPress={() => handleSearch()}>
                <Text style={GlobalStyles.text}>
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </Center>
          <ScrollView style={styles.resultContainer}>
            {
              listData?
              listData.map((value, i) => (
                <DictionaryItem key={i} dictMapping={value} />
              )):
              <Text>Loading...</Text>
            }
          </ScrollView>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4F46BD',
    height: '100%',
    width: '100%',
  },
  header: {
    marginVertical: 20,
  },
  searchBar: {
    width: '60%',
    backgroundColor: 'white',
    borderRadius:100,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  resultContainer: {
    marginTop: 20,
    marginBottom: 25
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'row',
  },
  button: {
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
    backgroundColor: '#4684BD',
    width:80,
    display:'flex',
    alignContent:'center',
    alignItems:'center',
    justifyContent:'center',
  },

})

export default DictionaryPage