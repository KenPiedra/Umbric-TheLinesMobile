import * as React from "react";
import { FlatList, StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import SportsbookListItem from "../components/SportsbookListItem";
import HamburgerIcon from "../components/HamburgerIcon";
import * as API from "../services/api";

export default class SportsbooksScreen extends React.Component {
  static navigationOptions = {
    title: "Welcome",
    headerLeft: <HamburgerIcon />,
  };

  state = {
    data: [],
    error: null,
    loading: true,
    loadingMore: false,
    noMoreLoad: false,
    refreshing: false,
  };

  _fetchSportsbooks = () => {
    const ItemsToLoad = 10;
    API.getSportsBooks(ItemsToLoad)
      .then((items) => {
        let data = this.state.refreshing
          ? items
          : [...this.state.data, ...items];
        this.setState({
          data: data,
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
      this.setState({ loadingMore: true }, () => this._fetchSportsbooks());
    }
  }

  _handleRefresh = () => {
    this.setState(
      {
        refreshing: true,
      },
      () => {
        this._fetchSportsbooks();
      }
    );
  };

  componentDidMount() {
    this._fetchSportsbooks();
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.wrap}
          data={this.state.data}
          initialNumToRender={10}
          renderItem={({ item, index }) => (
            <SportsbookListItem key={index} data={item} />
          )}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={() => this._handleLoadMore()}
          onEndReachedThreshold={0.5}
          onRefresh={this._handleRefresh}
          refreshing={this.state.refreshing}
        />
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
