import axios from 'axios';
import { Game, League } from '../types';

const sampleData = [
    {
        "Title": "Rocket Mortgage Classic Odds: Bryson DeChambeau Heavy Favorite In Detroit",
        "Author": "FairwayJay",
        "AuthorLink": "https://www.thelines.com/author/fairwayjay/",
        "Thumb": "https://www.thelines.com/wp-content/uploads/2021/06/bryson-rocket-380x200.jpeg",
        "Category": "Golf",
        "Tags": ["Golf", "News", "Odds"],
        "PostedAt": new Date("2021-06-28T00:00:00"),
        "DetailLink": "https://www.thelines.com/rocket-mortgage-classic-odds-2021/"
    },
    {
        "Title": "Six Biggest Longshots To Win Stanley Cup in NHL Preseason Futures",
        "Author": "Stephen Andress",
        "AuthorLink": "https://www.thelines.com/author/stephen-andress/",
        "Thumb": "https://www.thelines.com/wp-content/uploads/2021/06/blues-trophy-380x200.jpeg",
        "Category": "NHL",
        "Tags": ["News", "NHL", "Sports Betting"],
        "PostedAt": new Date("2021-06-27T00:00:00"),
        "DetailLink": "https://www.thelines.com/nhl-stanley-cup-longshots/"
    },
    {
        "Title": "UEFA Euro 2020 Odds: France, Italy, England The Favorites",
        "Author": "Marco Cerino",
        "AuthorLink": "https://www.thelines.com/author/marcocerino/",
        "Thumb": "https://www.thelines.com/wp-content/uploads/2021/06/euro-2016-380x200.jpeg",
        "Category": "Soccer",
        "Tags": ["News", "Odds", "Soccer"],
        "PostedAt": new Date("2021-06-27T00:00:00"),
        "DetailLink": "https://www.thelines.com/uefa-euro-2020-odds-france-england-belgium-2021/"
    },
    {
        "Title": "Odds For Next Year\u2019s Super Bowl: 2021-22 Futures For All 32 NFL Teams",
        "Author": "Matt Burke",
        "AuthorLink": "https://www.thelines.com/author/matt-burke/",
        "Thumb": "https://www.thelines.com/wp-content/uploads/2021/02/Next-Year-Super-Bowl-odds-2022-380x200.jpg",
        "Category": "NFL",
        "Tags": ["News", "NFL", "Super Bowl"],
        "PostedAt": new Date("2021-06-27T00:00:00"),
        "DetailLink": "https://www.thelines.com/next-year-super-bowl-odds-lvi-56-49ers-eagles-titans-bears-broncos-2022/"
    },
    {
        "Title": "How The Canadiens Defied Betting Odds To Reach The Stanley Cup Finals",
        "Author": "FairwayJay",
        "AuthorLink": "https://www.thelines.com/author/fairwayjay/",
        "Thumb": "https://www.thelines.com/wp-content/uploads/2021/06/canadiens-stanley-cup-odds-2021-380x200.jpg",
        "Category": "NHL",
        "Tags": ["News", "NHL", "Odds"],
        "PostedAt": new Date("2021-06-27T00:00:00"),
        "DetailLink": "https://www.thelines.com/montreal-canadiens-longshot-odds-stanley-cup-finals-2021/"
    },
    {
        "Title": "Can Jacob DeGrom Win NL MVP? Odds Say Yes, History Says Probably Not",
        "Author": "Mo Nuwwarah",
        "AuthorLink": "https://www.thelines.com/author/mo-nuwwarah/",
        "Thumb": "https://www.thelines.com/wp-content/uploads/2021/06/degrom-1-380x200.jpg",
        "Category": "MLB",
        "Tags": ["MLB", "News"],
        "PostedAt": new Date("2021-06-25T00:00:00"),
        "DetailLink": "https://www.thelines.com/jacob-degrom-nl-mvp-betting-2021/"
    },
    {
        "Title": "NASCAR\u2019s Bubba Wallace Debuts DraftKings Car At Pocono",
        "Author": "Marco Cerino",
        "AuthorLink": "https://www.thelines.com/author/marcocerino/",
        "Thumb": "https://www.thelines.com/wp-content/uploads/2021/06/bubba-wallace-draftkings-car-380x200.png",
        "Category": "NASCAR",
        "Tags": ["NASCAR", "News"],
        "PostedAt": new Date("2021-06-27T00:00:00"),
        "DetailLink": "https://www.thelines.com/nascar-bubba-wallace-draftkings-car-2021/"
    },
    {
        "Title": "Euro 2020 Knockout Bracket Odds, Format And How To Watch",
        "Author": "Nate Weitzer",
        "AuthorLink": "https://www.thelines.com/author/nweitzer7/",
        "Thumb": "https://www.thelines.com/wp-content/uploads/2021/06/italy-380x200.jpeg",
        "Category": "Soccer",
        "Tags": ["News", "Odds", "Soccer"],
        "PostedAt": new Date("2021-06-27T00:00:00"),
        "DetailLink": "https://www.thelines.com/euro-2020-knockout-bracket-odds-2021/"
    },
    {
        "Title": "Tokyo 2020 Olympics: Team USA Basketball Odds And Men\u2019s Roster",
        "Author": "Mo Nuwwarah",
        "AuthorLink": "https://www.thelines.com/author/mo-nuwwarah/",
        "Thumb": "https://www.thelines.com/wp-content/uploads/2021/06/kevin-durant-olympis-380x200.jpeg",
        "Category": "NBA",
        "Tags": ["NBA", "News", "Odds", "Olympics"],
        "PostedAt": new Date("2021-06-24T00:00:00"),
        "DetailLink": "https://www.thelines.com/team-usa-basketball-odds-olympics-2021/"
    },
    {
        "Title": "\u2018Sports Betting 101\u2019 Event Reveals Diverse Businesses Have Interest In Maryland Sports Betting",
        "Author": "Derek Helling",
        "AuthorLink": "https://www.thelines.com/author/dhelling/",
        "Thumb": "https://www.thelines.com/wp-content/uploads/2021/06/maryland-flag-380x200.jpeg",
        "Category": "Industry",
        "Tags": ["Industry", "News", "Sports Betting"],
        "PostedAt": new Date("2021-06-23T00:00:00"),
        "DetailLink": "https://www.thelines.com/maryland-sports-betting-101-businesses-2021/"
    }
];

export const getNewsCategories = (): Promise<Array<any>> => {
  let categoryNames = new Set();
  sampleData.forEach(d => categoryNames.add(d.Category));

  let categories: any[] = [];
  categories.push({Id: '', Name: 'All'});
  categoryNames.forEach((c) => {
    categories.push({Id: c, Name: c});
  });

  return new Promise((resolve) => {
    resolve(categories);
  });
}

export const getNews = (categoryId: string, limit: number, timeBefore?: Date): Promise<Array<any>> => {
  // Filter by date
  return new Promise((resolve, reject) => {
    let newsData = [...sampleData];
    if (categoryId) {
        newsData = newsData.filter(d => d.Category == categoryId);
    }
    if (timeBefore) {
      newsData = newsData.filter(d => d.PostedAt < timeBefore);
    }
    // Sort by desc
    newsData.sort((a, b) => b.PostedAt.getTime() - a.PostedAt.getTime());
    // Limit number
    resolve(newsData.slice(0, limit));
  });
}

export const getSportsForOdds = (): Promise<Array<League>> => {
  return new Promise((resolve, reject) => {
    resolve([
      {Value: 'BBM', Name: 'MLB'},
      {Value: 'BKP', Name: 'NBA'},
      {Value: 'FBP', Name: 'NFL'},
      {Value: 'HKN', Name: 'NHL'},
      {Value: 'BKC', Name: 'NCAAB'},
      {Value: 'FBC', Name: 'NCAAF'},
      {Value: 'SOE', Name: 'EPL'},
      {Value: 'SOM', Name: 'MLS'},
    ])
  });
}

export const getOddsData = (leagueCode: string): Promise<Array<Game>> => {
  const today = new Date().toISOString().substring(0, 10);
  const url = `https://us1.catenaus.com/api/v2/app/oddsfeed/${leagueCode.toLowerCase()}/odds?Day=${today}`;
  return axios({url, method: 'get', responseType: 'json'}).then((data: any) => {
    if (data.status == 200) {
      return data.data;
    }
  });
}