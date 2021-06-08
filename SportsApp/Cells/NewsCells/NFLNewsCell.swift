//
//  NFLNewsCell.swift
//  SportsApp
//
//  Created by Apurva on 05/06/21.
//

import UIKit

class NFLNewsCell: UICollectionViewCell {
    var delegate : AllNewsViewProtocolNew?
    
    @IBOutlet weak var tblNFLNews: UITableView!
    var VC:UIViewController?
    func preparelayout()
    {
        if self.tblNFLNews.delegate == nil{
            self.tblNFLNews.delegate = self
            self.tblNFLNews.dataSource = self
            tblNFLNews.reloadData()
        }
    }
}
    extension NFLNewsCell : UITableViewDelegate,UITableViewDataSource
    {
        func numberOfSections(in tableView: UITableView) -> Int {
            return 1
        }
        
        func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
            return NewsFeedDaoList.sharedInstance.arrNFLNewsDao.count
        }
        
        func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
            let cell = self.tblNFLNews.dequeueReusableCell(withIdentifier: "NFLNewsTableCell") as! NFLNewsTableCell
                 
             cell.preparelayout(objAllDao: NewsFeedDaoList.sharedInstance.arrNFLNewsDao[indexPath.row])
            return cell
        }
        func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
            return 140
        }
        
        func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
           
        }
        
}
