import React from "react";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";
import Feed from "../components/Feed";

export default class FeedScreen extends React.PureComponent {
  constructor(props) {
    super(props);
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
