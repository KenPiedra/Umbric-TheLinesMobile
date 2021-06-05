//
//  NHLNewsCell.swift
//  SportsApp
//
//  Created by Apurva on 05/06/21.
//

import UIKit

class NHLNewsCell: UICollectionViewCell {
    var delegate : AllNewsViewProtocolNew?
    
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
            return NewsFeedDaoList.sharedInstance.arrAllPostDao.count
        }
        
        func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
            let cell = self.tblNHLNews.dequeueReusableCell(withIdentifier: "NHLNewsTableCell") as! NHLNewsTableCell
                 
             cell.preparelayout(objAllDao: NewsFeedDaoList.sharedInstance.arrAllPostDao[indexPath.row])
            return cell
        }
        func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
            return 140
        }
        
        func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
           
        }
        
}
