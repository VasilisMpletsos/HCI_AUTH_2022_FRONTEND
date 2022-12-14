import React, {useState, useEffect} from 'react';
import { StyleSheet, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SMS from 'expo-sms';
import * as Location from 'expo-location';
import call from 'react-native-phone-call';

const ImpactDetector = () => {
  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [impact, setImpact] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [location, setLocation] = useState(null);
  const [emergencyContact, setEmergencyContact] = useState(null);
  const [personalName, setPersonalName] = useState('');
  const [locationPermissions, setLocationPermissions] = useState(false);

  const getSavedContacts = async () => {
    try {
      AsyncStorage.getItem('Contact1', async (error, result)=>{
        const contact = JSON.parse(result);
        setEmergencyContact(contact);
      });
    } catch(e) {
      console.log("Couldn't retrieve any contacts");
    }
  }

  const getSelfData = async() => {
    AsyncStorage.getItem("profileInfo2").then(profileInfo=>{
      if(profileInfo){
        const data = JSON.parse(profileInfo);
        setPersonalName(data.username);
      }
    });
  }

  const getLocation = async() => {
    const personLocation = await Location.getCurrentPositionAsync({});
    setLocation(personLocation);  
    return;
  }

  const getLocationPermissions = () => {
    Location.requestForegroundPermissionsAsync().then(({status})=>{
     if (status == 'granted') {
       setLocationPermissions(true);
       getLocation();
     }
    });
   };

  const _subscribe = () => {
    setInterval(getLocation, 30000);
    setSubscription(
      Accelerometer.addListener(setData)
    );
    Accelerometer.setUpdateInterval(50);
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(()=>{
    getLocationPermissions();
    getSelfData();
    getSavedContacts();
    _subscribe();
    return () => _unsubscribe;
  },[])

  const sendImpactEmergencyMessage = async () => {
    await getLocation();
    const smsServiceAvailable = await SMS.isAvailableAsync();
    if (smsServiceAvailable && locationPermissions && emergencyContact?.phoneNumbers[0]?.number) {
      await SMS.sendSMSAsync(`${emergencyContact?.phoneNumbers[0]?.number}`,`???????????? ???????????????? ?????????????? ???????? ?????????????????? ${location.coords.latitude},${location.coords.longitude} - ${personalName}`);
    }else{
      call({number: '166', prompt: false}).catch(console.error);
    }
  }

  useEffect(() => {
    if(Math.max(x,y,z) > 4 && !impact){
      sendImpactEmergencyMessage();
      setImpact(true);
      setTimeout(()=>{
        setImpact(false);
      },1000)
    }
  }, [x,y,z]);

  return (
    <View style={styles.container}/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    width: 0,
    height: 0
  }
});

export default ImpactDetector;