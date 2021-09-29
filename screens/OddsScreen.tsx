import * as React from "react";
import { StyleSheet, ViewProps } from "react-native";

import {
  Text,
  TabView,
  View,
  DropDownPicker,
  LoadingSpinner,
} from "../components/Themed";
import OddsBoardComponent from "../components/OddsBoardComponent";
import ScrollableTabNavigator from "../navigation/ScrollableTabNavigator";
import { Game, League } from "../types";
import * as API from "../services/api";

interface OddsScreenState {
  activeLeague: number;
  leagues: League[];
  allData: Game[][];
  oddsBoardData: Game[];
  isLoadingAll: boolean;
  isLoadingGameData: boolean;
  type: any;
  types: any[];
  location: any;
  locations: any[];
}

const BET_MARKETS = [
  { label: "Spread", value: "Spread" },
  { label: "Money Line", value: "MoneyLine" },
  { label: "Over/Under", value: "OverUnder" },
];

const BET_LOCATIONS = [
  "CO",
  "DC",
  "IA",
  "IL",
  "IN",
  "MI",
  "NJ",
  "NV",
  "PA",
  "TN",
  "VA",
  "WV",
];

export default class OddsScreen extends React.Component<{}, OddsScreenState> {
  state: Readonly<OddsScreenState> = {
    activeLeague: 0,
    leagues: [],
    allData: [],
    oddsBoardData: [],
    isLoadingAll: false,
    isLoadingGameData: false,
    type: null,
    types: BET_MARKETS,
    location: null,
    locations: BET_LOCATIONS.map((location: string) => ({
      label: location,
      value: location,
    })),
  };

  constructor(props: ViewProps) {
    super(props);
    this.setType = this.setType.bind(this);
    this.setLocation = this.setLocation.bind(this);
  }

  componentDidMount() {
    this.setState(
      {
        isLoadingAll: true,
        type: this.state.types[0].value,
        location: this.state.locations[0].value,
        leagues: API.getSportsForOdds(),
      },
      () => {
        API.getOddsData(this.state.leagues)
          .then((data: Game[][]) => {
            this.setState(() => ({ allData: data, oddsBoardData: data[0] }));
          })
          .catch((err) => {
            console.error(err);
            this.setState(() => ({ allData: [] }));
          })
          .finally(() => {
            this.setState(() => ({ isLoadingAll: false }));
          });
      }
    );
  }

  onLeagueChanged(i: number) {
    console.log("i value", i);
    console.log("active league value", this.state.activeLeague);
    if (this.state.activeLeague !== i) {
      this.setState({ activeLeague: i, oddsBoardData: this.state.allData[i] });
    }
  }

  setType(callback: any) {
    this.setState((state: any) => ({
      type: callback(state.type),
    }));
  }

  setLocation(callback: any) {
    this.setState((state: any) => ({
      location: callback(state.location),
    }));
  }

  loadGameData(i: number) {
    if (this.state.activeLeague >= this.state.leagues.length) return;
    this.setState({});
    // Check league name
  }

  render() {
    const state = this.state;
    console.log("Odd screen", state);
    return (
      <View style={styles.container}>
        {state.isLoadingAll ? (
          <LoadingSpinner />
        ) : (
          <ScrollableTabNavigator
            onChangeTab={({ i }: { i: number }) => this.onLeagueChanged(i)}
            locked={true}
          >
            {state.leagues.map((league, index) => (
              <TabView
                style={styles.view}
                key={index.toString()}
                tabLabel={league.Name}
              >
                <View style={styles.selectGroup}>
                  <View style={styles.select}>
                    <Text style={styles.selectLabel}>Type</Text>
                    <DropDownPicker
                      value={state.type}
                      items={state.types}
                      setValue={this.setType}
                    />
                  </View>
                </View>

                <OddsBoardComponent
                  data={state.oddsBoardData}
                  league={league.Name}
                  market={state.type}
                />
              </TabView>
            ))}
          </ScrollableTabNavigator>
        )}
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
    justifyContent: "flex-start",
    overflow: "scroll",
  },
  selectGroup: {
    flexDirection: "row",
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
    textTransform: "uppercase",
  },
  selectPicker: {},
  table: {},
  tableWrapper: {
    flexDirection: "row",
  },
  columnHeader: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 24,
    paddingRight: 24,
  },
  columnHeaderText: {
    fontWeight: "800",
    fontSize: 12,
    lineHeight: 12,
    letterSpacing: 1.5,
    paddingTop: 4,
    paddingBottom: 4,
    textTransform: "uppercase",
  },
});
