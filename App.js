import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, StyleSheet } from 'react-native';
import HomeView from './views/HomeView';
import ProfileView from './views/ProfileView';
import ContactsView from './views/Contacts/ContactsView';
import AddContactsView from './views/Contacts/AddContactsView';
import CameraView from './views/CameraView';
import ImpactDetector from './components/ImpactDetector';
import { Video, AVPlaybackStatus } from 'expo-av';

const Stack = createNativeStackNavigator();

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const video = React.useRef(null);

  const clearShowIntro = ()=>{
    setTimeout(()=>{
      setShowIntro(false)
    },2700)
  }

  if(showIntro){
    return(
      <View style={styles.container}>
          <Video
            ref={video}
            style={styles.video}
            source={require('./assets/EasyUpIntro.mp4')}
            resizeMode="contain"
            shouldPlay
            isLooping={false}
            onReadyForDisplay={clearShowIntro}
          />
      </View>
    )
  }

  return (
    <View style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeView}/>
          <Stack.Screen name="Profile" component={ProfileView}/>
          <Stack.Screen name="Contacts" component={ContactsView}/>
          <Stack.Screen name="Add Contacts" component={AddContactsView}/>
          <Stack.Screen name="Camera" component={CameraView}/>
        </Stack.Navigator>
      </NavigationContainer>
      <ImpactDetector/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
