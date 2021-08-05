import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

import { Text, View } from "../components/Themed";
import SearchBox from "../components/Searchbox";
import SportExploreItem from "../components/SportExploreItem";
import EventExploreItem from "../components/EventExploreItem";
import NewsExploreItem from "../components/NewsExploreItem";
import { BottomTabParamList } from "../types/Navigation";
import * as API from "../services/api";

export default function HomeScreen() {
  const leagues = API.getSportsForOdds();
  const { navigate } =
    useNavigation<BottomTabNavigationProp<BottomTabParamList>>();
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.explore}>Explore</Text>
      <SearchBox placeholder="Search The Lines" />
      <Text style={styles.sport}>Sports</Text>
      <View style={{ flexDirection: "row" }}>
        <SportExploreItem />
        <View style={{ width: 15 }} />
        <SportExploreItem />
      </View>
      <View style={{ flexDirection: "row", marginTop: 12 }}>
        <SportExploreItem />
        <View style={{ width: 15 }} />
        <SportExploreItem />
      </View>
      <Text style={styles.upcoming}>Upcoming Events</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {leagues.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigate("Odds", { screen: "OddsScreen", params: { index } })
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
        {[0, 1, 2, 3, 4, 5, 6].map((item, index) => {
          return <NewsExploreItem key={index} />;
        })}
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    marginBottom: 20,
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
