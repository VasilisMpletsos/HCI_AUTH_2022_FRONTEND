import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { getHeaderTitle } from '@react-navigation/elements';

const MyHeader = ({navigation, route, options, back }) => {

  const title = getHeaderTitle(options, route.name);

  return (
    <View style={styles.header}>
      {route.name !== "Home" ? 
      <TouchableOpacity
        onPress={navigation.goBack}
        accessibilityLabel="Πίσω"
        style={styles.button}
        accessibilityHint="Πάτα το κουμπί για να γυρίσεις στην προηγούμενη οθόνη">
        <View style={styles.buttonContainer}>
          <Image source={require('../assets/back2.png')} style={styles.image}/>
          <Text style={styles.buttonText}>Πίσω</Text>
        </View>
      </TouchableOpacity>:null
      }
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header:{
    width: '100%',
    height: 50,
    flexDirection: 'row',
    borderBottomWidth: 1,
    backgroundColor: '#EBF4B8',
    paddingBottom: 10,
  },
  title: {
    fontSize: 22,
    fontFamily: 'OpenSans-Bold',
    color: 'black',
  },
  titleContainer: {
    flex: 3,
    paddingLeft: 10,
    justifyContent: 'flex-end',
  }, 
  button:{
    flex: 1,
    paddingLeft: 10,
    justifyContent: 'flex-end',
  },
  buttonContainer:{
    height: 30,
    borderRadius: 12,
    borderWidth: 1,
    backgroundColor: '#C8DFF4',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText:{
    flex: 2,
    fontSize: 18,
    fontFamily: 'OpenSans-Bold',
  },
  image: {
    flex: 1,
    width: 20,
    height: 20,
  }
});

export default MyHeader;
