import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LoginAdmin } from "./../../redux/actions/userAction/adminAction";

function AdminLogin() {

    let navigate = useNavigate();
    const dispatch = useDispatch();

    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        window.scroll(0,130);
    }, [])

    const [err, seterr] = useState('');
    const [pass, setpass] = useState('');
    const [invalid, setinvalid] = useState('');


    const loginAdmin = async () => {
        const { email, password }= values;

        const res = await fetch("/adminlogin", {
          method: "POST",
          headers: {
            "content-Type": "application/json",
          },
          
          body: JSON.stringify({
            email,
            password,
          }),
        });
      
        if (res.status === 200) {
            dispatch(LoginAdmin());
            navigate("/admin-portal-home-190310554227");
        }
        else{
            setinvalid('Un-Authenticate Admin Login')
            console.log(res)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const submit = handleValidate();

        if(submit){
            loginAdmin();
        }
    };

    const handleValidate = () => {
        // Validate the Email and password
        if(values.email === ''){
            seterr("Email is required.");
            return false;
        }
        else if(values.password === ''){
            setpass("Password is required.");
            return false;
        }

        return true;
    }

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
        seterr('');  setpass(''); setinvalid('');
    };

    return(
        <>  
        {/* The Container Of Admin Login  */}
        <div className="signin">
            <div className="signContainer">
                <div className="signWrapper">
                    <h2>Sign In To Admin Account</h2>
                    <p className="pl">"Education is about creating leaders for tomorrow."</p>

                    {/* Starting the Form  */}
                    <div className="signForm">
                        <form>
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
                            <p>{err}</p>
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
                            <p>{pass}</p>
                            </div>
                            {/* The Submit Button  */}
                            <div>
                            <p className="invalid">{invalid}</p>
                            <button type="button" className="signupBtn" onClick={handleSubmit}>
                                Sign In
                            </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default AdminLogin;