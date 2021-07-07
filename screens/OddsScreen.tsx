import * as React from 'react';
import { StyleSheet, ViewProps } from 'react-native';

import { Text, TabView, View, DropDownPicker, LoadingSpinner } from '../components/Themed';
import OddsBoardComponent from '../components/OddsBoardComponent';
import ScrollableTabNavigator from '../navigation/ScrollableTabNavigator';
import { Game, League } from '../types';
import * as API from '../services/api';

interface OddsScreenState {
  activeLeague: number,
  leagues: League[],
  oddsBoardData: Game[],
  isLoadingGameData: boolean,
  type: any,
  types: any[],
  location: any,
  locations: any[],
};

const BET_MARKETS = [
  {label: 'Spread', value: 'Spread'},
  {label: 'Money Line', value: 'MoneyLine'},
  {label: 'Over/Under', value: 'OverUnder'},
];

const BET_LOCATIONS = ['CO', 'DC', 'IA', 'IL', 'IN', 'MI', 'NJ', 'NV', 'PA', 'TN', 'VA', 'WV'];

export default class OddsScreen extends React.Component<{}, OddsScreenState> {
  state: Readonly<OddsScreenState> = {
    activeLeague: 0,
    leagues: [],
    oddsBoardData: [],
    isLoadingGameData: false,
    type: null,
    types: BET_MARKETS,
    location: null,
    locations: BET_LOCATIONS.map((location: string) => ({label: location, value: location})),
  };

  constructor(props: ViewProps) {
    super(props);

    this.setType = this.setType.bind(this);
    this.setLocation = this.setLocation.bind(this);
  }

  componentDidMount() {
    this.setState({type: this.state.types[0].value, location: this.state.locations[0].value});

    API.getSportsForOdds().then((leagues) => {
      this.setState(() => ({leagues: leagues}), () => {
        this.loadGameData();
      });
    });
  }

  onLeagueChanged(i: number) {
    if (this.state.activeLeague !== i) {
      this.setState(() => ({activeLeague: i}), () => {
        this.loadGameData();
      });
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

  loadGameData() {
    this.setState(() => ({isLoadingGameData: true, oddsBoardData: []}));

    // Check league name
    if (this.state.activeLeague >= this.state.leagues.length) return;
    const leagueName = this.state.leagues[this.state.activeLeague].Name;

    // Retrieve game data for selected leage
    console.log(`Retrieving game odds feed for ${leagueName}`);
    API.getOddsData(leagueName).then((data: Game[]) => {
      this.setState(() => ({oddsBoardData: data}));
    }).catch(err => {
      console.error(err);
      this.setState(() => ({oddsBoardData: []}));
    }).finally(() => {
      this.setState(() => ({isLoadingGameData: false}));
    });
  }

  render() {
    const state = this.state;

    return (
      <View style={styles.container}>
        <ScrollableTabNavigator onChangeTab={({i}: {i:number}) => this.onLeagueChanged(i)}>
          {state.leagues.map((league, index) =>
            <TabView style={styles.view} key={league.Value} tabLabel={league.Name}>
              <View style={styles.selectGroup}>
                <View style={styles.select}>
                  <Text style={styles.selectLabel}>Type</Text>
                  <DropDownPicker
                    value={state.type}
                    items={state.types}
                    setValue={this.setType} />
                </View>
                <View style={{width: 28}} />
                <View style={styles.select}>
                  <Text style={styles.selectLabel}>State</Text>
                  <DropDownPicker
                    value={state.location}
                    items={state.locations}
                    setValue={this.setLocation} />
                </View>
              </View>
              {state.isLoadingGameData ? (
                <LoadingSpinner />
              ) : (
                <OddsBoardComponent data={state.oddsBoardData}
                  league={league.Name} market={state.type} location={state.location} />
              )}
            </TabView>
          )}
        </ScrollableTabNavigator>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    padding: 16,
  },
  view: {
    flex: 1,
    justifyContent: 'flex-start',
    overflow: 'scroll',
  },
  selectGroup: {
    flexDirection: 'row',
    paddingTop: 8,
    paddingBottom: 8,
    zIndex: 10,
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
  table: {
  },
  tableWrapper: {
    flexDirection: 'row',
  },
  columnHeader: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 24,
    paddingRight: 24,
  },
  columnHeaderText: {
    fontWeight: '800',
    fontSize: 12,
    lineHeight: 12,
    letterSpacing: 1.5,
    paddingTop: 4,
    paddingBottom: 4,
    textTransform: 'uppercase',
  }
});
