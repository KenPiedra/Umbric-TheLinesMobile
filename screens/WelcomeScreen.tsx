//import liraries
import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Image } from "react-native";
import { useDispatch } from "react-redux";
import { Text, View } from "../components/Themed";
import { authLoginWithTwitter } from "../actions/authActions";

// create a component
const WelcomeScreen = () => {
  const dispatch = useDispatch();
  return (
    <View
      style={styles.container}
      onTouchStart={() => dispatch(authLoginWithTwitter("authFakeToken"))}
    >
      <Image
        source={require("../assets/images/splash.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <TouchableOpacity
        style={styles.greenButton}
        onPress={() => dispatch(authLoginWithTwitter("authFakeToken"))}
      >
        <Text style={styles.socialButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  greenButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2CAF4D",
    fontSize: 15,
    fontWeight: "700",
    height: 50,
    borderRadius: 999,
    width: "100%",
    marginTop: 40,
  },
  socialButtonText: {
    textTransform: "uppercase",
    paddingHorizontal: 20,
  },
  image: {
    width: "80%",
  },
});

//make this component available to the app
export default WelcomeScreen;
