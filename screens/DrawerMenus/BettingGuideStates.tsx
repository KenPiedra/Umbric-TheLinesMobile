//import liraries
import React, { Component } from "react";
import { StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";

import { View, useThemeColor, Text } from "../../components/Themed";
import DrawerHeader from "./components/header";
import MenuItem from "./components/MenuItem";
import { DrawerStackParmList } from "../../types/Navigation";

type BettingGuideStatesProps = {
  handleBack: () => void;
};
// create a component
const BettingGuideStates = (props: BettingGuideStatesProps) => {
  const bgColor = useThemeColor({}, "background");
  const tintColor = useThemeColor({}, "inactive");
  const navigation = useNavigation<DrawerNavigationProp<DrawerStackParmList>>();
  const backendData = [
    {
      name: "NJ Sports Betting",
      hasNav: false,
      link: "https://www.thelines.com/nj/",
    },
    {
      name: "PA Sports Betting",
      hasNav: false,
      link: "https://www.thelines.com/pa/",
    },
    {
      name: "Colorado Sports Betting",
      hasNav: false,
      link: "https://www.thelines.com/colorado/",
    },
    {
      name: "WV Sports Betting",
      hasNav: false,
      link: "https://www.thelines.com/wv/",
    },
    {
      name: "Indiana Sports Betting",
      hasNav: false,
      link: "https://www.thelines.com/indiana/",
    },
    {
      name: "Tennessee Sports Betting",
      hasNav: false,
      link: "https://www.thelines.com/tn/",
    },
    {
      name: "Michigan Sports Betting",
      hasNav: false,
      link: "https://www.thelines.com/michigan/",
    },
    {
      name: "Illinois Sports Betting",
      hasNav: false,
      link: "https://www.thelines.com/illinois/",
    },
    {
      name: "Virginia Sports Betting",
      hasNav: false,
      link: "https://www.thelines.com/virginia/",
    },
    {
      name: "New York Sports Betting",
      hasNav: false,
      link: "https://www.thelines.com/ny/",
    },
    {
      name: "Oregon Sports Betting",
      hasNav: false,
      link: "https://www.thelines.com/oregon/",
    },
    {
      name: "Iowa Sports Betting",
      hasNav: false,
      link: "https://www.thelines.com/iowa/",
    },
    {
      name: "Wyoming Sports Betting",
      hasNav: false,
      link: "https://www.thelines.com/wyoming/",
    },
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
            <MenuItem
              title={item.name}
              hasNav={item.hasNav}
              key={index}
              onClick={() => {
                navigation.navigate("StateBettingGuide", {
                  screen: "StateBetGuide",
                  params: { link: item.link },
                });
              }}
            />
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
