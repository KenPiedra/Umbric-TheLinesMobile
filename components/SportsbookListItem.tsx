import * as React from 'react';
import { Image, Linking, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import { Text, View, ViewProps } from './Themed';


export interface SportsbookItemDataProps {
  ID: number,
  title: string,
  sportsdata_id: number,
  affiliate_link: string,
  bonus_details: string,
  bonus_text: string,
  bottom_text: string,
  button_text: string,
  list_items: Array<string>,
  logo: string,
  logo_text: string,
  promo_code: string,
  promo_text: string,
  review_title: string,
  review_link: string,
};

interface SportsbookListItemProps extends ViewProps {
  data: SportsbookItemDataProps
}

export default class SportsbookListItem extends React.Component<SportsbookListItemProps> {
  constructor(props: Readonly<SportsbookListItemProps>) {
    super(props);
  }

  render() {
    const { data } = this.props;

    return (
      <TouchableWithoutFeedback onPress={() => this.openLink(data.affiliate_link)}>
        <View style={styles.container}>
          <Image style={styles.thumb} source={{uri: data.logo}} />
          <View style={styles.mainContent}>
            <Text style={styles.subTitle}>{data.title}</Text>
          </View>
          <View style={styles.altContent}>
            <Text style={styles.font16}>Sign Up</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  async openLink(url: string) {
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
    borderColor: 'transparent',
    borderRadius: 12,
    borderWidth: 0.5,
    flexDirection: 'row',
    height: 80,
    margin: 8,
    overflow: 'hidden',
    alignItems: 'center',
  },
  thumb: {
    height: '100%',
    width: 80,
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    padding: 8,
  },
  subTitle: {
    flex: 0,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1.5,
    marginTop: 8,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  mainTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.15,
    lineHeight: 19.2,
  },
  itemDate: {
    flex: 0,
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 18,
    marginTop: 8,
  },
  altContent: {
    padding: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  font16: {
    fontSize: 16,
    fontWeight: '700',
  }
});
