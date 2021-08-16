/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";

import BottomTabNavigator from "./BottomTabNavigator";
import HowToBetScreen from "../screens/HowToBetScreen";
import StateBettingGuideScreen from "../screens/StateBettingGuideScreen";
import CustomDrawerContent from "../screens/DrawerMenus";
import FutureScreen from "../screens/FutureScreen";
import {
  HowToBetStackParmList,
  StateBetGuideParmList,
  FutureStackParamList,
} from "../types";
import HamburgerIcon from "../components/HamburgerIcon";
import BackIcon from "../components/BackIcon";

const Drawer = createDrawerNavigator();
const StackHowToBet = createStackNavigator<HowToBetStackParmList>();
const StackStateBet = createStackNavigator<StateBetGuideParmList>();
const StackFuture = createStackNavigator<FutureStackParamList>();
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
          title: "US Sports Betting",
          headerLeft: (props) => <HamburgerIcon {...props} />,
        }}
      />
    </StackStateBet.Navigator>
  );
};
const FutureNavigator = () => {
  return (
    <StackFuture.Navigator>
      <StackFuture.Screen
        name="Future"
        component={FutureScreen}
        options={{
          title: "Future",
          headerLeft: (props) => <HamburgerIcon {...props} />,
        }}
      />
    </StackFuture.Navigator>
  );
};

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={() => {
        return <CustomDrawerContent />;
      }}
    >
      <Drawer.Screen name="Home" component={BottomTabNavigator} />
      <Drawer.Screen name="HowToBetStack" component={HowToBetNavigator} />
      <Drawer.Screen
        name="StateBettingGuide"
        component={StateBetGuideNavigator}
      />
      <Drawer.Screen name="FutureStack" component={FutureNavigator} />
    </Drawer.Navigator>
  );
}
