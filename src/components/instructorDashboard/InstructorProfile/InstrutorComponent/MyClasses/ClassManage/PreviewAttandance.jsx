import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../../../../Loader";

export default function PreviewAttandance() {
  const [meetindDetails, setmeetindDetails] = useState([]);
  const [Loading, setLoading] = useState(true);
  const { id } = useParams();
  const { meetingId } = useParams();
  const [User, setUser] = useState([]);
  console.log(id + meetingId);
  useEffect(() => {
    window.scroll(0, 100);
    const FetchSessions = async () => {
      const options = {
        method: "GET",
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJmMTY5NWE4Yi04ZmMxLTRhNWItYTA2OS0xNjUzNWFjZTU0MWYiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY2MzEzMDA1MiwiZXhwIjoxNjYzNzM0ODUyfQ.Wz7bneCpYWALRH5G1n6W8zIv3WdIFFzglGTuUBf8-Do",
          "Content-Type": "application/json",
        },
      };
      const url = `https://api.videosdk.live/v2/sessions/?roomId=${meetingId}`;
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(response);
      setLoading(false);
      setmeetindDetails(data.data);
    };
    const fetchUser = async () => {
      await axios
        .get("/allStudents")
        .then((response) => {
          setUser(response.data);
        })
    };
    FetchSessions();
    fetchUser();
  }, [Loading]);
  let participants;
  console.log(meetindDetails);
  console.log(User);
  participants = meetindDetails.find((i)=>i.id === id);
  const totalTime=(timedata)=>{
    let diffInMilliSecondstime =0;
    timedata.timelog.map((ktime)=>{
      diffInMilliSecondstime += Math.abs(new Date(ktime.end) - new Date(ktime.start)) / 1000;
    })
    const days = Math.floor(diffInMilliSecondstime / 86400);
    diffInMilliSecondstime -= days * 86400;
    console.log("calculated days", days);

    // calculate hours
    const hours = Math.floor(diffInMilliSecondstime / 3600) % 24;
    diffInMilliSecondstime -= hours * 3600;
    
    // calculate minutes
    const minutes = Math.floor(diffInMilliSecondstime / 60) % 60;
    diffInMilliSecondstime -= minutes * 60;
    let difference = "";
    if (days > 0) {
      difference += days === 1 ? `${days} day, ` : `${days} days, `;
    }
    if (hours > 0) {
      difference +=
        hours === 0 || hours === 1 ? `${hours} hour , ` : `${hours} hours , `;
    }
    if (minutes > 0) {
      difference +=
        minutes === 0 || hours === 1
          ? `${minutes} minutes `
          : `${minutes} minutes `;
    }
    difference +=`${Math.round(diffInMilliSecondstime)} Seconds`

    return difference;
  }
  
  console.log(participants);
  let x=0;
  if (!Loading) {
    if(participants.participants.length>0){
      return(<>
      <div className="attendance-table" style={{marginLeft:"3rem" ,overflowX:"scroll"}}>
            <table>
              <thead>
                <tr>
                  <th>Sr. No</th>
                  <th>Student Name</th>
                  <th>Email Id</th>
                  <th>Class Active Duration</th>
                </tr>
              </thead>
              <tbody>
                {
                  participants.participants.map((item)=>{
                    let Userfind = User.find((j)=>j._id === item.participantId)
                    if(Userfind){
                      return(
                      <tr  key={Userfind._id} className="attance-table-tr-2"  >
                    <td>{++x}</td>
                    <td style={{ textAlign: "left", paddingLeft: "1rem" }}>
                    {Userfind.name}
                    </td>
                    <td style={{ textAlign: "left", paddingLeft: "1rem" }}>
                    {Userfind.email}
                    </td>
                    <td style={{ textAlign: "left", paddingLeft: "1rem" }}>
                    {totalTime(item)}
                    </td>
                    

                  </tr>
                      )
                    }
                  })
                }
              </tbody>
            </table>
          </div>
          </>)
    }
    else{
      return(
        <>No attendance to preview</>
      )
    }
  } else {
    return <Loader />;
  }
}
