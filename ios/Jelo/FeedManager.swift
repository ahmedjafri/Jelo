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
    if v.posts.count == 0 {
      v.backgroundColor = UIColor.red
    }
    return v
  }
  
  func updateFromManager(_ node: NSNumber, posts: NSArray) { // 1
    DispatchQueue.main.async {                                // 2
      let component = self.bridge.uiManager.view(             // 3
        forReactTag: node                                     // 4
        ) as! FeedView                                       // 5
      component.updatePosts(posts)                          // 6
    }
  }
}

class FeedView: UITableView {
  var posts: NSArray = []
  var onDataRequested: RCTDirectEventBlock?
  private var reachedEnd: Bool = false

  override func didMoveToSuperview() {
    super.didMoveToSuperview()
    
    self.dataSource = self
    self.delegate = self
    self.prefetchDataSource = self
    
    onDataRequested(numItemsRequested: 10)
  }
  
  func onDataRequested(numItemsRequested: Int) {
      if onDataRequested != nil {
        onDataRequested!(["numItemsRequested": numItemsRequested])
      }
    }
  
  
  func updatePosts(_ posts: NSArray) {
    if posts.count == 0 {
      reachedEnd = true
      return
    }
    
    self.posts = self.posts.addingObjects(from: posts as! [Any]) as NSArray
    self.reloadData()
  }
}

extension FeedView: UITableViewDataSource, UITableViewDelegate, UITableViewDataSourcePrefetching {
  func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    var cell = tableView.dequeueReusableCell(withIdentifier: "FeedManagerTableViewCell")
    if cell == nil {
      cell = UITableViewCell.init(style: UITableViewCellStyle.default, reuseIdentifier: "FeedManagerTableViewCell")
    }
    var post = posts[indexPath.row] as! Dictionary<String, AnyObject>
    cell!.textLabel?.text = (post["url"] as! String)
    return cell!
  }
  
  func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
    return posts.count
  }
  
  func numberOfSections(in tableView: UITableView) -> Int {
    return 1
  }
  
  func tableView(_ tableView: UITableView, willDisplay cell: UITableViewCell, forRowAt indexPath: IndexPath) {

  }
  
  func tableView(_ tableView: UITableView, prefetchRowsAt indexPaths: [IndexPath]) {
    // correctly retrieve the indexPaths
    var loadNext = false
    for indexPath in indexPaths {
      if(posts.count < indexPath.row ) {
        loadNext = true
        break
      }
    }
    
    if loadNext {
      onDataRequested(numItemsRequested: 10)
    }

  }
}
