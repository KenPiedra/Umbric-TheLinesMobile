//
//  TabbarVC.swift
//  GymTrainer
//
//  Created by Sanjeev on 11/02/20.
//  Copyright © All rights reserved.
//

import UIKit

let HEIGHT_TAB_BAR_small: CGFloat = 65
let HEIGHT_TAB_BAR_large: CGFloat = 95

class TabbarVC: UITabBarController {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        self.delegate = self
        
        UINavigationBar.appearance().shadowImage = UIColor.gray.as1ptImage()
        self.tabBarController?.tabBar.backgroundColor = .black
        self.tabBarController?.tabBar.shadowImage = UIImage()
        // Need to increase the font size of navigation bar title text
        // UINavigationBar.appearance().titleTextAttributes = [NSAttributedString.Key.font: UIFont(name: "Mulish", size: 23)!]
        
        let itemAppearance = UITabBarItem.appearance()
        let tabAppearance = UITabBar.appearance()
        
        tabAppearance.shadowImage = UIImage()
        tabAppearance.backgroundColor = .black
        
        /// White background with red border on top
        tabAppearance.backgroundImage = UIImage.colorForNavBar(color: .black)
        tabAppearance.shadowImage = UIImage.colorForNavBar(color: .gray)
        
        /// Unselected icon color
        tabAppearance.unselectedItemTintColor = .white //
        
        /// mehroon color
        tabAppearance.tintColor = UIColor(red: 167.0/255.0, green: 73.0/255.0, blue: 73.0/255.0, alpha: 1.0)
        
        let attributes = [NSAttributedString.Key.font: UIFont(name: "Mulish-Regular", size: 14)]
        itemAppearance.setTitleTextAttributes(attributes as [NSAttributedString.Key : Any], for: .normal)
    }
    
    override func viewDidLayoutSubviews() {
        super.viewDidLayoutSubviews()
        var tabFrame = self.tabBar.frame
        
        if UIDevice.current.type == .iPhone_5_5S_SE_5C {
            
        } else if UIDevice.current.type == .iPhone_6p_6Sp_7p_8p {
            tabFrame.size.height = HEIGHT_TAB_BAR_small
            tabFrame.origin.y = self.view.frame.size.height - HEIGHT_TAB_BAR_small
        } else { // 11 etc
            tabFrame.size.height = HEIGHT_TAB_BAR_large
            tabFrame.origin.y = self.view.frame.size.height - HEIGHT_TAB_BAR_large
        }
        
        self.tabBar.frame = tabFrame
    }
    
    class func instance() -> TabbarVC {
        let className = String(describing: self)
        return kMainStoryboard.instantiateViewController(withIdentifier: className) as! TabbarVC
    }
    
}

extension TabbarVC: UITabBarControllerDelegate {
    func tabBarController(_ tabBarController: UITabBarController, didSelect viewController: UIViewController) {
    }
}
