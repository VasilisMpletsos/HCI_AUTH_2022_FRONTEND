import React, {useState, useEffect} from 'react';
import { StyleSheet, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import * as SMS from 'expo-sms';

const ImpactDetector = () => {
  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [impact, setImpact] = useState(false);
  const [subscription, setSubscription] = useState(null);

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
    return () => _unsubscribe;
  },[])

  const sendImpactEmergencyMessage = async () => {
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      SMS.sendSMSAsync('+306944048324','Impact Detected');
    }
  }

  useEffect(() => {
    if((x > 5 || y > 5 || z > 5) && !impact){
      console.log('Acceleration is big');
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