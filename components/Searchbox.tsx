//import liraries
import React, { Component } from "react";
import { TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { View, Text, useThemeColor } from "./Themed";

// create a component
type SearchBoxPropsType = {
  placeholder: string;
};
const SearchBox = (props: SearchBoxPropsType) => {
  const colorText = useThemeColor({}, "text");
  return (
    <View>
      <Ionicons
        size={30}
        name="search"
        color={colorText}
        style={styles.searchIcon}
      />
      <TextInput
        style={[styles.inputText, { color: colorText }]}
        placeholder={props.placeholder}
        placeholderTextColor={colorText}
      />
      <TouchableOpacity style={styles.closeIcon}>
        <Ionicons name="close" size={30} color={colorText} />
      </TouchableOpacity>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  inputText: {
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#fff",
    fontSize: 16,
    paddingHorizontal: 40,
  },
  searchIcon: {
    position: "absolute",
    top: 8,
    left: 8,
  },
  closeIcon: {
    position: "absolute",
    top: 8,
    right: 8,
  },
});

//make this component available to the app
export default SearchBox;
