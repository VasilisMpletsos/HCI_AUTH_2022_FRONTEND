import React, { useState, useEffect } from "react";
import { StyleSheet, View, Linking, Text } from 'react-native';
import GeneralButton from '../components/GeneralButton';
import BatteryTimeComponent from '../components/BatteryTimeComponent';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

const HomeView = ({navigation}) => {
  const [location, setLocation] = useState(null);
  const [locationPermissions, setLocationPermissions] = useState(false);
  const [galleryPermission, setGalleryPermission] = ImagePicker.useMediaLibraryPermissions();
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

  const getGalleryPermissions = () => {
    ImagePicker.getCameraPermissionsAsync().then(permission=>{
      setGalleryPermission(permission.status.granted);
    });
  }

  const pickImage = async () => {
    if(galleryPermission){
      ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 1,
      }).then(result=>{
        if (!result.canceled) {
          setImageUri(result.assets);
        }
      });
    }else{
      alert('Gallery permission is needed.');
    }
  };

  useEffect(() => {
    getLocationPermissions();
    getGalleryPermissions();
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
            accessibilityLabel="Προσωπικά Στοιχεία"
            accessibilityHint="Πάτα το κουμπί για να δέις τα προσωπικά σου στοιχεία"
            onPress={() =>
              navigation.navigate('Profile')
            }
          />
          <GeneralButton
            imageUri={require('../assets/call.png')}
            disabled={false}
            borderColor="#008037"
            accessibilityLabel="Επαφές"
            accessibilityHint="Πάτα το κουμπί για να δείς τις συντομέυσεις επαφών σου"
            onPress={() =>
              navigation.navigate('Contacts')
            }
          />
        </View>
        <View style={styles.row}>
          <GeneralButton
            imageUri={require('../assets/camera.png')}
            borderColor="#FF914D"
            accessibilityLabel="Φωτογραφική"
            accessibilityHint="Πάτα το κουμπί για να βγάλεις φωτογραφίες"
            disabled={false}
            onPress={() =>
              navigation.navigate('Camera')
            }
          />
            <GeneralButton
              imageUri={require('../assets/imageFolder.png')}
              disabled={!galleryPermission}
              accessibilityLabel="Άλμπουμ Φωτογραφιών" 
              accessibilityHint="Πάτα το κουμπί για να δείς τις φωτογραφίες σου"
              borderColor="#FE2020"
              onPress={pickImage}
            />
        </View>
        <View style={styles.row}>
          <GeneralButton
            imageUri={require('../assets/map.png')}
            disabled={!locationPermissions}
            accessibilityLabel="Εντόπισμός στον χάρτη"
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
    backgroundColor: 'white',
    paddingTop: 20,
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