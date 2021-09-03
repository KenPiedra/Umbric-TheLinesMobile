/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import HomeScreen from "../screens/HomeScreen";
import OddsScreen from "../screens/OddsScreen";
import NewsScreen from "../screens/NewsScreen";
import NewDetailScreen from "../screens/NewsDetailScreen";
import SportsbooksScreen from "../screens/SportsbooksScreen";
import PodcastScreen from "../screens/PodcastScreen";
import {
  BottomTabParamList,
  HomeParamList,
  OddsParamList,
  NewsParamList,
  SportsbooksParamList,
  PodcastParamList,
  HideStackParmList,
  HowToBetParamList,
  StateBetGuideParamList,
} from "../types";
import {
  // HomeIcon,
  OddsIcon,
  NewsIcon,
  // SportsbooksIcon,
  PodcastIcon,
  HowToBet,
  BetGuid,
  Futures,
} from "../components/SvgIcons";

import HamburgerIcon from "../components/HamburgerIcon";
import BackIcon from "../components/BackIcon";
import PodcastPlayScreen from "../screens/PodcastPlayScreen";
import HowToBetScreen from "../screens/HowToBetScreen";
import StateBettingGuideScreen from "../screens/StateBettingGuideScreen";
import FutureScreen from "../screens/FutureScreen";
import StateBettingGuideMenuScreen from "../screens/StateBettingGuideMenuScreen";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

const StateBetGuideStack = createStackNavigator<StateBetGuideParamList>();
const StateBetNavigation = () => {
  return (
    <StateBetGuideStack.Navigator>
      <StateBetGuideStack.Screen
        name="StateBetGuideMenu"
        component={StateBettingGuideMenuScreen}
        options={{
          title: "US Sports Betting",
          // headerLeft: (props) => <HamburgerIcon {...props} />,
        }}
      />
      <StateBetGuideStack.Screen
        name="StateBetGuideHome"
        component={StateBettingGuideScreen}
        options={{
          title: "US Sports Betting",
          headerLeft: (props) => <BackIcon />,
        }}
      />
    </StateBetGuideStack.Navigator>
  );
};
const HowToBetStack = createStackNavigator<HowToBetParamList>();
const HowToBetNavigator = () => {
  return (
    <HowToBetStack.Navigator>
      <HowToBetStack.Screen
        name="HowToBetScreen"
        component={HowToBetScreen}
        options={{
          title: "How to Bet",
          // headerLeft: (props) => <HamburgerIcon {...props} />,
        }}
      />
    </HowToBetStack.Navigator>
  );
};
const StackHide = createStackNavigator<HideStackParmList>();
const HideNavigator = () => {
  return (
    <StackHide.Navigator>
      <StackHide.Screen
        name="Futures"
        component={FutureScreen}
        options={{
          title: "Futures",
          // headerLeft: (props) => <HamburgerIcon {...props} />,
        }}
      />
    </StackHide.Navigator>
  );
};

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  return (
    <BottomTab.Navigator
      initialRouteName="Odds"
      tabBarOptions={{
        activeTintColor: Colors[colorScheme].tabIconSelected,
        inactiveTintColor: Colors[colorScheme].tabIconDefault,
        iconStyle: {
          width: 32,
          height: 32,
          margin: 1,
        },
        labelStyle: {
          fontSize: 12,
          margin: 0,
        },
        tabStyle: {
          marginTop: 16,
          marginBottom: 16,
        },
        style: {
          height: 81 + insets.bottom,
        },
      }}
      screenOptions={({ route }) => ({
        tabBarButton: ["Hidden"].includes(route.name)
          ? () => {
              return null;
            }
          : undefined,
      })}
    >
      {/* <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
        }}
      /> */}
      <BottomTab.Screen
        name="Odds"
        component={OddsNavigator}
        options={{
          tabBarIcon: ({ color }) => <OddsIcon color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Futures"
        component={HideNavigator}
        options={{
          tabBarIcon: ({ color }) => <Futures color={color} />,
        }}
      />
      <BottomTab.Screen
        name="News"
        component={NewsNavigator}
        options={{
          tabBarIcon: ({ color }) => <NewsIcon color={color} />,
        }}
      />
      {/* <BottomTab.Screen
        name="Sportsbooks"
        component={SportsbooksNavigator}
        options={{
          tabBarIcon: ({ color }) => <SportsbooksIcon color={color} />,
        }}
      /> */}
      <BottomTab.Screen
        name="Podcast"
        component={PodcastNavigator}
        options={{
          tabBarIcon: ({ color }) => <PodcastIcon color={color} />,
        }}
      />
      {/* <BottomTab.Screen
        name="State Guides"
        component={StateBetNavigation}
        options={{
          tabBarIcon: ({ color }) => <BetGuid color={color} />,
        }}
      /> */}
      <BottomTab.Screen
        name="How To Bet"
        component={HowToBetNavigator}
        options={{
          tabBarIcon: ({ color }) => <HowToBet color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator<HomeParamList>();

export function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerTitle: "Home",
          // headerLeft: (props) => <HamburgerIcon {...props} />,
        }}
      />
    </HomeStack.Navigator>
  );
}

const OddsStack = createStackNavigator<OddsParamList>();

export function OddsNavigator() {
  return (
    <OddsStack.Navigator>
      <OddsStack.Screen
        name="OddsScreen"
        component={OddsScreen}
        options={{
          headerTitle: "Odds",
          // headerLeft: (props) => <HamburgerIcon {...props} />,
        }}
        initialParams={{ index: 0 }}
      />
    </OddsStack.Navigator>
  );
}

const NewsStack = createStackNavigator<NewsParamList>();

export function NewsNavigator() {
  return (
    <NewsStack.Navigator>
      <NewsStack.Screen
        name="NewsScreen"
        component={NewsScreen}
        options={{
          headerTitle: "News",
          // headerLeft: (props) => <HamburgerIcon {...props} />,
        }}
        initialParams={{ index: 0 }}
      />
      <NewsStack.Screen
        name="NewsDetail"
        component={NewDetailScreen}
        options={{
          headerTitle: "News",
          headerLeft: (props) => <BackIcon />,
        }}
      />
    </NewsStack.Navigator>
  );
}

const SportsbooksStack = createStackNavigator<SportsbooksParamList>();

export function SportsbooksNavigator() {
  return (
    <SportsbooksStack.Navigator>
      <SportsbooksStack.Screen
        name="SportsbooksScreen"
        component={SportsbooksScreen}
        options={{
          headerTitle: "Sportsbooks",
          // headerLeft: (props) => <HamburgerIcon {...props} />,
        }}
      />
    </SportsbooksStack.Navigator>
  );
}

const PodcastStack = createStackNavigator<PodcastParamList>();

export function PodcastNavigator() {
  return (
    <PodcastStack.Navigator>
      <PodcastStack.Screen
        name="PodcastScreen"
        component={PodcastScreen}
        options={{
          headerTitle: "Podcast",
          // headerLeft: (props) => <HamburgerIcon {...props} />,
        }}
      />
      <PodcastStack.Screen
        name="PodcastPlayScreen"
        component={PodcastPlayScreen}
        options={{
          headerTitle: "Episode",
          headerLeft: (props) => {
            return <BackIcon />;
          },
        }}
      />
    </PodcastStack.Navigator>
  );
}
