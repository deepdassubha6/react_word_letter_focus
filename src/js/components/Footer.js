import React from "react";
// import styles from './../../styles/style.css';
import styles from './Footer.css';
// import './Footer.css';


export default class Footer extends React.Component {
  constructor() {
    super();
    this.currentPageNumber = 0;
    this.totalPageCount = 0;
    this.paginationDots = '';
  }
  shouldComponentUpdate(nextProps) {
    if (nextProps.totalNumOfPages !== this.totalPageCount) {
      this.totalPageCount = nextProps.totalNumOfPages;
      this.createPagination(this.totalPageCount);
      /* will return true for first time load only */
      return true;
    }
    /* will return false on every other load */
    return false;
  }
  /* method to create dummy array */
  populateArray(length) {
    let dummyArr = [];
    for (let i = 0; i < length; i++) {
      dummyArr[i] = 'dummy';
    }
    return dummyArr;
  }
  /* method to create pagination dots */
  createPagination(totalPageCount) {
    let totalNumberOfpageArray = this.populateArray(totalPageCount);
    this.paginationDots = totalNumberOfpageArray.map(function (item, index) {
      return (
        <div class='active' key={index}></div>
      );
    });
  }
  prevPageClik() {
    this.currentPageNumber--;
    this.props.changePage(this.currentPageNumber);
  }
  nextPageClik() {
    this.currentPageNumber++;
    this.props.changePage(this.currentPageNumber);
  }
  render() {
    return (
      <footer class="footer-wrapper">
        <div class="btm-bg"></div>
        <div class="container">
          <div class="pagination">
            <button href="#" class = {styles.arrow} onClick={this.prevPageClik.bind(this)} aria-label="previous">&nbsp;</button>
            <div class='pagination-wrpper'>{this.paginationDots}</div>
            <button href="#" class="arrow-next" onClick={this.nextPageClik.bind(this)} aria-label="next">&nbsp;</button>
          </div>
          <div class="clearfix"></div>
        </div>
      </footer>
    );
  }
}
