//
//  NewsFeedDaoList.swift
//  SportsApp
//
//  Created by Apurva on 03/06/21.
//

import UIKit

class NewsFeedDaoList {
    static let sharedInstance = NewsFeedDaoList()
    public var arrAllPostDao = [AllNewsDao]()
   
    func parseData(arrData:[[String:Any]]) {
                for dictData in arrData {
            let objSubscribe = AllNewsDao(dictInfo: dictData)
            NewsFeedDaoList.sharedInstance.arrAllPostDao.append(objSubscribe)
        }
    }
}
   
class AllNewsDao {
    
    
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
