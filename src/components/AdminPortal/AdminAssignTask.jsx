import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { MdSearch } from "react-icons/md";
import axios from "axios";
import Loader from "../Loader";

export default function AssignTaskToInstructor() {
  
  let navigate = useNavigate();
  const adminstatus = useSelector((state) => state.AdminReducers);

  const [InstructorsInfo,setInstructorInfo] = useState([]);
  const [InfoBackup,setInfoBackup] = useState([]);
  const [Loading, setLoading] = useState(true);  

  const [input, setinput] = useState('');
  const [subject, setsubject] = useState('');
  
  var x = 0;

  useEffect(() => {
      window.scroll(0,0);
      // Check is Admin Login Or Not 
      if(Number(adminstatus.isAdminLoggedIn)){
          // call the fetch admin detail function 
          const fetchdata = async () =>{
              await axios.get("/allInstructor").then(response => {
                  setInstructorInfo(response.data);
                  setInfoBackup(response.data)
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
  }, [adminstatus.isAdminLoggedIn, navigate]);


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

  const SearchByChoice = () => {
    var ans = InfoBackup.map((a) => {
        if(a.subject.toUpperCase().search(subject.toUpperCase()) > -1){
            return a
        }
      });

    ans = ans.filter((e) => e !== undefined)
    setInstructorInfo(ans)
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
          <h1>Assign Task to Instructor</h1>
          <br />

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

            <div className="libraryChoice">
                {/* Choices  */}
                <label htmlFor="bookclass1">
                  Select Subject : 
                </label>
                <select id="bookclass1" name="bookclass"
                    value={subject}
                    onChange={(e) => {setsubject(e.target.value)}}
                >
                    <option value="">Select Exam</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Science">Science</option>
                    <option value="Hindi">Hindi</option>
                    <option value="English">English</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Biology">Biology</option>
                    <option value="Computer">Computer</option>
                    <option value="History">History</option>
                    <option value="Civics">Civics</option>
                    <option value="Economics">Economics</option>
                    <option value="Accounts">Accounts</option>
                    <option value="Commerce">Commerce</option>
                    <option value="Art">Art</option>
                    <option value="Music">Music</option>
                    <option value="Social Studies">Social Studies</option>
                    <option value="Environmental Science">Environmental Science</option>
                    <option value="Physical Education">Physical Education</option>
                    <option value="Other">Other</option>
                </select>

                {/* Button to Filter  */}
                {!subject ? null : <button onClick={SearchByChoice}>Search</button>}
              
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
                <th>Subject</th>
                <th>Class Teacher</th>
                <th>Higher Education</th>
                <th>Work</th>
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
                          {item.subject}
                        </td>
                        <td>
                          {item.classteacher}
                        </td>
                        <td>
                          {item.degree}
                        </td>
                        <td>
                            <Link to={'/admin-portal-assign-task-190310554227/' + item._id}>
                                <button className='rmvbtn'>
                                    Assign Task
                                </button>
                            </Link>
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
