import React from "react";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

import Styles from "./layout.css";

import axios from 'axios';

export default class Layout extends React.Component {
  constructor() {
    super();
    this.totalNumberOfPages = 0;
    this.data = {};
    this.direction = {};
    this.helpData = {};
    this.state = {
      currentPageNumber: 0,
      currentPageContent: ''
    };
    /* method to call data service */
    this.dataService();
  }

  dataService() {
    const ax = axios.create({ baseURL: this.resolveHostName() });
    ax.get('data.json').then(response => {
      const data = response.data;
      this.init(data);
    });
  }
  /* resolve host name dynamically */
  resolveHostName() {
    const protocol = location.protocol;
    const slashes = `${protocol}//`;
    const host = `${slashes}${window.location.hostname}`;
    const port = (location.port ? `:${location.port}` : '');
    const baseURL = `${host}${port}/data`;
    return baseURL;
  }
  /* method to initialize process execution */
  init(data) {
    this.data = data;
    this.direction = data.directions;
    this.helpData = data.help;
    this.allScreenData = data.screens;
    this.totalNumberOfPages = this.allScreenData.length;
    this.setCurrentPageContent();
  }
  /* method to keep track of page number */
  changePageNumber(pageNumber) {
    this.state.currentPageNumber = pageNumber;
    this.setCurrentPageContent();
  }
  /* set content for current page  */
  setCurrentPageContent() {
    const currentPageContent = this.allScreenData[this.state.currentPageNumber];
    window.operation = { toolName: 'word Highlight', erase: false };
    this.addRemoveTabIndex(document.querySelectorAll('[data-word]'), 0);
    this.addRemoveTabIndex(document.querySelectorAll('[data-letter]'), -1);
    this.setState({ currentPageContent });
  }
  addRemoveTabIndex(elements, indexValue) {
    for (let i = 0; i < elements.length; i++) {
      elements[i].setAttribute("tabIndex", indexValue);
    }
  }
  render() {
    return (
      <div class={Styles.mainContainer}>
        <Header title={this.data.title} instructionData={this.helpData.text} />
        <Main direction={this.direction} screenContent={this.state.currentPageContent} pageNumber={this.state.currentPageNumber} />
        <Footer changePage={this.changePageNumber.bind(this)} totalNumOfPages={this.totalNumberOfPages} />
      </div>
    );
  }
}