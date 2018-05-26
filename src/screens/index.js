import { Navigation } from "react-native-navigation";

import FeedScreen from "./FeedScreen";
import CameraScreen from "./CameraScreen";

export function registerScreens() {
  Navigation.registerComponent("index.feedScreen", () => FeedScreen);
  Navigation.registerComponent("index.cameraScreen", () => CameraScreen);
}
