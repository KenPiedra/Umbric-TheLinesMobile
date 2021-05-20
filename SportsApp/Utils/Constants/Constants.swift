//
//  Constants.swift
//  SportsApp
//
//  Created by Sanjeev on 20/05/21.
//

import Foundation

struct API {
    static let baseUrl = "https://us1.catenaus.com/api/v2/app/oddsfeed/"
    let getSportsData = baseUrl + "mlb/odds?Day=2021-05-18&GameId=61970"
}
