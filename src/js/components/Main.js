import React from "react";

import Header from "./Main/Sentence";
import MainBody from "./Main/Word";
import Tool from "./Main/Tool";

import Styles from "./main.css";

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.direction = '';
    }
    shouldComponentUpdate(nextProps) {
        this.init(nextProps.screenContent);
        this.populateDirection(nextProps.direction);
        return true;
    }
    /* first method to get call */
    init(data) {
        const currentPagedata = data;
    }
    /* method to populate direction */
    populateDirection(direction) {
        this.direction = direction.text;
    }
    /* populate corrct answers */
    populateCorrectAnswers() {

    }
    /* popuplate sentence component */
    populateSentence() {
        // send each sentence item
    }
    /* check correct answers */
    checkCorrectAnswer() {
        // @from for loop need to call validate()
        this.validate();
    }
    /* validate user response */
    validate() {
        const userAnswers = this.getAnswers();
        // validate with correct ans
    }
    /* method to reset all selection */
    reset() {

    }
    /* get user user response */
    getAnswers() {

    }



    render() {
        return (
            <main class={Styles.mainWrapper} style={{ backgroundImage: `url(./images/background/Background.png)` }}>
                <div class="container">
                    <h2 class={Styles.direction} dangerouslySetInnerHTML={{ __html: this.direction }}></h2>
                    <div class="content">
                        <div class={Styles.slideData}>
                            <div class="slide-section" role="application">
                                <div class={Styles.answerSection}>
                                    <div class="col-xs-15" ng-repeat="qstn in qstnSets">
                                        <div droppable id="droppableBin{{$index}}" class="answer-box droppable" ng-class="{'right':$last}" tabIndex="0" aria-label="droppable {{qstn.trimedTitle}}">
                                            <div class="content-title" ng-bind-html="qstn.title" ></div>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                </div>
                                <div class="clearfix"></div>
                                <Tool />
                            </div>
                            <div class="clearfix"></div>
                        </div>

                        <section class={Styles.buttonSection}>
                            <button class={`${Styles.resetButton} ${Styles.button}`} style={{ backgroundImage: `url(./images/icons/reset_btn.png)` }} onClick={this.reset.bind(this)} aria-label="Reset"></button>
                            <button class={`${Styles.okButton} ${Styles.button}`} style={{ backgroundImage: `url(./images/icons/ok_btn.png)` }} onClick={this.validate.bind(this)} aria-label="Ok" aria-live="assertive"></button>
                        </section>
                    </div>
                    <div class="clear"></div>
                </div>
            </main>
        );
    }
}