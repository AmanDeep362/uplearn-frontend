import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BiArrowBack } from "react-icons/bi";
import { HiOutlineExternalLink } from "react-icons/hi";
import Loader from "../../Loader";
import axios from "axios";

var CryptoJS = require("crypto-js");

export default function LectureContent() {
  const params = useParams();
  const board = params.board;
  const classe = params.class;
  const subject = params.subject;

  const loginDetails = useSelector((state) => state.userReducers);
  let navigate = useNavigate();

  const [User, setUser] = useState({});
  const [lecture, setlecture] = useState({});
  const [Loading, setLoading] = useState(true);

  const [classes, setclasses] = useState(classe);
  const [boards, setboards] = useState(board);
  const [subjects, setsubjects] = useState(subject);

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
  }, [loginDetails.userRole, loginDetails.isLoggedIn, navigate]);

  useEffect(() => {
    // Fetch the course Data
    const fetchdata = async () => {
      await fetch("/instructorTaskDataFetchForBoardClassSub", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          board,
          classe,
          subject,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          data.sort((a, b) => a.ChapterNo - b.ChapterNo);
          setlecture(data);
          setLoading(false);
        });
    };
    fetchdata();
  }, [board, classe, subject]);

  // console.log(lecture);
  const navigateMyLecture = () => {
    if(!classes || !boards || !subjects){
      window.alert("Please select all fileds.")
    }
    else{
      navigate(`/my-lectures/${boards}/${classes}/${subjects}`);
    }
  }

  if (Loading) {
    return <Loader />;
  } else {
    return (
      <>
        {/* This Link Heading to return back  */}
        <div className="add-course-header">
          <Link to="/my-lectures">
            <BiArrowBack className="backBtn" style={{ color: "white" }} />
          </Link>
        </div>
        {/* The Linker Page to navigate the components  */}
        <div className="course-content-navbar">
          <h1>My Lecture</h1>
          <h4 className="change-my-lect">Change Lecture</h4>
          {/* Buttons to make video, text and quiz visible at different time  */}
          <div className="my-lecture-show-changer">
            {/* Select Class  */}
            <div className="inputField">
              <select
                id="bookclass"
                name="bookclass"
                value={classes}
                required
                onChange={(e) => {
                  setclasses(e.target.value);
                }}
              >
                <option value="">Select class</option>
                <option value="1">Class 1</option>
                <option value="2">Class 2</option>
                <option value="3">Class 3</option>
                <option value="4">Class 4</option>
                <option value="5">Class 5</option>
                <option value="6">Class 6</option>
                <option value="7">Class 7</option>
                <option value="8">Class 8</option>
                <option value="9">Class 9</option>
                <option value="10">Class 10</option>
                <option value="11">Class 11</option>
                <option value="12">Class 12</option>
              </select>
            </div>
            <p>&nbsp;&nbsp;</p>
            {/* Select Board of Leacture  */}
            <div className="inputField">
              <select
                id="bookboard"
                name="bookboard"
                value={boards}
                required
                onChange={(e) => {
                  setboards(e.target.value);
                }}
              >
                <option value="">Select Board</option>
                <option value="CBSE">CBSE</option>
                <option value="ICSE">ICSE</option>
                <option value="HaryanaBoard">Haryana Board</option>
                <option value="UPBoard">UP Board</option>
                <option value="RajasthanBoard">Rajasthan Board</option>
                <option value="PunjabBoard">Punjab Board</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <p>&nbsp;&nbsp;</p>
            {/* Select Subject of course  */}
            <div className="inputField">
              <select
                id="bookclass1"
                name="bookclass"
                value={subjects}
                required
                onChange={(e) => {
                  setsubjects(e.target.value);
                }}
              >
                <option value="">Select Exam</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Science">Science</option>
                <option value="Hindi">Hindi</option>
                <option value="English">English</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
                <option value="Computer">Computer</option>
                <option value="History">History</option>
                <option value="Civics">Civics</option>
                <option value="Economics">Economics</option>
                <option value="Accounts">Accounts</option>
                <option value="Commerce">Commerce</option>
                <option value="Art">Art</option>
                <option value="Music">Music</option>
                <option value="Social Studies">Social Studies</option>
                <option value="Environmental Science">
                  Environmental Science
                </option>
                <option value="Physical Education">Physical Education</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Button to navigate to new link  */}
            <button onClick={navigateMyLecture}>Go</button>
          </div>

          {/* My Lecture Detail  */}
          {lecture.length ? (
            <div className="article-content-container">
              <h2 className="styling-lecture-hreader">
                Lecture for {board} board, {classe} class, {subject}
              </h2>
              <ul>
                {lecture.map((item, index) => (
                  <div key={index}>
                    <li>
                      <Link
                        to={"/my-lecture/data/" + item._id}
                        className="my-lecture-links-content"
                      >
                        {"Chapter " + item.ChapterNo + " : "} &nbsp;{" "}
                        {item.ChapterName}
                        <span className="left-icon-article">
                          {" "}
                          <HiOutlineExternalLink />
                        </span>
                      </Link>
                    </li>
                  </div>
                ))}
              </ul>
            </div>
          ) : (
            <div className="not-available-incourse">
              <h1>No Lecture Available</h1>
            </div>
          )}
        </div>
      </>
    );
  }
}
