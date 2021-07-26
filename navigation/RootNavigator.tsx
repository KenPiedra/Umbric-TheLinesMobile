/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import BottomTabNavigator from './BottomTabNavigator'
import DrawerNavigator from './DrawerNavigator'
import PodcastPlayScreen from '../screens/PodcastPlayScreen';


const RootStack = createStackNavigator();

export default function RootStackNavigator() {
  return (
    <RootStack.Navigator>
      <RootStack.Screen name="HomeScreen" component={BottomTabNavigator} />
      <RootStack.Screen name="PodcastPlayScreen" component={PodcastPlayScreen} />
      <RootStack.Screen name="Drawer" component={DrawerNavigator} />
    </RootStack.Navigator>
  )
}
