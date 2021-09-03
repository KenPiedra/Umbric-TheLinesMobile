//import liraries
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import React, { Component } from "react";
import { StyleSheet, ScrollView, SafeAreaView } from "react-native";

import { View, useThemeColor, Text } from "../../components/Themed";
import { DrawerStackParmList } from "../../types";
import DrawerHeader from "./components/header";
import MenuItem from "./components/MenuItem";
import { MenuItemProps } from "./index";

type CFBScreenProps = {
  handleBack: () => void;
};
// create a component
const CFBScreen = (props: CFBScreenProps) => {
  const navigation = useNavigation<DrawerNavigationProp<DrawerStackParmList>>();
  const bgColor = useThemeColor({}, "background");
  const tintColor = useThemeColor({}, "inactive");
  const backendData: MenuItemProps[] = [
    { name: "World Series", hasNav: false },
    { name: "MVP", hasNav: false },
    { name: "Cy Young", hasNav: false },
    { name: "Win Totals", hasNav: false },
  ];

  const handleOnClick = () => {};
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 16 }}>
        <DrawerHeader handleBack={props.handleBack} />
      </View>
      <ScrollView style={[styles.container, { backgroundColor: bgColor }]}>
        <Text style={[{ color: tintColor }, styles.title]}>CFB</Text>
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
export default CFBScreen;
