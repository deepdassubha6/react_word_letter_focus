import React from "react";

import Header from "./Header";
import MainBody from "./MainBody";
import Footer from "./Footer";

import axios from 'axios';

export default class Layout extends React.Component {
  constructor() {
    super();
    this.totalNumberOfPages = 0;
    this.data = {};
    this.state = {
      currentPageNumber: 0,
      currentPageContent: ''
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
      <div class="main-container fill">
        <Header title={this.data.title} />
        <MainBody screenContent={this.state.currentPageContent} />
        <Footer changePage={this.changePageNumber.bind(this)} totalNumOfPages={this.totalNumberOfPages} />
      </div>
    );
  }
}