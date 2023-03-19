import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import Profile from "./DashboardComponents/pages/Profile";
import StudentClassrooms from "./DashboardComponents/pages/StudentClassrooms";
import ViewMyClass from "./DashboardComponents/LiveClassrooms/ViewMyClass";
import StudentSidebar from "./DashboardComponents/StudentSidebat";
import MyCoursesEnroll from "./DashboardComponents/pages/MyCoursesEnroll";

var CryptoJS = require("crypto-js");

export default function StudentDashboard() {
  const loginDetails = useSelector((state) => state.userReducers);
  let navigate = useNavigate();

  const [StudentInfo, setStudentInfo] = useState({});
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
      navigate("/instructordashboard");
    } else if (Number(loginDetails.isLoggedIn) && role === "STUDENT") {
      const fetchdata = async () => {
        await axios
          .get("/aboutStudents")
          .then((response) => {
            setStudentInfo(response.data);
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
  }, [loginDetails.userRole, loginDetails.isLoggedIn, navigate]);

  // console.log(StudentInfo)

  return (
    <>
      <div className="instructor-dashboard">
        {/* SideBar Present at All Places  */}
        <StudentSidebar />

        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="my-courses" element={<MyCoursesEnroll Student={StudentInfo}/>} />
          <Route
            path="/my-classroom"
            element={<StudentClassrooms Student={StudentInfo} />}
          />
          <Route
            path="/my-classroom/:id"
            element={<ViewMyClass Student={StudentInfo} />}
          />
        </Routes>
      </div>
    </>
  );
}
