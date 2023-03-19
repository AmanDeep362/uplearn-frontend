import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { BiArrowBack } from "react-icons/bi";

import ArticleContent from "./TaskArticles";
import ReviewTaskAdmin from "./TaskReview";
import QuizesContent from "./TaskQuiz";
import VideosContent from "./TaskVideo";

import axios from "axios";
import Loader from "./../../Loader";

export default function ReviewInstructorTaskHome() {
  let navigate = useNavigate();
  const adminstatus = useSelector((state) => state.AdminReducers);
  let { id } = useParams();

  const [courseData, setCourseData] = useState({});
  const [adminInfo, setadminInfo] = useState("");

  // States to handle component changes in page
  const [articleShow, setarticleShow] = useState(true);
  const [videoShow, setvideoShow] = useState(false);
  const [quizShow, setquizShow] = useState(false);
  const [ReviewShow, setReviewShow] = useState(false);

  useEffect(() => {
    window.scroll(0, 0);
    // Check is Admin Login Or Not
    if (Number(adminstatus.isAdminLoggedIn)) {
      // call the fetch admin detail function
      const fetchdata = async () => {
        await axios
          .get("/aboutAdminActive")
          .then((response) => {
            setadminInfo(response.data);
          })
          .catch((error) => {
            console.log(error);
            navigate("/admin-portal-login-190310554227");
          });
      };
      fetchdata();
    }
    // If User is not login redirect to login
    else {
      navigate("/admin-portal-login-190310554227");
    }

    // Fetching the Course Detail
    const fetchcourse = async () => {
      await axios
        .get("/instructorTaskDataFetch/" + id)
        .then((response) => {
          setCourseData(response.data[0]);
        })
        .catch((error) => {
          console.log(error);
          navigate("/login");
        });
    };
    fetchcourse();
  }, [adminstatus.isAdminLoggedIn, navigate, id]);

  // Component Show / Hide function
  const handleArticleShow = () => {
    setarticleShow(true);
    setvideoShow(false);
    setquizShow(false);
    setReviewShow(false);
  };

  const handleVideoShow = () => {
    setarticleShow(false);
    setvideoShow(true);
    setquizShow(false);
    setReviewShow(false);
  };

  const handleQuizShow = () => {
    setarticleShow(false);
    setvideoShow(false);
    setquizShow(true);
    setReviewShow(false);
  };

  const handleCertificateShow = () => {
    setarticleShow(false);
    setvideoShow(false);
    setquizShow(false);
    setReviewShow(true);
  };

//   console.log(courseData);

  if (courseData) {
    return (
      <>
        {/* This Link Heading to return back  */}
        <div className="add-course-header">
          <Link to="/admin-portal-review-assign-task-190310554227">
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

            <button
              onClick={handleCertificateShow}
              className={ReviewShow ? "bt-active" : ""}
            >
              Review
            </button>
          </div>
        </div>

        {/* Showing Article if Article is Active  */}
        {articleShow && <ArticleContent course={courseData} />}

        {/* Showing Video if Video is Active  */}
        {videoShow && <VideosContent videos={courseData} />}

        {/* Showing Quiz if Quiz is Active  */}
        {quizShow && <QuizesContent quiz={courseData} />}

        {/* Showing Certificate if Certificate is Active  */}
        {ReviewShow && <ReviewTaskAdmin teacher={courseData}/>}
      </>
    );
  } else {
    return <Loader />;
  }
}
