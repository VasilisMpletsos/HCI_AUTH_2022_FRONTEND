import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';


export default CameraView = () => {
  const [camera, setCamera] = useState({});
  const [imageUri, setImageUri] = useState('');
  const [type, setType] = useState(CameraType.back);
  const [flash, setFlash] = useState(FlashMode.off);
  const [cameraPermission, setCameraPermission] = Camera.useCameraPermissions();

  const permisionFunction = async () => {
    const permission = await Camera.getCameraPermissionsAsync();
    setCameraPermission(permission.status.granted);
  };

  useEffect(() => {
    permisionFunction();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets);
    }
  };

  const takePicture = async () => {
    if (camera && cameraPermission) {
      const data = await camera.takePictureAsync(null);
      setImageUri(data.uri);
    }else{
      alert('Permission for camera is needed.');
    }
  };

  function toggleCamera() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  function toggleFlashlight() {
    setFlash(flash => (flash === FlashMode.torch ? FlashMode.off : FlashMode.torch));
  }

  return (
    <View style={styles.container}>
      {imageUri ? 
        <View style={styles.container}>
          <Image source={{ uri: imageUri }} style={{ flex: 1 }} />
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.button} onPress={pickImage}>
              <Image source={require('../assets/imageFolder.png')} style={{ flex: 1, width:'100%' }}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={()=>setImageUri('')}>
              <Image source={require('../assets/back.png')} style={{ flex: 1, width:'100%' }}/>
            </TouchableOpacity>
          </View>
        </View>
        :
        <View style={{ flex: 1 }}>
          <Camera
            ref={(ref) => setCamera(ref)}
            style={styles.fixedRatio}
            flashMode={flash}
            type={type}
            ratio='16:9'
          />
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.button} onPress={toggleFlashlight}>
              <Image source={require('../assets/flashlight.png')} style={{ flex: 1, width:'100%' }}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={takePicture}>
              <Image source={require('../assets/camera.png')} style={{ flex: 1, width:'100%' }}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={toggleCamera}>
              <Image source={require('../assets/switch.png')} style={{ flex: 1, width:'100%' }}/>
            </TouchableOpacity>
          </View>
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  fixedRatio: {
    flex: 1,
  },
  buttons:{
    position: 'absolute',
    bottom: 0,
    height: 100,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  button: {
    width: 70,
    height: 70,
    borderRadius: 20,
    padding: 10,
    backgroundColor: 'white',
  }
});
