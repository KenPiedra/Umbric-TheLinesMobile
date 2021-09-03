//import liraries
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import React, { Component } from "react";
import { StyleSheet, ScrollView, SafeAreaView } from "react-native";

import { View, useThemeColor, Text } from "../../components/Themed";
import { BottomTabParamList, DrawerNavParamList } from "../../types";
import DrawerHeader from "./components/header";
import MenuItem from "./components/MenuItem";
import { MenuItemProps } from "./index";

type NFLScreenProps = {
  handleBack: () => void;
};

// create a component
const NFLScreen = (props: NFLScreenProps) => {
  const navigation = useNavigation<DrawerNavigationProp<DrawerNavParamList>>();
  const bottomeNavigation =
    useNavigation<BottomTabNavigationProp<BottomTabParamList>>();
  const bgColor = useThemeColor({}, "background");
  const tintColor = useThemeColor({}, "inactive");

  const backendData: MenuItemProps[] = [
    { name: "Power Rankings", hasNav: false },
    { name: "Futures", hasNav: false, nav: "FutureStack" },
    { name: "Game Previews", hasNav: false },
    { name: "NFL Player Props", hasNav: false },
    { name: "Odds", hasNav: false },
    { name: "News", hasNav: false, nav: "News" },
  ];

  const handleOnClick = (
    route: keyof DrawerStackParmList | keyof BottomTabParamList
  ) => {
    if (route == "FutureStack") {
      navigation.navigate("BottomNav");
      bottomeNavigation.navigate("Hidden", {
        screen: "Future",
        params: { link: 0 },
      });
    } else if (route == "News") {
      bottomeNavigation.navigate<keyof BottomTabParamList>("News", {
        screen: "NewsScreen",
        params: { index: 4 },
      });
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 16 }}>
        <DrawerHeader handleBack={props.handleBack} />
      </View>
      <ScrollView style={[styles.container, { backgroundColor: bgColor }]}>
        <Text style={[{ color: tintColor }, styles.title]}>NFL</Text>
        {backendData.map((item, index) => {
          return <MenuItem item={item} key={index} onClick={handleOnClick} />;
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
export default NFLScreen;
