import PropTypes from "prop-types";
import React from "react";
import {
  requireNativeComponent,
  UIManager,
  findNodeHandle
} from "react-native";

var Feed = requireNativeComponent("Feed", FeedView);

class FeedView extends React.Component {
  state = {
    posts: []
  };

  static propTypes = {
    /**
     * A Boolean value that determines whether the user may use pinch
     * gestures to zoom in and out of the map.
     */
    posts: PropTypes.array,
    onDataRequested: PropTypes.func
  };

  updatePosts(posts) {
    this.setState({
      posts: posts
    });
  }

  updateNative = posts => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this.feedRef), // 1
      UIManager["Feed"].Commands.updateFromManager, // 2
      [posts] // 3
    );
  };

  render() {
    return <Feed {...this.props} ref={e => (this.feedRef = e)} />;
  }
}

module.exports = FeedView;
