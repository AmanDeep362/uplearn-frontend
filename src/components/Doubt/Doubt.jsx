import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {  MdSearch } from "react-icons/md";
import { BiUser, BiTime } from "react-icons/bi";
import { HiThumbUp } from "react-icons/hi";
import { RiQuestionAnswerFill } from "react-icons/ri";
import axios from "axios";
import Loader from "../Loader";
import BannerGirl from "../../assets/images/askdoubtbanners.png";

var CryptoJS = require("crypto-js");

export default function Doubt() {
  const loginDetails = useSelector((state) => state.userReducers);
  let navigate = useNavigate();

  // states
  let squares = [];
  const [User, SetUser] = useState({});
  const [searchtext, setSearchtext] = useState("");
  const [isLoading, setisLoading] = useState(true);
  const [dfilter, setDFilter] = useState("");
  for (let i = 0; i < 20; i++) {
    squares.push(i);
  }

  const generateRandomNum = ({ min, max }) =>
    Math.floor(Math.random() * (max - min + 1) + min);
  const [doubtData, setDoubtData] = useState({
    UserId: "",
    userName: "",
    Title: "",
    Subject: "",
    Description: "",
    Upvotes: [],
    CreatedAt: "",
    comments: [
      {
        userId: "",
        userName: "",
        comment: "",
        CreatedAt: "",
      },
    ],
  });
  const [bdoubtData, setbDoubtData] = useState({
    UserId: "",
    userName: "",
    Title: "",
    Subject: "",
    Description: "",
    Upvotes: [],
    CreatedAt: "",
    comments: [
      {
        userId: "",
        userName: "",
        comment: "",
        CreatedAt: "",
      },
    ],
  });
  // states end

  // useffects start
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
    // Check is  Login Or Not
    if (Number(loginDetails.isLoggedIn) && role === "INSTRUCTOR") {
      // call the fetch admin detail function
      const fetchdata = async () => {
        await axios
          .get("/aboutInstructor")
          .then((response) => {
            SetUser(response.data);
          })
          .catch((error) => {
            console.log(error);
            navigate("/login");
          });
      };
      fetchdata();
    } else if (Number(loginDetails.isLoggedIn) && role === "STUDENT") {
      // call the fetch admin detail function
      const fetchdata = async () => {
        await axios
          .get("/aboutStudents")
          .then((response) => {
            SetUser(response.data);
          })
          .catch((error) => {
            console.log(error);
            navigate("/login");
          });
      };
      fetchdata();
    }
    // If User is not login redirect to login
    else {
      navigate("/login");
    }

    // For Doubts fetching
    const fetchDoubts = async () => {
      await axios
        .get("/doubts_data")
        .then((response) => {
          setDoubtData(response.data);
          setbDoubtData(response.data);
          setisLoading(false);
        })
        .catch((error) => {
          console.log(error);
          navigate("/login");
        });
    };
    fetchDoubts();
  }, [loginDetails.isLoggedIn, loginDetails.userRole, navigate]);
  // useffects end

  const handleask = () => {
    navigate("/post-doubt");
  };

  const handleCardClick = (id) => {
    navigate(`/ask-doubt/${id}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const tempda = bdoubtData.filter((item) => {
      return (
        item.Title.toLowerCase().includes(searchtext.toLowerCase()) ||
        item.Subject.toLowerCase().includes(searchtext.toLowerCase())
      );
    });
    setDoubtData(tempda);
  };

  const handleDFilter = (e) => {
    let tempdaa = bdoubtData;
    if (e.target.value === "latest") {
      tempdaa.sort(
        (a, b) =>
          new Date(b.CreatedAt).getTime() - new Date(a.CreatedAt).getTime()
      );
    } else if (e.target.value === "likes") {
      tempdaa.sort((a, b) => b.Upvotes.length - a.Upvotes.length);
    } else {
      tempdaa = bdoubtData;
    }
    setDoubtData(tempdaa);
    setDFilter(e.target.value);
  };

  // main function start
  if (isLoading) {
    return <Loader />;
  } else {
    return (
      <>
        <div className="doubt-container">
          <div className="intro">
            <div className="squares-wrapper">
              {/* Left Side Banner Text  */}
              <div className="banner-text">
                <h1>
                  Millions saw the apple fall,
                  <br />
                  but Newton asked why
                </h1>
                <p>
                  {" "}
                  We are here to help you find answers to all your questions!{" "}
                </p>
                <button
                  className="course-banner-btn"
                  onClick={console.log("hello")}
                >
                  Ask Your Doubt
                </button>
              </div>
              {/* Right Side Banner Image  */}
              <div className="banner-img" style={{ padding: "1.25rem 0.75rem" }}>
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
          {/* heading */}
          <br />
          <div className="Doubt-heading">
            <h1>Uplearn Ask Doubt</h1>
            <p>
              Here you can clear your doubt and get the answer from the
              instructors.
            </p>
          </div>

          {/* search bar */}
          <div className="doubt-filter-container">
            <div className="DoubtSearch">
              <input
                list="doubt-search"
                name="DoubtSearch"
                placeholder="Type your querie here..."
                value={searchtext}
                onChange={(e) => setSearchtext(e.target.value)}
              />
              <button onClick={handleSearch}>
                <i>
                  <MdSearch />
                </i>{" "}
                Search
              </button>
            </div>
          </div>

          {/* ask button */}
          <div className="askbutton">
            <select value={dfilter} onChange={handleDFilter}>
              <option value="">Filter Doubts</option>
              <option value="latest">Latest First</option>
              <option value="likes">Most Likes</option>
            </select>
            <button onClick={handleask}>Ask Your Doubt</button>
          </div>

          {/* main content */}
          <div className="doubt-body">
            <div className="doub-b-head">
              <h1> Doubts </h1>
            </div>
            {doubtData.length > 0 ? (
              doubtData.map((doubt, index) => {
                return (
                  <div
                    className="doubt-card"
                    key={doubt._id}
                    onClick={() => handleCardClick(doubt._id)}
                  >
                    <div className="doubt-card-header">Q {index+1}. &nbsp; {doubt.Title}</div>
                    <div className="doubt-card-body">
                      <div className="doubt-card-body-left">
                        Subject - {doubt.Subject}
                      </div>
                      <div className="doubt-card-body-right">
                        <span>
                          <HiThumbUp className="doub-ico" />{" "}
                          {doubt.Upvotes.length}
                        </span>
                        <span>
                          <RiQuestionAnswerFill className="doub-ico" />{" "}
                          {doubt.comments.length}
                        </span>
                      </div>
                    </div>
                    <div className="doubt-card-footer">
                      <div className="doubt-card-footer-left">
                        <span>
                          {" "}
                          <BiUser className="doub-ico" /> {doubt.userName}{" "}
                        </span>
                      </div>
                      <div className="doubt-card-footer-right">
                        <span>
                          {" "}
                          <BiTime className="doub-ico" />
                          {new Date(doubt.CreatedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="doubt-card">
                <h1>No Doubts Available</h1>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}
