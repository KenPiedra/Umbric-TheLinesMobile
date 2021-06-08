//
//  AllNewsCell.swift
//  SportsApp
//
//  Created by Apurva on 03/06/21.
//
import UIKit
import Foundation

protocol AllNewsViewProtocolNew {
    func rightAllNewsDir()
}
class AllNewsCell : UICollectionViewCell {
    var delegate : AllNewsViewProtocolNew?
    
    @IBOutlet weak var tblAllNews: UITableView!
    var VC:UIViewController?
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
            return NewsFeedDaoList.sharedInstance.arrAllNewsDao.count
        }
        
        func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
            let cell = self.tblAllNews.dequeueReusableCell(withIdentifier: "AllNewsTableCell") as! AllNewsTableCell
                 
             cell.preparelayout(objAllDao: NewsFeedDaoList.sharedInstance.arrAllNewsDao[indexPath.row])
            return cell
        }
        func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
            return 140
        }
        
        func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
           
        }
        
}
