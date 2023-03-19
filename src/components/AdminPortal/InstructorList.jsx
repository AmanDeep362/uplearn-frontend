import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { MdSearch } from "react-icons/md";
import axios from "axios";
import Loader from "../Loader";

export default function InstructorList() {
  
  let navigate = useNavigate();
  const adminstatus = useSelector((state) => state.AdminReducers);

  const [InstructorsInfo,setInstructorInfo] = useState([]);
  const [InfoBackup,setInfoBackup] = useState([]);
  const [Loading, setLoading] = useState(true);

  const [refresh, setrefresh] = useState('');
  const [input, setinput] = useState('');

  var x = 0;

  useEffect(() => {
      window.scroll(0,0);
      // Check is Admin Login Or Not 
      if(Number(adminstatus.isAdminLoggedIn)){
          // call the fetch admin detail function 
          const fetchdata = async () =>{
              await axios.get("/allInstructor").then(response => {
                  setInstructorInfo(response.data);
                  setInfoBackup(response.data);
                  setLoading(false);
              })
              .catch(error => {
                  console.log(error);
                  navigate("/admin-portal-login-190310554227");
              });
            }
          fetchdata();
      }
      // If User is not login redirect to login 
      else{
          navigate("/admin-portal-login-190310554227");
      }
  }, [adminstatus.isAdminLoggedIn, navigate, refresh]);


  const FindTheInstructor = () => { 
    if(input === ''){
      setInstructorInfo(InfoBackup);
    }
    else{
      var ans = InfoBackup.map((a) => {
        if(a.email.toUpperCase().search(input.toUpperCase()) > -1){
            return a
        }
      });

      ans = ans.filter((e) => e !== undefined)
      setInstructorInfo(ans);
    }
  }


  if(Loading){
    return( <Loader /> );
  }

  else{
    return (
      <>
        {/* Main Heading to Return  */}
        <div className="instructorHeader">
          <Link to="/admin-portal-home-190310554227">
            <BiArrowBack className="backBtn" style={{ color: "white" }} />
          </Link>
        </div>
        {/* Search Bar  */}
        <div  className="library-filter-container" style={{margin: '0px'}}>
          <h1>Instructor's Details</h1>

          <div className="librarySearch">
            {/* input box to search User  */}
            <input type="text" 
              placeholder="Enter User Email to Search ..." 
              id="finder" name="emailfind"
              value={input}
              onChange={(e) => {setinput(e.target.value)}}
            />
            <button type="submit" onClick={FindTheInstructor}>
              <i><MdSearch /></i> Search
            </button>
          </div>
        </div>
        
        {/* Table Show the Details of Teacher  */}
        <div className="instructor-table">
          <p><b>Total Instructors: {InstructorsInfo.length}</b></p>
          <table>
            <thead>
              <tr>
                <th>Sr. No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile No.</th>
                <th>AadharCard</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
                  {InstructorsInfo.map((item)=>(
                      <tr key={item._id}>
                        <td>
                          {++x}
                        </td>
                        <td style={{textAlign: 'left', paddingLeft: '1rem'}}>
                          {item.Teachername}
                        </td>
                        <td style={{textTransform: 'none'}}>
                          {item.email}
                        </td>
                        <td>
                          {item.mobileno}
                        </td>
                        <td>
                          {item.aadharCard}
                        </td>
                        <td>
                          <button className='rmvbtn' onClick={ async ()=>{
                              const id = item._id;
                              // console.log(id)
                              const res =  await fetch("/InstructorRemoved" ,{
                                method : "POST",
                                headers : { 
                                    "content-Type" : "application/json"
                                },
                                body : JSON.stringify({
                                    id
                                })
                              });
                              if (res.status === 200) {
                                  setrefresh(res);
                              }
                            } 
                          }
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </>
    )
  }
}
