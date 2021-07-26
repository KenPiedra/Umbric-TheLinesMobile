/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import * as React from 'react';
import { createDrawerNavigator } from "@react-navigation/drawer";

import {
  HomeNavigator,
  NewsNavigator,
  OddsNavigator,
  SportsbooksNavigator,
  PodcastNavigator,
} from './BottomTabNavigator';

import CustomDrawerContent from './CustomDrawerContent';


const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="DrawerHome" component={HomeNavigator} />
      <Drawer.Screen name="DrawerNews" component={NewsNavigator} />
      <Drawer.Screen name="DrawerOdds" component={OddsNavigator} />
      <Drawer.Screen name="DrawerSportsbooks" component={SportsbooksNavigator} />
      <Drawer.Screen name="DrawerPodcast" component={PodcastNavigator} />
    </Drawer.Navigator>
  )
}
