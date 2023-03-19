import axios from "axios";
import { useEffect, useState } from "react";
import { MdDownload, MdTableView } from "react-icons/md";
import { Link, Route } from "react-router-dom";
import Loader from "../../../../../Loader";
import PreviewAttandance from "./PreviewAttandance";

export default function LiveClassAttendance(props) {
  const [MyClassrooms, setMyClassroom] = useState({});
  const [StudentInfo, setStudentInfo] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [meetindDetails, setmeetindDetails] = useState([]);
  useEffect(() => {
    window.scroll(0, 100);
    setMyClassroom(props.MyClassroom[0]);
    setStudentInfo(props.StudentInfo);
    const FetchSessions = async () => {
      const options = {
        method: "GET",
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJmMTY5NWE4Yi04ZmMxLTRhNWItYTA2OS0xNjUzNWFjZTU0MWYiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY2MzEzMDA1MiwiZXhwIjoxNjYzNzM0ODUyfQ.Wz7bneCpYWALRH5G1n6W8zIv3WdIFFzglGTuUBf8-Do",
          "Content-Type": "application/json",
        },
      };
      const url = `https://api.videosdk.live/v2/sessions/?roomId=${MyClassrooms.meetingId}`;
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(response);
      setLoading(false);
      setmeetindDetails(data.data);
    };
    FetchSessions();
  }, [Loading]);
  console.log(meetindDetails);
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
  console.log(MyClassrooms);
  function timeDiffCalc(dateFuture, dateNow) {
    let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000;

    // calculate days
    const days = Math.floor(diffInMilliSeconds / 86400);
    diffInMilliSeconds -= days * 86400;
    console.log("calculated days", days);

    // calculate hours
    const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
    diffInMilliSeconds -= hours * 3600;
    // calculate minutes
    const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
    var seconds = ((diffInMilliSeconds % 60000) / 1000).toFixed(0);
    diffInMilliSeconds -= minutes * 60;
    let difference = "";
    if (days > 0) {
      difference += days === 1 ? `${days} day, ` : `${days} days, `;
    }
    if (hours > 0) {
      difference +=
        hours === 0 || hours === 1 ? `${hours} hour, ` : `${hours} hours, `;
    }
    if (minutes > 0) {
      difference +=
        minutes === 0 || hours === 1
          ? `${minutes} minutes `
          : `${minutes} minutes `;
    }
    difference += `${Math.round(diffInMilliSeconds)} seconds`;

    return difference;
  }
  const totalTime = (timedata) => {
    let diffInMilliSecondstime = 0;
    timedata.timelog.map((ktime) => {
      diffInMilliSecondstime +=
        Math.abs(new Date(ktime.end) - new Date(ktime.start)) / 1000;
    });
    const days = Math.floor(diffInMilliSecondstime / 86400);
    diffInMilliSecondstime -= days * 86400;
    console.log("calculated days", days);

    // calculate hours
    const hours = Math.floor(diffInMilliSecondstime / 3600) % 24;
    diffInMilliSecondstime -= hours * 3600;
    var seconds = ((diffInMilliSecondstime % 60000) / 1000).toFixed(0);
    // calculate minutes
    const minutes = Math.floor(diffInMilliSecondstime / 60) % 60;
    diffInMilliSecondstime -= minutes * 60;
    let difference = "";
    if (days > 0) {
      difference += days === 1 ? `${days} day, ` : `${days} days, `;
    }
    if (hours > 0) {
      difference +=
        hours === 0 || hours === 1 ? `${hours} hour, ` : `${hours} hours, `;
    }
    if (minutes > 0) {
      difference +=
        minutes === 0 || hours === 1
          ? `${minutes} minutes`
          : `${minutes} minutes`;
    }
    difference +=
      minutes === 0 || hours === 1
        ? `${seconds} seconds`
        : `${seconds} seconds`;

    return difference;
  };
  var x = 0;
  if (Loading) {
    return <Loader />;
  } else {
    if (meetindDetails.length > 0) {
      return (
        <>
          <div className="attendance-table">
            <table>
              <thead>
                <tr id="attance-table-tr">
                  <th>Sr. No</th>
                  <th>Starting Time</th>
                  <th>End Time</th>
                  <th>Class Duration</th>
                  <th>No. of Participants</th>
                  {/* <th>DownLoad Chat</th> */}
                  <th>Preview Attendance</th>
                </tr>
              </thead>
              <tbody>
                {meetindDetails.map((item) => (
                  <>
                    <tr key={item._id} className="attance-table-tr-2">
                      <td>{++x}</td>
                      <td style={{ textAlign: "left", paddingLeft: "1rem" }}>
                        {gettimestamp(item.start)}
                      </td>
                      <td style={{ textTransform: "none" }}>
                        {gettimestamp(item.end)}
                      </td>
                      <td style={{ textTransform: "none" }}>
                        {timeDiffCalc(new Date(item.end), new Date(item.start))}
                      </td>
                      <td style={{ textTransform: "none" }}>
                        {item.participants.length}
                      </td>
                      {console.log(meetindDetails)}
                      {/* <td>
                      <button
                        className="rmvbtn"
                        disabled={item.chatLink ? false : true}
                      >
                        <a style={{ color: "white" }} href={item.chatLink}>
                          <MdDownload />
                        </a>
                      </button>
                    </td> */}
                      <td>
                        <button className="rmvbtn">
                          <Link
                            to={
                              "/instructordashboard/my-classroom/PreviewAttandance/" +
                              MyClassrooms.meetingId +
                              "/" +
                              item.id
                            }
                          >
                            <MdTableView /> Preview{" "}
                          </Link>
                        </button>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </>
      );
    } else {
      return <h1>No Class schedule in this room!</h1>;
    }
  }
}
