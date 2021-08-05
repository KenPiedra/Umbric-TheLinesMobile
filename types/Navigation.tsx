import { PodcastItemDataProps } from "../components/PodcastListItem";

export type RootStackParamList = {
  Root: undefined;
  Auth: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Odds: { screen: string; params: { index: number } };
  News: undefined;
  Sportsbooks: undefined;
  Podcast: undefined;
};

export type DrawerStackParmList = {
  Home: undefined;
  PodcastPlay: { podcast: PodcastItemDataProps };
  HowToBetStack: undefined;
};

export type HowToBetStackParmList = {
  HowToBet: undefined;
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
};

export type PodcastPlayParamList = {
  PodcastPlayScreen: { podcast: any };
};
