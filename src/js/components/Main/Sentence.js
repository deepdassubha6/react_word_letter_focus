import React from "react";

import Word from "./Word";

export default class Sentence extends React.Component {
  handleChange(e) {
    const title = e.target.value;
    this.props.changeTitle(title);
  }
  openModal() { }
  closeWindow() { }

  render() {
    return (
      <span></span>
    );
  }
}