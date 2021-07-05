import * as React from 'react';
import { Image, Linking, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import { Text, View, ViewProps } from './Themed';

export interface NewsItemDataProps {
  Title: string,
  Author: string,
  AuthorLink?: string,
  Thumb: string,
  Categories: Array<string>,
  CategoriesLink?: Object,
  PostedAt: Date,
  DetailLink: string,
};

interface NewsListItemProps extends ViewProps {
  data: NewsItemDataProps
}

export default class NewsListItem extends React.Component<NewsListItemProps> {
  constructor(props: Readonly<NewsListItemProps>) {
    super(props);
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => this.openNews(this.props.data.DetailLink)}>
        <View style={styles.container}>
          <Image style={styles.thumb} source={{uri: this.props.data.Thumb}} />
          <View style={styles.desc}>
            <Text style={styles.newsFeed}>{this.props.data.Author}</Text>
            <Text style={styles.newsTitle}>{this.props.data.Title}</Text>
            <Text style={styles.newsDate}>{this.props.data.PostedAt.toDateString()}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  async openNews(url: string) {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.error(url);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    borderColor: '#1F2933',
    borderRadius: 16,
    borderWidth: 0.5,
    flexDirection: 'row',
    height: 116,
    margin: 8,
    overflow: 'hidden',
  },
  thumb: {
    height: '100%',
    width: 112,
  },
  desc: {
    flex: 1,
    display: 'flex',
    padding: 8,
  },
  newsFeed: {
    flex: 0,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1.5,
    marginTop: 8,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  newsTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.15,
    lineHeight: 19.2,
  },
  newsDate: {
    flex: 0,
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 18,
    marginTop: 8,
  }
});
