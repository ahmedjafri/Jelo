import React from "react";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";
import Feed from "../components/Feed";

export default class FeedScreen extends React.PureComponent {
  static navigatorStyle = {
    navBarHideOnScroll: true // make the nav bar hidden only after the user starts to scroll
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
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

  render() {
    return (
      <View style={styles.container}>
        <Feed />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#ecf0f1"
  }
});
