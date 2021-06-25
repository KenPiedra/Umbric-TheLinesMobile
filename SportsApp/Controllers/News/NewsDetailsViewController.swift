//
//  NewsDetailsViewController.swift
//  SportsApp
//
//  Created by Pratiksha on 16/06/21.
//
import Nuke
import UIKit

class NewsDetailsViewController: UIViewController {
    var delegate : AllNewsDao?
    @IBOutlet weak var btnBack: UIButton!
    @IBOutlet weak var lblNewsDescription: UILabel!
    @IBOutlet weak var viewMain: UIView!
    @IBOutlet weak var lblNewsTitle: UILabel!
    @IBOutlet weak var lblCategory: UILabel!
    @IBOutlet weak var imgNews: UIImageView!
    override func viewDidLoad() {
        super.viewDidLoad()
        lblNewsTitle.text = delegate?.title
        lblCategory.text = delegate?.categoryName
        
        if delegate?.encoded != nil && delegate?.description != nil {
        let encoded = delegate?.encoded?.html2String
        let description = delegate?.description?.html2String
            lblNewsDescription.text = description! + "\n" + encoded!

        }
        DispatchQueue.global(qos: .userInitiated).async {

            let link = self.delegate?.newsImages[0].original
            if link != nil {
                DispatchQueue.main.async {
                    Nuke.loadImage(with: link, into: self.imgNews)
                }
            }
        }
        
        // Do any additional setup after loading the view.
    }
    

    @IBAction func btnBackAction(_ sender: Any) {
        self.navigationController?.popViewController(animated: true)
    }
    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}
extension Data {
    var html2AttributedString: NSAttributedString? {
        do {
            return try NSAttributedString(data: self, options: [.documentType: NSAttributedString.DocumentType.html, .characterEncoding: String.Encoding.utf8.rawValue], documentAttributes: nil)
        } catch {
            print("error:", error)
            return  nil
        }
    }
    var html2String: String { html2AttributedString?.string ?? "" }
}
extension StringProtocol {
    var html2AttributedString: NSAttributedString? {
        Data(utf8).html2AttributedString
    }
    var html2String: String {
        html2AttributedString?.string ?? ""
    }
}


extension String {
    var htmlToAttributedString: NSAttributedString? {
        guard let data = data(using: .utf8) else { return nil }
        do {
            return try NSAttributedString(data: data, options: [.documentType: NSAttributedString.DocumentType.html, .characterEncoding:String.Encoding.utf8.rawValue], documentAttributes: nil)
        } catch {
            return nil
        }
    }
    var htmlToString: String {
        return htmlToAttributedString?.string ?? ""
    }
}
