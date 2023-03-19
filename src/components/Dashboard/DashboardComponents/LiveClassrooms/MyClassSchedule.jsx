import { useEffect, useState } from "react";
import { AiFillCalendar } from "react-icons/ai";

export default function MyClassSchedule (props){
    const [MyClassroom, setMyClassroom] = useState({});
  const [studentInfo, setstudentInfo] = useState({});
  useEffect(() => {
    window.scroll(0, 100);
    setMyClassroom(props.MyClassroom);
    setstudentInfo(props.StudentInfo);
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
//  console.log(props);
 var date1 = new Date();
 var date2 = new Date(MyClassroom.classScheduleDate);

 // To calculate the time difference of two dates
 var Difference_In_Time = date2.getTime() - date1.getTime();
 // To calculate the no. of days between two dates
 var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

   if (Difference_In_Days < -1) {
     return (
       <>
         <div className="class-container">
           <h2 style={{ color: "#2b4eff" }}>Not any Class Schedule Yet!</h2>
           <br />
           <p className="star">
             Note : You get Notification once your Class is Schedule
           </p>
           <br />
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
                       "http://localhost:3050//?" +
                       "name=" +
                       studentInfo.name +
                       "&participantId=" +
                       studentInfo._id +
                       "&meetingId=" +
                       MyClassroom.meetingId 
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
         </div>
       </>
     );
   }
 
}