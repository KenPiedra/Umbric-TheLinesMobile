//import liraries
import React, { Component } from "react";
import { StyleSheet, ScrollView, SafeAreaView } from "react-native";

import { View, useThemeColor, Text } from "../../components/Themed";
import DrawerHeader from "./components/header";
import MenuItem from "./components/MenuItem";
import { MenuItemProps } from "./index";

type NBAScreenProps = {
  handleBack: () => void;
};
// create a component
const NBAScreen = (props: NBAScreenProps) => {
  const bgColor = useThemeColor({}, "background");
  const tintColor = useThemeColor({}, "inactive");
  const backendData: MenuItemProps[] = [
    { name: "Futures", hasNav: false },
    { name: "Power Rankings", hasNav: false },
    { name: "Game Previews", hasNav: false },
    { name: "Odds", hasNav: false },
    { name: "News", hasNav: false },
  ];
  const subBackendData = [
    { name: "NBA Finals", hasNav: false },
    { name: "MVP", hasNav: false },
    { name: "Rookie", hasNav: false },
  ];
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 16 }}>
        <DrawerHeader handleBack={props.handleBack} />
      </View>
      <ScrollView style={[styles.container, { backgroundColor: bgColor }]}>
        <Text style={[{ color: tintColor }, styles.title]}>NBA</Text>
        {backendData.map((item, index) => {
          return <MenuItem item={item} key={index} onClick={() => {}} />;
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    marginVertical: 32,
    fontSize: 12,
    fontWeight: "600",
  },
});

//make this component available to the app
export default NBAScreen;
