//
//  NHLNewsCell.swift
//  SportsApp
//
//  Created by Apurva on 05/06/21.
//

import UIKit

class NHLNewsCell: UICollectionViewCell {
    
    @IBOutlet weak var tblNHLNews: UITableView!
    var VC:UIViewController?
    func preparelayout()
    {
        if self.tblNHLNews.delegate == nil{
            self.tblNHLNews.delegate = self
            self.tblNHLNews.dataSource = self
            tblNHLNews.reloadData()
        }
    }
}
    extension NHLNewsCell : UITableViewDelegate,UITableViewDataSource
    {
        func numberOfSections(in tableView: UITableView) -> Int {
            return 1
        }
        
        func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
            return NewsFeedDaoList.sharedInstance.arrNHLNewsDao.count
        }
        
        func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
            let cell = self.tblNHLNews.dequeueReusableCell(withIdentifier: "NHLNewsTableCell") as! NHLNewsTableCell
//            DispatchQueue.global(qos: .userInitiated).async {
//
//                let link = NewsFeedDaoList.sharedInstance.arrNHLNewsDao[indexPath.row].image
//                if link != nil {
//                guard
//                    let url = URL(string: link!),
//                    let data = try? Data(contentsOf: url),
//                    let image = UIImage(data: data)
//                else {
//                    return
//                }
//
//                DispatchQueue.main.async {
//                    cell.ivNewsImage.image = image
//                }}
//            }
             cell.preparelayout(objAllDao: NewsFeedDaoList.sharedInstance.arrNHLNewsDao[indexPath.row])
            return cell
        }
        func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
            return 140
        }
        
        func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
           
        }
        
}
