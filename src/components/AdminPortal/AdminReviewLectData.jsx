import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { MdSearch } from "react-icons/md";
import { ImEye } from "react-icons/im";
import axios from "axios";
import Loader from "../Loader";

export default function AdminReviewLectData() {
  let navigate = useNavigate();
  const adminstatus = useSelector((state) => state.AdminReducers);

  const [InstructorsInfo, setInstructorInfo] = useState([]);
  const [InfoBackup, setInfoBackup] = useState([]);
  const [TaskReview, setTaskReview] = useState([]);
  const [Loading, setLoading] = useState(true);

  const [input, setinput] = useState("");

  useEffect(() => {
    window.scroll(0, 0);
    // Check is Admin Login Or Not
    if (Number(adminstatus.isAdminLoggedIn)) {
      // call the fetch admin detail function
      const fetchdata = async () => {
        await axios
          .get("/allInstructor")
          .then((response) => {
            setInstructorInfo(response.data);
          })
          .catch((error) => {
            console.log(error);
            navigate("/admin-portal-login-190310554227");
          });
      };
      fetchdata();
    }
    // If User is not login redirect to login
    else {
      navigate("/admin-portal-login-190310554227");
    }

    // Find the Under Review task
    const fetchUnderReview = async () => {
      await axios
        .get("/instructorTaskUnderReview")
        .then((response) => {
          setTaskReview(response.data);
          setInfoBackup(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          navigate("/admin-portal-login-190310554227");
        });
    };
    fetchUnderReview();
  }, [adminstatus.isAdminLoggedIn, navigate]);

  // console.log(TaskReview)

  const FindThePendingReviewTask = () => {
    if (input === "") {
      setTaskReview(InfoBackup);
    } else {
      var ans = InfoBackup.map((a) => {
        if (a.TeacherId.email.toUpperCase().search(input.toUpperCase()) > -1) {
          return a;
        }
      });

      ans = ans.filter((e) => e !== undefined);
      setTaskReview(ans);
    }
  };

  if (Loading) {
    return <Loader />;
  } else {
    return (
      <>
        {/* Main Heading to Return  */}
        <div className="instructorHeader">
          <Link to="/admin-portal-home-190310554227">
            <BiArrowBack className="backBtn" style={{ color: "white" }} />
          </Link>
        </div>
        {/* Search Bar  */}
        <div className="library-filter-container" style={{ margin: "0px" }}>
          <h1 style={{ margin: "8px" }}>Review Instructor's Task</h1>

          <div className="librarySearch">
            {/* input box to search User  */}
            <input
              type="text"
              placeholder="Enter User Email to Search ..."
              id="finder"
              name="emailfind"
              value={input}
              onChange={(e) => {
                setinput(e.target.value);
              }}
            />
            <button type="submit" onClick={FindThePendingReviewTask}>
              <i>
                <MdSearch />
              </i>{" "}
              Search
            </button>
          </div>
        </div>

        {/* Table Show the Details of Teacher  */}
        <div className="instructor-table">
          <p>
            <b>Task Under Review : {TaskReview.length}</b>
          </p>
          <table>
            <thead>
              <tr>
                <th>Sr. No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Chapter Name</th>
                <th>Subject</th>
                <th>Due Date</th>
                <th>Preview</th>
              </tr>
            </thead>
            <tbody>
              {TaskReview.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.TeacherId.Teachername}</td>
                  <td style={{ textTransform: "none" }}>
                    {item.TeacherId.email}
                  </td>
                  <td>{item.ChapterName}</td>
                  <td>{item.Subject}</td>
                  <td>{item.DueDate}</td>
                  <td>
                    <Link
                      to={
                        "/admin-portal-review-assign-task-190310554227/" +
                        item._id
                      }
                      style={{ fontSize: "22px", color: "#2b4eff" }}
                    >
                      <ImEye />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}
