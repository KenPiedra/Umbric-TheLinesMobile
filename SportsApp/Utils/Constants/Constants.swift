//
//  Constants.swift
//  SportsApp
//
//  Created by Sanjeev on 20/05/21.
//

import Foundation
import UIKit

enum AllSports: String, CaseIterable {
    case MLB
    case CCB
    case CFB
    case NBA
    case NFL
    case NHL
    case SOCCER
    case GOLF
    
    static var sportsList: [String] {
        return AllSports.allCases.map { $0.rawValue
        }
    }
}
enum AllNews: String, CaseIterable {
    case All
    case NBA
    case NFL
    case MLB
    case NHL
    case GOLF
    
    static var newsList: [String] {
        return AllNews.allCases.map { $0.rawValue
        }
    }
}

struct API {
    static let baseUrl = "https://us1.catenaus.com/api/v2/app/oddsfeed/"
    static let odds = "/odds?Day=2021-05-18"
    
    
    
    
    
//    static let getSportsData = baseUrl + selectedSport.rawValue.lowercased() +  "/odds?Day=2021-05-18"//&GameId=61970"
}

// MARK:- Storyboards
let kMainStoryboard = UIStoryboard(name: "Main", bundle: nil)

struct Cells {
    static let sportsCell = "SportsCellID"
    static let emptyCell = "EmptyCellID"
    static let MiddleDataCell = "MiddleDataCellID"
    static let CompanyCell = "CompanyCellID"
    static let LeftDataCell = "LeftDatacellID" 
}
