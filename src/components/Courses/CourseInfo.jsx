import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdArrowForward } from "react-icons/md";
import StarRatings from "react-star-ratings";
import avtar from "../../assets/images/avtar.png";
import axios from "axios";
import Loader from "../Loader";

var CryptoJS = require("crypto-js");

export default function CourseInfo() {
  const loginDetails = useSelector((state) => state.userReducers);
  let navigate = useNavigate();
  let { id } = useParams();

  const [courseData, setCourseData] = useState({});
  const [InstructorInfo, setInstructorInfo] = useState([]);
  const [User, setUser] = useState({});
  const [courserating, setcourseRating] = useState(0);
  const [Loading, setLoading] = useState(true);

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

    // Fetching Detail of all available Instructors
    const fetchInstructor = async () => {
      await axios
        .get("/allInstructor")
        .then((response) => {
          setInstructorInfo(response.data);
        })
        .catch((error) => {
          console.log(error);
          navigate("/login");
        });
    };
    fetchInstructor();

    // Fetching Data of a Single Course details of item id
    const fetchdata = async () => {
      await axios
        .get("/Instructorcourse/" + id)
        .then((response) => {
          setCourseData(response.data[0]);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          navigate("/login");
        });
    };
    fetchdata();
  }, [loginDetails.userRole, loginDetails.isLoggedIn, navigate, id]);

  // console.log(courseData, User);

  let Instructor = InstructorInfo.find(
    (i) => i._id === courseData.courseInstructor
  );

  // Finding the No of video, article and quiz in course
  let NoOfVideos = 0;
  let NoOfArticles = 0;
  let NoOfQuizes = 0;

  if (
    courseData.courseVideoContent &&
    courseData.courseArticles &&
    courseData.courseQuiz
  ) {
    NoOfVideos = courseData.courseVideoContent.length;
    NoOfArticles = courseData.courseArticles.length;
    NoOfQuizes = courseData.courseQuiz.length;
  }

  // Route to Enroll teacher and Students for that course
  const EnrollCourse = async () => {
    const userId = User._id;
    const CourseId = courseData._id;
    const nameOfCourse = courseData.title;

    if (loginDetails.userRole !== "") {
      var bytes = CryptoJS.AES.decrypt(
        loginDetails.userRole,
        "my-secret-key@123"
      );
      var role = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }

    if (Number(loginDetails.isLoggedIn) && role === "INSTRUCTOR") {
      const res = await fetch("/EnrolledCourseTeacher", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          CourseId,
          nameOfCourse,
        }),
      });

      if (res.status === 200) {
        navigate("/instructordashboard");
      } else {
        console.log(res);
        window.alert("error occured");
      }
    } else if (Number(loginDetails.isLoggedIn) && role === "STUDENT") {
      const res = await fetch("/EnrolledCourse", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          CourseId,
          nameOfCourse,
        }),
      });

      if (res.status === 200) {
        navigate("/studentdashboard/my-courses");
      } else {
        console.log(res);
        window.alert("error occured");
      }
    }
  };

  // Check the User Is already Enrolled in Course Or Not
  const CheckEnrolled = () => {
    let isEnrolled = "";
    console.log(courseData);
    if (User.CousesEnrolled) {
      isEnrolled = User.CousesEnrolled.find(
        (i) => i.CourseId === courseData._id
      );
      if (isEnrolled) {
        if(courseData){
          if (courseData.TotalEnrolled) {
            
              return (
                <>
                <Link to={"/mycourses/start-learning/" + id}>
                  <button>Start Learning</button>
                </Link>
                <span>Total Enrolled : {courseData.TotalEnrolled}</span>
                </>
              );
          }
          else{
            return (
              <Link to={"/mycourses/start-learning/" + id}>
                <button>Start Learning</button>
              </Link>
            );
          }
        }
        
      } else {
        if (courseData) {
          if (courseData.TotalEnrolled) {
            
              return (
                <>
                  <button onClick={EnrollCourse}>
                    Enroll <MdArrowForward />
                  </button>
                  <span>Total Enrolled :  {courseData.TotalEnrolled}</span>
                </>
              );
            
          }
          else{
            return(
              <button onClick={EnrollCourse}>
                  Enroll <MdArrowForward />
                </button>
            )
          }
        }
      }
    } else {
      return (
        <button onClick={EnrollCourse}>
          Enroll <MdArrowForward />
        </button>
      );
    }
  };
  // ---------------------------------------------- //

  // Function To review the Course of Instructor
  const CourseReview = () => {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const [err, seterr] = useState("");

    let courseId = courseData._id;
    let UserId = User._id;
    let totalRating = 0;

    if (courseData) {
      if (courseData.Rating) {
        if (courseData.Rating.length > 0) {
          courseData.Rating.map((item) => {
            totalRating += item.rating;
          });
          totalRating /= courseData.Rating.length;
          totalRating = Math.round(totalRating * 10) / 10;
          setcourseRating(totalRating);
        }
      }
    }

    const handleRating = (rate) => {
      setRating(rate);
    };

    const sendReview = async () => {
      if (rating < 1) {
        seterr("Please give rating between 1-5");
      } else if (!review) {
        seterr("Please give review to the course");
      } else {
        let isRating = [];
        if (courseData.Rating) {
          isRating = courseData.Rating.find((i) => i.rateBy === User._id);
          if (isRating) {
            seterr("Already Rating to Course");
          } else {
            const res = await fetch("/CourseRating", {
              method: "POST",
              headers: {
                "content-Type": "application/json",
              },
              body: JSON.stringify({
                courseId,
                UserId,
                rating,
                review,
              }),
            });

            if (res.status === 200) {
              seterr("Thank you for Rating.\nRating Succesfull!");
              navigate("/courses");
            } else {
              console.log(res);
              window.alert("error occured");
            }
          }
        } else {
          const res = await fetch("/CourseRating", {
            method: "POST",
            headers: {
              "content-Type": "application/json",
            },
            body: JSON.stringify({
              courseId,
              UserId,
              rating,
              review,
            }),
          });

          if (res.status === 200) {
            seterr("Thankyou for Rating .\nRating Succesfull!");
          } else {
            console.log(res);
            window.alert("error occured");
          }
        }
      }
    };

    let isEnrolled = "";
    if (User.CousesEnrolled) {
      isEnrolled = User.CousesEnrolled.find(
        (i) => i.CourseId === courseData._id
      );
      if (isEnrolled) {
        return (
          <div className="course-review">
            <h2>Review this Course</h2>
            <StarRatings
              rating={rating}
              starRatedColor="#2b4eff"
              changeRating={handleRating}
              numberOfStars={5}
              starHoverColor="#2b4eff"
              name="rating"
              starDimension="24px"
            />
            <div className="add-course-Input">
              <label htmlFor="course Review">Review :</label>
              <br />
              <input
                type="text"
                name="couseReview"
                className="review-course-inputbox"
                required
                placeholder="Enter Your Reviews About Course"
                onChange={(e) => setReview(e.target.value)}
              />
            </div>
            <div className="enroll-course-btn">
              <p className="star">{err}</p>
              <button onClick={sendReview}>Send Review</button>
            </div>
          </div>
        );
      } else {
        return <></>;
      }
    } else {
      return <></>;
    }
  };

  if (Loading) {
    return <Loader />;
  } else {
    return (
      <div className="course-info-main-container">
        {/* The main Conatiner of Course  */}
        <div className="course-info-banner-container">
          {/* Heading Banner of Course   */}
          <div className="banner-left">
            {/* Heading Tags in span  */}
            <span className="course-info-category">
              {courseData.courseCategory}
            </span>
            <span className="course-info-category-2">{courseData.level}</span>
            {/* Title of the Course  */}
            <h1>{courseData.title}</h1>
            {/* Objective of the Course  */}
            <p>{courseData.courseojective}</p>

            {/* Showing the Instructor Profile and Course rating  */}
            <div className="InstructorDetails">
              <div className="instructo-info-container">
                <img src={Instructor ? Instructor.image : avtar} alt="" />
                <span>
                  {Instructor ? Instructor.Teachername : "Instructor"}
                </span>
              </div>
              <div className="card-rating">
                <StarRatings
                  rating={courserating}
                  starDimension="20px"
                  starEmptyColor="#aaa"
                  starRatedColor="#2b4eff"
                  starSpacing="3px"
                />
                <span>{courserating}</span>
              </div>
            </div>
            <div className="enroll-course-btn">
              <CheckEnrolled />
            </div>
          </div>
          {/* Styling the Right Side Course Image  */}
          <div className="banner-right">
            <img
              className="course-info-banner-image"
              src={courseData.thumbnail}
              alt="MyCourse"
            />
          </div>
        </div>

        {/* Styling the Description are of course  */}
        <div className="course-info-Description-container">
          <h1>Course Overview</h1>
          {/* Description Box  */}
          <div className="course-info-Description">
            {/* The Description Area  */}
            <div
              dangerouslySetInnerHTML={{ __html: courseData.Description }}
              className="course-info-description-content"
            ></div>

            {/* The Course Detail Area  */}
            <div className="course-other-detail-card">
              <h3>Free</h3>
              <ul>
                <li>
                  Course Level &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: &nbsp;
                  {courseData.level}
                </li>
                <hr />
                <li>Video Lectures &nbsp;: &nbsp;{NoOfVideos} </li>
                <hr />
                <li>
                  Articles&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:{" "}
                  &nbsp;{NoOfArticles}{" "}
                </li>
                <hr />
                <li>
                  Quizes
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:{" "}
                  &nbsp;{NoOfQuizes}{" "}
                </li>
                <hr />
                <li>
                  Language
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:{" "}
                  &nbsp;
                  {courseData.language}
                </li>
                <hr />
              </ul>
            </div>
          </div>
        </div>

        {/* Making the Review Box */}
        <div className="courses-review-container">
          <CourseReview />
        </div>
      </div>
    );
  }
}
