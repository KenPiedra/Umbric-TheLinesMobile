import * as React from "react";
import { FlatList, StyleSheet } from "react-native";

import { Text, View, SmallLoadingSpinner } from "../components/Themed";
import NewsListItem from "../components/NewsListItem";
import ScrollableTabNavigator from "../navigation/ScrollableTabNavigator";
import * as API from "../services/api";
import { NewsItemData } from "../types/News";

export default class NewsScreen extends React.Component {
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

  _fetchNews = (PostedAt: string | null) => {
    let categoryId = this.state.categories[this.state.activeCategory].Id;
    const ItemsToLoad = 10;
    API.getNews(categoryId, ItemsToLoad, PostedAt)
      .then((newItems) => {
        let newData = this.state.refreshing
          ? newItems
          : [...this.state.data, ...newItems];
        let filtered = newData.filter(
          (item, index, self) =>
            index ===
            self.findIndex(
              (t) => t.Title === item.Title && t.Author === item.Author
            )
        );
        this.setState({
          data: filtered,
          noMoreLoad: newItems.length < ItemsToLoad,
        });
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
        lastItemTime = this.state.data.slice(-1)[0]["PostedAtIso"];
      }
      this.setState({ loadingMore: true }, () => this._fetchNews(lastItemTime));
    }
  }

  _handleRefresh = () => {
    this.setState(
      {
        refreshing: true,
      },
      () => {
        this._fetchNews(null);
      }
    );
  };

  componentDidMount() {
    this.setState({ categories: API.getNewsCategories() });
  }

  onCategoryChanged(i: number) {
    if (this.state.activeCategory !== i) {
      this.setState(
        {
          activeCategory: i,
          data: [],
        },
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
          onChangeTab={({ i }: { i: number }) => {
            this.onCategoryChanged(i);
          }}
        >
          {this.state.categories.map((category, index) => (
            <FlatList
              key={index}
              tabLabel={category.Name}
              contentContainerStyle={styles.news}
              data={this.state.data}
              initialNumToRender={10}
              renderItem={({ item, index }) => (
                <NewsListItem
                  key={index}
                  data={item}
                  onClick={() => {
                    this.props.navigation.navigate("NewsDetail", {
                      link: item.DetailLink,
                    });
                  }}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
              onMomentumScrollEnd={() => this._handleLoadMore()}
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
  news: {
    // flex: 1,
    // flexDirection: 'column',
    // height: '100%',
    // width: '100%',
  },
  newsitem: {
    borderColor: "#1F2933",
    borderRadius: 16,
    borderWidth: 0.5,
    margin: 8,
  },
  loadingMore: {
    width: "100%",
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});
