import React from "react";
import pagenotfound from "./../../assets/images/pagenotfound.png";
import { Link } from "react-router-dom";

function PageNotFound(){
    return(
        <div className="pagenotfound">
            <img src={pagenotfound} alt="pagenotfound" />
            <p>We're sorry, but something went wrong.</p>
            <Link to="/"><button>Go Back</button></Link>
        </div>
    )
}

export default PageNotFound;