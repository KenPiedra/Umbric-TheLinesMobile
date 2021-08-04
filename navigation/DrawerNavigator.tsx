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
import { HowToBetStackParmList } from "../types";
import HamburgerIcon from "../components/HamburgerIcon";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator<HowToBetStackParmList>();
const HowToBetNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HowToBet"
        component={HowToBetScreen}
        options={{
          title: "How to bet",
          headerLeft: (props) => <HamburgerIcon {...props} />,
        }}
      />
    </Stack.Navigator>
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
    </Drawer.Navigator>
  );
}
