//
//  GolfNewsCell.swift
//  SportsApp
//
//  Created by Apurva on 05/06/21.
//

import UIKit

class GolfNewsCell: UICollectionViewCell {
    
    var VC:UIViewController?
    @IBOutlet weak var tblGolfNews: UITableView!
    func preparelayout()
    {
        if self.tblGolfNews.delegate == nil{
            self.tblGolfNews.delegate = self
            self.tblGolfNews.dataSource = self
            tblGolfNews.reloadData()
        }
    }
}
    extension GolfNewsCell : UITableViewDelegate,UITableViewDataSource
    {
        func numberOfSections(in tableView: UITableView) -> Int {
            return 1
        }
        
        func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
            return NewsFeedDaoList.sharedInstance.arrGOLFNewsDao.count
        }
        
        func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
            let cell = self.tblGolfNews.dequeueReusableCell(withIdentifier: "GolfNewsTableCell") as! GolfNewsTableCell
          
            DispatchQueue.global(qos: .userInitiated).async {

                let link = NewsFeedDaoList.sharedInstance.arrGOLFNewsDao[indexPath.row].image
                if link != nil {
                guard
                    let url = URL(string: link!),
                    let data = try? Data(contentsOf: url),
                    let image = UIImage(data: data)
                else {
                    return
                }

                DispatchQueue.main.async {
                    cell.ivNewsImage.image = image
                }}
            }
            
            
       
             cell.preparelayout(objAllDao: NewsFeedDaoList.sharedInstance.arrGOLFNewsDao[indexPath.row])
            return cell
        }
        func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
            return 140
        }
        
        func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
           
        }
        
}
