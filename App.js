import React from "react";
import { StyleSheet, View } from "react-native";
import Amplify from "aws-amplify";
import awsConfig from "./src/aws-exports";
import Feed from "./components/Feed";

Amplify.configure(awsConfig);

import { withAuthenticator } from "aws-amplify-react-native";

class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Feed />
      </View>
    );
  }
}

export default withAuthenticator(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 25,
    backgroundColor: "#ecf0f1"
  }
});
