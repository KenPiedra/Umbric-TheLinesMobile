//
//  MLBNewsCell.swift
//  SportsApp
//
//  Created by Apurva on 05/06/21.
//

import UIKit

class MLBNewsCell: UICollectionViewCell {
    var delegate : AllNewsViewProtocolNew?
    
    @IBOutlet weak var tbMLBNews: UITableView!
    
    
    var VC:UIViewController?
    func preparelayout()
    {
        if self.tbMLBNews.delegate == nil{
            self.tbMLBNews.delegate = self
            self.tbMLBNews.dataSource = self
            tbMLBNews.reloadData()
        }
    }
}
    extension MLBNewsCell : UITableViewDelegate,UITableViewDataSource
    {
        func numberOfSections(in tableView: UITableView) -> Int {
            return 1
        }
        
        func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
            return NewsFeedDaoList.sharedInstance.arrAllPostDao.count
        }
        
        func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
            let cell = self.tbMLBNews.dequeueReusableCell(withIdentifier: "MLBNewsTableCell") as! MLBNewsTableCell
                 
             cell.preparelayout(objAllDao: NewsFeedDaoList.sharedInstance.arrAllPostDao[indexPath.row])
            return cell
        }
        func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
            return 140
        }
        
        func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
           
        }
        
}
