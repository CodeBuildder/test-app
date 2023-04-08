import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Button} from '../components/Base';

const BaseComponents = () => {
  return (
    <View style={styles.container}>
      <Button onPress={() => console.log('pressed')}>Hello World!</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BaseComponents;
