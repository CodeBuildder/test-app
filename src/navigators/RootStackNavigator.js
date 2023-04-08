import React from 'react';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Checklist from '../pages/Equipment/Checklist';
import Form from '../pages/Equipment/Form';
import UserProfile from '../components/UserProfile';
import HomeTabNavigator from './HomeTabNavigator';
import GenerateReport from '../pages/GenerateReport';
import OperationChecks from '../pages/Equipment/OperationChecks';

const Stack = createStackNavigator();

const getHomeHeaderTitle = route => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';

  const routes = {
    Home: 'Home',
    Service: 'Service',
    Reports: 'Reports',
    Operation: 'Operation',
  };

  return routes[routeName];
};

const RootStackNavigators = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#F27062'},
        headerTintColor: '#fff',
        headerTitleStyle: {fontWeight: 'normal'},
        cardStyle: {backgroundColor: '#f9f9f9'},
      }}>
      <Stack.Screen
        name="Home"
        component={HomeTabNavigator}
        options={({route}) => ({
          headerRight: () => <UserProfile />,
          headerTitle: getHomeHeaderTitle(route),
        })}
      />
      <Stack.Screen
        name="Checklist"
        component={Checklist}
        options={({route}) => ({
          title: `${route.params.header.split(' ')[0]} Checks`,
        })}
      />
      <Stack.Screen name="Generate Report" component={GenerateReport} />
      <Stack.Screen name="Operation Checks" component={OperationChecks} />
      <Stack.Screen name="Form" component={Form} />
    </Stack.Navigator>
  );
};

export default RootStackNavigators;
