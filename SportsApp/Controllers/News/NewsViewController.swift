//
//  NewsViewController.swift
//  SportsApp
//
//  Created by Apurva on 03/06/21.
//

import UIKit
import ExcelCollectionViewLayout
class NewsViewController: UIViewController {
    var currentType: TypeDropDown = .spread
    @IBOutlet weak var collectionV: UICollectionView!
    @IBOutlet weak var collectionViewNews: UICollectionView!
    var newsData: [SportsData] = []
    var noOfItemsForSections: [[PregameOdd]] = []
    @IBOutlet weak var viewCategory: UIView!
    var arrSelectedNews: [Int] = [1, 0, 0, 0 ,0 ,0 ,0, 0]
    let newsArr = AllNews.newsList
    override func viewDidLoad() {
        super.viewDidLoad()
        DispatchQueue.main.async {
            self.getData(withNews: .All)        }
        
        configUI()
        setDelegates()
   
       
    }
    //MARK:- Action Methods
    func configUI() {
        if let collectionLayout = collectionV.collectionViewLayout as? ExcelCollectionViewLayout {
            collectionLayout.delegate = self
        }
        view.backgroundColor = .black
        collectionViewNews.backgroundColor = .black
        collectionV.backgroundColor = .black
   
 
    }
    
        ///Call Data API
//
//        getAllNews()
    
    func getData(withNews: AllNews) {
        ///Call Data API
        LoaderView.shared.show()
              
              let url = "http://103.118.16.132:8035/api/news/1"
              var request = URLRequest(url: URL(string: url)!)
              request.timeoutInterval = 150
              request.setValue("" , forHTTPHeaderField: "Authorization")
              request.httpMethod = "GET"
              let task = URLSession.shared.dataTask(with: request) { data, response, error in
                  guard let data = data, error == nil else {
                      return
                  }
                  if let httpStatus = response as? HTTPURLResponse, httpStatus.statusCode != 200 {
                  }
                  let responseString = String(data: data, encoding: .utf8)
          
        
                if let data = responseString?.data(using: String.Encoding.utf8) {
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
                                self.collectionViewNews.reloadData()
                              }
                      }
                      catch
                      {
                          print("JSON Serialization error")
                      }
                    
                    LoaderView.shared.hide()
                  }
              }
              task.resume()
    }
 
    func setDelegates() {
        collectionViewNews.delegate = self
        collectionViewNews.dataSource = self
//
//        collectionV.delegate = self
//        collectionV.dataSource = self
//
      
    }
    
//
    
}
//MARK:- Collection Delegate
extension NewsViewController: UICollectionViewDelegate {
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        if collectionView == collectionViewNews {
            /// For updating UI
            arrSelectedNews = [0, 0, 0, 0 ,0 ,0 ,0, 0]
            arrSelectedNews[indexPath.item] = 1
            /// For updating Sheet collection view
//            getData(withSport: AllNews(rawValue: newsArr[indexPath.item])!)
            DispatchQueue.main.async { [self] in
                collectionViewNews.reloadData()
            }
            let i = IndexPath(item:  indexPath.row, section: 0)
            self.collectionV.scrollToItem(at: i, at: .left, animated: true)
        }
    }
}
//MARK:- Collection Data Source
extension NewsViewController: UICollectionViewDataSource {
    
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return 6
    }
    
  
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        if collectionView == collectionV
        { /// Excel sheet collection view
            if indexPath.row == 0{
                        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "AllNewsCell", for: indexPath) as! AllNewsCell
                        cell.VC = self
                        cell.preparelayout()
                        return cell }
            else if indexPath.row == 1{
                    let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "NBANewsCell", for: indexPath) as! NBANewsCell
                    cell.VC = self
                    cell.preparelayout()
                    return cell
                }
            else  if indexPath.row == 2{
                        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "NFLNewsCell", for: indexPath) as! NFLNewsCell
                        cell.VC = self
                        cell.preparelayout()
                        return cell
                    }
                   else  if indexPath.row == 3{
                        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "MLBNewsCell", for: indexPath) as! MLBNewsCell
                        cell.VC = self
                        cell.preparelayout()
                        return cell
                    }
                   else  if indexPath.row == 4{
                        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "NHLNewsCell", for: indexPath) as! NHLNewsCell
                        cell.VC = self
                        cell.preparelayout()
                        return cell
                    }
                   else {
                        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "GolfNewsCell", for: indexPath) as! GolfNewsCell
                        cell.VC = self
                        cell.preparelayout()
                        return cell
                    }
        }
        else { /// Top collection view contatins news
           let cell = collectionView.dequeueReusableCell(withReuseIdentifier: Cells.sportsCell, for: indexPath) as! SportsCell
           cell.lblTitle.text = newsArr[indexPath.item]
           cell.lblUnderline.isHidden = (arrSelectedNews[indexPath.item] == 0)
           return cell
       }
        
    }
}

//MARK:- Collection Flow layout
extension NewsViewController: UICollectionViewDelegateFlowLayout {
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        
        if collectionView == collectionViewNews
        {
        let label = UILabel(frame: CGRect.zero)
        label.text = newsArr[indexPath.item]
        label.sizeToFit()
        return CGSize(width: label.frame.width + 30, height: 55)
        }
        else
        {
            return CGSize(width: self.collectionV.frame.width, height: self.collectionV.frame.height)
        }
    }
}

extension NewsViewController : ExcelCollectionViewLayoutDelegate {
    func collectionViewLayout(_ collectionViewLayout: ExcelCollectionViewLayout, sizeForItemAtColumn columnIndex: Int) -> CGSize {
     
        return CGSize(width: self.collectionV.frame.width, height: self.collectionV.frame.height)
    }
}

