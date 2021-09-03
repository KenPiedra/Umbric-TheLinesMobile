import * as React from "react";
import { StyleSheet, ViewProps, SafeAreaView } from "react-native";
import DropDownPicker, {
  DropDownPickerProps,
  ItemType,
} from "react-native-dropdown-picker";
import axios from "axios";

import { Text, View, LoadingSpinner } from "../components/Themed";
import * as API from "../services/api";
import { BettingMarket } from "../types/Future";
import FutureComponent from "../components/FutureComponent";

interface FutureScreenState {
  futureData: BettingMarket[];
  isLoadingGameData: boolean;
  type: any;
  types: any[];
  location: any;
  locations: any[];
  isTypeOpen: boolean;
  isLocationOpen: boolean;
}

const FUTURE_BET_TYPES = [
  // { label: "Team Futures", value: "Team" },
  {
    label: "NFL Championship Winner",
    value: "NFL Championship Winner",
    parent: "Team",
  },
  {
    label: "To Make the Playoffs",
    value: "To Make the Playoffs",
    parent: "Team",
  },
  { label: "Win Total", value: "Win Total", parent: "Team" },
  {
    label: "AFC East Division Winner",
    value: "AFC East Division Winner",
    parent: "Team",
  },
  {
    label: "AFC North Division Winner",
    value: "AFC North Division Winner",
    parent: "Team",
  },
  {
    label: "AFC South Division Winner",
    value: "AFC South Division Winner",
    parent: "Team",
  },
  {
    label: "AFC West Division Winner",
    value: "AFC West Division Winner",
    parent: "Team",
  },
  {
    label: "NFC East Division Winner",
    value: "NFC East Division Winner",
    parent: "Team",
  },
  {
    label: "NFC North Division Winner",
    value: "NFC North Division Winner",
    parent: "Team",
  },
  {
    label: "NFC South Division Winner",
    value: "NFC South Division Winner",
    parent: "Team",
  },
  {
    label: "NFC West Division Winner",
    value: "NFC West Division Winner",
    parent: "Team",
  },
  { label: "AFC Champion", value: "AFC Champion", parent: "Team" },
  { label: "NFC Champion", value: "NFC Champion", parent: "Team" },

  // {
  //   label: "Total Rushing Yards",
  //   value: "Total Rushing Yards1",
  //   parent: "Team",
  // },

  // {
  //   label: "Winning Conference - NFL Championship",
  //   value: "Winning Conference - NFL Championship",
  //   parent: "Team",
  // },
  // {
  //   label: "Winning Division - NFL Championship",
  //   value: "Winning Division - NFL Championship",
  //   parent: "Team",
  // },
  // { label: "Best Record", value: "Best Record", parent: "Team" },
  // { label: "Worst Record", value: "Worst Record", parent: "Team" },
  // {
  //   label: "To Score Most Points",
  //   value: "To Score Most Points",
  //   parent: "Team",
  // },
  // {
  //   label: "To Score Least Points",
  //   value: "To Score Least Points",
  //   parent: "Team",
  // },
  // {
  //   label: "To Concede Least Points",
  //   value: "To Concede Least Points",
  //   parent: "Team",
  // },
  // { label: "Sack Leader", value: "Sack Leader1", parent: "Team" },
  // { label: "AFC #1 Seed", value: "AFC #1 Seed", parent: "Team" },
  // { label: "NFC #1 Seed", value: "NFC #1 Seed", parent: "Team" },
  // { label: "Last Team to Lose", value: "Last Team to Lose", parent: "Team" },
  // { label: "AFC Wildcard Team", value: "AFC Wildcard Team", parent: "Team" },
  // { label: "Team to Go 0-17", value: "Team to Go 0-17", parent: "Team" },
  // { label: "Team to Go 17-0", value: "Team to Go 17-0", parent: "Team" },
  // {
  //   label: "Team to Go 20-0 and Win Super Bowl",
  //   value: "Team to Go 20-0 and Win Super Bowl",
  //   parent: "Team",
  // },
  // {
  //   label: "To Reach NFC Championship Game",
  //   value: "To Reach NFC Championship Game",
  //   parent: "Team",
  // },
  // {
  //   label: "To Win First 5 Games",
  //   value: "To Win First 5 Games",
  //   parent: "Team",
  // },
  // {
  //   label: "To Reach AFC Championship Game",
  //   value: "To Reach AFC Championship Game",
  //   parent: "Team",
  // },
  // {
  //   label: "To Have A Winning Record",
  //   value: "To Have A Winning Record",
  //   parent: "Team",
  // },
  // {
  //   label: "First Time Super Bowl Winner",
  //   value: "First Time Super Bowl Winner",
  //   parent: "Team",
  // },
  // {
  //   label: "Fewest Regular Season Wins",
  //   value: "Fewest Regular Season Wins",
  //   parent: "Team",
  // },
  // { label: "NFC Wildcard Team", value: "NFC Wildcard Team", parent: "Team" },
  // {
  //   label: "AFC East Third Place",
  //   value: "AFC East Third Place",
  //   parent: "Team",
  // },
  // {
  //   label: "AFC East Second Place",
  //   value: "AFC East Second Place",
  //   parent: "Team",
  // },
  // {
  //   label: "AFC East Fourth Place",
  //   value: "AFC East Fourth Place",
  //   parent: "Team",
  // },
  // {
  //   label: "AFC East Top 2 Finish",
  //   value: "AFC East Top 2 Finish",
  //   parent: "Team",
  // },
  // {
  //   label: "AFC North Second Place",
  //   value: "AFC North Second Place",
  //   parent: "Team",
  // },
  // {
  //   label: "AFC North Third Place",
  //   value: "AFC North Third Place",
  //   parent: "Team",
  // },
  // {
  //   label: "AFC North Fourth Place",
  //   value: "AFC North Fourth Place",
  //   parent: "Team",
  // },
  // {
  //   label: "AFC North Top 2 Finish",
  //   value: "AFC North Top 2 Finish",
  //   parent: "Team",
  // },
  // {
  //   label: "AFC South Second Place",
  //   value: "AFC South Second Place",
  //   parent: "Team",
  // },
  // {
  //   label: "AFC South Third Place",
  //   value: "AFC South Third Place",
  //   parent: "Team",
  // },
  // {
  //   label: "AFC South Fourth Place",
  //   value: "AFC South Fourth Place",
  //   parent: "Team",
  // },
  // {
  //   label: "AFC South Top 2 Finish",
  //   value: "AFC South Top 2 Finish",
  //   parent: "Team",
  // },
  // {
  //   label: "AFC West Second Place",
  //   value: "AFC West Second Place",
  //   parent: "Team",
  // },
  // {
  //   label: "AFC West Third Place",
  //   value: "AFC West Third Place",
  //   parent: "Team",
  // },
  // {
  //   label: "AFC West Fourth Place",
  //   value: "AFC West Fourth Place",
  //   parent: "Team",
  // },
  // {
  //   label: "AFC West Top 2 Finish",
  //   value: "AFC West Top 2 Finish",
  //   parent: "Team",
  // },
  // {
  //   label: "NFC East Top 2 Finish",
  //   value: "NFC East Top 2 Finish",
  //   parent: "Team",
  // },
  // {
  //   label: "NFC North Top 2 Finish",
  //   value: "NFC North Top 2 Finish",
  //   parent: "Team",
  // },
  // {
  //   label: "NFC North Second Place",
  //   value: "NFC North Second Place",
  //   parent: "Team",
  // },
  // {
  //   label: "NFC North Third Place",
  //   value: "NFC North Third Place",
  //   parent: "Team",
  // },
  // {
  //   label: "NFC North Fourth Place",
  //   value: "NFC North Fourth Place",
  //   parent: "Team",
  // },
  // {
  //   label: "NFC South Second Place",
  //   value: "NFC South Second Place",
  //   parent: "Team",
  // },
  // {
  //   label: "NFC South Third Place",
  //   value: "NFC South Third Place",
  //   parent: "Team",
  // },
  // {
  //   label: "NFC South Fourth Place",
  //   value: "NFC South Fourth Place",
  //   parent: "Team",
  // },
  // {
  //   label: "NFC South Top 2 Finish",
  //   value: "NFC South Top 2 Finish",
  //   parent: "Team",
  // },
  // {
  //   label: "NFC West Second Place",
  //   value: "NFC West Second Place",
  //   parent: "Team",
  // },
  // {
  //   label: "NFC West Third Place",
  //   value: "NFC West Third Place",
  //   parent: "Team",
  // },
  // {
  //   label: "NFC West Fourth Place",
  //   value: "NFC West Fourth Place",
  //   parent: "Team",
  // },
  // {
  //   label: "NFC West Top 2 Finish",
  //   value: "NFC West Top 2 Finish",
  //   parent: "Team",
  // },
  // {
  //   label: "NFC East Second Place",
  //   value: "NFC East Second Place",
  //   parent: "Team",
  // },
  // {
  //   label: "NFC East Third Place",
  //   value: "NFC East Third Place",
  //   parent: "Team",
  // },
  // {
  //   label: "NFC East Fourth Place",
  //   value: "NFC East Fourth Place",
  //   parent: "Team",
  // },
  // { label: "Last Winless Team", value: "Last Winless Team", parent: "Team" },
  // {
  //   label: "To Win All 6 Division Games",
  //   value: "To Win All 6 Division Games",
  //   parent: "Team",
  // },
  // {
  //   label: "To Win All Home Games",
  //   value: "To Win All Home Games",
  //   parent: "Team",
  // },
  // {
  //   label: "To Win All Away Games",
  //   value: "To Win All Away Games",
  //   parent: "Team",
  // },
  // { label: "Player Futures", value: "Player" },
  // {
  //   label: "Defensive Player of the Year",
  //   value: "Defensive Player of the Year",
  //   parent: "Player",
  // },
  // {
  //   label: "Comeback Player of the Year",
  //   value: "Comeback Player of the Year",
  //   parent: "Player",
  // },
  // {
  //   label: "Offensive Rookie of the Year",
  //   value: "Offensive Rookie of the Year",
  //   parent: "Player",
  // },
  // {
  //   label: "Defensive Rookie of the Year",
  //   value: "Defensive Rookie of the Year",
  //   parent: "Player",
  // },
  // {
  //   label: "Total Passing Yards",
  //   value: "Total Passing Yards",
  //   parent: "Player",
  // },
  // {
  //   label: "Total Passing Touchdowns",
  //   value: "Total Passing Touchdowns",
  //   parent: "Player",
  // },
  // { label: "Total Sacks", value: "Total Sacks", parent: "Player" },
  // {
  //   label: "Total Rushing Yards",
  //   value: "Total Rushing Yards2",
  //   parent: "Player",
  // },
  // {
  //   label: "Total Rushing & Receiving Yards",
  //   value: "Total Rushing & Receiving Yards",
  //   parent: "Player",
  // },
  // {
  //   label: "Total Receiving Yards",
  //   value: "Total Receiving Yards",
  //   parent: "Player",
  // },
  // {
  //   label: "Total Receiving Touchdowns",
  //   value: "Total Receiving Touchdowns",
  //   parent: "Player",
  // },
  // {
  //   label: "Offensive Player of the Year",
  //   value: "Offensive Player of the Year",
  //   parent: "Player",
  // },
  // { label: "MVP", value: "MVP", parent: "Player" },
  // {
  //   label: "Interceptions Thrown",
  //   value: "Interceptions Thrown",
  //   parent: "Player",
  // },
  // {
  //   label: "New England Patriots Starting Quarterback - Week 1",
  //   value: "New England Patriots Starting Quarterback - Week 1",
  //   parent: "Player",
  // },
  // {
  //   label: "Total Rushing Touchdowns",
  //   value: "Total Rushing Touchdowns",
  //   parent: "Player",
  // },
  // { label: "Rushing TD Leader", value: "Rushing TD Leader", parent: "Player" },
  // {
  //   label: "QB Interception Leader",
  //   value: "QB Interception Leader",
  //   parent: "Player",
  // },
  // {
  //   label: "Most Passing Touchdowns",
  //   value: "Most Passing Touchdowns",
  //   parent: "Player",
  // },
  // {
  //   label: "Most Receiving Touchdowns",
  //   value: "Most Receiving Touchdowns",
  //   parent: "Player",
  // },
  // {
  //   label: "Most Passing Yards",
  //   value: "Most Passing Yards",
  //   parent: "Player",
  // },
  // {
  //   label: "Most Rushing Yards",
  //   value: "Most Rushing Yards",
  //   parent: "Player",
  // },
  // {
  //   label: "Most Receiving Yards",
  //   value: "Most Receiving Yards",
  //   parent: "Player",
  // },
  // { label: "Sack Leader", value: "Sack Leader2", parent: "Player" },
  // {
  //   label: "Most Tackles Leader (Solo & Assists)",
  //   value: "Most Tackles Leader (Solo & Assists)",
  //   parent: "Player",
  // },
  // { label: "Receptions Leader", value: "Receptions Leader", parent: "Player" },
  // { label: "Total Receptions", value: "Total Receptions", parent: "Player" },
  // {
  //   label: "New Orleans Saints Starting Quarterback - Week 1",
  //   value: "New Orleans Saints Starting Quarterback - Week 1",
  //   parent: "Player",
  // },
  // {
  //   label: "Denver Broncos Starting QB - Week 1",
  //   value: "Denver Broncos Starting QB - Week 1",
  //   parent: "Player",
  // },
  // {
  //   label: "To Break Single-Season Receiving Yard Record",
  //   value: "To Break Single-Season Receiving Yard Record",
  //   parent: "Player",
  // },
  // {
  //   label: "To Break Rookie TE Receiving Yard Record",
  //   value: "To Break Rookie TE Receiving Yard Record",
  //   parent: "Player",
  // },
  // {
  //   label: "To Break Single-Season Rushing Yards Record",
  //   value: "To Break Single-Season Rushing Yards Record",
  //   parent: "Player",
  // },
  // { label: "To Not Miss A FG", value: "To Not Miss A FG", parent: "Player" },
  // {
  //   label: "To Break Single-Season QB Rushing Touchdown Record",
  //   value: "To Break Single-Season QB Rushing Touchdown Record",
  //   parent: "Player",
  // },
  // {
  //   label: "To Break Single-Season Passing Yards Record",
  //   value: "To Break Single-Season Passing Yards Record",
  //   parent: "Player",
  // },
  // {
  //   label: "To Break Single-Season Passing Touchdowns Record",
  //   value: "To Break Single-Season Passing Touchdowns Record",
  //   parent: "Player",
  // },
  // {
  //   label: "To Break Single-Season Sacks Record",
  //   value: "To Break Single-Season Sacks Record",
  //   parent: "Player",
  // },
  // {
  //   label: "To Break Personal Single-Season Passing TD Record",
  //   value: "To Break Personal Single-Season Passing TD Record",
  //   parent: "Player",
  // },
  // {
  //   label: "To Break Single-Season Rookie Passing Yards Record",
  //   value: "To Break Single-Season Rookie Passing Yards Record",
  //   parent: "Player",
  // },
  // {
  //   label: "Most Rushing Touchdowns",
  //   value: "Most Rushing Touchdowns",
  //   parent: "Player",
  // },
  // {
  //   label: "Most Interceptions Thrown",
  //   value: "Most Interceptions Thrown",
  //   parent: "Player",
  // },
];
const FUTURE_LOCATIONS = [
  { label: "CO", value: "CO" },
  { label: "DC", value: "DC" },
  { label: "IA", value: "IA" },
  { label: "IL", value: "IL" },
  { label: "IN", value: "IN" },
  { label: "MI", value: "MI" },
  { label: "NJ", value: "NJ" },
  { label: "NV", value: "NV" },
  { label: "PA", value: "PA" },
  { label: "TN", value: "TN" },
  { label: "VA", value: "VA" },
  { label: "WV", value: "WV" },
];

export default class FutureScreen extends React.Component<
  {},
  FutureScreenState
> {
  state: Readonly<FutureScreenState> = {
    futureData: [],
    isLoadingGameData: false,
    type: null,
    types: FUTURE_BET_TYPES,
    location: null,
    locations: FUTURE_LOCATIONS,
    isTypeOpen: false,
    isLocationOpen: false,
  };

  constructor(props: ViewProps) {
    super(props);
  }

  componentDidMount() {
    this.setState({
      type: this.state.types[0].value,
      location: this.state.locations[0].value,
    });

    // const url = `https://us1.catenaus.com/api/v2/app/oddsfeed/nfl/futures`;
    // axios({ url, method: "get", responseType: "json" }).then((data: any) => {
    //   const bettingTypesPlayer: string[] = [];
    //   const bettingTypesTeam: string[] = [];

    //   console.log(data.data.slice(1));
    //   data.data.slice(1).map((item) => {
    //     if (item.BettingMarketType == "Player Future") {
    //       if (!bettingTypesPlayer.includes(item.BettingBetType)) {
    //         bettingTypesPlayer.push(item.BettingBetType);
    //       }
    //     }
    //     if (item.BettingMarketType == "Team Future") {
    //       if (!bettingTypesTeam.includes(item.BettingBetType)) {
    //         bettingTypesTeam.push(item.BettingBetType);
    //       }
    //     }
    //   });
    //   console.log(bettingTypesTeam);
    //   console.log(bettingTypesPlayer);
    // });
  }

  loadGameData() {
    this.setState({ isLoadingGameData: true, futureData: [] });
    API.getFutureData(this.state.type)
      .then((data) => {
        console.log("%%%%%", data);
        this.setState({ futureData: data });
      })
      .catch((err) => {
        console.error(err);
        this.setState({ futureData: [] });
      })
      .finally(() => {
        this.setState({ isLoadingGameData: false });
      });
  }

  renderNoOdds() {
    return (
      <View style={styles.emptyOdds}>
        <Text
          style={styles.errorText}
        >{`We don't have any odds for upcoming ${this.props.league} games.`}</Text>
      </View>
    );
  }

  render() {
    const {
      location,
      locations,
      type,
      types,
      isTypeOpen,
      isLocationOpen,
      isLoadingGameData,
    } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container}>
            <View style={styles.selectGroup}>
              <Text style={styles.selectLabel}>Type</Text>
              <DropDownPicker
                zIndex={2000}
                categorySelectable={false}
                value={type}
                items={types}
                open={isTypeOpen}
                setOpen={(open) => this.setState({ isTypeOpen: open })}
                setValue={(callback) =>
                  this.setState((state) => ({ type: callback(state.type) }))
                }
                onChangeValue={() => this.loadGameData()}
              />
              {/* <View style={{ height: 14 }} />
              <Text style={styles.selectLabel}>State</Text>
              <DropDownPicker
                zIndex={1000}
                value={location}
                items={locations}
                open={isLocationOpen}
                setOpen={(open) => this.setState({ isLocationOpen: open })}
                setValue={(callback) =>
                  this.setState((state) => ({
                    location: callback(state.location),
                  }))
                }
                onChangeValue={() => this.loadGameData()}
              /> */}
            </View>
            <View style={{ height: 20 }} />
            {isLoadingGameData ? (
              <LoadingSpinner />
            ) : (
              <FutureComponent data={this.state.futureData} league="nfl" />
            )}
          </View>
        </SafeAreaView>
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
  borderStyle: {
    borderColor: "#474747",
    borderWidth: 1,
  },
  emptyOdds: {
    alignItems: "center",
    width: "90%",
  },
  errorText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
  },
});
