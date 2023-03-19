import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../../../../assets/images/progressbar.gif";
import "suneditor/dist/css/suneditor.min.css";
import SunEditor from "suneditor-react";
import { useSelector } from "react-redux";
import { BiArrowBack } from "react-icons/bi";
import axios from "axios";

var CryptoJS = require("crypto-js");

export default function AddCourses() {
  const loginDetails = useSelector((state) => state.userReducers);
  const [COURSE, SETCOURSE] = useState({
    title: "",
    courseojective: "",
    level: "",
    language: "",
    courseCategory: "",
  });

  let navigate = useNavigate();
  const [Instructor, setInstructor] = useState({});
  const [thumbnailImage, setthumbnailImage] = useState("");
  const [thumbnailImageData, setthumbnailImageData] = useState();
  const [Description1, setDescription] = useState("");
  const [err, seterr] = useState("");

  let thumbnai_Image = "";

  useEffect(() => {
    window.scroll(0, 60);
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
  }, [loginDetails.isLoggedIn, loginDetails.userRole, navigate]);

  // Set content added to sun editor
  const handleEditorChange = (content) => {
    setDescription(content);
  };

  // Add handle change events
  const handlechange = (e) => {
    SETCOURSE({ ...COURSE, [e.target.name]: e.target.value });
  };

  // Check That everything is added correctly
  const handleValidation = () => {
    if (
      !COURSE.title ||
      !COURSE.courseojective ||
      !COURSE.language ||
      !COURSE.level ||
      !Description1 ||
      !thumbnailImage ||
      !COURSE.courseCategory
    ) {
      seterr("Please Enter all required Fields.");
      return false;
    } else if (thumbnailImage === "") {
      seterr("Please Upload Thumbnail Image.");
      return false;
    }
    return true;
  };

  // Add Courses thumbnail image
  const submitImage = async (image, imageData) => {
    if (image === "") {
      window.alert("Please Upload an Image.");
    } else {
      const formData = new FormData();
      formData.append("image", imageData);

      fetch(`/upload_image`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            console.log(data.error);
          } else {
            thumbnai_Image = data.image.image;
          }
        });
    }
  };

  // Send Data to backend
  const postData = async () => {
    const { title, courseojective, level, language, courseCategory } = COURSE;
    const thumbnail = thumbnai_Image;
    const Description = Description1;
    const courseInstructor = Instructor._id;
    const res = await fetch("/Instructoraddcourse", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        courseojective,
        level,
        language,
        Description,
        thumbnail,
        courseInstructor,
        courseCategory,
      }),
    });

    if (res.status === 200) {
      navigate("/instructordashboard");
    } else {
      console.log(res);
      window.alert("error occured");
    }
  };

  // Wait for image to store at backend
  const time = 10000;
  function sendData() {
    setTimeout(function () {
      if (thumbnai_Image === "") {
        sendData();
      } else {
        postData();
      }
    }, time);
  }

  // console.log(COURSE);

  // Submit Data
  const handleSubmit = async (event) => {
    event.preventDefault();
    const submit = handleValidation();

    if (submit) {
      seterr("Please wait we are uploading your Data");
      document.getElementById("addBookBtn").disabled = true;
      document.getElementById("loader-reg").style.display = "inline";

      // Send Images to cloud
      await submitImage(thumbnailImage, thumbnailImageData);

      // Send Data to Backend after 10 sec
      sendData();
    }
  };

  function validateCourseImg(e) {
    const fileSize = e.target.files[0].size / 1024 / 1024; // in MiB
    if (fileSize > 2) {
      alert("File size exceeds 2 MB");
    } else {
      setthumbnailImage(e.target.value);
      setthumbnailImageData(e.target.files[0]);
    }
  }

  return (
    <>
      <div className="add-course-container">
        <div className="add-course-header">
          {/* This Link Heading to return back  */}
          <Link to="/instructordashboard/my-courses">
            <BiArrowBack className="backBtn" style={{ color: "white" }} />
          </Link>
        </div>
        {/* Add Description of course using suneditor  */}
        <div className="add-course-body">
          <div className="add-course-form-container">
            <h1>Add New Course</h1>
            {/* Chapter Title  */}
            <div className="makedivision">
              <form>
                {/* The Email Input  */}
                <div className="signInput">
                  <label htmlFor="title">
                    {" "}
                    Course Title :<span className="star"> *</span>
                  </label>
                  <br />
                  <input
                    type="text"
                    id="title"
                    placeholder="Add title of the course"
                    name="title"
                    required
                    onChange={(e) => handlechange(e)}
                  />
                </div>
              </form>
            </div>
            {/* Description of Courses  */}
            <label htmlFor="Description">
              {" "}
              Description of Course:<span className="star"> *</span>
            </label>
            <SunEditor
              onChange={handleEditorChange}
              required
              showToolbar={true}
              setOptions={{
                buttonList: [
                  [
                    "undo",
                    "redo",
                    "font",
                    "fontSize",
                    "formatBlock",
                    "align",
                    "list",
                    "paragraphStyle",
                    "blockquote",
                    "bold",
                    "underline",
                    "italic",
                    "subscript",
                    "superscript",
                    "strike",
                    "fontColor",
                    "hiliteColor",
                    "textStyle",
                    "removeFormat",
                    "outdent",
                    "indent",
                    "horizontalRule",
                    "lineHeight",
                    "table",
                    "link",
                    "image",
                    "audio",
                    "showBlocks",
                    "codeView",
                    "preview",
                    "print",
                    "fullScreen",
                  ],
                ],
              }}
            />
            {/* Course Motive  */}
            <div className="makedivision">
              <form>
                {/* The Email Input  */}
                <div className="signInput">
                  <label htmlFor="courseojective">
                    {" "}
                    What will students learn in your course ?
                    <span className="star"> *</span>
                  </label>
                  <br />
                  <textarea
                    type="text"
                    id="courseojective"
                    placeholder="If you cannot do great things, do small things in a great way."
                    name="courseojective"
                    required
                    onChange={(e) => handlechange(e)}
                  ></textarea>
                </div>
              </form>
            </div>
            {/* Asking Level of course  */}
            <p>
              &nbsp;Level of Course :<span className="star"> *</span>
            </p>
            <div className="add-course-radio">
              <div>
                <input
                  type="radio"
                  id="Beginers"
                  name="level"
                  value="Beginers"
                  onChange={(e) => handlechange(e)}
                />
                <label htmlFor="Beginers">Beginers</label>
              </div>

              <div>
                <input
                  type="radio"
                  id="Intermidiate"
                  name="level"
                  value="Intermidiate"
                  onChange={(e) => handlechange(e)}
                />
                <label htmlFor="Intermidiate">Intermidiate</label>
              </div>

              <div>
                <input
                  type="radio"
                  id="Advanced"
                  name="level"
                  value="Advanced"
                  onChange={(e) => handlechange(e)}
                />
                <label htmlFor="Advanced">Advanced</label>
              </div>
            </div>
            {/* Asking Language of course  */}
            <br />
            <p>
              &nbsp;Language of Course :<span className="star"> *</span>
            </p>
            <div className="add-course-radio">
              <div>
                <input
                  type="radio"
                  id="English"
                  required
                  name="language"
                  value="English"
                  onChange={(e) => handlechange(e)}
                />
                <label htmlFor="English">English</label>
              </div>

              <div>
                <input
                  type="radio"
                  id="Hindi"
                  name="language"
                  required
                  value="Hindi"
                  onChange={(e) => handlechange(e)}
                />
                <label htmlFor="Hindi">Hindi</label>
              </div>

              <div>
                <input
                  type="radio"
                  id="Hinglish"
                  name="language"
                  required
                  value="Hinglish"
                  onChange={(e) => handlechange(e)}
                />
                <label htmlFor="Hinglish">Hinglish</label>
              </div>

              <div>
                <input
                  type="radio"
                  id="other"
                  required
                  name="language"
                  value="other"
                  onChange={(e) => handlechange(e)}
                />
                <label htmlFor="other">Other</label>
              </div>
            </div>

            <div className="AddedCourseDetails">
              {/* Select Category of Course added  */}
              <div className="AddedCourseDetailsSelect">
                <label htmlFor="courseCategory">
                  Select Category :<span className="star"> *</span>
                </label>{" "}
                <br />
                <select
                  id="courseCategorys"
                  name="courseCategory"
                  value={COURSE.courseCategory}
                  onChange={(e) => handlechange(e)}
                >
                  <option disabled value="">
                    Select Category:
                  </option>
                  <option onChange={(e) => handlechange(e)} value="Art &amp; Design">
                    Art/Design
                  </option>
                  <option
                    onChange={(e) => handlechange(e)}
                    value="Communication &amp; Speech"
                  >
                    Communication/Speech
                  </option>
                  <option
                    onChange={(e) => handlechange(e)}
                    value="Computer Science"
                  >
                    Computer Science
                  </option>
                  <option onChange={(e) => handlechange(e)} value="Music">
                    Music
                  </option>
                  <option onChange={(e) => handlechange(e)} value="Photography">
                    Photography
                  </option>
                  <option
                    onChange={(e) => handlechange(e)}
                    value="Personality Development"
                  >
                    Personality Development
                  </option>
                  <option
                    onChange={(e) => handlechange(e)}
                    value="Foreign Languages"
                  >
                    Foreign Languages
                  </option>
                  <option
                    onChange={(e) => handlechange(e)}
                    value="Business Management"
                  >
                    Business Management
                  </option>
                  <option onChange={(e) => handlechange(e)} value="Other">
                    Other
                  </option>
                </select>
              </div>

              {/* Enter The tumbnail Image od course  */}
              <div>
                <label htmlFor="thumbnailofcourse">
                  Thumbnail Image :<span className="star"> *</span>
                </label>{" "}
                <br />
                <input
                  type="file"
                  required
                  id="idImage"
                  className="img-uplaod-btn"
                  accept="image/*"
                  onChange={(e) => {
                    validateCourseImg(e);
                  }}
                />
                <br />
                <span className="uploadphoto">{thumbnailImage}</span>
              </div>
            </div>

            {/* Finaly a submit button and a loader  */}
            <div className="course-field-submit">
              <div>
                <img src={Loader} alt="Loader" id="loader-reg" />
                <p className="uploadphoto">{err}</p>
              </div>
              <div className="submit-btn">
                <input
                  type="submit"
                  id="addBookBtn"
                  className="addBtn"
                  onClick={handleSubmit}
                  value="Add New Course"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
