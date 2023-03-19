import React from "react";
import CountUp from "react-countup";
import { BiSpreadsheet } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";

export default function StatsCounter() {
  return (
    <div className="statsCounter">
      <div className="stats">
        <div className="statsIcon">
          <BiSpreadsheet />
        </div>
        <div className="statsData">
          <CountUp end={110} duration={5} />+<h5>Free Courses</h5>
        </div>
      </div>

      <div className=" stats">
        <div className="statsIcon">
          <FaUsers />
        </div>
        <div className="statsData">
          <CountUp end={800} duration={10} />+<h5>Students</h5>
        </div>
      </div>

      <div className=" stats">
        <div className="statsIcon">
          <FaBook />
        </div>
        <div className="statsData">
          <CountUp end={1000} duration={10} />+<h5>Free Books</h5>
        </div>
      </div>

      <div className="stats">
        <div className="statsIcon">
          <FaChalkboardTeacher />
        </div>
        <div className="statsData">
          <CountUp end={100} duration={5} />+<h5>Instructors</h5>
        </div>
      </div>
    </div>
  );
}
