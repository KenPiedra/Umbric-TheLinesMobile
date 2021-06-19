//
//  ViewController.swift
//  SportsApp
//
//  Created by Sanjeev on 20/05/21.
//

import UIKit
import ExcelCollectionViewLayout

enum TypeDropDown: Int {
    case spread
    case moneyLine
    case overUnder
}

class Odds: UIViewController {
    
    //MARK:- Outlets
    @IBOutlet weak var tfType: UITextField!
    @IBOutlet weak var tfState: UITextField!
    @IBOutlet weak var sportsCollectionView: UICollectionView!
    @IBOutlet weak var sheetCollectionView: UICollectionView!
    
    //MARK:- Let/Var
    let sportsArr = AllSports.sportsList
    
    let typeArr = ["Spread", "Money Line", "Over/Under"]
    var arrSelectedSports: [Int] = [1, 0, 0, 0 ,0 ,0 ,0, 0]
    fileprivate let pickerView = ToolbarPickerView()
    
    var sportsData: [SportsData] = []
    var noOfItemsForSections: [[PregameOdd]] = []
    var currentType: TypeDropDown = .spread
 
    //MARK:- View life cycle
    override func viewDidLoad() {
        super.viewDidLoad()
        
        /// First Do UI updates here
        configUI()
        setDelegates()
        /// MLB is default
        getData(withSport: .MLB)
    }
    
    //MARK:- Methods
    func configUI() {
        
        if let collectionLayout = sheetCollectionView.collectionViewLayout as? ExcelCollectionViewLayout {
            collectionLayout.delegate = self
        }
        
        /// Remove cursur
        tfType.tintColor = .clear
        
        view.backgroundColor = .black
        sportsCollectionView.backgroundColor = .black
        
        /// TF colors
        tfType.textColor = .gray
        tfState.textColor = .gray
        
        /// Default
        tfType.text = "Spread"
        tfState.text = "NJ"
        
        /// Add picker
        tfType.inputView = pickerView
        self.tfType.inputAccessoryView = self.pickerView.toolbar
        self.pickerView.toolbarDelegate = self
        self.pickerView.reloadAllComponents()
        
        #warning("Remove later for second story")
        tfState.isUserInteractionEnabled = false
    }
    
    func getData(withSport: AllSports) {
        ///Call Data API
        LoaderView.shared.show()
        let url = API.baseUrl + withSport.rawValue.lowercased() + API.odds
        Webservices.instance.getMethod(url: url) { [self] (isSuccess, response: [SportsData]) in
            //programArr = response[0].pregameOdds
            LoaderView.shared.hide()
            sportsData.removeAll()
            if response.count == 0 {
                CommonMethod.showAlert("No Data Found!")
            }
            sportsData = response
            updateData()
        }
    }
    
    func updateData() {
        sportsData.forEach { sportsDataa in
            //print(sportsData)
            noOfItemsForSections.append(sportsDataa.pregameOdds)
        }
        
        /// Reload collection view
        DispatchQueue.main.async { [self] in
            sheetCollectionView.reloadData()
        }
    }
    
    func setDelegates() {
        sportsCollectionView.delegate = self
        sportsCollectionView.dataSource = self
        
        sheetCollectionView.delegate = self
        sheetCollectionView.dataSource = self
        
        self.pickerView.dataSource = self
        self.pickerView.delegate = self
    }
    
}

//MARK:- Collection Delegate
extension Odds: UICollectionViewDelegate {
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        if collectionView == sportsCollectionView {
            /// For updating UI
            arrSelectedSports = [0, 0, 0, 0 ,0 ,0 ,0, 0]
            arrSelectedSports[indexPath.item] = 1
            /// For updating Sheet collection view
            getData(withSport: AllSports(rawValue: sportsArr[indexPath.item])!)
            DispatchQueue.main.async { [self] in
                sportsCollectionView.reloadData()
            }
        }
    }
}

//MARK:- Collection Data Source
extension Odds: UICollectionViewDataSource {
    
    func numberOfSections(in collectionView: UICollectionView) -> Int {
        if collectionView == sheetCollectionView {
            /// Rows for excel sheet
            if sportsData.count != 0 {
            return sportsData.count
            }
            return 0
        }
        return 1
    }
    
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
    
        if collectionView == sheetCollectionView {
            /// Columns for excel sheet
            if sportsData.count != 0 {
            return noOfItemsForSections[section].count
            }
            return 0
        }
        return sportsArr.count
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        if collectionView == sheetCollectionView { /// Excel sheet collection view
            if indexPath.section == 0 && indexPath.row == 0 { /// Frist one cell is empty
                let emptyCell = collectionView.dequeueReusableCell(withReuseIdentifier: Cells.emptyCell, for: indexPath) as! EmptyCell
                return emptyCell
            } else if indexPath.section == 0 { /// Top most cells
                /// Has sports company logo image and price
                let topCompanyCell = collectionView.dequeueReusableCell(withReuseIdentifier: Cells.CompanyCell, for: indexPath) as! CompanyCell
                topCompanyCell.configCell(data: noOfItemsForSections[indexPath.section][indexPath.row])
                return topCompanyCell
            } else if indexPath.row == 0 { /// Left most cells
                /// Has away and home team name
                let leftDatacell = collectionView.dequeueReusableCell(withReuseIdentifier: Cells.LeftDataCell, for: indexPath) as! LeftDatacell
                leftDatacell.configCell(data: sportsData[indexPath.section])
                return leftDatacell
            } else { /// Middle main data of cells
                let middleDataCell = collectionView.dequeueReusableCell(withReuseIdentifier: Cells.MiddleDataCell, for: indexPath) as! MiddleDataCell
                middleDataCell.configCell(data: noOfItemsForSections[indexPath.section][indexPath.row], currentType: currentType)
                return middleDataCell
            }
        } else { /// Top collection view contatins sports
            let cell = collectionView.dequeueReusableCell(withReuseIdentifier: Cells.sportsCell, for: indexPath) as! SportsCell
            cell.lblTitle.text = sportsArr[indexPath.item]
            cell.lblUnderline.isHidden = (arrSelectedSports[indexPath.item] == 0)
            return cell
        }
    }
    
}

//MARK:- Collection Flow layout
extension Odds: UICollectionViewDelegateFlowLayout {
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        let label = UILabel(frame: CGRect.zero)
        label.text = sportsArr[indexPath.item]
        label.sizeToFit()
        return CGSize(width: label.frame.width + 30, height: 55)
    }
}

extension Odds: ExcelCollectionViewLayoutDelegate {
    func collectionViewLayout(_ collectionViewLayout: ExcelCollectionViewLayout, sizeForItemAtColumn columnIndex: Int) -> CGSize {
        #warning("Need to decrease the height of company cell, left cell and increase the height of middle cell")
        //        if columnIndex.section == 0 {
        //            /// Has sports company logo image and price
        //
        //        }
        
       // print("ColumnIndex =====>",columnIndex)
        return CGSize(width: 100, height: 100)
    }
}

//MARK:- Picker Delegate
extension Odds: UIPickerViewDelegate {
    func pickerView(_ pickerView: UIPickerView, didSelectRow row: Int, inComponent component: Int) {
        tfType.text = typeArr[row]
    }
    
    func pickerView(_ pickerView: UIPickerView, titleForRow row: Int, forComponent component: Int) -> String? {
        return typeArr[row]
    }
}

//MARK:- Picker Data Source
extension Odds: UIPickerViewDataSource {
    func numberOfComponents(in pickerView: UIPickerView) -> Int { 1 }
    
    func pickerView(_ pickerView: UIPickerView, numberOfRowsInComponent component: Int) -> Int { typeArr.count
    }
}

extension Odds: ToolbarPickerViewDelegate {
    func didTapDone() {
        let row = self.pickerView.selectedRow(inComponent: 0)
        currentType = TypeDropDown(rawValue: row)!
        self.pickerView.selectRow(row, inComponent: 0, animated: false)
        self.tfType.text = self.typeArr[row]
        self.tfType.resignFirstResponder()
        sheetCollectionView.reloadData()
    }

    func didTapCancel() {
        self.tfType.resignFirstResponder()
    }
}
