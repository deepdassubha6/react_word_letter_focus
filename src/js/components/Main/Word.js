import React from "react";

import Letter from "./Letter";
import Styles from "./word.css";

export default class Word extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      className: '',
      reRender: true
    };
    this.popualteLettersComponent(this.props.content);
  }
  shouldComponentUpdate(nextProps) {
    this.popualteLettersComponent(nextProps.content);
    return true;
  }
  /* method to handle word clicked action */
  wordClicked(elemet) {
    const targetLetter = elemet.parentElement;
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
    const className = toolName.replace(/\s/g, '');
    this.setState({ className: className, reRender: false });
  }
  /* method to populate letter components */
  popualteLettersComponent(words) {
    const letters = words.trim().split(/(?!$)/u);
    this.letters = letters.map((letter, index) => {
      return <Letter key={index} content={letter} wordClicked={this.wordClicked.bind(this)} reRender={this.state.reRender} />
    });
  }
  render() {
    return (
      <span class={`${Styles.words} ${Styles[this.state.className]}`}>
        {this.letters}
      </span>
    );
  }
}