import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SunEditor from "suneditor-react";
import { useSelector } from "react-redux";
import { BiArrowBack, BiCloudUpload } from "react-icons/bi";
import axios from "axios";

import Loader from "../../../../../assets/images/progressbar.gif";
import NotFoundImg from "../../../../../assets/images/not-found.png";

var CryptoJS = require("crypto-js");

export default function InstructorEditContent() {
  const loginDetails = useSelector((state) => state.userReducers);
  let navigate = useNavigate();

  const { id } = useParams();
  const [course, setCourse] = useState({});
  const [Instructor, setInstructor] = useState({});

  // States to handle component changes in page
  const [articleShow, setarticleShow] = useState(true);
  const [videoShow, setvideoShow] = useState(false);
  const [quizShow, setquizShow] = useState(false);

  const [VideoLink, setVideoLink] = useState("");

  useEffect(() => {
    window.scroll(0, 80);
    // Decrypting the User Role
    if (loginDetails.userRole !== "") {
      var bytes = CryptoJS.AES.decrypt(
        loginDetails.userRole,
        "my-secret-key@123"
      );
      var role = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }
    // Check is Teacher Login Or Not
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

    // Fetching the Course data
    const fetchcourse = async () => {
      await axios
        .get("/Instructorcourse/" + id)
        .then((response) => {
          setCourse(response.data[0]);
        })
        .catch((error) => {
          console.log(error);
          navigate("/login");
        });
    };

    fetchcourse();
  }, [loginDetails.isLoggedIn, loginDetails.userRole, id, navigate]);

  const [COURSE, SETCOURSE] = useState({
    VideoContentTitle: "",
    ArticleTitle: "",
  });

  const [err, seterr] = useState("");
  const [Video, setVideo] = useState("");
  const [VideoData, setVideoData] = useState("");
  const [Description, setDescription] = useState("");

  // Variable to store video link
  let course_video = "";

  /////////////////////////////////////////////////////////////////////////

  // Store/Change in Suneditor
  const handleEditorChange = (content) => {
    setDescription(content);
  };

  // Handle input box changes
  const handleChange = (e) => {
    SETCOURSE({ ...COURSE, [e.target.name]: e.target.value });
  };

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

  // console.log(course);

  ///////////////////////////////////////////////////////////
  // Function Of Video Route

  // Set the values of video
  function validatevideo(e) {
    setVideo(e.target.files[0].name);
    setVideoData(e.target.files[0]);
  }

  // Submit Video using cloudinary
  const submitVideo = async (Video, VideoData) => {
    if (Video === "") {
      window.alert("Please Upload an Video.");
    } else {
      const formData = new FormData();
      formData.append("image", VideoData);

      fetch(`/upload_image`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            console.log(data.error);
          } else {
            // Setting the response to variable
            course_video = data.image.image;
          }
        });
    }
  };

  // Finally Post the video to backend
  const postVideo = async () => {
    var VideoLecture;
    if (!VideoLink) {
      VideoLecture = course_video;
    } else {
      VideoLecture = VideoLink;
    }
    const { VideoContentTitle } = COURSE;
    const Id = id;

    const res = await fetch("/addVideoToCourse", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        VideoLecture,
        VideoContentTitle,
        Id,
      }),
    });

    if (res.status === 200) {
      window.alert("Successful Video Added to Course");
      navigate("/instructordashboard/my-courses");
    } else {
      console.log(res);
      window.alert("Something Went Wrong, Try Later\nError Occured");
    }
  };

  const time = 10000; // Set a variable to  set interval of 10 sec
  // Checking is video upload successfully
  function sendVideo() {
    setTimeout(function () {
      if (course_video === "") {
        sendVideo();
      } else {
        postVideo();
      }
    }, time);
  }

  // Check that the video is availabe or not
  const handleVideoValidation = () => {
    if (!COURSE.VideoContentTitle) {
      seterr("Please Enter all required Fields.");
      return false;
    } else if (!Video) {
      if (!VideoLink) {
        seterr("Please Upload a Video or provide Video URL.");
        return false;
      }
    }
    return true;
  };

  // Handle The Area of submiting the video
  const handleSubmitVideo = async () => {
    const submit = handleVideoValidation();

    if (submit) {
      seterr("Please wait we are uploading your Data");
      document.getElementById("addVideoBtn").disabled = true;
      document.getElementById("loader-reg").style.display = "inline";

      // Send video cloud if external Link is not availabe
      if (!VideoLink) {
        // Send video cloud
        await submitVideo(Video, VideoData);
        // Send Data to Backend after 10 sec
        sendVideo();
      } else {
        postVideo();
      }
    }
  };
  ///////////////////////////////////////////////////////////
  // Function Of Article Route

  const postArticle = async () => {
    const ArticleContent = Description;
    const { ArticleTitle } = COURSE;
    const Id = id;
    const res = await fetch("/addArticleToCourse", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        ArticleTitle,
        ArticleContent,
        Id,
      }),
    });

    if (res.status === 200) {
      window.alert("Successful Lecture Added to Course");
      navigate("/instructordashboard/my-courses");
    } else {
      console.log(res);
      window.alert("Something Went Wrong, Try Later\nError Occured");
    }
  };

  // Validate is all data input
  const handleArticleValidation = () => {
    if (!COURSE.ArticleTitle || !Description) {
      seterr("Please Enter all required fields.");
      return false;
    }
    return true;
  };

  const handleArticleSubmit = async () => {
    const submit = handleArticleValidation();

    if (submit) {
      seterr("Please wait we are uploading your Data");
      document.getElementById("articlebtneditor").disabled = true;

      // Send Data to Backend
      postArticle();
    }
  };

  // end of article function
  ///////////////////////////////////////////////////////////////////

  return (
    <>
      {/* The Main Div  */}
      <div className="edit-course-container">
        {/* This Link Heading to return back  */}
        <div className="add-course-header">
          <Link to="/instructordashboard/my-courses">
            <BiArrowBack className="backBtn" style={{ color: "white" }} />
          </Link>
        </div>

        {/* Body Of Content  */}
        <div className="edit-course-container-body">
          {/* Inner Body Container  */}
          <div className="edit-course-container-inner-body">
            {/* Heading Of Container  */}
            <h1>Edit &amp; Manage Course</h1>

            {/* Buttons to make video, text and quiz visible at different time  */}
            <div className="edit-course-container-btnchanger">
              <button
                onClick={handleArticleShow}
                className={articleShow ? "bt-active" : ""}
              >
                Add Article
              </button>
              <button
                onClick={handleVideoShow}
                className={videoShow ? "bt-active" : ""}
              >
                Add Video
              </button>
              <button
                onClick={handleQuizShow}
                className={quizShow ? "bt-active" : ""}
              >
                Add Quiz
              </button>
            </div>

            {/* Enters a common Title for all courses  */}
            <div className="edit-course-container-title">
              <label htmlFor="title">&nbsp;Course Name :</label>
              <br />
              <input
                type="text"
                id="title"
                name="title"
                value={course.title}
                onChange={(e) => handleChange(e)}
              />
            </div>

            {/* Showing Article if Article is Active  */}
            {articleShow && (
              <div>
                {/* Taking the Article Tile in Input  */}
                <div className="edit-course-container-title">
                  <label htmlFor="ArticleTitle">
                    &nbsp;Article Title : <span className="star"> *</span>
                  </label>
                  <br />
                  <input
                    type="text"
                    id="ArticleTitle"
                    name="ArticleTitle"
                    placeholder="article title"
                    value={COURSE.ArticleTitle}
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                {/* Taking the Content using suneditor  */}
                <label htmlFor="Description">
                  Article Description : <span className="star"> *</span>
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

                {/* Button To Submit the Article Written  */}
                <div className="edit-course-submit-btn">
                  <p className="uploadphoto">{err}</p>
                  <button onClick={handleArticleSubmit} id="articlebtneditor">
                    Add Article
                  </button>
                </div>
              </div>
            )}

            {/* Showing Video if Video is Active  */}
            {videoShow && (
              <div>
                {/* Taking the Article Tile in Input  */}
                <div className="edit-course-container-title">
                  <label htmlFor="courseVideo">
                    &nbsp;Video Title: : <span className="star"> *</span>
                  </label>
                  <br />
                  <input
                    type="text"
                    id="courseVideo"
                    name="VideoContentTitle"
                    placeholder="video title"
                    value={COURSE.VideoContentTitle}
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                {/* Taking the Content using suneditor  */}
                <label htmlFor="coursevideo">
                  Add a Video : <span className="star"> *</span>
                </label>
                <br />
                <div className="edit-course-container-upload-video">
                  <BiCloudUpload />
                  <input
                    type="file"
                    id="coursevideo"
                    accept="video/*"
                    className="editvideoinput"
                    onChange={(e) => {
                      validatevideo(e);
                    }}
                  />
                  <p className="star">{Video}</p>
                </div>

                {/* Or Try To add a Video Link  */}
                <div className="edit-course-container-title">
                  <div className="star">
                    {" "}
                    <strong>&nbsp;Note : </strong>Must be provided only when
                    video is not availabe for upload.
                  </div>

                  <input
                    type="text"
                    id="VideoLink"
                    name="VideoLink"
                    placeholder="Video Link (If no Upload video is available)"
                    value={VideoLink}
                    onChange={(e) => {
                      setVideoLink(e.target.value);
                    }}
                  />
                </div>

                {/* Submit the video uploaded  */}
                <div className="edit-course-submit-btn">
                  <div>
                    <img src={Loader} alt="Loader" id="loader-reg" />
                    <p className="uploadphoto" style={{ marginBottom: "1rem" }}>
                      {err}
                    </p>
                  </div>
                  {/* button  */}
                  <button id="addVideoBtn" onClick={handleSubmitVideo}>
                    Add Video
                  </button>
                </div>
              </div>
            )}

            {/* Showing Quiz if Quiz is Active  */}
            {quizShow && (
              <div>
                {course ? (
                  course.courseQuiz.length ? (
                    <div>
                      {/* Heading of Quiz Page  */}
                      <div className="edit-course-add-quiz-header">
                        <h2>My Quiz</h2>
                        <Link
                          to={
                            "/instructordashboard/my-courses/edit-content/add-quiz/" +
                            id
                          }
                          className="edit-course-container-btn-new-quiz"
                        >
                          Add New Quiz
                        </Link>
                      </div>
                      {/* Quizes List  */}
                      <div className="edit-course-add-quiz-card-container">
                        {course.courseQuiz.map((item) => (
                          <div
                            key={item._id}
                            className="edit-add-quiz-card-inner-container"
                          >
                            <div className="edit-add-quiz-card-body">
                              <h3>{item.QuizeName}</h3>
                              <Link
                                className="my-quiz-Link"
                                to={
                                  "/instructordashboard/my-courses/edit-content/add-quiz/add-questions/" +
                                  id +
                                  "/" +
                                  item._id
                                }
                              >
                                Add Questions
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="edit-course-container-quiz">
                      <h2>Not any quiz in this course</h2>
                      <img src={NotFoundImg} alt="noQuiz" />
                      <Link
                        to={
                          "/instructordashboard/my-courses/edit-content/add-quiz/" +
                          id
                        }
                        className="edit-course-container-btn-new-quiz"
                      >
                        Add New Quiz
                      </Link>
                    </div>
                  )
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
