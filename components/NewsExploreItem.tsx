//import liraries
import React, { Component } from "react";
import { StyleSheet, Image, View as DefaultView } from "react-native";
import { NewsItemData } from "../types/News";
import { View, Text, useThemeColor } from "./Themed";

type NewExploreItemProps = {
  item: NewsItemData;
};
// create a component
const NewsExploreItem = (props: NewExploreItemProps) => {
  const { item } = props;
  return (
    <DefaultView style={styles.container}>
      <Image style={styles.image} source={{ uri: item.Thumb }} />
      <Text style={styles.text}>{item.Author}</Text>
    </DefaultView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    marginRight: 16,
  },
  image: {
    width: 152,
    height: 152,
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
export default NewsExploreItem;
