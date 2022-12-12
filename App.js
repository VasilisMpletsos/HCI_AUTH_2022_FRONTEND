import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeView from './views/HomeView';
import ProfileView from './views/ProfileView';
import ContactsView from './views/ContactsView';
import GeneralButton from './components/GeneralButton';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeView}/>
        <Stack.Screen name="Profile" component={ProfileView}/>
        <Stack.Screen name="Contacts" component={ContactsView}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
