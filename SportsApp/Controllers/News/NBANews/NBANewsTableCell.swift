//
//  NBANewsTableCell.swift
//  SportsApp
//
//  Created by Apurva on 05/06/21.
//

import UIKit

class NBANewsTableCell: UITableViewCell {
    
    @IBOutlet weak var ivNewsImage: UIImageView!
    @IBOutlet weak var lblNewsCategory: UILabel!
    @IBOutlet weak var lblNewsDescription: UILabel!
    @IBOutlet weak var lbllNewsDate: UILabel!
    @IBOutlet weak var viewMain: UIView!
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }
    func preparelayout(objAllDao:AllNewsDao){
        
        if objAllDao != nil{
            
            viewMain.layer.cornerRadius = 15
            viewMain.layer.borderWidth = 0.5
            viewMain.layer.borderColor = UIColor.init(red: (31.0/255.0), green: (41.0/255.0), blue: (51.0/255.0), alpha: 1.0).cgColor
            self.lbllNewsDate.text = objAllDao.pubDate
            self.lblNewsDescription.text = objAllDao.title
            self.lblNewsCategory.text = "NBA"
        }
    }

}
