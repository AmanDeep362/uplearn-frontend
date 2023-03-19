import React from "react";
import { Link } from "react-router-dom";
import { BsStickiesFill } from "react-icons/bs";

const InstructorDashHome = (props) => {
  const teacher = props.details;
  // console.log(teacher);
  return (
    <div className="instructor-myprofile-container">
      <div className="instructor-myprofile-heading">
        <div>
          <h1>My Profile</h1>
          <p>Set your bio, and other public-facing information.</p>
        </div>

        {/* change Password  */}
        <div>
          <Link to={"/instructor-change-password"}>
            <button>Change Password</button>
          </Link>
        </div>
      </div>
      <hr style={{ marginBottom: "0.8rem 0px" }} />
      {/* Showing the Profile Image and info  */}
      <div className="instructor-myprofile-container-basic">
        <div className="instructor-myprofile-container-image">
          <img src={teacher.image} alt="MyProfile" />
        </div>
        <div className="instructor-myprofile-container-profile">
          <h1>{teacher.Teachername}</h1>
          <p>
            <strong>Email : </strong>
            {teacher.email}
          </p>
          <p>
            <strong>Phone : </strong>
            +91-{teacher.mobileno}
          </p>
          <p>
            <strong>Teacher Id : </strong>
            {teacher.teacher_id}
          </p>
        </div>

        {/* Schooling Details Of Instructor  */}
        <div className="instructor-myprofile-container-other">
          <h1>Schooling</h1>
          <p>
            <strong>School : </strong>
            {teacher.school}
          </p>
          <div className="instructor-myprofile-container-inner">
            <p>
              <strong>Class : </strong>
              <br />
              {teacher.classteacher}
            </p>
            <p>
              <strong>Subject : </strong>
              <br />
              {teacher.subject}
            </p>
            <p>
              <strong>Degree :</strong>
              <br />
              {teacher.degree}
            </p>
          </div>
        </div>
      </div>
      {/* Address Details Of Instructor  */}
      <div className="instructor-myprofile-container-other">
        <h1>Address</h1>
        <hr style={{ marginBottom: "0.5rem" }} />
        <div className="instructor-myprofile-container-inner">
          <p>
            <strong>State : </strong>
            <br />
            {teacher.state}
          </p>
          <p>
            <strong>City : </strong>
            <br />
            {teacher.city}
          </p>
          <p>
            <strong>Block : </strong>
            <br />
            {teacher.block}
          </p>
          <p>
            <strong>Pincode :</strong>
            <br />
            {teacher.pincode}
          </p>
        </div>
        <div className="instructor-myprofile-container-inner">
          <p>
            <strong>Permanent Address :</strong>
            <br />
            {teacher.permanentAddress}
          </p>
        </div>
      </div>

      <br />
      <div className="instructor-myprofile-container-other">
        <h1>Status</h1>
        <hr />
      </div>
      {/* Cards Showing Instructor Details  */}
      <div className="inst-profile-cards-container">
        <div className="inst-profile-cards">
          <p>
            <BsStickiesFill /> &nbsp;Course in progress
          </p>
          <h1>{teacher.CousesList ? teacher.CousesList.length : 0}</h1>
        </div>

        {/* enrolled  */}
        <div className="inst-profile-cards">
          <p>
            <BsStickiesFill /> &nbsp;Pending Task
          </p>
          <h1>{0}</h1>
        </div>

        {/* classrooms  */}
        <div className="inst-profile-cards">
          <p>
            <BsStickiesFill /> &nbsp;Classrooms in progress
          </p>
          <h1>{teacher.MyClassrooms ? teacher.MyClassrooms.length : 0}</h1>
        </div>

        {/* enrolled  */}
        <div className="inst-profile-cards">
          <p>
            <BsStickiesFill /> &nbsp;Enrolled Courses
          </p>
          <h1>{teacher.CousesEnrolled ? teacher.CousesEnrolled.length : 0}</h1>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashHome;
