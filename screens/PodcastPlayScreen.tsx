import * as React from "react";
import { Button, StyleSheet, NativeModules } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/core";

import { Text, View } from "../components/Themed";
import { DrawerStackParmList } from "../types";

export default function PodcastPlayScreen() {
  const { params } = useRoute<RouteProp<DrawerStackParmList, "PodcastPlay">>();
  console.log("$$", params);
  return (
    <View style={styles.container}>
      <Text>Coming Soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
