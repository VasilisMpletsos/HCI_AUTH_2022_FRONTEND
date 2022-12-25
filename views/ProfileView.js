import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, SafeAreaView, ScrollView, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default ProfileView = ({navigation}) => {
  const [userData, setUserData] = useState({
    username: '',
    civilianID: '',
    phone: '',
    homeAddress: ''
  });
  const [edit, setEdit] = useState(false);

  const saveProfileInfo = () => {
    const profileInfo = JSON.stringify(userData);
    AsyncStorage.setItem("profileInfo2", profileInfo).then(()=>{
      setEdit(!edit);
    }).catch(()=>{
      alert("Something went wrong. Couldn't save profile info")
    });
  }

  useEffect(()=>{
    AsyncStorage.getItem("profileInfo2").then(profileInfo=>{
      if(profileInfo){
        setUserData(JSON.parse(profileInfo));
      }
    });
  },[])


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.row}>
          <Text style={styles.title}>
            Ονοματεπώνυμο
          </Text> 
          {
          edit ? 
          <TextInput
          style={styles.textInput}
          onChangeText={username => setUserData({...userData, username: username})}
          placeholder="Ονοματεπώνυμο"
          value={userData.username}
          /> :
          <Text style={styles.text}>
            {userData.username ? userData.username : 'Δεν έχει αποθηκευτεί'}
          </Text> 
          }
        </View>

        <View style={styles.row}>
          <Text style={styles.title}>
            Αριθμός Ταυτότητας
          </Text> 
          {
          edit ? 
          <TextInput
          style={styles.textInput}
          onChangeText={civilianID => setUserData({...userData, civilianID: civilianID})}
          placeholder="Αριθμός Ταυτότητας"
          value={userData.civilianID}
          /> :
          <Text style={styles.text}>
            {userData.civilianID ? userData.civilianID : 'Δεν έχει αποθηκευτεί'}
          </Text> 
          }
        </View>
        
        <View style={styles.row}>
          <Text style={styles.title}>
          Κινητό Τηλέφωνο
          </Text> 
          {
          edit ? 
          <TextInput
          style={styles.textInput}
          onChangeText={phone => setUserData({...userData, phone: phone})}
          placeholder="Κινητό Τηλέφωνο"
          value={userData.phone}
          /> :
          <Text style={styles.text}>
            {userData.phone ? userData.phone : 'Δεν έχει αποθηκευτεί'}
          </Text> 
          }
        </View>

        <View style={styles.row}>
          <Text style={styles.title}>
            Διεύθυνση Κατοικίας
          </Text> 
          {
          edit ? 
          <TextInput
          style={styles.textInput}
          onChangeText={homeAddress => setUserData({...userData, homeAddress: homeAddress})}
          placeholder="Διεύθυνση Κατοικίας"
          value={userData.homeAddress}
          /> :
          <Text style={styles.text}>
            {userData.homeAddress ? userData.homeAddress : 'Δεν έχει αποθηκευτεί'}
          </Text> 
          }
        </View>
        
        <View style={styles.row}>
            {edit ? 
            <TouchableOpacity
              onPress={()=>setEdit(!edit)}
              accessibilityLabel="Learn more about this purple button"
            >
              <View style={styles.button}>
                <Text style={styles.buttonText}>ΑΠΟΘΗΚΕΥΣΗ ΑΛΛΑΓΩΝ</Text>
              </View>
            </TouchableOpacity>
            :
            <TouchableOpacity
              onPress={saveProfileInfo}
              accessibilityLabel="Learn more about this purple button"
            >
              <View style={styles.button}>
                <Text style={styles.buttonText}>ΑΛΛΑΓΗ ΣΤΟΙΧΕΙΩΝ</Text>
              </View>
            </TouchableOpacity>
            }
        </View>
      </ScrollView>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  row: {
    flex: 1,
    minHeight: 130,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    textDecorationLine: 'underline',
    fontFamily: 'OpenSans-Medium'
  },
  text: {
    fontSize: 25,
    fontFamily: 'OpenSans-Bold',
  },
  textInput: {
    fontSize: 25,
    fontWeight: '500',
    padding: 5, 
    borderColor: 'gray', 
    borderWidth: 2
  },  
  button:{
    height: 50,
    padding: 10,
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
