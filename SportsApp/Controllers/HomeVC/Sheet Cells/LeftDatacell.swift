//
//  LeftDatacell.swift
//  SportsApp
//
//  Created by Sanjeev on 15/06/21.
//

import UIKit

class LeftDatacell: UICollectionViewCell {
    
    @IBOutlet weak var lblTitle1: UILabel!
    @IBOutlet weak var lblTitle2: UILabel!
    @IBOutlet weak var lnlTitle3: UILabel!
    
    func configCell(data: SportsData) {
        lblTitle1.text =  data.awayTeamName
        lblTitle2.text = data.homeTeamName
        lnlTitle3.text = "7:00P"
    }
}
