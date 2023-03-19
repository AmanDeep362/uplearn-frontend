import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {LogoutUser} from "./../../redux/actions/userAction/userAction";

function Logout(){ 
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logoutcss = {
        width: "100%",
        height: "85vh",
        display: "flex",
        justifyContent: "center",
        alignItems: 'center',
        fontSize: "4rem",
    }
    useEffect( ()=> {
        fetch('/logout',{
            method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
               
        }).then((res)=>{
            dispatch(LogoutUser());
            navigate("/login", { replace: true });
        }).catch((err)=>{
            console.log("hi");
        })
    });
        
    return(
        <div style={logoutcss}>
            Logout User
        </div>
    );
    
}
export default Logout;