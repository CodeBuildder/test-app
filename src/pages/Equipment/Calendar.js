import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Calendar as Calender} from '../../components/Base';

const Calendar = () => {
  return (
    <View style={styles.container}>
      <Calender />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    height: '100%',
  },
});

export default Calendar;
