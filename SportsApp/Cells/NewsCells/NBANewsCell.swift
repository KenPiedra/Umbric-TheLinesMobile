//
//  NBANewsCell.swift
//  SportsApp
//
//  Created by Pratiksha on 03/06/21.
//
import UIKit
import UIKit

class NBANewsCell: UICollectionViewCell {

    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

        // Configure the view for the selected state
    }


//    extension NBANewsCell : UITableViewDelegate,UITableViewDataSource{
//        func numberOfSections(in tableView: UITableView) -> Int {
//            return 1
//        }
//
//        func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
//
//            return 1
//        }
        
//        func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
//            let cell = self.tblAllWatchList.dequeueReusableCell(withIdentifier: "WatchListPostTableCell") as! WatchListPostTableCell
//            //cell.lblHeaderTitle.text = self.getDateUTCToLocalStartDateFormat(date: AllPostListDao.sharedInstance.arrAllWatchListDao[indexPath.row].postStartDate ?? "")
//
//                   if indexPath.row == 0 {
//                       //cell.viewHeaderDate.isHidden = false
//                       //cell.viewHeaderDateHeightConstraint.constant = 25
//
//                        cell.viewHeaderDateHeightConstraint.constant = 0
//                   }else{
//
//                    if self.getDateUTCToLocalStartDateFormat(date: AllPostListDao.sharedInstance.arrAllWatchListDao[indexPath.row].postStartDate ?? "") == self.getDateUTCToLocalStartDateFormat(date: AllPostListDao.sharedInstance.arrAllWatchListDao[indexPath.row - 1].postStartDate ?? "") {
//                                  cell.viewHeaderDate.isHidden = true
//                                  cell.viewHeaderDateHeightConstraint.constant = 0
//                       }else{
//                                  //cell.viewHeaderDate.isHidden = false
//                                  //cell.viewHeaderDateHeightConstraint.constant = 25
//
//                                    cell.viewHeaderDateHeightConstraint.constant = 0
//                       }
//                   }
//             cell.preparelayout(objAllDao: AllPostListDao.sharedInstance.arrAllWatchListDao[indexPath.row])
//            return cell
//        }
//
//        func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
//            //self.tblAllWatchList.deselectRow(at: indexPath, animated: false)
//            let userDefault = UserDefaults.standard
//            userDefault.set(1, forKey: "Item")
//            userDefault.synchronize()
//            self.delegate?.selectedPost(postId: AllPostListDao.sharedInstance.arrAllWatchListDao[indexPath.row].post_id ?? "")
//        }
//
//}
