import * as React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Table, Row } from "react-native-table-component";
import { SvgUri } from "react-native-svg";
import { Text, TouchableWithNavigation, View, ViewProps } from "./Themed";
import { Game, GameOdd, BettingMarket, SportBook } from "../types";

type BetStyle = "modern" | "vegas" | "classic" | undefined;
type Market = "Spread" | "MoneyLine" | "OverUnder" | undefined;

interface FutureComponentProps extends ViewProps {
  betStyle?: BetStyle;
  market?: Market;
  league?: string;
  location: string;
  data: BettingMarket[];
  showConsensus?: boolean;
}

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

const SportsbookToProvider: { [key: string]: string } = {
  PointsBet: "PointsBet",
  BetMGM: "BetMGM",
  WilliamHill: "WilliamHill",
  DraftKings: "DraftKings",
  FanDuel: "FanDuel",
  RiversCasino: "BET_RIVERS",
  Unibet: "UNIBET",
  SugarHouse: "SUGAR_HOUSE",
  "888SportNJ": "SPORT_888",
};

export default class FutureComponent extends React.Component<FutureComponentProps> {
  static defaultProps = {
    betStyle: "classic",
    showConsensus: false,
  };

  /**
   * Decoded from https://go.metabet.io/js/global.js?siteID=thelines&ver=5.7.2, Line 4880
   */
  mb_getCurrentLocation(location?: string): string {
    if (this.props.location) {
      return this.props.location.toUpperCase();
    } else if (location) {
      return location.toUpperCase();
    } else {
      return "NJ";
    }
  }

  /** 1000 => 1,000 */
  numberWithCommas(x: string) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  /**
   * Decoded from https://go.metabet.io/js/global.js?siteID=thelines&ver=5.7.2, Line 4897
   */
  mb_getProvidersForLocation(location: string) {
    //If a location isn't explicitly specified, get the user preference
    if (!location) {
      location = this.mb_getCurrentLocation();
    }

    //Set the list of providers based on the location
    let providers = [];
    location = location.toUpperCase();
    if (location == "CO") {
      providers = [
        "POINTSBET",
        "BetMGM",
        "WilliamHill",
        "DRAFTKINGS",
        "FANDUEL",
        "BET_RIVERS_CO",
      ];
    } else if (location == "DC") {
      providers = ["BetMGM"];
    } else if (location == "IA") {
      providers = [
        "POINTSBET",
        "BetMGM",
        "WilliamHill",
        "DRAFTKINGS",
        "FANDUEL",
        "BET_RIVERS_IA",
      ];
    } else if (location == "IL") {
      providers = ["POINTSBET", "DRAFTKINGS", "FANDUEL", "BET_RIVERS_IL"];
      // if (RUWT_SITE_ID == "actionrush") {
      //   providers.splice(1, 0, "WilliamHill");
      // }
    } else if (location == "IN") {
      providers = [
        "POINTSBET",
        "BetMGM",
        "WilliamHill",
        "UNIBET",
        "DRAFTKINGS",
        "FANDUEL",
        "BET_RIVERS_IN",
        "BET_AMERICA",
      ];
    } else if (location == "MI") {
      providers = [
        "DRAFTKINGS",
        "FANDUEL",
        "BetMGM",
        "POINTSBET",
        "WilliamHill",
        "BET_RIVERS_MI",
      ];
    } else if (location == "NJ") {
      providers = [
        "POINTSBET",
        "BetMGM",
        "WilliamHill",
        "UNIBET",
        "DRAFTKINGS",
        "FANDUEL",
        "SUGAR_HOUSE_NJ",
        "BET_AMERICA",
      ];
    } else if (location == "NV" && RUWT_SITE_FAMILY_CATENA) {
      providers = ["BetMGM", "WilliamHill"];
    } else if (location == "NV") {
      providers = [
        "CAESARS_NV",
        "CANTOR_NV",
        "CIRCA_NV",
        "COAST_NV",
        "GOLDEN_NUGGET_NV",
        "MIRAGE_NV",
        "SOUTH_POINT_NV",
        "WESTGATE_NV",
        "WILLIAM_HILL_NV",
        "WYNN_NV",
      ];
    } else if (location == "PA") {
      providers = [
        "BetMGM",
        "UNIBET",
        "DRAFTKINGS",
        "FANDUEL",
        "BET_RIVERS_PA",
        "BET_AMERICA",
      ];
    } else if (location == "TN") {
      providers = ["BetMGM", "DRAFTKINGS", "FANDUEL"];
      if (RUWT_SITE_FAMILY_CATENA) {
        providers.push("WilliamHill");
      }
    } else if (location == "VA") {
      providers = [
        "BetMGM",
        "WilliamHill",
        "DRAFTKINGS",
        "FANDUEL",
        "BET_RIVERS_VA",
      ];
      if (RUWT_SITE_FAMILY_CATENA) {
        providers.push("UNIBET");
      }
    } else if (location == "WV") {
      providers = ["BetMGM", "WilliamHill", "DRAFTKINGS", "FANDUEL"];
    } else {
      providers = [
        "POINTSBET",
        "BetMGM",
        "WilliamHill",
        "UNIBET",
        "DRAFTKINGS",
        "FANDUEL",
        "BET_RIVERS_PA",
        "SUGAR_HOUSE_NJ",
        "BET_AMERICA",
      ];
    }

    //Remove any excluded providers
    var excludedProviders = ["BET_AMERICA"];
    if (excludedProviders) {
      var intersection = providers.slice();
      for (var i = 0; i < excludedProviders.length; i++) {
        for (var j = 0; j < providers.length; j++) {
          if (
            providers[j] == excludedProviders[i] ||
            providers[j].match(excludedProviders[i] + "_[A-Z]{2}")
          ) {
            intersection.splice(intersection.indexOf(providers[j]), 1);
          }
        }
      }
      providers = intersection;
    }

    //If some providers are prioritized, move them to the front of the list
    var prioritizedProviders = [
      "DRAFTKINGS",
      "WilliamHill",
      "FANDUEL",
      "FOXBET",
      "BetMGM",
      "POINTSBET",
      "SUGAR_HOUSE",
      "UNIBET",
    ];
    if (prioritizedProviders) {
      var intersection = providers.slice();
      for (var i = prioritizedProviders.length - 1; i >= 0; i--) {
        for (var j = 0; j < providers.length; j++) {
          if (
            providers[j] == prioritizedProviders[i] ||
            providers[j].match(prioritizedProviders[i] + "_[A-Z]{2}")
          ) {
            intersection.splice(intersection.indexOf(providers[j]), 1);
            intersection.unshift(providers[j]);
          }
        }
      }
      providers = intersection;
    }

    // Prepend the Consensus line
    if (this.props.showConsensus) {
      providers.unshift("CONSENSUS");
    }

    return providers;
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

  /**
   * Decoded from https://go.metabet.io/js/global.js?siteID=thelines&ver=5.7.2, Line 5001
   */
  mb_getProviderPromo(provider: string): string {
    if (provider == "BET_AMERICA_NJ") {
      return "$1,000 Risk-Free Bet";
    } else if (provider.indexOf("BET_AMERICA") == 0) {
      return "Bet $50, Get $50";
    } else if (provider.indexOf("BET_RIVERS") == 0) {
      return "$250 Deposit Match";
    } else if (provider.indexOf("CAESARS") == 0) {
      return "$10 Cash + $300 Deposit Match";
    } else if (provider.indexOf("DRAFTKINGS") == 0) {
      return "$1,050 Bonus";
    } else if (provider.indexOf("FANDUEL") == 0) {
      return "$1,000 Risk-Free Bet";
    } else if (provider.indexOf("FOXBET") == 0) {
      return "$500 Risk-Free Bet + $500 Deposit Bonus";
    } else if (provider.indexOf("BetMGM") == 0) {
      return "$600 Risk-Free Bet";
    } else if (provider.indexOf("POINTSBET") == 0) {
      return "$2,000 Risk-Free Bets";
    } else if (provider.indexOf("RESORTS") == 0) {
      return "$250 Risk-Free Bet";
    } else if (provider.indexOf("SPORT_888") == 0) {
      return "$500 Risk-Free Bet";
    } else if (provider.indexOf("SUGAR_HOUSE") == 0) {
      return "$250 Deposit Match";
    } else if (provider.indexOf("UNIBET") == 0) {
      return "$600 Risk-Free Bet";
    } else if (provider.indexOf("WilliamHill") == 0) {
      return "$500 Risk-Free Bet";
    } else {
      return "Sign up Now!";
    }
  }

  /**
   * Please refer https://go.metabet.io/js/global.js?siteID=thelines&ver=5.7.2, Line 1957
   */
  getFutureData(): { providers: string[]; futures: BettingMarket[] } {
    let providers = this.mb_getProvidersForLocation(this.props.location);
    return { providers, futures: this.props.data };
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

  /**
   * Decoded from https://go.metabet.io/js/global.js?siteID=thelines&ver=5.7.2, Line 5001
   *
   * Create an anchor link for the specified provider and location.
   * Consensus and books in Nevada will return links without hrefs.
   */
  getProviderRedirect(provider: string, location: string) {
    // Exit if we don't have a URL to set on this link
    if (
      !provider ||
      provider == "CONSENSUS" ||
      (provider.match(".+_NV") && !RUWT_SITE_FAMILY_CATENA)
    ) {
      return;
    }

    // Return the location-tagged URL for the provider, with the customer's domain
    if (RUWT_ENABLE_OUTBOUND_LINKS) {
      return (
        RUWT_REDIRECT_URL +
        provider.toLowerCase() +
        (!/.+_[a-z]{2}$/.test(provider.toLowerCase())
          ? "_" + location.toLowerCase()
          : "")
      );
    }
  }

  getProviderLogo(provider: string, location: string): string {
    if (!provider) return "";

    let logoName = provider.replace(/_[A-Z]{2}$/, "");
    if (logoName == "BET_AMERICA" && (location == "IN" || location == "PA")) {
      logoName = "twinspires";
    }
    if (logoName == "BetMGM") {
      logoName = "MGM";
    }
    if (logoName == "WilliamHill") {
      logoName = "william_hill";
    }
    return `https://go.metabet.io/img/sportsbooks/landscape/${logoName.toLowerCase()}.svg`;
  }

  renderProviderCell(provider: string) {
    let providerRedirect = this.getProviderRedirect(
      provider,
      this.props.location
    );
    let providerLogoUrl = this.getProviderLogo(provider, this.props.location);

    return (
      <View style={styles.cellStyle}>
        {provider && provider != "CONSENSUS" ? (
          <TouchableWithNavigation url={providerRedirect}>
            <View>
              <View style={styles.providerLogo}>
                <SvgUri
                  width="100%"
                  height="100%"
                  uri={providerLogoUrl}
                  preserveAspectRatio="xMidYMid meet"
                />
              </View>
              <Text style={styles.providerPromo}>
                {this.mb_getProviderPromo(provider)}
              </Text>
            </View>
          </TouchableWithNavigation>
        ) : (
          <View />
        )}
      </View>
    );
  }

  renderFutureHeaderCell(future: BettingMarket) {
    let formatPlayTime = (datetime: string) => {
      let hour = parseInt(datetime.substring(11, 13));
      let minute = datetime.substring(14, 16);
      let AP = hour < 12 ? "A" : "P";
      hour = hour % 12;
      return `${hour}:${minute}${AP}`;
    };

    return (
      <View style={styles.gameCellStyle}>
        <Text style={styles.gameCellTextStyle}>{future.BettingBetType}</Text>
        <Text style={styles.gameCellTextStyle}>{future.BettingBetType}</Text>
        <Text style={styles.gameCellTextStyle}>TEMP</Text>
      </View>
    );
  }

  getProviderFromSportsbook(
    sportsbook: string,
    providers?: string[]
  ): string | undefined {
    // Remove location code
    sportsbook = sportsbook.replace(/_[A-Z]{2}$/, "");

    let provider: string | undefined = SportsbookToProvider[sportsbook];
    if (!provider && providers) {
      sportsbook = sportsbook.toUpperCase();
      provider = providers.find(
        (provider: string) => sportsbook == provider.replace("_", "")
      );
    }

    return provider;
  }

  /**
   * Decoded from https://go.metabet.io/js/global.js?siteID=thelines&ver=5.7.2, Line 2318
   */
  mb_populateFutureCell(odds: GameOdd, isHomeTeam: boolean) {
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

  renderGameOddCell(game: Game, provider: string) {
    let odds = game.PregameOdds.find(
      (odd: GameOdd) =>
        this.getProviderFromSportsbook(odd.Sportsbook) == provider
    );

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
            {/* {this.mb_populateOddsBoardCell(odds, false)}
            {this.mb_populateOddsBoardCell(odds, true)} */}
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
    const { providers, futures } = this.getFutureData();

    // Show an empty message and exit if we don't have games to show
    if (futures.length == 0) {
      return this.renderNoOdds();
    }

    // Add empty string into providers for row header cell
    providers.unshift("");

    const headerColumnWidth = 150,
      dataColumnWidth = 180;
    let widthArr = Array(providers.length);
    widthArr.fill(dataColumnWidth);
    widthArr[0] = headerColumnWidth;
    console.log(providers);

    return (
      <View style={styles.container}>
        <ScrollView horizontal>
          <View>
            <Table borderStyle={styles.borderStyle}>
              <Row
                data={providers.map((provider: string) =>
                  this.renderProviderCell(provider)
                )}
                widthArr={widthArr}
                style={styles.rowStyle}
              />
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={styles.borderStyle}>
                {futures.map((future: BettingMarket, index: number) => {
                  return future.BettingOutcomes.map((market, _index) => (
                    <Row
                      key={_index}
                      data={providers.map((provider: string, index: number) => {
                        if (index == 0 && !provider) {
                          return (
                            <View style={styles.gameCellStyle}>
                              <Text style={styles.gameCellTextStyle}>
                                {future.BettingMarketType === "Team Future" &&
                                  (future.TeamKey || market.Participant)}
                                {future.BettingMarketType === "Player Future" &&
                                  market.Participant}
                              </Text>
                            </View>
                          );
                        } else {
                          const tt = market.SportsBooks.map(
                            (sportbook: SportBook) =>
                              sportbook.SportsbookName.toLowerCase()
                          ).indexOf(provider.toLowerCase());
                          if (tt >= 0) {
                            return (
                              <View style={styles.gameCellStyle}>
                                <Text style={styles.gameCellTextStyle}>
                                  {!!market.BettingOutcomeType
                                    ? market.BettingOutcomeType
                                    : this.numberWithCommas(
                                        market.SportsBooks[
                                          tt
                                        ]?.PayoutAmerican.toString()
                                      )}
                                </Text>
                                <Text
                                  style={[
                                    styles.gameCellTextStyle,
                                    { textDecorationLine: "underline" },
                                  ]}
                                >
                                  Bet This Player!
                                </Text>
                              </View>
                            );
                          }
                          return null;
                        }
                      })}
                      widthArr={widthArr}
                    />
                  ));
                })}
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  rowStyle: {},
  cellStyle: {
    padding: 8,
    alignItems: "center",
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
    paddingLeft: 24,
  },
  gameCellTextStyle: {
    fontWeight: "800",
    fontSize: 12,
    lineHeight: 12,
    letterSpacing: 1.5,
    paddingTop: 4,
    paddingBottom: 4,
    textAlign: "center",
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
