//
//  SportsData.swift
//  SportsApp
//
//  Created by Sanjeev on 20/05/21.
//

import Foundation

struct SportsData {
    var id, gameID, season, seasonType: Int?
    var day, dateTime, status: String?
    var awayTeamID, homeTeamID: Int?
    var awayTeamName, homeTeamName: String?
    var globalGameID, globalAwayTeamID, globalHomeTeamID, homeTeamScore: Int?
    var awayTeamScore, totalScore, homeRotationNumber, awayRotationNumber: Int?
    var pregameOdds: [PregameOdd]?
    var liveOdds, alternateMarketPregameOdds: [Any?]?
    var updated, gameEndDateTime: String?
}

// MARK: - PregameOdd
struct PregameOdd {
    var gameOddID: Int?
    var sportsbook: String?
    var gameID: Int?
    var created, updated: String?
    var homeMoneyLine, awayMoneyLine: Int?
    var homePointSpread, awayPointSpread: Double?
    var homePointSpreadPayout, awayPointSpreadPayout, overUnder, overPayout: Int?
    var underPayout, sportsbookID: Int?
    var sportsbookURL: NSNull?
}
