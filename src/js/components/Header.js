import React from "react";

import Title from "./Header/Title";
import styles from "./header.css";

export default class Header extends React.Component {
  handleChange(e) {
    const title = e.target.value;
    this.props.changeTitle(title);
  }
  openModal() { }
  closeWindow() { }

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
            <button class={styles.crossButton} style={{ backgroundImage: `url(./images/icons/cross.png)` }} aria-label="cross" onClick={this.closeWindow.bind(this)}></button>
          </div>
        </div>
        <div class="clearfix"></div>
      </header>
    );
  }
}