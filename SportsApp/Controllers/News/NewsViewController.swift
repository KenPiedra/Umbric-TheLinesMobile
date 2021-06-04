//
//  NewsViewController.swift
//  SportsApp
//
//  Created by Pratiksha on 03/06/21.
//

import UIKit

class NewsViewController: UIViewController,UICollectionViewDelegate,UICollectionViewDataSource,UICollectionViewDelegateFlowLayout {

    @IBOutlet weak var lblAllNewsBottom: UILabel!
    @IBOutlet weak var lbl1: UILabel!
    @IBOutlet weak var viewAllNewsTab: UIView!
    @IBOutlet weak var btnAll: UIButton!
    @IBOutlet weak var btnNBA: UIButton!
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
    @IBAction func btnActionNBANews(_ sender: Any) {
        
        updateUnderLine(view: viewAllNewsTab, width: lbl1.bounds.size.width, animation: true)
        let i = IndexPath(item: 0, section: 0)
        self.collectionV.scrollToItem(at: i, at: [], animated: true)
    }
    @IBAction func btnActionAllNews(_ sender: Any) {
        
        updateUnderLine(view: viewAllNewsTab, width: lbl1.bounds.size.width, animation: true)
        let i = IndexPath(item: 0, section: 0)
        self.collectionV.scrollToItem(at: i, at: [], animated: false)
    }
    func configUI() {
        self.view.backgroundColor = .black
    }
    func getData() {
        ///Call Data API
        
        getAllNews()
    }
    func getAllNews(){
        
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
         print(responseString)
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
                        }
               
                } catch
                {
                    print("JSON Serialization error")
                }
            }
        }
        task.resume()
    }
    func updateUnderLine(view:UIView,width:CGFloat,animation:Bool)  {
    
//        if animation{
//            UIView.animate(withDuration: 0.2) {
//                self.leading_underLine.constant = view.frame.origin.x
//                self.width_underLine.constant =  width
                self.view.layoutIfNeeded()
//            }
//        }else{
//            DispatchQueue.main.async {
//                self.leading_underLine.constant = view.frame.origin.x
//                 self.width_underLine.constant =  width
//            }
//        }
    }
    func scrollViewDidEndDecelerating(_ scrollView: UIScrollView) {
        let currentIndex = self.collectionV.contentOffset.x / self.collectionV.frame.size.width;
        if currentIndex == 0{
            btnActionAllNews(btnAll)
        }else if currentIndex == 1{
            btnActionAllNews(btnAll)
        }
//        else if currentIndex == 2{
//            btnActionNBANews(btnWebinars)
//        }else if currentIndex == 3{
//            btnActionTrade(btnTrade)
//        }
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
//        else if indexPath.row == 1{
//            let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "NBANewsCell", for: indexPath) as! NBANewsCell
//            cell.VC = self
//            cell.preparrLayout()
//            cell.delegate = self
//            return cell
//        }
        else{
            let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "AllNewsCell", for: indexPath) as! AllNewsCell
            cell.VC = self
            cell.preparelayout()
            cell.delegate = self
            return cell
            
        }
//        return UICollectionViewCell()
    }
    
  
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        return CGSize(width: self.viewContent.frame.width, height: self.viewContent.frame.height)
    }
   
   
    
}
extension NewsViewController : AllNewsViewProtocolNew {
    
}
