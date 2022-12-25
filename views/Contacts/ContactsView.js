import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useIsFocused } from "@react-navigation/native";
import * as Contacts from 'expo-contacts';
import call from 'react-native-phone-call';


export default ContactsView = ({navigation}) => {

  const [savedContacts, setSavedContacts] = useState([]);
  const [showContacts, setShowContacts] = useState(false);
  const isFocused = useIsFocused();

  const getSavedContacts = async () => {
    try {
      AsyncStorage.getAllKeys(async (error, keys)=>{
        keys = keys.filter(key => key.includes("Contact"));
        await AsyncStorage.multiGet(keys, (err, stores) => {
          let contacts = [];
          stores.map((result, i, store) => {
            let key = store[i][0];
            console.log(key);
            let value = JSON.parse(store[i][1]);
            contacts.push({id: key, phone: value.phoneNumbers[0].number, name: value.name});
          })
          setSavedContacts(contacts);
        });
        if(keys.length){
          setShowContacts(true);
        }
      });
    } catch(e) {
      console.log("Couldn't retrieve any contacts");
    }
  }

  useEffect(()=>{
    getSavedContacts();
  },[isFocused])

  const callContact = (item) => {
    const number = item.phone;
    call({number, prompt: true}).catch(console.error);
  }

  const renderRow = () => {
    return savedContacts.map((contact)=>{
      console.log(contact);
      return (
        <View style={styles.row} key={contact.id}>
          <View style={styles.rowTextContainer}>
            <Text style={styles.rowText}>{contact.name}</Text>
          </View>
          <TouchableOpacity onPress={()=>callContact(contact)} style={styles.phoneCall}>
            <Image source={require('../../assets/call.png')} style={styles.callIcon}/>
          </TouchableOpacity>
        </View>
      )
    })
  }

  const clearSavedContacts = async () => {
    setShowContacts(false);
    try{
      AsyncStorage.getAllKeys(async (error, keys)=>{
        keys = keys.filter(key => key.includes("Contact"));
        AsyncStorage.multiRemove(keys, err => {})
      })
    }catch(e){
      console.log(e);
    }
    console.log('Cleared saved contacts');
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('Add Contacts')}}>
          <Image source={require('../../assets/add.png')} style={styles.image}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={clearSavedContacts}>
          <Image source={require('../../assets/delete.png')} style={styles.image}/>
        </TouchableOpacity>
      </View>
      <View style={styles.savedContacts}>
        {
        showContacts ?
        <View>
          {renderRow()}
        </View>
         :<View style={styles.noContactsView}>
            <Text style={styles.rowName}>
              There are not Contacts to be shown
            </Text>
         </View> 
        }
      </View>
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  savedContacts:{
    flex: 5,
  },
  row: {
    padding: 5,
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  rowTextContainer: {
    flex: 5,
    justifyContent: 'center',
  },
  rowText: {
    fontSize: 30,
    fontFamily: 'OpenSans-Medium'
  },
  phoneCall:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#008037',
    borderRadius: 100,
    },
  callIcon:{
    flex: 1,
    width: 40,
    height: 40,
    resizeMode: 'contain'
  },
  noContactsView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttons:{
    position: 'absolute',
    bottom: 10,
    height: 100,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 20,
    padding: 2,
    backgroundColor: 'white',
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain'
  }
});
