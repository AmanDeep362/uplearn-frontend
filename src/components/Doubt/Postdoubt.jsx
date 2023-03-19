import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "suneditor/dist/css/suneditor.min.css";
import SunEditor from "suneditor-react";
import Loader2 from "../../assets/images/progressbar.gif";
import Loader from "../Loader";
import { BiArrowBack } from "react-icons/bi";
var CryptoJS = require("crypto-js");

export default function Postdoubt() {
  const loginDetails = useSelector((state) => state.userReducers);
  let navigate = useNavigate();

  // states
  const [User, SetUser] = useState({});
  const [userName, setUserName] = useState("");
  const [isLoading, setisLoading] = useState(true);
  const [Description, setDescription] = useState("");
  const [doubt, setDoubt] = useState({
    title: "",
    subject: "",
  });
  const [err, seterr] = useState("");
  // states end

  // useffects
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
            setUserName(response.data.Teachername);
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
            setUserName(response.data.name);
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
    setisLoading(false);
  }, [loginDetails.isLoggedIn, loginDetails.userRole, navigate]);
  // useffects end

  const handleEditorChange = (content) => {
    setDescription(content);
  };

  const handleValidation = () => {
    if (!doubt.title || !doubt.subject || !Description) {
      seterr("Please Enter all required Fields.");
      return false;
    }
    return true;
  };

  const postData = async () => {
    const { title, subject } = doubt;
    const user_id = User._id;
    const user_name = userName;
    const res = await fetch("/post_doubt", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id,
        user_name,
        title,
        subject,
        Description,
      }),
    });

    if (res.status === 200) {
      navigate("/ask-doubt");
    } else {
      console.log(res);
      window.alert("error occured");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const submit = handleValidation();

    if (submit) {
      seterr("Please wait we are Posting your doubt.");
      document.getElementById("postBtn").disabled = true;
      document.getElementById("loader-reg").style.display = "inline";
      postData();
    }
  };

  // main code
  if (isLoading) {
    return <Loader />;
  } else {
    return (
      <>
        <div className="post-doubt">
          {/* back button section */}
          <div className="post-doubt-header">
            <Link to="/ask-doubt">
              <BiArrowBack className="backBtn" style={{ color: "white" }} />
            </Link>
          </div>

          {/* form section */}
          <form action="">
            <div className="post-doubt-body">
              <div className="post-doubt-form-container">
                <h2 className="post-doubt-heading">Ask Doubt</h2>
                <div className="post-doubt-Input">
                  <label htmlFor="postTitle">Title :</label>
                  <input
                    type="text"
                    name="title"
                    required
                    id="postTitle"
                    value={doubt.title}
                    onChange={(e) => {
                      setDoubt({ ...doubt, title: e.target.value });
                    }}
                  />
                </div>
                <div className="post-doubt-Input">
                  <label htmlFor="postTitle">Select Subject :</label>
                  <br />
                  <select
                    id="subject"
                    name="subjectclass"
                    value={doubt.subject}
                    style={{margin: '0px'}}
                    onChange={(e) => {
                      setDoubt({ ...doubt, subject: e.target.value });
                    }}
                  >
                    <option value="">Select Subject</option>
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
                <div className="post-doubt-Input">
                  <label htmlFor="Description">Description :</label>
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
                          "paragraphStyle",
                          "blockquote",
                          "bold",
                          "underline",
                          "italic",
                          "subscript",
                          "superscript",
                          "hiliteColor",
                          "textStyle",
                          "align",
                          "horizontalRule",
                          "list",
                          "lineHeight",
                          "image",
                          "fullScreen",
                          "showBlocks",
                          "codeView",
                          "preview",
                          "print",
                          "save",
                          "template",
                        ],
                      ],
                    }}
                  />
                </div>
                <div>
                  <img src={Loader2} alt="Loader" id="loader-reg" />
                  <p className="uploadphoto">{err}</p>
                </div>
                <div className="post-doubt-submit-btn">
                  <input
                    type="submit"
                    id="postBtn"
                    className="addBtn"
                    value="Post"
                    onClick={handleSubmit}
                  />
                </div>
              </div>
            </div>
          </form>
          {/* end */}
        </div>
      </>
    );
  }
}
