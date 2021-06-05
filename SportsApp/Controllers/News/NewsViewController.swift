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
 
    
    func scrollViewDidEndDecelerating(_ scrollView: UIScrollView) {
        let currentIndex = self.collectionV.contentOffset.x / self.collectionV.frame.size.width;
        if Int(currentIndex) == 0{
            btnActionAllNews(btnAll!)
        }else if Int(currentIndex) == 1{
            btnActionNBANews(btnNBA!)
        }
        else if Int(currentIndex) == 2{
            btnActionNFLNews(btnNFL!)
        }else if Int(currentIndex) == 3{
            btnActionMLBNews(btnMLB!)
        }
        else if Int(currentIndex) == 4{
            btnActionNHLNews(btnNHL!)
        }else if Int(currentIndex) == 5{
            btnActionGolfNews(btnGolf!)
        }
    }
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
                            "totalRecords": 0,
                            "title": "5 Maryland Sports Celebrities Most Suited To Endorse Sportsbooks",
                            "creator": "Derek Helling",
                            "pubDate": "Thu, 03 Jun 2021 14:20:09 +0000",
                            "guid": "https://www.thelines.com/?p=392720",
                            "image": "https://www.thelines.com/maryland-sports-celebrities-sportsbooks-2021/michael-phelps-1-chub-img-slug-chub-img-slug-chub-img-slug-chub-img-slug-chub-img-slug/"
                        },
                        {
                            "totalRecords": 0,
                            "title": "Arizona Sports Betting Date Set To Launch Legal Retail Sportsbooks",
                            "creator": "Derek Helling",
                            "pubDate": "Thu, 03 Jun 2021 13:25:04 +0000",
                            "guid": "https://www.thelines.com/?p=392693",
                            "image": "https://www.thelines.com/arizona-sports-betting-launch-date-2021/arizona-governor-1-chub-img-slug-chub-img-slug-chub-img-slug-chub-img-slug-chub-img-slug-chub-img-slug/"
                        },
                        {
                            "totalRecords": 0,
                            "title": "Second Medina Spirit Drug Test Means Historic Kentucky Derby DQ",
                            "creator": "Brett Gibbons",
                            "pubDate": "Wed, 02 Jun 2021 17:16:46 +0000",
                            "guid": "https://www.thelines.com/?p=392548",
                            "image": "https://www.thelines.com/medina-spirit-drug-test-kentucky-derby-dq-2021/baffert-1-chub-img-slug-chub-img-slug-chub-img-slug-chub-img-slug-chub-img-slug/"
                        },
                        {
                            "totalRecords": 0,
                            "title": "NYC Mayor Odds: How To Bet On Race As Andrew Yang Drops In Polls",
                            "pubDate": "Wed, 02 Jun 2021 16:35:01 +0000",
                            "guid": "https://www.thelines.com/?p=392551",
                            "image": "https://www.thelines.com/nyc-mayor-odds-andrew-yang-2021/andrew-yang-1-chub-img-slug-chub-img-slug-chub-img-slug-chub-img-slug-chub-img-slug/"
                        },
                        {
                            "totalRecords": 0,
                            "title": "Belmont Stakes Picks: Ways To Bet Final Leg of Horse Racing Triple Crown",
                            "creator": "Dave Bontempo",
                            "pubDate": "Tue, 01 Jun 2021 21:28:23 +0000",
                            "guid": "https://www.thelines.com/?p=392067",
                            "image": "https://www.thelines.com/belmont-stakes-picks-2021/belmont-stakes-1-chub-img-slug-chub-img-slug-chub-img-slug-chub-img-slug-chub-img-slug/"
                        },
                        {
                            "totalRecords": 0,
                            "title": "No Paul Vs Mayweather Bets: Fight Deemed  ‘Non-Competitive’",
                            "creator": "Stephen Andress",
                            "pubDate": "Tue, 01 Jun 2021 20:26:09 +0000",
                            "guid": "https://www.thelines.com/?p=392051",
                            "image": "https://www.thelines.com/paul-vs-mayweather-bets-2021/mayweather-1-chub-img-slug-chub-img-slug-chub-img-slug-chub-img-slug-chub-img-slug/"
                        },
                        {
                            "totalRecords": 0,
                            "title": "Why One NL MVP Longshot May Not Be One For Much Longer",
                            "creator": "Stephen Andress",
                            "pubDate": "Tue, 01 Jun 2021 15:40:53 +0000",
                            "guid": "https://www.thelines.com/?p=391878",
                            "image": "https://www.thelines.com/nl-mvp-odds-dodgers-max-muncy-2021/max-muncy-chub-img-slug-chub-img-slug-chub-img-slug-chub-img-slug/"
                        },
                        {
                            "totalRecords": 0,
                            "title": "Odds For Next Year’s Super Bowl: 2021-22 Futures For All 32 NFL Teams",
                            "creator": "Matt Burke",
                            "pubDate": "Tue, 01 Jun 2021 11:33:46 +0000",
                            "guid": "https://www.thelines.com/?p=171852",
                            "image": "https://www.thelines.com/next-year-super-bowl-odds-lvi-56-49ers-eagles-titans-bears-broncos-2022/next-year-super-bowl-odds-2022-chub-img-slug-chub-img-slug-chub-img-slug-chub-img-slug/"
                        },
                        {
                            "totalRecords": 0,
                            "title": "Memorial Tournament Odds: Golfers To Watch",
                            "creator": "FairwayJay",
                            "pubDate": "Sun, 30 May 2021 14:09:05 +0000",
                            "guid": "https://www.thelines.com/?p=390122",
                            "image": "https://www.thelines.com/memorial-tournament-odds-2021/jon-rahm-memorial-1-chub-img-slug-chub-img-slug-chub-img-slug-chub-img-slug-chub-img-slug/"
                        },
                        {
                            "totalRecords": 0,
                            "title": "2022 NFL Draft Odds: Quarterbacks Commandeer No. 1 Pick Market",
                            "pubDate": "Thu, 27 May 2021 21:00:14 +0000",
                            "guid": "https://www.thelines.com/?p=389002",
                            "image": "https://www.thelines.com/nfl-draft-odds-quarterbacks-2022/rattler-1-chub-img-slug-chub-img-slug-chub-img-slug-chub-img-slug-chub-img-slug/"
                        }
                    ],
                    "currentPage": 1,
                    "pageCount": 10,
                    "pageSize": 10,
                    "rowCount": 100,
                    "linkTemplate": null,
                    "firstRowOnPage": 1,
                    "lastRowOnPage": 10
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
