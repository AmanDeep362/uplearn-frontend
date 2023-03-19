import React, { useContext } from "react";
import FlagsContext from "../../contexts/FlagsContext";

const BoxFooter = ({
  handleCurrentFlagIndex,
  handleRestart,
  resultText,
  resState,
}) => {
  const flag = useContext(FlagsContext);
  return (
    <div
      id="details-area"
      //   className="d-flex justify-content-between align-items-center p-3"
      className="detailsArea"
    >
      {resState === true ? (
        <span className="ansss1" id="answer">
          {resultText}
        </span>
      ) : resState === null ? (
        <span className="ansss2" id="answer">
          {resultText}
        </span>
      ) : (
        <span className="ansss3" id="answer">
          {resultText}. It is {flag.correctAns}
        </span>
      )}
      <div className="detailAreaBtn">
        <button className="restartBtn" onClick={handleRestart}>
          Restart
        </button>
        <button
          //   className="btn btn-secondary text-nowrap"
          className="nextBtn"
          id="nextBtn"
          onClick={handleCurrentFlagIndex}
          disabled={flag.currentFlagIndex > 8}
        >
          Next <b> {">"} </b>
        </button>
      </div>
    </div>
  );
};

export default BoxFooter;

//  onclick="handleRestart();" on restart
// onclick="handleNext(event);" on next
