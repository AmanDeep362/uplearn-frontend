import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "suneditor/dist/css/suneditor.min.css";
import SunEditor from "suneditor-react";
import Loader from "../../../../Loader";
import { BiArrowBack } from "react-icons/bi";
import axios from "axios";

function InstructorAddTaskDetails() {
  const { id, teacher } = useParams();
  let navigate = useNavigate();

  const [content, setcontent] = useState("");
  const [assignTask, setassignTask] = useState({});
  const [Loading, setLoading] = useState(true);
  const [instructor, setinstructor] = useState({});

  const [LectureTitle, setLectureTitle] = useState("");

  useEffect(() => {
    window.scroll(0, 0);

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
          setassignTask(response.data);
          setcontent(response.data[0].Draft);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchdata();
  }, [id, navigate]);

  const handleEditorChange = (content) => {
    setcontent(content);
  };

  const SaveAsDraft = async () => {
    const res = await fetch("/saveassigntaskasdeaft", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        content,
      }),
    });

    if (res.status === 200) {
      window.alert("Data Save as Draft Successfully");
      navigate("/");
    } else {
      console.log(res);
      window.alert("Internal Server Error");
    }
  };

  const SubmitMyTask = async () => {
    if (LectureTitle === "") {
      window.alert("Please Enter a valid chapter title.");
    } else if (content === "") {
      window.alert("Please Enter content to added Chapter.");
    } else {
      const LectureNo = assignTask[0].ChapterNo;
      const Title = LectureTitle;
      const LectureContent = content;

      const res = await fetch("/Instructoraddlecturedetails/" + id, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          LectureNo,
          Title,
          LectureContent,
        }),
      });

      if (res.status === 200) {
        window.alert("Data Submit Successfully");
        navigate("/instructordashboard/task-assign");
      } else {
        console.log(res);
        window.alert("Internal Server Error, Try Later");
      }
    }
  };

  if (Loading) {
    return <Loader />;
  } else {
    return (
      <>
        <div className="add-course-container">
          {/* This Link Heading to return back  */}
          <div className="add-course-header">
            <Link to="/instructordashboard/task-assign">
              <BiArrowBack className="backBtn" style={{ color: "white" }} />
            </Link>
          </div>
          {/* Form To Start Taking Task Details  */}
          <div className="add-course-body">
            <div className="add-course-form-container">
              <h1>Add Course Content</h1>
              {/* Chapter Title  */}
              <div className="makedivision">
                <form>
                  {/* The Email Input  */}
                  <div className="signInput">
                    <label htmlFor="title">
                      Chapter Title :<span className="star"> *</span>
                    </label>
                    <br />
                    <input
                      type="text"
                      id="title"
                      placeholder="Add heading title of the chapter"
                      name="title"
                      value={LectureTitle}
                      onChange={(e) => {
                        setLectureTitle(e.target.value);
                      }}
                    />
                  </div>
                </form>
              </div>

              {/* Enter Description Of task  */}
              <label htmlFor="Description">
                {" "}
                Chapter Description :<span className="star"> *</span>
              </label>
              <SunEditor
                onChange={handleEditorChange}
                required
                showToolbar={true}
                defaultValue={content}
                placeholder="Please type lecture content here..."
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

              {/* Submit Task  */}
              <div className="submitassigntask">
                <button onClick={SaveAsDraft}>Save Draft</button>
                <button onClick={SubmitMyTask}>Submit Task</button>
              </div>

              {/* The Task description  */}
              <hr />
              <p className="assignedtaskpreviewdefine">
                <b>Task Description</b>
              </p>
              {assignTask ? (
                <div className="assignedtaskpreview">
                  <p className="asstskdecp">
                    {assignTask[0].ChapterDescription}
                  </p>

                  {/* More Details of Task  */}
                  <div className="assignedtaskpreview_inner">
                    <p>
                      <b>Chapter No : </b>
                      <br />
                      {assignTask[0].ChapterNo}
                    </p>
                    <p>
                      <b>Chapter Name : </b>
                      <br />
                      {assignTask[0].ChapterName}
                    </p>
                    <p>
                      <b>Subject : </b>
                      <br />
                      {assignTask[0].Subject}
                    </p>
                    <p>
                      <b>Board : </b>
                      <br />
                      {assignTask[0].Board}
                    </p>
                    <p>
                      <b>Class : </b>
                      <br />
                      {assignTask[0].Class}
                    </p>
                    <p>
                      <b>Due Date : </b>
                      <br />
                      {assignTask[0].DueDate}
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default InstructorAddTaskDetails;
