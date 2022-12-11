import React from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, Alert } from 'react-native';

const onButtonClick = (buttonName) => {
  let text = buttonName +' pressed';
  Alert.alert(text);
}

export default function GeneralButton(props) {
  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={() => onButtonClick(props.text)}>
        <Text style={styles.buttonText}>{props.text}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button:{
    width: 150,
    height: 150,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  tinyLogo: {
    width:'100%',
    height:'100%',
  },
});
