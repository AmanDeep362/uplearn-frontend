import React, { useLayoutEffect } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Loader from "../../../Loader";
import NotFoundImg from  "../../../../assets/images/not-found.png";
import LiveClassImg from "../../../../assets/images/live-online-classes.jpg";
import { Link } from "react-router-dom";
import { FaEdit, FaEye, FaStreetView } from "react-icons/fa";
export default function StudentClassrooms(props) {
  const [StudentInfo,setStudentInfo] = useState([]);
  const [MyClassroom,setMyClassrooms] = useState([]);
  useEffect(() => {
    if(props.Student){
      if(props.Student.MyClassrooms){
       setStudentInfo(props.Student)
       setMyClassrooms(props.Student.MyClassrooms)
      }
        
   }
     
  }, [props]);
  const gettimestamp = (day) => {
    let today = new Date(day);
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yy = today.getFullYear();
    let hh = today.getHours();
    let mi = today.getMinutes();
    let ss = today.getSeconds();
    let time = dd + "/" + mm + "/" + yy + "(" + hh + ":" + mi + ":" + ss + ")";
    return time;
  };
  console.log(MyClassroom);
  if (MyClassroom.length < 1 || !MyClassroom) {
    return (
      <>
        <div className="addcourse-main-container">
          <div className="no-found-container">
            <h1>You are not added by your Instructor</h1>
            <img src={NotFoundImg} alt="AddCourse" />
          </div>
        </div>
      </>
    );
  } else if (MyClassroom) {
    return (
      <>
        <div className="addcourse-main-container">
          {/* Course heading to Add New Course  */}
          <div className="my-courses-container">
            <h2>My Classrooms</h2>
          </div>
          <hr style={{ marginTop: "8px" }} />

          {/* Cards of the My  Courses to edit and manage course  */}
          <div className="add-content-card-container">
            {MyClassroom.map((item) => (
              <div className="add-content-card" key={item._id}>
                <img src={LiveClassImg} alt="Thumbnail" style={{height: '220px'}}/>
                <div className="add-content-card-body">
                  <h2>{item.ClassName}</h2>
                  <div className="add-content-card-body-inner">
                    <p>
                      <strong>Description : </strong>
                      {item.ClassDescription}
                    </p>
                    <br /> <br />
                    <p>
                      <strong>class : </strong>
                      {item.Class}
                    </p>
                    <p>
                      <strong>Subject : </strong>
                      {item.Subject}
                    </p>
                    <p>
                      <strong>Created at : </strong>
                      {gettimestamp(item.classDatePost)}
                    </p>
                  </div>
                  <Link
                    className="edit-content-link"
                    to={"/studentdashboard/my-classroom/" + item._id}
                  >
                    <button>
                     Preview Class
                     &nbsp;
                      <FaEye />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  } else {
    return <Loader />;
  }
 
}
