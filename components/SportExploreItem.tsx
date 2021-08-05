//import liraries
import React, { Component } from "react";
import { StyleSheet, Image } from "react-native";
import { League } from "../types";

import { View, Text, useThemeColor } from "./Themed";
type SportExploreItemProps = {
  item: League;
};
// create a component
const SportExploreItem = (props: SportExploreItemProps) => {
  const { item } = props;
  const colorMain = useThemeColor({}, "text");
  if (item) {
    return (
      <View style={[styles.container, { borderColor: colorMain }]}>
        <Image source={item.Image} style={styles.image} resizeMode="contain" />
        <Text style={styles.text}>{item.Name}</Text>
      </View>
    );
  } else return null;
};

// define your styles
const styles = StyleSheet.create({
  container: {
    height: 48,
    flexDirection: "row",
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    alignItems: "center",
  },
  image: {
    width: 46,
    height: 46,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
  },
  text: {
    fontSize: 14,
    marginLeft: 8,
  },
});

//make this component available to the app
export default SportExploreItem;
