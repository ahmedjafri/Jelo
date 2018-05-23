import { AppRegistry } from "react-native";
import React from "react";
import { NavigatorIOS, StyleSheet, View } from "react-native";
import Amplify from "aws-amplify";
import awsConfig from "./src/aws-exports";
import Feed from "./components/Feed";
import { withAuthenticator } from "aws-amplify-react-native";
import PropTypes from "prop-types";

class App extends React.Component {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: FeedPage,
          title: "Feed"
        }}
        style={{ flex: 1 }}
      />
    );
  }
}

class FeedPage extends React.Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired
  };

  _onForward = () => {
    this.props.navigator.push({
      title: "Scene " + nextIndex
    });
  };

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
    flex: 1,
    alignItems: "center",
    paddingTop: 25,
    backgroundColor: "#ecf0f1"
  }
});

Amplify.configure(awsConfig);
AppRegistry.registerComponent("Jelo", () => withAuthenticator(App));
