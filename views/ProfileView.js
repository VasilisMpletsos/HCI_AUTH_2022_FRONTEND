import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import GeneralButton from '../components/GeneralButton';


export default ProfileView = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>
        Hello i am Jane
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
