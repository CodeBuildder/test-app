import React from 'react';
import {View, StyleSheet} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';

export default function Calendar({setDay}) {
  const onDateChange = date => {
    setDay(date);
  };

  return (
    <View>
      <View style={styles.card}>
        <CalendarPicker
          headerWrapperStyle={{height: 0, padding: 0, margin: 0}}
          onDateChange={onDateChange}
          todayBackgroundColor="#f27060"
          startFromMonday={true}
          customDayHeaderStyles={() => ({textStyle: {fontWeight: 'bold'}})}
          dayLabelsWrapper={{borderTopWidth: 0, borderBottomWidth: 0}}
          todayTextStyle={{color: '#F27062'}}
          todayBackgroundColor="#fff"
          selectedDayColor={'#F27062'}
          selectedDayTextColor="#fff"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 6,
    elevation: 6,
    paddingBottom: 8,
    marginHorizontal: 18,
    marginTop: 16,
  },
});
