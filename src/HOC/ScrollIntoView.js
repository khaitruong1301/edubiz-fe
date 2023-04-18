import React from "react";
import PropTypes from "prop-types";

import scrollIntoViewIfNeeded from "scroll-into-view-if-needed";

/*
SCROLL INTO VIEW

Purpose:
  This modular component enables hash links
  eg. (www.xyz.com/somepage#someID)
  and plays nice with react router 4

Usage:
  Wrap this component around a single div with an ID

Example:
  <ScrollIntoView  id={this.props.location.hash}>
    <div id="someID">
      ... loads of content...
    </div>
  </ScrollIntoView>

  <a href="/somepage#someID"> IN-PAGE ANCHOR </a>

 */

className ScrollIntoView extends React.Component {
  componentDidMount() {
    this.scroll();
  }

  componentDidUpdate() {
    this.scroll();
  }

  scroll() {
    const { id } = this.props;
    //console.log('ID is: '+id);
    if (!id) {
      return;
    }
    const element = document.querySelector(id);
    if (element) {
      // this just jumps to the element
      // see support:
      //element.scrollIntoView({block: "end", behavior: "smooth"});

      //If Firefox...
      if (navigator.userAgent.indexOf("Firefox") > 0) {
        //...use native smooth scrolling.
        element.scrollIntoView({ block: "end", behavior: "smooth" });
        // If its any other browser, use custom polyfill...
      } else {
        //... luckily I have this handy polyfill...
        scrollIntoViewIfNeeded(element, false, {
          duration: 150,
        });
        //  (⌐■_■
      }
    }
  }

  render() {
    return this.props.children;
  }
}
ScrollIntoView.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.array.isRequired,
    PropTypes.object.isRequired,
  ]),
};
export default ScrollIntoView;
