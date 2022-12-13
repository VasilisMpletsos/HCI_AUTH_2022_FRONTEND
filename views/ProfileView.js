import { StyleSheet, Text, View } from 'react-native';
import GeneralButton from '../components/GeneralButton';


export default ProfileView = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>
        Welcome to Profile View
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
