import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../../Loader";
import AddNotes from "./AddNotes";
import Chatbox from "./Chatbox/Chatbox";
import LiveClassAttendance from "./ClassManage/LiveClassAttendance";
import SchedulseClass from "./ClassManage/ScheduleClass";

export default function ManageClass() {
  const [MyClassroom, setMyClassroom] = useState({});
  const [StudentInfo, setStudentsInfo] = useState([]);
  const [instructorInfo, setinstructor] = useState([]);

  const { id } = useParams();
  let navigate = useNavigate();
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    window.scroll(0, 0);
    const fetchClassroom = async () => {
      await axios
        .get("/myClass/" + id)
        .then((response) => {
          setMyClassroom(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchClassroom();
    const fetchdata = async () => {
      await axios
        .get("/allStudents")
        .then((response) => {
          setStudentsInfo(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchdata();
    const fetchInstructor = async () => {
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
    fetchInstructor();
  }, [id, Loading]);

  // console.log(MyClassroom);
  // States to handle component changes in page
  const [ParticipantShow, setParticipantShow] = useState(true);
  const [NoticeShow, setNoticeShow] = useState(false);
  const [NotesShow, setNotesShow] = useState(false);
  const [AtandanceShow, setAtandanceShow] = useState(false);
  const [ScheduleClassShow, setScheduleClassShow] = useState(false);

  const handleParticipantShow = () => {
    setParticipantShow(true);
    setNoticeShow(false);
    setNotesShow(false);
    setAtandanceShow(false);
    setScheduleClassShow(false);
  };

  const handleNoticeShow = () => {
    setParticipantShow(false);
    setNoticeShow(true);
    setNotesShow(false);
    setAtandanceShow(false);
    setScheduleClassShow(false);
  };

  const handleNotesShow = () => {
    setParticipantShow(false);
    setNoticeShow(false);
    setNotesShow(true);
    setAtandanceShow(false);
    setScheduleClassShow(false);
  };

  const handleAtandanceShow = () => {
    setParticipantShow(false);
    setNoticeShow(false);
    setNotesShow(false);
    setAtandanceShow(true);
    setScheduleClassShow(false);
  };
  const handleScheduleShow = () => {
    setParticipantShow(false);
    setNoticeShow(false);
    setNotesShow(false);
    setAtandanceShow(false);
    setScheduleClassShow(true);
  };

  const AddParticipants = () => {
    const [err, seterr] = useState("");
    const [newParticipant, setParticipant] = useState("");
    const AddNewParticipant = async () => {
      const isSameStudent = StudentInfo.find((i) => i.email == newParticipant);
      if (newParticipant === "") {
        seterr("Select Participant from the List");
      } else {
        const isParticipantAdded = MyClassroom[0].classUsers.find(
          (j) => j == isSameStudent._id
        );

        if (isParticipantAdded) {
          seterr("Participant Already Added");
        } else {
          const UserId = isSameStudent._id;
          const classId = id;
          const InstructorId = MyClassroom[0].classOwner;
          const res = await fetch("/Add-Participant", {
            method: "POST",
            headers: {
              "content-Type": "application/json",
            },
            body: JSON.stringify({
              UserId,
              classId,
              InstructorId,
            }),
          });

          if (res.status === 200) {
            seterr("Participant Added Succesfully");
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
            }, 5000);
          } else {
            seterr("Something Went Wrong, Try Later\nError Occured");
          }
        }
      }
    };
    if (MyClassroom[0].classUsers.length < 1) {
      return (
        <>
          <div className="add-participants-container">
            <div className="add-user-Container">
              <div className="library-filter-container">
                <div className="librarySearch">
                  <input
                    list="library-search"
                    name="librarySearch"
                    value={newParticipant}
                    placeholder="What are you looking for ?"
                    onChange={(e) => setParticipant(e.target.value)}
                  />
                  {StudentInfo.length > 0 ? (
                    <datalist id="library-search">
                      {StudentInfo.map((item) => (
                        <option value={item.email} />
                      ))}
                    </datalist>
                  ) : null}

                  <button onClick={AddNewParticipant} type="submit">
                    Add Participant
                  </button>
                </div>
                <br />
                <p className="star">{err}</p>
                <br />
                <h2 style={{ textAlign: "center" }}>
                  No Participants in class{" "}
                </h2>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      let x = 0;
      let MyStudent;
      return (
        <>
          <div className="add-participants-container">
            <div className="add-user-Container">
              <div className="library-filter-container">
                <div className="librarySearch">
                  <input
                    list="library-search"
                    name="librarySearch"
                    value={newParticipant}
                    placeholder="Enter User Email to Search ..."
                    onChange={(e) => setParticipant(e.target.value)}
                  />
                  {StudentInfo.length > 0 ? (
                    <datalist id="library-search">
                      {StudentInfo.map((item) => (
                        <option value={item.email} />
                      ))}
                    </datalist>
                  ) : null}

                  <button onClick={AddNewParticipant} type="submit">
                    Add Participant
                  </button>
                </div>
                <br />
                <p className="star">{err}</p>

                {/* Table Show the Details of Teacher  */}
                <div className="instructor-table" style={{ marginTop: "40px" }}>
                  <p>
                    <b>Total Students: {MyClassroom[0].classUsers.length}</b>
                  </p>
                  <table>
                    <thead>
                      <tr>
                        <th>Sr. No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Remove</th>
                      </tr>
                    </thead>
                    <tbody>
                      {MyClassroom[0].classUsers.map((items) => {
                        let MyStudent = StudentInfo.find(
                          (i) => i._id === items
                        );
                        if (MyStudent) {
                          return (
                            <>
                              <tr key={MyStudent._id}>
                                <td>{++x}</td>
                                <td
                                  style={{
                                    textAlign: "left",
                                    paddingLeft: "1rem",
                                  }}
                                >
                                  {MyStudent.name}
                                </td>
                                <td style={{ textTransform: "none" }}>
                                  {MyStudent.email}
                                </td>
                                <td>
                                  <button
                                    className="rmvbtn"
                                    onClick={async () => {
                                      const UserId = MyStudent._id;
                                      const ClassId = id;
                                      console.log(UserId);
                                      console.log(ClassId);
                                      const res = await fetch(
                                        "/removefromclass",
                                        {
                                          method: "POST",
                                          headers: {
                                            "content-Type": "application/json",
                                          },
                                          body: JSON.stringify({
                                            UserId,
                                            ClassId,
                                          }),
                                        }
                                      );
                                      if (res.status === 200) {
                                        setLoading(true);
                                        setTimeout(() => {
                                          setLoading(false);
                                        }, 5000);
                                      } else {
                                        console.log(res);
                                      }
                                    }}
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            </>
                          );
                        }
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }
  };
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
  if (Loading) {
    return <Loader />;
  } else {
    if (MyClassroom.length > 0) {
      return (
        <>
          <div className="my-class-main-container">
            <div className="my-class-header">
              <h1>My Classroom</h1>
              <p>
                <strong>Total Number of Students : </strong>
                {MyClassroom[0].classUsers.length}
              </p>
              <div className="myclass-details">
                <p>
                  <strong>Class Name : </strong>
                  {MyClassroom[0].ClassName}
                </p>
                <p>
                  <strong>Subject : </strong>
                  {MyClassroom[0].Subject}
                </p>
                <p>
                  <strong>Class : </strong> {MyClassroom[0].Class || +"10"}th
                </p>
                <p>
                  <strong>Meeting Id : </strong>
                  {MyClassroom[0].meetingId}
                </p>
                <p>
                  <strong>Created Time : </strong>
                  {gettimestamp(MyClassroom[0].classDatePost)}
                </p>
              </div>
              <p>
                <strong>Class Description : </strong>
                <br />
                {MyClassroom[0].ClassDescription}
              </p>
            </div>
            <div className="manage-class-container">
              {/* The Linker Page to navigate the components  */}
              <div className="course-content-navbar">
                {/* Buttons to make Notice, text and Notes visible at different time  */}
                <div className="edit-course-container-btnchanger">
                  <button
                    onClick={handleParticipantShow}
                    className={ParticipantShow ? "bt-active" : ""}
                  >
                    Add Participants
                  </button>
                  <button
                    onClick={handleNoticeShow}
                    className={NoticeShow ? "bt-active" : ""}
                  >
                    Add Activities
                  </button>
                  <button
                    onClick={handleNotesShow}
                    className={NotesShow ? "bt-active" : ""}
                  >
                    Add Notes
                  </button>

                  <button
                    onClick={handleAtandanceShow}
                    className={AtandanceShow ? "bt-active" : ""}
                  >
                    View Attendance
                  </button>
                  <button
                    onClick={handleScheduleShow}
                    className={ScheduleClassShow ? "bt-active" : ""}
                  >
                    Schedule Class
                  </button>
                </div>
              </div>

              {/* Showing Participant if Participant is Active  */}
              {ParticipantShow && <AddParticipants />}

              {/* Showing Notice if Notice is Active  */}
              {NoticeShow && (
                <Chatbox
                  MyClassroom={MyClassroom}
                  instructorInfo={instructorInfo}
                />
              )}
              {NotesShow && <AddNotes />}

              {/* Showing Notes if Notes is Active  */}
              {/* {NotesShow && <ClassNotes />} */}

              {/* Showing Atandance if Atandance is Active  */}
              {AtandanceShow && (
                <LiveClassAttendance
                  MyClassroom={MyClassroom}
                  StudentInfo={StudentInfo}
                />
              )}
              {/* Showing ScheduleClassShow  if ScheduleClassShow  is Active  */}
              {ScheduleClassShow && (
                <SchedulseClass
                  Instructor={instructorInfo}
                  classId={id}
                  MyClassroom={MyClassroom}
                />
              )}
            </div>
          </div>
        </>
      );
    }
  }
}
