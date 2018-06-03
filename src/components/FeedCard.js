import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import Video from "react-native-video";
import { Viewport } from "@skele/components";

const ViewportAwareView = Viewport.Aware(View);

export default class FeedCard extends React.PureComponent {
  static propTypes = {
    post: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      post: props.post,
      index: props.index,

      // videoLoading
      isLoaded: false,

      // scroll pause/play
      paused: true,
      topInView: false,
      bottomInView: false
    };

    // TODO: remove this
    // A way to simulate the video loading
    let t = 1000; // im ms
    setTimeout(() => {
      this.setState({
        isLoaded: true
      });
    }, t);
  }

  entered(isTop) {
    this.setViewportState(isTop, true);

    if (this.state.topInView && this.state.bottomInView) {
      this.setState({
        paused: false
      });
    }
  }

  left(isTop) {
    this.setViewportState(isTop, false);

    if (!(this.state.topInView && this.state.bottomInView)) {
      this.setState({
        paused: true
      });
    }
  }

  setViewportState(isTop, inView) {
    if (isTop) {
      this.state.topInView = inView;
    } else {
      this.state.bottomInView = inView;
    }
  }

  render() {
    if (this.state.isLoaded) {
      return (
        <View>
          <ViewportAwareView // top detector
            onViewportEnter={() => this.entered(true)}
            onViewportLeave={() => this.left(true)}
          />

          <View style={styles.info}>
            <Text style={styles.infoText}>{this.state.index}</Text>
            <Text style={styles.infoText}>
              {this.state.post.likes +
                (this.state.post.likes !== 1 ? " likes" : " like")}
            </Text>
          </View>
          <Video // See https://github.com/react-native-community/react-native-video for all settings
            source={{ uri: this.state.post.url }} // Can be a URL or a local file.
            ref={ref => {
              this.player = ref;
            }} // Store reference
            rate={1.0} // 0 is paused, 1 is normal.
            volume={1.0} // 0 is muted, 1 is normal.
            muted={false} // Mutes the audio entirely.
            paused={this.state.paused} // Pauses playback entirely.
            resizeMode="cover" // Fill the whole screen at aspect ratio.*
            repeat={true} // Repeat forever.
            playInBackground={false} // Audio continues to play when app entering background.
            playWhenInactive={false} // [iOS] Video continues to play when control or notification center are shown.
            ignoreSilentSwitch={"ignore"} // [iOS] ignore | obey - When 'ignore', audio will still play with the iOS hard silent switch set to silent. When 'obey', audio will toggle with the switch. When not specified, will inherit audio settings as usual.
            progressUpdateInterval={250.0} // [iOS] Interval to fire onProgress (default to ~250ms)
            style={styles.image}
          />
          <ViewportAwareView // bottom detector
            onViewportEnter={() => this.entered(false)}
            onViewportLeave={() => this.left(false)}
          />
        </View>
      );
    } else {
      return (
        <View>
          <ViewportAwareView // top detector
            onViewportEnter={() => this.entered(true)}
            onViewportLeave={() => this.left(true)}
          />

          <View style={styles.info}>
            <Text style={styles.infoText}>{this.state.index}</Text>
            <Text style={styles.infoText}>
              {this.state.post.likes +
                (this.state.post.likes !== 1 ? " likes" : " like")}
            </Text>
          </View>
          <Image
            style={styles.image}
            source={{ uri: this.state.post.rendition }}
          />
          <ViewportAwareView // bottom detector
            onViewportEnter={() => this.entered(false)}
            onViewportLeave={() => this.left(false)}
          />
        </View>
      );
    }
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
