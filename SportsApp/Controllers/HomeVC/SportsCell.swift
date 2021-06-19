//
//  SportsCell.swift
//  SportsApp
//
//  Created by Sanjeev on 08/06/21.
//

import Foundation
import UIKit

class SportsCell: UICollectionViewCell {
    
    @IBOutlet weak var lblTitle: UILabel!
    @IBOutlet weak var lblUnderline: UILabel!
 
    override func awakeFromNib() {
        lblTitle.textColor = .white
    }
     
}
