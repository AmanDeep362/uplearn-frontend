import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import data from "./CoursesCards.json";
import { GiNetworkBars } from "react-icons/gi";
import StarRatings from "react-star-ratings";
import { useSelector } from "react-redux";
import avtar from "../../assets/images/avtar.png";
import axios from "axios";
import BannerGirl from "../../assets/images/couse-banner-student.png";

import { MdNotStarted, MdArrowForward } from "react-icons/md";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Loader from "../Loader";

var CryptoJS = require("crypto-js");

function Courses() {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  let navigate = useNavigate();

  const [courseData, setCourseData] = useState([]);
  const [InstructorInfo, setInstructorInfo] = useState([]);
  const [User, setUser] = useState([]);
  const loginDetails = useSelector((state) => state.userReducers);
  const [Loading, setLoading] = useState(true);

  let squares = [];

  const STARRATING = (props) => {
    let totalRating = 0;
    if (props) {
      if (props.item.Rating && props.item.Rating.length > 0) {
        props.item.Rating.map((item) => {
          totalRating += item.rating;
        });
        totalRating /= props.item.Rating.length;
        totalRating = Math.round(totalRating * 10) / 10;
      }
      return (
        <>
          <StarRatings
            rating={totalRating}
            starDimension="20px"
            starEmptyColor="#aaa"
            starRatedColor="#2b4eff"
            starSpacing="3px"
          />{" "}
          {"(" + totalRating + ")"}
        </>
      );
    }
  };

  for (let i = 0; i < 20; i++) {
    squares.push(i);
  }

  const generateRandomNum = ({ min, max }) =>
    Math.floor(Math.random() * (max - min + 1) + min);

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

    // Fetching add Courses Info to present on screen
    const fetchcourses = async () => {
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
    fetchcourses();

    const fetchInstructor = async () => {
      await axios
        .get("/allInstructor")
        .then((response) => {
          setInstructorInfo(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          navigate("/login");
        });
    };
    fetchInstructor();
  }, [loginDetails.userRole, loginDetails.isLoggedIn, navigate]);

  const CourseInstructor = (props) => {
    const courseInstructor = InstructorInfo.find((e) => e._id === props.id);
    if (courseInstructor) {
      return (
        <>
          <img src={courseInstructor.image} alt="inst" />
          <span>{courseInstructor.Teachername}</span>
        </>
      );
    } else {
      return (
        <>
          <img src={avtar}></img>
          <span>Instructor</span>
        </>
      );
    }
  };

  // Start of Main Container To present Courses
  if (Loading) {
    return <Loader />;
  } else {
    return (
      <>
        <div className="course-main-comtainer">
          {/* The Banner Of Course  */}
          <div className="intro">
            <div className="squares-wrapper">
              {/* Left Side Banner Text  */}
              <div className="banner-text">
                <h1>
                  Develop a Passion for <br /> Learning New Things
                </h1>
                <p>
                  {" "}
                  Learn Free from world class Instuctors and Upgrade your skills{" "}
                </p>
                <button className="course-banner-btn">
                  Start Learning <MdNotStarted />{" "}
                </button>
              </div>
              {/* Right Side Banner Image  */}
              <div className="banner-img">
                <img src={BannerGirl} alt="banner" />
              </div>
              {/* Bubble Banner Animtion  */}
              <ul className="squares">
                {squares.map((el, i) => {
                  const randomDimensions = Math.floor(
                    Math.random() * (150 - 15 + 1) + 15
                  );
                  return (
                    <li
                      key={i}
                      style={{
                        left: `${generateRandomNum({ min: 0, max: 90 })}%`,
                        width: randomDimensions,
                        height: randomDimensions,
                        animationDelay: `${
                          i % 2 ? generateRandomNum({ min: 0, max: 20 }) : 0
                        }s`,
                        animationDuration: `${generateRandomNum({
                          min: 10,
                          max: 50,
                        })}s`,
                      }}
                    />
                  );
                })}
              </ul>
            </div>
          </div>
          {/* end of Banner  */}

          {/* Category slider */}
          <div className="category-slider">
            <div className="category-slider-header">
              <h2>Popular Topics to Learn</h2>
              <p>Browse with Categories</p>
            </div>
            <Carousel
              responsive={responsive}
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={2000}
            >
              {data.map((item) => (
                <div key={item.id} className="category-card">
                  <Link to={item.Link}>
                    <div className="category-card-icon">
                      <img src={item.image} alt="icons" />
                    </div>
                    <div className="category-card-text">
                      <h2>{item.heading}</h2>
                    </div>
                    <div className="category-card-forward">
                      <MdArrowForward />
                    </div>
                  </Link>
                </div>
              ))}
            </Carousel>
          </div>
          <hr />

          {/* Start Presenting Main courses data */}
          <div className="courses-list-container">
            <div className="courses-list-header">
              <h1>Top Recommended Courses</h1>
            </div>
            <p>
              <b>Total Courses : {courseData.length}</b>
            </p>
            <div className="course-list-card-container" data-aos="fade-right">
              {courseData.map((item) => {
                return (
                  <>
                    <div className="course-list-card">
                      <div className="course-card-img">
                        <img src={item.thumbnail} alt={item.title} />
                      </div>

                      <div className="course-card-body">
                        <span className="course-card-level">
                          {item.level} <GiNetworkBars />
                        </span>

                        <div className="course-card-title">
                          <h3>{item.title}</h3>
                        </div>
                        <hr />

                        <div className="course-card-footer">
                          <Link
                            className="course-card-btn-link"
                            to={"/course/" + item._id}
                          >
                            Know More{" "}
                          </Link>
                        </div>

                        <div className="cours-card-instructor">
                          <CourseInstructor id={item.courseInstructor} />
                        </div>
                        <div className="card-rating">
                          <STARRATING item={item} />
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Courses;
