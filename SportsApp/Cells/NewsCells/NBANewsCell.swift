//
//  NBANewsCell.swift
//  SportsApp
//
//  Created by Apurva on 03/06/21.
//
import UIKit
import UIKit
protocol NBANewsViewProtocolNew {
    func  leftNBANewsListDir()
}

class NBANewsCell: UICollectionViewCell {
    var delegate : NBANewsViewProtocolNew?
    var VC:UIViewController?
    @IBOutlet weak var tblNBANews: UITableView!
    func preparelayout()
    {
        if self.tblNBANews.delegate == nil{
            self.tblNBANews.delegate = self
            self.tblNBANews.dataSource = self
            tblNBANews.reloadData()
        }
    }
}

    extension NBANewsCell : UITableViewDelegate,UITableViewDataSource{
        func numberOfSections(in tableView: UITableView) -> Int {
            return 1
        }

        func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {

            return NewsFeedDaoList.sharedInstance.arrAllPostDao.count
        }
        
        func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
            let cell = self.tblNBANews.dequeueReusableCell(withIdentifier: "NBANewsTableCell") as! NBANewsTableCell
            
            cell.preparelayout(objAllDao: NewsFeedDaoList.sharedInstance.arrAllPostDao[indexPath.row])
           return cell
        }
        func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
            return 140
        }
        func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        
        }

}
