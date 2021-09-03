//import liraries
import React from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { DrawerStackParmList, League } from "../types";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

import { View, Text, useThemeColor } from "./Themed";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { setDrawerItemIndex } from "../actions/appAction";

type SportExploreItemProps = {
  item: League;
};

// create a component
const SportExploreItem = (props: SportExploreItemProps) => {
  const dispatch = useDispatch();
  const { item } = props;
  const colorMain = useThemeColor({}, "text");
  const navigation = useNavigation<DrawerNavigationProp<DrawerStackParmList>>();
  const obj = { MLB: 3, NBA: 1, NFL: 2, CFB: 4 };
  if (item) {
    return (
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => {
          navigation.openDrawer();
          dispatch(setDrawerItemIndex(obj[item.Name]));
        }}
      >
        <View style={[styles.container, { borderColor: colorMain }]}>
          <Image
            source={item.Image}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.text}>{item.Name}</Text>
        </View>
      </TouchableOpacity>
    );
  } else return null;
};

// define your styles
const styles = StyleSheet.create({
  container: {
    height: 46,
    flexDirection: "row",
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
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
    color: "#000",
  },
});

//make this component available to the app
export default SportExploreItem;
