import React, { useState, useEffect } from "react";
import { StyleSheet, View, Linking, Text } from 'react-native';
import GeneralButton from '../components/GeneralButton';
import BatteryComponent from '../components/BatteryComponent';
import Time from '../components/Time';
import * as Location from 'expo-location';

const HomeView = ({navigation}) => {
  const [location, setLocation] = useState(null);
  const [locationPermissions, setLocationPermissions] = useState(false);
  let locationInterval;

  const getLocation = async() => {
    Location.getCurrentPositionAsync({}).then(location=>{
      setLocation(location);  
    });
  }

  const getLocationPermissions = async () => {
   Location.requestForegroundPermissionsAsync().then(async ({status})=>{
    if (status !== 'granted') {
      setLocationPermissions(false);
      return;
    }
    setLocationPermissions(true);
    getLocation();
    // Update Coordinates once per minute
    locationInterval = setInterval(getLocation, 60000);
   });
  };

  useEffect(() => {
    getLocationPermissions();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{flex:1}}>
        <BatteryComponent/>
      </View>
      <View style={{flex:1}}>
        <Time/>
      </View>
      <View style={styles.buttons}> 
        <View style={styles.row}>
          <GeneralButton
            imageUri={require('../assets/profile.png')}
            disabled={false}
            onPress={() =>
              navigation.navigate('Profile')
            }
          />
          <GeneralButton
            imageUri={require('../assets/contacts.png')}
            disabled={false}
            onPress={() =>
              navigation.navigate('Contacts')
            }
          />
        </View>
        <View style={styles.row}>
          <GeneralButton
            imageUri={require('../assets/map.png')}
            disabled={!locationPermissions}
            onPress={() => Linking.openURL(`geo:${location.coords.latitude},${location.coords.longitude}`)}
          />
          <GeneralButton
            imageUri={require('../assets/camera.png')}
            disabled={false}
            onPress={() =>
              navigation.navigate('Camera')
            }
          />
        </View>
      </View>
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignContent: 'center',
  },
  buttons:{
    flex: 3,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'center',
    padding: 10,
  }
});

export default HomeView;