import { useState } from "react";
import Loader from "../../../Loader";
import QuizPreform from "./Quiztest";

export default function QuizesContent(props) {
  let QuizContent = props.quiz;

  const [hidden, setHidden] = useState({});

  const [curentQuiz, setcurentQuiz] = useState(QuizContent.lectureQuiz[0]);

  // Checking is Data is availabe else show no Article available
  if (QuizContent.lectureQuiz) {
    if (QuizContent.lectureQuiz.length > 0) {
      // The Main Area Where Quiz were Written
      var i = 1;

      const handleQuizToggle = (index) => {
        setHidden({ [index]: !hidden[index] });
      };

      const playcurrentquiz = (item, index) => {
        setcurentQuiz(item);
        handleQuizToggle(index);
      };

      return (
        <div className="Quiz-content-container">
          <ul>
            {QuizContent.lectureQuiz.map((item, index) => (
              <div key={index}>
                <li className="my-quiz-title">
                  {i++ + "."} &nbsp; {item.QuizeName}
                  <button onClick={() => playcurrentquiz(item, index)}>
                    Start Quiz
                  </button>
                </li>

                {/* Making the Quiz Happen  */}
                {hidden[index] && <QuizPreform myquiz={curentQuiz} />}
              </div>
            ))}
          </ul>
        </div>
      );
    }
    // Will Be Shown When no article is available
    else {
      return (
        <div className="not-available-incourse">
          <h1>Not Quiz Available</h1>
        </div>
      );
    }
  } else {
    return <Loader />;
  }
}
