import React from "react";
import styles from "./header.css";
import Instruction from "./Header/Instruction"
export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayModal: 'none'
    };
  }
  openModal() {
    this.setState({ displayModal: 'block' });
  }
  cloeModal() {
    this.setState({ displayModal: 'none' });
  }
  closeWindow() {
    window.close();
  }

  render() {
    return (
      <header class={styles.headerClass} style={{ backgroundImage: `url(./images/background/header-bg.jpg)` }}>
        <div class="container">
          <div class={styles.headerlogo}>
            <img class={styles.headerlogoimg} src={"./images/icons/logo.png"} alt="avatar image" />
          </div>
          <h1 class={styles.headerTitle} dangerouslySetInnerHTML={{ __html: this.props.title }}></h1>
          <div class={styles.headerIcon}>
            <button class={styles.helpButton} style={{ backgroundImage: `url(./images/icons/help_btn.png)` }} aria-label="cross" onClick={this.openModal.bind(this)}></button>
            <Instruction modalData={this.props.instructionData} displayStatus={this.state.displayModal} cloeModalAction={this.cloeModal.bind(this)} />
            <button class={styles.crossButton} style={{ backgroundImage: `url(./images/icons/cross.png)` }} aria-label="cross" onClick={this.closeWindow.bind(this)}></button>
          </div>
        </div>
        <div class="clearfix"></div>
      </header>
    );
  }
}