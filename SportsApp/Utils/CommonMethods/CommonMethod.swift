//
//  CommonMethod.swift
//  SportsApp
//
//  Created by Sanjeev on 12/06/21.
//

import Foundation
import UIKit

let appname = "Alert!" //used as title

@available(iOS 11.3, *)
class CommonMethod {
    
    class func getCurrrentDateAndTime() -> String? {
        let formatter = DateFormatter()
        //2016-12-08 03:37:22 +0000
        formatter.dateFormat = "yyyy-MM-dd HH:mm:ss" //Z"
        let now = Date()
        let dateString = formatter.string(from:now)
        
        return dateString
    }
    
    //save value in userdefautls
    class func saveUserDefault(key: String, value : Any) {
        UserDefaults.standard.set(value, forKey: key)
        UserDefaults.standard.synchronize()
    }
    
    //remove value in userdefautls
    class func removeUserDefault(key: String) {
        UserDefaults.standard.removeObject(forKey: key)
        UserDefaults.standard.synchronize()
    }
    
    //save value in userdefautls
    class func saveUserDefaultBoolValue(key: String, value: Bool?) {
        UserDefaults.standard.set(value, forKey: key)
        UserDefaults.standard.synchronize()
    }
    
    // get value form userdefaults
    class func getValueDefaults(key:String) -> Any {
        let value = UserDefaults.standard.object(forKey: key)
        return value as Any
    }
    
    // get value form userdefaults
    class func getValueDefaultsBoolValue(key:String) -> Bool? {
        let value = UserDefaults.standard.bool(forKey: key)
        return value
    }
    
    class func randomString(length: Int) -> String {
        let letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        return String((0..<length).map{ _ in letters.randomElement()! })
    }
    
    // show alert view controller
    class func showAlert(message: String, nav: UINavigationController) {
        DispatchQueue.main.async {
            
            let alert = UIAlertController(title: appname, message: message, preferredStyle: .alert)
            alert.addAction(UIAlertAction(title: "OK", style: .default, handler: { action in
                                            switch action.style {
                                            case .default:
                                                print("default")
                                            // Global.pushToVC(navVC: nav, toVC: Identifier.SubscriptionVC.rawValue)
                                            case .cancel:
                                                print("cancel")
                                            case .destructive:
                                                print("destructive")
                                            }}))
            UIApplication.shared.keyWindow?.rootViewController?.present(alert, animated: true, completion: nil)
        }
    }
    
    // push to view controlelr
    class func pushToVC(navVC: UINavigationController, toVC:String) {
        let vc = self.mainStoryBoard.instantiateViewController(withIdentifier: toVC)
        navVC.pushViewController(vc, animated: true)
    }
    
    static var mainStoryBoard: UIStoryboard {
        return UIStoryboard(name: "Main", bundle: nil)
    }
    
    static var authStoryBoard: UIStoryboard {
        return UIStoryboard(name: "Authentication", bundle: nil)
    }
    
    // check if email is valid
    class func isValidEmail(_ email:String) -> Bool {
        return NSPredicate(format:"SELF MATCHES %@", "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}").evaluate(with: email)
    }
    
    // MARK: Show Alert
    class func showAlert(_ msg:String) {
        DispatchQueue.main.async {
            let alert = UIAlertController(title: appname, message: msg, preferredStyle: .alert)
            let ok = UIAlertAction(title: "Ok", style: .default, handler: nil)
            alert.addAction(ok)
            rootController.present(alert, animated: true, completion: nil)
        }
    }
    
    // MARK: Get RootController
    class var rootController:UIViewController {
        return (UIApplication.shared.keyWindow?.rootViewController)!
    }
    
    // get application window
    class var window : UIWindow? {
        return (UIApplication.shared.delegate?.window)!
    }
    
    // Check Valid UserName
    class func isValidUsername(_ username : String) -> Bool {
        return NSPredicate(format: "SELF MATCHES %@", "\\A\\w{2,30}\\z").evaluate(with: username)
    }
    
    // Get today date as String
    class func getTodayDateForUI() -> String {
        
        let date = Date()
        let calender = Calendar.current
        let components = calender.dateComponents([.year,.month,.day,.hour,.minute,.second], from: date)
        
        let year = components.year
        let month = components.month
        let day = components.day
        //let hour = components.hour
        // let minute = components.minute
        //let second = components.second
        
        let today_string = String(day!) + "/" + String(month!) + "/" + String(year!)
        
        return today_string
    }
    
    //Get curret time in normal format
    class func getTime() -> String {
        
        let date = Date()
        let calender = Calendar.current
        let components = calender.dateComponents([.year,.month,.day,.hour,.minute,.second], from: date)
        
        let hour = components.hour
        let minute = components.minute
        
        let today_string = String(format: "%02d", hour!) + ":" + String(format: "%02d", minute!) //+ ":" +  String(second!)
        
        return today_string
    }
    
    class func showProgress() {
        DispatchQueue.main.async {
            let keyWindow = UIApplication.shared.connectedScenes
                .filter({$0.activationState == .foregroundActive})
                .map({$0 as? UIWindowScene})
                .compactMap({$0})
                .first?.windows
                .filter({$0.isKeyWindow}).first
            
//            SVProgressHUD.show()
 
            if var topController = keyWindow?.rootViewController {
                while let presentedViewController = topController.presentedViewController {
                    topController = presentedViewController
                    topController.view.isUserInteractionEnabled = false
                }
                // // topController should now be your topmost view controller
            }
        }
    }
    
    //MARK:- Set the root view controller
  /// Later set the root controller code here if need to do
    
    @objc
    class func hideProgress() {
        //DispatchQueue.main.async {
//        SVProgressHUD.dismiss() //not using
        
        DispatchQueue.main.async {
            
            let keyWindow = UIApplication.shared.connectedScenes
                .filter({$0.activationState == .foregroundActive})
                .map({$0 as? UIWindowScene})
                .compactMap({$0})
                .first?.windows
                .filter({$0.isKeyWindow}).first
            
            if var topController = keyWindow?.rootViewController {
                while let presentedViewController = topController.presentedViewController {
                    topController = presentedViewController
                    topController.view.isUserInteractionEnabled = true
                }
                // topController should now be your topmost view controller
            }
        }
        
        //}
    }
 
    class func saveModel<T: Codable>(ModelObj: T?, key: String) {
        let encoder = JSONEncoder()
        if let encoded = try? encoder.encode(ModelObj) {
            UserDefaults.standard.set(encoded, forKey: key)
        }
    }
    
    class func getModelUserDefault <T:Codable>(keys:String) -> T? {
        
        if let savedPerson = UserDefaults.standard.object(forKey: keys) as? Data {
            let decoder = JSONDecoder()
            if let loadedPerson = try? decoder.decode(T.self, from: savedPerson) {
                return loadedPerson
            } else {
                return nil
            }
        }
        else {
            return nil
        }
    }
    
    static var currentTimestamp: Int {
        return Int(Date().timeIntervalSince1970)
    }
    
    // MARK: Global navigation bar
    class func setAppNavigationBar(_ color: UIColor, titleColor: UIColor, viewController: UIViewController) {
        
        viewController.navigationController?.navigationBar.barTintColor = color
        viewController.navigationController?.navigationBar.tintColor = titleColor
        
        //viewController.navigationController?.navigationBar.isTranslucent = false
    }
    
    
    class func printAllFonts() {
        UIFont.familyNames.forEach({ familyName in
            let fontNames = UIFont.fontNames(forFamilyName: familyName)
            print(familyName, fontNames)
        })
    }
    
    
    class func openUrlWith(urlString: String) {
        
        guard let requestUrl = URL(string: urlString) else {
            return
        }
        
        UIApplication.shared.open(requestUrl, options: [:], completionHandler: nil)
    }
    
}

public protocol NibInstantiatable {
    
    static func nibName() -> String
}

extension NibInstantiatable {
    
    static func nibName() -> String {
        return String(describing: self)
    }
    
}

extension NibInstantiatable where Self: UIView {
    
    static func fromNib() -> Self {
        
        let bundle = Bundle(for: self)
        let nib = bundle.loadNibNamed(nibName(), owner: self, options: nil)
        
        return nib!.first as! Self
        
    }
    
}

extension Locale {
    func isoCode(for countryName: String) -> String? {
        return Locale.isoRegionCodes.first(where: { (code) -> Bool in
            localizedString(forRegionCode: code)?.compare(countryName, options: [.caseInsensitive, .diacriticInsensitive]) == .orderedSame
        })
    }
}


