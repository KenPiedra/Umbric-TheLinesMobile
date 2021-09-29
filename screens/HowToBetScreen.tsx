import * as React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  useWindowDimensions,
} from "react-native";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";

import { Text, View } from "../components/Themed";

export default function HowToBetScreen() {
  const scaleHeight = ({ source, desiredWidth }: any) => {
    const { width, height } = Image.resolveAssetSource(source);

    return (desiredWidth / width) * height;
  };

  // const imageSource = "https://ethicseducationforchildren.org/images/generic-video-thumbnail.jpg";
  const imageWidth = useWindowDimensions().width * 0.8;
  // const imageHeight = scaleHeight({
  //   source: require(imageSource),
  //   desiredWidth: imageWidth
  // })

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.contentWrap}>
          <Text style={styles.normalText}>
            Legal sports betting is expanding quickly in the US, and bettors are
            eager to put a couple sawbucks on that first NFL game … or tonight’s
            Yankees games ... or on the Red Wings to win the Stanley Cup ... or
            whatever. But maybe this whole sports betting thing is new to you.
            TheLines has got you covered.
          </Text>
          <Text style={styles.normalText}>
            Here's a look at some common sports betting terms someone new to the
            game might need to place those bets - and hopefully cash a few
            tickets.
          </Text>

          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Accumulator</Text>
              <Text style={styles.normalText}>
                This is similar to a parlay in that it involves a series of bets
                in one wager. Each of the bets must win in order for the wager
                to win. If one leg of an accumulator loses the wager loses.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Alternate Lines</Text>
              <Text style={styles.normalText}>
                All sportsbooks offer lines (point spreads) on sporting events.
                Some sportsbooks may offer different (or alternate) point
                spreads that pay different odds for the same game. These provide
                bettors more options to wager on certain games.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>American Odds</Text>
              <Text style={styles.normalText}>
                American odds are displayed differently than the rest of the
                world. Moneyline odds are shown as + or – a number in the US.
                Outside of the US, the same odds might be presented with a
                decimal point or by a fraction. Example: Yankees +400 American
                odds would be 5.0 or 4/1. The bettor takes home the same amount
                of money if the wager wins.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Arbitrage</Text>
              <Text style={styles.normalText}>
                This betting strategy involves placing a wager on all possible
                outcomes of an event so that that there’s a guaranteed profit
                regardless of the winner. This is best done with moneyline or
                futures wagers in the US and will usually take place across
                multiple sportsbooks.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Asian Handicap</Text>
              <Text style={styles.normalText}>
                An alternative way to bet soccer where the better team is
                “handicapped” to be the favorite. This form of betting was
                started in Asia.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Backdoor Cover</Text>
              <Text style={styles.normalText}>
                This is a popular term for a team that covers a point spread
                late in a game. The team with the late cover may or may not
                affect the actual result of the game, just the wager.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Banker</Text>
              <Text style={styles.normalText}>
                A banker is a European wager similar to a round robin bet in the
                US. Different teams are placed in a “system bet” to make
                different “accumulator” (parlay) bets.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Bankroll</Text>
              <Text style={styles.normalText}>
                This is a person who places a wager for another person who
                wishes to remain unknown.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Betting Exchange</Text>
              <Text style={styles.normalText}>
                A betting platform where people wager against one another
                instead of betting against a sportsbook. The exchange operator
                takes a small percentage of winning wagers. This is often seen
                as the most efficient market for sports betting.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Betting Unit</Text>
              <Text style={styles.normalText}>
                A betting unit is the amount of a typical wager. Bettors may
                have different sized bankrolls and a unit is a way to share how
                much was bet without giving away a specific dollar amount. For
                example, a high roller might have a unit size of $10,000 per
                wager while a low roller has a unit size of $20 wager per wager.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Bonus</Text>
              <Text style={styles.normalText}>
                Sportsbooks offer a financial bonus to customers for a variety
                of reasons. A signup bonus is the most popular way to
                incentivize bettors to use a certain sportsbook.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Chalk</Text>
              <Text style={styles.normalText}>
                A term for the team that is the favorite in an event. This team
                or player is usually a big favorite. The chalk is the expected
                winner by a large margin.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Circle Game</Text>
              <Text style={styles.normalText}>
                A game is circled by a sportsbook because betting limits are
                lower than usual. This most often happens when there’s a
                questionable injury before a game. It can also happen if there’s
                potentially bad weather, a trade rumor, or the possibility of
                “load management” which might give a player a night off.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Opening Line</Text>
              <Text style={styles.normalText}>
                This is the first point spread available for a game.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Closing Line</Text>
              <Text style={styles.normalText}>
                This is simply where the point spread is when the game begins.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Closing Line Value</Text>
              <Text style={styles.normalText}>
                This term is used by bettors to measure the value of the line
                they wagered before the line that was the last available before
                a game begins.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Consensus</Text>
              <Text style={styles.normalText}>
                The general agreement about something. In sports betting
                consensus could be the most popular teams bet or line available
                for a game.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Contrarian</Text>
              <Text style={styles.normalText}>
                Betting against the trends of the mainstream popular opinions.
                Bettors usually place contrarian wagers when there is value on
                the opposite opinion.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Dead Heat</Text>
              <Text style={styles.normalText}>
                Another way to say that there is a tie in a finishing position.
                Sportsbooks have different rules on how to pay in the event of a
                tie or dead heat in an event.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Decimal Odds</Text>
              <Text style={styles.normalText}>
                This is a different way to present odds than Americans are used
                to. They're sometimes called "European odds" since this is how
                odds are listed with European sportsbooks. The math is easier to
                figure out for most bettors than US moneyline odds. Decimal odds
                are derived from a simple calculation of the amount bet x odds.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Dime Line</Text>
              <Text style={styles.normalText}>
                This is a "10 cent" difference between the moneyline odds payout
                between the money laid on the favorite and the money paid by the
                underdog. For example, Vegas Golden Knights -125 vs. San Jose
                Sharks +115. The difference of 10 (dime line) is the traditional
                profit margin for sportsbooks.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Dog</Text>
              <Text style={styles.normalText}>
                Short for underdog. This is the team that is not expected to
                win.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Double Chance</Text>
              <Text style={styles.normalText}>
                This is a European sports betting term mostly used for soccer
                betting. A double chance wager allows the bettor two
                opportunities to win a bet. For example, a result in soccer can
                be a win, loss, or tie. A double chance bettor may combine two
                of the three results instead of just one. This gives the bettor
                twice the chance to win the wager.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Double Pop</Text>
              <Text style={styles.normalText}>
                A European way of saying that a bettor will bet twice the normal
                amount. In the US this is known more often as doubling up.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Early Cash Out</Text>
              <Text style={styles.normalText}>
                A way for bettors to settle a wager for a certain dollar amount
                before the event is over. This is a way to lock in a profit at a
                smaller value than the wager would ultimately pay.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Edge</Text>
              <Text style={styles.normalText}>
                The advantage a bettor has against the sportsbook (or vice
                versa).
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Even Money</Text>
              <Text style={styles.normalText}>
                A wager that pays the same as was risked. An even-money sports
                bet is listed as +100 or -100 in a sportsbook. Unlike
                traditional -110 wager, there’s no vigorish paid to the
                sportsbook. A bettor risks $100 to win $100 instead of wagering
                $110 to win $100.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Exacta</Text>
              <Text style={styles.normalText}>
                Choosing horses to finish first and second in a race. This is
                sometimes, but rarely, offered for other competitive sports.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Exotic Wager</Text>
              <Text style={styles.normalText}>
                These are non-traditional sports bets. Exotic wagers aren’t
                point spread, moneyline, or futures bets on a certain event.
                This kind of wager is often listed as a prop bet in a
                sportsbook.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Expected Value</Text>
              <Text style={styles.normalText}>
                This is a calculation used by a bettor to determine whether a
                wager should win or lose over time. Positive expected value (EV)
                bets over time is a good way to become a winning sports bettor.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Exposure</Text>
              <Text style={styles.normalText}>
                The amount of money a sportsbook potentially could lose for a
                specific event. For example, sportsbooks might have a lot of
                exposure (money at risk) on one team winning a championship
                versus another.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>First Half</Text>
              <Text style={styles.normalText}>
                A derivative bet that can be placed on a sport that has two
                halves. Football and basketball are the most popular sports to
                place a first half wager. In soccer, this might be called a
                "half time result."
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Fixed Odds</Text>
              <Text style={styles.normalText}>
                These are the odds that most sports bettors will experience.
                Once a wager is placed, the odds are set and don’t change. Horse
                bettors might experience a change in odds from parimutuel
                betting.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Flat Betting</Text>
              <Text style={styles.normalText}>
                Simply put, this is a betting system where all wagers are the
                same. A bettor doesn’t change the wager amount based on wins,
                losses, or any other outside opinion. The wager is usually a
                percentage of bankroll but could also be a fixed dollar amount.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Fractional Odds</Text>
              <Text style={styles.normalText}>
                Another kind of odds used mainly in Britain and Ireland. Odds
                are listed in fraction form (1/5) instead of as a moneyline
                (-500) that US sportsbooks use.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Grand Salami</Text>
              <Text style={styles.normalText}>
                A popular hockey bet which the wager is for the over/under on
                total number of goals scored by all teams in a day. Some
                sportsbooks may offer derivative versions for home, away, or
                periods of games during the day. Some sportsbooks may offer a
                similar bet for runs in Major League Baseball.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Handicapper</Text>
              <Text style={styles.normalText}>
                A person who analyzes sports events to predict the winning team
                or player.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Handle</Text>
              <Text style={styles.normalText}>
                The amount of money a sportsbook or sportsbooks take from
                wagers. This could be broken down by sport, region, casinos, and
                more.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Hedge</Text>
              <Text style={styles.normalText}>
                Hedging is a strategy used by sports bettors to either reduce
                the risk of or to guarantee a profit from a wager.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Home Field</Text>
              <Text style={styles.normalText}>
                This the field (court, rink, etc.) where one team plays its
                games.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Hook</Text>
              <Text style={styles.normalText}>
                Another way to say half of a point. For example, a team may be a
                3.5 point underdog. That could be called "three and a hook."
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Joint Favorite</Text>
              <Text style={styles.normalText}>
                When there are two favorites for an event. This is mostly used
                in England.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Kelly Criterion</Text>
              <Text style={styles.normalText}>
                A popular bankroll management strategy for a bettor who seeks to
                limit losses while maximizing the amount won.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Layoff</Text>
              <Text style={styles.normalText}>
                When a bookmaker reduces the risk of losing wagers by placing a
                bet with a different sportsbook(s). This typically happens when
                there is lopsided wagering on one side of a game and the
                sportsbook or a bookie want to alleviate potential losses.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Listed Pitcher</Text>
              <Text style={styles.normalText}>
                This is a baseball bet that is active only if the pitcher listed
                as the starter throws the first pitch of a game. If the pitcher
                doesn't matter a bettor can place a wager on "action." The
                latter wager will happen regardless of who starts the game to
                the team bet on.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Live Betting</Text>
              <Text style={styles.normalText}>
                Placing a wager on a game or event while it’s taking place. This
                is also known as In Play wagering.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Lock</Text>
              <Text style={styles.normalText}>
                Another way of saying that a team or player will be an easy
                winner. (Note: This isn’t always the case, no matter what a
                sports prognosticator or tout says.)
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Margin</Text>
              <Text style={styles.normalText}>
                This is a wager where a bettor selects a team to win or lose by
                a specific number of points regardless of the point spread. For
                example, the Oakland Raiders will defeat the Los Angeles
                Chargers by 10-14 points. The Raiders must win by 11, 12, or 13
                points for a win. A victory by 10 or 14 points is a push.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Martingale System</Text>
              <Text style={styles.normalText}>
                A gambling system where bettors doubles the amount of a wager
                after losses. This system can be used for sports and other forms
                of gambling (i.e. blackjack).
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Middle/Middling</Text>
              <Text style={styles.normalText}>
                Middling a sports bet is playing different sides of the same
                game. This gives a bettor multiple chances to win wagers on the
                same game.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Matched Bet</Text>
              <Text style={styles.normalText}>
                When a bettor uses free wagers from a sportsbook operator to
                increase potential profit. This is a popular technique employed
                in new legal US sports betting markets as promotional offers are
                available.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Nickel</Text>
              <Text style={styles.normalText}>
                Placing a $500 wager. A "Dime" is a $1,000 wager.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Novelty Bet</Text>
              <Text style={styles.normalText}>
                Placing a wager on a non-sports event with a sportsbook. For
                example, betting on the Oscars in NJ. These kinds of wagers are
                more popular overseas.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Odds-on Favorite</Text>
              <Text style={styles.normalText}>
                When a team or person is heavily favored to win a game or event.
                They often have very low odds paying much less than the amount
                wagered.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Off the Board</Text>
              <Text style={styles.normalText}>
                When a sportsbook stops taking wagers on an event or participant
                they remove the game odds from the betting board. This often
                happens when a player is uncertain to participate because of an
                injury.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Public Betting Percentage</Text>
              <Text style={styles.normalText}>
                This is the percentage of wagers placed by the general betting
                public.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Puck Line</Text>
              <Text style={styles.normalText}>
                This is a point spread of sorts based on goals scored during a
                hockey game. The base puck line for a game is often plus or
                minus 1.5 since there are so few goals scored. Sportsbooks might
                offer an alternative puck line with more or fewer goals scored.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Puppy</Text>
              <Text style={styles.normalText}>
                Another way to say a team is an underdog in a game.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Push</Text>
              <Text style={styles.normalText}>
                When a point spread wager lands exactly on the line offered by
                the sportsbook. The bettor receives their money back if they
                push. For example, New England Patriots are favored by 14 points
                against the New York Jets. If they win by exactly 14 points, the
                wager pushes and the bettor gets their original wager back.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Player Props</Text>
              <Text style={styles.normalText}>
                A player prop bet is a wager on an individual player to do
                something during a game. For example, which player will score
                first in a football game?
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Power Ranking</Text>
              <Text style={styles.normalText}>
                (AKA Power Rating) – Creating a ranking score for each team so
                that a bettor, handicapper, or sportsbook can create a point
                spread. Experienced handicappers use their point spreads to
                compare with a sportsbook in order to find the best bets
                available.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Reduced Juice</Text>
              <Text style={styles.normalText}>
                When a sportsbook lowers the vig on a game. For example, a
                sportsbook might offer -105 for a game instead of -110. This
                reduced juice will allow the potential for a bettor to take home
                more money if the wager wins.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Reverse Line Movement</Text>
              <Text style={styles.normalText}>
                When a line (or point spread) moves differently than the money
                wagered on the game or event.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>ROI</Text>
              <Text style={styles.normalText}>
                ROI is an acronym for Return On Investment. The ROI of a sports
                wager can simply be calculated this way: (Gain from Investment –
                Cost of Investment) / Cost of Investment.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Round Robin</Text>
              <Text style={styles.normalText}>
                A wager that involves making multiple parlay bets at the same
                time.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Run Line</Text>
              <Text style={styles.normalText}>
                This is a point spread of sorts for baseball games based on the
                number of runs scored. The run line is typically plus or minus
                1.5 since there are so few runs scored in baseball. Sportsbooks
                might offer an alternative run line with more or fewer runs
                scored.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Runner</Text>
              <Text style={styles.normalText}>
                A person who places wagers at a sportsbook for someone else.
                This person may also be known as a beard.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Sharp Money</Text>
              <Text style={styles.normalText}>
                Money wagered by sports bettors that a sportsbook operator
                respects. Sharp money often comes from large wagers placed by
                professional bettors. It should be noted that not all large
                wagers are considered Sharp.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Square</Text>
              <Text style={styles.normalText}>
                A casual and recreational sports bettor. This is someone betting
                on sports as a hobby. They’re not as respected by sportsbook
                operators as sharp or professional bettors.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Steam</Text>
              <Text style={styles.normalText}>
                This is when odds change because of the money wagered on a game
                or participant. Some bettors will “follow the money” or “chase
                steam” thinking the bettors know something they may not.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Straight Up</Text>
              <Text style={styles.normalText}>
                When a team wins or loses an event. The point spread isn’t
                involved with the winner or loser.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Take the Points</Text>
              <Text style={styles.normalText}>
                When a bettor places a wager on an underdog they are taking the
                points offered by the sportsbook.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Take the Price</Text>
              <Text style={styles.normalText}>
                Similar to taking the points. This is when a bettor takes the
                price on a game offered by the sportsbook. The bet is typically
                wagering a moneyline on the underdog.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Tissue Price</Text>
              <Text style={styles.normalText}>
                The initial odds offered by a sportsbook. This price is usually
                considered to be the fairest price on a wager.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>TKO</Text>
              <Text style={styles.normalText}>
                Abbreviation for a Technical Knockout in boxing.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Totals</Text>
              <Text style={styles.normalText}>
                Totals are the numbers that bettors will choose the over or
                under on points (or runs, goals, etc,) scored.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Tout</Text>
              <Text style={styles.normalText}>
                A person who sells or gives away sports betting picks.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>True Odds</Text>
              <Text style={styles.normalText}>
                True odds are the actual odds of an event happening. In sports
                betting this is the most accurate point spread or moneyline.
              </Text>
            </View>
          </View>
          <View style={styles.infoWrap}>
            <View>
              <Icon name="star-outline" style={styles.infoIcon} size={24} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.title}>Wire-to-Wire</Text>
              <Text style={styles.normalText}>
                This is a wager that a team will lead at every quarter or for a
                specific number of quarters. Wire-to-wire bets are the most
                popular in basketball.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    marginHorizontal: 0,
  },
  videoWrap: {
    paddingVertical: 20,
    alignItems: "center",
  },
  videoThumb: {
    borderRadius: 8,
    height: undefined,
  },
  contentWrap: {
    padding: 12,
  },
  title: {
    fontSize: 20,
    // color: "#fff",
    fontWeight: "700",
    lineHeight: 24,
  },
  subTitle: {
    fontSize: 12,
    // color: "#fff",
    textTransform: "uppercase",
    lineHeight: 12,
  },
  normalText: {
    fontSize: 16,
    // color: "#fff",
    lineHeight: 24,
  },
  infoWrap: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 20,
  },
  infoIcon: {
    color: "#2CAF4D",
  },
  infoText: {
    paddingLeft: 16,
    flex: 1,
  },
});
