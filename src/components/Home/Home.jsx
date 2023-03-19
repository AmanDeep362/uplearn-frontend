import React from "react";
import { Link } from "react-router-dom";

import BelowHome from "./BelowHome";
import StatsCounter from "./StatsCounter";
import HomeFeatures from "./FeatureHome";
import DeliverResults from "./DeliverResults";
import StudentInstructorCard from "./StudentInstructorCard";
import banner from "./../../assets/images/home-banner.jpg";

function Home() {
  return (
    <>
      {/* Home Page Slider  */}
      <div className="home-container">
        <div className="untitled">
          <div className="untitled__slides">
            <div className="untitled__slide">
              <div className="untitled__slideBg" />
              <Link to="/"></Link>
            </div>
          </div>
          <div className="untitled__slide">
            <Link to="/ask-doubt">
              <div className="untitled__slideBg" />
            </Link>
          </div>
          <div className="untitled__slide">
            <div className="untitled__slideBg" />
          </div>
          <div className="untitled__slide">
            <Link to="/Learn-with-fun">
              <div className="untitled__slideBg" />
            </Link>
          </div>
          <div className="untitled__shutters" />
        </div>
      </div>

      <StatsCounter />
      <BelowHome />
      <HomeFeatures />
      <DeliverResults />
      <StudentInstructorCard />

      {/* Home Page last Image  */}
      <div className="my-home-img-container" data-aos="fade-down">
        <img src={banner} alt="banner" className="my-home-img" />
      </div>
    </>
  );
}

export default Home;
