import React, { useEffect, useState } from "react";
import NotFoundImg from "../../../../../assets/images/not-found.png";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdOutlineAppRegistration } from "react-icons/md";
import Loader from "../../../../Loader";
import axios from "axios";

export default function MyCourses(props) {
  const [courseData, setcourseData] = useState([]);
  const [Loading, setLoading] = useState(true);

  // console.log(props.details._id)

  useEffect(() => {
    const fetchCourse = async () => {
      await axios
        .get("/coursesUplearn/" + props.details._id)
        .then((response) => {
          setcourseData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchCourse();
  }, [props.details._id]);

  // console.log(courseData)

  const AddCoursecontent = () => {
    if (!courseData.length) {
      return (
        <>
          <div className="addcourse-main-container">
            <div className="no-found-container">
              <h1>Not Any Course Added By You</h1>
              <img src={NotFoundImg} alt="AddCourse" />
              <Link
                to="/instructordashboard/my-courses/add-new-course"
                className="btn-add-new-course"
              >
                Add New Course
              </Link>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="addcourse-main-container">
            {/* Course heading to Add New Course  */}
            <div className="my-courses-container">
              <h2>My Courses</h2>

              <Link
                to="/instructordashboard/my-courses/add-new-course"
                className="btn-add-new-course"
              >
                Course +
              </Link>
            </div>
            <hr style={{ marginTop: "8px" }} />

            {/* Cards of the My  Courses to edit and manage course  */}
            <div className="add-content-card-container">
              {courseData.map((item) => (
                <div className="add-content-card" key={item._id}>
                  <img src={item.thumbnail} alt="Thumbnail" />
                  <div className="add-content-card-body">
                    <h2>{item.title}</h2>
                    <div className="add-content-card-body-inner">
                      <p>
                        <strong>Category : </strong>
                        {item.courseCategory}
                      </p>
                      <p>
                        <strong>Level : </strong>
                        {item.level}
                      </p>
                      <p>
                        <strong>Language : </strong>
                        {item.language}
                      </p>
                    </div>
                    {/* Link to Edit and Manage Course  */}
                    <Link
                      className="edit-content-link"
                      to={
                        "/instructordashboard/my-courses/edit-content/" +
                        item._id
                      }
                    >
                      <button>
                        {" "}
                        Edit / Manage &nbsp;
                        <FaEdit />
                      </button>
                    </Link>
                    {/* Link To preview course  */}
                    <Link
                      className="edit-content-link"
                      to={
                        "/instructordashboard/my-courses/preview-content/" +
                        item._id
                      }
                    >
                      <button>
                        {" "}
                        Preview &nbsp;
                        <MdOutlineAppRegistration />
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      );
    }
  };

  if (Loading) {
    return <Loader />;
  } else {
    return (
      <>
        <AddCoursecontent />
      </>
    );
  }
}
