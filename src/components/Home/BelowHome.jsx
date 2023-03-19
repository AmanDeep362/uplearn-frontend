import React from "react";
import { Link } from "react-router-dom";
import Svg1 from "../../assets/images/svg1.jpg";

function BelowHome() {
  return (
    <div className="home-head-container">
      <div className="home-quote">
        <h1>
          The beautiful thing about learning is that nobody can take it away
          from you
        </h1>
        <p>
          Education is the process of facilitating learning, or the acquisition
          of knowledge, skills, values, beliefs, and habits. Educational methods
          include teaching, training, storytelling, discussion and directed
          research!
        </p>
      </div>
      <div className="svg-image">
        <img src={Svg1} alt="svg" />
      </div>
    </div>
  );
}
export default BelowHome;
