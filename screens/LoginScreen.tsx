import * as React from 'react';
import { Button, StyleSheet, NativeModules } from 'react-native';

import { Text, View } from '../components/Themed';

export default function LoginScreen() {

  const API_KEY = {
    TWITTER_API_KEY: "AnruNLI7G01Ps4CQ09FIk8apl",
    TWITTER_SECRET_KEY: "QwxScWKOJyR7fTDxtXbkAwT3hlWU0ibwa96sHe2viKTvsHglMA"
  }

  const twitterLogin = () => {
    const { RNTwitterSignIn } = NativeModules;

    RNTwitterSignIn.init(API_KEY.TWITTER_API_KEY, API_KEY.TWITTER_SECRET_KEY)
    RNTwitterSignIn.logIn()
    .then((loginData: any) => {
      console.log("TwitterLoginData:", loginData);
    }).catch((error: any) => {
      console.log("error", error);
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>
      <Text style={styles.title}>Enter your username & password to log in</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Button title="Continue with Twitter" onPress={twitterLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
