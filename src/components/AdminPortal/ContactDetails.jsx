import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import axios from "axios";
import Loader from "../Loader";

export default function ContactDetails() {
  let navigate = useNavigate();
  const adminstatus = useSelector((state) => state.AdminReducers);

  const [adminInfo, setadminInfo] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const [name, setname] = useState("");
  const [_id, setid] = useState("");
  const [email, setemail] = useState("");
  const [invalid, setinvalid] = useState("");

  const [contactDetails, setcontactDetails] = useState([]);
  const [Loading, setLoading] = useState(true);

  const [values, setValues] = useState({
    subject: "",
    body: "",
  });

  useEffect(() => {
    window.scroll(0, 0);
    // Check is Admin Login Or Not
    if (Number(adminstatus.isAdminLoggedIn)) {
      // call the fetch admin detail function
      const fetchdata = async () => {
        await axios
          .get("/aboutAdminActive")
          .then((response) => {
            setadminInfo(response.data);
          })
          .catch((error) => {
            console.log(error);
            navigate("/admin-portal-login-190310554227");
          });
      };

      // Call the Query to fetch Contact us Information
      const fetchcontctInfo = async () => {
        await axios
          .get("/contactResult")
          .then((response) => {
            setcontactDetails(response.data);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
          });
      };

      fetchdata();
      fetchcontctInfo();
    }

    // If User is not login redirect to login
    else {
      navigate("/admin-portal-login-190310554227");
    }
  }, [adminstatus.isAdminLoggedIn, navigate]);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    setinvalid("");
  };

  const HandleSubmit = () => {
    if (name === "" && email === "" && _id === "") {
      setinvalid("Something Went Wrong. Try Again");
    } else if (values.subject === "") {
      setinvalid("Please Enter a reply message subject.");
    } else if (values.body === "") {
      setinvalid("Please Enter a valid reply message.");
    } else {
      postData();
    }
  };

  const postData = async () => {
    const subject = values.subject;
    const body = values.body;

    const res = await fetch("/sendreplyforcontact", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        _id,
        name,
        email,
        subject,
        body,
      }),
    });
    if (res.status === 200) {
      window.alert("Mail is succesfully sent.");
      setOpenModal(false);
      navigate("/admin-portal-home-190310554227");
    } else {
      window.alert("Error occured , try again");
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
        {/* Heading Of Text  */}
        <div className="contact-heading">
          <h1>Contact Details</h1>
        </div>

        {/* Table to present The Contact Info  */}
        <div className="instructor-table">
          <p>
            <b>Total Instructors: {contactDetails.length}</b>
          </p>
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile No</th>
                <th>Query</th>
                <th>Time</th>
                <th>Send reply</th>
              </tr>
            </thead>
            <tbody>
              {contactDetails.map((item) => (
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td style={{ textAlign: "left", paddingLeft: "1rem" }}>
                    {item.name}
                  </td>
                  <td
                    style={{
                      textAlign: "left",
                      paddingLeft: "1rem",
                      textTransform: "none",
                    }}
                  >
                    {item.email}
                  </td>
                  <td>{item.phoneNo}</td>
                  <td>{item.message}</td>
                  <td>{item.time}</td>
                  <td>
                    <button
                      type="button"
                      className="rmvbtn"
                      onClick={() => {
                        setOpenModal(true);
                        setname(item.name);
                        setemail(item.email);
                        setid(item._id);
                      }}
                    >
                      Reply
                    </button>

                    {openModal && (
                      <div className="modal cont-md">
                        {/* Modal content */}
                        <div className="modal-content cont-innmd">
                          <span
                            className="close"
                            onClick={() => {
                              setOpenModal(false);
                            }}
                          >
                            &times;
                          </span>

                          <div>
                            <h2>Send Reply</h2>

                            {/* Making the Input tag To send Reply  */}
                            <div className="signInput">
                              <label htmlFor="subject">Subject</label>
                              <input
                                type="text"
                                id="subject"
                                placeholder="Reply Subject"
                                name="subject"
                                value={values.subject}
                                onChange={(e) => handleChange(e)}
                              />
                            </div>

                            <div className="signInput">
                              <label htmlFor="message">Reply Message</label>
                              <textarea
                                rows={3}
                                cols={25}
                                style={{ lineHeight: "21px", padding: "1rem" }}
                                size="50"
                                id="message"
                                type="text"
                                name="body"
                                placeholder="Reply Message"
                                value={values.body}
                                onChange={(e) => handleChange(e)}
                              />
                            </div>
                            <p className="invalid">{invalid}</p>
                            <button onClick={HandleSubmit}>Submit Reply</button>
                          </div>
                        </div>
                      </div>
                    )}
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
