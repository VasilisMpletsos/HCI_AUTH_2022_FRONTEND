import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, FlatList, View, Button } from 'react-native';
import * as Contacts from 'expo-contacts';
import call from 'react-native-phone-call';


export default ContactsView = ({navigation}) => {

  const [contacts, setContacts] = useState(null)

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });
  
        if(data.length > 0) {
          setContacts(data);
        }
      }
    })();
  }, []);

  const callContact = (item) => {
    if(item?.phoneNumbers && item.phoneNumbers[0]?.number){
      const number = item.phoneNumbers[0].number;
      call({number, prompt: true}).catch(console.error);
    }
  }

  const renderRow = ({ item }) => (
    <View style={styles.row}>
      <Button style={styles.rowPhone} title={item.name} onPress={() => callContact(item)}/>
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
      <Text>
        There are not Contacts to be shown
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
    padding: 5

  },
  rowPhone: {
    fontSize: 40,
  },
});
