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
  shouldComponentUpdate(nextProps) {
    this.state.className = '';
    return true;
  }
  /* method to handle keydown on words */
  handleKeyDown(event) {
    if (event.which === 13 || event.which === 32) {
      event.stopPropagation();
      this.letterClicked(event);
    }
  }
  /* method to handle click operation on letters */
  letterClicked(e) {
    const targetLetter = e.target;
    const toolName = window.operation.toolName.trim();
    if (toolName.indexOf('word') === -1 && window.operation.erase) {
      this.state.className !== '' ? this.setState({ className: '' }) : this.props.wordClicked(targetLetter);
    } else {
      this.addClassOnAction(targetLetter);
    }
  }
  /* add class depending on action */
  addClassOnAction(targetLetter) {
    const toolName = window.operation.toolName.trim();
    if (toolName.indexOf('word') >= 0) {
      this.props.wordClicked(targetLetter);
    } else {
      const className = toolName.replace(/\s/g, '');
      if (targetLetter.className.indexOf(className) >= 0) {
        return;
      }
      this.state.className === '' ? this.setState({ className }) : this.setState({ className: 'bothAction' });
    }
  }

  render() {
    return (
      <span data-letter tabIndex="-1" aria-hidden="true" class={`${Style.active} ${Style[this.state.className]}`} onKeyDown={this.handleKeyDown.bind(this)} onClick={this.letterClicked.bind(this)} id={this.state.className}>{this.props.content}</span>
    );
  }
}