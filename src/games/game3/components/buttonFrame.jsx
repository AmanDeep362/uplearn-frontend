import React, { Component } from "react";
import "./buttonFrame.css";
import { MdRefresh } from "react-icons/md";

class ButtonFrame extends Component {
  render() {
    let disabled,
      button,
      correct = this.props.correct;

    switch (correct) {
      case true:
        button = (
          <button className="firstbtn" onClick={this.props.acceptAnswer}>
            <span className="fa fa-check"></span>
          </button>
        );
        break;

      case false:
        button = (
          <button className="secondbtn">
            <span className="fa fa-times"></span>
          </button>
        );
        break;

      default:
        disabled = this.props.selectedNumbers.length === 0;
        button = (
          <button
            className="thirdbtn"
            disabled={disabled}
            onClick={this.props.checkAnswer}
          >
            =
          </button>
        );
    }

    return (
      <div id="button-frame">
        {button}
        <br />
        <br />

        <button
          className="forthbtn"
          onClick={this.props.redraw}
          disabled={this.props.redraws === 0}
        >
          <MdRefresh />
          &nbsp;
          {this.props.redraws}
        </button>
      </div>
    );
  }
}

export default ButtonFrame;
