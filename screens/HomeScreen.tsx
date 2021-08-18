import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

import { Text, View, useThemeColor } from "../components/Themed";
import SearchBox from "../components/Searchbox";
import SportExploreItem from "../components/SportExploreItem";
import EventExploreItem from "../components/EventExploreItem";
import NewsExploreItem from "../components/NewsExploreItem";
import { BottomTabParamList } from "../types/Navigation";
import * as API from "../services/api";
import { NewsItemData } from "../types/News";
import { League } from "../types";

export default function HomeScreen() {
  const leagues = API.getSportsForOdds();
  const [trendingNews, settrendingNews] = useState<NewsItemData[]>([]);
  const [sportData, setsportData] = useState<League[]>([]);
  const bgcolor = useThemeColor({}, "background");
  const navigation =
    useNavigation<BottomTabNavigationProp<BottomTabParamList>>();

  useEffect(() => {
    API.getNews("", 5, null).then((result) => settrendingNews(result));
    const sports = ["NFL", "NBA", "CFB", "MLB"];
    const filtered = API.getSportsForOdds().filter((value) =>
      sports.includes(value.Name)
    );
    setsportData(filtered);
  }, [navigation]);

  return (
    <ScrollView style={[styles.container, { backgroundColor: bgcolor }]}>
      <Text style={styles.explore}>Explore</Text>
      <SearchBox placeholder="Search The Lines" />
      <Text style={styles.sport}>Sports</Text>
      <View style={{ flexDirection: "row" }}>
        <SportExploreItem item={sportData[0]} />
        <View style={{ width: 15 }} />
        <SportExploreItem item={sportData[1]} />
      </View>
      <View style={{ flexDirection: "row", marginTop: 12 }}>
        <SportExploreItem item={sportData[2]} />
        <View style={{ width: 15 }} />
        <SportExploreItem item={sportData[3]} />
      </View>
      <Text style={styles.upcoming}>Upcoming Events</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {leagues.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Odds", {
                  screen: "OddsScreen",
                  params: { index },
                })
              }
              key={index}
            >
              <EventExploreItem item={item} />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <Text style={styles.upcoming}>Trending News</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {trendingNews.map((item: NewsItemData, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                navigate("News", { screen: "NewsScreen", params: { index } });
              }}
            >
              <NewsExploreItem item={item} />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  explore: {
    fontSize: 32,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 20,
  },
  sport: {
    fontSize: 32,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 16,
  },
  upcoming: {
    fontSize: 32,
    fontWeight: "700",
    marginTop: 32,
    marginBottom: 16,
  },
});
