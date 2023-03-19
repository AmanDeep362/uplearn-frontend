import { useEffect, useState } from "react";
import { AiFillCalendar } from "react-icons/ai";
import Loader from "../../../../../Loader";

export default function SchedulseClass(props) {
  const [Scheduletime, setScheduleTime] = useState("");
  const [err, seterr] = useState("");
  const [MyClassroom, setMyClassroom] = useState({});
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    window.scroll(0, 100);
    setMyClassroom(props.MyClassroom[0]);
    setLoading(false);
  }, [props, Loading]);

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
  const handletimeSubmit = (e) => {
    if (!e.target["validity"].valid) return;
    const dt = e.target["value"];
    setScheduleTime(dt);
  };
  const handleSubmit = async () => {
    if (!Scheduletime) {
      seterr("Date Field is empty . select the Date");
    } else if (new Date(Scheduletime) < new Date()) {
      seterr("select Latest Date");
    } else {
      const classId = props.classId;
      const Scheduledate = Scheduletime;
      const res = await fetch("/ScheduleClass", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          classId,
          Scheduledate,
        }),
      });

      if (res.status === 200) {
        seterr("Class Schedule Succesfully");
        setLoading(true);
      } else {
        seterr("Something Went Wrong, Try Later\nError Occured");
      }
    }
  };

  var date1 = new Date();
  var date2 = new Date(MyClassroom.classScheduleDate);

  // To calculate the time difference of two dates
  var Difference_In_Time = date2.getTime() - date1.getTime();
  // To calculate the no. of days between two dates
  var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
  if (!Loading) {
    if (Difference_In_Days < -1) {
      return (
        <>
          <div className="class-container">
            <h1 style={{ color: "#2b4eff" }}>No Any Class Schedule Yet!</h1>
            <br />
            <p className="star">
              Note : The class you schedule is only valid for 24 hours after
              that its finish
            </p>
            <br />
            <div className="schedule-class-container-2">
              <div className="signInput">
                <h2 style={{ color: "#2b4eff" }}>Schedule Your Class</h2>
                <label htmlFor="title">
                  {" "}
                  Schedule Date :<span className="star"> *</span>
                </label>
                <br />
                <input
                  type="datetime-local"
                  id="title"
                  placeholder="Add title of the course"
                  name="title"
                  required
                  value={(Scheduletime || "").toString().substring(0, 16)}
                  onChange={(e) => handletimeSubmit(e)}
                />
                <p className="star">{err}</p>

                <div className="submit-btn" style={{ marginTop: "20px" }}>
                  <button
                    id="addBookBtn"
                    style={{
                      border: "none",
                      background: "#2b4eff",
                      color: "white",
                      display: "inline-block",
                      padding: "10px 20px",
                      cursor: "pointer",
                    }}
                    onClick={handleSubmit}
                  >
                    Schedule Class
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <h1 className="schedule-class-heading">My Schedule Classroom </h1>
          <div className="schedule-class-container">
            <div>
              <div className="class-scheduler-card-container">
                <div className="class-scheduler-card-header">
                  <h2>{MyClassroom.ClassName}</h2>
                  <hr />
                  <p>{MyClassroom.ClassDescription}</p>
                  <p>
                    <strong>Class : </strong>
                    {MyClassroom.Class + "th" || "10th"}
                  </p>
                  <p>
                    <strong>Subject : </strong>
                    {MyClassroom.Subject}
                  </p>
                </div>
                <hr />
                <div className="class-schedule-card-footer">
                  <div>
                    <AiFillCalendar />{" "}
                    <strong>
                      {" "}
                      {gettimestamp(MyClassroom.classScheduleDate)}
                    </strong>
                  </div>
                  <div className="class-scheduler-btn">
                    <a
                      href={
                        "http://localhost:3050/?" +
                        "name=" +
                        props.Instructor.Teachername +
                        "&participantId=" +
                        props.Instructor._id +
                        "&meetingId=" +
                        MyClassroom.meetingId +
                        "&usermode=OCRTIRTUSN"
                      }
                      target="_blank"
                      rel="noreferrer noopener"
                      className="downloadpdf"
                    >
                      <button className="lib-card-button">
                        Join Classroom
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="signInput schedule-new">
              <label htmlFor="title">
                {" "}
                Schedule New Class :<span className="star"> *</span>
              </label>
              <br />
              <input
                type="datetime-local"
                id="title"
                placeholder="Add title of the course"
                name="title"
                required
                value={(Scheduletime || "").toString().substring(0, 16)}
                onChange={(e) => handletimeSubmit(e)}
              />
              <p className="star">{err}</p>

              <div className="submit-btn" style={{ marginTop: "20px" }}>
                <button
                  id="addBookBtn"
                  style={{
                    border: "none",
                    background: "#2b4eff",
                    color: "white",
                    display: "inline-block",
                    padding: "10px 20px",
                    cursor: "pointer",
                  }}
                  onClick={handleSubmit}
                >
                  Schedule Class
                </button>
              </div>
            </div>
          </div>
        </>
      );
    }
  } else {
    <Loader />;
  }
}
