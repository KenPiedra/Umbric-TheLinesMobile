import * as React from 'react';
import { Button, StyleSheet, NativeModules } from 'react-native';

import { Text, View } from '../components/Themed';

interface PodcastPlayProps {
  podcast: any
}

export default function PodcastPlayScreen(props: PodcastPlayProps) {

  const { podcast } = props;

  return (
    <View style={styles.container}>
      <Text>Coming Soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
