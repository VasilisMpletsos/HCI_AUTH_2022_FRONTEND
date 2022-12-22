import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default ProfileView = ({navigation}) => {
  const [userData, setUserData] = useState({
    username: '',
    civilianID: '',
    homeAddress: ''
  });
  const [edit, setEdit] = useState(false);


  return (
    <View style={styles.container}>

      <View style={styles.row}>
        <Text style={styles.title}>
          Username
        </Text> 
        {
        edit ? 
        <TextInput
        style={styles.textInput}
        onChangeText={username => setUserData({...userData, username: username})}
        value={userData.username}
        /> :
        <Text style={styles.text}>
          {userData.username ? userData.username : 'No Name'}
        </Text> 
        }
      </View>

      <View style={styles.row}>
        <Text style={styles.title}>
          Civilian ID
        </Text> 
        {
        edit ? 
        <TextInput
        style={styles.textInput}
        onChangeText={civilianID => setUserData({...userData, civilianID: civilianID})}
        value={userData.civilianID}
        /> :
        <Text style={styles.text}>
          {userData.civilianID ? userData.civilianID : 'No Civilian ID'}
        </Text> 
        }
      </View>
      
      <View style={styles.row}>
        <Text style={styles.title}>
          Home Address
        </Text> 
        {
        edit ? 
        <TextInput
        style={styles.textInput}
        onChangeText={homeAddress => setUserData({...userData, homeAddress: homeAddress})}
        value={userData.homeAddress}
        /> :
        <Text style={styles.text}>
          {userData.homeAddress ? userData.homeAddress : 'No Home Address'}
        </Text> 
        }
      </View>
      
      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={()=>setEdit(!edit)}>
          {edit ? 
          <Image source={require('../assets/success.png')} style={styles.editButton}/> :
          <Image source={require('../assets/edit.png')} style={styles.editButton}/> 
          }
        </TouchableOpacity>
      </View>

    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'column',
  },
  row: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    textDecorationLine: 'underline'
  },
  text: {
    fontSize: 25,
    fontWeight: '600'
  },
  textInput: {
    fontSize: 25,
    fontWeight: '500',
    padding: 5, 
    borderColor: 'gray', 
    borderWidth: 2
  },  
  button:{
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  editButton:{
    flex: 1, 
    width:'100%',
  }
});
