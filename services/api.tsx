import database from "@react-native-firebase/database";
import axios from "axios";

import { Game, League } from "../types";
import { NewsItemData } from "../types/News";
import { PodcastItemData } from "../types/Podcast";
import { SportsbookItemData } from "../types/Sportsbook";
import { NewCategoriesData } from "../types/News";
import { BettingMarket } from "../types/Future";
import { SportBookItemType } from "../types/Sportsbooks";

export const getNewsCategories = (): Array<NewCategoriesData> => {
  // Use following data temporary
  const categories = [
    { Id: "", Name: "All" },
    { Id: "NFL", Name: "NFL" },
    { Id: "NBA", Name: "NBA" },
    { Id: "MLB", Name: "MLB" },
    { Id: "Golf", Name: "Golf" },
    { Id: "Soccer", Name: "Soccer" },
    { Id: "NHL", Name: "NHL" },
    { Id: "NASCAR", Name: "NASCAR" },
    { Id: "Industry", Name: "Industry" },
  ];

  return categories;
};

function capitalizeTheFirstLetterOfEachWord(value: string) {
  var separateWord = value.toLowerCase().split(" ");
  for (var i = 0; i < separateWord.length; i++) {
    separateWord[i] =
      separateWord[i].charAt(0).toUpperCase() + separateWord[i].substring(1);
  }
  return separateWord.join(" ");
}

export const getNews = (
  categoryId: string,
  limit: number,
  PostedAt: string | number | boolean | null
): Promise<Array<NewsItemData>> => {
  // Filter by date
  return new Promise(async (resolve, reject) => {
    const ref = database().ref("news");
    let num: number = 0;
    let query = ref.orderByChild("PostedAtIso");
    if (PostedAt) {
      query = ref.orderByChild("PostedAtIso").endAt(PostedAt);
    }
    // If categoryId is not set, limit the count to fetch
    if (categoryId.length == 0) {
      try {
        let ttt = await ref
          .orderByChild("PostedAtIso")
          .equalTo(PostedAt)
          .once("value");
        num = ttt.val() ? Object.keys(ttt.val()).length : 0;
      } catch (error) {
        console.log("firebase query error", error);
      }
      query = query.limitToLast(limit + num);
    }
    query
      .once("value", (snap: any) => {
        let newsData = Array();
        snap.forEach((child: any) => {
          let val = child.val();
          let item: NewsItemData = { ...val };
          item.Categories = Array.isArray(val.TagsList)
            ? val.TagsList.map((tag: string) => tag)
            : [];

          // Filter by categoryId and PostedAt
          if (item.PostedAtIso == PostedAt) {
            return;
          } else if (
            categoryId &&
            !item.Categories.includes(categoryId.toLocaleLowerCase())
          ) {
            return;
          }
          newsData.push(item);
        });
        // Filter by category id and limit count here
        if (categoryId.length > 0) {
          newsData = newsData.slice(-limit);
        } else {
          newsData = newsData.slice(0, limit);
        }
        newsData.reverse();
        resolve(newsData);
      })
      .catch((err: any) => reject(err));
  });
};

export const getSportsForOdds = (): Array<League> => {
  const MLB = require("../assets/images/MLB.png");
  const NBA = require("../assets/images/NBA.png");
  const NFL = require("../assets/images/NFL.png");
  const NHL = require("../assets/images/NHL.png");
  const CFB = require("../assets/images/CFB.png");
  const GOLF = require("../assets/images/GOLF.png");
  const EPL = require("../assets/images/EPL.png");
  const MLS = require("../assets/images/MLS.png");

  const categories: League[] = [
    { Value: "FBP", Name: "NFL", Image: NFL },
    { Value: "FBC", Name: "CFB", Image: CFB },
    { Value: "BKP", Name: "NBA", Image: NBA },
    { Value: "BKC", Name: "NCAAB", Image: NBA },

    { Value: "BBM", Name: "MLB", Image: MLB },
    { Value: "HKN", Name: "NHL", Image: NHL },
    { Value: "SOE", Name: "EPL", Image: EPL },
    { Value: "SOM", Name: "MLS", Image: MLS },
  ];
  return categories;
};

export const getFutureData = (
  bettingbettype: string
): Promise<Array<BettingMarket>> => {
  if (bettingbettype == "To Make the Playoffs") {
    const url = `https://us1.catenaus.com/api/v2/app/oddsfeed/nfl/futures`;
    return axios({ url, method: "get", responseType: "json" }).then(
      (data: any) => {
        if (data.status == 200) {
          console.log("all futures", data);
          const filtered = data.data[0].BettingMarkets.filter(
            (item: BettingMarket) => item.BettingBetTypeID == 11
          );
          return filtered;
        }
      }
    );
  } else {
    const url = `https://us1.catenaus.com/api/v2/app/oddsfeed/nfl/futures?BettingBetType=${bettingbettype}`;
    return axios({ url, method: "get", responseType: "json" }).then(
      (data: any) => {
        console.log(data);
        if (data.status == 200) {
          return data.data;
        }
      }
    );
  }
};

export const getOddsData = async (leagues: League[]): Promise<Game[][]> => {
  const result = [];
  const today = new Date().toISOString().substring(0, 10);
  for (let i = 0; i < leagues.length; i++) {
    const url = `https://us1.catenaus.com/api/v2/app/oddsfeed/${leagues[
      i
    ].Name.toLowerCase()}/odds?Day=${today}`;
    const { data } = await axios({ url, method: "get", responseType: "json" });
    if (leagues[i].Name.toLowerCase() == "cfb") {
      const Teams = await axios({
        url: `https://us1.catenaus.com/api/v2/app/oddsfeed/cfb/teams`,
        method: "get",
        responseType: "json",
      });
      for (let i = 0; i < data.length; i++) {
        const awayTeam = Teams.data.find(
          (element) => element.TeamID === data[i].AwayTeamId
        );
        const homeTeam = Teams.data.find(
          (element) => element.TeamID === data[i].HomeTeamId
        );
        data[i].AwayTeamName = awayTeam.ShortDisplayName;
        data[i].HomeTeamName = homeTeam.ShortDisplayName;
      }
    }
    console.log(data, i, url);
    // Calculate the end date of the window of games to display
    let endDate = new Date();
    if (data.length > 0) {
      let game = data[0];
      // By default, the end date will be a week after the first game
      endDate.setTime(new Date(game.Day).getTime() + 1000 * 60 * 60 * 24 * 6.5);
    }
    let games = data.filter((game: Game): boolean => {
      // Ignore games too far out in the future
      if (new Date(game.Day) > endDate) {
        return false;
      }
      return true;
    });
    result.push(games);
  }
  console.log("all data", result);
  return result;

  // return axios({ url, method: "get", responseType: "json" }).then(
  //   async (res: any) => {
  //     if (res.status == 200) {
  //       console.log("get odd data result", res);
  //       if (leagueCode.toLowerCase() == "cfb") {
  //         const Teams = await axios({
  //           url: `https://us1.catenaus.com/api/v2/app/oddsfeed/cfb/teams`,
  //           method: "get",
  //           responseType: "json",
  //         });
  //         for (let i = 0; i < res.data.length; i++) {
  //           const awayTeam = Teams.data.find(
  //             (element) => element.TeamID === res.data[i].AwayTeamId
  //           );
  //           const homeTeam = Teams.data.find(
  //             (element) => element.TeamID === res.data[i].HomeTeamId
  //           );
  //           res.data[i].AwayTeamName = awayTeam.ShortDisplayName;
  //           res.data[i].HomeTeamName = homeTeam.ShortDisplayName;
  //         }
  //       }
  //       return res.data;
  //     }
  //   }
  // );
};

export const getSportsbooks = (): SportBookItemType[] => {
  // const url = `https://us1.catenaus.com/api/v2/app/oddsfeed/sportsbooks`;
  // const res = await axios({ url, method: "GET", responseType: "json" });
  // if (res.status == 200) {
  //   return res.data;
  // }
  return [
    {
      _id: 12,
      SportsDataId: 12,
      Sportsbook: "ParxPA",
      list_offer: false,
      nice_name: "Parx",
    },
    {
      _id: 10,
      SportsDataId: 10,
      Sportsbook: "SugarHouseNJ",
      list_offer: true,
      nice_name: "SugarHouse",
      affiliate_link:
        "https://www.thelines.com/recommends/sugarhouse-sportsbook-nj/",
      review_link: "https://www.thelines.com/sugarhouse-nj-sportsbook/",
      logo: "https://us1.catenaus.com/import/img/sugarhouse_sportsbook_nj.jpg",
      bonus_text: "Up To $250 Bonus On Deposit",
    },
    {
      _id: 25,
      SportsDataId: 25,
      Sportsbook: "UnibetNJ",
      list_offer: false,
      nice_name: "Unibet",
      affiliate_link: "https://www.thelines.com/recommends/unibet-sportsbook/",
      logo: "https://us1.catenaus.com/import/img/2019-unibet-logo-white-204x160-template.png",
      review_link: "https://www.thelines.com/unibet-sportsbook/",
      bonus_text: "$600 Risk Free Bet",
    },
    {
      _id: 9,
      SportsDataId: 9,
      Sportsbook: "SugarHousePA",
      list_offer: false,
      nice_name: "SugarHouse",
      affiliate_link:
        "https://www.thelines.com/recommends/sugarhouse-sportsbook-nj/",
      review_link: "https://www.thelines.com/sugarhouse-nj-sportsbook/",
      logo: "https://us1.catenaus.com/import/img/sugarhouse_sportsbook_nj.jpg",
      bonus_text: "Up To $250 Bonus On Deposit",
    },
    {
      _id: 22,
      SportsDataId: 22,
      Sportsbook: "Consensus",
      list_offer: false,
      nice_name: "Consensus",
    },
    {
      _id: 7,
      SportsDataId: 7,
      Sportsbook: "DraftKings",
      list_offer: false,
      nice_name: "DraftKings",
      affiliate_link:
        "https://www.thelines.com/recommends/draftkings-sportsbook/",
      logo: "https://us1.catenaus.com/import/img/DraftKings-Sportsbook.svg",
      review_link: "https://www.thelines.com/draftkings-sportsbook/",
      bonus_text: "Up to $1,050 Free",
    },
    {
      _id: 14,
      SportsDataId: 14,
      Sportsbook: "RiversCasinoPA",
      list_offer: false,
      nice_name: "Rivers Casino",
    },
    {
      _id: 13,
      SportsDataId: 13,
      Sportsbook: "888SportNJ",
      list_offer: true,
      nice_name: "888Sport",
      affiliate_link: "https://www.thelines.com/recommends/888-sportsbook/",
      review_link: "https://www.thelines.com/nj/888sport/",
      logo: "https://us1.catenaus.com/import/img/sportnj_logo_240x160.png",
      bonus_text: "Up To $500 Risk Free",
    },
    {
      _id: 8,
      SportsDataId: 8,
      Sportsbook: "FanDuel",
      affiliate_link:
        "https://www.thelines.com/recommends/fanduel-sportsbook-nj/",
      review_link: "https://www.thelines.com/fanduel-sportsbook/",
      logo: "https://us1.catenaus.com/import/img/Fanduel-Sportsbook-logo_Vert_LightBG.svg",
      list_offer: true,
      nice_name: "FanDuel",
      bonus_text: "$1,000 Risk Free Bet",
    },
    {
      _id: 5,
      SportsDataId: 5,
      Sportsbook: "Bookmaker",
      list_offer: false,
      nice_name: "Bookmaker",
    },
    {
      _id: 23,
      SportsDataId: 23,
      Sportsbook: "PointsBet",
      list_offer: false,
      nice_name: "PointsBet",
      affiliate_link:
        "https://www.thelines.com/recommends/pointsbet-sportsbook/",
      review_link: "https://www.thelines.com/pointsbet-sportsbook/",
      logo: "https://us1.catenaus.com/import/img/pointsbet-logo.svg",
      bonus_text: "$2,000 In Free Bets On Deposit",
    },
    {
      _id: 1,
      SportsDataId: 1,
      Sportsbook: "Pinnacle",
      list_offer: false,
      nice_name: "Pinnacle",
    },
    {
      _id: 16,
      SportsDataId: 16,
      Sportsbook: "GoldenNuggetNV",
      list_offer: true,
      nice_name: "GoldenNugget",
    },
    {
      _id: 17,
      SportsDataId: 17,
      Sportsbook: "MirageMgmNV",
      list_offer: false,
      nice_name: "Mirage MGM",
    },
    {
      _id: 18,
      SportsDataId: 18,
      Sportsbook: "WestgateSuperbookNV",
      list_offer: false,
      nice_name: "Westgate Superbook",
    },
    {
      _id: 20,
      SportsDataId: 20,
      Sportsbook: "WynnNV",
      list_offer: false,
      nice_name: "Wynn",
    },
    {
      _id: 19,
      SportsDataId: 19,
      Sportsbook: "WilliamHillNV",
      list_offer: true,
      nice_name: "Caesars Sportsbook",
      affiliate_link: "https://www.thelines.com/recommends/caesars-sportsbook/",
      review_link: "https://www.thelines.com/caesars-sportsbook/",
      logo: "https://us1.catenaus.com/import/img/CZRs-Icon-Sportsbook-Logo-dark-1.png",
      bonus_text: "Up to $5,000 Risk Free Bet",
    },
    {
      _id: 21,
      SportsDataId: 21,
      Sportsbook: "PlayMgmNV",
      list_offer: true,
      nice_name: "BetMGM",
      affiliate_link: "https://www.thelines.com/recommends/betmgm-sports/",
      review_link: "https://www.thelines.com/betmgm-sportsbook/",
      logo: "https://us1.catenaus.com/import/img/bet-mgm.svg",
      bonus_text: "$1,000 Risk Free Bet",
    },
    {
      _id: 4,
      SportsDataId: 4,
      Sportsbook: "BetDSI",
      list_offer: false,
      nice_name: "BetDSI",
    },
  ];
};

export const getPodcasts = (
  categoryId: string,
  limit: number,
  PostedAt: string | number | boolean | null
): Promise<Array<PodcastItemData>> => {
  // Filter by date
  return new Promise(async (resolve, reject) => {
    const ref = database().ref("podcasts");
    let num: number = 0;
    let query = ref.orderByChild("PostedAtIso");
    if (PostedAt) {
      query = ref.orderByChild("PostedAtIso").endAt(PostedAt);
    }
    // If categoryId is not set, limit the count to fetch
    if (categoryId.length == 0) {
      try {
        let ttt = await ref
          .orderByChild("PostedAtIso")
          .equalTo(PostedAt)
          .once("value");
        num = ttt.val() ? Object.keys(ttt.val()).length : 0;
      } catch (error) {
        console.log("firebase query error", error);
      }
      query = query.limitToLast(limit + num);
    }
    query
      .once("value", (snap: any) => {
        let podcastData = Array();
        snap.forEach((child: any) => {
          let val = child.val();
          let item: PodcastItemData = { ...val };
          item.Categories = Array.isArray(val.TagsList)
            ? val.TagsList.map((tag: string) => tag)
            : [];
          item.Thumb =
            "https://i1.sndcdn.com/artworks-r29SjrT1bZwnAIZo-ZjKckQ-large.jpg";

          // Filter by categoryId and PostedAt
          if (item.PostedAtIso == PostedAt) {
            return;
          } else if (
            categoryId &&
            !item.Categories.includes(categoryId.toLowerCase())
          ) {
            return;
          }

          podcastData.push(item);
        });

        // Filter by category id and limit count here
        if (categoryId.length > 0) {
          podcastData = podcastData.slice(-limit);
        } else {
          podcastData = podcastData.slice(0, limit);
        }

        podcastData.reverse();
        console.log("@@@@@@@", podcastData);
        resolve(podcastData);
      })
      .catch((err: any) => reject(err));
  });
};

export const getSportsBooks = (
  limit: number
): Promise<Array<SportsbookItemData>> => {
  // Filter by date
  return new Promise((resolve, reject) => {
    const ref = database().ref("sportsbook");

    const query = ref.orderByChild("ID").limitToLast(limit);
    query
      .once("value", (snap: any) => {
        let sportsBookData = Array();
        snap.forEach((child: any) => {
          let val = child.val();

          let item: SportsbookItemData = { ...val };
          sportsBookData.push(item);
        });

        sportsBookData.reverse();
        resolve(sportsBookData);
      })
      .catch((err: any) => reject(err));
  });
};
