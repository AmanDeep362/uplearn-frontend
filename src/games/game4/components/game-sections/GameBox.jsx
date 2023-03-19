import React, { useState, useEffect } from "react";
// components
import Loader from "../loader";
import BoxHeader from "./BoxHeader";
import Flag from "./Flag";
import OptionBox from "./options";
import BoxFooter from "./BoxFooter";
import Modal from "../modal/Modal";
import countryLang from "../../../../assets/images/countryLang.png";
// utils
// import Flags from "../../utils/flags";
import resultTexts from "../../utils/result";
// contexts
import FlagsContext from "../../contexts/FlagsContext";

import { generateQuiz } from "country-quiz-generator";

// css
import "../../utils/style.css";

const GameBox = () => {
  // hooks
  const [isLoading, setIsLoading] = useState(true);
  const [randomFlags, setRandomFlags] = useState([]);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState("--Select country--");
  const [currentFlagIndex, setCurrentFlagIndex] = useState(0);
  const [correctAns, setCorrectAns] = useState("");
  const [points, setPoints] = useState(0);
  const [resultText, setResultText] = useState({
    msg: "Take time, Think well",
    isCorrect: null,
  });
  const [disableInput, setDisableInput] = useState(false);

  const quiz = generateQuiz(10, {
    questionTypesToSelect: ["whichCountryForGivenLanguage"],
  });

  useEffect(() => {
    setRandomFlags(quiz);
    setOptions(quiz[0].options);
    setCorrectAns(quiz[0].correctAnswer);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setOptions(quiz[currentFlagIndex].options);
    setCorrectAns(quiz[currentFlagIndex].correctAnswer);
  }, [currentFlagIndex]);

  // necessary functions

  // const errorHandler = (error) => {
  //   setIsLoading(false);
  //   console.error(error);
  //   throw new Error("Something went wrong!");
  // };

  const handleRestart = () => {
    defaultState();
    setRandomFlags(quiz);
    setCurrentFlagIndex(0);
    setOptions(quiz[0].options);
    setCorrectAns(quiz[0].correctAnswer);
    setPoints(0);
  };

  const handleCurrentFlagIndex = () => {
    setCurrentFlagIndex(currentFlagIndex + 1);
    defaultState();
  };

  const defaultState = () => {
    setSelected("--Select country--");
    setDisableInput(false);
    setResultText({
      msg: "Take time, Think well",
      isCorrect: null,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selected === "--Select country--") {
      return alert("First select a country!");
    } else if (correctAns === selected) {
      setPoints(points + 1);
      setResultText({ msg: genSuccessAnsText(), isCorrect: true });
    } else {
      setResultText({ msg: genFailAnsText(), isCorrect: false });
    }
    setDisableInput(true);
  };

  const genSuccessAnsText = () => {
    return resultTexts.success[
      Math.floor(Math.random() * resultTexts.success.length)
    ];
  };

  const genFailAnsText = () => {
    return resultTexts.fail[
      Math.floor(Math.random() * resultTexts.fail.length)
    ];
  };

  const handleSelect = (event) => {
    setSelected(event.target.value);
  };

  return (
    <FlagsContext.Provider
      value={{ randomFlags, currentFlagIndex, correctAns, points }}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="LangGameCard">
            <BoxHeader points={points} />
            <img src={countryLang} alt="" />
            <Flag />
            <OptionBox
              selected={selected}
              options={options}
              handleSubmit={handleSubmit}
              handleSelect={handleSelect}
              disableInput={disableInput}
            />
            <hr className="mb-0" />
            <BoxFooter
              handleCurrentFlagIndex={handleCurrentFlagIndex}
              handleRestart={handleRestart}
              resultText={resultText.msg}
              resState={resultText.isCorrect}
            />
          </div>
          {currentFlagIndex === 9 && <Modal handleRestart={handleRestart} />}
        </>
      )}
    </FlagsContext.Provider>
  );
};

export default GameBox;
