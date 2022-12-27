import React, { useState, useCallback, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, StyleSheet, Text } from 'react-native';
import HomeView from './views/HomeView';
import ProfileView from './views/ProfileView';
import ContactsView from './views/Contacts/ContactsView';
import AddContactsView from './views/Contacts/AddContactsView';
import CameraView from './views/CameraView';
import ImpactDetector from './components/ImpactDetector';
import { Video, Audio } from 'expo-av';
import { useFonts } from 'expo-font';
import MyHeader from './components/MyHeader';

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

  const clearShowIntro = async ()=>{
    const sound = new Audio.Sound({
      shouldPlay: true,
      rate: 1.0,
      volume: 0.5,
      isLooping: false,
    });
    await sound.loadAsync(require('./assets/introSound.wav'));
    await sound.playAsync();
    setTimeout(()=>{  
      sound.pauseAsync();
      setShowIntro(false);
    },3000)
  }

  useEffect(()=>{
    clearShowIntro();
  },[])

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
          />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <NavigationContainer style={styles.container}>
        <Stack.Navigator 
          screenOptions={{
          header: MyHeader,
          headerMode: 'screen',
          }}
        >
          <Stack.Screen name="Home" component={HomeView} options={{title: 'Αρχική Οθόνη', headerShown: false}}/>
          <Stack.Screen name="Profile" component={ProfileView} options={{title: 'Προσωπικά Στοιχεία'}}/>
          <Stack.Screen name="Contacts" component={ContactsView} options={{title: 'Επαφές'}}/>
          <Stack.Screen name="Add Contacts" component={AddContactsView} options={{title: 'Προσθήκη επαφών'}}/>
          <Stack.Screen name="Camera" component={CameraView} options={{title: 'Φωτογραφική'}}/>
        </Stack.Navigator>
      </NavigationContainer>
      <ImpactDetector/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    borderStartColor: 'white'
  },
  video: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
