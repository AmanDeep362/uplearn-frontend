import React from "react";
import Colors from "../constants/colors";
import PropTypes from "prop-types";

function Lifes({ lifes }) {
  let hearts = [];

  if (lifes < 5) {
    for (let i = 0; i < lifes; i++) {
      hearts.push(
        <i
          key={i}
          style={{ marginLeft: "0.1em", fontSize: "2rem" }}
          className="fas fa-heart"
        ></i>
      );
    }
  } else {
    hearts.push(
      <i
        key={lifes}
        style={{ marginLeft: "0.1em", fontSize: "2rem" }}
        className="fas fa-heart"
      ></i>
    );
  }

  return (
    <span style={{ color: Colors.red }}>
      {lifes > 4 && <b>{`${lifes}x`}</b>}
      {hearts}
    </span>
  );
}

Lifes.propTypes = {
  lifes: PropTypes.number.isRequired,
};

export default Lifes;
