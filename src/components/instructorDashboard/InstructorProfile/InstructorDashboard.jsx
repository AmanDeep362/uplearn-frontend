import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../../Loader";
import axios from "axios";

import InstructorSidebar from "./InstructorSidebar";
import InstructorDashHome from "./InstrutorComponent/InstructorDashHome";
import InstructorAssignTask from "./InstrutorComponent/MyTask/InstructorTasks";
import MyCourses from "./InstrutorComponent/MyCourses/instructorMyCourses";
import MyClassrooms from "./InstrutorComponent/MyClasses/MyClassrooms";
import AddNewClass from "./InstrutorComponent/MyClasses/AddNewClass";
import ManageClass from "./InstrutorComponent/MyClasses/ManageClass";
import LiveClassAttendance from "./InstrutorComponent/MyClasses/ClassManage/LiveClassAttendance";
import PreviewAttandance from "./InstrutorComponent/MyClasses/ClassManage/PreviewAttandance";
import Chatbox from "./InstrutorComponent/MyClasses/Chatbox/Chatbox";

var CryptoJS = require("crypto-js");

function InstructorDashboard() {
  const loginDetails = useSelector((state) => state.userReducers);
  let navigate = useNavigate();

  const [instructor, setinstructor] = useState({});
  const [Loading, setLoading] = useState(true);

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

    if (Number(loginDetails.isLoggedIn) && role === "INSTRUCTOR") {
      const fetchdata = async () => {
        await axios
          .get("/aboutInstructor")
          .then((response) => {
            setinstructor(response.data);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
            navigate("/login");
          });
      };
      fetchdata();
    } else if (Number(loginDetails.isLoggedIn) && role === "STUDENT") {
      navigate("/studentdashboard");
    } else {
      navigate("/login");
    }
  }, [loginDetails.userRole, loginDetails.isLoggedIn, navigate]);

  if (Loading) {
    return <Loader />;
  } else {
    return (
      <div className="instructor-dashboard">
        {/* SideBar Present at All Places  */}
        <InstructorSidebar />
        <Routes>
          <Route
            path="/"
            element={<InstructorDashHome details={instructor} />}
          />
          <Route
            path="/task-assign"
            element={<InstructorAssignTask details={instructor} />}
          />
          <Route
            path="/my-courses"
            element={<MyCourses details={instructor} />}
          />
          <Route
            path="/my-classroom"
            element={<MyClassrooms InstructorInfo={instructor} />}
          />
          <Route
            path="/my-classroom/add-new-class"
            element={<AddNewClass details={instructor} />}
          />
          <Route
            path="/my-classroom/:id"
            element={<ManageClass InstructorInfo={instructor} />}
          />
      
          <Route
            path="/my-classroom/PreviewAttandance/:meetingId/:id"
            element={<PreviewAttandance  />}
          />
      
        </Routes>
      </div>
    );
  }
}

export default InstructorDashboard;
