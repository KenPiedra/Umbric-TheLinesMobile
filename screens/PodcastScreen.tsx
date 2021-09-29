import * as React from "react";
import { FlatList, StyleSheet } from "react-native";

import { Text, View, TabView, SmallLoadingSpinner } from "../components/Themed";
import PodcastListItem from "../components/PodcastListItem";
import ScrollableTabNavigator from "../navigation/ScrollableTabNavigator";
import * as API from "../services/api";
import { PodcastItemData } from "../types/Podcast";
import { NewCategoriesData } from "../types/News";
type PodCastScreenState = {
  activeCategory: number;
  categories: Array<NewCategoriesData>;
  data: Array<PodcastItemData>;
  error: Object | null;
  loading: boolean;
  loadingMore: boolean;
  noMoreLoad: boolean;
  refreshing: boolean;
};

export default class PodcastScreen extends React.Component<
  {},
  PodCastScreenState
> {
  state = {
    activeCategory: -1,
    categories: new Array<NewCategoriesData>(),
    data: new Array<PodcastItemData>(),
    error: null,
    loading: true,
    loadingMore: false,
    noMoreLoad: false,
    refreshing: false,
  };

  _fetchPodcasts = (PostedAt: string | null) => {
    let categoryId = this.state.categories[this.state.activeCategory].Id;
    const ItemsToLoad = 10;
    API.getPodcasts(categoryId, ItemsToLoad, PostedAt)
      .then((items) => {
        let newData = this.state.refreshing
          ? items
          : [...this.state.data, ...items];
        this.setState({
          data: newData,
          noMoreLoad: items.length < ItemsToLoad,
        });
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        this.setState({
          loading: false,
          loadingMore: false,
          refreshing: false,
        });
      });
  };

  _handleLoadMore() {
    if (!this.state.noMoreLoad) {
      let lastItemTime: any = null;
      if (this.state.data.length > 0) {
        lastItemTime = this.state.data.slice(-1)[0]["PostedAtIso"];
      }
      this.setState({ loadingMore: true }, () =>
        this._fetchPodcasts(lastItemTime)
      );
    }
  }

  _handleRefresh = () => {
    this.setState(
      {
        refreshing: true,
      },
      () => {
        this._fetchPodcasts(null);
      }
    );
  };

  componentDidMount() {
    this.setState({ categories: API.getNewsCategories() });
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
        <ScrollableTabNavigator
          onChangeTab={({ i }: { i: number }) => this.onCategoryChanged(i)}
        >
          {this.state.categories.map((category, index) =>
            this.state.data.length > 0 || this.state.refreshing ? (
              <FlatList
                key={index}
                tabLabel={category.Name}
                contentContainerStyle={styles.wrap}
                data={this.state.data}
                initialNumToRender={10}
                renderItem={({ item }) => <PodcastListItem data={item} />}
                keyExtractor={(item, index) => index.toString()}
                onEndReached={() => {
                  console.log("reached end");
                  if (!this.state.loadingMore) {
                    this._handleLoadMore();
                  }
                }}
                onEndReachedThreshold={0.5}
                onRefresh={this._handleRefresh}
                refreshing={this.state.refreshing}
                ListFooterComponent={() =>
                  this.state.loadingMore && !this.state.refreshing ? (
                    <View style={styles.loadingMore}>
                      <SmallLoadingSpinner />
                    </View>
                  ) : null
                }
              />
            ) : (
              <TabView
                style={styles.view}
                key={category.Id}
                tabLabel={category.Name}
              >
                <View style={styles.emptyOdds}>
                  <Text style={styles.errorText}>
                    {index === 0
                      ? `We don't have any Podcasts`
                      : `We don't have any Podcast for ${
                          this.state.categories[this.state.activeCategory]?.Id
                        }.`}
                  </Text>
                </View>
              </TabView>
            )
          )}
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

  emptyOdds: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  errorText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    width: "80%",
  },
  view: {
    flex: 1,
    justifyContent: "flex-start",
    overflow: "scroll",
  },
  loadingMore: {
    width: "100%",
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});
