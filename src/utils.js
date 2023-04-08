import AsyncStorage from '@react-native-async-storage/async-storage';
import {data as schedule} from './data/schedule.json';
import {data as equipment} from './data/equipment.json';

export const getSchedule = (day, month) => schedule[`${day}`][`${month}`];

export const mapSchedule = ({ws, ms, qs, ys}) => ({
  ws: equipment
    ?.filter(item => ws.indexOf(item.sno) >= 0)
    ?.map(item => ({...item, checked: false})),
  ms: equipment
    ?.filter(item => ms.indexOf(item.sno) >= 0)
    ?.map(item => ({...item, checked: false})),
  qs: equipment
    ?.filter(item => qs.indexOf(item.sno) >= 0)
    ?.map(item => ({...item, checked: false})),
  ys: equipment
    ?.filter(item => ys.indexOf(item.sno) >= 0)
    ?.map(item => ({...item, checked: false})),
});

export const getValue = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : value;
  } catch (e) {
    console.log(e);
  }
};

export const setValue = async (key, value) => {
  try {
    if (typeof value === 'object') value = JSON.stringify(value);
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }
};

export const removeValue = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log(e);
  }
};
