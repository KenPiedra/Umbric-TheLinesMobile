//import liraries
import React, { Component } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";
import { RouteProp, useRoute } from "@react-navigation/core";
import { NewsParamList } from "../types";

// create a component
const NewDetailScreen = () => {
  const { params } = useRoute<RouteProp<NewsParamList, "NewsDetail">>();
  const jscode = `
      document.querySelectorAll(".container")[0].remove();
      document.querySelectorAll(".site-content")[0].setAttribute('style', 'top: -62px');
      true;
  `;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        source={{ uri: params.link }}
        injectedJavaScript={jscode}
        injectedJavaScriptBeforeContentLoaded={jscode}
        onMessage={(event) => {}}
      />
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50",
  },
});

//make this component available to the app
export default NewDetailScreen;
