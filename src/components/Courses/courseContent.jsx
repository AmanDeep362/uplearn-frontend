import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { BiArrowBack } from "react-icons/bi";

import ArticleContent from "./CourseContent/Articles";
import CourseCertificate from "./CourseContent/CourseCertificate";
import QuizesContent from "./CourseContent/Quizes";
import VideosContent from "./CourseContent/Video";

import axios from "axios";
import Loader from "../Loader";

var CryptoJS = require("crypto-js");

export default function CourseContent() {
  const loginDetails = useSelector((state) => state.userReducers);
  let navigate = useNavigate();
  let { id } = useParams();

  const [courseData, setCourseData] = useState({});
  const [User, setUser] = useState({});

  // States to handle component changes in page
  const [articleShow, setarticleShow] = useState(true);
  const [videoShow, setvideoShow] = useState(false);
  const [quizShow, setquizShow] = useState(false);
  const [CertificateShow, setCertificateShow] = useState(false);

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
            setUser(response.data);
          })
          .catch((error) => {
            console.log(error);
            navigate("/login");
          });
      };
      fetchdata();
    } else if (Number(loginDetails.isLoggedIn) && role === "STUDENT") {
      const fetchdata = async () => {
        await axios
          .get("/aboutStudents")
          .then((response) => {
            setUser(response.data);
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
    setCertificateShow(false);
  };

  const handleVideoShow = () => {
    setarticleShow(false);
    setvideoShow(true);
    setquizShow(false);
    setCertificateShow(false);
  };

  const handleQuizShow = () => {
    setarticleShow(false);
    setvideoShow(false);
    setquizShow(true);
    setCertificateShow(false);
  };

  const handleCertificateShow = () => {
    setarticleShow(false);
    setvideoShow(false);
    setquizShow(false);
    setCertificateShow(true);
  };

  // console.log(courseData, User);

  let isEnrolled = "";

  if (User.CousesEnrolled) {
    isEnrolled = User.CousesEnrolled.find((i) => i.CourseId === courseData._id);
    if (isEnrolled) {
      return (
        <>
          {/* This Link Heading to return back  */}
          <div className="add-course-header">
            <Link to="/courses">
              <BiArrowBack className="backBtn" style={{ color: "white" }} />
            </Link>
          </div>
          {/* The Linker Page to navigate the components  */}
          <div className="course-content-navbar">
            <h1>{courseData.title}</h1>
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

              <button
                onClick={handleCertificateShow}
                className={CertificateShow ? "bt-active" : ""}
              >
                Certificate
              </button>
            </div>
          </div>

          {/* Showing Article if Article is Active  */}
          {articleShow && <ArticleContent course={courseData} />}

          {/* Showing Video if Video is Active  */}
          {videoShow && <VideosContent videos={courseData} />}

          {/* Showing Quiz if Quiz is Active  */}
          {quizShow && <QuizesContent quiz={courseData} userData={User} />}

          {/* Showing Certificate if Certificate is Active  */}
          {CertificateShow && <CourseCertificate />}
        </>
      );
    } else {
      return (
        <Loader />
      );
    }
  } else {
    return (
      <Loader />
    );
  }
}
