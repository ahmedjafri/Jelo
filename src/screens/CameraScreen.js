import React from "react";
import { View } from "react-native";

export default class CameraScreen extends React.PureComponent {
  static navigatorStyle = {
    navBarHidden: true // make the nav bar hidden
  };

  static navigatorButtons = {
    rightButtons: [
      {
        id: "close",
        title: "Close"
      }
    ]
  };

  render() {
    return <View />;
  }
}
