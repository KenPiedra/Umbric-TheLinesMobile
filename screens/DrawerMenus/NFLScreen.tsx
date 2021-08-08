//import liraries
import React, { Component } from "react";
import { StyleSheet, ScrollView, SafeAreaView } from "react-native";

import { View, useThemeColor, Text } from "../../components/Themed";
import DrawerHeader from "./components/header";
import MenuItem from "./components/MenuItem";
import SubMenuItem from "./components/SubMenuItem";

type NFLScreenProps = {
  handleBack: () => void;
};
// create a component
const NFLScreen = (props: NFLScreenProps) => {
  const bgColor = useThemeColor({}, "background");
  const tintColor = useThemeColor({}, "inactive");
  const backendData = [
    { name: "How Does NFL Betting Work", hasNav: false },
    { name: "Super Bowl Odds 2022", hasNav: false },
    { name: "Game Previews", hasNav: false },
    { name: "Futures", hasNav: true },
    { name: "Power Rankings", hasNav: false },
    { name: "NFL Player Props", hasNav: false },
    { name: "Odds", hasNav: false },
    { name: "News", hasNav: false },
  ];
  const subBackendData = [
    { name: "Super Bowl", hasNav: false },
    { name: "Win Total", hasNav: false },
    { name: "MVP", hasNav: false },
    { name: "Rookie", hasNav: false },
  ];
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 16 }}>
        <DrawerHeader handleBack={props.handleBack} />
      </View>
      <ScrollView style={[styles.container, { backgroundColor: bgColor }]}>
        <Text style={[{ color: tintColor }, styles.title]}>NFL</Text>
        {backendData.map((item, index) => {
          return (
            <MenuItem title={item.name} hasNav={item.hasNav} key={index} />
          );
        })}
        {/* {subBackendData.map((item, index) => {
          return (
            <SubMenuItem title={item.name} hasNav={item.hasNav} key={index} />
          );
        })}
        {backendData.slice(-2).map((item, index) => {
          return (
            <MenuItem title={item.name} hasNav={item.hasNav} key={index} />
          );
        })} */}
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
export default NFLScreen;
