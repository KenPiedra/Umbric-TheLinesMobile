/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import * as React from "react";
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentOptions,
} from "@react-navigation/drawer";
import BottomTabNavigator from "./BottomTabNavigator";

import DrawerMenus from "../screens/DrawerMenus";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={() => {
        return <DrawerMenus />;
      }}
    >
      <Drawer.Screen name="BottomNav" component={BottomTabNavigator} />
    </Drawer.Navigator>
  );
}
