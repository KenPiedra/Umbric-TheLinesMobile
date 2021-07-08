/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type RootStackParamList = {
  Root: undefined;
  Auth: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Odds: undefined;
  News: undefined;
  Sportsbooks: undefined;
  Podcast: undefined;
};

export type HomeParamList = {
  HomeScreen: undefined;
};

export type OddsParamList = {
  OddsScreen: undefined;
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
