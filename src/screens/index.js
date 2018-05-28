import { Navigation } from "react-native-navigation";

import FeedScreen from "./FeedScreen";
import CameraScreen from "./CameraScreen";

import Amplify from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react-native";
import awsConfig from "../aws-exports";

export function registerScreens() {
  Navigation.registerComponent("index.feedScreen", () => FeedScreen);
  Navigation.registerComponent("index.cameraScreen", () => CameraScreen);

  Amplify.configure(awsConfig);
  Navigation.registerComponent("index.feedScreen", () =>
    withAuthenticator(FeedScreen)
  );
}
