import { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuizPreform from "./TaskSubQuiz";
import { MdDelete } from "react-icons/md";
import Loader from "../../../../../Loader";

export default function QuizesContent(props) {
  let QuizContent = props.quiz;
  let navigate = useNavigate();

  const [hidden, setHidden] = useState({});

  const [curentQuiz, setcurentQuiz] = useState(QuizContent.courseQuiz[0]);

  // Checking is Data is availabe else show no Article available
  if (QuizContent.courseQuiz) {
    if (QuizContent.courseQuiz.length > 0) {
      // The Main Area Where Quiz were Written
      var i = 1;

      const handleQuizToggle = (index) => {
        setHidden({ [index]: !hidden[index] });
      };

      const playcurrentquiz = (item, index) => {
        setcurentQuiz(item);
        handleQuizToggle(index);
      };

      const DeleteTaskQuiz = async (id) => {
        if (
          window.confirm("Are you Sure you want to delete the Quiz!") === true
        ) {
          const courseid = QuizContent._id;

          const res = await fetch("/delteMyCourseQuiz", {
            method: "POST",
            headers: {
              "content-Type": "application/json",
            },
            body: JSON.stringify({
              id,
              courseid,
            }),
          });

          if (res.status === 200) {
            window.alert("Quiz Removed Successfully");
            navigate("/instructordashboard/my-courses");
          } else {
            console.log(res);
          }
        } else {
          console.log("Cancel");
        }
      };

      return (
        <div className="Quiz-content-container">
          <ul>
            {QuizContent.courseQuiz.map((item, index) => (
              <div key={index}>
                <li className="my-quiz-title">
                  {i++ + "."} &nbsp; {item.QuizeName}
                  <div>
                    <button onClick={() => playcurrentquiz(item, index)}>
                      Start Quiz
                    </button>
                    <span
                      style={{ margin: "1.2rem" }}
                      onClick={(e) => {
                        DeleteTaskQuiz(item._id);
                      }}
                    >
                      <MdDelete />
                    </span>
                  </div>
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
