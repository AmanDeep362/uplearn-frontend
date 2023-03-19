import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BiArrowBack } from "react-icons/bi";
import Loader from "./../../assets/images/progressbar.gif";
import axios from "axios";

function InstructorRegister() {
  let navigate = useNavigate();
  const [adminInfo, setadminInfo] = useState("");
  const adminstatus = useSelector((state) => state.AdminReducers);

  // States to store Images
  const [UserImage, setUserImage] = useState("");
  const [UserImageData, setUserImageData] = useState();

  const [IdImage, setIdImage] = useState("");
  const [IdImageData, setIdImageData] = useState();

  const [AharImage, setAharImage] = useState("");
  const [AdharImageData, setAdharImageData] = useState();

  // Store response of return Image
  var Image = "",
    idresImage = "",
    aadharImage = "";
  // const [Image, setImage] = useState("");
  // const [idresImage, setidresImage] = useState("");
  // const [, setaadharImage] = useState("");

  const [err, seterr] = useState("");
  // State to Store Elements of input field
  const [values, setValues] = useState({
    Teachername: "",
    email: "",
    mobileno: "",
    subject: "",
    block: "",
    permanentAddress: "",
    temporaryAdd: "",
    school: "",
    city: "",
    state: "",
    pincode: "",
    teacher_id: "",
    degree: "",
    classteacher: "",
    aadharCard: "",
  });

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

  // console.log("Cloud Response", Image, idresImage, aadharImage);

  const submitImage = async (image, imageData, imagevalue) => {
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
            if (imagevalue === "idimage") {
              idresImage = data.image.image;
            } else if (imagevalue === "AadharcardImage") {
              aadharImage = data.image.image;
            } else if (imagevalue === "image") {
              Image = data.image.image;
            }
          }
        });
    }
  };

  const postData = async () => {
    const AadharcardImage = aadharImage;
    const idImage = idresImage;
    const image = Image;

    const {
      Teachername,
      email,
      mobileno,
      subject,
      block,
      permanentAddress,
      temporaryAdd,
      school,
      city,
      state,
      pincode,
      teacher_id,
      aadharCard,
      degree,
      classteacher,
    } = values;

    const res = await fetch("/InstructorRegister", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        Teachername,
        email,
        mobileno,
        subject,
        block,
        permanentAddress,
        temporaryAdd,
        school,
        city,
        state,
        pincode,
        idImage,
        image,
        teacher_id,
        aadharCard,
        AadharcardImage,
        degree,
        classteacher,
      }),
    });

    if (res.status === 200) {
      window.alert("Successful Registration.\nWelcome to  family of UpLearn.");
      navigate("/admin-portal-home-190310554227");
    } else {
      console.log(res);
      window.alert("Something Went Wrong, Try Later\nError Occured");
    }
  };

  const time = 10000;

  function sendData() {
    setTimeout(function () {
      if (idresImage === "" || aadharImage === "" || Image === "") {
        sendData();
      } else {
        postData();
      }
    }, time);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const submit = handleValidation();

    if (submit) {
      seterr("Please wait we are uploading your Data");
      document.getElementById("myinstBtn").disabled = true;
      document.getElementById("loader-reg").style.display = "inline";

      // Send Images to cloud
      await submitImage(IdImage, IdImageData, "idimage");
      await submitImage(AharImage, AdharImageData, "AadharcardImage");
      await submitImage(UserImage, UserImageData, "image");

      // Send Data to Backend after 10 sec
      sendData();
    }
  };

  //form validation
  const handleValidation = () => {
    if (
      !values.Teachername ||
      !values.email ||
      !values.mobileno ||
      !values.subject ||
      !values.block ||
      !values.permanentAddress ||
      !values.temporaryAdd ||
      !values.school ||
      !values.city ||
      !values.state ||
      !values.pincode ||
      !values.teacher_id ||
      !values.degree ||
      !values.classteacher ||
      !values.aadharCard
    ) {
      seterr("Please Enter all required Fields.");
      return false;
    } else if (values.mobileno.length !== 10) {
      seterr("Mobile Number must be of 10 number or without +91");
      return false;
    }  else if (IdImage === "") {
      seterr("Please Upload your ID Card Image.");
      return false;
    } else if (UserImage === "") {
      seterr("Please Upload your Profile Image.");
      return false;
    } else if (AharImage === "") {
      seterr("Please Upload your Aadhar Card Image.");
      return false;
    }
    return true;
  };

  // Function to Set values enter in input field
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    seterr("");
  };

  // Function to Set Image
  function validateTeacherIdImg(e) {
    const fileSize = e.target.files[0].size / 1024 / 1024; // in MiB
    if (fileSize > 2) {
      alert("File size exceeds 2 MB");
    } else {
      setIdImage(e.target.files[0].name);
      setIdImageData(e.target.files[0]);
    }
  }

  function validateTeacherProImg(e) {
    const fileSize = e.target.files[0].size / 1024 / 1024; // in MiB
    if (fileSize > 2) {
      alert("File size exceeds 2 MB");
    } else {
      setUserImage(e.target.files[0].name);
      setUserImageData(e.target.files[0]);
    }
  }

  function validateTeacherAadharImg(e) {
    const fileSize = e.target.files[0].size / 1024 / 1024; // in MiB
    if (fileSize > 2) {
      alert("File size exceeds 2 MB");
    } else {
      setAharImage(e.target.files[0].name);
      setAdharImageData(e.target.files[0]);
    }
  }

  // console.log(values);
  return (
    <>
      {/* The Container Of Login An instructor In Page  */}
      <div className="instructor">
        <div className="instructorHeader">
          <Link to="/admin-portal-home-190310554227">
            <BiArrowBack className="backBtn" style={{ color: "white" }} />
          </Link>
        </div>
        <div className="instructorWrapper">
          <div className="instructorForm">
            <form>
              <h3>UpLearn Instructor Registration</h3>
              <div className="basicDetail">
                <span className="title">
                  Basic Details
                  <hr />
                </span>
                <div className="fields">
                  <div className="inputField">
                    <label htmlFor="name">
                      Name<span className="star">*</span>
                    </label>
                    <input
                      type="text"
                      id="Teachername"
                      name="Teachername"
                      placeholder="Your Name"
                      value={values.Teachername}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="inputField">
                    <label htmlFor="email">
                      Email<span className="star">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Your Email"
                      value={values.email}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="inputField">
                    <label htmlFor="mobile">
                      Mobile<span className="star">*</span>
                    </label>
                    <input
                      type="number"
                      id="mobile"
                      name="mobileno"
                      placeholder="Your Mobile Number"
                      value={values.mobileno}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  
                </div>
              </div>
              <div className="addressDetail">
                <span className="title">
                  Address
                  <hr />
                </span>
                <div className="fields">
                  <div className="inputField">
                    <label htmlFor="permanentAddress">
                      Permanent Address<span className="star">*</span>
                    </label>
                    <input
                      type="text"
                      id="permanentAddress"
                      name="permanentAddress"
                      placeholder="Your Address"
                      value={values.permanentAddress}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="inputField">
                    <label htmlFor="temporaryAdd">Temporary Address</label>
                    <input
                      type="text"
                      id="temporaryAdd"
                      name="temporaryAdd"
                      value={values.temporaryAdd}
                      placeholder="Your Address"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="inputField">
                    <label htmlFor="block">
                      Block<span className="star">*</span>
                    </label>
                    <input
                      type="text"
                      id="block"
                      name="block"
                      placeholder="Your Block"
                      value={values.block}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="inputField">
                    <label htmlFor="city">
                      City<span className="star">*</span>
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      placeholder="Your City"
                      value={values.city}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="inputField">
                    <label htmlFor="state">
                      State<span className="star">*</span>
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      placeholder="Your State"
                      value={values.state}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="inputField">
                    <label htmlFor="pincode">
                      Pincode<span className="star">*</span>
                    </label>
                    <input
                      type="number"
                      id="pincode"
                      name="pincode"
                      placeholder="Pincode"
                      value={values.pincode}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="otherDetail">
                <span className="title">
                  Other <hr />
                </span>
                <div className="fields">
                  <div className="inputField">
                    <label htmlFor="teacherId">
                      Teacher ID<span className="star">*</span>
                    </label>
                    <input
                      type="number"
                      id="teacherId"
                      name="teacher_id"
                      placeholder="Your Teacher ID"
                      value={values.teacher_id}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>

                  <div className="inputField">
                    <label htmlFor="school">
                      School<span className="star">*</span>
                    </label>
                    <input
                      type="text"
                      id="school"
                      name="school"
                      placeholder="Your School"
                      value={values.school}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  
                  <div className="inputField">
                    <label htmlFor="bookclass1">
                      Select Subject<span className="star">*</span>
                    </label>
                    <select id="bookclass1" name="subject"
                        value={values.subject}
                        onChange={(e) => handleChange(e)}
                    >
                      <option value="">-- select one --</option>
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
                      <option value="Environmental Science">Environmental Science</option>
                      <option value="Physical Education">Physical Education</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="inputField">
                    <label htmlFor="higherdegree">
                      Higher Degree<span className="star">*</span>
                    </label>
                    <select id="higherdegree" name="degree"
                        value={values.degree}
                        onChange={(e) => handleChange(e)}
                    >
                      <option value="">-- select one --</option>
                      <option value="Primary education">Primary Education</option>
                      <option value="Secondary education">Secondary Education</option>
                      <option value="Bachelor's degree">Bachelor's degree</option>
                      <option value="Master's degree">Master's degree</option>
                      <option value="Doctorate or higher">Doctorate or higher</option>
                    </select>
                  </div>

                  <div className="inputField">
                    <label htmlFor="teacherofclass">
                      Class Teacher<span className="star">*</span>
                    </label>
                    <select id="teacherofclass" name="classteacher"
                        value={values.classteacher}
                        onChange={(e) => handleChange(e)}
                    >
                      <option value="">-- select one --</option>
                      <option value="Primary education">Primary School(class 1-5)</option>
                      <option value="Middle school">Middle School(class 6-10)</option>
                      <option value="Secondary education">Secondary education(class 11-12)</option>
                    </select>
                  </div>
                  
                  <div className="inputField btn">
                    <label htmlFor="idImage">
                      Teacher ID<span className="star">*</span>
                    </label>
                    <input
                      type="file"
                      id="idImage"
                      accept="image/*"
                      onChange={(e) => {
                        validateTeacherIdImg(e);
                      }}
                      className="uploadBtn"
                    />
                    <p className="uploadphoto">{IdImage}</p>
                  </div>
                  <div className="inputField btn">
                    <label htmlFor="image">
                      Teacher Image<span className="star">*</span>
                    </label>
                    <input
                      type="file"
                      id="image"
                      accept="image/*"
                      onChange={(e) => {
                        validateTeacherProImg(e);
                      }}
                      className="uploadBtn"
                    />
                    <p className="uploadphoto">{UserImage}</p>
                  </div>
                </div>
              </div>
              <div className="aadhaarDetail">
                <span className="title">
                  Aadhaar Details <hr />
                </span>
                <div className="fields">
                  <div className="inputField">
                    <label htmlFor="aadharCard">
                      Aadhaar Number<span className="star">*</span>
                    </label>
                    <input
                      type="number"
                      id="aadharCard"
                      name="aadharCard"
                      placeholder="Your Aadhar Number"
                      value={values.aadharCard}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="inputField btn">
                    <label htmlFor="aadharCardImage">
                      Aadhaar Card<span className="star">*</span>
                    </label>
                    <input
                      type="file"
                      id="aadharCardImage"
                      className="uploadBtn"
                      accept="image/*"
                      onChange={(e) => {
                        validateTeacherAadharImg(e);
                      }}
                    />
                    <p className="uploadphoto">{AharImage}</p>
                  </div>
                </div>
              </div>

              <div className="instructorRegisterBtn">
                <div style={{textAlign: 'center'}}>
                  <img src={Loader} alt="Loader" id="loader-reg" />
                  <p className="uploadphoto">{err}</p>
                </div>
                <button
                  id="myinstBtn"
                  type="submit"
                  onClick={handleSubmit}
                  className="registerBtn"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default InstructorRegister;
