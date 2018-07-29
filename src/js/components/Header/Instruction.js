import React from "react";
import Style from "./instruction.css";

export default class Instruction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hideMe: ''
        }
    }
    shouldComponentUpdate(nextProps) {
        return true;
    }

    closeModal() {
        this.props.cloeModalAction();
    }
    render() {
        return (
            <div style={{ display: this.props.displayStatus }}>
                <div id="instructionModal" class={Style.instructionSuccessPopup} role="dialog" aria-live="polite" >
                    <div class={Style.overlay}></div>
                    <div class={Style.popupBody}>
                        <button class={Style.btnClose} data-dismiss="modal" onClick={this.closeModal.bind(this)} aria-label="close" >
                            <strong class={`fa fa-times ${Style.btnCloseFa}`} aria-hidden="true">X</strong>
                        </button>
                        <div class={Style.middleCol}>
                            <div class={Style.textContainer} tabIndex="0" dangerouslySetInnerHTML={{ __html: this.props.modalData }}>
                            </div >
                            <div class="ui-helper-clearfix"></div>
                        </div >
                    </div >
                </div >
            </div>
        );
    }
}
