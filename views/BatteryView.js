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

const BatteryView = () => {

  const [battery, setBattery] = useState(0)

  Battery.addBatteryLevelListener(({ batteryLevel }) => {
    setBattery();
    console.log('batteryLevel changed!', batteryLevel);
  });

  const getBattery = async() => {
    let batteryLevel = await Battery.getBatteryLevelAsync();
    batteryLevel *= 100
    batteryLevel = Math.round(batteryLevel,2)
    setBattery(batteryLevel)
  }

  useEffect(()=>{
    setInterval(getBattery,5000)
  },[])

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

export default BatteryView;