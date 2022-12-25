import React, { useState, useEffect } from "react";
import { StyleSheet, View, Linking, Text } from 'react-native';
import GeneralButton from '../components/GeneralButton';
import BatteryTimeComponent from '../components/BatteryTimeComponent';
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
      <View style={styles.batteryAndTimeContainer}>
        <BatteryTimeComponent/>
      </View>
      <View style={styles.buttonsContainer}> 
        <View style={styles.row}>
          <GeneralButton
            imageUri={require('../assets/profile.png')}
            disabled={false}
            borderColor="#D271FF"
            onPress={() =>
              navigation.navigate('Profile')
            }
          />
          <GeneralButton
            imageUri={require('../assets/contacts.png')}
            disabled={false}
            borderColor="#008037"
            onPress={() =>
              navigation.navigate('Contacts')
            }
          />
        </View>
        <View style={styles.row}>
          <GeneralButton
            imageUri={require('../assets/camera.png')}
            borderColor="#FF914D"
            disabled={false}
            onPress={() =>
              navigation.navigate('Camera')
            }
          />
            <GeneralButton
              imageUri={require('../assets/map.png')}
              disabled={!locationPermissions}
              borderColor="#004AAD"
              onPress={() => Linking.openURL(`geo:${location.coords.latitude},${location.coords.longitude}`)}
            />
        </View>
      </View>
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  batteryAndTimeContainer: {
    flex: 2,
    backgroundColor: '#EBF4B8',
    justifyContent: 'center',
    alignContent: 'center',
  },
  buttonsContainer:{
    flex: 4,
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