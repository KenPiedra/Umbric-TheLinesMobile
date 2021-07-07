/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Auth: {
        screens: {
          Login: {
            screens: {
              LoginScreen: 'login',
            },
          },
        }
      },
      Root: {
        screens: {
          Home: {
            screens: {
              HomeScreen: 'home',
            },
          },
          Odds: {
            screens: {
              OddsScreen: 'odds',
            },
          },
          News: {
            screens: {
              NewsScreen: 'news',
            },
          },
          Sportsbooks: {
            screens: {
              SportsbooksScreen: 'sportsbooks',
            },
          },
          Podcast: {
            screens: {
              PodcastScreen: 'podcast',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
