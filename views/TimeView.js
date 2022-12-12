import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import moment from 'moment/moment';

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

const TimeView = () => {

  const [time, setTime] = useState('')

  const getTime = () => {
    setTime(moment().utcOffset('+02:00').format('hh:mm:ss a'))
  }

  useEffect(()=>{
    setInterval(getTime,1000)
  },[])

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>
          Time
        </Text>
      </View>
      <View>
        <Text style={styles.highlight}>
          {time}
        </Text>
      </View>
    </View>
    );
}

export default TimeView;