import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';
import HomeView from './views/HomeView';
import ProfileView from './views/ProfileView';
import ContactsView from './views/ContactsView';
import CameraView from './views/CameraView';
import ImpactDetector from './components/ImpactDetector';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeView}/>
          <Stack.Screen name="Profile" component={ProfileView}/>
          <Stack.Screen name="Contacts" component={ContactsView}/>
          <Stack.Screen name="Camera" component={CameraView}/>
        </Stack.Navigator>
      </NavigationContainer>
      <ImpactDetector/>
    </View>
  );
};
