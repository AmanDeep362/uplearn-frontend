import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link, useParams } from "react-router-dom";
import { BiUser, BiTime } from "react-icons/bi";
import { HiThumbUp } from "react-icons/hi";
import axios from "axios";
import "suneditor/dist/css/suneditor.min.css";
import SunEditor from "suneditor-react";
import Loader2 from "../../assets/images/progressbar.gif";
import Loader from "../Loader";
import { BiArrowBack } from "react-icons/bi";

var CryptoJS = require("crypto-js");

export default function MainDoubt() {
  const loginDetails = useSelector((state) => state.userReducers);
  let navigate = useNavigate();
  let { id } = useParams();

  // states
  const [User, SetUser] = useState({});
  const [isLoading, setisLoading] = useState(true);
  const [role, setRole] = useState("");
  const [Description, setDescription] = useState("");
  const [err, seterr] = useState("");
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
        upvotes: [],
        downvotes: [],
        CreatedAt: "",
      },
    ],
  });
  const [isUpvote, setIsUpvote] = useState(false);
  const [answerLike, setAnswerLike] = useState([]);
  // states end

  // useffects start
  useEffect(() => {
    // Decrypting the User Role
    if (loginDetails.userRole !== "") {
      var bytes = CryptoJS.AES.decrypt(
        loginDetails.userRole,
        "my-secret-key@123"
      );
      var role = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      setRole(role);
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
        .get("/doubt_data_id/" + id)
        .then(async (response) => {
          setDoubtData(response.data);
          if (
            response.data.Upvotes.filter((item) => item === User._id).length > 0
          ) {
            setIsUpvote(true);
          }
          const temps = [];
          response.data.comments.map((item) => {
            if (item.upvotes.filter((item) => item === User._id).length > 0) {
              temps.push(true);
            } else {
              temps.push(false);
            }
          });
          setAnswerLike(temps);
          setisLoading(false);
        })
        .catch((error) => {
          console.log(error);
          navigate("/login");
        });
    };
    fetchDoubts();
  }, [loginDetails.isLoggedIn, loginDetails.userRole, id, navigate, User._id]);
  // useffects end

  const handleEditorChange = (content) => {
    setDescription(content);
  };

  const handleAddAnswer = async () => {
    if (Description === "") {
      seterr("Please Add Answer");
      return;
    }
    seterr("Please wait we are Posting your doubt.");
    document.getElementById("d-post-bu").disabled = true;
    document.getElementById("loader-reg").style.display = "inline";
    const data = {
      id: id,
      userId: User._id,
      userName: User.Teachername,
      comment: Description,
    };
    await axios
      .post("/addDoubtAnswer", data)
      .then((response) => {
        setDescription("");
        setDoubtData(response.data);
        seterr("");
        document.getElementById("d-post-bu").disabled = false;
        document.getElementById("loader-reg").style.display = "none";
      })
      .catch((error) => {
        console.log(error);
        seterr("error in posting your doubt");
        document.getElementById("d-post-bu").disabled = false;
        document.getElementById("loader-reg").style.display = "none";
      });
  };

  const handleupvote = () => {
    if (isUpvote) {
      axios
        .post("/doubt_upvote", {
          id: id,
          user_id: User._id,
          type: "unlike",
        })
        .then((response) => {
          setDoubtData(response.data);
          setIsUpvote(false);
        })
        .catch((error) => {
          console.log(error);
          navigate("/login");
        });
    } else {
      axios
        .post("/doubt_upvote", {
          id: id,
          user_id: User._id,
          type: "like",
        })
        .then((response) => {
          setDoubtData(response.data);
          setIsUpvote(true);
        })
        .catch((error) => {
          console.log(error);
          navigate("/login");
        });
    }
  };

  const handleAnswerUpvote = (iid, ind, type) => {
    axios
      .post("/doubt_answer_upvote", {
        id: id,
        comment_id: iid,
        user_id: User._id,
        type: type,
      })
      .then((response) => {
        setDoubtData(response.data);
        let temp = answerLike;
        temp[ind] = !temp[ind];
        setAnswerLike(temp);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // main function start
  if (isLoading) {
    return <Loader />;
  } else {
    return (
      <>
        <div className="mdoubt-container">
          <div className="post-doubt-header">
            <Link to="/ask-doubt">
              <BiArrowBack className="backBtn" style={{ color: "white" }} />
            </Link>
          </div>

          {/* heading */}
          <div className="mDoubt-heading">
            <h1>UpLearn Doubt</h1>
          </div>

          {/* main content */}
          <div className="mdoubt-body">
            <div className="mdoub-b-head">
              <h2>{doubtData.Title}</h2>
            </div>
            <div className="mdoubt-b-body">
              <div className="mdoubt-b-body-left">
                <span>
                  <HiThumbUp
                    className={`mdoubt-b-body-left-icon ${
                      isUpvote ? "d-icon-active" : ""
                    }`}
                    onClick={handleupvote}
                  />{" "}
                  {doubtData.Upvotes.length}
                </span>
              </div>
              <div
                className="mdoubt-b-body-right"
                dangerouslySetInnerHTML={{ __html: doubtData.Description }}
              ></div>
            </div>
            <div className="mdoubt-b-footer">
              <div className="mdoubt-b-footer-right">
                <span>
                  <BiUser className="mdoubt-b-footer-icon" />{" "}
                  {doubtData.userName}
                </span>
                <span>
                  <BiTime className="mdoubt-b-footer-icon" />{" "}
                  {new Date(doubtData.CreatedAt).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* answers section */}
          <div className="mdoubt-answers">
            {/* section heading */}
            <div className="mdoubt-answers-head">
              <h1>Answers</h1>
            </div>

            {/* main body */}
            <div className="mdoubt-answers-body">
              {/* editor for ansering question */}

              {role === "INSTRUCTOR" ? (
                <div className="mdoubt-answers-body-editor">
                  <div className="mdoubt-answers-body-editor-head">
                    Add Answer
                  </div>
                  <div className="mdoubt-answers-body-editor-body">
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
                  <div className="mdoubt-answers-body-editor-footer">
                    <button id="d-post-bu" onClick={handleAddAnswer}>
                      Post Answer
                    </button>
                  </div>
                  <div>
                    <img src={Loader2} alt="Loader" id="loader-reg" />
                    <p className="uploadphoto">{err}</p>
                  </div>
                </div>
              ) : null}

              {/* all previous answers */}
              <div className="mdoubt-answers-body-answers">
                {doubtData.comments.map((answer, ind) => {
                  return (
                    <div className="mdoubt-answers-body-answers-item" key={ind}>
                      <div className="mdoubt-answers-body-answers-item-right">
                        <div
                          className="mdoubt-answers-body-answers-item-main"
                          dangerouslySetInnerHTML={{ __html: answer.comment }}
                        ></div>
                        <div className="mdoubt-answers-body-answers-item-footer">
                          <div className="mdoubt-answers-body-answers-item-left">
                            <span>
                              <HiThumbUp
                                className={`mdoubt-answers-body-answers-item-left-icon ${
                                  answerLike[ind] ? "d-ans-ico-active" : ""
                                }`}
                                onClick={() =>
                                  handleAnswerUpvote(
                                    answer._id,
                                    ind,
                                    answerLike[ind] ? "unlike" : "like"
                                  )
                                }
                              />{" "}
                              {answer.upvotes.length}
                            </span>
                          </div>
                          <span>
                            <BiUser className="mdoubt-answers-body-answers-item-head-icon" />{" "}
                            {answer.userName}
                          </span>
                          <span>
                            <BiTime className="mdoubt-answers-body-answers-item-head-icon" />{" "}
                            {new Date(answer.createdAt).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
