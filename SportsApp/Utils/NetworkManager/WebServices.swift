//
//  ViewController.swift
//  SportsApp
//
//  Created by Sanjeev on 20/05/21.
//

import Foundation
import Reachability
import Alamofire
import UIKit

final class Webservices
{
    static let instance = Webservices()
    private init() {}
    
    // MARK: - URLSession methods
    func getMethod<T: Codable>(url:String, completion: @escaping (_ isSuccess :Bool, _ response: [T]) -> Void)
    {
        //CommonMethod.showProgress()
        print("URL:- \(url)")
        if self.isReachable
        {
            var request = URLRequest(url: URL(string: url)!)
            request.httpMethod = "GET"
            request.timeoutInterval = 240
            request.cachePolicy = .reloadIgnoringLocalCacheData
            // request.addValue("application/x-www-form-urlencoded; charset=utf-8", forHTTPHeaderField: "Content-Type")
            request.setValue("application/json", forHTTPHeaderField: "Content-Type")
            request.setValue("application/json", forHTTPHeaderField: "Accept")
             
            // Create url session
            let session = URLSession(configuration: URLSessionConfiguration.default)
            // Call session data task.
            session.dataTask(with: request) { (data, response, error) -> Void in
                // Check Data
                //CommonMethod.hideProgress()
                if let data = data {
                    
                    // Json Response
                    let json = try? JSONSerialization.jsonObject(with: data, options: [])
                    if let response = response as? HTTPURLResponse , 200...299 ~= response.statusCode {
 
                        do {
                            let decoder = JSONDecoder()
                            let model = try decoder.decode([T].self, from: data)
                            completion(true, model)
                            //print(model as Any)
                        } catch DecodingError.dataCorrupted(let context) {
                            print(context)
                        } catch DecodingError.keyNotFound(let key, let context) {
                            print("Key '\(key)' not found:", context.debugDescription)
                            print("codingPath:", context.codingPath)
                        } catch DecodingError.valueNotFound(let value, let context) {
                            print("Value '\(value)' not found:", context.debugDescription)
                            print("codingPath:", context.codingPath)
                        } catch DecodingError.typeMismatch(let type, let context) {
                            print("Type '\(type)' mismatch:", context.debugDescription)
                            print("codingPath:", context.codingPath)
                        } catch {
                            print("error: ", error)
                        }
                        
                    } else {
                        completion(false,(json as? [T])!)
                    }
                    
                } else {
                    DispatchQueue.main.async {
                        // Utility.showErrorAlert(error: .networkError)
                    }
                }
            }.resume()
        } else {
            DispatchQueue.main.async {
                // Utility.showErrorAlert(error: .noConnection)
            }
        }
    }
    
    func deleteMethod<T: Codable>( url:String,param: [String:Any]?, completion: @escaping (T?,  _ error:String?) -> ()) {
        
        if self.isReachable
        {
            var request = URLRequest(url: URL(string: url)!)
            request.httpMethod = "DELETE"
            request.timeoutInterval = 240
            request.cachePolicy = .reloadIgnoringLocalCacheData
            
            request.setValue("application/json", forHTTPHeaderField: "Content-Type")
            request.setValue("application/json", forHTTPHeaderField: "Accept")
            //            request.setValue("Bearer \(String(describing: userdata.data!))", forHTTPHeaderField: "Authorization")
            
            if param != nil {
                guard let httpBody = try? JSONSerialization.data(withJSONObject: param!, options: []) else {
                    return
                }
                request.httpBody = httpBody
            }
            
            //get access token
//            if let accessToken = AWSManager.shared.accessToken {
//                print("CURRENT ACCESS TOKEN ##->", accessToken)
//                request.setValue("Bearer " + accessToken, forHTTPHeaderField:"Authorization")
//            }
            // Create url session
            let session = URLSession(configuration: URLSessionConfiguration.default)
            // Call session data task.
            
            
            
            session.dataTask(with: request) { (data, response, error) -> Void in
                // Check Data
                if let data = data {
                    // Json Response
                    let re = try? JSONSerialization.jsonObject(with: data, options: [])
                    print(re as Any)
                    // response.
                    if let response = response as? HTTPURLResponse , 200...299 ~= response.statusCode {
                        do {
                            let model = try JSONDecoder().decode(T.self, from: data)
                            completion(model,nil)
                        } catch let jsonErr {
                            print("failed to decode, \(jsonErr)")
                            completion(nil,error?.localizedDescription)
                        }
                    } else {
                        completion(nil,error?.localizedDescription)
                    }
                } else {
                    completion(nil,error?.localizedDescription)
                }
            }.resume()
        } else {
            DispatchQueue.main.async {
                completion(nil,"Please check your internet connection!")
            }
        }
    }
    
    
    func postMethod<Model: Codable>(_ urlString:String,param: [String:Any], completion: @escaping (Model?, _ isSuccess :Bool) -> Void)
    {
        print("PARAM==> \(param)")
        if self.isReachable
        {
            guard let serviceUrl = URL(string: urlString) else { return }
            var request = URLRequest(url: serviceUrl)
            request.httpMethod = "POST"
            request.timeoutInterval = 180
            request.cachePolicy = .reloadIgnoringLocalCacheData
            request.setValue("application/json", forHTTPHeaderField: "Content-Type")
            
            //get access token
//            if let accessToken = AWSManager.shared.accessToken {
//                print("CURRENT ACCESS TOKEN ##->", accessToken)
//                request.setValue("Bearer " + accessToken, forHTTPHeaderField:"Authorization")
//            }
//
            guard let httpBody = try? JSONSerialization.data(withJSONObject: param, options: []) else {
                return
            }
            request.httpBody = httpBody
            let session = URLSession.shared
            session.dataTask(with: request) { (data, response, error) in
                // Check Data
                //print(response)
                if let data = data {
                    // response.
                    let re = try? JSONSerialization.jsonObject(with: data, options: .allowFragments)
                    print(re as Any)
                    
                    if let response = response as? HTTPURLResponse , 200...299 ~= response.statusCode {
                        do {
                            let model = try JSONDecoder().decode(Model.self, from: data)
                            completion(model, true)
                        } catch let jsonErr {
                            print("failed to decode, \(jsonErr)")
                        }
                    } else {
                        completion(nil, false)
                    }
                } else {
                    DispatchQueue.main.async {
                        // Utility.showErrorAlert(error: .networkError)
                        //print(response)
                        print(error as Any)
                        //CommonMethod.showAlert(error.debugDescription)
                    }
                }
            }.resume()
        } else {
            DispatchQueue.main.async {
                // Utility.showErrorAlert(error: .noConnection)
            }
        }
    }
    
    func postSubscriptionAPI(_ urlString:String,param: [String:Any], completion: @escaping (_ isSuccess :Bool, _ response: AnyObject) -> Void)
    {
        print("PARAM==> \(param)")
        if self.isReachable
        {
            guard let serviceUrl = URL(string: urlString) else { return }
            var request = URLRequest(url: serviceUrl)
            request.httpMethod = "POST"
            request.timeoutInterval = 80
            request.cachePolicy = .reloadIgnoringLocalCacheData
            request.setValue("application/json", forHTTPHeaderField: "Content-Type")
            request.setValue("application/json", forHTTPHeaderField: "Accept")
            
//            if CommonMethod.getValueDefaults(key: "access_token") as? String != nil {
//
//                request.setValue("Bearer \(CommonMethod.getValueDefaults(key: "access_token") as! String)", forHTTPHeaderField:"Authorization")
//            }
            
            guard let httpBody = try? JSONSerialization.data(withJSONObject: param, options: []) else {
                return
            }
            request.httpBody = httpBody
            let session = URLSession.shared
            session.dataTask(with: request) { (data, response, error) in
                // Check Data
                //print(response)
                if let data = data {
                    // Json Response
                    
                    let json = try? JSONSerialization.jsonObject(with: data, options: [])
                    // response.
                    if let response = response as? HTTPURLResponse , 200...299 ~= response.statusCode {
                        completion(true,json as AnyObject)
                    } else {
                        completion(false,json as AnyObject)
                    }
                } else {
                    DispatchQueue.main.async {
                        // Utility.showErrorAlert(error: .networkError)
                        //print(response)
                        print(error as Any)
                    }
                }
            }.resume()
        } else {
            DispatchQueue.main.async {
                // Utility.showErrorAlert(error: .noConnection)
            }
        }
    }
    
    // MARK:- Check for network connection availability
    var isReachable: Bool {
        
        var reach: Bool = false
        do {
            reach = try Reachability().connection != Reachability.Connection.unavailable
            return reach
        } catch { }
        
        return false
    }
    
    
    //    func createProfileWithImage( profile:UIImage, cover:UIImage, param:[String:Any], url:String , resultApi:@escaping( _ response:Any?,_ error:Error?) -> Void){
    //        let profileData = profile.jpegData(compressionQuality: 0.5)!
    //
    //        Alamofire.upload(multipartFormData: { multipartFormData in
    //
    //            multipartFormData.append(profileData, withName: "profile_pic",fileName: "image.jpg", mimeType: "image/jpg")
    //            for (key, value) in param {
    //
    //                multipartFormData.append("\(value)".data(using: String.Encoding.utf8)!, withName: key)
    //
    //            }
    //        },
    //                         to:url)
    //        { (result) in
    //            switch result {
    //            case .success(let upload,_,_):
    //
    //                upload.uploadProgress(closure: { (progress) in
    //                    print("Upload Progress: \(progress.fractionCompleted)")
    //                })
    //
    //                upload.responseJSON { response in
    //                    resultApi(response.result.value,nil)
    //                }
    //
    //            case .failure(let encodingError):
    //                print(encodingError)
    //                resultApi(nil,encodingError)
    //            }
    //        }
    //    }
    
    // MARK:- Alamofire methods
    
    //    func postApi(_ urlString:String, param:[String:Any], completion: @escaping (_ isSuccess :Bool, _ response: AnyObject?) -> Void){
    //        if isReachable
    //        {
    //
    //            let headers: HTTPHeaders = [
    //                "Content-Type": "application/json",
    //                "Accept": "application/json"
    //            ]
    //
    //            Alamofire.request(urlString, method: .post, parameters: param,encoding: URLEncoding.default, headers: headers).responseJSON
    //                {
    //                    response in
    //                    switch response.result
    //                    {
    //
    //                    case .success:
    //
    //                        //print(response.result.value)
    //
    //                        if let val = response.result.value
    //                        {
    //                            let res = val as AnyObject
    //                            if res["status"] as? String == "0"
    //                            {
    //                                completion(false, res)
    //                            }
    //                            else
    //                            {
    //                                completion(true, res)
    //                            }
    //                        }
    //                        break
    //                    case .failure(let error):
    //                        print(error)
    //                        completion(false, nil)
    //                        DispatchQueue.main.async {
    //                            //  Utility.showErrorAlert(error: .networkError)
    //                        }
    //                    }
    //            }
    //        }
    //        else
    //        {
    //            DispatchQueue.main.async
    //                {
    //                    completion(false, nil)
    //                    // Utility.showErrorAlert(error: .noConnection)
    //            }
    //        }
    //    }
    
    //    //MARK:- GET API
    //    func getApi(_ urlString:String, completion: @escaping (_ isSuccess :Bool, _ response: AnyObject?) -> Void) {
    //
    //        if isReachable {
    //
    //            Alamofire.request(urlString, method: .get, parameters:nil, encoding: URLEncoding.default, headers: nil).responseJSON {
    //                    response in
    //                    switch response.result {
    //                    case .success:
    //                        if let val = response.result.value {
    //                            let res = val as AnyObject
    //                            completion(true, res)
    //                        }
    //                        break
    //                    case .failure(let error):
    //                        print(error)
    //                        completion(false, nil)
    //                        DispatchQueue.main.async {
    //                                //  Utility.showErrorAlert(error: .networkError)
    //                        }
    //                    }
    //            }
    //        } else {
    //            DispatchQueue.main.async
    //                {
    //                    completion(false, nil)
    //            }
    //        }
    //    }
    
    //    func Login(_ urlString:String, param:[String:Any], completion: @escaping (_ isSuccess :Bool, _ response: User?) -> Void) {
    //        if isReachable {
    //
    //            Alamofire.request(urlString, method: .post, parameters: param,encoding: JSONEncoding.default, headers: nil).responseJSON  {
    //                    response in
    //                    switch response.result {
    //
    //                    case .success:
    //
    //                        if (response.data != nil) {
    //                            do {
    //                                let decoder = JSONDecoder()
    //                                let gitData = try decoder.decode(User.self, from: response.data!)
    //                                if gitData.status == 404 {
    //                                    completion(false, gitData)
    //                                } else {
    //                                    completion(true, gitData)
    //                                }
    //                                //                                if let response = response as? HTTPURLResponse , 200...299 ~= response.statusCode {
    //                                //                                    completion(true, gitData)
    //                                //                                } else {
    //                                //                                }
    //                            } catch let err {
    //                                print("Err", err)
    //                                completion(false, nil)
    //                            }
    //                        }
    //                        //                        if let val = response.result.value
    //                        //                        {
    //                        //                            let res = val as AnyObject
    //                        //                            if res["status"] as? String == "0"
    //                        //                            {
    //                        //                                completion(false, res)
    //                        //                            }
    //                        //                            else
    //                        //                            {
    //                        //                                completion(true, res)
    //                        //                            }
    //                        //                        }
    //                        break
    //                    case .failure(let error):
    //                        print(error)
    //                        completion(false, nil)
    //                        DispatchQueue.main.async {
    //                            completion(false, nil)
    //                        }
    //                    }
    //            }
    //        } else {
    //            DispatchQueue.main.async
    //                {
    //                    completion(false, nil)
    //                    // Utility.showErrorAlert(error: .noConnection)
    //                    CommonMethod.showAlert("Please connect to Internet")
    //            }
    //        }
    //    }
    
    
    
    // MARK:- Generic method GET
    //    func genericGet<T: Codable>(_ url:String, param:[String:Any]?, completion: @escaping (T?, _ error:String?) -> ()) {
    //        if isReachable == false
    //        {
    //            CommonMethod.hideProgress()
    //            CommonMethod.showAlert("Please check your internet connection")
    //            return
    //        }
    //        var headers: [String:String]?
    //        //if main.user != nil {
    //            if CommonMethod.getValueDefaults(key: "access_token") as? String != nil {
    //
    //            //headers = ["Content-Type":"application/json","Accept":"application/json","Authorization":"Bearer \(main.user!.access_token!)"]
    //            headers = ["Content-Type":"application/json","Accept":"application/json","Authorization":"Bearer \(CommonMethod.getValueDefaults(key: "access_token") as! String)"]
    //                print(headers as Any)
    //        }
    //        Alamofire.request(url, method: .get, parameters: param, encoding: URLEncoding.default, headers: headers).responseJSON {
    //            response in
    //            switch response.result {
    //
    //            case .success:
    //                if let val = response.data {
    //                    do {
    //                        let model = try JSONDecoder().decode(T.self, from: val)
    //                        completion(model,nil)
    //                    } catch let jsonErr {
    //                        print("failed to decode, \(jsonErr)")
    //                        completion(nil,jsonErr.localizedDescription)
    //                    }
    //                }
    //                break
    //            case .failure(let error):
    //                print(error)
    //                completion(nil,error.localizedDescription)
    //            }
    //        }
    //    }
    
    // MARK:- Generic methods POST
    //    func genericPost<T: Codable>(_ url: String, param: [String:Any]?, completion: @escaping (T?, _ error: String?) -> ()) {
    //        if isReachable == false
    //        {
    //            CommonMethod.hideProgress()
    //            CommonMethod.showAlert("Please check your internet connection")
    //            return
    //        }
    //        var headers: [String:String]?
    //        if main.user != nil {
    //
    //           // headers = ["Content-Type":"application/json","Accept":"application/json","Authorization":"Bearer \(main.user!.access_token!)"]
    //          headers = ["Content-Type":"application/json","Accept":"application/json","Authorization":"Bearer \(CommonMethod.getValueDefaults(key: "access_token") as! String)"]
    //
    //        }
    //        Alamofire.request(url, method: .post, parameters: param, encoding: URLEncoding.default, headers: headers).responseJSON {
    //            response in
    //            switch response.result {
    //            case .success:
    //                if let val = response.data {
    //                    do {
    //                        let model = try JSONDecoder().decode(T.self, from: val)
    //                        completion(model,nil)
    //                    } catch let jsonErr {
    //                        print("failed to decode, \(jsonErr)")
    //                        completion(nil,jsonErr.localizedDescription)
    //                    }
    //                }
    //                break
    //            case .failure(let error):
    //                print(error)
    //                completion(nil,error.localizedDescription)
    //            }
    //        }
    //    }
    
    // MARK:- JSON
    func json(from object:Any) -> String? {
        guard let data = try? JSONSerialization.data(withJSONObject: object, options: []) else {
            return nil
        }
        return String(data: data, encoding: .utf8)
    }
    
    func objectFrom(json:String) -> Any? {
        let json = try? JSONSerialization.jsonObject(with: json.data(using: .utf8)!, options: [])
        return json
    }
    
    // Convert from JSON to nsdata
    func jsonToData(_ json: AnyObject) -> Data? {
        do {
            return try JSONSerialization.data(withJSONObject: json, options: .prettyPrinted)
        } catch let myJSONError {
            print(myJSONError)
        }
        return nil;
    }
    
}
