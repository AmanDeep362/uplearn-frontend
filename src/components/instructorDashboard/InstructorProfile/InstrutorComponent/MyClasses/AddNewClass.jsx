import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import Loader from "../../../../Loader";

export default function AddNewClass(props) {
  const Instructor = props.details;
  // console.log(Instructor);
  let navigate = useNavigate();

  //   const { id } = useParams();
  const [Loading, setLoading] = useState(false);

  // State for the Input text
  const [classes, setclasses] = useState("");
  const [className, setclassName] = useState("");
  const [subject, setsubject] = useState("");
  const [classDescription, setclassDescription] = useState("");
  const [err, seterr] = useState("");

  const CreateNewClass = async () => {
    const classOwner = Instructor._id;
    const Subject = subject;
    const Class = classes;
    const ClassName = className;
    const ClassDescription = classDescription;
    const makeid = (length) => {
      var result = "";
      var characters = "abcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    };
    const meetingId = makeid(3) + "-" + makeid(3) + "-" + makeid(3);
    const classDatePost = new Date();
    const res = await fetch("/Create-room", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        classOwner,
        Subject,
        Class,
        ClassName,
        ClassDescription,
        meetingId,
        classDatePost,
      }),
    });

    if (res.status === 200) {
      window.alert("Task Assign Successful.");
      navigate("/instructordashboard/my-classroom");
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
    } else if (className === "") {
      seterr("Please Enter the Class Title.");
    } else if (classDescription === "") {
      seterr("Please add description of Class.");
    } else {
      CreateNewClass();
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
            <Link to="/instructordashboard/my-classroom">
              <BiArrowBack className="backBtn" style={{ color: "white" }} />
            </Link>
          </div>
          {/* Showing Instructor Details  */}
          <div className="instructorWrapper">
            <div className="instructorForm">
              <h1>Create New Class</h1>

              {/* Asking user for the Details of task  */}
              <div className="fields">
                {/* Enter Name of Class  */}
                <div className="inputField">
                  <label htmlFor="name">
                    <b>Class Title </b>
                    <span className="star">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="className "
                    placeholder="Enter Class Title"
                    value={className}
                    onChange={(e) => {
                      setclassName(e.target.value);
                    }}
                    required
                  />
                </div>
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

                {/* Enter Description of Chapter  */}
                <div>
                  <label htmlFor="message">
                    <b>Breif Description of Class</b>
                    <span className="star">*</span>
                  </label>
                  <br />
                  <textarea
                    className="assignTasktextArea"
                    placeholder="Enter breif information about task or content of chapter"
                    name="classDescription"
                    id="message"
                    cols="500"
                    rows="8"
                    value={classDescription}
                    onChange={(e) => {
                      setclassDescription(e.target.value);
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
                  Create Class
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
