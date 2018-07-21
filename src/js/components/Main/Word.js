import React from "react";

export default class Word extends React.Component {
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