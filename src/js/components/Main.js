import React from "react";

import Sentence from "./Main/Sentence";
import MainBody from "./Main/Word";
import Tool from "./Main/Tool";

import Styles from "./main.css";

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.direction = '';
        this.slideCorrectAnswer = [];
    }
    shouldComponentUpdate(nextProps) {
        this.allSentences = [];
        this.init(nextProps.screenContent);
        this.populateDirection(nextProps.direction);
        this.resetRightWrong();
        return true;
    }
    /* reset all right wrong visibility */
    resetRightWrong() {
        const allRightIndicatorSpan = document.querySelectorAll('#right');
        const allWrongIndicatorSpan = document.querySelectorAll('#wrong');
        for (let i = 0; i < allRightIndicatorSpan.length; i++) {
            this.setStyle(allRightIndicatorSpan[i], 'display', 'none');
        }
        for (let i = 0; i < allWrongIndicatorSpan.length; i++) {
            this.setStyle(allWrongIndicatorSpan[i], 'display', 'none');
        }
    }
    /* first method to get call */
    init(data) {
        const currentPagedata = data;
        this.populateSentence(currentPagedata);
    }
    /* method to populate direction */
    populateDirection(direction) {
        this.direction = direction.text;
    }
    /* populate corrct answers */
    populateSentence(pageData) {
        const allSentenceArray = pageData.sentences.sentence.text;
        for (let sentence of allSentenceArray) {
            let allWords = sentence.trim().split(' ');
            let sentenceAfterTrim = '';
            this.sentenceCorrectAnswer = { 'wh': [], 'wu': [], 'li': [], 'ld': [] };
            for (let word of allWords) {
                let wordAfterTrim = this.findWordOperation(word);
                sentenceAfterTrim += ` ${wordAfterTrim}`;
            }
            this.slideCorrectAnswer.push(this.sentenceCorrectAnswer);
            this.allSentences.push(sentenceAfterTrim.trim());
        }
        this.populateSentenceComponent();
    }
    /* finds word operation */
    findWordOperation(word) {
        if (word.indexOf('{wh}') >= 0 && word.indexOf('{/wh}') >= 0) {
            word = word.match("{wh}(.*){/wh}")[1];
            this.sentenceCorrectAnswer.wh.push(word);
        } else if (word.indexOf('{wu}') >= 0 && word.indexOf('{/wu}') >= 0) {
            word = word.match("{wu}(.*){/wu}")[1];
            this.sentenceCorrectAnswer.wu.push(word);
        } else if (word.indexOf('{li}') >= 0 && word.indexOf('{/li}') >= 0) {
            word = word.match("{li}(.*){/li}")[1];
            this.sentenceCorrectAnswer.li.push(word);
        } else if (word.indexOf('{ld}') >= 0 && word.indexOf('{/ld}') >= 0) {
            word = word.match("{ld}(.*){/ld}")[1];
            this.sentenceCorrectAnswer.ld.push(word);
        }
        return word;
    }
    /* popuplate sentence component */
    populateSentenceComponent() {
        this.allSentencesComponents = this.allSentences.map((sentence, index) => {
            return (
                <span key={index} id='indicator'>
                    <span id="right" class={Styles.correctWrong} style={{ backgroundImage: `url(./images/icons/right.png)` }}></span>
                    <span id="wrong" class={Styles.correctWrong} style={{ backgroundImage: `url(./images/icons/wrong.png)` }}></span>
                    <Sentence content={sentence} />
                </span>
            )
        });
    }
    /* validate user response */
    validate() {
        let userAnswers = [];
        this.afterAttemptAllSentences = [];
        this.afterAttemptAllSentences = document.querySelectorAll('#sentence');
        for (let i = 0; i < this.slideCorrectAnswer.length; i++) {
            let userAnswersPerSentence = this.getAnswers(this.afterAttemptAllSentences[i]);
            userAnswers.push(userAnswersPerSentence);
        }
        this.checkAnswers(userAnswers);
    }
    /* get user response */
    getAnswers(senteceAfterAttempt) {
        const highlightedWords = this.takeTextOfAnswer(senteceAfterAttempt.querySelectorAll('#wordHighlight'));
        const unserlinedWords = this.takeTextOfAnswer(senteceAfterAttempt.querySelectorAll('#wordUnderline'));
        const letterIdentification = this.takeTextOfAnswer(senteceAfterAttempt.querySelectorAll('#letterIdentification'));
        const letterDivide = this.takeTextOfAnswer(senteceAfterAttempt.querySelectorAll('#letterDivide'));
        return { 'wh': highlightedWords, 'wu': unserlinedWords, 'li': letterIdentification, 'ld': letterDivide };
    }
    /* method to check user answers with qution answers */
    checkAnswers(userAnswerObj) {
        let allSentencesAfterAttempt = document.querySelectorAll('#indicator');
        for (let i = 0; i < userAnswerObj.length; i++) {
            let isCorrect = JSON.stringify(this.slideCorrectAnswer[i]) === JSON.stringify(userAnswerObj[i]);
            let spanToFetch = isCorrect ? 'right' : 'wrong';
            this.setStyle(allSentencesAfterAttempt[i].querySelectorAll(`#${spanToFetch}`)[0], 'display', 'block');
        }
    }
    /* method to set sstyle */
    setStyle(elm, styAttribute, ValueToSet) {
        elm.style[styAttribute] = ValueToSet; // if already not a string
    }
    /* get text method from user answers (words/letters) array */
    takeTextOfAnswer(answers) {
        let userAnswer = [];
        for (let i = 0; i < answers.length; i++) {
            userAnswer.push(answers[i].textContent);
        }
        return userAnswer;
    }
    /* method to reset all selection */
    reset() {
        this.forceUpdate();
    }

    render() {
        return (
            <main class={Styles.mainWrapper} style={{ backgroundImage: `url(./images/background/Background.png)` }}>
                <div class="container">
                    <h2 class={Styles.direction} dangerouslySetInnerHTML={{ __html: this.direction }}></h2>
                    <div class="content">
                        <div class={Styles.slideData}>
                            {/* <div class="slide-section" role="application"> */}
                            <div class="slide-section">
                                <div class={Styles.answerSection}>
                                    {this.allSentencesComponents}
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