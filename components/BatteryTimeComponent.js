import React, {useState, useEffect, Fragment} from 'react';
import * as Battery from 'expo-battery';
import { StyleSheet, Text, View, Image } from 'react-native';
import moment from 'moment/moment';
import 'moment/locale/el';

const BatteryComponent = () => {
  const [battery, setBattery] = useState(100);
  const [batteryState, setBatteryState] = useState(1);
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [month, setMonth] = useState('');
  
  const getBatteryLevel = async () => {
    const stateBattery = await Battery.getBatteryStateAsync();
    setBatteryState(stateBattery);
    let battery = await Battery.getBatteryLevelAsync();
    battery *=  100;
    battery = Math.round(battery,2);
    setBattery(battery);
  }

  const getTime = () => {
    setTime(moment().utcOffset('+02:00').format('H:mm:ss'));
  }
  
  useEffect(() => {
    getBatteryLevel();
    getTime();
    moment.locale('el');
    const batteryInterval = setInterval(getBatteryLevel,1000);
    const timeInterval = setInterval(getTime,1000);
    setDate(moment().utcOffset('+02:00').format('dddd D'));
    setMonth(moment().utcOffset('+02:00').format('MMMM YYYY'));
    return () => {
      clearInterval(batteryInterval);
      clearInterval(timeInterval);
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.date}>
        <Text style={styles.text}>
          {date}
        </Text>
        <Text style={styles.text}>
          {month}
        </Text>
      </View>
      <View style={styles.timeAndBatteryContainer}>
        <View style={styles.time}>
          <Text style={styles.timeText}>
            {time}
          </Text>
        </View>
        <View style={styles.battery}>
          {(batteryState === 1 || battery > 95) ? 
          <Fragment>
            <Image source={require('../assets/battery.png')} style={styles.image}/>
            <Text style={{...styles.batteryPercentageText, color: batteryState === 2 ? 'green' : 'white'}} accessibilityLabel={`Η μπαταρία ειναι στο ${battery} τοίς εκατό`}>
              {battery}%
            </Text>
          </Fragment>
          : 
          <Image source={require('../assets/batteryCharging.png')} style={styles.image} accessibilityLabel={`Η μπαταρία είναι σε κατάσταση φόρτισης και έχει φτάσει στο ${battery} τοίς εκατό`}/>
          }
        </View>
      </View>
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  date: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
  },
  timeAndBatteryContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  time: {
    flex: 3,
    justifyContent: 'center',
    alignItems:'center'
  },
  battery:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: 'contain',
    position: 'absolute',
  },
  text:{
    fontSize: 35,
    fontFamily: 'OpenSans-Bold',
  },
  timeText:{
    fontSize: 50,
    fontFamily: 'OpenSans-Medium',
  },
  batteryPercentageText:{
    fontSize: 20,
    color: 'white',
    position: 'absolute',
    fontFamily: 'OpenSans-Bold',
  },
});

export default BatteryComponent;