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
      return (
        <View style={styles.row} key={contact.id}>
          <View style={styles.rowTextContainer}>
            <Text style={styles.rowText}>{contact.name}</Text>
          </View>
          <TouchableOpacity onPress={()=>callContact(contact)} style={styles.phoneCall} accessibilityLabel="Κουμπί κλήσης" accessibilityHint={`Κλήση της επαφής ${contact.name}`}>
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
        <TouchableOpacity
          onPress={(()=>{navigation.navigate('Add Contacts')})}
          accessibilityLabel="Προσθήκη Επαφών"
          accessibilityHint="Πάτα το κουμπί για να προσθέσεις συντομεύσεις επαφών">
          <View style={styles.button}>
            <Text style={styles.buttonText}>ΠΡΟΣΘΗΚΗ ΕΠΑΦΩΝ</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={clearSavedContacts}
          accessibilityLabel="Διαγραφή Επαφών"
          accessibilityHint="Πάτα το κουμπί για να διαγράψεις τις αποθηκευμένες συντομεύσεις επαφών στην εφαρμογή">
          <View style={styles.button}>
            <Text style={styles.buttonText}>ΔΙΑΓΡΑΦΗ ΕΠΑΦΩΝ</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.savedContacts}>
        {
        showContacts ?
        <View>
          {renderRow()}
          <View style={styles.emergencyContactContaienr}>
            <Text style={styles.emergencyContactTitle}>Επαφή Επείγουσας Ανάγκης</Text>
            <Text style={styles.emergencyContactName}>{savedContacts[0].name}</Text>
          </View>
        </View>
         :<View style={styles.noContactsView}>
            <Text style={styles.warningText}>
              ΔΕΝ ΥΠΑΡΧΟΥΝ ΔΙΑΘΕΣΙΜΕΣ ΕΠΑΦΕΣ.
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
  emergencyContactContaienr: {
    flexDirection: 'column',
    height: 100,
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 12,
    backgroundColor: '#FF5757',
    justifyContent: 'center',
    alignItems: 'center'
  },
  emergencyContactTitle:{
    fontSize: 22,
    fontFamily: 'OpenSans-Medium',
    textDecorationLine: 'underline'
  },
  emergencyContactName:{
    fontSize: 25,
    fontFamily: 'OpenSans-Bold',
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
  warningText: {
    fontSize: 30,
    fontFamily: 'OpenSans-Medium',
    margin: 10,
    textAlign: 'left'
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
    bottom: 30,
    height: 100,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-evenly'
  },
  button:{
    height: 50,
    padding: 10,
    margin:30,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C8DFF4'
  },
  buttonText:{
    fontSize: 18,
    fontFamily: 'OpenSans-Bold',
  },
});
