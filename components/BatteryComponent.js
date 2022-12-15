import React, {useState, useEffect} from 'react';
import * as Battery from 'expo-battery';
import { StyleSheet, Text, View, Image } from 'react-native';

const BatteryComponent = () => {

  const [battery, setBattery] = useState(100)
  
  const getBatteryLevel = async () => {
    let battery = await Battery.getBatteryLevelAsync();
    battery *=  100;
    battery = Math.round(battery,2)
    setBattery(battery)
  }

  const subscribe = () => {
    getBatteryLevel();
  };

  const batteryInterval = setInterval(getBatteryLevel,1000);

  useEffect(() => {
    subscribe();
    return () => clearInterval(batteryInterval);
  }, []);

  return (
    <View style={styles.container}>
     <View style={styles.imageContainer}>
        <Image source={require('../assets/battery.png')} style={styles.image}/>
      </View>
      <View>
        <Text style={styles.highlight}>
          {battery}%
        </Text>
      </View>
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer:{
    flex: 1,
    width: '80%',
  },
  image:{
    width: '100%',
    flex: 1,
  },
  highlight:{
    fontSize: 40,
    fontWeight: '600'
  }
});

export default BatteryComponent;