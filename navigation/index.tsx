/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { Component } from 'react';
import { ColorSchemeName } from 'react-native';
import { connect } from 'react-redux';

import NotFoundScreen from '../screens/NotFoundScreen';
import LoginScreen from '../screens/LoginScreen';
import PodcastPlayScreen from '../screens/PodcastPlayScreen';
import { RootStackParamList } from '../types';
import RootStackNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={RootStackNavigator} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}

function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Auth" component={LoginScreen} />
    </Stack.Navigator>
  );
}

interface NavigationProps {
  colorScheme: ColorSchemeName,
  isAuthenticated: boolean,
}

class Navigation extends Component<NavigationProps> {
  constructor(props: Readonly<NavigationProps>) {
    super(props);
  }

  render() {
    const { colorScheme , isAuthenticated} = this.props;

    return (
      <NavigationContainer
        linking={LinkingConfiguration}
        theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          {
            isAuthenticated ?
            <RootNavigator />
            :
            <AuthNavigator />
          }
      </NavigationContainer>
    );
  }
}

const mapStateToProps = (state: any) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = (dispatch: any) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
