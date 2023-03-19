import React, { useContext } from "react";
import FlagsContext from "../../contexts/FlagsContext";

const BoxHeader = ({ points }) => {
  const flag = useContext(FlagsContext);
  return (
    <div className="LangGameBoxHeader">
      <span className="gameTitle">
        Guess The Language:{" "}
        <span id="turn-number">{flag.currentFlagIndex + 1}</span>/10
      </span>
      <span className="gamePoints" id="basic-addon2">
        Point(s): <span id="points">{points}</span>
      </span>
    </div>
  );
};

export default BoxHeader;
