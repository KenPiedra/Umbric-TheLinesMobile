//
//  AllNewsCell.swift
//  SportsApp
//
//  Created by Pratiksha on 03/06/21.
//
import UIKit
import Foundation

protocol AllNewsViewProtocolNew {
 
}
class AllNewsCell : UICollectionViewCell {
    var delegate : AllNewsViewProtocolNew?
    
    @IBOutlet weak var tblAllNews: UITableView!
    var VC:UIViewController?
    var selectedRowIndex: IndexPath = IndexPath(row: -1, section: 0)
    func preparelayout()
    {
      
        if self.tblAllNews.delegate == nil{
            self.tblAllNews.delegate = self
            self.tblAllNews.dataSource = self
            tblAllNews.reloadData()
        }
    }
}
    extension AllNewsCell : UITableViewDelegate,UITableViewDataSource
    {
        func numberOfSections(in tableView: UITableView) -> Int {
            return 1
        }
        
        func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
            var countrow = NewsFeedDaoList.sharedInstance.arrAllPostDao.count
            return countrow;
        }
        
        func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
            let cell = self.tblAllNews.dequeueReusableCell(withIdentifier: "AllNewsTableCell") as! AllNewsTableCell
                 
             cell.preparelayout(objAllDao: NewsFeedDaoList.sharedInstance.arrAllPostDao[indexPath.row])
            return cell
        }
        func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
            return 140
        }
        
        func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
            //self.tblAllWatchList.deselectRow(at: indexPath, animated: false)
           
        }
        
}
