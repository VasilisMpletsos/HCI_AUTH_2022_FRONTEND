import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, FlatList, View, TouchableOpacity, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Contacts from 'expo-contacts';

export default ContactsView = ({navigation}) => {

  const [contacts, setContacts] = useState(null);

  const successAddToast = (name) => {
    ToastAndroid.show(`Η επαφή ${name} προστέθηκε!`, ToastAndroid.LONG);
  }

  useEffect(() => {
    (async () => {
      Contacts.requestPermissionsAsync().then(({status})=>{
        if (status === 'granted') {
          Contacts.getContactsAsync({fields: [Contacts.Fields.PhoneNumbers]}).then(({data})=>{
            if(data.length > 0) {
              data = data.filter(contact => contact?.phoneNumbers && contact.phoneNumbers[0]?.number)
              setContacts(data);
            }
          });
        }
      });
    })();
  },[]);

  const saveContact = async (item) => {
    if(item?.phoneNumbers && item.phoneNumbers[0]?.number){
      try {
        AsyncStorage.getAllKeys(async (error, keys)=>{
          const countContacts = keys.filter(key => key.includes("Contact")).length;
          if((countContacts+1) < 7){
            const newContact = JSON.stringify(item);
            const newKey = "Contact" + String(countContacts+1);
            await AsyncStorage.setItem(newKey, newContact);
            successAddToast(item.name);
          }else{
            alert("ΔΕΝ ΜΠΟΡΕΙΣ ΝΑ ΕΧΕΙ ΠΑΡΠΑΝΩ ΑΠΟ 6 ΕΠΑΦΕΣ");
          }
        });
      } catch (e) {
        alert("ΚΑΤΙ ΠΗΓΕ ΣΤΡΑΒΑ");
      }
    }
  }

  const renderRow = ({ item }) => (
    <View style={styles.row}>
      <TouchableOpacity onPress={() => saveContact(item)} accessibilityLabel="Προσθήκη Επαφής" accessibilityHint={`Πάτα το κουμπί για να προσθέσεις την επαφή ${item.name}`}>
        <Text style={styles.rowName}>
          {item.name}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {contacts ? 
      <FlatList
        data={contacts}
        renderItem={renderRow}
        keyExtractor={item => item.id}
      /> : 
      <Text style={styles.warningText}>
        ΔΕΝ ΥΠΑΡΧΟΥΝ ΔΙΑΘΕΣΙΜΕΣ ΕΠΑΦΕΣ.
      </Text>
      }
      
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  item: {
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    padding: 5,
    borderBottomWidth: 1,

  },
  rowName: {
    fontSize: 40,
  },
  warningText: {
    fontSize: 30,
    fontFamily: 'OpenSans-Medium',
    margin: 10,
    textAlign: 'left'
  },
});
