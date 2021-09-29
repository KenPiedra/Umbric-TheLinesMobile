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
  mainScrollPosition: number;
  loadingMore: boolean;
  noLoadMore: boolean;
  loadNum: number;
};

const RUWT_STALE_ODDS_CUTOFF = 1000 * 60 * 60 * 24 * 60;

function mb_formatWithSign(value: number) {
  if (value != null && !isNaN(value)) {
    return (value > 0 ? "+" : "") + value;
  }
  return "";
}

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
    mainScrollPosition: 0,
    loadingMore: false,
    noLoadMore: false,
    loadNum: 0,
  };

  componentDidMount() {
    this.setState({ rendering: true });
    this.getData();
  }

  componentDidUpdate(props: OddsBoardProps) {
    if (this.props.data !== props.data) {
      this.setState(
        {
          rendering: true,
          loadingMore: false,
          noLoadMore: false,
          loadNum: 0,
          games: [],
        },
        () => this.getData()
      );
    }
  }

  getData() {
    const num = 7;
    const { loadNum, games } = this.state;
    let providers = this.mb_getProvidersForLocation();
    let filtered = this.props.data.filter((game: Game): boolean => {
      if (this.mb_isGameFinished(game)) {
        return false;
      }
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
    for (let i = 0; i < providers.length; i++) {
      const element = providers[i];
      switch (element.SportsDataId) {
        case 7:
          element.review_link =
            "https://sportsbook.draftkings.com/acq-50-free-bet";
          break;
        case 21:
          element.review_link =
            "https://promo.nj.betmgm.com/en/promo/geolocator?orh=promo.betmgm.com&wm=7038459";
          break;
        case 19:
          element.review_link =
            "https://www.williamhill.com/us/nj/welcome?AR=a-894b-191&bc=LEGALRF&utm_offer=LEGALRF&siteid=894&af_c_id=LEGALRF";
          break;
        case 8:
          element.review_link =
            "https://account.sportsbook.fanduel.com/join/select-state";
          break;
        case 23:
          element.review_link =
            "https://join.pointsbet.com/catena-2rf/?utm_source=Unbounce_Catena_Media&utm_medium=Digital_Affiliate_Revenue_Share&utm_campaign=Risk_Free_2_1500_500_Catena_Media&utm_term=Unbounce&utm_content=Catena_Media&promo=BETBONUS";
          break;
        case 10:
          element.review_link =
            "https://www.playsugarhouse.com/?page=landing&cbc=PLAY250&btag=a_493b_250c_&siteid=493#home";
          break;
        case 25:
          element.review_link =
            "https://nj.unibet.com/p/30free/?utm_source=affiliate&utm_medium=affiliate&utm_campaign=affiliate&btag=a_1251b_385c_142603101";
          break;
        case 13:
          element.review_link =
            "https://www.888sport.com/online-sports-betting-promotions/";
          break;
        default:
          break;
      }
    }
    const moreData = filtered.slice(loadNum * num, loadNum * num + num);
    console.log("load more $$$$$", moreData);
    // Add empty string into providers for row header cell
    const virtualProvider = {
      _id: -1,
      SportsDataId: -1,
      Sportsbook: "",
      list_offer: false,
      nice_name: "",
    };
    providers.unshift(virtualProvider);
    const _games = [...games, ...moreData];
    const _providers = providers.filter((provider) => {
      if (provider.SportsDataId == -1) {
        return true;
      }
      for (let index = 0; index < _games.length; index++) {
        const game = _games[index];
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
        const populateOdds1 =
          odds && this.mb_populateOddsBoardCell(odds, false);
        const populateOdds2 = odds && this.mb_populateOddsBoardCell(odds, true);
        if (odds && populateOdds1 && populateOdds2) {
          return true;
        }
      }
      return false;
    });
    this.setState({
      providers: _providers,
      rendering: false,
      games: _games,
      noLoadMore: num > moreData.length,
      loadNum: loadNum + 1,
    });
  }

  mb_getProvidersForLocation() {
    let providers: SportBookItemType[] = API.getSportsbooks();
    const filtered: SportBookItemType[] = providers.filter(
      (item: SportBookItemType) => !!item.logo
    );
    const ruleAry = {
      DraftKings: 1,
      BetMGM: 2,
      "Caesars Sportsbook": 3,
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
      <TouchableWithNavigation url={provider.affiliate_link}>
        {provider && provider.logo ? (
          <View style={[{ alignItems: "center" }, styles.cellStyle]}>
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
        ) : (
          <View />
        )}
      </TouchableWithNavigation>
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
    let formatDay = (day: string) => {
      let date = new Date(day);
      console.log(date);
      let mm = date.getMonth() + 1;
      let dd = date.getDate();
      return [mm, (dd > 9 ? "" : "0") + dd].join("/");
    };
    return (
      <View style={styles.gameCellStyle}>
        <Text style={styles.gameCellTextStyle}>{game.AwayTeamName}</Text>
        <Text style={styles.gameCellTextStyle}>{game.HomeTeamName}</Text>
        <Text style={styles.gameCellTextStyle}>
          {`${formatDay(game.Day)},${formatPlayTime(game.DateTime)}`}
        </Text>
      </View>
    );
  }

  mb_populateOddsBoardCell(odds: GameOdd, isHomeTeam: boolean) {
    let backgroundColor = "#fff"; // useThemeColor({}, 'text');
    let color = "#101010"; // useThemeColor({}, 'background');

    const { betStyle, market } = this.props;
    if (market == "Spread") {
      let isHomeTeamFavorite = odds.HomePointSpread >= 0;
      if (betStyle == "modern") {
      } else if (betStyle == "vegas") {
      } else {
        if (
          !!!odds.HomePointSpread ||
          !!!odds.AwayPointSpread ||
          !!!odds.HomePointSpreadPayout ||
          !!!odds.AwayPointSpreadPayout
        ) {
          return null;
        }
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
      if (!!!odds.HomeMoneyLine || !!!odds.AwayMoneyLine) {
        return null;
      }
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
      if (!!!odds.OverPayout || !!!odds.OverUnder || !!!odds.UnderPayout) {
        return null;
      }
      let isOver = !isHomeTeam;
      if (betStyle == "modern") {
        return (
          <View>
            <View style={[{ backgroundColor }, styles.oddsCellTextWrapper]}>
              <Text style={[{ color }, styles.oddsCellText]}>
                {isOver ? "O" : "U"}
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
                {isOver ? "O" : "U"}
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

    const populateOdds1 = odds && this.mb_populateOddsBoardCell(odds, false);
    const populateOdds2 = odds && this.mb_populateOddsBoardCell(odds, true);

    return (
      <TouchableWithNavigation url={provider.affiliate_link}>
        <View style={styles.cellStyle}>
          {odds && (
            <View>
              {populateOdds1}
              {populateOdds2}
            </View>
          )}
          {odds && populateOdds1 && populateOdds2 && (
            <View>
              <Text style={styles.oddsBetButton}>Make a Bet</Text>
            </View>
          )}
        </View>
      </TouchableWithNavigation>
    );
  }

  render() {
    console.log("Odd component", this.state);
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
    const headerColumnWidth = 95;
    const dataColumnWidth = 106;
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
              onContentSizeChange={(contentWidth, contentHeight) => {
                if (!!!this.refs.headerScroll) {
                  return;
                }
                this.refs.headerScroll.scrollTo({
                  y: this.state.mainScrollPosition,
                  animated: false,
                });
              }}
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
                  if (
                    e.nativeEvent.layoutMeasurement.height +
                      e.nativeEvent.contentOffset.y >=
                    e.nativeEvent.contentSize.height - 20
                  ) {
                    if (!this.state.noLoadMore) {
                      this.getData();
                    }
                  }
                  if (!!!this.refs.headerScroll) {
                    return;
                  }
                  this.refs.headerScroll.scrollTo({
                    y: e.nativeEvent.contentOffset.y,
                    animated: false,
                  });
                }}
                onMomentumScrollEnd={(e) => {
                  this.setState({
                    mainScrollPosition: e.nativeEvent.contentOffset.y,
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
    paddingHorizontal: 8,
    flex: 1,
    justifyContent: "center",
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
