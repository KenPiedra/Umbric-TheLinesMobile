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

            return NewsFeedDaoList.sharedInstance.arrNBANewsDao.count
        }
        
        func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
            let cell = self.tblNBANews.dequeueReusableCell(withIdentifier: "NBANewsTableCell") as! NBANewsTableCell
//            DispatchQueue.global(qos: .userInitiated).async {
//
//                let link = NewsFeedDaoList.sharedInstance.arrNBANewsDao[indexPath.row].image
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
//                }
//                }}
            cell.preparelayout(objAllDao: NewsFeedDaoList.sharedInstance.arrNBANewsDao[indexPath.row])
           return cell
        }
        func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
            return 140
        }
        func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
            let NewsDetailsView =  VC?.storyboard?.instantiateViewController(withIdentifier: "NewsDetailsViewController") as! NewsDetailsViewController
            NewsDetailsView.delegate = NewsFeedDaoList.sharedInstance.arrAllNewsDao[indexPath.row]
            VC?.navigationController?.pushViewController(NewsDetailsView, animated:true)
        
        }

}
