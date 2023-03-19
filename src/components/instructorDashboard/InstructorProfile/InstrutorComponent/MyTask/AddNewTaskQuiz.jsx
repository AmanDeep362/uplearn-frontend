import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { BiArrowBack } from "react-icons/bi";
import Loader from "../../../../Loader";
import axios from "axios";

var CryptoJS = require("crypto-js");

export default function InstAddNewTaskQuiz() {
  const loginDetails = useSelector((state) => state.userReducers);
  let navigate = useNavigate();

  const { id } = useParams();
  const [Instructor, setInstructor] = useState({});
  const [assignTask, setassignTask] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  const [Quiz, setQuiz] = useState({
    QuizeName: "",
    QuizDifficulty: "",
    marksPerQuestion: 0
  });

  const [err, seterr] = useState("");

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

    // Fetch The Course Details To which quiz were added
    const fetchcourse = async () => {
      await axios
        .get("/singleassigntaskinfo/" + id)
        .then((response) => {
          setassignTask(response.data[0]);
          setisLoading(false);
        })
        .catch((error) => {
          console.log(error);
          navigate("/login");
        });
    };
    fetchcourse();

    // end of useEffect
  }, [loginDetails.isLoggedIn, loginDetails.userRole, navigate, id]);

  // Set the values of Quiz
  const handlechange = (e) => {
    setQuiz({ ...Quiz, [e.target.name]: e.target.value });
  };

  // Check that all valus is provided
  const handlevalidation = () => {
    if (!Quiz.QuizeName || !Quiz.QuizDifficulty || !Quiz.marksPerQuestion) {
      seterr("Please Enter All Fields");
      return false;
    } else if (Quiz.marksPerQuestion <= 0 || Quiz.marksPerQuestion > 5) {
      seterr("Please choose marks per Question between 1 to 5");
      return false;
    } else {
      return true;
    }
  };

  // Send Data to backend
  const postData = async () => {
    const _id = id;
    const { QuizeName, QuizDifficulty } = Quiz;

    const res = await fetch("/createLectureQuiz", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        _id,
        QuizeName,
        QuizDifficulty,
      }),
    });

    if (res.status === 200) {
      window.alert('New Quiz Added Successfully.')
      navigate("/instructordashboard/task-assign");
    } else {
      console.log(res);
      window.alert("error occured");
    }
  };

  // Send Data to backend after checking validation
  const handleSubmit = async () => {
    const submit = handlevalidation();

    if (submit) {
      seterr("Please wait we are uploading your Data");
      document.getElementById("addquiz-btn").disabled = true;
        postData();
    }
  };

//   console.log(Quiz)

  if (isLoading) {
    return <Loader />;
  } else {
    return (
      <>
        {/* The Main Div  */}
        <div className="add-course-container">
          {/* This Link Heading to return back  */}
          <div className="add-course-header">
            <Link to={"/instructordashboard/task-assign"}>
              <BiArrowBack className="backBtn" style={{ color: "white" }} />
            </Link>
          </div>

          {/* Body Of Content  */}
          <div className="add-course-body">
            {/* Inner Body Container  */}
            <div className="add-course-form-container">
              {/* Heading Of Container  */}
              <h1>Add Quiz to Lecture</h1>

              {/* Start taking input for quiz  */}

              {/* Course Title  */}
              <div className="makedivision">
                <form>
                  {/* The Email Input  */}
                  <div className="signInput">
                    <label htmlFor="title">
                      {" "}
                      Chapter Name :<span className="star"> *</span>
                    </label>
                    <br />
                    <input
                      type="text"
                      id="title"
                      name="title"
                      defaultValue={assignTask ? assignTask.ChapterName : ""}
                      disabled
                    />
                  </div>
                </form>
              </div>

              {/* Quiz name  */}
              <div className="makedivision">
                <form>
                  {/* The Email Input  */}
                  <div className="signInput">
                    <label htmlFor="QuizeName">
                      {" "}
                      Name of Quiz :<span className="star"> *</span>
                    </label>
                    <br />
                    <input
                      type="text"
                      id="QuizeName"
                      name="QuizeName"
                      placeholder="Name of the test"
                      value={Quiz.QuizeName}
                      onChange={(e) => handlechange(e)}
                      required
                    />
                  </div>
                </form>
              </div>

              {/* Quiz Marks  */}
              <div className="makedivision">
                <form>
                  {/* The Email Input  */}
                  <div className="signInput">
                    <label htmlFor="marksPerQuestion">
                      {" "}
                      Marks Per Question :<span className="star"> *</span>
                    </label>
                    <br />
                    <input
                      type="number"
                      id="marksPerQuestion"
                      name="marksPerQuestion"
                      placeholder="Please enter quiz marks between 1 and 5"
                      min={0}
                      max={5}
                      value={Quiz.marksPerQuestion}
                      onChange={(e) => handlechange(e)}
                      required
                    />
                  </div>
                </form>
              </div>

              {/* Asking Level of course  */}
              <p>
                &nbsp;Difficulty Level of Test :<span className="star"> *</span>
              </p>
              <div className="add-course-radio">
                <div>
                  <input
                    type="radio"
                    id="Beginers"
                    name="QuizDifficulty"
                    value="Easy"
                    onChange={(e) => handlechange(e)}
                  />
                  <label htmlFor="Beginers">Easy</label>
                </div>

                <div>
                  <input
                    type="radio"
                    id="Intermidiate"
                    name="QuizDifficulty"
                    value="Medium"
                    onChange={(e) => handlechange(e)}
                  />
                  <label htmlFor="Intermidiate">Medium</label>
                </div>

                <div>
                  <input
                    type="radio"
                    id="Advanced"
                    name="QuizDifficulty"
                    value="Hard"
                    onChange={(e) => handlechange(e)}
                  />
                  <label htmlFor="Advanced">Hard</label>
                </div>
              </div>

              {/* Finaly a submit button  */}
              <div className="course-field-submit">
                <p className="uploadphoto">{err}</p>
                <div className="submit-btn">
                  <input
                    type="submit"
                    id="addquiz-btn"
                    className="addBtn"
                    onClick={handleSubmit}
                    value="Create Quiz"
                  />
                </div>
              </div>

              {/* The Task description  */}
              <br />
              <hr />
              <p className="assignedtaskpreviewdefine">
                <b>Task Description</b>
              </p>
              {assignTask ? (
                <div className="assignedtaskpreview">
                  <p className="asstskdecp">
                    {assignTask.ChapterDescription}
                  </p>

                  {/* More Details of Task  */}
                  <div className="assignedtaskpreview_inner">
                    <p>
                      <b>Chapter No : </b>
                      <br />
                      {assignTask.ChapterNo}
                    </p>
                    <p>
                      <b>Chapter Name : </b>
                      <br />
                      {assignTask.ChapterName}
                    </p>
                    <p>
                      <b>Subject : </b>
                      <br />
                      {assignTask.Subject}
                    </p>
                    <p>
                      <b>Board : </b>
                      <br />
                      {assignTask.Board}
                    </p>
                    <p>
                      <b>Class : </b>
                      <br />
                      {assignTask.Class}
                    </p>
                    <p>
                      <b>Due Date : </b>
                      <br />
                      {assignTask.DueDate}
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </>
    );
  }
}
