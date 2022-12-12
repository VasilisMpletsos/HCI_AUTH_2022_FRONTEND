import React from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, Alert } from 'react-native';

export default function GeneralButton(props) {
  return (
    <TouchableOpacity style={styles.button} onPress={props.onPress}>
      <Text style={styles.buttonText}>{props.text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button:{
    width: 120,
    height: 120,
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
