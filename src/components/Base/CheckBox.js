import React from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CheckBox = ({value, onValueChange}) => {
  const values = ['ios-stop', 'checkmark', 'close'];

  return (
    <TouchableOpacity onPress={onValueChange} style={styles.pressable}>
      <View style={styles.checkbox}>
        <Icon
          name={values[typeof value === 'undefined' ? 0 : value ? 1 : 2]}
          size={18}
          color={'#fff'}
          style={{
            borderRadius: 2,
            aspectRatio: 1,
            textAlign: 'center',
            backgroundColor:
              typeof value === 'undefined' ? '#fff' : 'transparent',
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ee4631',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#ee4631',
    margin: 6,
    overflow: 'hidden',
  },
  pressable: {
    borderRadius: 18,
    overflow: 'hidden',
    overflow: 'hidden',
  },
});

export default CheckBox;
