//import liraries
import React, { Component } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  View,
  Linking,
  Platform,
} from "react-native";
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

  const renderLoading = () => (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        height: "100%",
        width: "100%",
        backgroundColor: "white",
      }}
    >
      <ActivityIndicator size="large" />
    </View>
  );
  const originalUrl = params.link;
  const openExternalLink = (url: string): void => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) Linking.openURL(url);
    });
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        source={{ uri: params.link }}
        injectedJavaScript={jscode}
        injectedJavaScriptBeforeContentLoaded={jscode}
        onMessage={(event) => {}}
        renderLoading={renderLoading}
        startInLoadingState
        onShouldStartLoadWithRequest={({ url, canGoBack, isTopFrame }) => {
          if (Platform.OS === "ios") {
            const isFirstLoad = url === originalUrl && !canGoBack;
            if (!isTopFrame || isFirstLoad) return true;
          }

          if (url !== originalUrl) openExternalLink(url);
          else {
            // handling the request if it's with the domain listed in the whitelist
            return true;
          }
          return false;
        }}
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
