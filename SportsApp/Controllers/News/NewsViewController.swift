//
//  NewsViewController.swift
//  SportsApp
//
//  Created by Apurva on 03/06/21.
//

import UIKit

class NewsViewController: UIViewController,UICollectionViewDelegate,UICollectionViewDataSource,UICollectionViewDelegateFlowLayout {

    @IBOutlet weak var viewGolfNews: UIView!
    @IBOutlet weak var viewNHLNews: UIView!
    @IBOutlet weak var viewMLBNews: UIView!
    @IBOutlet weak var viewNFLNews: UIView!
    @IBOutlet weak var viewNBANews: UIView!
    @IBOutlet weak var lblAll: UILabel!
    @IBOutlet weak var lblGolf: UILabel!
    @IBOutlet weak var lblNHL: UILabel!
    @IBOutlet weak var lblMLB: UILabel!
    @IBOutlet weak var lblNFL: UILabel!
    @IBOutlet weak var lblNHLBottom: UILabel!
    @IBOutlet weak var lblNBA: UILabel!
    @IBOutlet weak var lblGolfNewsBottom: UILabel!
    @IBOutlet weak var lblMLBBottom: UILabel!
    
    @IBOutlet weak var lblNFLNewsBottom: UILabel!
    @IBOutlet weak var lblNBANewsBottom: UILabel!
    @IBOutlet weak var lblAllNewsBottom: UILabel!
    @IBOutlet weak var viewAllNewsTab: UIView!
    @IBOutlet weak var btnAll: UIButton!
    @IBOutlet weak var btnNBA: UIButton!
   
    @IBOutlet weak var btnNFL: UIButton!
    @IBOutlet weak var btnMLB: UIButton!
    @IBOutlet weak var btnNHL: UIButton!
    @IBOutlet weak var btnGolf: UIButton!
    
    @IBOutlet weak var viewContent: UIView!
    @IBOutlet weak var lblunderLine: UILabel!
    @IBOutlet weak var collectionV: UICollectionView!
    override func viewDidLoad() {
        super.viewDidLoad()

        configUI()
        DispatchQueue.main.async {
            self.getData()
        }
    
          
       
    }
    //MARK:- Action Methods

    @IBAction func btnActionAllNews(_ sender: Any) {
     
        updateUnderLine(view: viewAllNewsTab, width: lblAll.bounds.size.width, animation: true)
        let i = IndexPath(item: 0, section: 0)
        self.collectionV.scrollToItem(at: i, at: [], animated: false)
    }
    @IBAction func btnActionNBANews(_ sender: Any) {
        
        updateUnderLine(view: viewNBANews, width: lblNBA.bounds.size.width, animation: true)

        let i = IndexPath(item: 1, section: 0)
        self.collectionV.scrollToItem(at: i, at: [], animated: true)
    }
    @IBAction func btnActionNFLNews(_ sender: Any) {
        updateUnderLine(view: viewAllNewsTab, width: lblAll.bounds.size.width, animation: true)
        let i = IndexPath(item: 2, section: 0)
        self.collectionV.scrollToItem(at: i, at: [], animated: false)
    }
    @IBAction func btnActionMLBNews(_ sender: Any) {
        updateUnderLine(view: viewAllNewsTab, width: lblAll.bounds.size.width, animation: true)
        let i = IndexPath(item: 3, section: 0)
        self.collectionV.scrollToItem(at: i, at: [], animated: false)
    }
    @IBAction func btnActionNHLNews(_ sender: Any) {
        updateUnderLine(view: viewAllNewsTab, width: lblAll.bounds.size.width, animation: true)
        let i = IndexPath(item: 4, section: 0)
        self.collectionV.scrollToItem(at: i, at: [], animated: false)
    }
    @IBAction func btnActionGolfNews(_ sender: Any) {
        updateUnderLine(view: viewAllNewsTab, width: lblAll.bounds.size.width, animation: true)
        let i = IndexPath(item: 5, section: 0)
        self.collectionV.scrollToItem(at: i, at: [], animated: false)
    }
    
    func configUI() {
        self.view.backgroundColor = .black
    }
    func getData() {
        ///Call Data API
      
        getAllNews()
    }
   
    func updateUnderLine(view:UIView,width:CGFloat,animation:Bool)  {
            self.view.layoutIfNeeded()
        
    }
 
    
//
    func getAllNews(){
//        let url = "http://103.118.16.132:8035/api/news/1"
//        var request = URLRequest(url: URL(string: url)!)
//        request.timeoutInterval = 150
//        request.setValue("" , forHTTPHeaderField: "Authorization")
//        request.httpMethod = "GET"
//        let task = URLSession.shared.dataTask(with: request) { data, response, error in
//            guard let data = data, error == nil else {
//                return
//            }
//            if let httpStatus = response as? HTTPURLResponse, httpStatus.statusCode != 200 {
//            }
//            let responseString = String(data: data, encoding: .utf8)
//         print(responseString)
            
       
            let str = """
            {
              "listOffeeds": {
                "results": [
                  {
                    "categoryName": "nfl",
                    "totalRecords": 0,
                    "title": "How Julio Jones Fantasy Projections Compare to Sportsbook Props",
                    "creator": "Brett Gibbons",
                    "pubDate": "Mon, 07 Jun 2021 19:24:40 +0000",
                    "guid": "https://www.thelines.com/?p=395071",
                    "image": "https://www.thelines.com/how-julio-jones-fantasy-projections-compare-to-sportsbook-props/julio-projections-2-chub-img-slug-chub-img-slug-chub-img-slug-chub-img-slug/"
                  },
                  {
                    "categoryName": "nfl",
                    "totalRecords": 0,
                    "title": "Super Bowl Odds 2022: Kansas City Chiefs Remain The Favorites",
                    "link": "https://www.thelines.com/odds/super-bowl/",
                    "creator": "Brett Collson",
                    "pubDate": "Mon, 07 Jun 2021 12:10:30 +0000",
                    "guid": "https://www.thelines.com/?page_id=8262",
                    "image": "https://www.thelines.com/odds/super-bowl/super-bowl-odds-2022-chiefs-buccaneers-patriots-chub-img-slug-chub-img-slug-chub-img-slug-chub-img-slug/"
                  },
                  {
                    "categoryName": "nfl",
                    "totalRecords": 0,
                    "title": "NFL Power Rankings 2021-22 | Chiefs, Buccaneers, Bills The Top 3",
                    "creator": "Nate Weitzer",
                    "pubDate": "Mon, 07 Jun 2021 12:01:31 +0000",
                    "guid": "https://www.thelines.com/?page_id=17299",
                    "image": "https://www.thelines.com/betting/nfl/power-rankings/nfl-power-rankings-new-chiefs-may-updated-chub-img-slug-chub-img-slug-chub-img-slug-chub-img-slug/"
                  },
                  {
                    "categoryName": "nfl",
                    "totalRecords": 0,
                    "title": "Julio Jones Trade: How Titans Super Bowl Odds Changed At DraftKings Sportsbook",
                    "creator": "Stephen Andress",
                    "pubDate": "Sun, 06 Jun 2021 16:21:44 +0000",
                    "guid": "https://www.thelines.com/?p=394591",
                    "image": "https://www.thelines.com/julio-jones-trade-titans-super-bowl-odds-2021/julio-jones-chub-img-slug-chub-img-slug-chub-img-slug-chub-img-slug-chub-img-slug-chub-img-slug/"
                  },
                  {
                    "categoryName": "nfl",
                    "totalRecords": 0,
                    "title": "Opening NFL Lines For Every Game Of The 2021 Season",
                    "creator": "Juan Carlos Blanco",
                    "pubDate": "Thu, 03 Jun 2021 17:31:59 +0000",
                    "guid": "https://www.thelines.com/?p=388991",
                    "image": "https://www.thelines.com/nfl-lines-every-week-2021/nfl-lines-every-week-spread-week-2-3-17-18-chub-img-slug-chub-img-slug-chub-img-slug-chub-img-slug/"
                  },
                  {
                    "categoryName": "nfl",
                    "totalRecords": 0,
                    "title": "Sunday Night Football Betting Preview: Bears at Rams",
                    "creator": "Esten McLaren",
                    "pubDate": "Thu, 03 Jun 2021 13:20:07 +0000",
                    "guid": "https://www.thelines.com/?page_id=16035",
                    "image": "https://www.thelines.com/odds/snf-betting/snf-betting-odds-sunday-night-football-line-spread-rams-bears-chub-img-slug-chub-img-slug-chub-img-slug-chub-img-slug/"
                  },
                  {
                    "categoryName": "nfl",
                    "totalRecords": 0,
                    "title": "NFL 2021 MVP Odds | Patrick Mahomes Sits Atop Odds Board",
                    "creator": "Juan Carlos Blanco",
                    "pubDate": "Thu, 03 Jun 2021 12:27:12 +0000",
                    "image": "https://www.thelines.com/odds/nfl-mvp/nfl-mvp-odds-2021-2022-mahomes-josh-allen-chub-img-slug-chub-img-slug-chub-img-slug-chub-img-slug/"
                  },
                  {
                    "categoryName": "nfl",
                    "totalRecords": 0,
                    "title": "Thursday Night Football Betting Guide: Dallas Cowboys At Tampa Bay Buccaneers",
                    "creator": "Matt Burke",
                    "pubDate": "Thu, 03 Jun 2021 08:35:15 +0000",
                    "image": "https://www.thelines.com/odds/tnf/thursday-night-football-odds-tnf-betting-cowboys-buccaneers-chub-img-slug-chub-img-slug-chub-img-slug-chub-img-slug/"
                  },
                  {
                    "categoryName": "nfl",
                    "totalRecords": 0,
                    "title": "Monday Night Football Betting Preview: Baltimore Ravens At Las Vegas Raiders",
                    "creator": "Matt Burke",
                    "pubDate": "Thu, 03 Jun 2021 08:19:59 +0000",
                    "guid": "https://www.thelines.com/?page_id=9807",
                    "image": "https://www.thelines.com/odds/mnf/mnf-betting-odds-monday-night-football-ravens-raiders-line-spread-total-over-under-chub-img-slug-chub-img-slug-chub-img-slug-chub-img-slug/"
                  },
                  {
                    "categoryName": "nba",
                    "totalRecords": 0,
                    "title": "How Bettors Should View Nets After James Harden Hamstring Injury",
                    "creator": "Mo Nuwwarah",
                    "pubDate": "Mon, 07 Jun 2021 21:21:46 +0000",
                    "guid": "https://www.thelines.com/?p=395097",
                    "image": "https://www.thelines.com/james-harden-hamstring-brooklyn-nets-2021/james-harden-2-chub-img-slug-chub-img-slug-chub-img-slug-chub-img-slug-chub-img-slug/"
                  },
                  {
                    "categoryName": "mlb",
                    "totalRecords": 0,
                    "title": "Alex Bregman Props: Matchup, Trends, Best Odds vs. Red Sox (June 8, 2021)",
                    "creator": "Staff",
                    "pubDate": "Mon, 07 Jun 2021 20:26:49 +0000",
                    "guid": "https://www.thelines.com/?p=395126",
                    "image": "https://www.thelines.com/alex-bregman-mlb-player-prop-trends-astros-red-sox-6-8-2021/chub-img-slug-chub-img-slug-chub-img-slug/"
                  },
                  {
                    "categoryName": "nhl",
                    "totalRecords": 0,
                    "title": "Kyle Connor: NHL Player Prop Betting Trends For Jets Vs Canadiens (Jun 7)",
                    "creator": "Staff",
                    "pubDate": "Mon, 07 Jun 2021 20:24:03 +0000",
                    "guid": "https://www.thelines.com/?p=395072",
                    "image": "https://www.thelines.com/kyle-connor-nhl-player-props-6-7-2021/chub-img-slug-chub-img-slug-chub-img-slug/"
                  },
                  {
                    "categoryName": "golf",
                    "totalRecords": 0,
                    "title": "US Open Golf Betting Guide",
                    "creator": "Esten McLaren",
                    "pubDate": "Mon, 07 Jun 2021 11:41:50 +0000",
                    "image": "https://www.thelines.com/bryson-dechambeau-us-open-masters-pga-championship/bryson-dechambeau-odds-memorial-masters-us-open-pga/"
                  }
                ],
                "currentPage": 1,
                "pageCount": 2,
                "pageSize": 50,
                "rowCount": 100,
                "linkTemplate": null,
                "firstRowOnPage": 1,
                "lastRowOnPage": 50
              },
              "pager": null
            }
            """
            
            
            
            if let data = str.data(using: String.Encoding.utf8) {
                do {
                    let json = try JSONSerialization.jsonObject(with: data, options: .mutableContainers) as? [String:Any]
                    let dictData = json! as NSDictionary
                    
                    
                    print(dictData)
                    
                    if dictData is [String:Any] {
                 
                        let peoples = dictData["listOffeeds"] as? [String:Any]
                       
                        NewsFeedDaoList.sharedInstance.parseData(arrData: peoples?["results"] as? [[String:Any]] ?? [[String:Any]]())
                               }
                    
                        DispatchQueue.main.async {
                                self.collectionV.delegate = self
                                self.collectionV.dataSource = self
                        }
               
                } catch
                {
                    print("JSON Serialization error")
                }
            }
//        }
//        task.resume()
    }
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return 6
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        if indexPath.row == 0{
            let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "AllNewsCell", for: indexPath) as! AllNewsCell
            cell.VC = self
            cell.preparelayout()
            cell.delegate = self
            return cell
        }
       else if indexPath.row == 1{
            let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "NBANewsCell", for: indexPath) as! NBANewsCell
            cell.VC = self
            cell.preparelayout()
            cell.delegate = self
            return cell
        }
       else  if indexPath.row == 2{
            let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "NFLNewsCell", for: indexPath) as! NFLNewsCell
            cell.VC = self
            cell.preparelayout()
            cell.delegate = self
            return cell
        }
       else  if indexPath.row == 3{
            let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "MLBNewsCell", for: indexPath) as! MLBNewsCell
            cell.VC = self
            cell.preparelayout()
            cell.delegate = self
            return cell
        }
       else  if indexPath.row == 4{
            let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "NHLNewsCell", for: indexPath) as! NHLNewsCell
            cell.VC = self
            cell.preparelayout()
            cell.delegate = self
            return cell
        }
       else    if indexPath.row == 5{
            let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "GolfNewsCell", for: indexPath) as! GolfNewsCell
            cell.VC = self
            cell.preparelayout()
            cell.delegate = self
            return cell
        }
        return UICollectionViewCell()
    }
    
  
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        return CGSize(width: self.viewContent.frame.width, height: self.viewContent.frame.height)
    }
   
   
    
}
extension NewsViewController : AllNewsViewProtocolNew,NBANewsViewProtocolNew
{
    
    func rightAllNewsDir() {
        self.lblAllNewsBottom.isHidden = true
        self.lblNBANewsBottom.isHidden = false
        self.lblNFLNewsBottom.isHidden = true
        self.lblMLBBottom.isHidden = true
        self.lblGolfNewsBottom.isHidden = true
        self.lblNHLBottom.isHidden = true
    }
    func leftNBANewsListDir() {
        self.lblAllNewsBottom.isHidden = false
        self.lblNBANewsBottom.isHidden = true
        self.lblNFLNewsBottom.isHidden = true
        self.lblMLBBottom.isHidden = true
        self.lblGolfNewsBottom.isHidden = true
        self.lblNHLBottom.isHidden = true
    }
    
}
