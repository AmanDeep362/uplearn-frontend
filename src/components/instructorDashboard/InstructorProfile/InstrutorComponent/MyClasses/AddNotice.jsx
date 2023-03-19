import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import SunEditor from "suneditor-react";
// import Loader from "./../../assets/images/progressbar.gif";

export default function AddNotice() {

  let navigate = useNavigate();

  const [adminInfo, setadminInfo] = useState("");
  const adminstatus = useSelector((state) => state.AdminReducers);

  const [Notice, setNotice] = useState({
    NoticeTitle: "",
    NoticeDescription:"",

  });
  const [description, setDescription] = useState("");
  var Notice_Description = "";

  const [NoticeDescription, setNoticeDescription] = useState("");
  const [err, seterr] = useState("");
  const [NoticeDescriptionData, setNoticeDescriptionData] = useState();

  const handleChange = (event) => {
    console.log(Notice);
    setNotice({ ...Notice, [event.target.name]: event.target.value });
    seterr("");
  };

  const handleValidation = () => {
    if (
      !Notice.NoticeTitle ||
      !NoticeDescription
    ) 

    {
      seterr("Please Enter all required Fields.");
      return false;
    } 
    else if (NoticeDescription === "") {
      seterr("Please Upload Description of Notice.");
      return false;
    }
    return true;
  };

  const postData = async () => {
    const NoticeDescription = Notice_Description;
    const { NoticeTitle} =
      Notice;

    const res = await fetch("/addnoticebyinstructor", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        NoticeTitle,
        NoticeDescription,
        description: description,
      }),
    });

    if (res.status === 200) {
      window.alert("Successful Notice Added ");
      navigate("/admin-portal-home-190310554227");
    } else {
      console.log(res);
      window.alert("Something Went Wrong, Try Later\nError Occured");
    }
  };
  const handleEditorChange = (content) => {
    setDescription(content);
  };
  function validateNoticeDescription(e) {
    setNoticeDescription(e.target.files[0].name);
    setNoticeDescriptionData(e.target.files[0]);
  }
  const time = 10000;
  function sendData () {
    setTimeout(function () {
      console.log(Notice_Description +" ");
    if(Notice_Description==""){
       sendData();
    }
    
    else{
    postData();
    }
  }, time);
}
  const handleSubmit = async (event) => {
    event.preventDefault();
    const submit = handleValidation();

    if (submit) {
      seterr("Please wait we are uploading your Data");
      document.getElementById("addBookBtn").disabled = true;
      document.getElementById("loader-reg").style.display = "inline";

    //   // Send Images to cloud
    //   await submitI(NoticeDescription, NoticeDescriptionData, "bookDescription");

      // Send Data to Backend after 10 sec
      sendData();
    }
  };
  return (
    <>
      <div className="maincontainer">
        <div className="instructorHeader">
          <Link to="/">
            <BiArrowBack className="backBtn" style={{ color: "white" }} />
          </Link>
        </div>
        <div className="addBookWrapper">
          <div className="addBookForm">
            <form action="">
              <h3>Notice</h3>

              <div className="fields">
                <div className="addBookInputField" >
                  <label htmlFor="NoticeTitle">
                    Notice Title <span className="star">*</span>
                  </label>{" "}
                  <input
                    type="text"
                    id="NoticeTitle"
                    name="NoticeTitle"
                    placeholder="Enter title"
                    value={Notice.NoticeTitle}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
              </form>
              <div className="career-course-Input">
                <label htmlFor="description">Description<span className="star">*</span> :</label>

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
              </div>
                {/* <div>
                  <img src={Loader} alt="Loader" id="loader-reg" />
                  <p className="uploadphoto">{err}</p>
                </div> */}
                <div className="submit-btn">
                  <input
                    type="submit"
                    id="addNoticeBtn"
                    className="addBtn"
                    onClick={handleSubmit}
                    value="Add Notice"
                  />
                </div>
              
            
          </div>
        </div>
      </div>
    </>
  );
}
