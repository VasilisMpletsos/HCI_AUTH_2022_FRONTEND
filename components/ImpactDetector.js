import React, {useState, useEffect} from 'react';
import { StyleSheet, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import * as SMS from 'expo-sms';
import * as Location from 'expo-location';
import * as Haptics from 'expo-haptics';

const ImpactDetector = () => {
  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [impact, setImpact] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [location, setLocation] = useState(null);
  const [locationPermissions, setLocationPermissions] = useState(false);

  const getLocation = async() => {
    if (locationPermissions){
      Location.getCurrentPositionAsync({}).then(location=>{
        setLocation(location);  
      });
    }
  }

  const getLocationPermissions = async () => {
    Location.requestForegroundPermissionsAsync().then(async ({status})=>{
     if (status == 'granted') {
       setLocationPermissions(true);
       getLocation();
     }
     console.log('Location persmission', status)
    });
   };

  const _subscribe = () => {
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
    _subscribe();
    getLocationPermissions();
    return () => _unsubscribe;
  },[])

  const sendImpactEmergencyMessage = async () => {
    await getLocation();
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      await SMS.sendSMSAsync('166',`Impact Detected at ${location.coords.latitude},${location.coords.longitude}`);
    }
  }

  useEffect(() => {
    if(Math.max(x,y,z) > 5 && !impact){
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