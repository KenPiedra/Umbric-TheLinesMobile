//import liraries
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { View, useThemeColor, Text } from "../../../components/Themed";
// create a component
type MenuItemProps = {
  hasNav: boolean;
  title: string;
};
const MenuItem = (props: MenuItemProps) => {
  const tintColor = useThemeColor({}, "inactive");
  return (
    <View style={[styles.container, { borderBottomColor: tintColor }]}>
      <Text>{props.title}</Text>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
});

//make this component available to the app
export default MenuItem;
