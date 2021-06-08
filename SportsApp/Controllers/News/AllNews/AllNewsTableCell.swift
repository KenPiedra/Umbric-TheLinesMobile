//
//  AllNewsTableCell.swift
//  SportsApp
//
//  Created by Apurva on 03/06/21.
//

import UIKit
import AVKit
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
            self.lbllNewsDate.text = objAllDao.pubDate
            self.lblNewsDescription.text = objAllDao.title
            self.lblNewsTitle.text = objAllDao.categoryName?.uppercased()
            let url = NSURL(string: objAllDao.image!)
            let data = try? NSData(contentsOf: url! as URL)
            if let imageData = data {
                let image = UIImage(data: imageData as Data)
            self.ivNewsImage.image = image
            }
    }

}
