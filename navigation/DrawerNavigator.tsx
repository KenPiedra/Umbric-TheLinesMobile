/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";

import BottomTabNavigator from "./BottomTabNavigator";
import CustomDrawerContent from "./CustomDrawerContent";
import PodcastPlayScreen from "../screens/PodcastPlayScreen";
import HowToBetScreen from "../screens/HowToBetScreen";
import StateBettingGuideScreen from "../screens/StateBettingGuideScreen";
import { HowToBetStackParmList, StateBetGuideParmList } from "../types";
import HamburgerIcon from "../components/HamburgerIcon";

const Drawer = createDrawerNavigator();
const StackHowToBet = createStackNavigator<HowToBetStackParmList>();
const StackStateBet = createStackNavigator<StateBetGuideParmList>();

const HowToBetNavigator = () => {
  return (
    <StackHowToBet.Navigator>
      <StackHowToBet.Screen
        name="HowToBet"
        component={HowToBetScreen}
        options={{
          title: "How to bet",
          headerLeft: (props) => <HamburgerIcon {...props} />,
        }}
      />
    </StackHowToBet.Navigator>
  );
};

const StateBetGuideNavigator = () => {
  return (
    <StackStateBet.Navigator>
      <StackStateBet.Screen
        name="StateBetGuide"
        component={StateBettingGuideScreen}
        options={{
          title: "NJ Sports Betting",
          headerLeft: (props) => <HamburgerIcon {...props} />,
        }}
      />
    </StackStateBet.Navigator>
  );
};

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={BottomTabNavigator} />
      <Drawer.Screen name="PodcastPlay" component={PodcastPlayScreen} />
      <Drawer.Screen name="HowToBetStack" component={HowToBetNavigator} />
      <Drawer.Screen
        name="StateBettingGuide"
        component={StateBetGuideNavigator}
      />
    </Drawer.Navigator>
  );
}
