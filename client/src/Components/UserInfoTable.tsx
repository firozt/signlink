import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { UserInfo } from '../types';

type Props = {
  userInfo: UserInfo | undefined;
};

const UserInfoTable = ({ userInfo }: Props) => {
  return (
    <View style={styles.infoContainer}>
      <View style={styles.infoItemContainer}>
        <Text style={styles.rowName}>Joining Date</Text>
        <Text style={styles.rowData}>{userInfo?.createDate}</Text>
      </View>
      <View style={styles.infoItemContainer}>
        <Text style={styles.rowName}>Name</Text>
        <Text style={styles.rowData}>{userInfo?.name}</Text>
      </View>
      <View style={styles.infoItemContainer}>
        <Text style={styles.rowName}>Email</Text>
        <Text style={styles.rowData}>{userInfo?.email}</Text>
      </View>
    </View>
  );
};

export default UserInfoTable;

const styles = StyleSheet.create({
  infoContainer: {
    backgroundColor: '#453DAB',
    height: 200,
    paddingVertical: 2.5,
  },
  infoItemContainer: {
    backgroundColor: '#3C34A4',
    height: 60,
    marginVertical: 2.5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center', // Align items vertically in the center
  },
  rowName: {
    marginLeft: 10,
    flex: 1, // Take up available space evenly
    fontSize: 17,
    textAlign: 'center',
    height: 60,
    lineHeight: 60, // Center text vertically
    color:'#d3d3d3'

  },
  rowData: {
    flex: 3, // Take up more space than rowName
    fontSize: 18,
    textAlign: 'center',
    height: 60,
    lineHeight: 60, // Center text vertically
    color:'#d3d3d3'

  },
});
