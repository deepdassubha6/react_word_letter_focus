import React from "react";

import Sentence from "./Main/Sentence";
import MainBody from "./Main/Word";
import Tool from "./Main/Tool";

import Styles from "./main.css";

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.direction = '';
        this.slideCorrectAnswer = {
            'wh': [],
            'wu': [],
            'li': [],
            'ld': []
        };
        this.allSentences = [];
    }
    shouldComponentUpdate(nextProps) {
        this.init(nextProps.screenContent);
        this.populateDirection(nextProps.direction);
        return true;
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
            for (let word of allWords) {
                let wordAfterTrim = this.findWordOperation(word);
                sentenceAfterTrim += ` ${wordAfterTrim}`;
            }
            this.allSentences.push(sentenceAfterTrim.trim());
        }
        this.populateSentenceComponent();
    }
    /* finds word operation */
    findWordOperation(word) {
        if (word.indexOf('{wh}') >= 0 && word.indexOf('{/wh}') >= 0) {
            word = word.match("{wh}(.*){/wh}")[1];
            this.slideCorrectAnswer.wh.push(word);
        } else if (word.indexOf('{wu}') >= 0 && word.indexOf('{/wu}') >= 0) {
            word = word.match("{wu}(.*){/wu}")[1];
            this.slideCorrectAnswer.wu.push(word);
        } else if (word.indexOf('{li}') >= 0 && word.indexOf('{/li}') >= 0) {
            word = word.match("{li}(.*){/li}")[1];
            this.slideCorrectAnswer.li.push(word);
        } else if (word.indexOf('{ld}') >= 0 && word.indexOf('{/ld}') >= 0) {
            word = word.match("{ld}(.*){/ld}")[1];
            this.slideCorrectAnswer.ld.push(word);
        }
        return word;
    }
    /* popuplate sentence component */
    populateSentenceComponent() {
        this.allSentencesComponents = this.allSentences.map((sentence, index) => {
            return <Sentence key={index} content={sentence} />
        });
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
    /* get user user response */
    getAnswers() {

    }
    /* method to reset all selection */
    reset() {

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