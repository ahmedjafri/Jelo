import { Platform } from "react-native";
import { Navigation } from "react-native-navigation";
import { registerScreens } from "./screens";

// screen related book keeping
registerScreens();

// this will start our app
Navigation.startSingleScreenApp({
  screen: {
    label: "Feed",
    screen: "index.feedScreen",
    title: "Feed",
    navigatorButtons: {
      rightButtons: [
        {
          title: "Camera",
          id: "camera"
        }
      ]
    }
  },
  animationType: Platform.OS === "ios" ? "slide-down" : "fade"
});
