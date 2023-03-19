import React from "react";
import Banner from "../../../../assets/images/custom.svg";

function MainStudentHeader() {
  return (
    <>
      <div className="mainDashContainer">
        {/* My dashboard Content  */}
        <h2>&nbsp;&nbsp;My Profile</h2>
        {/* My Profile Content  */}
        <p>
          &nbsp;&nbsp;&nbsp;Set your bio, and other public-facing information.
        </p>
        <p></p>
        {/* Dashboard Banner  */}
        <div className="studentNameContainer">
          {/* Banner Inner Content  */}
          <div className="studentName">
            <h4>Welcome Alice!</h4>
            <p>
              Education is the passport to the future, So learn more &amp; more
            </p>
          </div>
          {/* Banner Image  */}
          <div className="image">
            <img src={Banner} alt="DashBanner" />
          </div>
        </div>
      </div>
    </>
  );
}

export default MainStudentHeader;
