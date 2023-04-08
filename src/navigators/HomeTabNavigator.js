import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Ionicons';

import Service from '../pages/Equipment/Services';
import Operations from '../pages/Equipment/Operations';

const Tab = createBottomTabNavigator();

const HomeTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {backgroundColor: '#fff'},
        activeTintColor: '#F27062',
      }}>
      <Tab.Screen
        name="Service"
        component={Service}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="ios-build-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Operation"
        component={Operations}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="ios-cog-outline" color={color} size={size + 4} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabNavigator;
