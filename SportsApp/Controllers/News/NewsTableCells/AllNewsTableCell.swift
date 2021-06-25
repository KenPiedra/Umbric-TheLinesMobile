//
//  AllNewsTableCell.swift
//  SportsApp
//
//  Created by Apurva on 03/06/21.
//

import UIKit
import AVKit
import Nuke
class AllNewsTableCell: UITableViewCell {
   

    
    @IBOutlet weak var ivNewsImage: UIImageView!
    @IBOutlet weak var viewMain: UIView!
    @IBOutlet weak var lbllNewsDate: UILabel!
    @IBOutlet weak var lblNewsDescription: UILabel!
    @IBOutlet weak var lblNewsTitle: UILabel!
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    func preparelayout(objAllDao:AllNewsDao){
            viewMain.layer.cornerRadius = 15
            viewMain.layer.borderWidth = 0.5
            viewMain.layer.borderColor = UIColor.init(red: (31.0/255.0), green: (41.0/255.0), blue: (51.0/255.0), alpha: 1.0).cgColor
           
            self.lblNewsDescription.text = objAllDao.title
            self.lblNewsTitle.text = objAllDao.categoryName?.uppercased()
        
        
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "E, d MMM yyyy HH:mm:ss Z"
        let date = dateFormatter.date(from:objAllDao.pubDate!)!
        dateFormatter.dateFormat =  "MMM dd yyyy"
        self.lbllNewsDate.text = dateFormatter.string(from: date)
        
        
        DispatchQueue.global(qos: .userInitiated).async {

            let link = objAllDao.newsImages[0].small
            if link != nil {
                DispatchQueue.main.async {
                    Nuke.loadImage(with: link as! ImageRequestConvertible, into: self.ivNewsImage)
                }
            }
         
        }
        
    }

}
