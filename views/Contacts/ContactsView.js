import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import * as Contacts from 'expo-contacts';
import call from 'react-native-phone-call';


export default ContactsView = ({navigation}) => {

  const [savedContacts, setSavedContacts] = useState([]);
  const [showContacts, setShowContacts] = useState(false);

  const getSavedContacts = async () => {
    try {
      AsyncStorage.getAllKeys(async (error, keys)=>{
        keys = keys.filter(key => key.includes("Contact"));
        await AsyncStorage.multiGet(keys, (err, stores) => {
          stores.map((result, i, store) => {
            let key = store[i][0];
            console.log(key);
            let value = JSON.parse(store[i][1]);
            let contacts = savedContacts;
            contacts.push({id: key, phone: value.phoneNumbers[0].number, name: value.name});
            setSavedContacts(contacts);
          })
        });
        if(keys.length){
          setShowContacts(true);
        }
      });
    } catch(e) {
      console.log("Couldn't retrieve any contacts");
    }
  }

  useFocusEffect(()=>{
    getSavedContacts();
  })

  useEffect(()=>{}, [savedContacts])

  setTimeout(()=>{
    console.log(savedContacts);
  },1000)

  const callContact = (item) => {
    const number = item.phone;
    call({number, prompt: true}).catch(console.error);
  }

  const renderRow = () => {
    return savedContacts.map((contact)=>{
      console.log(contact);
      return (
        <View style={styles.row}>
          <Text style={styles.rowName} key={contact.id}>{contact.name}</Text>
        </View>
      )
    })
  }

  const clearSavedContacts = async () => {
    setShowContacts(false);
    try{
      AsyncStorage.getAllKeys(async (error, keys)=>{
        keys = keys.filter(key => key.includes("Contact"));
        console.log(keys);
        AsyncStorage.multiRemove(keys, err => {})
      })
    }catch(e){
      console.log(e);
    }
    console.log('Cleared saved contacts');
  }

  return (
    <View style={styles.container}>
      <View style={styles.addContacts}>
        <Button 
          title="Add Contacts" 
          onPress={()=>{navigation.navigate('Add Contacts')}}
        />
        <Button 
          title="Clear Saved Contacts" 
          color='red'
          onPress={clearSavedContacts}
        />
      </View>
      <View style={styles.savedContacts}>
        {
        (savedContacts.length !== 0) ?
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
  addContacts: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  savedContacts:{
    flex: 5,
  },
  row: {
    padding: 1,
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rowName: {
    fontSize: 40,
  },
  noContactsView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
