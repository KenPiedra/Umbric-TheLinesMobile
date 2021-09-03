import { PodcastItemData } from "./Podcast";

export type RootStackParamList = {
  Root: undefined;
  Auth: undefined;
  NotFound: undefined;
};

export type DrawerNavParamList = {
  BottomNav: undefined;
};

export type BottomTabParamList = {
  // Home: undefined;
  Odds: { screen: string; params: { index: number } };
  Futures: { screen: string; params: { index: number } };
  News: { screen: string; params: { index: number } };
  // Sportsbooks: undefined;
  Podcast: undefined;
  "How To Bet": undefined;
  "State Guides": undefined;
  Hidden: { screen: string; params?: { link: string | number } };
};

export type HideStackParmList = {
  // HowToBet: undefined;
  Futures: { link: number };
  // StateBetGuide: { link: string };
};

export type PodCastPlayerStackParamList = {
  PodCastPlayer: { podcast: PodcastItemData };
};

export type HomeParamList = {
  HomeScreen: undefined;
};

export type OddsParamList = {
  OddsScreen: { index: number };
};

export type NewsParamList = {
  NewsScreen: { index: number };
  NewsDetail: { link: string };
};

export type SportsbooksParamList = {
  SportsbooksScreen: undefined;
};

export type PodcastParamList = {
  PodcastScreen: undefined;
  PodcastPlayScreen: { podcast: PodcastItemData };
};

export type HowToBetParamList = {
  HowToBetScreen: undefined;
};

export type StateBetGuideParamList = {
  StateBetGuideMenu: undefined;
  StateBetGuideHome: { link: string };
};
