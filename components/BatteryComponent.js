import React, {useState, useEffect} from 'react';
import * as Battery from 'expo-battery';
import { StyleSheet, Text, View, Image, Button } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: '400'
  },
  highlight:{
    fontSize: 40,
    fontWeight: '600'
  }
});

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
     <View>
        <Text style={styles.text}>
          Battery Percentage
        </Text>
      </View>
      <View>
        <Text style={styles.highlight}>
          {battery}%
        </Text>
      </View>
    </View>
    );
}

export default BatteryComponent;