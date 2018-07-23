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
    this.state = {
      currentPageNumber: 0,
      currentPageContent: '',
    };
    /* method to call data service */
    this.dataService();
  }

  dataService() {
    const ax = axios.create({ baseURL: 'http://localhost:8080/data' });
    ax.get('data.json').then(response => {
      const data = response.data;
      this.init(data);
    });
  }
  /* method to initialize process execution */
  init(data) {
    this.data = data;
    this.direction = data.directions;
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
    this.setState({ currentPageContent });
  }

  render() {
    return (
      <div class={Styles.mainContainer}>
        <Header title={this.data.title} />
        <Main direction = {this.direction} screenContent={this.state.currentPageContent} />
        <Footer changePage={this.changePageNumber.bind(this)} totalNumOfPages={this.totalNumberOfPages} />
      </div>
    );
  }
}