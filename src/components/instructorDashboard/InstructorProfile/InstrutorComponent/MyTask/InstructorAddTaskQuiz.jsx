import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { BiArrowBack } from "react-icons/bi";
import Loader from "../../../../Loader";
import NotFoundImg from "../../../../../assets/images/not-found.png";
import axios from "axios";

var CryptoJS = require("crypto-js");

export default function InstructorAddTaskQuiz() {
  const loginDetails = useSelector((state) => state.userReducers);
  let navigate = useNavigate();

  const { id } = useParams();
  const [Instructor, setInstructor] = useState({});
  const [assignTask, setassignTask] = useState([]);
  const [isLoading, setisLoading] = useState(true);

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
        .get("/lecturedatapop/" + id)
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

  // console.log(assignTask);

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
              <div>
                {assignTask ? (
                  assignTask.lectureQuiz.length ? (
                    <div>
                      {/* Heading of Quiz Page  */}
                      <div className="edit-course-add-quiz-header">
                        <h2>My Quiz</h2>
                        <Link
                          to={
                            "/task-assign/add-lecture-quiz/add-new-quiz/" + id
                          }
                          className="edit-course-container-btn-new-quiz"
                        >
                          Add New Quiz
                        </Link>
                      </div>
                      {/* Quizes List  */}
                      <div className="edit-course-add-quiz-card-container">
                        {assignTask.lectureQuiz.map((item) => (
                          <div
                            key={item._id}
                            className="edit-add-quiz-card-inner-container"
                          >
                            <div className="edit-add-quiz-card-body">
                              <h3>{item.QuizeName}</h3>
                              <Link
                                className="my-quiz-Link"
                                to={
                                  "/task-assign/add-lecture-quiz/add-new-quiz/add-questions/" +
                                  id +
                                  "/" +
                                  item._id
                                }
                              >
                                Add Questions
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="edit-course-container-quiz">
                      <h2>Not any quiz in this course</h2>
                      <img src={NotFoundImg} alt="noQuiz" />
                      <Link
                        to={"/task-assign/add-lecture-quiz/add-new-quiz/" + id}
                        className="edit-course-container-btn-new-quiz"
                      >
                        Add New Quiz
                      </Link>
                    </div>
                  )
                ) : null}
              </div>

              {/* The Task description  */}
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
