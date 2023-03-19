import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BiArrowBack } from "react-icons/bi";
import SunEditor from "suneditor-react";
import axios from "axios";
import Loader from "../Loader";

const Addcareercourses = () => {
  const adminstatus = useSelector((state) => state.AdminReducers);

  const [adminInfo, setadminInfo] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [err, seterr] = useState("");

  const [description, setDescription] = useState("");
  const [CAREERDETAILS, setCAREERDETAILS] = useState({
    courseTitle: "",
    courseCategory: "",
    courseSubCategory: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    window.scroll(0, 0);
    // Check is Admin Login Or Not
    if (Number(adminstatus.isAdminLoggedIn)) {
      // call the fetch admin detail function
      const fetchdata = async () => {
        await axios
          .get("/aboutAdminActive")
          .then((response) => {
            setadminInfo(response.data);
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
  }, [adminstatus.isAdminLoggedIn, navigate]);

  const handleEditorChange = (content) => {
    setDescription(content);
  };

  const postData = async () => {
    const res = await fetch("/admin/postCareerDetails", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        title: CAREERDETAILS.courseTitle,
        category: CAREERDETAILS.courseCategory,
        subcategory: CAREERDETAILS.courseSubCategory,
        description: description,
      }),
    });

    // const data = await res.json();
    // console.log(data);
    if (res.status === 200) {
      window.alert("Your carrier blog is added.");
      navigate("/admin-portal-home-190310554227", { replace: true });
    } else {
      window.alert("Error occured , try again");
    }
  };

  const handleData = () => {
    if (!CAREERDETAILS.courseTitle) {
      seterr("Please Enter Title.");
    } else if (!CAREERDETAILS.courseCategory) {
      seterr("Please Enter course category.");
    } else if (!CAREERDETAILS.courseSubCategory) {
      seterr("Please Enter course sub category.");
    } else if (!description) {
      seterr("Please add description of blog.");
    } else {
      postData();
      // console.log('ok')
    }
  };

  const handleChange = (event) => {
    setCAREERDETAILS({
      ...CAREERDETAILS,
      [event.target.name]: event.target.value,
    });
    seterr("");
  };

  if (Loading) {
    return <Loader />;
  } else {
    return (
      <>
        <div className="addcareercourses">
          <div className="instructor">
            <div className="instructorHeader">
              <Link to="/admin-portal-home-190310554227">
                <BiArrowBack className="backBtn" style={{ color: "white" }} />
              </Link>
            </div>
          </div>
          <div className="career-upload-body">
            <div className="career-form-container">
              {/* Blog Title  */}
              <h1 className="career-course-heading">Add Careers</h1>
              <div className="career-course-Input">
                <label htmlFor="title">Title :</label> <br />
                <input
                  type="text"
                  placeholder="Enter Title"
                  name="courseTitle"
                  value={CAREERDETAILS.courseTitle}
                  onChange={(e) => handleChange(e)}
                  id="title"
                />{" "}
              </div>

              {/* Blog Category  */}
              <div className="career-course-Input">
                <label htmlFor="category">Category :</label>
                <br />
                <select
                  id="subject"
                  name="courseCategory"
                  style={{ margin: "0px" }}
                  value={CAREERDETAILS.courseCategory}
                  onChange={(e) => handleChange(e)}
                >
                  <option value="">Select Category</option>
                  <option value="after-10">After 10th</option>
                  <option value="after-12">After 12th</option>
                  <option value="exams">Exams</option>
                  <option value="scholarship">Scholarship</option>
                </select>
              </div>
              {CAREERDETAILS.courseCategory === "after-10" && (
                <div className="career-course-Input">
                  <label htmlFor="category">Sub-Category :</label>
                  <select
                    id="subject"
                    name="courseSubCategory"
                    style={{ margin: "0px" }}
                    value={CAREERDETAILS.courseSubCategory}
                    onChange={(e) => handleChange(e)}
                  >
                    <option value="">Select Sub-Category</option>
                    <option value="class-11-12">Class 11th-12th</option>
                    <option value="diploma-courses">Diploma Courses</option>
                    <option value="iti-courses">ITI Courses</option>
                  </select>
                </div>
              )}
              {CAREERDETAILS.courseCategory === "after-12" && (
                <div className="career-course-Input">
                  <label htmlFor="category">Sub-Category :</label>
                  <select
                    id="subject"
                    name="courseSubCategory"
                    style={{ margin: "0px" }}
                    value={CAREERDETAILS.courseSubCategory}
                    onChange={(e) => handleChange(e)}
                  >
                    <option value="">Select Sub-Category</option>
                    <option value="engineering">Engineering</option>
                    <option value="medical-health-care">
                      Medical &amp; Health Care
                    </option>
                    <option value="commerce">Commerce</option>
                    <option value="diploma-in-engineering">
                      Diploma in Engineering
                    </option>
                  </select>
                </div>
              )}
              {CAREERDETAILS.courseCategory === "exams" && (
                <div className="career-course-Input">
                  <label htmlFor="category">Sub-Category :</label>
                  <select
                    id="subject"
                    name="courseSubCategory"
                    style={{ margin: "0px" }}
                    value={CAREERDETAILS.courseSubCategory}
                    onChange={(e) => handleChange(e)}
                  >
                    <option value="">Select</option>
                    <option value="engineering-exams">Engineering Exams</option>
                    <option value="competitive-exams">Competitive Exams</option>
                    <option value="mba-exams">MBA Exams</option>
                    <option value="medical-exams">Medical Exams</option>
                  </select>
                </div>
              )}
              {CAREERDETAILS.courseCategory === "scholarship" && (
                <div className="career-course-Input">
                  <label htmlFor="category">Sub-Category :</label>
                  <select
                    id="subject"
                    name="courseSubCategory"
                    style={{ margin: "0px" }}
                    value={CAREERDETAILS.courseSubCategory}
                    onChange={(e) => handleChange(e)}
                  >
                    <option value="">Select</option>
                    <option value="central">Central Schemes</option>
                    <option value="ugc-aicte">UGC / AICTE Schemes</option>
                    <option value="state">State Schemes</option>
                  </select>
                </div>
              )}
              {/* Blog Text  */}
              <div className="career-course-Input">
                <label htmlFor="description">Description :</label>

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
                        "video",
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
              <p className="star">{err}</p>
              <div className="career-submit-btn">
                <button onClick={handleData} className="addBtn">
                  Submit{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};
export default Addcareercourses;
