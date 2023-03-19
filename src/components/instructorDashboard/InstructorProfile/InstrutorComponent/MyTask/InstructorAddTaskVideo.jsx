import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BiArrowBack, BiCloudUpload } from "react-icons/bi";
import Loader from "../../../../Loader";
import Loaders from "../../../../../assets/images/progressbar.gif";
import axios from "axios";

function InstructorAddTaskVideo() {
  const { id, teacher } = useParams();
  let navigate = useNavigate();

  const [assignTask, setassignTask] = useState({});
  const [Loading, setLoading] = useState(true);
  const [instructor, setinstructor] = useState({});

  const [err, seterr] = useState("");
  const [Video, setVideo] = useState("");
  const [VideoData, setVideoData] = useState("");
  const [VideoTitle, setVideoTitle] = useState("");

  const [VideoLink, setVideoLink] = useState("");

  // Variable to store video link
  let course_video = "";

  useEffect(() => {
    window.scroll(0, 80);

    const fetchlogin = async () => {
      await axios
        .get("/aboutInstructor")
        .then((response) => {
          setinstructor(response.data);
        })
        .catch((error) => {
          console.log(error);
          navigate("/login");
        });
    };
    fetchlogin();

    const fetchdata = async () => {
      await axios
        .get("/singleassigntaskinfo/" + id)
        .then((response) => {
          setassignTask(response.data[0]);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchdata();
  }, [id, navigate]);

  //   console.log(assignTask, course_video);

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
    const LectureNo = assignTask.ChapterNo;
    const Title = VideoTitle;
    var VideoLecture;
    if (!VideoLink) {
      VideoLecture = course_video;
    } else {
      VideoLecture = VideoLink;
    }

    const res = await fetch("/Instructoraddlecturevideo/" + id, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        LectureNo,
        Title,
        VideoLecture,
      }),
    });

    if (res.status === 200) {
      window.alert("Successful Video Added to Lecture");
      navigate("/instructordashboard/task-assign");
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
    if (!VideoTitle) {
      seterr("Please Enter Video Title.");
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
        await submitVideo(Video, VideoData);

        // Send Data to Backend after 10 sec
        sendVideo();
      } else {
        postVideo();
      }
    }
  };

  if (Loading) {
    return <Loader />;
  } else {
    return (
      <div className="edit-course-container">
        {/* This Link Heading to return back  */}
        <div className="add-course-header">
          <Link to="/instructordashboard/task-assign">
            <BiArrowBack className="backBtn" style={{ color: "white" }} />
          </Link>
        </div>

        {/* Body Of Content  */}
        <div className="edit-course-container-body">
          {/* Inner Body Container  */}
          <div className="edit-course-container-inner-body">
            {/* Heading Of Container  */}
            <h1>Edit &amp; Manage Course</h1>

            {/* Taking the Article Tile in Input  */}
            <div className="edit-course-container-title">
              <label htmlFor="lectureVideo">
                &nbsp;Video Title: : <span className="star"> *</span>
              </label>
              <br />
              <input
                type="text"
                id="lectureVideo"
                name="lectureVideo"
                placeholder="Lecture's video title"
                value={VideoTitle}
                onChange={(e) => {
                  setVideoTitle(e.target.value);
                }}
              />
            </div>

            {/* Taking the Content using suneditor  */}
            <label htmlFor="lecturevideo">
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
                <strong>&nbsp;Note : </strong>Must be provided only when video
                is not availabe for upload.
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
                <img src={Loaders} alt="Loader" id="loader-reg" />
                <p className="uploadphoto" style={{ marginBottom: "1rem" }}>
                  {err}
                </p>
              </div>
              {/* button  */}
              <button id="addVideoBtn" onClick={handleSubmitVideo}>
                Add Video
              </button>
            </div>

            {/* The Task description  */}
            <hr />
            <p className="assignedtaskpreviewdefine">
              <b>Task Description</b>
            </p>
            {assignTask ? (
              <div className="assignedtaskpreview">
                <p className="asstskdecp">{assignTask.ChapterDescription}</p>

                {/* More Details of Task  */}
                <div className="assignedtaskpreview_inner">
                  <p>
                    <b>Chapter No : </b>
                    <br />
                    {assignTask.ChapterNo}
                  </p>
                  <p>
                    <b>Chapter Name : </b>
                    <br />
                    {assignTask.ChapterName}
                  </p>
                  <p>
                    <b>Subject : </b>
                    <br />
                    {assignTask.Subject}
                  </p>
                  <p>
                    <b>Board : </b>
                    <br />
                    {assignTask.Board}
                  </p>
                  <p>
                    <b>Class : </b>
                    <br />
                    {assignTask.Class}
                  </p>
                  <p>
                    <b>Due Date : </b>
                    <br />
                    {assignTask.DueDate}
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default InstructorAddTaskVideo;
