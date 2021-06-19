//
//  CompanyCell.swift
//  SportsApp
//
//  Created by Sanjeev on 15/06/21.
//

import UIKit

class CompanyCell: UICollectionViewCell {
    
    @IBOutlet weak var imgSuperView: UIView!
    @IBOutlet weak var imgLogo: UIImageView!
    @IBOutlet weak var lblPrice: UILabel!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        imgSuperView.layer.cornerRadius = imgSuperView.frame.size.height/2.0
        imgSuperView.clipsToBounds = true
    }
    
    func configCell(data: PregameOdd) {
        imgLogo.image = UIImage(named: data.sportsbook!)
        lblPrice.text = "$500"
    }
}
