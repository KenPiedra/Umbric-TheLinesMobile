//import liraries
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { View, useThemeColor, Text } from "../../../components/Themed";
import SubMenuItem from "./SubMenuItem";
// create a component
type SubItem = {
  name: string;
};
type MenuItemProps = {
  hasNav: boolean;
  title: string;
  link?: string;
  onClick: () => void;
  subMenu?: Array<SubItem>;
};
const MenuItem = (props: MenuItemProps) => {
  const tintColor = useThemeColor({}, "inactive");
  const [isOpen, setisOpen] = useState(false);
  return (
    <View>
      <TouchableOpacity
        onPress={props.onClick}
        style={[styles.container, { borderBottomColor: tintColor }]}
      >
        <Text>{props.title}</Text>
        {props.hasNav && (
          <Ionicons
            color={tintColor}
            size={24}
            name={isOpen ? "chevron-up" : "chevron-down"}
          />
        )}
      </TouchableOpacity>
      {isOpen &&
        props.hasNav &&
        props.subMenu &&
        props.subMenu.map((item, index) => {
          return (
            <SubMenuItem
              title={item.name}
              key={index}
              onClick={() => props.onClick(index)}
            />
          );
        })}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    height: 50,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

//make this component available to the app
export default MenuItem;
