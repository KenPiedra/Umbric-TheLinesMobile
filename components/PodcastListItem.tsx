import * as React from 'react';
import { Image, StyleSheet, TouchableWithoutFeedback, TouchableHighlight } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';
import { Text, View, ViewProps } from './Themed';

import { PodcastPlayParamList } from '../types';

// type ProfileScreenNavigationProp = StackNavigationProp<
//   PodcastPlayParamList,
//   'PodcastPlayScreen'
// >;

export interface PodcastItemDataProps {
  Title: string,
  Author: string,
  AuthorLink?: string,
  Thumb: string,
  Categories: Array<string>,
  CategoriesLink?: Object,
  PostedAtIso: string,
  DetailLink: string,
};

interface PodcastListItemProps extends ViewProps {
  data: PodcastItemDataProps,
  // navigation: ProfileScreenNavigationProp,
}

export default function PodcastListItem (props: PodcastListItemProps) {

  const navigation = useNavigation();
  const { data: { Title, Thumb } } = props;

  function _navigateToPlayScreen() {
    console.log("clicked podcast");
    const { data } = props;

    navigation.navigate('PodcastPlayScreen', { podcast: data })
  }

  return (
    <TouchableHighlight onPress={() => _navigateToPlayScreen()}>
      <View style={styles.container}>
        <Image style={styles.thumb} source={{uri: Thumb}} />
        <View style={styles.desc}>
          <Text style={styles.title}>{Title.split(':')[0]}</Text>
          <Text style={styles.subTitle} numberOfLines={1}>{Title.split(':')[1].trim()}</Text>
        </View>
        <View style={styles.arrow}>
          <Ionicons name="md-triangle-outline" size={24} color="#2CAF4D" style={{transform: [{ rotate: "90deg" }]}} />
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: '#1F2933',
    borderRadius: 0,
    borderWidth: 0.5,
    flexDirection: 'row',
    height: 60,
    margin: 0,
    overflow: 'hidden',
  },
  thumb: {
    height: '100%',
    width: 60,
  },
  desc: {
    flex: 1,
    display: 'flex',
    padding: 12,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: 0.2,
    lineHeight: 16,
  },
  subTitle: {
    flex: 0,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 12,
    color: '#7B8794',
    overflow: 'hidden',
  },
  arrow: {
    padding: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
