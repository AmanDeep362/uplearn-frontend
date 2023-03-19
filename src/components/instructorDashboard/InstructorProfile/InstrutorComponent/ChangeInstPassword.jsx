import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ChangeInstructorPassword(){

    let navigate = useNavigate();

    const [profile, setprofile] = useState({});
    const [password, setpassword] = useState({
        new: '',
        confirm: ''
    });

    const [err, seterr] = useState('');
    const [pass, setpass] = useState('');
    const [invalid, setinvalid] = useState('');

    useEffect(() => {
        window.scroll(0,120);
        const fetchdata = async () =>{
            await axios.get("/aboutInstructor").then(response => {
              setprofile(response.data);
            })
            .catch(error => {
              console.log(error);
              navigate("/login");
            });
        }
        fetchdata();
    }, [navigate])


    const UpdateMyPassword = async () => {

        const _id = profile._id;
        var npassword = password.new;
        var cpassword = password.confirm;
       
        const res =  await fetch("/setnewinstructorpassword" ,{
             method : "POST",
             headers : { 
                 "content-Type" : "application/json"
             },
             body : JSON.stringify({
                _id, npassword, cpassword
             })
         } );
         
         if(res.status === 200){
            console.log(res)
            navigate("/logout");
         }
         else{
             console.log(res)
             window.alert("Invalid Request | Internal Server Error");
         }
    }

    function validatePassword(){
        if(password.new === ''){
            seterr('Please Enter New Password');
            return false;
        }
        else if(password.new.length < 8){
            seterr('Password must be atleast 8 character');
            return false;
        }
        else if(password.confirm === ''){
            setpass('Please Enter New Password');
            return false;
        }
        else if(password.new !== password.confirm){
            setinvalid('New password and Confirm password should be same.');
            return false;
        }
        else{
            return true;
        }
    }

    function ChangeUserPassword(){
        const status = validatePassword();

        if(status){
            UpdateMyPassword();
            const e = document.getElementById("reg_success");
            e.style.display = "block";
        }
    }


    const handleChange = (event) => {
        setpassword({ ...password, [event.target.name]: event.target.value });
        seterr(''); setpass(''); setinvalid('');
      };

    return(
        <>
        {/* The Container Of Login An Sign In Page  */}
        <div className="signin">
            <div className="signContainer">
            <div className="signWrapper">
                <h2>Change Your Account Password</h2>
                {/* Starting the Form  */}
                <div className="signForm">
                    <form>
                        {/* The old password Input  */}
                        <div className="signInput">
                            <label htmlFor="newpassword">New Password</label>
                            <input
                                type="password"
                                id="newpassword"
                                placeholder="New Password"
                                name="new"
                                value={password.new}
                                onChange={handleChange}
                            />
                            <p>{err}</p>
                        </div>
                        {/* The Password Input  */}
                        <div className="signInput">
                            <label htmlFor="confirmpassword">Confirm New Password</label>
                            <input
                                type="password"
                                id="confirmpassword"
                                placeholder="Confirm Password"
                                name="confirm"
                                value={password.confirm}
                                onChange={handleChange}
                            />
                            <p>{pass}</p>
                        </div>
                        
                        {/* The Submit Button  */}
                        <div>
                        <p className="invalid">{invalid}</p>
                        <p id="reg_success">"Password Changed Successfully"</p>
                        <button type="button" className="signupBtn" onClick={ChangeUserPassword}>
                            Change Password
                        </button>
                        </div>
                    </form>
                </div>
            </div>
            </div>
        </div>
        </>
    )
}

export default ChangeInstructorPassword;