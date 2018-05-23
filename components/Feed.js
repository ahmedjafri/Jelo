import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  FlatList
} from "react-native";
export default class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      data: null,
      comments: []
    };
  }

  componentDidMount() {
    this.fetchFeed();
  }

  async fetchFeed() {
    let response = await fetch(
      "http://develop.t89dqruqnm.us-east-1.elasticbeanstalk.com/api/v1/feed"
    );
    let posts = await response.json();
    // let comments = await this.makeCommentsList(posts.data);
    this.setState({
      data: posts,
      // comments: comments,
      loaded: true
    });
  }

  createPost(postInfo, index) {
    let imageUri = postInfo.url;
    let username = postInfo.url;
    let numLikes = postInfo.likes;
    return (
      <View>
        <Image style={styles.image} source={{ uri: imageUri }} />
        <View style={styles.info}>
          <Text style={styles.infoText}>{username}</Text>
          <Text style={styles.infoText}>
            {numLikes + (numLikes !== 1 ? " likes" : " like")}
          </Text>
        </View>
        <View>{this.state.comments[index]}</View>
      </View>
    );
  }

  render() {
    if (!this.state.loaded) {
      return <View />;
    }

    return (
      <FlatList
        data={this.state.data}
        renderItem={({ item, index }) => this.createPost(item, index)}
        keyExtractor={item => item.url}
      />
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderBottomWidth: 1,
    borderColor: "#d8d8d8"
  },
  infoText: {
    fontSize: 16,
    fontWeight: "bold"
  }
});
