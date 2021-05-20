//
//  ViewController.swift
//  SportsApp
//
//  Created by Sanjeev on 20/05/21.
//

import UIKit

class Home: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        
        /// First Do UI updates here
        configUI()
        getData()
    }
    
    func configUI() {
        self.view.backgroundColor = .black
    }
    
    func getData() {
        ///Call Data API
    }
 
}

