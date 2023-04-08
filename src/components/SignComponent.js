import React from 'react';
import {View, StyleSheet} from 'react-native';

const SignComponent = () => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f27062',
  },
});

export default SignComponent;
