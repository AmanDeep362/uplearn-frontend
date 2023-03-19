import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import data from "./AdminCards.json";
import axios from 'axios';
import { useSelector } from "react-redux";

function AdminHome(){

    let navigate = useNavigate();
    const [adminInfo, setadminInfo] = useState('');
    const adminstatus = useSelector((state) => state.AdminReducers);

    useEffect(() => {
        window.scroll(0,0);
        // Check is Admin Login Or Not 
        if(Number(adminstatus.isAdminLoggedIn)){
            // call the fetch admin detail function 
            const fetchdata = async () =>{
                await axios.get("/aboutAdminActive").then(response => {
                    setadminInfo(response.data);
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
    }, [adminstatus.isAdminLoggedIn, navigate])

    // console.log(adminInfo)

    return(
        <>
            {/* Banner Of the Admin Page  */}
            <div className="admin-banner">
                <h1>Admin Portal</h1>
                <p>
                    With hundreds of academic resources, quizzes, tests, video lectures and more, pertaining 
                    to educational boards pan India, UpLearn offers a first-of-its-kind platform that brings together 
                    a community of learners and instructors in the pursuit of quality education, right at their fingertips!
                </p>
            </div>
            {/* Cards Of The Admin Page  */}
            <div className="admin-cards-container" data-aos="fade-right">
                {data.map( (item) => {
                    return(
                       <div className="admin-card-inner" key={item.id}>
                            <img src={item.image} alt="Product" />
                            <h3>{item.heading}</h3>
                            <p>{item.title}</p>
                            <Link to={item.Link}><button>{item.name}</button></Link>
                       </div>
                    )
                })}
          </div>
        </>
    );
}

export default AdminHome;