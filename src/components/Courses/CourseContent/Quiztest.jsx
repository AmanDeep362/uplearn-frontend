import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import axios from "axios";

function useCounter(initialState) {
  const [value, setValue] = useState(initialState);

  const reset = () => setValue(0);
  const add = () => setValue((value) => (value += 1));

  return { value, add, reset };
}

let TotalMarks = 0;
let marksObtained = 0;

function Question({
  data,
  buttonText,
  hasButton = true,
  onQuestionButtonClick,
  showAnswer = false,
  markSelection = null,
}) {
  const [answer, setAnswer] = useState(null);
  const parseValue = (value) => (value ? parseInt(value.split("-")[1]) : null);
  const questionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      questionRef.current.querySelector(".question-text"),
      {
        x: 40,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.4,
      }
    );
    gsap.fromTo(
      questionRef.current.querySelectorAll("li"),
      {
        opacity: 0,
        x: 40,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.4,
        stagger: 0.1,
      }
    );
  }, [data]);

  return (
    <div className="question" ref={questionRef}>
      <div className="question-inner">
        <h2 className="question-text">{data.question}</h2>
        <ul className="question-answers">
          {data.options.map((text, index) => {
            const value = `q${data._id}-${index}`;
            return (
              <li
                className={
                  index === data.correctOption - 1 && showAnswer
                    ? "is-true"
                    : ""
                }
                data-selected={markSelection === index ? true : null}
              >
                <input
                  type="radio"
                  name={`q_${data._id}`}
                  value={value}
                  id={value}
                  onChange={(e) => setAnswer(e.target.value)}
                  checked={
                    !showAnswer ? answer === value : markSelection === index
                  }
                />
                <label className="question-answer" htmlFor={value}>
                  {text}
                </label>
              </li>
            );
          })}
        </ul>
      </div>
      {hasButton && (
        <button
          className="question-button"
          onClick={() => onQuestionButtonClick(parseValue(answer), data)}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
}

// const UpdateScore = () => {
//   console.log("score Updated");
// };

function Results({ wrong, correct }) {
  return (
    <div className="result">
      <div className="result-item is-correct">
        <span className="result-count">{correct}</span>
        <span className="result-text">
          <svg
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="css-i6dzq1"
            viewBox="0 0 24 24"
          >
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
            <path d="M22 4L12 14.01 9 11.01"></path>
          </svg>
          CORRECT
        </span>
      </div>
      <div className="result-item is-wrong">
        <span className="result-count">{wrong}</span>
        <span className="result-text">
          <svg
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="css-i6dzq1"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M15 9L9 15"></path>
            <path d="M9 9L15 15"></path>
          </svg>
          WRONG
        </span>
      </div>
    </div>
  );
}

function QuestionCorrection({ data, selection }) {
  return (
    <div className="correction">
      {data.map((question, index) => {
        return (
          <Question
            hasButton={false}
            markSelection={selection[index]}
            showAnswer={true}
            data={question}
          />
        );
      })}
    </div>
  );
}

///////////////////////////////////////////////////////////////////////////
// The Main Function which is executed //
///////////////////////////////////////////////////////////////////////////

export default function QuizPreform(props) {
  var myquiz = props.myquiz;
  var userData = props.userData;

  const [select, setselect] = useState([]);
  // console.log(myquiz._id);
  const [gameStarted, setGameStarted] = useState(false);
  const totalQuestion = myquiz.QuestionsofQuiz.length - 1;
  const gameRef = useRef(null);

  const question = useCounter(0);
  const correct = useCounter(0);
  const wrong = useCounter(0);
  const empty = useCounter(0);

  const handleNewQuestionClick = (selectedValue, currQuestion) => {
    if (totalQuestion >= question.value) {
      if (selectedValue === currQuestion.correctOption - 1) {
        TotalMarks += currQuestion.MarksPerquestion;
        marksObtained += currQuestion.MarksPerquestion;
        correct.add();
      } else if (
        selectedValue !== null &&
        selectedValue !== currQuestion.correctOption - 1
      ) {
        wrong.add();
        TotalMarks += currQuestion.MarksPerquestion;
      } else {
        empty.add();
      }
      setselect((select) => [...select, selectedValue]);
      question.add();
    }
  };

  const handleRestartClick = () => {
    setGameStarted(false);
    setselect([]);
    question.reset();
    correct.reset();
    wrong.reset();
    empty.reset();
    console.log("test");

    //post data to db
    const postData = async () => {
      const marksObtain = marksObtained;
      const totalMarks = TotalMarks;
      const quesId = myquiz._id;
      const userId = userData._id;

      const res = await fetch("/addQuizReport", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          marksObtain,
          totalMarks,
          quesId,
          userId,
        }),
      });

      // const data = await res.json();
      // console.log(data);
      if (res.status === 200) {
        window.alert("data added");
      } else {
        window.alert("Error occured , try again");
      }
    };
    postData();

    //get data from db
    const fetchcourse = async () => {
      await axios
        .get("/getQuizReport")
        .then((response) => {
          return response;
        })
        .catch((error) => {
          console.log(error);
        });
    };
  };

  const indicatorBg = (index) => {
    if (question.value > index) {
      return "#000";
    } else if (question.value === index) {
      return "#29b5d5";
    } else {
      return "#aaa";
    }
  };

  useEffect(() => {
    if (gameStarted) {
      document.body.classList.add("game-started");
    } else {
      document.body.classList.remove("game-started");
    }
  }, [gameStarted]);

  useEffect(() => {
    if (question.value > totalQuestion) {
      gameRef.current.scrollTop = 0;
    }
  }, [question.value]);

  return (
    <div
      className="game"
      ref={gameRef}
      data-game-started={gameStarted ? true : null}
      data-game-finished={question.value > totalQuestion ? true : null}
    >
      <div className="intro">
        <div className="intro-inner">
          <h1 className="intro-title">{myquiz.QuizeName}</h1>
          <h4 className="intro-level">Level: {myquiz.QuizDifficulty}</h4>
          {!gameStarted && (
            <>
              <p className="intro-desc">
                {`The test contains ${myquiz.QuestionsofQuiz.length} questions and there is no time limit.`}
              </p>

              <button
                className="intro-button"
                onClick={() => setGameStarted(true)}
              >
                Start Quiz
              </button>
            </>
          )}

          {/* This Div Will Present the indicator of Question  */}
          {gameStarted && (
            <div className="indicator">
              {myquiz.QuestionsofQuiz.map((q, index) => {
                return (
                  <span
                    key={index}
                    className="indicator-item"
                    style={{
                      backgroundColor: indicatorBg(index),
                    }}
                  />
                );
              })}
            </div>
          )}

          {/* This Component will render the result After Completion  */}
          {!myquiz.QuestionsofQuiz[question.value] && (
            <>
              <Results wrong={wrong.value} correct={correct.value} />
            </>
          )}
          {/* Code to Print the marks obtained   */}
          {!myquiz.QuestionsofQuiz[question.value] && (
            <div
              className="result"
              style={{ marginTop: "0px", maxHeight: "2rem" }}
            >
              <div className="result-item is-correct">
                <span className="result-count">
                  {(marksObtained / TotalMarks) * 100}%
                </span>
                <span className="result-text">
                  <svg
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="css-i6dzq1"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                    <path d="M22 4L12 14.01 9 11.01"></path>
                  </svg>
                  Marks Obtained
                </span>
              </div>
            </div>
          )}

          {/* Button To Start the Quiz Again  */}

          <button
            className="restart-button"
            onClick={() => handleRestartClick()}
          >
            finish
          </button>
        </div>
      </div>
      {/* Area where Question were rendered  */}
      <div className="game-area">
        {myquiz.QuestionsofQuiz[question.value] && (
          <Question
            data={myquiz.QuestionsofQuiz[question.value]}
            buttonText={
              question.value !== totalQuestion ? "Next Question" : "Finish Quiz"
            }
            onQuestionButtonClick={handleNewQuestionClick}
          />
        )}
        {!myquiz.QuestionsofQuiz[question.value] && (
          <>
            <QuestionCorrection
              data={myquiz.QuestionsofQuiz}
              selection={select}
            />
          </>
        )}
      </div>
    </div>
  );
}
