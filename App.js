import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import GeneralButton from './components/GeneralButton'

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>Elda App</Text>
      </View>
      <View style={styles.buttonList}>
        <View style={styles.buttonRow}>
          <View style={styles.box}>
            <GeneralButton text="ΕΠΑΦΕΣ"/>
          </View>
          <View style={styles.box}>
            <GeneralButton text="ΧΑΡΤΗΣ"/>
          </View>
        </View>
        <View style={styles.buttonRow}>
          <View>
            <GeneralButton text="ΚΑΜΕΡΑ"/>
          </View>
          <View>
            <GeneralButton text="ΕΙΚΟΝΕΣ"/>
          </View>
        </View>
        <View style={styles.buttonRow}>
          <View>
            <GeneralButton text="ΠΛΗΡΟΦΟΡΙΕΣ"/>
          </View>
          <View>
            <GeneralButton text="ΡΥΘΜΙΣΕΙΣ"/>
          </View>
        </View>
        <StatusBar style="auto" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  title: {
    width: '100%',
    height: '10%',
    paddingBottom: 10,
    backgroundColor: '#4444ff',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  titleText:{
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white'
  },
  buttonList: {
    width: '100%',
    height: '80%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonRow: {
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  box: {
    padding: 5
  }
});
