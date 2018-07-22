import React from "react";

export default class Letter extends React.Component {
  handleChange(e) {
    const title = e.target.value;
    this.props.changeTitle(title);
  }
  populateLetter(){}

  render() {
    return (
      <span></span>
    );
  }
}