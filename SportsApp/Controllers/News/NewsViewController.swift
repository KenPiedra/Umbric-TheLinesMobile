//
//  NewsViewController.swift
//  SportsApp
//
//  Created by Apurva on 03/06/21.
//

import UIKit

class NewsViewController: UIViewController,UICollectionViewDelegate,UICollectionViewDataSource,UICollectionViewDelegateFlowLayout {
    @IBOutlet weak var viewCategory: UIView!
    var scView:UIScrollView!
    var xOffset:CGFloat = 10
    
    @IBOutlet weak var viewAllNewsTab: UIView!
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
    @IBOutlet weak var lblNBA: UILabel!
    
    @IBOutlet weak var lblAllNewsBottom: UILabel!
    @IBOutlet weak var lblNBANewsBottom: UILabel!
    @IBOutlet weak var lblNFLNewsBottom: UILabel!
    @IBOutlet weak var lblMLBBottom: UILabel!
    @IBOutlet weak var lblNHLNewsBottom: UILabel!
    @IBOutlet weak var lblGolfNewsBottom: UILabel!

  
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
     
        updateUnderLine(view: viewAllNewsTab, bottomLable: lblAllNewsBottom , categoryName: lblAll)
        let i = IndexPath(item: 0, section: 0)
        lblAllNewsBottom.isHidden = false
        lblNBANewsBottom.isHidden = true
        lblNFLNewsBottom.isHidden = true
        lblMLBBottom.isHidden = true
        lblNHLNewsBottom.isHidden = true
        lblGolfNewsBottom.isHidden = true
        self.collectionV.scrollToItem(at: i, at: [], animated: false)
    }
    @IBAction func btnActionNBANews(_ sender: Any) {
        updateUnderLine(view: viewNBANews, bottomLable: lblNBANewsBottom , categoryName: lblNBA)
        let i = IndexPath(item: 1, section: 0)
        lblAllNewsBottom.isHidden = true
        lblNBANewsBottom.isHidden = false
        lblNFLNewsBottom.isHidden = true
        lblMLBBottom.isHidden = true
        lblNHLNewsBottom.isHidden = true
        lblGolfNewsBottom.isHidden = true
        self.collectionV.scrollToItem(at: i, at: [], animated: true)
    }
    @IBAction func btnActionNFLNews(_ sender: Any) {
        updateUnderLine(view: viewNFLNews, bottomLable: lblNFLNewsBottom , categoryName: lblNFL)
        let i = IndexPath(item: 2, section: 0)
        lblAllNewsBottom.isHidden = true
        lblNBANewsBottom.isHidden = true
        lblNFLNewsBottom.isHidden = false
        lblMLBBottom.isHidden = true
        lblNHLNewsBottom.isHidden = true
        lblGolfNewsBottom.isHidden = true
        self.collectionV.scrollToItem(at: i, at: [], animated: false)
    }
    @IBAction func btnActionMLBNews(_ sender: Any) {
        updateUnderLine(view: viewMLBNews, bottomLable: lblMLBBottom , categoryName: lblMLB)
        let i = IndexPath(item: 3, section: 0)
        lblAllNewsBottom.isHidden = true
        lblNBANewsBottom.isHidden = true
        lblNFLNewsBottom.isHidden = true
        lblMLBBottom.isHidden = false
        lblNHLNewsBottom.isHidden = true
        lblGolfNewsBottom.isHidden = true
        self.collectionV.scrollToItem(at: i, at: [], animated: false)
    }
    @IBAction func btnActionNHLNews(_ sender: Any) {
        updateUnderLine(view: viewNHLNews, bottomLable: lblNHLNewsBottom , categoryName: lblNHL)
        let i = IndexPath(item: 4, section: 0)
        lblAllNewsBottom.isHidden = true
        lblNBANewsBottom.isHidden = true
        lblNFLNewsBottom.isHidden = true
        lblMLBBottom.isHidden = true
        lblNHLNewsBottom.isHidden = false
        lblGolfNewsBottom.isHidden = true
        self.collectionV.scrollToItem(at: i, at: [], animated: false)
    }
    @IBAction func btnActionGolfNews(_ sender: Any) {
        updateUnderLine(view: viewGolfNews, bottomLable: lblGolfNewsBottom , categoryName: lblGolf)
        let i = IndexPath(item: 5, section: 0)
        lblAllNewsBottom.isHidden = true
        lblNBANewsBottom.isHidden = true
        lblNFLNewsBottom.isHidden = true
        lblMLBBottom.isHidden = true
        lblNHLNewsBottom.isHidden = true
        lblGolfNewsBottom.isHidden = false
        self.collectionV.scrollToItem(at: i, at: [], animated: false)
    }
    
    func configUI() {
        self.view.backgroundColor = .black
        self.collectionV.isScrollEnabled = false
        
        scView = UIScrollView(frame: CGRect(x: 0, y: 0, width: viewCategory.bounds.width, height: 50))
        viewCategory.addSubview(scView)
         scView.translatesAutoresizingMaskIntoConstraints = false
        updateUnderLine(view: viewAllNewsTab, bottomLable: lblAllNewsBottom , categoryName: lblAll)

        let xOffsetAll =  viewAllNewsTab.frame.size.width + viewNBANews.frame.size.width +  viewNFLNews.frame.size.width +  viewMLBNews.frame.size.width + viewNHLNews.frame.size.width + viewGolfNews.frame.size.width
        scView.addSubview(viewAllNewsTab)
        scView.addSubview(viewNBANews)
        scView.addSubview(viewGolfNews)
        scView.addSubview(viewNHLNews)
        scView.addSubview(viewMLBNews)
        scView.addSubview(viewNFLNews)
        
        scView.contentSize = CGSize(width: xOffsetAll + 60 , height: scView.frame.height)
    }
    func getData() {
        ///Call Data API
      
        getAllNews()
    }
   
    func updateUnderLine(view:UIView,bottomLable:UILabel,categoryName:UILabel)  {
        let y = categoryName.frame.origin.y +  categoryName.frame.height + 5
        let width = view.frame.width - 10
        bottomLable.frame = CGRect(x: 5, y : y  ,width : width ,height: 3)
        self.view.layoutIfNeeded()

    }
 
    
//
    func getAllNews(){
        
        let alert = UIAlertController(title: nil, message: "Please wait...", preferredStyle: .alert)

        let loadingIndicator = UIActivityIndicatorView(frame: CGRect(x: 10, y: 5, width: 50, height: 50))
        loadingIndicator.hidesWhenStopped = true
        loadingIndicator.style = UIActivityIndicatorView.Style.gray
        loadingIndicator.startAnimating();

        alert.view.addSubview(loadingIndicator)
        present(alert, animated: true, completion: nil)
        
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
                        }
                }
                catch
                {
                    print("JSON Serialization error")
                }
                DispatchQueue.main.async {
                      self.dismiss(animated: true, completion: nil)
                }
            }
        }
        task.resume()
    }
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return 6
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        if indexPath.row == 0{
            let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "AllNewsCell", for: indexPath) as! AllNewsCell
            cell.VC = self
            cell.preparelayout()
            return cell
        }
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
       else    if indexPath.row == 5{
            let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "GolfNewsCell", for: indexPath) as! GolfNewsCell
            cell.VC = self
            cell.preparelayout()
            return cell
        }
        return UICollectionViewCell()
    }
    
  
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        return CGSize(width: self.viewContent.frame.width, height: self.viewContent.frame.height)
    }
   
   
    
}
