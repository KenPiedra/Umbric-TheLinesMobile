import React, { useEffect } from "react";
import { Image, StyleSheet, NativeModules, Dimensions } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/core";
import TrackPlayer, { usePlaybackState } from "react-native-track-player";

import { Text, View, useThemeColor } from "../components/Themed";
import { PodcastParamList } from "../types";
import ProgressBar from "../components/ProgressBar";

const PodcastPlayScreen = () => {
  const { params } =
    useRoute<RouteProp<PodcastParamList, "PodcastPlayScreen">>();
  const tpstatus = usePlaybackState();
  const tintColor = useThemeColor({}, "text");
  useEffect(() => {
    initPlayer();
    return () => {};
  }, []);

  const initPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer({});
      TrackPlayer.updateOptions({
        stopWithApp: true,
        capabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
        ],
        compactCapabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
        ],
      });
      await TrackPlayer.add([
        {
          url: "https://soundcloud.com/liltecca/lil-tecca-money-on-me",
          // url: params.podcast.DetailLink,
          title: params.podcast.Title,
          artist: params.podcast.Author,
          id: params.podcast.Title,
          duration: params.podcast.Duration,
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Image
          style={[styles.image, { borderColor: tintColor }]}
          source={{ uri: params.podcast.Thumb }}
        />
      </View>
      <View style={{ paddingHorizontal: 16, width: "100%" }}>
        <Text style={styles.title}>{params.podcast.Title}</Text>
        <Text style={styles.description}>Predictions for the Masters 2021</Text>
        <ProgressBar
          onToggleButtonPress={() => {
            console.log("ppp");
          }}
          tpstatus={tpstatus}
          tintColor={tintColor}
        />
      </View>
      <View style={{ height: 30 }} />
    </View>
  );
};

export default PodcastPlayScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: Dimensions.get("screen").width * 0.9,
    height: 300,
    resizeMode: "contain",
    borderRadius: 10,
    borderWidth: 1,
  },
  title: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "700",
  },
  description: {
    fontSize: 12,
    lineHeight: 12,
    fontWeight: "400",
    marginTop: 3,
    marginBottom: 30,
  },
});
