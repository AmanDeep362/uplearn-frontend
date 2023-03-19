import React from "react";
import studentpic from "../../assets/images/student.png";
import teacherpic from "../../assets/images/teacher.png";
import { Link } from "react-router-dom";

export default function StudentInstructorCard() {
  return (
    <div className="studInsCard">
      <div className="studInsCardItem one" data-aos="fade-right">
        <div className="part1">
          <h3>Come Learn with UpLearn</h3>
          <p>
            Sign up today and get access to hundreds of resources, ebooks and
            video lectures free of cost
          </p>
          <Link to="/login">
            <button type="button">Join</button>
          </Link>
        </div>
        <div className="part2">
          <img src={studentpic} alt="dfsd" />
        </div>
      </div>
      <div className="studInsCardItem two" data-aos="fade-left">
        <div className="part1">
          <h3>Become an Instructor</h3>
          <p>
            Top instructors from across the country are a part of the uplearn
            family today join now
          </p>
          <Link to="/contact">
            <button type="button">Join</button>
          </Link>
        </div>
        <div className="part2">
          <img src={teacherpic} alt="dsfgs" />
        </div>
      </div>
    </div>
  );
}
