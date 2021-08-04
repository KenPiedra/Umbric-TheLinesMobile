//import liraries
import React, { Component } from "react";
import { StyleSheet, Image, View as DefaultView } from "react-native";
import { View, Text, useThemeColor } from "./Themed";

// create a component
const EventExploreItem = () => {
  return (
    <DefaultView style={styles.container}>
      <Image
        style={styles.image}
        source={require("../assets/images/Art.png")}
      />
      <Text style={styles.text}>NBA</Text>
    </DefaultView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    marginRight: 16,
  },
  image: {
    width: 112,
    height: 112,
    resizeMode: "contain",
    borderRadius: 8,
  },
  text: {
    fontSize: 14,
    fontWeight: "400",
    marginTop: 7,
  },
});

//make this component available to the app
export default EventExploreItem;