import { PodcastItemData } from "./Podcast";

export type RootStackParamList = {
  Root: undefined;
  Auth: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Odds: { screen: string; params: { index: number } };
  News: { screen: string; params: { index: number } };
  Sportsbooks: undefined;
  Podcast: undefined;
};

export type DrawerStackParmList = {
  Home: undefined;
  HowToBetStack: undefined;
  StateBettingGuide: { screen: string; params: { link: string } };
  FutureStack: { screen: string; params: { index: number } };
};

export type HowToBetStackParmList = {
  HowToBet: undefined;
};

export type StateBetGuideParmList = {
  StateBetGuide: { link: string };
};

export type FutureStackParamList = {
  Future: { index: number };
};

export type PodCastPlayerStackParamList = {
  PodCastPlayer: { podcast: PodcastItemData };
};

export type CustomDrawerStackParamList = {
  CustomDrawerContent: undefined;
  BettingGuideStates: undefined;
};

export type HomeParamList = {
  HomeScreen: undefined;
};

export type OddsParamList = {
  OddsScreen: { index: number };
};

export type NewsParamList = {
  NewsScreen: undefined;
};

export type SportsbooksParamList = {
  SportsbooksScreen: undefined;
};

export type PodcastParamList = {
  PodcastScreen: undefined;
  PodcastPlayScreen: { podcast: PodcastItemData };
};
