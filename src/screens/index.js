import { Navigation } from "react-native-navigation";

import FeedScreen from "./FeedScreen";

export function registerScreens() {
  Navigation.registerComponent("index.feedScreen", () => FeedScreen);
}
