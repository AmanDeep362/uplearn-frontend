import React from "react";
import { FaCalendar, FaLaptop, FaQuestion } from "react-icons/fa";

function DeliverResults() {
  return (
    <div className="deliver-outer-container">
      <div className="deliver-container-first" data-aos="fade-down">
        <h2 className="deliver-header">What do we deliver?</h2>

        <p className="deliver-para">
          Check the latest work, schedules, classes, books and your favorite web
          technologies and techniques{" "}
        </p>
      </div>
      <div className="deliver-container-second">
        <div className="deliver-data" data-aos="fade-up">
          <div className="deliver-icon">
            <FaCalendar />
          </div>
          <div className="deliver-icon-content">
            <h3 className="deliver-subheading">Learn on schedules</h3>
            <p className="deliver-subpara">
              Your study schedule should not just be about studying! Plan a
              schedule of balanced activities
            </p>
          </div>
        </div>
        <div className="deliver-data" data-aos="fade-up">
          <div className="deliver-icon">
            <FaQuestion />
          </div>
          <div className="deliver-icon-content">
            <h3 className="deliver-subheading">Get Answers to your Doubts</h3>
            <p className="deliver-subpara">
              Your study schedule should not just be about studying! Plan a
              schedule of balanced activities
            </p>
          </div>
        </div>
        <div className="deliver-data" data-aos="fade-up">
          <div className="deliver-icon">
            <FaLaptop />
          </div>
          <div className="deliver-icon-content">
            <h3 className="deliver-subheading">Learn latest Technolgy</h3>
            <p className="deliver-subpara">
              Your study schedule should not just be about studying! Plan a
              schedule of balanced activities
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeliverResults;
