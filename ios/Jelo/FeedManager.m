//
//  FeedManager.m
//  Jelo
//
//  Created by Ahmed Jafri on 5/31/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import <React/RCTViewManager.h>
#import <React/RCTBridgeModule.h>


@interface RCT_EXTERN_MODULE(FeedManager, RCTViewManager)
RCT_EXPORT_VIEW_PROPERTY(posts, NSArray)
RCT_EXPORT_VIEW_PROPERTY(onDataRequested, RCTDirectEventBlock)


RCT_EXTERN_METHOD(
                  updateFromManager:(nonnull NSNumber *)node
                  posts:(nonnull NSArray *)posts
                  )
@end
