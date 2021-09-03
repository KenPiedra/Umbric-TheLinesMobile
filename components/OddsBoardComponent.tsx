import * as React from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import { Table, Row } from "react-native-table-component";
import { Text, TouchableWithNavigation, View, ViewProps } from "./Themed";
import { Game, GameOdd } from "../types";
import * as API from "../services/api";
import { SportBookItemType } from "../types/Sportsbooks";

type BetStyle = "modern" | "vegas" | "classic" | undefined;
type Market = "Spread" | "MoneyLine" | "OverUnder" | undefined;

interface OddsBoardProps extends ViewProps {
  betStyle: BetStyle;
  market: Market;
  league: string;
  data: Game[];
  showConsensus: boolean;
}

type OddBoardState = {
  showSecondCol: boolean;
  providers: SportBookItemType[];
  games: Game[];
  rendering: boolean;
};
/**
 * Following values came from https://go.metabet.io/js/global.js?siteID=thelines&ver=5.7.2
 */
const RUWT_ENABLE_OUTBOUND_LINKS = true;
const RUWT_REDIRECT_URL = "https://thelines.go.metabet.io/bet/";
const RUWT_SITE_FAMILY_CATENA = true;
const RUWT_STALE_ODDS_CUTOFF = 1000 * 60 * 60 * 24 * 60;

/**
 * Decoded from https://go.metabet.io/js/global.js?siteID=thelines&ver=5.7.2, Line 5142
 * @param value number
 * @returns the passed-in numerical value with an appeded plus sign
 * if positive, to properly display positive spreads and money lines.
 * If the value isn't numerical, the empty string will be returned.
 */
function mb_formatWithSign(value: number) {
  if (value != null && !isNaN(value)) {
    return (value > 0 ? "+" : "") + value;
  }
  return "";
}

/**
 * Decoded from https://go.metabet.io/js/global.js?siteID=thelines&ver=5.7.2, Line 5154
 * @param value number
 * @returns the passed in numerical spread values and appended plus sign
 * if positive, and rounds the number to the closest 0.5 value.
 * If the spread is even, "PK" will be returned.
 * If the value isn't numerical, the empty string will be returned.
 */
function mb_formatSpread(value: number) {
  if (value != null && !isNaN(value)) {
    value = Math.round(value * 2) / 2;
    if (value == 0) {
      return "PK";
    } else {
      return mb_formatWithSign(value);
    }
  }
  return "";
}

export default class OddsBoardComponent extends React.Component<
  OddsBoardProps,
  OddBoardState
> {
  static defaultProps = {
    betStyle: "classic",
    showConsensus: false,
  };
  state = {
    showSecondCol: false,
    providers: [],
    games: [],
    rendering: false,
  };
  componentDidMount() {
    this.setState({ rendering: true });
    this.getOddsBoardData();
  }
  async mb_getProvidersForLocation() {
    let providers: SportBookItemType[] = await API.getSportsbooks();
    const filtered: SportBookItemType[] = providers.filter(
      (item: SportBookItemType) => !!item.logo
    );
    const ruleAry = {
      DraftKings: 1,
      BetMGM: 2,
      Caesars: 3,
      FanDuel: 4,
      UNIBET: 5,
      PointsBet: 6,
      FoxBet: 7,
      SugarHouse: 8,
      "888Sportsbook": 9,
    };

    let nicNames: string[] = [];
    for (let i = 0; i < filtered.length; i++) {
      const element = filtered[i];
      if (!nicNames.includes(element.nice_name)) {
        nicNames.push(element.nice_name);
      } else {
        filtered.splice(i, 1);
        continue;
      }
      element.sortId = ruleAry[element.nice_name]
        ? ruleAry[element.nice_name]
        : 100;
    }
    filtered.sort((a, b) => {
      if (!!!a.sortId && !!!b.sortId) {
        return 1;
      } else if (!!!a.sortId && b.sortId) {
        return -1;
      } else if (a.sortId && b.sortId) {
        return a.sortId - b.sortId;
      }
      return 1;
    });
    return filtered;
  }

  mb_hasGameStarted(game: Game): boolean {
    throw new Error("Not implemented");
  }

  mb_isGameFinished(game: Game): boolean {
    let endDateTime = new Date(game.GameEndDateTime),
      now = new Date();
    if (endDateTime.getTime() > 0 && endDateTime < now) {
      return true;
    }
    return false;
  }

  async getOddsBoardData() {
    let providers = await this.mb_getProvidersForLocation();

    // Calculate the end date of the window of games to display
    let endDate = new Date();
    if (this.props.data.length > 0) {
      let game = this.props.data[0];
      // By default, the end date will be a week after the first game
      endDate.setTime(new Date(game.Day).getTime() + 1000 * 60 * 60 * 24 * 6.5);
    }

    // Filter and trim full list of games
    let games = this.props.data.filter((game: Game): boolean => {
      // Ignore games too far out in the future
      if (new Date(game.Day) > endDate) {
        return false;
      }

      // // Ignore games that have started, if we're not showing
      // // games that are in progress
      // if (!RUWT_ODDS_BOARD_SHOW_IN_PROGRESS_GAMES && this.hasGameStarted(game)) {
      //   continue;
      // }

      // Ignore games that have already ended
      if (this.mb_isGameFinished(game)) {
        return false;
      }

      // Only include this game if it has odds posted from one of the providers
      // we want to display
      for (let odd of game.PregameOdds) {
        if (
          providers
            .map((provider) => provider.SportsDataId)
            .includes(odd.SportsbookId)
        ) {
          return true;
        }
      }

      return false;
    });
    // Add empty string into providers for row header cell
    const virtualProvider = {
      _id: -1,
      SportsDataId: -1,
      Sportsbook: "",
      list_offer: false,
      nice_name: "",
    };
    providers.unshift(virtualProvider);
    this.setState({ providers, games, rendering: false });
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

  renderImage(id: number) {
    if (id === 7) {
      return (
        <Image
          source={require("../assets/images/DraftKings.png")}
          style={{ width: "100%", height: "100%", resizeMode: "contain" }}
        />
      );
    }
    if (id === 21) {
      return (
        <Image
          source={require("../assets/images/BetMGM.png")}
          style={{ width: "100%", height: "100%", resizeMode: "contain" }}
        />
      );
    }
    if (id === 8) {
      return (
        <Image
          source={require("../assets/images/FanDuel.png")}
          style={{ width: "100%", height: "100%", resizeMode: "contain" }}
        />
      );
    }
    if (id === 23) {
      return (
        <Image
          source={require("../assets/images/PointsBet.png")}
          style={{ width: "100%", height: "100%", resizeMode: "contain" }}
        />
      );
    }
    return null;
  }
  renderProviderCell(provider: SportBookItemType) {
    const isSVG = provider.logo && provider.logo.slice(-4).includes("svg");
    return (
      <View style={styles.cellStyle}>
        {provider && provider.logo ? (
          <TouchableWithNavigation url={provider.review_link}>
            <View>
              <View style={styles.providerLogo}>
                {isSVG ? (
                  this.renderImage(provider._id)
                ) : (
                  <Image
                    source={{ uri: provider.logo }}
                    style={{
                      width: "100%",
                      height: "100%",
                      resizeMode: "contain",
                    }}
                  />
                )}
              </View>
              <View style={{ height: 40 }}>
                <Text style={styles.providerPromo}>{provider.bonus_text}</Text>
              </View>
            </View>
          </TouchableWithNavigation>
        ) : (
          <View />
        )}
      </View>
    );
  }

  renderGameHeaderCell(game: Game) {
    let formatPlayTime = (datetime: string) => {
      let hour = parseInt(datetime.substring(11, 13));
      let minute = datetime.substring(14, 16);
      let AP = hour < 12 ? "A" : "P";
      if (hour != 12) {
        hour = hour % 12;
      }
      return `${hour}:${minute}${AP}`;
    };

    return (
      <View style={styles.gameCellStyle}>
        <Text style={styles.gameCellTextStyle}>{game.AwayTeamName}</Text>
        <Text style={styles.gameCellTextStyle}>{game.HomeTeamName}</Text>
        <Text style={styles.gameCellTextStyle}>
          {formatPlayTime(game.DateTime)}
        </Text>
      </View>
    );
  }

  /**
   * Decoded from https://go.metabet.io/js/global.js?siteID=thelines&ver=5.7.2, Line 2318
   */
  mb_populateOddsBoardCell(odds: GameOdd, isHomeTeam: boolean) {
    let backgroundColor = "#fff"; // useThemeColor({}, 'text');
    let color = "#101010"; // useThemeColor({}, 'background');

    const { betStyle, market } = this.props;
    if (market == "Spread") {
      let isHomeTeamFavorite = odds.HomePointSpread >= 0;
      if (betStyle == "modern") {
      } else if (betStyle == "vegas") {
      } else {
        return (
          <View>
            <View style={[{ backgroundColor }, styles.oddsCellTextWrapper]}>
              <Text style={[{ color }, styles.oddsCellText]}>
                {mb_formatSpread(
                  isHomeTeam ? odds.HomePointSpread : odds.AwayPointSpread
                )}
              </Text>
              <Text style={[{ color }, styles.oddsCellText]}>
                {mb_formatWithSign(
                  isHomeTeam
                    ? odds.HomePointSpreadPayout
                    : odds.AwayPointSpreadPayout
                )}
              </Text>
            </View>
          </View>
        );
      }
    } else if (market == "MoneyLine") {
      return (
        <View>
          <View style={[{ backgroundColor }, styles.oddsCellTextWrapper]}>
            <Text style={[{ color }, styles.oddsCellText]}>
              {mb_formatWithSign(
                isHomeTeam ? odds.HomeMoneyLine : odds.AwayMoneyLine
              )}
            </Text>
          </View>
        </View>
      );
    } else if (market == "OverUnder") {
      let isOver = !isHomeTeam;
      if (betStyle == "modern") {
        return (
          <View>
            <View style={[{ backgroundColor }, styles.oddsCellTextWrapper]}>
              <Text style={[{ color }, styles.oddsCellText]}>
                {isOver ? "Over" : "Under"}
              </Text>
              <Text style={[{ color }, styles.oddsCellText]}>
                {mb_formatSpread(isOver ? odds.OverPayout : odds.UnderPayout)}
              </Text>
              <Text style={[{ color }, styles.oddsCellText]}>
                {mb_formatWithSign(odds.OverUnder)}
              </Text>
            </View>
          </View>
        );
      } else {
        return (
          <View>
            <View style={[{ backgroundColor }, styles.oddsCellTextWrapper]}>
              <Text style={[{ color }, styles.oddsCellText]}>
                {isOver ? "Over" : "Under"}
              </Text>
              <Text style={[{ color }, styles.oddsCellText]}>
                {mb_formatSpread(odds.OverUnder)}
              </Text>
              <Text style={[{ color }, styles.oddsCellText]}>
                {mb_formatWithSign(isOver ? odds.OverPayout : odds.UnderPayout)}
              </Text>
            </View>
          </View>
        );
      }
    }
  }

  renderGameOddCell(game: Game, provider: SportBookItemType) {
    let odds = game.PregameOdds.find((odd: GameOdd) => {
      return (
        provider.nice_name.includes(odd.Sportsbook) ||
        odd.Sportsbook == provider.Sportsbook
      );
    });

    // Ignore any lines that are excessively stale
    if (odds) {
      const now = new Date().getTime();
      if (new Date(odds.Created).getTime() + RUWT_STALE_ODDS_CUTOFF < now) {
        odds = undefined;
      }
    }
    return (
      <View style={styles.cellStyle}>
        {odds && (
          <View>
            {this.mb_populateOddsBoardCell(odds, false)}
            {this.mb_populateOddsBoardCell(odds, true)}
          </View>
        )}
        {/* Add an explicit Bet CTA for some customers */}
        {RUWT_ENABLE_OUTBOUND_LINKS && odds && (
          <TouchableWithNavigation url={odds.SportsbookUrl}>
            <Text style={styles.oddsBetButton}>Make a Bet</Text>
          </TouchableWithNavigation>
        )}
      </View>
    );
  }

  render() {
    const { providers, games } = this.state;
    const { showSecondCol } = this.state;
    // Show an empty message and exit if we don't have games to show
    if (games.length == 0 || providers.length == 0) {
      if (this.state.rendering) {
        return (
          <View style={{ flex: 1, justifyContent: "center" }}>
            <ActivityIndicator size="large" />
          </View>
        );
      }
      return this.renderNoOdds();
    }
    const headerColumnWidth = 84,
      dataColumnWidth = 106;
    let widthArr = Array(providers.length);
    widthArr.fill(dataColumnWidth);
    widthArr[0] = headerColumnWidth;
    const rowHeight = 100;
    return (
      <View style={styles.container}>
        {showSecondCol && (
          <View style={{ width: headerColumnWidth }}>
            <View
              style={[
                styles.borderStyle,
                { height: 101, width: headerColumnWidth },
              ]}
            />
            <ScrollView
              ref={"headerScroll"}
              scrollEventThrottle={16}
              style={[styles.dataWrapper, { width: headerColumnWidth }]}
              onScroll={(e: NativeSyntheticEvent<NativeScrollEvent>) => {
                if (!!!this.refs.mainScroll) {
                  return;
                }
                this.refs.mainScroll.scrollTo({
                  y: e.nativeEvent.contentOffset.y,
                  animated: false,
                });
              }}
            >
              <Table borderStyle={styles.borderStyle}>
                {games.map((game: Game, index: number) => (
                  <Row
                    key={index}
                    data={[this.renderGameHeaderCell(game)]}
                    style={{ height: rowHeight }}
                  />
                ))}
              </Table>
            </ScrollView>
          </View>
        )}
        <ScrollView
          horizontal
          ref={"horizontal"}
          scrollEventThrottle={16}
          onScroll={(e: NativeSyntheticEvent<NativeScrollEvent>) => {
            console.log(new Date(), e.nativeEvent.contentOffset.x);
            if (
              e.nativeEvent.contentOffset.x > headerColumnWidth &&
              !showSecondCol
            ) {
              this.setState({ showSecondCol: true });
            }
            if (
              e.nativeEvent.contentOffset.x < headerColumnWidth &&
              showSecondCol
            ) {
              this.setState({ showSecondCol: false });
            }
          }}
        >
          <View>
            <View style={{ flexDirection: "row" }}>
              <Table borderStyle={styles.borderStyle}>
                <Row
                  data={providers.map((provider: SportBookItemType) =>
                    this.renderProviderCell(provider)
                  )}
                  widthArr={widthArr}
                  style={styles.rowStyle}
                />
              </Table>
            </View>
            <View style={{ flexDirection: "row" }}>
              <ScrollView
                style={styles.dataWrapper}
                ref={"mainScroll"}
                scrollEventThrottle={16}
                onScroll={(e: NativeSyntheticEvent<NativeScrollEvent>) => {
                  if (!!!this.refs.headerScroll) {
                    return;
                  }
                  this.refs.headerScroll.scrollTo({
                    y: e.nativeEvent.contentOffset.y,
                    animated: false,
                  });
                }}
              >
                <Table borderStyle={styles.borderStyle}>
                  {games.map((game: Game, index: number) => (
                    <Row
                      key={index}
                      data={providers.map(
                        (provider: SportBookItemType, index: number) => {
                          if (index == 0) {
                            return this.renderGameHeaderCell(game);
                          } else {
                            return this.renderGameOddCell(game, provider);
                          }
                        }
                      )}
                      widthArr={widthArr}
                      style={{ height: rowHeight }}
                    />
                  ))}
                </Table>
                <View style={{ height: rowHeight }} />
              </ScrollView>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
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
  borderStyle: {
    borderColor: "#474747",
    borderWidth: 1,
  },
  dataWrapper: {
    marginTop: -1,
  },
  rowStyle: {
    height: 100,
  },
  cellStyle: {
    padding: 8,
  },
  providerLogo: {
    backgroundColor: "white",
    borderRadius: 12,
    height: 25,
    width: 88,
    paddingLeft: 13,
    paddingRight: 13,
    overflow: "hidden",
  },
  providerPromo: {
    fontSize: 10,
    fontWeight: "400",
    lineHeight: 15,
    paddingTop: 8,
    textAlign: "center",
  },
  gameCellStyle: {
    paddingTop: 8,
    paddingBottom: 8,
    alignItems: "center",
  },
  gameCellTextStyle: {
    fontWeight: "800",
    fontSize: 12,
    lineHeight: 12,
    letterSpacing: 1.5,
    paddingTop: 4,
    paddingBottom: 4,
    textTransform: "uppercase",
  },
  row: {
    height: 28,
  },
  oddsCellTextWrapper: {
    borderRadius: 2,
    height: 20,
    marginBottom: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  oddsCellText: {
    fontSize: 10,
    lineHeight: 15,
    marginLeft: 2.5,
    marginRight: 2.5,
    textAlign: "center",
  },
  oddsBetButton: {
    textAlign: "center",
    fontSize: 10,
    lineHeight: 15,
    textDecorationLine: "underline",
  },
});
