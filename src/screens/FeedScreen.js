import React from "react";
import PropTypes from "prop-types";
import { View, StyleSheet, requireNativeComponent } from "react-native";
//import Feed from "../components/Feed";
import FeedView from "../components/FeedView.js";

export default class FeedScreen extends React.PureComponent {
  static navigatorStyle = {
    navBarHideOnScroll: true // make the nav bar hidden only after the user starts to scroll
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  async fetchFeed() {
    let response = await fetch(
      "http://develop.t89dqruqnm.us-east-1.elasticbeanstalk.com/api/v1/feed"
    );
    let posts = await response.json();
    this.feedRef.updateNative(posts);
  }

  componentDidMount() {
    this.fetchFeed();
  }

  onNavigatorEvent(event) {
    if (event.type == "NavBarButtonPress") {
      // this is the event type for button presses
      if (event.id == "camera") {
        this.presentCameraView();
      }
    }
  }

  presentCameraView() {
    this.props.navigator.showModal({
      title: "Camera",
      screen: "index.cameraScreen"
    });
  }

  dataRequested = e => {
    console.log(e.nativeEvent.numItemsRequested);
    this.fetchFeed();
  };

  render() {
    return (
      <View style={styles.container}>
        <FeedView
          style={{ flex: 1 }}
          posts={[]}
          onDataRequested={this.dataRequested}
          ref={e => (this.feedRef = e)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch"
  }
});
