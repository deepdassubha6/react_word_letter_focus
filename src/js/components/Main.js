import React from "react";

import Header from "./Main/Sentence";
import MainBody from "./Main/Word";

export default class Main extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <main class="main-wrapper">
                <div class="container">
                    {/* <div class="direction" ng-bind-html="directions"></div> */}
                    <div class="content">
                        {/* <div class="slide-data">
                            <div class="slide-section" role="application">
                                <div class="answer-section">
                                    <div class="col-xs-15" ng-repeat="qstn in qstnSets">
                                        <div droppable id="droppableBin{{$index}}" class="answer-box droppable" ng-class="{'right':$last}" tabindex="0" aria-label="droppable {{qstn.trimedTitle}}">
                                            <div class="content-title" ng-bind-html="qstn.title" ></div>
                                        </div>
                                    </div>
                                    <div class="clearfix"></div>
                                </div>
                                <div class="clearfix"></div>
                                <div class="droppable wordContainer input-texts col-md-12" id="main-drop-container" aria-label="droppable base region">
                                    <span class="droppable-initial" ng-repeat="option in options" id="droppable{{$index}}" rel={{$index}}>
                                        <span class="draggable"  id="draggable{{$index}}" ng-bind-html="option" tabindex="0" rel={{$index}} aria-label="draggable {{option}}"></span>
                                    </span>
                                </div>
                            </div>
                            <div class="clearfix"></div>
                        </div> */}

                        {/* <section class="button-section">
                            <button class="reset-button button" ng-click="reset()" aria-label="Reset"></button>
                            <button class="ok-button button" ng-click="validate()" ng-disabled="disableValidate" aria-label="Ok" aria-live="assertive"></button>
                        </section> */}
                    </div>
                    <div class="clear"></div>
                </div>
            </main>
        );
    }
}