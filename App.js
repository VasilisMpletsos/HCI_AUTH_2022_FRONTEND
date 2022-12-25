import React, { useState, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, StyleSheet, Text } from 'react-native';
import HomeView from './views/HomeView';
import ProfileView from './views/ProfileView';
import ContactsView from './views/Contacts/ContactsView';
import AddContactsView from './views/Contacts/AddContactsView';
import CameraView from './views/CameraView';
import ImpactDetector from './components/ImpactDetector';
import { Video } from 'expo-av';
import { useFonts } from 'expo-font';

const Stack = createNativeStackNavigator();

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  /* 
    Note that his takes some time, for now i am not handling anything regarding the time it takes to load,
    because i have the video and the whole process of load and play takes 6 seconds which is enough time
  */ 
  const [fontsLoaded] = useFonts(
    {
    'OpenSans-Medium': require('./assets/fonts/OpenSans-Medium.ttf'),
    'OpenSans-Bold': require('./assets/fonts/OpenSans-Bold.ttf')
    }
  );
  const video = React.useRef(null);

  const clearShowIntro = ()=>{
    setTimeout(()=>{
      setShowIntro(false);
    },3000)
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
            onPlaybackStatusUpdate={clearShowIntro}
          />
      </View>
    )
  }

  return (
    <View style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeView} options={{title: 'ΑΡΧΙΚΗ ΟΘΟΝΗ'}}/>
          <Stack.Screen name="Profile" component={ProfileView} options={{title: 'ΠΡΟΣΩΠΙΚΑ ΣΤΟΙΧΕΙΑ'}}/>
          <Stack.Screen name="Contacts" component={ContactsView} options={{title: 'ΕΠΑΦΕΣ'}}/>
          <Stack.Screen name="Add Contacts" component={AddContactsView} options={{title: 'ΠΡΟΣΘΗΚΗ ΕΠΑΦΩΝ'}}/>
          <Stack.Screen name="Camera" component={CameraView} options={{title: 'ΦΩΤΟΓΡΑΦΙΚΗ'}}/>
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
