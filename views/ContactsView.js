import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';


export default ContactsView = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>
        Welcome to TestScreen
      </Text>
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
