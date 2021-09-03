import * as React from "react";
import {
  Image,
  StyleSheet,
  TouchableHighlight,
  Linking,
  Alert,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import { Ionicons } from "@expo/vector-icons";
import { Text, View, ViewProps } from "./Themed";
import { PodcastParamList } from "../types";
import { PodcastItemData } from "../types/Podcast";
import { StackNavigationProp } from "@react-navigation/stack";

interface PodcastListItemProps extends ViewProps {
  data: PodcastItemData;
}

export default function PodcastListItem(props: PodcastListItemProps) {
  const { navigate } = useNavigation<StackNavigationProp<PodcastParamList>>();
  const {
    data: { Title, Thumb },
  } = props;
  function _navigateToPlayScreen() {
    const {
      data: { Title, Author, Thumb, Categories, PostedAtIso, DetailLink },
    } = props;
    navigate("PodcastPlayScreen", {
      podcast: props.data,
    });
  }

  async function _linkToBrowser() {
    const {
      data: { Title, Author, Thumb, Categories, PostedAtIso, DetailLink },
    } = props;
    const support = await Linking.canOpenURL(DetailLink);
    if (support) {
      await Linking.openURL(DetailLink);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }

  return (
    <TouchableHighlight onPress={() => _linkToBrowser()}>
      <View style={styles.container}>
        <View style={styles.desc}>
          <Text style={styles.title} numberOfLines={1}>
            {Title}
          </Text>
        </View>
        <View style={styles.arrow}>
          <Ionicons
            name="md-triangle-outline"
            size={24}
            color="#2CAF4D"
            style={{ transform: [{ rotate: "90deg" }] }}
          />
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: "#1F2933",
    borderRadius: 0,
    borderWidth: 0.5,
    flexDirection: "row",
    height: 60,
    margin: 0,
    overflow: "hidden",
  },
  thumb: {
    height: "100%",
    width: 60,
  },
  desc: {
    flex: 1,
    display: "flex",
    padding: 12,
    flexDirection: "column",
    justifyContent: "center",
  },
  title: {
    fontSize: 14,
    fontWeight: "400",
    letterSpacing: 0.2,
    lineHeight: 16,
  },
  subTitle: {
    flex: 0,
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 12,
    color: "#7B8794",
    overflow: "hidden",
  },
  arrow: {
    padding: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
