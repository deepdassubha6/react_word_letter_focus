import React from "react";
import Style from "./letter.css";

export default class Letter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      className: ''
    }
    this.reRender = true;
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   this.reRender = nextProps.reRender;
  //   if (this.reRender) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
  /* method to handle click operation on letters */
  letterClicked(e) {
    const targetLetter = e.target;
    const toolName = window.toolName.trim();
    if (toolName === 'erase') {
      this.setState({ className: '' });
    } else {
      this.addClassOnAction(targetLetter);
    }
  }
  /* add class depending on action */
  addClassOnAction(targetLetter) {
    const toolName = window.toolName.trim();
    if (toolName.indexOf('word') >= 0) {
      this.props.wordClicked(targetLetter);
    } else {
      const className = toolName.replace(/\s/g, '');
      this.setState({ className });
      // this.setState({ className : `${className} ${this.state.className}` });
    }
  }

  render() {
    return (
      <span class={Style[this.state.className]} onClick={this.letterClicked.bind(this)}>{this.props.content}</span>
    );
  }
}