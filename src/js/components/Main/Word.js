import React from "react";

import Letter from "./Letter";

export default class Word extends React.Component {
  handleChange(e) {
    const title = e.target.value;
    this.props.changeTitle(title);
  }
  populateWords(){}

  render() {
    return (
      <span></span>
    );
  }
}