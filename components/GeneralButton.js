import { StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function GeneralButton(props) {
  return (
    <TouchableOpacity disabled={props.disabled} style={{...styles.button, borderColor: props.disabled ? 'gray' : props.borderColor, opacity: props.disabled ? 0.3 : null}} onPress={props.onPress} accessibilityLabel={props.accessibilityLabel}>
      <Image source={props.imageUri} style={{ flex: 1, width:'100%' }}/>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button:{
    width: 120,
    height: 120,
    borderWidth: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 5,
  },
});
