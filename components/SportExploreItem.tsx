//import liraries
import React, { Component } from "react";
import { StyleSheet, Image } from "react-native";

import { View, Text, useThemeColor } from "./Themed";

// create a component
const SportExploreItem = () => {
  const colorMain = useThemeColor({}, "text");
  return (
    <View style={[styles.container, { borderColor: colorMain }]}>
      <Image
        source={require("../assets/images/Art.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.text}>PGA Tour</Text>
    </View>
  );
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
