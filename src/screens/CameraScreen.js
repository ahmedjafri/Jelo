import React from "react";
import { View } from "react-native";

export default class CameraScreen extends React.PureComponent {
  static navigatorStyle = {
    navBarHidden: false // make the nav bar hidden
  };

  static navigatorButtons = {
    rightButtons: [
      {
        id: "close",
        title: "Close"
      }
    ]
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.type == "NavBarButtonPress") {
      // this is the event type for button presses
      if (event.id == "close") {
        this.dismissCameraView();
      }
    }
  }

  dismissCameraView() {
    this.props.navigator.dismissModal({
      animationType: "slide-down" // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
    });
  }

  render() {
    return <View />;
  }
}
