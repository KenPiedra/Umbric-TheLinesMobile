//import liraries
import React, { Component } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { View, useThemeColor, Text } from "../../../components/Themed";
// create a component
type MenuItemProps = {
  hasNav: boolean;
  title: string;
};
const MenuItem = (props: MenuItemProps) => {
  const tintColor = useThemeColor({}, "inactive");
  return (
    <TouchableOpacity
      style={[styles.container, { borderBottomColor: tintColor }]}
    >
      <Text>{props.title}</Text>
      {props.hasNav && (
        <Ionicons color={tintColor} size={24} name="chevron-forward" />
      )}
    </TouchableOpacity>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    height: 50,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

//make this component available to the app
export default MenuItem;
