import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  let navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
     window.scroll(0,150);
     const go = localStorage.getItem("isLoggedIn");

      if(Number(go)){
        navigate("/studentdashboard");
      }
  }, [])
   
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [copassword, setcopassword] = useState('');
  const [invalid, setinvalid] = useState('');

  // Make Credential to Send OTP
  const [otpgen, setotpgen] = useState('');
  const [userotp, setuserotp] = useState('');

  const sendotp = async () => {
      const name = values.name;
      const email = values.email;
      const otp =  Math.floor(1000 + Math.random() * 9000);

      const res =  await fetch("/sendverifyemail" ,{
        method : "POST",
        headers : { 
            "content-Type" : "application/json"
        },
        body : JSON.stringify({
            name, email, otp
        })
       } );

      //  Set the generated OTP to state to access it later 
       setotpgen(otp);
  }

  

  const postData = async () => {

   const name = values.name;
   const email = values.email;
   const password = values.password;
   const cpassword = values.confirmPassword

    const res =  await fetch("/register" ,{
        method : "POST",
        headers : { 
            "content-Type" : "application/json"
        },
        body : JSON.stringify({
            name,email,password,cpassword
        })
    } );
    
    if(res.status === 200){
        const e = document.getElementById("reg_success");
        e.style.display = "block";
        navigate("/login");
    }
    else if(res.status === 422){
        setinvalid("Email already registered, please enter a valid email id");
    }
    else{
        console.log(res)
        setinvalid("Invalid Credential | Internal Server Error");
    }
}

  const handleSubmit = async (event) => {
    event.preventDefault();
    const submit = handleValidation();

    if (submit) {
      //Generate the OTP and send to uers
      sendotp();  
      // Get the modal
      var modal = document.getElementById("myModal");
      // Get the <span> element that closes the modal
      var span = document.getElementsByClassName("close")[0];
      // Making the Display of Modal Visible to Fill OTP to it
      modal.style.display = "block";
      
      // When the user clicks on <span> (x), close the modal
      span.onclick = function() {
        modal.style.display = "none";
      }
    }
  };

  // Function to Check That the user entered OTP is correct 
  // If Correct Then Submit it else generate error
  const verifyOTP = () => {
    if(userotp === ''){
      setinvalid("Please Enter OTP Send to you.");
    }
    else if(Number(userotp) !== otpgen){
      setinvalid("Incorrect entered OTP");
    }
    else{
      postData();
      var modal = document.getElementById("myModal");
      modal.style.display = "none";
    }
  }

  //form validation
  const handleValidation = () => {

    if (values.name === '') {
      setname("Name is required");
      window.scroll(0,200);
      return false;
    }
    else if (values.email === '') {
      setemail("Email is required");
      window.scroll(0,250);
      return false;
    }
    else if (values.password === '') {
      setpassword("Password is required");
      return false;
    } 
    else if (values.confirmPassword === '') {
      setcopassword("Please Confirm Your Password");
      return false;
    } 
    else if (values.password.length < 8) {
      setinvalid("Password must be atleast 8 character");
      return false;
    } 
    else if (values.password !== values.confirmPassword) {
      setinvalid("Password and Confirm password should be same");
      return false;
    }

    return true;
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    setname(''); setemail(''); setpassword(''); setcopassword('');
    setinvalid(''); setuserotp('');
  };

  return (
    <>
      {/* The Container Of Login An Sign In Page  */}
      <div className="signin">
        <div className="signContainer">
          <div className="signWrapper">
            <h2>Create Your Account</h2>
            <p className="pl">"A better learning future starts here."</p>

            {/* Starting the Form  */}
            <div className="signForm">
              <form>
                {/* The Name Input  */}
                <div className="signInput">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Your Name"
                    name="name"
                    value={values.name}
                    onChange={(e) => handleChange(e)}
                  />
                  <p>{name}</p>
                </div>
                {/* The Email Input  */}
                <div className="signInput">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    name="email"
                    value={values.email}
                    onChange={(e) => handleChange(e)}
                  />
                  <p>{email}</p>
                </div>
                {/* The Password Input  */}
                <div className="signInput">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    name="password"
                    value={values.password}
                    onChange={(e) => handleChange(e)}
                  />
                  <p>{password}</p>
                </div>
                {/* The Confirm Password Input  */}
                <div className="signInput">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={(e) => handleChange(e)}
                  />
                  <p>{copassword}</p>
                </div>
                {/* The Submit Button  */}
                <div>
                  <p className="invalid">{invalid}</p>
                  <p id="reg_success">"Successful Registration | Redirect to the Home"</p>
                  <button type="button" className="signupBtn" onClick={handleSubmit}>
                    Sign Up
                  </button>
                </div>
                {/* Go to Login  */}
                <div className="signupText">
                  <p>
                    Already have an Account?{" "}
                    <Link to="/login" className="linked">
                      Sign In
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Created a Modal to Send OTP and Verify User  */}
      <div>
        {/*  The Modal  */}
        <div id="myModal" className="modal">

          {/* Modal content */}
          <div className="modal-content">
            <span className="close">&times;</span>
            <div>
              <h2>Verification Code</h2>
              <p>Please enter the verification code send <br /> to <b>{values.email}</b></p>
              <div className="signInput">
                  <label htmlFor="verifyotp">Enter OTP</label>
                  <input
                    type="password"
                    id="verifyotp"
                    placeholder="Verify OTP"
                    name="verifyotp"
                    value={userotp}
                    onChange={(e) => {setuserotp(e.target.value)}}
                  />
                </div>
              <p className="invalid">{invalid}</p>
              <button onClick={verifyOTP}>Submit</button>
            </div>
          </div>
        </div>
      </div>
      {/* End Of Modal  */}
    </>
  );
}
export default Register;
