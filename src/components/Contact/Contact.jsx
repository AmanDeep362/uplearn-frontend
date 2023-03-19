import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import contactPage from "../../assets/images/contactPage.jpg";
import { MdLocationPin, MdLocalPhone, MdLocalPostOffice } from "react-icons/md";
var CryptoJS = require("crypto-js");

export default function Contact() {
  const loginDetails = useSelector((state) => state.userReducers);
  let navigate = useNavigate();

  const [User, SetUser] = useState({});
  const [invalid, setinvalid] = useState("");

  useEffect(() => {
    window.scroll(0, 120);
    // Decrypting the User Role
    if (loginDetails.userRole !== "") {
      var bytes = CryptoJS.AES.decrypt(
        loginDetails.userRole,
        "my-secret-key@123"
      );
      var role = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }
    // Check is  Login Or Not
    if (Number(loginDetails.isLoggedIn) && role === "INSTRUCTOR") {
      // call the fetch admin detail function
      const fetchdata = async () => {
        await axios
          .get("/aboutInstructor")
          .then((response) => {
            SetUser(response.data);
          })
          .catch((error) => {
            console.log(error);
            navigate("/login");
          });
      };
      fetchdata();
    } else if (Number(loginDetails.isLoggedIn) && role === "STUDENT") {
      // call the fetch admin detail function
      const fetchdata = async () => {
        await axios
          .get("/aboutStudents")
          .then((response) => {
            SetUser(response.data);
          })
          .catch((error) => {
            console.log(error);
            navigate("/login");
          });
      };
      fetchdata();
    }
    // If User is not login redirect to login
    else {
      navigate("/login");
    }
  }, [loginDetails.isLoggedIn]);

  // set State for fields
  const [contact, setContact] = useState({
    phoneNo: "",
    message: "",
  });

  let name, value;

  // Handle input Value
  const handleInput = async (e) => {
    name = e.target.name;
    value = e.target.value;
    setContact({ ...contact, [name]: value });
    setinvalid("");
  };

  const postData = async (e) => {
    // e.preventDefault();
    const { phoneNo, message } = contact;
    const name = User.name;
    const email = User.email;

    const res = await fetch("/contactus", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phoneNo,
        message,
      }),
    });

    if (res.status === 201) {
      window.alert(
        "Your query is succesfully registered our expert team will reply you soon."
      );
      navigate("/", { replace: true });
    } else {
      window.alert("Error occured , try again");
    }
  };

  const handlecontactvalidation = () => {
    if (contact.phoneNo === "") {
      setinvalid("Please Enter Contact Number");
    } else if (contact.message === "") {
      setinvalid("Please Enter a Message");
    } else {
      postData();
    }
  };

  return (
    <>
      <div className="contactContainer">
        <div className="contactWrapper">
          <h1>Quick Contact</h1>
          <p>We're here to Help You</p>
          <table>
            <tr className="row-container">
              {/* Contact Information  */}
              <td className="right-td">
                <form>
                  <div className="contactInput">
                    <label htmlFor="name">Full name</label>
                    <input
                      type="text"
                      id="fname"
                      placeholder="Full Name"
                      name="name"
                      value={User.name}
                    />
                  </div>

                  {/* The Email Input  */}
                  <div className="contactInput">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Email"
                      name="email"
                      value={User.email}
                    />
                  </div>
                  {/* Phone Number */}
                  <div className="contactInput">
                    <label htmlFor="Phone No.">Phone no.</label>
                    <input
                      type="tel"
                      id="phone"
                      placeholder="Phone number"
                      name="phoneNo"
                      value={contact.phoneNo}
                      onChange={handleInput}
                    />
                  </div>
                  {/*Message*/}

                  <div className="contactInput">
                    <label htmlFor="Message">Message</label>
                    <textarea
                      className="contactInput-ta"
                      placeholder="Message"
                      name="message"
                      id="message"
                      cols="45"
                      rows="6"
                      value={contact.message}
                      onChange={handleInput}
                    />
                  </div>

                  {/* The Submit Button  */}
                  <div>
                    <div className="invalid">{invalid}</div>
                    <button
                      type="button"
                      onClick={handlecontactvalidation}
                      className="submitBtn"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </td>
              {/* Right Side Form  */}
              <td className="left-td">
                <img src={contactPage} alt="contact-us" />

                <div className="left-side">
                  <div className="details">
                    <MdLocationPin />
                    <div className="topic">Address</div>
                    <div className="text-msg">JMIT, Radaur</div>
                    <div className="text-msg">Yamunanagar, Haryana</div>
                  </div>

                  <div className="details">
                    <MdLocalPhone />
                    <div className="topic">Phone</div>
                    <div className="text-msg">+91 9876512345</div>
                    <div className="text-msg">+91 9876543210</div>
                  </div>

                  <div className="details">
                    <MdLocalPostOffice />
                    <div className="topic">Email</div>
                    <div className="text-msg">uplearnforsih@gmail.com</div>
                    <div className="text-msg">info.uplearn@gmail.com</div>
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </>
  );
}
