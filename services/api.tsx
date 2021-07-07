import axios from 'axios';

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

const samplePodcastData = [
    {
        "Title": "Episode 173: NBA Playoff Injuries Impact on Futures Market",
        "Author": "Brett Collson",
        "Thumb": "https://i1.sndcdn.com/artworks-r29SjrT1bZwnAIZo-ZjKckQ-large.jpg",
        "PostedAtIso": "2021-07-01T20:36:56Z",
        "Description": "Matt Brown and Stephen Andress breakdown how Giannis' latest injury has impacted the NBA Playoffs and futures betting markets. Sports betting takes on the MLB MVP, Cy Young Award Picks and baseball futures. Plus Wimbledon odds, Stanley Cup Finals Updates and early NFL passing props.\n\nEPISODE 173 TIMESTAMPS (SPONSORED BY BETMGM)\n\n\u25ba 00:00 Welcome to Episode 173 of The Lines Podcast! \n\u25ba 00:31 NBA Playoffs Injuries Impact on Odds\n\u25ba 14:32 Wimbledon Updates\n\u25ba 18:13 Stanley Cup Updates & Odds\n\u25ba 22:41 MLB MVP Futures Odds & Picks\n\u25ba 31:38 MLB Cy Young Picks & Odds\n\u25ba 38:57 NFL Passing Yards Props \n\u25ba 44:27 How to Find the BEST Odds in your State at TheLines.com",
        "DetailLink": "https://soundcloud.com/thelinesus/episode-173-nba-playoff-injuries-impact-on-futures-market",
        "Duration": 2730083,
        "AudioID": 1079730352,
        "Category": "NBA",
        "ClientID": "LBCcHmRB8XSStWL6wKH2HPACspQlXg2P",
        "Tags": "nbapicks,sports,betting,gambling,freepicks,nbaplayoffs,mlbpicks,nflpicks,cyyoung,mlbmvp,freebets",
        "TagsList": ["nbapicks", "sports", "betting", "gambling", "freepicks", "nbaplayoffs", "mlbpicks", "nflpicks", "cyyoung", "mlbmvp", "freebets"]
    },
    {
        "Title": "Episode 172: NBA Conference Finals Picks & MLB Futures Odds",
        "Author": "Brett Collson",
        "Thumb": "https://i1.sndcdn.com/artworks-r29SjrT1bZwnAIZo-ZjKckQ-large.jpg",
        "PostedAtIso": "2021-06-23T21:50:04Z",
        "Description": "Matt Brown and Stephen Andress give their sports betting takes on the NBA Conference Finals, MLB MVP Picks and baseball futures, plus new betting options for the upcoming NFL Season.\nEPISODE 172 TIMESTAMPS (SPONSORED BY BETMGM)\n\n\u25ba 00:00 Welcome to Episode 172 of The Lines Podcast! \n\u25ba 00:39 NBA Playoffs Conference Finals Picks\n\u25ba 10:28 PGA U.S. Open Lessons Learned\n\u25ba 20:15 PGA The Open Championship Odds\n\u25ba 28:01 MLB Futures Odds & Picks\n\u25ba 37:59 New NFL Betting Options\n\u25ba 46:23 How to Find the BEST Odds in your State at TheLines.com",
        "DetailLink": "https://soundcloud.com/thelinesus/episode-172-nba-conference-finals-picks-mlb-futures-odds",
        "Duration": 2959543,
        "AudioID": 1074589795,
        "Category": "NFL",
        "ClientID": "LBCcHmRB8XSStWL6wKH2HPACspQlXg2P",
        "Tags": "freepicks,sportsbetting,gambling,nflodds,mlbodds,bestbets,nbapicks,mlbpicks,nflpicks,sports,nfl,mlb,pga,nba,thelines",
        "TagsList": ["freepicks", "sportsbetting", "gambling", "nflodds", "mlbodds", "bestbets", "nbapicks", "mlbpicks", "nflpicks", "sports", "nfl", "mlb", "pga", "nba", "thelines"]
    },
    {
        "Title": "Episode 171: U.S. Open 2021 PGA Betting Preview",
        "Author": "Brett Collson",
        "Thumb": "https://i1.sndcdn.com/artworks-r29SjrT1bZwnAIZo-ZjKckQ-large.jpg",
        "PostedAtIso": "2021-06-15T23:54:59Z",
        "Description": "Matt Brown, Brett Collson and Stephen Andress break down everything you need to know before placing a bet on The 2021 U.S. Open, including their course favorites and longshot picks. Plus, some predictions and best bets from each before the tournament tees off on Thursday.\n\nEPISODE 171 TIMESTAMPS (SPONSORED BY BETMGM)\n\n\u25ba 00:00 Welcome to Episode 171 of The Lines Podcast! \n\u25ba 01:13 U.S. Open Course Preview: Torrey Pines \n\u25ba 12:47 PGA U.S. Open Favorites Odds\n\u25ba 29:07 PGA U.S. Open Mid-Tier Picks\n\u25ba 48:25 PGA U.S. Open Longshot Picks\n\u25ba 58:21 Top 10 & 20 Finishes Picks\n\u25ba 1:10:33 U.S. Open Outright Winner Picks \n\u25ba 1:21:58 How to Find the BEST Odds in your State at TheLines.com",
        "DetailLink": "https://soundcloud.com/thelinesus/episode-171-us-open-2021-pga-betting-preview",
        "Duration": 4992000,
        "AudioID": 1069263001,
        "Category": "Golf",
        "ClientID": "LBCcHmRB8XSStWL6wKH2HPACspQlXg2P",
        "Tags": "golf,pgapicks,sports,betting,golfpicks,gambling,usopen,pga",
        "TagsList": ["golf", "pgapicks", "sports", "betting", "golfpicks", "gambling", "usopen", "pga"]
    },
    {
        "Title": "Episode 170: UFC 263 Picks, NBA Playoffs Rd 2 & EURO 2020 Picks",
        "Author": "Brett Collson",
        "Thumb": "https://i1.sndcdn.com/artworks-r29SjrT1bZwnAIZo-ZjKckQ-large.jpg",
        "PostedAtIso": "2021-06-09T17:29:09Z",
        "Description": "Matt Brown and Stephen Andress bring us a jam-packed show this week with special expert guest insights for Saturday's UFC 263 and EURO 2020 Soccer Preview. Plus NBA Playoff updates and how the Julio Jones trade has impacted the NFL Futures market.\nPISODE 170 TIMESTAMPS (SPONSORED BY BETMGM)\n\n\u25ba 00:00 Welcome to Episode 170 of The Lines Podcast! \n\u25ba 01:01 NBA Playoffs Breakdown\n\u25ba 12:40 Euro 2020 Soccer Picks w/ Alex Blowers\n\u25ba 23:40 Julio Jones Trade Impact on NFL Futures\n\u25ba 41:07 PGA Palmetto Picks\n\u25ba 50:04 UFC 263 Picks w/ Dann Stupp\n\u25ba 1:06:57 How to Find the BEST Odds in your State at TheLines.com",
        "DetailLink": "https://soundcloud.com/thelinesus/episode-170-ufc-263-picks-nba-playoffs-rd-2-euro-2020-picks",
        "Duration": 4080196,
        "AudioID": 1065179920,
        "Category": "UFC",
        "ClientID": "LBCcHmRB8XSStWL6wKH2HPACspQlXg2P",
        "Tags": "sports,gambling,ufcpicks,euro2020,nflpicks",
        "TagsList": ["sports", "gambling", "ufcpicks", "euro2020", "nflpicks"]
    },
    {
        "Title": "Episode 169: Injury Riddled NBA Playoffs, Circa Sports Million III Announced",
        "Author": "Brett Collson",
        "Thumb": "https://i1.sndcdn.com/artworks-r29SjrT1bZwnAIZo-ZjKckQ-large.jpg",
        "PostedAtIso": "2021-06-02T22:03:44Z",
        "Description": "Matt Brown and Stephen Andress cover where to find the best betting value during this injury plagued NBA Playoffs, break down this years Circa Sports Million III NFL contest plus, betting previews for the Belmont Stakes and PGA Memorial.\n\nEPISODE 169 TIMESTAMPS (SPONSORED BY BETMGM)\n\n\u25ba 00:00 Welcome to Episode 169 of The Lines Podcast! \n\u25ba 01:11 Injuries impacting NBA Playoffs\n\u25ba 15:17 Circa Sports Million III Announced\n\u25ba 24:05 Jake Paul vs Tyron Woodley Boxing Preview\n\u25ba 27:13 Belmont Stakes 2021 Preview\n\u25ba 33:48 PGA Memorial Preview\n\u25ba 51:37 How to Find the BEST Odds in your State at TheLines.com",
        "DetailLink": "https://soundcloud.com/thelinesus/episode-169-injury-riddled-nba-playoffs-circa-sports-million-iii-announced",
        "Duration": 3154756,
        "AudioID": 1060823443,
        "Category": "NFL",
        "ClientID": "LBCcHmRB8XSStWL6wKH2HPACspQlXg2P",
        "Tags": "sports,gambling,golf,boxing,horseracing,freepicks,betting,nbaplayoffs,nfl",
        "TagsList": ["sports", "gambling", "golf", "boxing", "horseracing", "freepicks", "betting", "nbaplayoffs", "nfl"]
    },
    {
        "Title": "2021 PGA Championship Special: Head to Head Best Bets",
        "Author": "Brett Collson",
        "Thumb": "https://i1.sndcdn.com/artworks-r29SjrT1bZwnAIZo-ZjKckQ-large.jpg",
        "PostedAtIso": "2021-05-19T19:57:30Z",
        "Description": "On this special edition of The Lines Podcast, Stephen Andress and Fairway Jay dive in to the Best Head to Head Bets and Match Ups for this weeks 2021 PGA Championship.\n\nEPISODE TIMESTAMPS (SPONSORED BY BETMGM)\n00:00 Welcome to The Lines Podcast!\n00:28 How Fairway Jay Sees Ocean Course Playing\n02:42 Players to Fade in H2Hs\n05:15 Players FairwayJay Likes in H2Hs\n09:00 H2H Price Movement\n11:00 Favorite Players To Back in H2Hs\n13:17 Handicapping First-Round vs. Full Tournament H2Hs\n14:47 Picks to Win PGA Championship",
        "DetailLink": "https://soundcloud.com/thelinesus/2021-pga-championship-special-head-to-head-best-bets",
        "Duration": 1075931,
        "AudioID": 1051666444,
        "Category": "Golf",
        "ClientID": "LBCcHmRB8XSStWL6wKH2HPACspQlXg2P",
        "Tags": "sports,bettting,golf,pga,golfpicks",
        "TagsList": ["sports", "bettting", "golf", "pga", "golfpicks"]
    },
    {
        "Title": "Episode 168: PGA Championship 2021 Betting Preview Special",
        "Author": "Brett Collson",
        "Thumb": "https://i1.sndcdn.com/artworks-r29SjrT1bZwnAIZo-ZjKckQ-large.jpg",
        "PostedAtIso": "2021-05-18T20:21:40Z",
        "Description": "The gang's all here to talk all things PGA Championship. Matt Brown, Brad Allen, Brett Collson and Stephen Andress break down everything you need to know before placing a bet on The PGA Championship, including their favorite course fades and longshot picks. Plus, some predictions and best bets from each before the tournament tees off on Thursday.\nTopics and Timestamps:\n\u25ba 00:00 Welcome to Episode 168 of The Lines Podcast! \n\u25ba 01:04 PKiawah Golf Resort Course Preview\n\u25ba 02:21 PGA Championship Betting Strategy\n\u25ba 09:12 Heavy Favorite and Mid-Tier Golfer Picks\n\u25ba 27:13 Longshot Golfer Odds and Picks\n\u25ba 42:56 PGA Championship Fades\n\u25ba 47:39 PGA Championship Best Bets\n\u25ba 56:38 How to Find the BEST Odds in your State at TheLines.com",
        "DetailLink": "https://soundcloud.com/thelinesus/episode-168-pga-championship-2021-betting-preview-special",
        "Duration": 3473476,
        "AudioID": 1051108267,
        "Category": "Betting",
        "ClientID": "LBCcHmRB8XSStWL6wKH2HPACspQlXg2P",
        "Tags": "betting,sports,gambling,pgachampionship,golfpicks",
        "TagsList": ["betting", "sports", "gambling", "pgachampionship", "golfpicks"]
    },
    {
        "Title": "Episode 167: NBA Playoff Picks And NFL Schedule Release",
        "Author": "Brett Collson",
        "Thumb": "https://i1.sndcdn.com/artworks-r29SjrT1bZwnAIZo-ZjKckQ-large.jpg",
        "PostedAtIso": "2021-05-14T15:09:14Z",
        "Description": "Matt Brown and Stephen Andress talk NBA Playoffs and how they approach the most popular betting markets. A full look at the NFL Schedule and betting tips for the upcoming season. Plus, an interview with Ed Miller, CEO at Deck Prism Sports and more.\nTopics and Timestamps:\n\u25ba 00:00 Welcome to Episode 167 of The Lines Podcast! \n\u25ba 01:05 NBA Playoff Lines, Odds and Picks\n\u25ba 10:06 NFL Schedule Release\n\u25ba 43:52 Interview with Ed Miller, CEO at Deck Prism Sports\n\u25ba 57:06 Preakness Stakes Picks\n\u25ba 59:57 How to Find the BEST Odds in your State at TheLines.com",
        "DetailLink": "https://soundcloud.com/thelinesus/episode-167-nba-playoff-picks-and-nfl-schedule-release",
        "Duration": 3659102,
        "AudioID": 1048744993,
        "ClientID": "LBCcHmRB8XSStWL6wKH2HPACspQlXg2P",
        "Tags": "sports,gamgling,betting,nflpicks,nbapicks,nfl,nbaplayoffs",
        "TagsList": ["sports", "gamgling", "betting", "nflpicks", "nbapicks", "nfl", "nbaplayoffs"]
    },
    {
        "Title": "Episode 166: How The NFL Draft Changed The Futures Market",
        "Author": "Brett Collson",
        "Thumb": "https://i1.sndcdn.com/artworks-r29SjrT1bZwnAIZo-ZjKckQ-large.jpg",
        "PostedAtIso": "2021-05-05T21:09:53Z",
        "Description": "Matt Brown and Stephen Andress recap a busy week of action and lessons learned from the Kentucky Derby and NFL Draft. Plus NFL and NBA Futures market updates, latest odds, picks and PGA Wells Fargo Championship analysis.\n\nEPISODE 166 TIMESTAMPS (Brought to you by BetMGM)\n\u25ba 00:00 Welcome to Episode 166 of The Lines Podcast! \n\u25ba 01:17 Kentucky Derby Betting Recap\n\u25ba 05:49 NFL Draft Betting Recap\n\u25ba 21:31 Post-Draft NFL Futures Markets\n\u25ba 40:04 How have Injuries affected NBA Futures?\n\u25ba 49:28 PGA Picks: Wells Fargo Championship\n\u25ba 1:12:46 How to Find the BEST Odds in your State at TheLines.com",
        "DetailLink": "https://soundcloud.com/thelinesus/episode-166-how-the-nfl-draft-changed-the-futures-market",
        "Duration": 4487419,
        "AudioID": 1043362222,
        "Category": "MLB",
        "ClientID": "LBCcHmRB8XSStWL6wKH2HPACspQlXg2P",
        "Tags": "sports,gambling,nflodds,betting,nbaodds,nflpicks,nbapicks",
        "TagsList": ["sports", "gambling", "nflodds", "betting", "nbaodds", "nflpicks", "nbapicks"]
    },
    {
        "Title": "Episode 165: 2021 Kentucky Derby Special",
        "Author": "Brett Collson",
        "Thumb": "https://i1.sndcdn.com/artworks-r29SjrT1bZwnAIZo-ZjKckQ-large.jpg",
        "PostedAtIso": "2021-04-28T01:20:34Z",
        "Description": "Matt Brown and Stephen Andress are joined by special guests David Bontempo and Fairway Jay to talk all things Kentucky Derby with the latest info on each horse. Plus expert insight on the race favorites and their best longshot picks.",
        "DetailLink": "https://soundcloud.com/thelinesus/episode-165-2021-kentucky-derby-special",
        "Duration": 5294446,
        "AudioID": 1038136180,
        "ClientID": "LBCcHmRB8XSStWL6wKH2HPACspQlXg2P",
        "Tags": "horseracing,kentuckyderby,sports,gambling,betting",
        "TagsList": ["horseracing", "kentuckyderby", "sports", "gambling", "betting"]
    },
    {
        "Title": "Episode 164: 2021 NFL Draft Special",
        "Author": "Brett Collson",
        "Thumb": "https://i1.sndcdn.com/artworks-r29SjrT1bZwnAIZo-ZjKckQ-large.jpg",
        "PostedAtIso": "2021-04-26T20:56:30Z",
        "Description": "Matt Brown and Stephen Andress take a full, deep dive into the 2021 NFL Draft and how they approach the most popular betting markets. Thoughts on who will go 3rd overall and where to find the best value prop bets. Plus, and interview with Jeff Benson from Circa Sports.\nTopics and Timestamps:\n\u25ba 00:00 Welcome to Episode 164 of The Lines Podcast! \n\u25ba 02:44 2021 NFL Draft Locks\n\u25ba 06:25 Who will go 3rd Overall?\n\u25ba 21:13 No.4 Overall Picks & Betting Odds\n\u25ba 28:16 Position and Player Over/Unders\n\u25ba 49:45 Interview w/ Jeff Benson from Circa Sports\n\u25ba 1:01:27 Our 2021 NFL Draft Picks\n\u25ba 1:07:50  How to Find the BEST Odds in your State at TheLines.com",
        "DetailLink": "https://soundcloud.com/thelinesus/episode-164-2021-nfl-draft-special",
        "Duration": 4124735,
        "AudioID": 1037259301,
        "Category": "NFL",
        "ClientID": "LBCcHmRB8XSStWL6wKH2HPACspQlXg2P",
        "Tags": "sports,betting,gambling,nfl,draft,picks",
        "TagsList": ["sports", "betting", "gambling", "nfl", "draft", "picks"]
    },
    {
        "Title": "Episode 163: NFL Draft Betting -- Which Rumors Are Worth Chasing?",
        "Author": "Brett Collson",
        "Thumb": "https://i1.sndcdn.com/artworks-r29SjrT1bZwnAIZo-ZjKckQ-large.jpg",
        "PostedAtIso": "2021-04-21T22:17:25Z",
        "Description": "Matt Brown and Stephen Andress talk NFL Draft and how they approach the most popular betting markets. This year, the third overall pick is generating most of the buzz. Will it be Lance, Jones or Fields? Plus, an early look at the Kentucky Derby field and some horses to keep an eye on over the next week.",
        "DetailLink": "https://soundcloud.com/thelinesus/episode-163-nfl-draft-betting-which-rumors-are-worth-chasing",
        "Duration": 2222524,
        "AudioID": 1034201380,
        "ClientID": "LBCcHmRB8XSStWL6wKH2HPACspQlXg2P",
        "Tags": "sports,betting,gambling,nfl,draft,picks",
        "TagsList": ["sports", "betting", "gambling", "nfl", "draft", "picks"]
    },
    {
        "Title": "Episode 162: Betting Preview, Predictions For The Masters 2021",
        "Author": "Brett Collson",
        "Thumb": "https://i1.sndcdn.com/artworks-r29SjrT1bZwnAIZo-ZjKckQ-large.jpg",
        "PostedAtIso": "2021-04-05T21:22:39Z",
        "Description": "It's a foursome on the show this week. Matt Brown, Brad Allen, Brett Collson and Stephen Andress break down everything you need to know before placing a bet on The Masters, including their thoughts on the resurgence of Jordan Spieth. Plus, some predictions and best bets from each before the tournament tees off on Thursday.",
        "DetailLink": "https://soundcloud.com/thelinesus/episode-162-betting-preview-predictions-for-the-masters-2021",
        "Duration": 3517022,
        "AudioID": 1022885785,
        "Category": "Golf",
        "ClientID": "LBCcHmRB8XSStWL6wKH2HPACspQlXg2P",
        "Tags": "betting,sports,gambling,golf,masters,picks",
        "TagsList": ["betting", "sports", "gambling", "golf", "masters", "picks"]
    },
    {
        "Title": "Episode 161: Circa And The Future Of Sports Betting, Final 4 Preview",
        "Author": "Brett Collson",
        "Thumb": "https://i1.sndcdn.com/artworks-r29SjrT1bZwnAIZo-ZjKckQ-large.jpg",
        "PostedAtIso": "2021-04-01T13:18:20Z",
        "Description": "Brett Collson, Matt Brown and Stephen Andress his the biggest news and events going on in sports betting this week. With the acquisition of VSiN, DraftKings has taken another step toward global domination. And some people aren't happy about it. Plus, A full betting preview of the Final Four this weekend, and final thoughts on the MLB season before Opening Day.",
        "DetailLink": "https://soundcloud.com/thelinesus/episode-161-circa-an-the-future-of-sports-betting-final-4-preview",
        "Duration": 3827252,
        "AudioID": 1020329965,
        "ClientID": "LBCcHmRB8XSStWL6wKH2HPACspQlXg2P",
        "Tags": "sports,gambling,betting,nfl,march madness,final 4",
        "TagsList": ["sports", "gambling", "betting", "nfl", "march madness", "final 4"]
    },
    {
        "Title": "Episode 160: NFL And NBA Trade Frenzy, Sweet 16 Betting Preview",
        "Author": "Brett Collson",
        "Thumb": "https://i1.sndcdn.com/artworks-r29SjrT1bZwnAIZo-ZjKckQ-large.jpg",
        "PostedAtIso": "2021-03-26T21:34:26Z",
        "Description": "Stephen Andress, the new Managing Editor of TheLines.com, makes his debut on the podcast this week. He joins Brett Collson and Matt Brown to break down the big moves in the NFL and NBA and the impact on betting markets. Plus, a preview of the Sweet 16 of March Madness this weekend.",
        "DetailLink": "https://soundcloud.com/thelinesus/episode-160-nfl-and-nba-trade-frenzy-sweet-16-betting-preview",
        "Duration": 4059089,
        "AudioID": 1017017122,
        "ClientID": "LBCcHmRB8XSStWL6wKH2HPACspQlXg2P",
        "Tags": "gambling #betting,sports,mlb,nfl,nba,marchmadness",
        "TagsList": ["gambling #betting", "sports", "mlb", "nfl", "nba", "marchmadness"]
    },
    {
        "Title": "Episode 159: Betting The Players Championship",
        "Author": "Brett Collson",
        "Thumb": "https://i1.sndcdn.com/artworks-r29SjrT1bZwnAIZo-ZjKckQ-large.jpg",
        "PostedAtIso": "2021-03-10T20:40:30Z",
        "Description": "Matt Brown spends all of Episode 159 of TheLines podcast breaking down The Players Championship at TPC Sawgrass. Listen in for his take on the betting favorites and some potential longshots at the sportsbooks. Plus, for the first time ever, every shot during the tournament will be shown. The future of golf betting is nearly here!",
        "DetailLink": "https://soundcloud.com/thelinesus/episode-159-betting-the-players-championship",
        "Duration": 1621107,
        "AudioID": 1004339200,
        "Category": "NHL",
        "ClientID": "LBCcHmRB8XSStWL6wKH2HPACspQlXg2P",
        "Tags": "",
        "TagsList": []
    },
    {
        "Title": "Episode 158: Will The Golf Rungood Continue At The Arnold Palmer Invitational?",
        "Author": "Brett Collson",
        "Thumb": "https://i1.sndcdn.com/artworks-r29SjrT1bZwnAIZo-ZjKckQ-large.jpg",
        "PostedAtIso": "2021-03-03T22:30:46Z",
        "Description": "Matt Brown goes solo for a quick-hitting Episode 158 of TheLines Podcast. Matt gives his thoughts on the huge UFC 159 card coming up this weekend before diving into the Arnold Palmer Invitational in Florida.\n\nTopics and Timestamps:\n\n\u25ba 00:00 Welcome to Episode 158 of The Lines Podcast! \n\u25ba 01:00 Draftkings Partners with DISH Network\n\u25ba 03:17 UFC 259 Preview\n\u25ba 05:28 PGA Arnold Palmer Inv. Course Preview\n\u25ba 20:25 Arnold Palmer Inv. Matchups\n\u25ba 24:45 How to Find the BEST Odds in your State at TheLines.com",
        "DetailLink": "https://soundcloud.com/thelinesus/episode-158-will-the-golf-rungood-continue-at-the-arnold-palmer-invitational",
        "Duration": 1544751,
        "AudioID": 998104099,
        "Category": "MLB",
        "ClientID": "LBCcHmRB8XSStWL6wKH2HPACspQlXg2P",
        "Tags": "",
        "TagsList": []
    },
    {
        "Title": "Episode 157: MLB Futures Posted, NBA Top Shot Mania",
        "Author": "Brett Collson",
        "Thumb": "https://i1.sndcdn.com/artworks-r29SjrT1bZwnAIZo-ZjKckQ-large.jpg",
        "PostedAtIso": "2021-02-24T22:47:07Z",
        "Description": "Matt Brown and Brett Collson tackle the biggest sports betting stories of the week. Baseball futures markets have been posted at most books. Plus, the world's best golfers are set to tackle a new course at the WGC Workday Championships. And finally, what is this NBA Top Shot craze? We've started diving into the space to see what's up.",
        "DetailLink": "https://soundcloud.com/thelinesus/episode-157-mlb-futures-posted-nba-top-shot-mania",
        "Duration": 3800111,
        "AudioID": 992450638,
        "ClientID": "LBCcHmRB8XSStWL6wKH2HPACspQlXg2P",
        "Tags": "gambling,betting,golf,mlb",
        "TagsList": ["gambling", "betting", "golf", "mlb"]
    },
    {
        "Title": "Episode 156: Golf Betting Takes Center Stage At Riviera",
        "Author": "Brett Collson",
        "Thumb": "https://i1.sndcdn.com/artworks-r29SjrT1bZwnAIZo-ZjKckQ-large.jpg",
        "PostedAtIso": "2021-02-17T23:05:16Z",
        "Description": "Matt Brown tackles the latest in sports betting world on this week's episode of TheLines Podcast. First, a quick look at NBA and college basketball futures as March Madness approaches, Then to close out the show, a full breakdown of the Genesis Invitational with a star-studded field in California. Matt offers his top plays for the event.",
        "DetailLink": "https://soundcloud.com/thelinesus/episode-156-golf-betting-takes-center-stage-at-riviera",
        "Duration": 1831314,
        "AudioID": 987703012,
        "Category": "NBA",
        "ClientID": "LBCcHmRB8XSStWL6wKH2HPACspQlXg2P",
        "Tags": "sports,betting,nba,marchmadness,golf,gambling",
        "TagsList": ["sports", "betting", "nba", "marchmadness", "golf", "gambling"]
    },
    {
        "Title": "Episode 155: Super Bowl 55 Picks, Predictions, Props And More!",
        "Author": "Brett Collson",
        "Thumb": "https://i1.sndcdn.com/artworks-r29SjrT1bZwnAIZo-ZjKckQ-large.jpg",
        "PostedAtIso": "2021-02-05T20:16:21Z",
        "Description": "Super Bowl 55 is finally here. Matt Brown and Brad Allen unpack everything you need to know about betting on the big game, plus final thoughts on the outcome and which bets they've already made on Kansas City vs. Tampa Bay. Listen in before placing your bets this weekend!\n\nTopics and Timestamps\n\n\u25ba 00:00 Welcome to Episode 155 of The Lines Podcast! \n\u25ba 00:44 Super Bowl LV Injuries and Roster Updates \n\u25ba 04:04 Super Bowl LV Weather Update\n\u25ba 05:24 Super Bowl 55 Odds and Lines\n\u25ba 09:58 Key Game Day Match Ups\n\u25ba 25:10 Chiefs vs Bucs Paths to Victory\n\u25ba 30:27 Over / Under Plays for Super Bowl LV\n\u25ba 36:42 Best Player Props for Super Bowl LV\n\u25ba 40:47 Point Spread Betting Breakdown SBLV \n\u25ba 43:45 How to Find the BEST Odds in your State at TheLines.com",
        "DetailLink": "https://soundcloud.com/thelinesus/episode-155-super-bowl-55-picks-predictions-props-and-more",
        "Duration": 2678021,
        "AudioID": 979887226,
        "Category": "NFL",
        "ClientID": "LBCcHmRB8XSStWL6wKH2HPACspQlXg2P",
        "Tags": "sports,betting,nfl,super bowl,picks,predictions,odds",
        "TagsList": ["sports", "betting", "nfl", "super bowl", "picks", "predictions", "odds"]
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

export const getSportsForOdds = (): Promise<Array<object>> => {
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

export const getOddsData = (leagueCode: string): Promise<Array<object>> => {
  const today = new Date().toISOString().substring(0, 10);
  const url = `https://us1.catenaus.com/api/v2/app/oddsfeed/${leagueCode.toLowerCase()}/odds?Day=${today}`;
  return axios({url, method: 'get', responseType: 'json'}).then((data: any) => {
    if (data.meta.code == 200) {
      return data.results;
    } else {
      throw new Error(data.meta.description);
    }
  });
}

export const getPodcastCategories = (): Promise<Array<any>> => {
  let categoryNames = new Set();
  samplePodcastData.forEach(d => categoryNames.add(d.Category));

  let categories: any[] = [];
  categories.push({Id: '', Name: 'All'});
  categoryNames.forEach((c) => {
    categories.push({Id: c, Name: c});
  });

  return new Promise((resolve) => {
    resolve(categories);
  });
}

export const getPodcast = (categoryId: string, limit: number, timeBefore?: string): Promise<Array<any>> => {
  // Filter by date
  return new Promise((resolve, reject) => {
    let newsData = [...samplePodcastData];
    if (categoryId) {
        newsData = newsData.filter(d => d.Category == categoryId);
    }
    if (timeBefore) {
      newsData = newsData.filter(d => d.PostedAtIso < timeBefore);
    }
    // Sort by desc
    newsData.sort((a, b) => (a.PostedAtIso > b.PostedAtIso ? -1 : 1));
    // Limit number
    resolve(newsData.slice(0, limit));
  });
}
