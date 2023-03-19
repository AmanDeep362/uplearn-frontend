import React from "react";
import { useParams, Link } from "react-router-dom";

export default function ClassSelect() {
  const params = useParams();
  const board = params.board;

  const classItem = [
    {
      class: 1,
    },
    {
      class: 2,
    },
    {
      class: 3,
    },
    {
      class: 4,
    },
    {
      class: 5,
    },
    {
      class: 6,
    },
    {
      class: 7,
    },
    {
      class: 8,
    },
    {
      class: 9,
    },
    {
      class: 10,
    },
    {
      class: 11,
    },
    {
      class: 12,
    },
  ];

  return (
    <div className="academicCourWrapper">
      <h2>
        For <span style={{ color: "#4262FD" }}>{board}</span> Board
      </h2>

      <h1>Choose Your Class</h1>

      <div className="class">
        {classItem.map((item, index) => {
          return (
            <div className="classItem" key={index}>
              <Link to={"/my-lectures/" + board + "/" + item.class}>
                <span>Class {item.class}</span>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
