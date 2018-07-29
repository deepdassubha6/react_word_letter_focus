import React from "react";

import Letter from "./Letter";
import Styles from "./word.css";

export default class Word extends React.Component {
  constructor(props) {
    super(props);
    this.actualWord = '';
    this.state = {
      className: ''
    };
    this.popualteLettersComponent(this.props.content);
  }
  shouldComponentUpdate(nextProps) {
    this.state.className = '';
    this.popualteLettersComponent(nextProps.content);
    return true;
  }
  /* method to handle keydown on words */
  handleKeyDown(event) {
    if (event.which === 13 || event.which === 32) {
      event.stopPropagation();
      this.wordClicked(event.target);
    }
  }
  /* method to handle word clicked action */
  wordClicked(elemet) {
    const targetWord = elemet.parentElement;
    const toolName = window.operation.toolName.trim();
    if (window.operation.erase) {
      this.setState({ className: '' });
    } else {
      this.addClassOnAction(targetWord);
    }
  }
  /* add class depending on action */
  addClassOnAction(targetWord) {
    const toolName = window.operation.toolName.trim();
    const className = toolName.replace(/\s/g, '');
    if (targetWord.className.indexOf(className) >= 0) {
      return;
    }
    this.state.className === '' ? this.setState({ className: className }) : this.setState({ className: 'bothAction' });
  }
  /* method to populate letter components */
  popualteLettersComponent(words) {
    this.actualWord = words;
    const letters = words.trim().split(/(?!$)/u);
    this.letters = letters.map((letter, index) => {
      return <Letter key={index} content={letter} wordClicked={this.wordClicked.bind(this)} />
    });
  }
  render() {
    return (
      <span data-word tabIndex="0" onKeyDown={this.handleKeyDown.bind(this)} aria-label={this.actualWord} class={`${Styles.words} ${Styles[this.state.className]}`} id={this.state.className}>
        {this.letters}
      </span>
    );
  }
}