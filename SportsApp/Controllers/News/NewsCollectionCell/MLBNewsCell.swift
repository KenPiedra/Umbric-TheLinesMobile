//
//  MLBNewsCell.swift
//  SportsApp
//
//  Created by Apurva on 05/06/21.
//

import UIKit

class MLBNewsCell: UICollectionViewCell {
    
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
            return NewsFeedDaoList.sharedInstance.arrMLBNewsDao.count
        }
        
        func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
            let cell = self.tbMLBNews.dequeueReusableCell(withIdentifier: "MLBNewsTableCell") as! MLBNewsTableCell
            DispatchQueue.global(qos: .userInitiated).async {

                let link = NewsFeedDaoList.sharedInstance.arrAllNewsDao[indexPath.row].image

                guard
                    let url = URL(string: link!),
                    let data = try? Data(contentsOf: url),
                    let image = UIImage(data: data)
                else {
                    return
                }

                DispatchQueue.main.async {
                    cell.ivNewsImage.image = image
                }
            }
             cell.preparelayout(objAllDao: NewsFeedDaoList.sharedInstance.arrMLBNewsDao[indexPath.row])
            return cell
        }
        func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
            return 140
        }
        
        func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
           
        }
        
}
