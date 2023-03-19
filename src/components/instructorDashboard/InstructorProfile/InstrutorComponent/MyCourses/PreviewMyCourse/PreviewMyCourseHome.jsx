import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { BiArrowBack } from "react-icons/bi";

import ArticleContent from "./TaskArticles";
import QuizesContent from "./TaskQuiz";
import VideosContent from "./TaskVideo";

import axios from "axios";
import Loader from "../../../../../Loader";

var CryptoJS = require("crypto-js");

export default function InstPreviewMyCourseHome() {
  const loginDetails = useSelector((state) => state.userReducers);
  let navigate = useNavigate();
  const { id } = useParams();

  const [courseData, setCourseData] = useState({});
  const [instructor, setinstructor] = useState({});

  // States to handle component changes in page
  const [articleShow, setarticleShow] = useState(true);
  const [videoShow, setvideoShow] = useState(false);
  const [quizShow, setquizShow] = useState(false);

  useEffect(() => {
    window.scroll(0, 0);
    // Decrypting the User Role
    if (loginDetails.userRole !== "") {
      var bytes = CryptoJS.AES.decrypt(
        loginDetails.userRole,
        "my-secret-key@123"
      );
      var role = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }

    if (Number(loginDetails.isLoggedIn) && role === "INSTRUCTOR") {
      const fetchdata = async () => {
        await axios
          .get("/aboutInstructor")
          .then((response) => {
            setinstructor(response.data);
          })
          .catch((error) => {
            console.log(error);
            navigate("/login");
          });
      };
      fetchdata();
    } else if (Number(loginDetails.isLoggedIn) && role === "STUDENT") {
      navigate("/studentdashboard");
    } else {
      navigate("/login");
    }

    // Fetching the Course Detail
    const fetchcourse = async () => {
      await axios
        .get("/Instructorcourse/" + id)
        .then((response) => {
          setCourseData(response.data[0]);
        })
        .catch((error) => {
          console.log(error);
          navigate("/login");
        });
    };
    fetchcourse();
  }, [loginDetails.userRole, loginDetails.isLoggedIn, navigate, id]);

  // Component Show / Hide function
  const handleArticleShow = () => {
    setarticleShow(true);
    setvideoShow(false);
    setquizShow(false);
  };

  const handleVideoShow = () => {
    setarticleShow(false);
    setvideoShow(true);
    setquizShow(false);
  };

  const handleQuizShow = () => {
    setarticleShow(false);
    setvideoShow(false);
    setquizShow(true);
  };

//   console.log(courseData);

  if (courseData) {
    return (
      <>
        {/* This Link Heading to return back  */}
        <div className="add-course-header">
          <Link to="/instructordashboard/my-courses">
            <BiArrowBack className="backBtn" style={{ color: "white" }} />
          </Link>
        </div>
        {/* The Linker Page to navigate the components  */}
        <div className="course-content-navbar">
          <h1>{courseData.ChapterName}</h1>
          {/* Buttons to make video, text and quiz visible at different time  */}
          <div className="edit-course-container-btnchanger">
            <button
              onClick={handleArticleShow}
              className={articleShow ? "bt-active" : ""}
            >
              Articles
            </button>
            <button
              onClick={handleVideoShow}
              className={videoShow ? "bt-active" : ""}
            >
              Videos
            </button>
            <button
              onClick={handleQuizShow}
              className={quizShow ? "bt-active" : ""}
            >
              Quiz
            </button>
          </div>
        </div>

        {/* Showing Article if Article is Active  */}
        {articleShow && <ArticleContent course={courseData} id={id} />}

        {/* Showing Video if Video is Active  */}
        {videoShow && <VideosContent videos={courseData} />}

        {/* Showing Quiz if Quiz is Active  */}
        {quizShow && <QuizesContent quiz={courseData} />}
      </>
    );
  } else {
    return <Loader />;
  }
}
