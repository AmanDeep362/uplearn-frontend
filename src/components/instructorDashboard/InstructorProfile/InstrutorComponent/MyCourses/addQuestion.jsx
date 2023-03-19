import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { useSelector } from "react-redux";
import axios from "axios";

var CryptoJS = require("crypto-js");

export default function AddQuestion() {
  const loginDetails = useSelector((state) => state.userReducers);
  let navigate = useNavigate();

  const { id, quiz_id } = useParams();

  const [Instructor, setInstructor] = useState({});
  const [courseData, setCourseData] = useState([]);
  const [err, seterr] = useState("");

  const [Question, setQuestion] = useState([
    {
      question: "",
      options: [""],
      correctOption: "",
      MarksPerquestion: 0,
    },
  ]);

  useEffect(() => {
    window.scroll(0, 80);
    // Decrypting the User Role
    if (loginDetails.userRole !== "") {
      var bytes = CryptoJS.AES.decrypt(
        loginDetails.userRole,
        "my-secret-key@123"
      );
      var role = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }
    // Check is  Login Or Not
    if (Number(loginDetails.isLoggedIn) && role === "INSTRUCTOR") {
      // call the fetch admin detail function
      const fetchdata = async () => {
        await axios
          .get("/aboutInstructor")
          .then((response) => {
            setInstructor(response.data);
          })
          .catch((error) => {
            console.log(error);
            navigate("/login");
          });
      };
      fetchdata();
    } else {
      navigate("/login");
    }

    const fetchcourse = async () => {
      await axios
        .get("/CoursesUplearn")
        .then((response) => {
          setCourseData(response.data);
        })
        .catch((error) => {
          console.log(error);
          navigate("/login");
        });
    };
    fetchcourse();
  }, [loginDetails.isLoggedIn, loginDetails.userRole, navigate]);

  // console.log(Question);

  const postData = async () => {
    const quizId = quiz_id;
    Question.map(async (item, index) => {
      let question = item.question;
      let options = item.options;
      let correctOption = item.correctOption;
      let MarksPerquestion = item.MarksPerquestion;

      const res = await fetch("/addQuestionToQuiz", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
          options,
          correctOption,
          quizId,
          MarksPerquestion,
        }),
      });

      if (res.status === 200) {
        if (Question.length - 1 === index) {
          window.alert("Questions added successfully.");
          navigate("/instructordashboard/my-courses");
        }
      } else {
        console.log(res);
        window.alert("error occured");
      }
    });
  };

  const handleSubmit = async () => {
    seterr("Please wait we are uploading your Data");
    document.getElementById("submitquiz").disabled = true;

    await postData();
  };

  return (
    <>
      <div className="addQuizQuestionMain">
        <div className="add-course-header">
          {/* This Link Heading to return back  */}
          <Link to="/instructordashboard/my-courses">
            <BiArrowBack className="backBtn" style={{ color: "white" }} />
          </Link>
        </div>
        {/* The Heading of Quiz  */}
        <div className="addQuizQuestion-Heading">
          <h1>Add Questions in Quiz</h1>
          <p className="star">
            <strong>Note :</strong> Please select any correct option from
            checkbox.
          </p>
        </div>
        <form>
          <div className="add-question-main-body">
            {Question.map((item, index) => (
              <div key={index} className="add-question-card-container">
                {/* Div Of Question & Marks  */}
                <div className="add-question-input-container">
                  {/* Question  */}
                  <div className="add-question-div1">
                    <label htmlFor="Question">{index + 1}. Question :</label>{" "}
                    <br />
                    <input
                      type="text"
                      id="Question"
                      required
                      placeholder="Enter your Question"
                      onChange={(e) => {
                        const temp = [...Question];
                        temp[index].question = e.target.value;
                        setQuestion(temp);
                      }}
                      value={item.question}
                    />
                  </div>
                  {/* Marks per Question  */}
                  <div className="add-question-div2">
                    <label htmlFor="marks">Marks:</label> <br />
                    <input
                      type="number"
                      id="marks"
                      placeholder="Enter Marks"
                      min={1}
                      max={5}
                      required
                      value={Question[index].MarksPerquestion}
                      onChange={(e) => {
                        const marks_temp = [...Question];
                        marks_temp[index].MarksPerquestion = e.target.value;
                        setQuestion(marks_temp);
                      }}
                    />
                  </div>
                </div>
                <div className="add-question-options-container">
                  {item.options.map((option, ind) => (
                    <div key={ind} className="add-question-options-inner">
                      <label>Options : {ind + 1}</label> <br />
                      <div className="add-question-options-inner-input">
                        <input
                          type="text"
                          placeholder="Enter Options"
                          required
                          value={option}
                          onChange={(e) => {
                            const opt_temp = [...Question];
                            opt_temp[index].options[ind] = e.target.value;
                            setQuestion(opt_temp);
                          }}
                        />
                        <input
                          type="radio"
                          required
                          value={ind + 1}
                          name={"correctoption" + index}
                          id={ind + 1}
                          onChange={(e) => {
                            let tempor = [...Question];
                            tempor[index].correctOption = ind + 1;
                            setQuestion(tempor);
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="add-more-option-btn">
                  <button
                    onClick={(e) => {
                      const temp = [...Question];
                      temp[index].options.push("");
                      setQuestion(temp);
                    }}
                  >
                    Add Option
                  </button>
                  <p className="star">
                    <strong>Note :</strong> Click button to add more options
                  </p>
                </div>
              </div>
            ))}
            <button
              className="add-quiz-btn"
              onClick={(e) => {
                const temp = [...Question];
                temp.push({
                  question: "",
                  options: [""],
                  correctOption: "",
                });
                setQuestion(temp);
              }}
            >
              Add more Questions
            </button>
          </div>
          {/* Finaly a submit button and a loader  */}
          <div className="course-field-submit">
            <p className="uploadphoto">{err}</p>
            <button
              id="submitquiz"
              onClick={handleSubmit}
              className="submit-quiz-btn"
            >
              Add Quiz in Course
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
