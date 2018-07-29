import React from "react";

import Word from "./Word";
import Styles from "./sentence.css";

export default class Sentence extends React.Component {
  constructor(props) {
    super(props);
    this.popualteWordsComponent(this.props.content);
  }
  shouldComponentUpdate(nextProps) {
    this.popualteWordsComponent(nextProps.content);
    return true;
  }
  componentWillReceiveProps(nextProps) {
  }
  popualteWordsComponent(sentece) {
    const words = sentece.split(' ');
    this.words = words.map((word, index) => {
      return <Word key={index} content={word} />
    });
  }
  render() {
    return (
      <span class={Styles.sentenceWrapper} >
        <span class={Styles.sentence} id='sentence'>
          {this.words}
        </span>
        <br />
      </span>
    );
  }
}