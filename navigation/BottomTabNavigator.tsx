/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useSafeAreaInsets }  from 'react-native-safe-area-context';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import HomeScreen from '../screens/HomeScreen';
import OddsScreen from '../screens/OddsScreen';
import NewsScreen from '../screens/NewsScreen';
import SportsbooksScreen from '../screens/SportsbooksScreen';
import { BottomTabParamList, HomeParamList, OddsParamList, NewsParamList, SportsbooksParamList } from '../types';
import { HomeIcon, OddsIcon, NewsIcon, SportsbooksIcon } from '../components/SvgIcons';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: Colors[colorScheme].tabIconSelected,
        inactiveTintColor: Colors[colorScheme].tabIconDefault,
        iconStyle: {
          width: 32,
          height: 32,
          margin: 1
        },
        labelStyle: {
          fontSize: 12,
          margin: 0,
        },
        tabStyle: {
          marginTop: 16,
          marginBottom: 16
        },
        style: {
          height: 81 + insets.bottom,
        }
      }}>
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Odds"
        component={OddsNavigator}
        options={{
          tabBarIcon: ({ color }) => <OddsIcon color={color} />,
        }}
      />
      <BottomTab.Screen
        name="News"
        component={NewsNavigator}
        options={{
          tabBarIcon: ({ color }) => <NewsIcon color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Sportsbooks"
        component={SportsbooksNavigator}
        options={{
          tabBarIcon: ({ color }) => <SportsbooksIcon color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator<HomeParamList>();

function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerTitle: 'Home' }}
      />
    </HomeStack.Navigator>
  );
}

const OddsStack = createStackNavigator<OddsParamList>();

function OddsNavigator() {
  return (
    <OddsStack.Navigator>
      <OddsStack.Screen
        name="OddsScreen"
        component={OddsScreen}
        options={{ headerTitle: 'Odds' }}
      />
    </OddsStack.Navigator>
  );
}

const NewsStack = createStackNavigator<NewsParamList>();

function NewsNavigator() {
  return (
    <NewsStack.Navigator>
      <NewsStack.Screen
        name="NewsScreen"
        component={NewsScreen}
        options={{ headerTitle: 'News' }}
      />
    </NewsStack.Navigator>
  );
}

const SportsbooksStack = createStackNavigator<SportsbooksParamList>();

function SportsbooksNavigator() {
  return (
    <SportsbooksStack.Navigator>
      <SportsbooksStack.Screen
        name="SportsbooksScreen"
        component={SportsbooksScreen}
        options={{ headerTitle: 'Sportsbooks' }}
      />
    </SportsbooksStack.Navigator>
  );
}
