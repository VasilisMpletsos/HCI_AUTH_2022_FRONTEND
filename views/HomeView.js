import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import GeneralButton from '../components/GeneralButton';
import BatteryView from './BatteryView';
import TimeView from './TimeView';

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
        <BatteryView/>
      </View>
      <View style={{flex:1}}>
        <TimeView/>
      </View>
      <View style={styles.buttons}> 
        <View style={styles.row}>
          <GeneralButton
            text="ΠΡΟΦΙΛ"
            onPress={() =>
              navigation.navigate('Profile')
            }
          />
          <GeneralButton
            text="ΕΠΑΦΕΣ"
            onPress={() =>
              navigation.navigate('Contacts')
            }
          />
        </View>
        <View style={styles.row}>
          <GeneralButton
            text="ΧΑΡΤΕΣ"
          />
          <GeneralButton
            text="ΚΑΜΕΡΑ"
          />
        </View>
      </View>
    </View>
    );
}

