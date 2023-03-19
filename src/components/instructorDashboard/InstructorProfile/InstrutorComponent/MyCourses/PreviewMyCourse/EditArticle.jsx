import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "suneditor/dist/css/suneditor.min.css";
import SunEditor from "suneditor-react";
import Loader from "../../../../../Loader";
import { BiArrowBack } from "react-icons/bi";
import axios from "axios";

function EditMyCourseArticle() {
  const { id, course } = useParams();
  //   console.log(id, teacher, course);
  let navigate = useNavigate();

  const [content, setcontent] = useState("");
  const [precontent, setprecontent] = useState("");
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
        .get("/Instructorcourse/" + course)
        .then((response) => {
          setassignTask(response.data[0]);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchdata();
  }, [id, navigate, course]);

  // Find the Article to be edit
  useEffect(() => {
    if (assignTask) {
      if (assignTask.courseArticles) {
        // console.log(assignTask.ChapterContent);
        const Lectcontent = assignTask.courseArticles.find((obj) => {
          return obj._id === id;
        });
        setprecontent(Lectcontent.ArticleContent);
        setLectureTitle(Lectcontent.ArticleTitle);
      }
    }
  }, [assignTask, id]);

  const handleEditorChange = (content) => {
    setcontent(content);
  };

  console.log(assignTask);

  const SubmitMyTask = async () => {
    if (LectureTitle === "") {
      window.alert("Please Enter a valid chapter title.");
    } else if (content === "") {
      window.alert("Please Enter content to added Chapter.");
    } else {
      const Title = LectureTitle;
      const LectureContent = content;

      const res = await fetch("/EditMyCourseArticledetails", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          course,
          Title,
          LectureContent,
        }),
      });

      if (res.status === 200) {
        window.alert("Data Updated Successfully");
        navigate("/instructordashboard/my-courses");
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
            <Link to="/instructordashboard/my-courses">
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
                <button onClick={SubmitMyTask}>Submit Task</button>
              </div>

              {/* Show the Previous Text  */}
              <br />
              <hr />
              <br />
              <h1>Previous Work</h1>
              <div dangerouslySetInnerHTML={{ __html: precontent }}></div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default EditMyCourseArticle;
