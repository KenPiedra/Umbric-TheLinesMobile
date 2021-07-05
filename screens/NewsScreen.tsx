import * as React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import NewsListItem from '../components/NewsListItem';
import ScrollableTabNavigator from '../navigation/ScrollableTabNavigator';
import * as API from '../services/api';

export default class NewsScreen extends React.Component {
  state = {
    activeCategory: -1,
    categories: [],
    data: [],
    error: null,
    loading: true,
    loadingMore: false,
    refreshing: false,
  };

  _fetchNews = (lastItemTime?: Date) => {
    let categoryId = this.state.categories[this.state.activeCategory].Id;
    API.getNews(categoryId, 10, lastItemTime)
      .then((newItems) => {
        let newData = this.state.refreshing ? newItems : [...this.state.data, ...newItems];
        this.setState((prevState, nextProps) => ({
          data: newData,
        }));
      })
      .catch((err) => {
        // console.error(err);
      })
      .finally(() => {
        this.setState((prevState, nextProps) => ({
          loading: false,
          loadingMore: false,
          refreshing: false,
        }));
      });
  }

  _handleLoadMore() {
    let lastItemTime: any = null;
    if (this.state.data.length > 0) {
      lastItemTime = this.state.data.slice(-1)[0]['PostedAt'];
    }

    this.setState((prevState, nextProps) => ({loadingMore: true}), () => this._fetchNews(lastItemTime));
  }

  _handleRefresh = () => {
    this.setState(
      {
        refreshing: true
      },
      () => {
        this._fetchNews();
      }
    );
  };

  componentDidMount() {
    API.getNewsCategories().then((categories) => {
      this.setState((prevState, nextProps) => ({
        categories: categories
      }));
    })
  }

  onCategoryChanged(i: number) {
    if (this.state.activeCategory !== i) {
      this.setState(() => ({
        activeCategory: i
      }));
      this._handleRefresh();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>News</Text>
        <ScrollableTabNavigator onChangeTab={({i}: {i:number}) => this.onCategoryChanged(i)}>
          {this.state.categories.map((category, index) =>
            <FlatList
              key={index} tabLabel={category.Name}
              contentContainerStyle={styles.news}
              data={this.state.data}
              initialNumToRender={10}
              renderItem={({item, index}) => <NewsListItem key={index} data={item} />}
              onEndReached={() => this._handleLoadMore()}
              onEndReachedThreshold={0.5}
              onRefresh={this._handleRefresh}
              refreshing={this.state.refreshing}
            />)}
        </ScrollableTabNavigator>
      </View>
    );
  }

  renderNewsItem(item: any) {
    return (
      <View style={styles.newsitem}>
        <Text>{item.Title}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    margin: 0,
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
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
    borderColor: '#1F2933',
    borderRadius: 16,
    borderWidth: 0.5,
    margin: 8,
  }
});