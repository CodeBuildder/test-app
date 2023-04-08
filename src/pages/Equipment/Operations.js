import React from 'react';
import {View, StyleSheet} from 'react-native';
import EquipmentSearch from '../../components/EquipmentSearch';

const Operations = ({navigation}) => {
  return (
    <View style={[styles.container, styles.ht100]}>
      <EquipmentSearch
        onEquipmentPress={params => {
          navigation.navigate('Operation Checks', params);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  ht100: {height: '100%'},
  px8: {paddingHorizontal: 8},
  py8: {paddingVertical: 8},
});

export default Operations;
