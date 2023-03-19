import React from "react";
import GameBox from "./components/game-sections/GameBox";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

export default function Game4() {
  return (
    <div>
      <div className="game-back-btn">
        <Link to="/learn-with-fun">
          <BiArrowBack className="backBtn" style={{ color: "white" }} />
        </Link>
      </div>
      <div className="LangGameBox">
        <GameBox />
      </div>
    </div>
  );
}
