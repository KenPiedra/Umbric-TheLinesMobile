//
//  MiddleDataCell.swift
//  SportsApp
//
//  Created by Sanjeev on 15/06/21.
//

import UIKit

class MiddleDataCell: UICollectionViewCell {
    
    /// Over Under
    
    @IBOutlet weak var overView: UIView!
    
    @IBOutlet weak var underView: UIView!
    @IBOutlet weak var OverUnderView: UIView!
    /// Both over under lbls should contain same text
    @IBOutlet weak var lblOverUnder: UILabel!
    @IBOutlet weak var lblOverUnderSame: UILabel!
    @IBOutlet weak var lblOverPayout: UILabel!
    @IBOutlet weak var lblUnderPayout: UILabel!
    /// Spread
    @IBOutlet weak var spreadView: UIView! /// Away Spread
    @IBOutlet weak var lblAwayPointSpread: UILabel!
    @IBOutlet weak var lblAwayPointPayout: UILabel!
    @IBOutlet weak var secondView: UIView! /// Home spread
    @IBOutlet weak var lblHomePointSpread: UILabel!
    @IBOutlet weak var lblHomePayout: UILabel!
    /// Money Line
    @IBOutlet weak var moneyLineView: UIView! /// Away and Home lbls inside this Money Line view
    @IBOutlet weak var lblAwayMoneyLine: UILabel!
    @IBOutlet weak var lblHomewayMoneyLine: UILabel!
    /// Make Bet button
    @IBOutlet weak var btnMakeBet: UIButton!
    var btnUrl: String? = ""
    
    let yourAttributes: [NSAttributedString.Key: Any] = [
        .font: UIFont.systemFont(ofSize: 14),
        .foregroundColor: UIColor.white,
        .underlineStyle: NSUnderlineStyle.single.rawValue
    ] // .double.rawValue, .thick.rawValue
    
    override func awakeFromNib() {
        super.awakeFromNib()
        spreadView.layer.cornerRadius = 2.0
        spreadView.clipsToBounds = true
        secondView.layer.cornerRadius = 2.0
        secondView.clipsToBounds = true
        moneyLineView.layer.cornerRadius = 2.0
        moneyLineView.clipsToBounds = true
        lblAwayMoneyLine.layer.cornerRadius = 2.0
        lblHomewayMoneyLine.layer.cornerRadius = 2.0
        lblAwayMoneyLine.clipsToBounds = true
        lblHomewayMoneyLine.clipsToBounds = true
        overView.layer.cornerRadius = 2.0
        underView.layer.cornerRadius = 2.0
        overView.clipsToBounds = true
        underView.clipsToBounds = true
        let attributeString = NSMutableAttributedString(
           string: "Make Bet",
           attributes: yourAttributes)
        btnMakeBet.setAttributedTitle(attributeString, for: .normal)
    }
 
    func configCell(data: PregameOdd, currentType: TypeDropDown) {
        switch currentType {
        case .spread:
            moneyLineView.isHidden = true
            spreadView.isHidden = false
            secondView.isHidden = false
            OverUnderView.isHidden = true
            /// Spread content
            lblAwayPointSpread.text = String(format: "%.0f", data.awayPointSpread!)
            lblAwayPointPayout.text = String(format: "%.0f", data.awayPointSpreadPayout!)
            lblHomePointSpread.text = String(format: "%.0f", data.homePointSpread!)
            lblHomePayout.text = String(format: "%.0f", data.homePointSpreadPayout!)
            if data.sportsbookURL != nil {
                btnUrl = data.sportsbookURL
            }
        case .moneyLine:
            moneyLineView.isHidden = false
            spreadView.isHidden = true
            secondView.isHidden = true
            OverUnderView.isHidden = true
            /// Money line content
            lblAwayMoneyLine.text = String(data.awayMoneyLine ?? 0)
            lblHomewayMoneyLine.text = String(data.homeMoneyLine ?? 0)
        case .overUnder:
            moneyLineView.isHidden = true
            spreadView.isHidden = true
            secondView.isHidden = true
            OverUnderView.isHidden = false
            /// Over/Under content
            lblOverUnder.text = String(format: "%.0f", data.overUnder!)
            lblOverUnderSame.text = String(format: "%.0f", data.overUnder!)
            lblOverPayout.text = String(data.overPayout ?? 0)
            lblUnderPayout.text = String(data.underPayout ?? 0)
        }
    }
    
    /// Make button action for Make bet button
    @IBAction func makeBetAction(_ sender: UIButton) {
        if btnUrl?.count != 0 {
            print(btnUrl ?? "N/A")
            /// Open URL in safari
            if let url = URL(string: btnUrl!) {
                UIApplication.shared.open(url)
            }
        } else {
            CommonMethod.showAlert("No Url found!")
        }
    }
    
}
