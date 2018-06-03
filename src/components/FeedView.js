import PropTypes from "prop-types";
import React from "react";
import { requireNativeComponent } from "react-native";

class FeedView extends React.Component {
  render() {
    return <Feed {...this.props} />;
  }
}

FeedView.propTypes = {
  /**
   * A Boolean value that determines whether the user may use pinch
   * gestures to zoom in and out of the map.
   */
  feedUrl: PropTypes.string
};

var Feed = requireNativeComponent("Feed", FeedView);

module.exports = FeedView;
