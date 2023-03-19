import React from "react";
import { Link } from "react-router-dom";
import { IoGrid } from "react-icons/io5";
import { BiTask } from "react-icons/bi";
import { MdCategory } from "react-icons/md";
import { TbBulb } from "react-icons/tb";
import { SiGoogleclassroom } from "react-icons/si";
import { CgLogOff } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";

import Logo from "./../../../assets/images/logo.png";

const StudentSidebar = () => {
  const togglerSiderbar = () => {
    const e = document.getElementById("instructorSidebar");
    e.classList.toggle("sidebarhider");
  };
  return (
    <>
      {/* Toggler to hide sidebar on small Screen  */}
      <div className="sidebar_toggler" onClick={togglerSiderbar}>
        <i>
          <GiHamburgerMenu />
        </i>
      </div>
      <div className="sidebar sidebarhider" id="instructorSidebar">
        {/* Toggler closer to hide the navbar  */}
        <div className="sidebar_toggler_close" onClick={togglerSiderbar}>
          <i>&times;</i>
        </div>
        {/* Logo  */}
        <div className="logo-details">
          <Link className="link_name" to="/">
            <img src={Logo} alt="Logo" />
          </Link>
        </div>
        {/* Links of the Sidebar  */}
        <ul className="nav-links">
          {/* Dashboard Home  */}
          <li>
            <i>
              <IoGrid />
            </i>
            <ul className="sub-menu">
              <li>
                <Link className="link_name" to="/studentdashboard">
                  Home
                </Link>
              </li>
            </ul>
          </li>
          {/* Dashboard My Task  */}
          <li>
            <i>
              <BiTask />
            </i>
            <ul className="sub-menu">
              <li>
                <Link className="link_name" to="/my-lectures">
                  My Lectures
                </Link>
              </li>
            </ul>
          </li>
          {/* Dashboard My Courses  */}
          <li>
            <i>
              <MdCategory />
            </i>
            <ul className="sub-menu">
              <li>
                <Link className="link_name" to="my-courses">
                  My Courses
                </Link>
              </li>
            </ul>
          </li>
          {/* Ask a doubt  */}
          <li>
            <i>
              <TbBulb />
            </i>
            <ul className="sub-menu">
              <li>
                <Link className="link_name" to="/ask-doubt">
                  Ask a Doubts
                </Link>
              </li>
            </ul>
          </li>

          {/* ClassRoom Icon  */}
          <li>
            <i>
              <SiGoogleclassroom />
            </i>
            <ul className="sub-menu">
              <li>
                <Link className="link_name" to="my-classroom">
                  My Classroom
                </Link>
              </li>
            </ul>
          </li>

          {/* Logout  */}
          <li>
            <i>
              <CgLogOff />
            </i>
            <ul className="sub-menu">
              <li>
                <Link className="link_name" to="/logout">
                  Logout
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </>
  );
};

export default StudentSidebar;
