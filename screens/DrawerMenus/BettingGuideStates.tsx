//import liraries
import React, { Component } from "react";
import { StyleSheet, ScrollView, SafeAreaView } from "react-native";

import { View, useThemeColor, Text } from "../../components/Themed";
import DrawerHeader from "./components/header";
import MenuItem from "./components/MenuItem";

type BettingGuideStatesProps = {
  handleBack: () => void;
};
// create a component
const BettingGuideStates = (props: BettingGuideStatesProps) => {
  const bgColor = useThemeColor({}, "background");
  const tintColor = useThemeColor({}, "inactive");
  const backendData = [
    { name: "DraftKings Sportsbook NJ", hasNav: false },
    { name: "BetMGM Sportsbook NJ", hasNav: false },
    { name: "FanDuel Sportsbook NJ", hasNav: false },
    { name: "SugarHouse Sportsbook NJ", hasNav: false },
    { name: "Unibet Sportsbook NJ", hasNav: false },
    { name: "PointsBet Sportsbook NJ", hasNav: false },
    { name: "WynnBet Sportsbook NJ", hasNav: false },
    { name: "888 Sports NJ", hasNav: false },
    { name: "Bet365", hasNav: false },
    { name: "Borgata Sports", hasNav: false },
    { name: "Resorts", hasNav: false },
    { name: "Golden Nugget Sportsbook NJ", hasNav: false },
    { name: "Caesars Sportsbook NJ", hasNav: false },
    { name: "Hard Rock", hasNav: false },
    { name: "TheScore Bet", hasNav: false },
    { name: "Tipico", hasNav: false },
    { name: "TwinSpires", hasNav: false },
  ];
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 16 }}>
        <DrawerHeader handleBack={props.handleBack} />
      </View>
      <ScrollView style={[styles.container, { backgroundColor: bgColor }]}>
        <Text style={[{ color: tintColor }, styles.title]}>
          US Sports Betting Guides
        </Text>
        {backendData.map((item, index) => {
          return (
            <MenuItem title={item.name} hasNav={item.hasNav} key={index} />
          );
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
export default BettingGuideStates;
