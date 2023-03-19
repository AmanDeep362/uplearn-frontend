import React from 'react';
import { Link } from 'react-router-dom';
import data from "./featuredata.json";

function HomeFeatures(){
    return(
        <>  
            <div className='home-features'>
                <h1>What We Provide?</h1>
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
    )
}

export default HomeFeatures;