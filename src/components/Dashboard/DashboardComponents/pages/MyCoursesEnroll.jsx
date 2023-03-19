import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// /mycourses/start-learning/6301b2490fde4de57892e8af
function MyCoursesEnroll(props) {
  const [courses, setcourses] = useState([]);

  // checking courses is available or not
  useEffect(() => {
    if (props.Student) {
      if (props.Student.CousesEnrolled) {
        setcourses(props.Student.CousesEnrolled);
      }
    }
  }, [props]);

  return (
    <>
      {courses.length > 0 ? (
        <>
          <div className="enroll-container-student">
            <h1>My Enrolled Courses</h1>
            {courses.map((item, index) => {
              return (
                <div className="enroll-container-inner-student" key={index}>
                    <p>
                        <span>{index + 1}.</span>&nbsp;&nbsp;
                        {item.nameOfCourse}
                    </p>
                  <Link to={"/mycourses/start-learning/" + item.CourseId}>
                    Start
                  </Link>
                </div>
              );
            })}
          </div>
          ;
        </>
      ) : (
        <div className="no-enroll-container">
          <div className="no-enroll-inner-container">
            <h1>No Enrolled Course</h1>
            <p>Learn Out of box and develop your skills.</p>
            <p>Please Enroll Today and make a better Future.</p>
            <Link to="/courses">Start Learning</Link>
          </div>
        </div>
      )}
    </>
  );
}

export default MyCoursesEnroll;
