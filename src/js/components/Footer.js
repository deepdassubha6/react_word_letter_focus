import React from "react";
import styles from './footer.css';


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
        <div class={styles.paginationdots} key={index}></div>
      );
    });
  }
  /* mwthod to handle previous page click actions */
  prevPageClik() {
    this.currentPageNumber--;
    this.props.changePage(this.currentPageNumber);
  }
  /* mwthod to handle next page click actions */
  nextPageClik() {
    this.currentPageNumber++;
    this.props.changePage(this.currentPageNumber);
  }
  render() {
    return (
      <footer class={styles.footerwrapper}>
        <div class={styles.btmbg} style={{ backgroundImage: `url(./images/background/btm-bg.png)` }}></div>
        <div class={styles.container}>
          <div class={styles.pagination}>
            <button href="#" class={styles.arrow} onClick={this.prevPageClik.bind(this)} aria-label="previous">PREV</button>
            <div class='pagination-wrpper'>{this.paginationDots}</div>
            <button href="#" class={styles.arrownext} onClick={this.nextPageClik.bind(this)} aria-label="next">NEXT</button>
          </div>
          <div class="clearfix"></div>
        </div>
      </footer>
    );
  }
}
