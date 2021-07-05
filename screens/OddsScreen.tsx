import * as React from 'react';
import { StyleSheet, ViewProps } from 'react-native';

import { Text, View, DropDownPicker } from '../components/Themed';
import ScrollableTabNavigator from '../navigation/ScrollableTabNavigator';
import * as API from '../services/api';

export default class OddsScreen extends React.Component {
  state = {
    activeLeague: -1,
    leagues: [],
    data: [],
    selectedType: '',
    typeOpened: false,
    type: null,
    types: [
      {label: 'Spread', value: 'Spread'},
      {label: 'Money Line', value: 'MoneyLine'},
      {label: 'Over/Under', value: 'OverUnder'},
    ],
    location: null,
    locations: [
      {label: 'CO', value: 'CO'},
      {label: 'DC', value: 'DC'},
      {label: 'IA', value: 'IA'},
      {label: 'IL', value: 'IL'},
      {label: 'IN', value: 'IN'},
      {label: 'MI', value: 'MI'},
      {label: 'NJ', value: 'NJ'},
      {label: 'NV', value: 'NV'},
      {label: 'PA', value: 'PA'},
      {label: 'TN', value: 'TN'},
      {label: 'VA', value: 'VA'},
      {label: 'WV', value: 'WV'},
    ]
  };

  constructor(props: ViewProps) {
    super(props);

    this.setType = this.setType.bind(this);
    this.setLocation = this.setLocation.bind(this);
  }

  componentDidMount() {
    this.setState({type: this.state.types[0].value, location: this.state.locations[0].value});

    API.getSportsForOdds().then((leagues) => {
      this.setState((prevState, nextProps) => ({
        leagues: leagues
      }));
    });
  }

  onLeagueChanged(i: number) {
    if (this.state.activeLeague !== i) {
      this.setState(() => ({
        activeLeague: i
      }));
      this.refreshData();
    }
  }

  setType(callback: any) {
    this.setState((state: any) => ({
      type: callback(state.type)
    }));
  }

  setLocation(callback: any) {
    this.setState((state: any) => ({
      location: callback(state.location)
    }));
  }

  refreshData() {
    console.log(this.state.activeLeague);
    // API.getOddsData(this.state.activeLeague).then((value: object[]) => {
    //   console.log(value);
    // });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollableTabNavigator onChangeTab={({i}: {i:number}) => this.onLeagueChanged(i)}>
          {this.state.leagues.map((league, index) =>
            <View style={styles.view} key={league.Value} tabLabel={league.Name}>
              <View style={styles.selectGroup}>
                <View style={styles.select}>
                  <Text style={styles.selectLabel}>Type</Text>
                  <DropDownPicker
                    value={this.state.type}
                    items={this.state.types}
                    setValue={this.setType} />
                </View>
                <View style={{width: 28}} />
                <View style={styles.select}>
                  <Text style={styles.selectLabel}>State</Text>
                  <DropDownPicker
                    value={this.state.location}
                    items={this.state.locations}
                    setValue={this.setLocation} />
                </View>
              </View>
            </View>
          )}
        </ScrollableTabNavigator>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    margin: 0,
    padding: 16,
  },
  view: {
    flex: 1,
  },
  selectGroup: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 8,
  },
  select: {
    flex: 1,
  },
  selectLabel: {
    fontSize: 12,
    lineHeight: 24,
    textTransform: 'uppercase',
  },
  selectPicker: {
  },
});
