//
//  NewsFeedDaoList.swift
//  SportsApp
//
//  Created by Apurva on 03/06/21.
//

import UIKit

class NewsFeedDaoList {
    static let sharedInstance = NewsFeedDaoList()
    public var arrAllNewsDao = [AllNewsDao]()
    public var arrNBANewsDao = [NBANewsDao]()
    public var arrNFLNewsDao = [NFLNewsDao]()
    public var arrMLBNewsDao = [MLBNewsDao]()
    public var arrNHLNewsDao = [NHLNewsDao]()
    public var arrGOLFNewsDao = [GOLFNewsDao]()
    
    
    func parseData(arrData:[[String:Any]]) {
                for dictData in arrData {
                    
                    let objAllNews = AllNewsDao(dictInfo: dictData)
                    let objNBANews = NBANewsDao(dictInfo: dictData)
                    let objNFLNews = NFLNewsDao(dictInfo: dictData)
                    let objMLBNews = MLBNewsDao(dictInfo: dictData)
                    let objNHLNews = NHLNewsDao(dictInfo: dictData)
                    let objGOLFNews = GOLFNewsDao(dictInfo: dictData)
                    let objResult = dictData["categoryName"]
                    
                    NewsFeedDaoList.sharedInstance.arrAllNewsDao.append(objAllNews)
                    if  objResult as! String == "nba" {
                        NewsFeedDaoList.sharedInstance.arrNBANewsDao.append(objNBANews)
                    }
                    if  objResult as! String == "nfl" {
                        NewsFeedDaoList.sharedInstance.arrNFLNewsDao.append(objNFLNews)
                    }
                    if  objResult as! String == "mlb" {
                        NewsFeedDaoList.sharedInstance.arrMLBNewsDao.append(objMLBNews)
                    }
                    if  objResult as! String == "nhl" {
                        NewsFeedDaoList.sharedInstance.arrNHLNewsDao.append(objNHLNews)
                    }
                    if  objResult as! String == "golf" {
                        NewsFeedDaoList.sharedInstance.arrGOLFNewsDao.append(objGOLFNews)
                    }
                  
        }
    }
}
   
class AllNewsDao {
    
    var categoryName: String?
    var TotalRecords: Int?
    var title: String?
    var creator: String?
    var link: String?
    var pubDate: String?
    var category: String?
    var guid: String?
    var description: String?
    var encoded: String?
    var image: String?
    
    init() {
    }
    
    init(dictInfo:[String:Any]) {
        if let obj = dictInfo["categoryName"] {
            self.categoryName = obj as? String
        }
        if let obj = dictInfo["TotalRecords"] {
            self.TotalRecords = obj as? Int
        }
        
        if let obj = dictInfo["title"] {
            self.title = obj as? String
        }
        
        if let obj = dictInfo["creator"] {
            self.creator = obj as? String
        }
        
        if let obj = dictInfo["link"] {
            self.link = obj as? String
        }
        
        if let obj = dictInfo["pubDate"] {
            self.pubDate = obj as? String
        }
//
//            if let obj = dictInfo["category"] {
//                self.category = obj as? String
//            }
        
        if let obj = dictInfo["guid"] {
            self.guid = obj as? String
        }
        
        if let obj = dictInfo["description"] {
            self.description = obj as? String
        }
        if let obj = dictInfo["encoded"] {
            self.encoded = obj as? String
        }
        
        if let obj = dictInfo["image"] {
            self.image = obj as? String
        }
        
    }
    
}

class NBANewsDao {
    
    var categoryName: String?
    var TotalRecords: Int?
    var title: String?
    var creator: String?
    var link: String?
    var pubDate: String?
    var category: String?
    var guid: String?
    var description: String?
    var encoded: String?
    var image: String?
    
    init() {
    }
    
    init(dictInfo:[String:Any]) {
        if let obj = dictInfo["categoryName"] {
            self.categoryName = obj as? String
        }
        if let obj = dictInfo["TotalRecords"] {
            self.TotalRecords = obj as? Int
        }
        
        if let obj = dictInfo["title"] {
            self.title = obj as? String
        }
        
        if let obj = dictInfo["creator"] {
            self.creator = obj as? String
        }
        
        if let obj = dictInfo["link"] {
            self.link = obj as? String
        }
        
        if let obj = dictInfo["pubDate"] {
            self.pubDate = obj as? String
        }
//
//            if let obj = dictInfo["category"] {
//                self.category = obj as? String
//            }
        
        if let obj = dictInfo["guid"] {
            self.guid = obj as? String
        }
        
        if let obj = dictInfo["description"] {
            self.description = obj as? String
        }
        if let obj = dictInfo["encoded"] {
            self.encoded = obj as? String
        }
        
        if let obj = dictInfo["image"] {
            self.image = obj as? String
        }
        
    }
    
}
class NFLNewsDao {
    
    var categoryName: String?
    var TotalRecords: Int?
    var title: String?
    var creator: String?
    var link: String?
    var pubDate: String?
    var category: String?
    var guid: String?
    var description: String?
    var encoded: String?
    var image: String?
    
    init() {
    }
    
    init(dictInfo:[String:Any]) {
        if let obj = dictInfo["categoryName"] {
            self.categoryName = obj as? String
        }
        if let obj = dictInfo["TotalRecords"] {
            self.TotalRecords = obj as? Int
        }
        
        if let obj = dictInfo["title"] {
            self.title = obj as? String
        }
        
        if let obj = dictInfo["creator"] {
            self.creator = obj as? String
        }
        
        if let obj = dictInfo["link"] {
            self.link = obj as? String
        }
        
        if let obj = dictInfo["pubDate"] {
            self.pubDate = obj as? String
        }
//
//            if let obj = dictInfo["category"] {
//                self.category = obj as? String
//            }
        
        if let obj = dictInfo["guid"] {
            self.guid = obj as? String
        }
        
        if let obj = dictInfo["description"] {
            self.description = obj as? String
        }
        if let obj = dictInfo["encoded"] {
            self.encoded = obj as? String
        }
        
        if let obj = dictInfo["image"] {
            self.image = obj as? String
        }
        
    }
    
}
class MLBNewsDao {
    
    var categoryName: String?
    var TotalRecords: Int?
    var title: String?
    var creator: String?
    var link: String?
    var pubDate: String?
    var category: String?
    var guid: String?
    var description: String?
    var encoded: String?
    var image: String?
    
    init() {
    }
    
    init(dictInfo:[String:Any]) {
        if let obj = dictInfo["categoryName"] {
            self.categoryName = obj as? String
        }
        if let obj = dictInfo["TotalRecords"] {
            self.TotalRecords = obj as? Int
        }
        
        if let obj = dictInfo["title"] {
            self.title = obj as? String
        }
        
        if let obj = dictInfo["creator"] {
            self.creator = obj as? String
        }
        
        if let obj = dictInfo["link"] {
            self.link = obj as? String
        }
        
        if let obj = dictInfo["pubDate"] {
            self.pubDate = obj as? String
        }
//
//            if let obj = dictInfo["category"] {
//                self.category = obj as? String
//            }
        
        if let obj = dictInfo["guid"] {
            self.guid = obj as? String
        }
        
        if let obj = dictInfo["description"] {
            self.description = obj as? String
        }
        if let obj = dictInfo["encoded"] {
            self.encoded = obj as? String
        }
        
        if let obj = dictInfo["image"] {
            self.image = obj as? String
        }
        
    }
    
}
class NHLNewsDao {
    
    var categoryName: String?
    var TotalRecords: Int?
    var title: String?
    var creator: String?
    var link: String?
    var pubDate: String?
    var category: String?
    var guid: String?
    var description: String?
    var encoded: String?
    var image: String?
    
    init() {
    }
    
    init(dictInfo:[String:Any]) {
        if let obj = dictInfo["categoryName"] {
            self.categoryName = obj as? String
        }
        if let obj = dictInfo["TotalRecords"] {
            self.TotalRecords = obj as? Int
        }
        
        if let obj = dictInfo["title"] {
            self.title = obj as? String
        }
        
        if let obj = dictInfo["creator"] {
            self.creator = obj as? String
        }
        
        if let obj = dictInfo["link"] {
            self.link = obj as? String
        }
        
        if let obj = dictInfo["pubDate"] {
            self.pubDate = obj as? String
        }
//
//            if let obj = dictInfo["category"] {
//                self.category = obj as? String
//            }
        
        if let obj = dictInfo["guid"] {
            self.guid = obj as? String
        }
        
        if let obj = dictInfo["description"] {
            self.description = obj as? String
        }
        if let obj = dictInfo["encoded"] {
            self.encoded = obj as? String
        }
        
        if let obj = dictInfo["image"] {
            self.image = obj as? String
        }
        
    }
    
}
class GOLFNewsDao {
    
    var categoryName: String?
    var TotalRecords: Int?
    var title: String?
    var creator: String?
    var link: String?
    var pubDate: String?
    var category: String?
    var guid: String?
    var description: String?
    var encoded: String?
    var image: String?
    
    init() {
    }
    
    init(dictInfo:[String:Any]) {
        if let obj = dictInfo["categoryName"] {
            self.categoryName = obj as? String
        }
        if let obj = dictInfo["TotalRecords"] {
            self.TotalRecords = obj as? Int
        }
        
        if let obj = dictInfo["title"] {
            self.title = obj as? String
        }
        
        if let obj = dictInfo["creator"] {
            self.creator = obj as? String
        }
        
        if let obj = dictInfo["link"] {
            self.link = obj as? String
        }
        
        if let obj = dictInfo["pubDate"] {
            self.pubDate = obj as? String
        }
//
//            if let obj = dictInfo["category"] {
//                self.category = obj as? String
//            }
        
        if let obj = dictInfo["guid"] {
            self.guid = obj as? String
        }
        
        if let obj = dictInfo["description"] {
            self.description = obj as? String
        }
        if let obj = dictInfo["encoded"] {
            self.encoded = obj as? String
        }
        
        if let obj = dictInfo["image"] {
            self.image = obj as? String
        }
        
    }
    
}
