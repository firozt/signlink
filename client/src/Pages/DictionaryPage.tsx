import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import GlobalStyles from '../GlobalStyles'
import { Button, Center, Input, InputField, InputIcon, InputSlot, SearchIcon } from '@gluestack-ui/themed'
import DictionaryItem from '../Components/DictionaryItem'
import Navbar from '../Components/Navbar'
import { User } from '@react-native-google-signin/google-signin/lib/typescript/src/types'

type Props = {
}

const array = [...Array(16).keys()]; // TEMP TO GENERATE ALOT OF WORDS

const DictionaryPage = ( props: Props) => {
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
                <InputField top={3}
                  placeholder="Search"
                />
              </Input>
              <TouchableOpacity style={styles.button}>
                <Text style={GlobalStyles.text}>
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </Center>
          <ScrollView style={styles.resultContainer}>
            {
              array.map((i) => (
                <DictionaryItem key={i} word='Test Word' />
              ))
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