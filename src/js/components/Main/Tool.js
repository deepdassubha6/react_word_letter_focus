import React from "react";

import Styles from "./tool.css";
import "./tool.css";

export default class Tpol extends React.Component {
    constructor() {
        super();
        this.toolItems = '';
        this.toolList = ['word Highlight', 'word Underline', 'letter Identification', 'letter Divide', 'erase'];
        this.populateTools(this.toolList);
        window.toolName = 'word Highlight';
    }
    setToolName(toolName) {
       window.toolName = toolName;
    }
    populateTools(toolList) {
        this.toolItems = toolList.map((tool) => {
            let itemName = tool.replace(/\s/g, '');
            return (
                <span key={tool} class = "each-tool-wrapper" onClick={this.setToolName.bind(this, `${tool}` )} style = { {display: 'inline-block' }}>
                    <span class = { Styles[`${itemName}`]}  style={{ backgroundImage: `url(./images/icons/${itemName}.png)` }}></span>
                    <br/>
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