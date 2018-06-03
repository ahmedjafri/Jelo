import React, { Component } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import FeedCard from "./FeedCard";
import { Viewport } from "@skele/components";

export default class Feed extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      posts: [],
      comments: [],
      refreshing: true
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
      posts: addIndicesToPosts(posts),
      // comments: comments,
      loaded: true,
      refreshing: false
    });
  }

  fetchMore() {
    if (this.state.posts.length == 0) {
      return;
    }

    console.log("fetchMore called. Size of posts: " + this.state.posts.length);

    let response = fetch(
      "http://develop.t89dqruqnm.us-east-1.elasticbeanstalk.com/api/v1/feed"
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          posts: addIndicesToPosts(this.state.posts.concat(responseJson)),
          // comments: comments,
          loaded: true,
          refreshing: false
        });
      })
      .catch(error => {
        console.error(error);
        alert(error.message);
      });
  }

  render() {
    if (!this.state.loaded) {
      return <View />;
    }

    return (
      <Viewport.Tracker>
        <FlatList
          data={this.state.posts}
          renderItem={({ item, index }) => (
            <FeedCard post={item} index={index} />
          )}
          refreshing={this.state.refreshing}
          onRefresh={this.fetchFeed}
          keyExtractor={item => item.id}
          style={{ paddingBottom: 16 }}
          initialNumToRender={3}
          onEndReached={this.fetchMore.bind(this)}
          onEndThreshold={0}
          scrollEventThrottle={16}
          removeClippedSubviews={true}
        />
      </Viewport.Tracker>
    );
  }
}

// placeholder code to make each item unique
function addIndicesToPosts(posts) {
  var i = 0;
  posts.forEach(function(post) {
    post.id = "" + i++;
  });

  return posts;
}
