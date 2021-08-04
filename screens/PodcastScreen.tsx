import * as React from "react";
import { FlatList, StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import PodcastListItem from "../components/PodcastListItem";
import ScrollableTabNavigator from "../navigation/ScrollableTabNavigator";
import * as API from "../services/api";

export default class PodcastScreen extends React.Component {
  state = {
    activeCategory: -1,
    categories: [],
    data: [],
    error: null,
    loading: true,
    loadingMore: false,
    noMoreLoad: false,
    refreshing: false,
  };

  _fetchPodcasts = (lastItemTime?: Date) => {
    let categoryId = this.state.categories[this.state.activeCategory].Id;
    const ItemsToLoad = 10;
    API.getPodcasts(categoryId, ItemsToLoad, lastItemTime)
      .then((items) => {
        let newData = this.state.refreshing
          ? items
          : [...this.state.data, ...items];
        this.setState((prevState, nextProps) => ({
          data: newData,
          noMoreLoad: items.length < ItemsToLoad,
        }));
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        this.setState((prevState, nextProps) => ({
          loading: false,
          loadingMore: false,
          refreshing: false,
        }));
      });
  };

  _handleLoadMore() {
    if (!this.state.noMoreLoad) {
      let lastItemTime: any = null;
      if (this.state.data.length > 0) {
        lastItemTime = this.state.data.slice(-1)[0]["PostedAt"];
      }

      this.setState(
        (prevState, nextProps) => ({ loadingMore: true }),
        () => this._fetchPodcasts(lastItemTime)
      );
    }
  }

  _handleRefresh = () => {
    this.setState(
      {
        refreshing: true,
      },
      () => {
        this._fetchPodcasts();
      }
    );
  };

  componentDidMount() {
      this.setState((prevState, nextProps) => ({
        categories: API.getNewsCategories(),
      }));
  }

  onCategoryChanged(i: number) {
    if (this.state.activeCategory !== i) {
      this.setState(
        () => ({
          activeCategory: i,
          data: [],
        }),
        () => {
          this._handleRefresh();
        }
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Podcast</Text>
        <ScrollableTabNavigator
          onChangeTab={({ i }: { i: number }) => this.onCategoryChanged(i)}
        >
          {this.state.categories.map((category, index) => (
            <FlatList
              key={index}
              tabLabel={category.Name}
              contentContainerStyle={styles.wrap}
              data={this.state.data}
              initialNumToRender={10}
              renderItem={({ item }) => <PodcastListItem data={item} />}
              keyExtractor={(item, index) => index.toString()}
              onEndReached={() => this._handleLoadMore()}
              onEndReachedThreshold={0.5}
              onRefresh={this._handleRefresh}
              refreshing={this.state.refreshing}
            />
          ))}
        </ScrollableTabNavigator>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start",
    margin: 0,
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 30,
  },
  wrap: {
    // flex: 1,
    // flexDirection: 'column',
    // height: '100%',
    // width: '100%',
  },
});
