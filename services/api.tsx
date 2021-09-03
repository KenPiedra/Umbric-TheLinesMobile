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

  const categories = [
    { Value: "BBM", Name: "MLB", Image: MLB },
    { Value: "BKP", Name: "NBA", Image: NBA },
    { Value: "FBP", Name: "NFL", Image: NFL },
    { Value: "HKN", Name: "NHL", Image: NHL },
    { Value: "BKC", Name: "NCAAB", Image: NBA },
    { Value: "FBC", Name: "CFB", Image: CFB },
    { Value: "SOE", Name: "EPL", Image: EPL },
    { Value: "SOM", Name: "MLS", Image: MLS },
  ];
  return categories;
};

export const getFutureData = (
  bettingbettype: string
): Promise<Array<BettingMarket>> => {
  const url = `https://us1.catenaus.com/api/v2/app/oddsfeed/nfl/futures?BettingBetType=${bettingbettype}`;
  return axios({ url, method: "get", responseType: "json" }).then(
    (data: any) => {
      console.log(data);
      if (data.status == 200) {
        return data.data;
      }
    }
  );
};

export const getOddsData = (leagueCode: string): Promise<Array<Game>> => {
  const today = new Date().toISOString().substring(0, 10);
  const url = `https://us1.catenaus.com/api/v2/app/oddsfeed/${leagueCode.toLowerCase()}/odds?Day=${today}`;
  console.log("url", url);
  return axios({ url, method: "get", responseType: "json" }).then(
    async (res: any) => {
      if (res.status == 200) {
        console.log("get odd data result", res);
        if (leagueCode.toLowerCase() == "cfb") {
          const Teams = await axios({
            url: `https://us1.catenaus.com/api/v2/app/oddsfeed/cfb/teams`,
            method: "get",
            responseType: "json",
          });
          for (let i = 0; i < res.data.length; i++) {
            const awayTeam = Teams.data.find(
              (element) => element.TeamID === res.data[i].AwayTeamId
            );
            const homeTeam = Teams.data.find(
              (element) => element.TeamID === res.data[i].HomeTeamId
            );
            res.data[i].AwayTeamName = awayTeam.ShortDisplayName;
            res.data[i].HomeTeamName = homeTeam.ShortDisplayName;
          }
        }
        return res.data;
      }
    }
  );
};

export const getSportsbooks = async (): Promise<SportBookItemType[]> => {
  const url = `https://us1.catenaus.com/api/v2/app/oddsfeed/sportsbooks`;
  const res = await axios({ url, method: "GET", responseType: "json" });
  if (res.status == 200) {
    return res.data;
  }
  return [];
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
