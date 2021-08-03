/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import * as React from 'react';
import { createDrawerNavigator } from "@react-navigation/drawer";

import BottomTabNavigator from './BottomTabNavigator';

import CustomDrawerContent from './CustomDrawerContent';
import PodcastPlayScreen from '../screens/PodcastPlayScreen';
import HowToBetScreen from '../screens/HowToBetScreen';


const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={BottomTabNavigator} />
      <Drawer.Screen name="PodcastPlay" component={PodcastPlayScreen} />
      <Drawer.Screen name="HowToBet" component={HowToBetScreen} />
    </Drawer.Navigator>
  )
}
