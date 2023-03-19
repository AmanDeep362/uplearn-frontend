import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BiArrowBack } from "react-icons/bi";
import axios from "axios";
import Loader from "../Loader";

function AssignSyllbusTask() {
  let navigate = useNavigate();
  const adminstatus = useSelector((state) => state.AdminReducers);

  const { id } = useParams();
  const [teacher, setteacher] = useState([]);
  const [Loading, setLoading] = useState(true);

  // State for the Input text
  const [classes, setclasses] = useState("");
  const [subject, setsubject] = useState("");
  const [dob, setdob] = useState("");
  const [board, setboard] = useState("");

  const [name, setname] = useState("");
  const [chapter, setchapter] = useState(0);
  const [description, setdescription] = useState("");

  const [err, seterr] = useState("");

  useEffect(() => {
    window.scroll(0, 0);
    // Check is Admin Login Or Not
    if (Number(adminstatus.isAdminLoggedIn)) {
      // call the fetch admin detail function
      const fetchdata = async () => {
        await axios
          .get("/instructordetails/" + id)
          .then((response) => {
            setteacher(response.data);
            setLoading(false);
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
  }, [adminstatus.isAdminLoggedIn, navigate, id]);

  const AssignTaskToInstructor = async () => {
    const TeacherId = id;
    const Subject = subject;
    const Class = classes;
    const DueDate = dob;
    const Board = board;
    const ChapterName = name;
    const ChapterNo = chapter;
    const ChapterDescription = description;

    const res = await fetch("/AssignTaskToInstructor", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        TeacherId,
        Subject,
        Class,
        DueDate,
        Board,
        ChapterName,
        ChapterNo,
        ChapterDescription,
      }),
    });

    if (res.status === 200) {
      window.alert("Task Assign Successful.");
      navigate("/admin-portal-home-190310554227");
    } else {
      console.log(res);
      window.alert("Something Went Wrong, Try Later\nError Occured");
    }
  };

  const handleSubmit = () => {
    if (subject === "") {
      seterr("Please select a Subject Name.");
    } else if (classes === "") {
      seterr("Please select a Class.");
    } else if (dob === "") {
      seterr("Please assign Due Date of Task.");
    } else if (board === "") {
      seterr("Please select a Board.");
    } else if (name === "") {
      seterr("Please Enter the Chapter Name.");
    } else if (chapter <= 0) {
      seterr("Please provide a valid chapter number.");
    } else if (description === "") {
      seterr("Please add description of assigning task.");
    } else {
      AssignTaskToInstructor();
    }
  };

  if (Loading) {
    return <Loader />;
  } else {
    return (
      <>
        {/* The Container Of Login An instructor In Page  */}
        <div className="instructor">
          {/* Main Heading to Return  */}
          <div className="instructorHeader">
            <Link to="/admin-portal-assign-task-190310554227">
              <BiArrowBack className="backBtn" style={{ color: "white" }} />
            </Link>
          </div>
          {/* Showing Instructor Details  */}
          <div className="instructorWrapper">
            <div className="instructorForm">
                <h1>Assign Task</h1>
                
                {/* Asking user for the Details of task  */}
                <div className="fields">
                  {/* Select Class  */}
                  <div className="inputField">
                    <label htmlFor="bookclass">
                      <b>Select Class</b>
                      <span className="star">*</span>
                    </label>
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
                  {/* Select Board of Leacture  */}
                  <div className="inputField">
                    <label htmlFor="bookboard">
                      <b>Select Board</b>
                      <span className="star">*</span>
                    </label>
                    <select
                      id="bookboard"
                      name="bookboard"
                      value={board}
                      required
                      onChange={(e) => {
                        setboard(e.target.value);
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
                  {/* Select Subject of course  */}
                  <div className="inputField">
                    <label htmlFor="bookclass1">
                      <b>Select Subject</b>
                      <span className="star">*</span>
                    </label>
                    <select
                      id="bookclass1"
                      name="bookclass"
                      value={subject}
                      required
                      onChange={(e) => {
                        setsubject(e.target.value);
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
                      <option value="Physical Education">
                        Physical Education
                      </option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  {/* Select Due Date */}
                  <div className="inputField">
                    <label htmlFor="dob">
                      <b>Due Date</b>
                      <span className="star">*</span>
                    </label>
                    <input
                      type="date"
                      id="dob"
                      name="DOB"
                      value={dob}
                      onChange={(e) => {
                        setdob(e.target.value);
                      }}
                      required
                    />
                  </div>
                  {/* Enter Name of Chapter  */}
                  <div className="inputField">
                    <label htmlFor="name">
                      <b>Chapter Name</b>
                      <span className="star">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={name}
                      onChange={(e) => {
                        setname(e.target.value);
                      }}
                      required
                    />
                  </div>
                  {/* Enter Chapter No */}
                  <div className="inputField">
                    <label htmlFor="name">
                      <b>Chapter Number</b>
                      <span className="star">*</span>
                    </label>
                    <input
                      type="number"
                      id="chapter"
                      name="chapter"
                      value={chapter}
                      onChange={(e) => {
                        setchapter(e.target.value);
                      }}
                      required
                    />
                  </div>
                  {/* Enter Description of Chapter  */}
                  <div>
                    <label htmlFor="message">
                      <b>Breif Description of Chapter</b>
                      <span className="star">*</span>
                    </label>
                    <br />
                    <textarea
                      className="assignTasktextArea"
                      placeholder="Enter breif information about task or content of chapter"
                      name="info"
                      id="message"
                      cols="500"
                      rows="8"
                      value={description}
                      onChange={(e) => {
                        setdescription(e.target.value);
                      }}
                      required
                    />
                  </div>
                </div>
                {/* Submiting the Form  */}
                <div className="instructorRegisterBtn">
                  <div style={{ textAlign: "center" }}>
                    <p className="star">{err}</p>
                  </div>

                  <button
                    id="myinstBtn"
                    type="submit"
                    className="registerBtn"
                    onClick={handleSubmit}
                  >
                    Assign Task
                  </button>
                </div>
                    
                {/* Task Tssign To  */}
                <br />
                <hr />
                <h2 style={{margin: '8px'}}>Task Assign To Instructor</h2>
                <div className="fields instructor-info-fTask">
                  <p>
                    <b>ID : </b>
                    {teacher.teacher_id}
                  </p>
                  <p>
                    <b>Name : </b>
                    {teacher.Teachername}
                  </p>
                  <p>
                    <b>Email : </b>
                    {teacher.email}
                  </p>
                  <p>
                    <b>Mobile : </b>
                    {teacher.mobileno}
                  </p>
                  <p>
                    <b>Subject : </b>
                    {teacher.subject}
                  </p>
                  <p>
                    <b>Degree : </b>
                    {teacher.degree}
                  </p>
                  <p>
                    <b>Class Teaches : </b>
                    {teacher.classteacher}
                  </p>
                  <p>
                    <b>State : </b>
                    {teacher.state}
                  </p>
                  <p>
                    <b>City : </b>
                    {teacher.city}
                  </p>
                  <p>
                    <b>Address : </b>
                    {teacher.permanentAddress}
                  </p>
                </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default AssignSyllbusTask;
