import React, { Component } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import FeedCard from "./FeedCard";
import { Viewport } from "@skele/components";

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

  render() {
    if (!this.state.loaded) {
      return <View />;
    }

    return (
      <Viewport.Tracker>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => <FeedCard post={item} />}
          refreshing={true}
          onRefresh={this.fetchFeed}
          keyExtractor={item => item.url}
        />
      </Viewport.Tracker>
    );
  }
}
