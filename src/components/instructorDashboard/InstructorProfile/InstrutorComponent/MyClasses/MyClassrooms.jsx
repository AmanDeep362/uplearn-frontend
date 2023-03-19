import React, { useEffect, useState } from "react";
import NotFoundImg from "../../../../../assets/images/not-found.png";
import LiveClassImg from "../../../../../assets/images/live-online-classes.jpg";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import Loader from "../../../../Loader";
import axios from "axios";
import { MdDelete } from "react-icons/md";

function MyClassrooms(props) {
  let Instructors;
  if (props.InstructorInfo) {
    Instructors = props.InstructorInfo;
  }
  const [Loading, setLoading] = useState(true);
  const [MyClassroom, setMyClassroom] = useState([]);

  // console.log(Instructors);
  const Id = Instructors._id;
  useEffect(() => {
    const fetchCourse = async () => {
      await axios
        .get("/myClassrooms/" + Id)
        .then((response) => {
          setMyClassroom(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchCourse();
  }, [props.InstructorInfo._id]);

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
  // const deleteClass = async (data)=>{
  //   const classId = data._id
  //   const res =  await fetch("/deleteMyClassroom" ,{
  //     method : "POST",
  //     headers : { 
  //         "content-Type" : "application/json"
  //     },
  //     body : JSON.stringify({
  //       classId 
  //     })
  //   });
  //   if (res.status === 200) {
  //     setLoading(true);
  //     setTimeout(() => {
  //       setLoading(false);
    
  //     },5000);
  //     console.log("deleted");
  //   }
  //   else{
  //     console.log(res);
  //   }
  // }
  const AddnewClass = () => {
    // console.log(MyClassroom);
    if (MyClassroom.length < 1 || !MyClassroom) {
      return (
        <>
          <div className="addcourse-main-container">
            <div className="no-found-container">
              <h1>Not Any Class Added By You</h1>
              <img src={NotFoundImg} alt="AddCourse" />
              <Link
                to="/instructordashboard/my-classroom/add-new-class"
                className="btn-add-new-course"
              >
                Add New Class
              </Link>
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

              <Link
                to="/instructordashboard/my-classroom/add-new-class"
                className="btn-add-new-course"
              >
                New Class +
              </Link>
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
                      to={"/instructordashboard/my-classroom/" + item._id}
                    >
                      <button>
                        Manage Classroom&nbsp;
                        <FaEdit />
                      </button>
                    </Link>
                    {/* <button onClick={deleteClass(item)} style={{backgroundColor:"#a10e0e"}}>&nbsp;&nbsp;
                       Delete
                        <MdDelete />
                      </button> */}
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
  };

  return (
    <>
      <AddnewClass />
    </>
  );
}
export default MyClassrooms;
