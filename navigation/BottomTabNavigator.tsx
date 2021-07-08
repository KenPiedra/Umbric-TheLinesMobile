/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import HomeScreen from '../screens/HomeScreen';
import OddsScreen from '../screens/OddsScreen';
import NewsScreen from '../screens/NewsScreen';
import SportsbooksScreen from '../screens/SportsbooksScreen';
import PodcastScreen from '../screens/PodcastScreen';
import PodcastPlayScreen from '../screens/PodcastPlayScreen';
import { BottomTabParamList, HomeParamList, OddsParamList, NewsParamList, SportsbooksParamList, PodcastParamList, PodcastPlayParamList } from '../types';
import { HomeIcon, OddsIcon, NewsIcon, SportsbooksIcon, PodcastIcon } from '../components/SvgIcons';

const RootStack = createStackNavigator();

export default function RootStackNavigator() {
  return (
    <RootStack.Navigator>
      <RootStack.Screen name="HomeScreen" component={BottomTabNavigator} />
      <RootStack.Screen name="PodcastPlayScreen" component={PodcastPlayScreen} />
    </RootStack.Navigator>
  )
}

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

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
          height: 81,
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
      <BottomTab.Screen
        name="Podcast"
        component={PodcastNavigator}
        options={{
          tabBarIcon: ({ color }) => <PodcastIcon color={color} />,
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

const PodcastStack = createStackNavigator<PodcastParamList>();

function PodcastNavigator() {
  return (
    <PodcastStack.Navigator>
      <PodcastStack.Screen
        name="PodcastScreen"
        component={PodcastScreen}
        options={{ headerTitle: 'Podcast' }}
      />
    </PodcastStack.Navigator>
  );
}

const PodcastPlayStack = createStackNavigator<PodcastPlayParamList>();

function PodcastPlayNavigator() {
  return (
    <PodcastPlayStack.Navigator>
      <PodcastPlayStack.Screen
        name="PodcastPlayScreen"
        component={PodcastPlayScreen}
        options={{ headerTitle: 'Podcast' }}
      />
    </PodcastPlayStack.Navigator>
  );
}
