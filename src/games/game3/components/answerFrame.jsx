import React, { Component } from "react";
import "./answerFrame.css";

class AnswerFrame extends Component {
  render() {
    let result = this.props.selectedNumbers.map((i) => {
      return (
        <span onClick={this.props.unSelectNumber.bind(null, i)} key={i}>
          {i}
        </span>
      );
    });

    return (
      <div id="answer-frame">
        <div className="card__height">
          <div className="ansFrame">{result}</div>
        </div>
      </div>
    );
  }
}
export default AnswerFrame;
