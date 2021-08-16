import React from "react";
import TrackPlayer, { ProgressComponent } from "react-native-track-player";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { View, Text } from "../components/Themed";

interface ProgressBarProps {
  onToggleButtonPress: () => void;
  tpstatus: TrackPlayer.State;
  tintColor: string;
}
interface ProgressBarState {
  playing: boolean;
}

export class ProgressBar extends ProgressComponent<
  ProgressBarProps,
  ProgressBarState
> {
  constructor(props: ProgressBarProps) {
    super(props);
    this.state = {
      ...this.state,
      playing: false,
    };
  }
  formatTwoDigits(n: number) {
    return n < 10 ? "0" + n : n;
  }
  formatTime(seconds: number) {
    const ss = Math.floor(seconds) % 60;
    const mm = Math.floor(seconds / 60) % 60;
    const hh = Math.floor(seconds / 3600);

    if (hh > 0) {
      return (
        hh + ":" + this.formatTwoDigits(mm) + ":" + this.formatTwoDigits(ss)
      );
    } else {
      return mm + ":" + this.formatTwoDigits(ss);
    }
  }

  render() {
    const { tpstatus, tintColor } = this.props;
    const positionVal = Math.floor(this.state.position);
    const durationVal = Math.floor(this.state.duration);
    const position = this.formatTime(positionVal);
    const duration = this.formatTime(durationVal);
    let progress =
      durationVal === 0 ? 100 : Math.ceil(this.getProgress() * 100);
    const temp = () => {
      switch (tpstatus) {
        case TrackPlayer.STATE_PLAYING:
          console.log("player playing");
          return (
            <TouchableOpacity
              onPress={async () => {
                await TrackPlayer.pause();
              }}
            >
              <Ionicons name="pause-circle" size={45} color={tintColor} />
            </TouchableOpacity>
          );
          break;
        case TrackPlayer.STATE_PAUSED:
          return (
            <TouchableOpacity
              onPress={async () => {
                if (Math.floor(progress) === 100) {
                  await TrackPlayer.seekTo(0);
                }
                await TrackPlayer.play();
              }}
            >
              <Ionicons name="play-circle" size={45} color={tintColor} />
            </TouchableOpacity>
          );
          break;

        case TrackPlayer.STATE_READY:
          console.log("player ready");
          return (
            <TouchableOpacity
              onPress={async () => {
                if (Math.floor(progress) === 100) {
                  await TrackPlayer.seekTo(0);
                }
                await TrackPlayer.play();
              }}
            >
              <Ionicons name="play-circle" size={45} color={tintColor} />
            </TouchableOpacity>
          );
          break;
        case TrackPlayer.STATE_STOPPED:
          console.log("player stopped");
          return (
            <TouchableOpacity
              onPress={async () => {
                if (Math.floor(progress) === 100) {
                  await TrackPlayer.seekTo(0);
                }
                await TrackPlayer.play();
              }}
            >
              <Ionicons name="play-circle" size={45} color={tintColor} />
            </TouchableOpacity>
          );
          break;
        default:
          return <Ionicons name="play-circle" size={45} color={tintColor} />;
          break;
      }
    };

    return (
      <View style={{ width: "100%" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              height: 4,
              backgroundColor: tintColor,
              flex: 1,
              marginHorizontal: 5,
            }}
          >
            <View
              style={[
                {
                  width: progress + "%",
                  backgroundColor: "#2CAF4D",
                  height: 4,
                },
              ]}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <Text style={{}}>{position}</Text>
          <Text style={{}}>{duration}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              if (progress == 0 || progress == 100) {
                return;
              }
              if (positionVal < 5) {
                TrackPlayer.seekTo(0);
              } else {
                TrackPlayer.seekTo(positionVal - 5);
              }
            }}
          >
            <Ionicons
              name="play-back-circle-outline"
              size={30}
              color={tintColor}
            />
          </TouchableOpacity>
          <View style={{ marginHorizontal: 15 }}>{temp()}</View>
          <TouchableOpacity
            onPress={() => {
              if (progress == 0 || progress == 100) {
                return;
              }
              if (positionVal < durationVal - 5) {
                TrackPlayer.seekTo(positionVal + 5);
              } else {
                TrackPlayer.seekTo(durationVal);
              }
            }}
          >
            <Ionicons
              name="play-forward-circle-outline"
              size={30}
              color={tintColor}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default ProgressBar;
