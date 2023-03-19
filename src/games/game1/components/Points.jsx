import React from "react";
import Colors from "../constants/colors";

export default function Points({ points }) {
  return (
    <span>
      <i
        className="fas fa-star"
        style={{ color: Colors.yellow, fontSize: "2rem" }}
      ></i>{" "}
      {points}
    </span>
  );
}
