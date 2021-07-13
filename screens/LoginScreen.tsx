import React, { Component } from 'react';
import { StyleSheet, Pressable, TextInput, NativeModules } from 'react-native';
import { connect } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';

import { Text, View } from '../components/Themed';
import { authLoginWithTwitter } from '../actions/authActions'

const { RNTwitterSignIn } = NativeModules;

const API_KEY = {
  TWITTER_API_KEY: "h9PUP3dScz8aZ1oHFw4u1iq5o",
  TWITTER_SECRET_KEY: "eJQk4kDoU29pzCX5c3wfN2vlfTVb1KTgAQMItycVhHk3sfEkfE"
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titleWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    width: '100%',
    paddingBottom: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    justifyContent: 'flex-start',
  },
  helpText: {
    fontSize: 16,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '100%',
  },
  socialButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    fontSize: 15,
    fontWeight: '700',
    height: 50,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 50,
    width: '100%',
    marginBottom: 20,
  },
  socialButtonText: {
    textTransform: 'uppercase',
    paddingHorizontal: 20,
  },
  fieldWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    width: '100%',
    paddingVertical: 10,
  },
  fieldLabel: {
    fontSize: 12,
    textTransform: 'uppercase',
    fontWeight: '800',
    paddingBottom: 5,
  },
  fieldInput: {
    height: 48,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: '#2F80ED',
    fontSize: 16,
    padding: 8,
    color: '#2CAF4D'
  },
  greenButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2CAF4D',
    fontSize: 15,
    fontWeight: '700',
    height: 50,
    borderWidth: 0,
    borderColor: '#fff',
    borderRadius: 50,
    width: '100%',
    marginTop: 20,
    marginBottom: 10,
  }
});

interface LoginScreenProps {
  authLoginWithTwitter: any
}
class LoginScreen extends Component<LoginScreenProps> {

  constructor(props: Readonly<LoginScreenProps>) {
    super(props);
  }

  _twitterLogin = () => {
    console.log("Twitter login...");
    RNTwitterSignIn.init(API_KEY.TWITTER_API_KEY, API_KEY.TWITTER_SECRET_KEY)
    RNTwitterSignIn.logIn()
    .then((loginData: any) => {
      console.log("TwitterLoginData:", loginData);
      this.props.authLoginWithTwitter(loginData.authToken);
    }).catch((error: any) => {
      console.log("TwitterLoginError:", error);
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>Log In</Text>
          <Text style={styles.helpText}>Enter your username & password to log in</Text>
        </View>

        {/* <View style={styles.fieldWrapper}>
          <Text style={styles.fieldLabel}>Email</Text>
          <TextInput style={styles.fieldInput} placeholder="Enter Email" />
        </View>
        <View style={styles.fieldWrapper}>
          <Text style={styles.fieldLabel}>Password</Text>
          <TextInput style={styles.fieldInput} secureTextEntry={true} placeholder="Enter Email" />
        </View>
        <Pressable style={styles.greenButton} onPress={() => this._twitterLogin()}>
          <Text style={styles.socialButtonText}>Continue</Text>
        </Pressable> */}

        {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}

        <Pressable style={styles.socialButton} onPress={() => this._twitterLogin()}>
          <FontAwesome name="facebook" size={24} color="#7B8794" />
          <Text style={styles.socialButtonText}>Continue with Facebook</Text>
        </Pressable>
        <Pressable style={styles.socialButton} onPress={() => this._twitterLogin()}>
          <FontAwesome name="twitter" size={24} color="#7B8794" />
          <Text style={styles.socialButtonText}>Continue with Twitter</Text>
        </Pressable>
      </View>
    );
  }
}

const mapStateToProps = (state: any) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = (dispatch: any) => ({
  authLoginWithTwitter: (token: string) => dispatch(authLoginWithTwitter(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
