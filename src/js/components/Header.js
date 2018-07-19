import React from "react";

import Title from "./Header/Title";

export default class Header extends React.Component {
  handleChange(e) {
    const title = e.target.value;
    this.props.changeTitle(title);
  }

  render() {
    return (
      <header class="header-wrapper">
        <div class="container">
            <div class="header-logo"></div>
            <div class="header-title" dangerouslySetInnerHTML={{__html: this.props.title}}></div>
            <div class="header-icon">
              {/* <button class="help-button open-modal" modalType="video" data-toggle="modal1" data-target="#videoModal1" ng-click="openModal()"
                aria-label="help"></button>
              <button class="cross-button" aria-label="cross" ng-click="closeWindow()"></button> */}
            </div>
        </div>
        <div class="clearfix"></div>
      </header>
        );
      }
}