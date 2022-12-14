import React from "react";
import { StyleSheet, View, Linking } from 'react-native';
import GeneralButton from '../components/GeneralButton';
import BatteryComponent from '../components/BatteryComponent';
import Time from '../components/Time';


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
    flexDirection: 'column'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'center',
    padding: 10,
  }
});

export default HomeView = ({navigation}) => {
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
            onPress={() =>
              navigation.navigate('Profile')
            }
          />
          <GeneralButton
            imageUri={require('../assets/contacts.png')}
            onPress={() =>
              navigation.navigate('Contacts')
            }
          />
        </View>
        <View style={styles.row}>
          <GeneralButton
            imageUri={require('../assets/map.png')}
            onPress={() => Linking.openURL('google.navigation:q=')}
          />
          <GeneralButton
            imageUri={require('../assets/camera.png')}
            onPress={() =>
              navigation.navigate('Camera')
            }
          />
        </View>
      </View>
    </View>
    );
}

