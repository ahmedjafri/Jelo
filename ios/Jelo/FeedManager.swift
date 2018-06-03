//
//  FeedManager.swift
//  Jelo
//
//  Created by Ahmed Jafri on 5/31/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

import Foundation

@objc(FeedManager)
class FeedManager: RCTViewManager {
  override func view() -> UIView! {
    let v = FeedView.init()
    if v.feedUrl != "" {
      v.backgroundColor = UIColor.green
    }
    return v
  }
}

class FeedView: UITableView {
  var feedUrl: String = ""
  
  override func didMoveToSuperview() {
    super.didMoveToSuperview()
    
    self.dataSource = self
  }
}

extension FeedView: UITableViewDataSource {
  func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    let cell = UITableViewCell.init(style: UITableViewCellStyle.default, reuseIdentifier: "reuse")
    cell.textLabel?.text = "test"
    return cell
  }
  
  func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
    return 10
  }
  
  func numberOfSections(in tableView: UITableView) -> Int {
    return 1
  }
}
