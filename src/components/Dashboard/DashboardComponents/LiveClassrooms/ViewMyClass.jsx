import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StudentChatbox from "./Chatbox/StudentChatbox";
import MyClassSchedule from "./MyClassSchedule";

export default function ViewMyClass(props) {
  const { id } = useParams();
  const [StudentInfo, setStudentInfo] = useState([]);
  const [MyClassroom, setMyClassrooms] = useState([]);
  const [NoticeShow, setNoticeShow] = useState(true);
  const [NotesShow, setNotesShow] = useState(false);
  const [ScheduleClassShow, setScheduleClassShow] = useState(false);

  const handleNoticeShow = () => {
    setNoticeShow(true);
    setNotesShow(false);
    setScheduleClassShow(false);
  };

  const handleNotesShow = () => {
    setNoticeShow(false);
    setNotesShow(true);
    setScheduleClassShow(false);
  };

  const handleScheduleClassShow = () => {
    setNoticeShow(false);
    setNotesShow(false);
    setScheduleClassShow(true);
  };
  useEffect(() => {
    if (props.Student) {
      if (props.Student.MyClassrooms) {
        setStudentInfo(props.Student);
        const MyClass = props.Student.MyClassrooms.find((i) => i._id == id);
        setMyClassrooms(MyClass);
      }
    }
  }, [props]);
  return (
    <>
      <div className="my-class-main-container">
        <div className="my-class-header">
          <h1>My Classroom</h1>
          <p>
            <strong>Class Name : </strong>
            {MyClassroom.ClassName}
          </p>
          <p>
            <strong>Subject : </strong>
            {MyClassroom.Subject}
          </p>
          <p>
            <strong>Class : </strong>
            {MyClassroom.Class ? MyClassroom.Class + " th" : "10 th"}
          </p>
          <p>
            <strong>Class Description : </strong>
            {MyClassroom.ClassDescription}
          </p>
        </div>
        <div className="manage-class-container">
          {/* The Linker Page to navigate the components  */}
          <div className="course-content-navbar">
            {/* Buttons to make Notice, text and Notes visible at different time  */}
            <div className="edit-course-container-btnchanger">
              <button
                onClick={handleNoticeShow}
                className={NoticeShow ? "bt-active" : ""}
              >
                Activities
              </button>
              <button
                onClick={handleNotesShow}
                className={NotesShow ? "bt-active" : ""}
              >
                Notes
              </button>

              <button
                onClick={handleScheduleClassShow}
                className={ScheduleClassShow ? "bt-active" : ""}
              >
                Class Schedule
              </button>
            </div>
          </div>

          {/* Showing Notice if Notice is Active  */}
          {NoticeShow && (
            <StudentChatbox
              MyClassroom={MyClassroom}
              StudentInfo={StudentInfo}
            />
          )}

          {/* Showing Notes if Notes is Active  */}
          {NotesShow}

          {/* Showing ScheduleClass if Atandance is Active  */}
          {ScheduleClassShow && (
            <MyClassSchedule
              StudentInfo={StudentInfo}
              MyClassroom={MyClassroom}
            />
          )}
        </div>
      </div>
    </>
  );
}
