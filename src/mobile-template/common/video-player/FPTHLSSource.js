import React, { Component } from 'react';
import Hls from 'hls.js';

export default class HLSSource extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
        hls: new Hls(),
        url: ''
    }
  }

  componentDidMount() {
    // `src` is the property get from this component
    // `video` is the property insert from `Video` component
    // `video` is the html5 video element
    const { src, video } = this.props;
    // load hls video source base on hls.js
    if (Hls.isSupported()) {
      this.state.hls.loadSource(src);
      this.state.hls.attachMedia(video);
      this.state.hls.on(Hls.Events.MANIFEST_PARSED, () => {
        // video.play();
      });
    }
  }

  static getDerivedStateFromProps(props, state) {
    const { src, video } = props;
    // load hls video source base on hls.js
    if (state.url !== src && Hls.isSupported()) {
      state.hls.loadSource(src);
      state.hls.attachMedia(video);
      state.hls.on(Hls.Events.MANIFEST_PARSED, () => {
        // video.play();
      });
      return {...state, url: src };
    }
    return null;
  }

  componentWillUnmount() {
    // destroy hls video source
    if (this.hls) {
      this.hls.destroy();
    }
  }

  render() {
    return (
      <source
        src={this.props.src}
        type={this.props.type || 'application/x-mpegURL'}
      />
    );
  }
}