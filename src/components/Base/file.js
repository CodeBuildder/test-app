//this is react-natve-calenders

import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Calendar} from 'react-native-calendars';

export default function Calender() {
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    console.log(date);
  }, [date]);

  const day = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thrusday',
    'Friday',
    'Sataurday',
  ];

  // function setMarkedDates(key){
  //   let markedDates = {};
  //   if (typeof this.state.markedDates[key] !== 'undefined') {
  //     markedDates = {[key]: {selected: !this.state.markedDates[key].selected}};
  //   } else {
  //     markedDates = {[key]: {selected: true}};
  //   }

  //   this.setState((prevState) => {
  //     return {...prevState, markedDates};
  //   })
  // }

  return (
    <View style={styles.container}>
      <Calendar
        style={{height: '100%', paddingTop: 30}}
        theme={
          {
            //selectedDayBackgroundColor: '#f27060',
          }
        }
        onDayPress={day => {
          setDate(new Date(day.dateString));
        }}
        //markedDates={{[this.state.selected_date]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange'} }}
        markedDates={{
          [moment().format('YYYY-MM-DD')]: {
            selected: true,
            selectedColor: 'orange',
          },
          // [this.state.selected_date]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
        }}
        // onMonthChange={(month) => {
        //   console.log("month changed", month);
        // }}
        // markedDates={{
        //   "2021-07-23": { selected: true, selectedColor: "blue" },
        // }}
        renderHeader={date => {
          return (
            <Text style={{color: '#000000'}}>
              {day[date.getDay()]}
              {', '}
              {date.getMonth() + 1} {date.getFullYear()}
            </Text>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
