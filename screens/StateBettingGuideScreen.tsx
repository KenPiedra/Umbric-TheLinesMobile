//import liraries
import React, { Component } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
import { RouteProp, useRoute } from "@react-navigation/core";

import { Text, View, useThemeColor } from "../components/Themed";
import { StateBetGuideParmList } from "../types";

// create a component
const StateBettingGuide = () => {
  // const color = useThemeColor({}, "text");
  // const bgcolor = useThemeColor({}, "background");
  const { params } =
    useRoute<RouteProp<StateBetGuideParmList, "StateBetGuide">>();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView source={{ uri: params.link }} />
      {/* <ScrollView style={[{ backgroundColor: bgcolor }, styles.container]}>
        <Text style={styles.smallTitle}>some heading</Text>
        <Text style={styles.title}>Single Line Header</Text>
        <View style={{ height: 10 }} />
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisi sed
          consequat purus nulla faucibus morbi amet. Leo, aliquam amet at
          senectus et.
        </Text>
        <View style={{ marginTop: 12 }}>
          {[0, 1].map((item, index) => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 22,
                  flexWrap: "wrap",
                }}
                key={index}
              >
                <Image
                  source={require("../assets/images/star.png")}
                  style={styles.image}
                />
                <View
                  style={{
                    marginRight: 16,
                    width: "85%",
                  }}
                >
                  <Text style={styles.title}>Some information</Text>
                  <View style={{ height: 3 }} />
                  <Text style={[styles.description]}>
                    Some other relevant and more specific information
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
        <View style={{ marginTop: 27 }}>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={[styles.touchable, { borderBottomColor: color }]}
              >
                <Text style={styles.touchableText}>
                  Is sports betting legal in New Jersey?
                </Text>
                <Ionicons name="chevron-forward" color={color} size={30} />
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView> */}
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  smallTitle: {
    fontSize: 12,
    fontWeight: "800",
    marginTop: 21,
    marginBottom: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
  description: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 24,
  },
  image: {
    width: 20,
    height: 20,
    marginRight: 20,
  },
  touchable: {
    padding: 14,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  touchableText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400",
  },
});

//make this component available to the app
export default StateBettingGuide;
