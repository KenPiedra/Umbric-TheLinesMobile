//
//  NavigationBarExtension.swift
//  SportsApp
//
//  Created by Sanjeev on 20/05/21.
//

import Foundation
import UIKit

extension UINavigationBar {
    
    ///Set navigation bar appearance black
    func appearBlack() {
        UINavigationBar.appearance().barTintColor = .black
        UINavigationBar.appearance().tintColor = .white
        UINavigationBar.appearance().titleTextAttributes = [NSAttributedString.Key.foregroundColor: UIColor.white]
        UINavigationBar.appearance().isTranslucent = false
    }
    
}


