//import liraries
import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

import { View, useThemeColor, Text } from "../components/Themed";
// import MenuItem from "./components/MenuItem";
import { StateBetGuideParamList } from "../types/Navigation";
import { StackNavigationProp } from "@react-navigation/stack";

type BettingGuideStatesProps = {
  handleBack: () => void;
};
// create a component
const StateBettingGuideMenu = (props: BettingGuideStatesProps) => {
  const bgColor = useThemeColor({}, "background");
  const tintColor = useThemeColor({}, "inactive");
  const navigation =
    useNavigation<StackNavigationProp<StateBetGuideParamList>>();

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
      <ScrollView style={[styles.container, { backgroundColor: bgColor }]}>
        {backendData.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("StateBetGuideHome", { link: item.link })
              }
              key={index}
              style={[styles.item, { borderBottomColor: tintColor }]}
            >
              <Text style={styles.itemText}>{item.name}</Text>
            </TouchableOpacity>
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
  },
  title: {
    marginVertical: 32,
    fontSize: 12,
    fontWeight: "600",
  },
  item: {
    height: 50,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemText: {
    marginLeft: 16,
  },
});

//make this component available to the app
export default StateBettingGuideMenu;
