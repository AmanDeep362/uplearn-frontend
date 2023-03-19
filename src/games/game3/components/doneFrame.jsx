import React, { Component } from "react";

class DoneFrame extends Component {
  render() {
    let show;
    show = this.props.doneStatus ? "show" : "hide";

    return (
      <div className="gamemodal-container" id={show}>
        <div className="modal">
          <h4 style={{ fontSize: "1.2rem" }}>Game Over</h4>
          <p style={{ fontSize: "1.5rem", fontWeight: "600" }}>
            {this.props.doneStatus}
          </p>
          <button className="playAgainBtn" onClick={this.props.playAgain}>
            Play Again
          </button>
        </div>
      </div>
    );
  }
}
export default DoneFrame;
