import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from "./../../assets/images/logo.png";
import { FaAngleDown, FaBars, FaUserCircle } from "react-icons/fa";

var CryptoJS = require("crypto-js");

function Navbar() {
  const loginDetails = useSelector((state) => state.userReducers);
  const [userrole, setuserrole] = useState("");

  useEffect(() => {
    // Decrypting the User Role
    if (loginDetails.userRole !== "") {
      var bytes = CryptoJS.AES.decrypt(
        loginDetails.userRole,
        "my-secret-key@123"
      );
      var role = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }

    if (Number(loginDetails.isLoggedIn) && role === "INSTRUCTOR") {
      setuserrole("INSTRUCTOR");
    } else if (Number(loginDetails.isLoggedIn) && role === "STUDENT") {
      setuserrole("STUDENT");
    } else {
      setuserrole("");
    }
  }, [loginDetails.userRole, loginDetails.isLoggedIn]);

  const Toggler = () => {
    var element = document.getElementById("toggleNav");
    element.classList.toggle("show-slider");
  };

  return (
    <div className="wrapper" id="navbar">
      <nav>
        <div className="content">
          {/* Icon for the Navbar toggle */}
          <label htmlFor="show-menu" className="menu-icon" onClick={Toggler}>
            <FaBars />
          </label>
          {/* The website Logo and Name  */}
          <div className="logo">
            <NavLink to="/">
              <img src={Logo} alt="Logo" className="logo_ig" />
              <span style={{ color: "#2b4eff" }}>Up</span>
              <span>Learn</span>
            </NavLink>
          </div>
        </div>

        <div className="content">
          {/* The Website DropDowns  */}
          <ul className="links" id="toggleNav">
            {/* Link for the Home Page  */}
            <li>
              <NavLink to="/" onClick={Toggler}>
                Home
              </NavLink>
            </li>
            {/* Link for the About Page  */}
            <li>
              <NavLink to="/about-us" onClick={Toggler}>
                About
              </NavLink>
            </li>
            {/* Links for the courses  */}
            <li>
              <NavLink to="/courses" onClick={Toggler}>
                Courses
              </NavLink>
            </li>
            {/* Link and Dropdown for pages  */}
            <li>
              <NavLink
                to="/"
                className="desktop-link"
                onClick={Toggler}
                style={{ paddingRight: "0px" }}
              >
                Features
              </NavLink>
              <input type="checkbox" id="show-pages" />
              <label htmlFor="show-pages">
                <span className="hideNav">Features</span>
                <FaAngleDown />
              </label>
              <ul>
                <li>
                  <NavLink to="/uplearn-virtual-library" onClick={Toggler}>
                    My Library
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/my-lectures" onClick={Toggler}>
                    My Lectures
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/ask-doubt" onClick={Toggler}>
                    Ask a doubt
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/learn-with-fun" onClick={Toggler}>
                    Learn with Fun
                  </NavLink>
                </li>
              </ul>
            </li>
            {/* links and dropdown for Career Counselling */}
            <li>
              <NavLink
                to="/"
                className="desktop-link"
                style={{ paddingRight: "0px" }}
                onClick={Toggler}
              >
                Career Counselling
              </NavLink>
              <input type="checkbox" id="show-blogs" />
              <label htmlFor="show-blogs">
                <span className="hideNav">Career Counselling</span>
                <FaAngleDown />
              </label>
              <ul>
                <li>
                  <NavLink to="carrer-counselling/10/after-10" onClick={Toggler}>
                    After 10th
                  </NavLink>
                </li>
                <li>
                  <NavLink to="carrer-counselling/12/after-12" onClick={Toggler}>
                    After 12th
                  </NavLink>
                </li>
                <li>
                  <NavLink to="carrer-counselling/exam/exams" onClick={Toggler}>
                    Exams
                  </NavLink>
                </li>
                <li>
                  <NavLink to="carrer-counselling/scholar/scholarship" onClick={Toggler}>
                    Scholarship
                  </NavLink>
                </li>
              </ul>
            </li>
            {/* Link for the Contact Page  */}
            <li>
              <NavLink to="/contact" onClick={Toggler}>
                Contact
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Present Data According to User Login  */}
        {userrole === "INSTRUCTOR" ? (
          <div className="sign_toggler">
            {/* Button for Login and Sign In Page  */}
            <div className="dropdown">
              <span>
                <FaUserCircle />
              </span>
              <div className="dropdown-content">
                <NavLink to="/instructordashboard" className="notopbdr">
                  My Dashboard
                </NavLink>
                <NavLink to="/logout">Logout</NavLink>
              </div>
            </div>
          </div>
        ) : userrole === "STUDENT" ? (
          <div className="sign_toggler">
            {/* Button for Login and Sign In Page  */}
            <div className="dropdown">
              <span>
                <FaUserCircle />
              </span>
              <div className="dropdown-content">
                <NavLink to="/studentdashboard" className="notopbdr">
                  My Dashboard
                </NavLink>
                <NavLink to="/studentdashboard/my-classroom">
                  My Classroom
                </NavLink>
                <NavLink to="/logout">Logout</NavLink>
              </div>
            </div>
          </div>
        ) : (
          <div className="sign_toggler">
            {/* Button for Login and Sign In Page  */}
            <div className="dropdown">
              <NavLink to="/login" className="norole">
                <FaUserCircle />
              </NavLink>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
