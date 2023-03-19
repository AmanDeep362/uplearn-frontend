import React, { Component } from "react";
import "./starFrame.css";
import { FaDove } from "react-icons/fa";

class StarFrame extends Component {
  render() {
    let starsDisplay = [],
      numberOfStars = this.props.numberOfStars;

    for (let i = 0; i < numberOfStars; i++) {
      starsDisplay.push(<FaDove className="icon" key={i} />);
    }

    return (
      <div id="star-frame">
        <div className="card__height">
          <div className="starFrame">{starsDisplay}</div>
        </div>
      </div>
    );
  }
}

export default StarFrame;
