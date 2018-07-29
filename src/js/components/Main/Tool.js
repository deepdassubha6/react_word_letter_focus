import React from "react";

import Styles from "./tool.css";
import "./tool.css";

export default class Tpol extends React.Component {
    constructor() {
        super();
        this.toolItems = '';
        this.toolList = ['word Highlight', 'word Underline', 'letter Identification', 'letter Divide', 'erase'];
        this.populateTools(this.toolList);
        window.operation = { toolName: 'word Highlight', erase: false };
    }
    /* method to set tool name */
    setToolName(toolName) {
        if (toolName === 'erase') {
            window.operation.erase = true;
            return
        }
        window.operation = { toolName: toolName, erase: false };
        this.setTabIndexOnToolSelection(toolName);
    }
    /* set tab index value depending on tool selection */
    setTabIndexOnToolSelection(toolName) {
        if (toolName.indexOf('word') >= 0) {
            this.addRemoveTabIndex(document.querySelectorAll('[data-word]'), 0);
            this.addRemoveTabIndex(document.querySelectorAll('[data-letter]'), -1);
        } else if (toolName.indexOf('letter') >= 0) {
            this.addRemoveTabIndex(document.querySelectorAll('[data-word]'), -1);
            this.addRemoveTabIndex(document.querySelectorAll('[data-letter]'), 0);
        }
    }
    addRemoveTabIndex(elements, indexValue) {
        for (let i = 0; i < elements.length; i++) {
            elements[i].setAttribute("tabIndex", indexValue);
        }
    }
    /* method to handle keydown behavior */
    keyDownOnTool(toolName, evt) {
        if (evt.which === 32 || evt.which === 13) {
            this.setToolName(toolName);
        }
    }
    /* method to populate tool list */
    populateTools(toolList) {
        this.toolItems = toolList.map((tool) => {
            let itemName = tool.replace(/\s/g, '');
            return (
                <span key={tool} tabIndex="1" class="each-tool-wrapper" onKeyDown={this.keyDownOnTool.bind(this, `${tool}`)} onClick={this.setToolName.bind(this, `${tool}`)} style={{ display: 'inline-block' }}>
                    <span class={Styles[`${itemName}`]} style={{ backgroundImage: `url(./images/icons/${itemName}.png)` }}></span>
                    <br />
                    <span class={Styles.toolInitial} aria-lable={tool}>{tool}</span>
                </span>
            )
        });
    }

    render() {
        return (
            <div class={`${Styles.toolsWrapper} toolContainer col-md-12`} id="toolContainer">
                {this.toolItems}
            </div>
        );
    }
}