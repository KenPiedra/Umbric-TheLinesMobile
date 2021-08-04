import database from "@react-native-firebase/database";
import axios from "axios";

import { Game, League } from "../types";
import { NewsItemData } from "../types/News";
import { PodcastItemData } from "../types/Podcast";
import { SportsbookItemData } from "../types/Sportsbook";

export const getNewsCategories = (): Array<Object> => {
  // Use following data temporary
  const categories = [
    { Id: "", Name: "All" },
    { Id: "Golf", Name: "Golf" },
    { Id: "NHL", Name: "NHL" },
    { Id: "Soccer", Name: "Soccer" },
    { Id: "NFL", Name: "NFL" },
    { Id: "MLB", Name: "MLB" },
    { Id: "NASCAR", Name: "NASCAR" },
    { Id: "NBA", Name: "NBA" },
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
  timeBefore?: Date
): Promise<Array<NewsItemData>> => {
  // Filter by date
  return new Promise((resolve, reject) => {
    const ref = database().ref("news");
    if (!timeBefore) timeBefore = new Date("9999-12-31T00:00:00");
    let query = ref.orderByChild("PostedAtIso").endAt(timeBefore.toString());

    // If categoryId is not set, limit the count to fetch
    if (!categoryId) {
      query = query.limitToLast(limit);
    }

    query
      .once("value", (snap: any) => {
        let newsData = Array();
        snap.forEach((child: any) => {
          let val = child.val();

          let item: NewsItemData = { ...val };
          item.PostedAt = new Date(val.PostedAtIso);
          item.Categories = Array.isArray(val.TagsList)
            ? val.TagsList.map((tag: string) =>
                capitalizeTheFirstLetterOfEachWord(tag)
              )
            : [];

          // Filter by categoryId and PostedAt
          if (item.PostedAt == timeBefore) {
            return;
          } else if (categoryId && !item.Categories.includes(categoryId)) {
            return;
          }

          newsData.push(item);
        });

        // Filter by category id and limit count here
        if (categoryId) {
          newsData = newsData.slice(-limit);
        }

        newsData.reverse();
        resolve(newsData);
      })
      .catch((err: any) => reject(err));
  });
};

export const getSportsForOdds = (): Array<League> => {
  const categories = [
    { Value: "BBM", Name: "MLB" },
    { Value: "BKP", Name: "NBA" },
    { Value: "FBP", Name: "NFL" },
    { Value: "HKN", Name: "NHL" },
    { Value: "BKC", Name: "NCAAB" },
    { Value: "FBC", Name: "NCAAF" },
    { Value: "SOE", Name: "EPL" },
    { Value: "SOM", Name: "MLS" },
  ];
  return categories;
};

export const getOddsData = (leagueCode: string): Promise<Array<Game>> => {
  const today = new Date().toISOString().substring(0, 10);
  const url = `https://us1.catenaus.com/api/v2/app/oddsfeed/${leagueCode.toLowerCase()}/odds?Day=${today}`;
  return axios({ url, method: "get", responseType: "json" }).then(
    (data: any) => {
      if (data.status == 200) {
        return data.data;
      }
    }
  );
};

export const getPodcasts = (
  categoryId: string,
  limit: number,
  timeBefore?: Date
): Promise<Array<PodcastItemData>> => {
  // Filter by date
  return new Promise((resolve, reject) => {
    const ref = database().ref("podcasts");

    if (!timeBefore) timeBefore = new Date("9999-12-31T00:00:00Z");
    let query = ref.orderByChild("PostedAtIso").endAt(timeBefore.toString());

    // If categoryId is not set, limit the count to fetch
    if (!categoryId) {
      query = query.limitToLast(limit);
    }

    query
      .once("value", (snap: any) => {
        let podcastData = Array();
        snap.forEach((child: any) => {
          let val = child.val();

          let item: PodcastItemData = { ...val };
          item.PostedAt = new Date(val.PostedAtIso);
          item.Categories = Array.isArray(val.TagsList)
            ? val.TagsList.map((tag: string) =>
                capitalizeTheFirstLetterOfEachWord(tag)
              )
            : [];
          item.Thumb =
            "https://i1.sndcdn.com/artworks-r29SjrT1bZwnAIZo-ZjKckQ-large.jpg";

          // Filter by categoryId and PostedAt
          if (item.PostedAt == timeBefore) {
            return;
          } else if (categoryId && !item.Categories.includes(categoryId)) {
            return;
          }

          podcastData.push(item);
        });

        // Filter by category id and limit count here
        if (categoryId) {
          podcastData = podcastData.slice(-limit);
        }

        podcastData.reverse();
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
