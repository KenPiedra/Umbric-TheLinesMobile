import * as React from 'react';
import { Button, StyleSheet, Image, useWindowDimensions } from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { Text, View } from '../components/Themed';

interface HowToBetScreenProps {
  data: any
}

export default function HowToBetScreenScreen(props: HowToBetScreenProps) {

  const { data } = props;

  const scaleHeight = ({ source, desiredWidth }: any) => {
    const { width, height } = Image.resolveAssetSource(source)

    return desiredWidth / width * height
  }

  // const imageSource = "https://ethicseducationforchildren.org/images/generic-video-thumbnail.jpg";
  const imageWidth = useWindowDimensions().width * 0.8;
  // const imageHeight = scaleHeight({
  //   source: require(imageSource),
  //   desiredWidth: imageWidth
  // })

  return (
    <View style={styles.container}>
      <View style={styles.videoWrap}>
        <Image
          source={{uri: "https://ethicseducationforchildren.org/images/generic-video-thumbnail.jpg"}}
          style={[styles.videoThumb, { width: imageWidth, height: imageWidth * 0.6 }]}
        />
      </View>
      <View style={styles.contentWrap}>
        <Text style={styles.subTitle}>Some Heading</Text>
        <Text style={[styles.title, { paddingBottom: 16 }]}>Single Line Header</Text>
        <Text style={styles.normalText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisi sed consequat purus nulla faucibus morbi amet. Leo, aliquam amet at senectus et.
        </Text>

        <View style={styles.infoWrap}>
          <View>
            <Icon name="map-marker-outline" style={styles.infoIcon} size={24} />
          </View>
          <View style={styles.infoText}>
            <Text style={styles.title}>Some information</Text>
            <Text style={styles.normalText}>
              Some other relevant and more specific information
            </Text>
          </View>
        </View>

        <View style={styles.infoWrap}>
          <View>
            <Icon name="star-outline" style={styles.infoIcon} size={24} />
          </View>
          <View style={styles.infoText}>
            <Text style={styles.title}>Some information</Text>
            <Text style={styles.normalText}>
              Some other relevant and more specific information
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  videoWrap: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  videoThumb: {
    borderRadius: 8,
    height: undefined,
  },
  contentWrap: {
    padding: 12,
  },
  title: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
    lineHeight: 24,
  },
  subTitle: {
    fontSize: 12,
    color: '#fff',
    textTransform: 'uppercase',
    lineHeight: 12,
  },
  normalText: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 24,
  },
  infoWrap: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 20,
  },
  infoIcon: {
    color: '#2CAF4D',
  },
  infoText: {
    paddingLeft: 16,
  }
});
